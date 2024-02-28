// src/components/Chat/ChatWindow.cy.js, JN, 28.02.2024
import React from 'react';
import { mount } from 'cypress/react18';
import ChatWindow from './ChatWindow';
import { AppContext } from '../../context';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import messages from '../../../cypress/fixtures/messages.json';

describe('ChatWindow Component Tests', () => {
    let dynamicMessages = [...messages]; // Make a mutable copy of the initial messages

    beforeEach(() => {
        // Stub localStorage for authToken as before
        cy.stub(localStorage, 'getItem').withArgs('auth_token').returns('fake_auth_token');
      
        // Mock the AppContext as before
        const mockedContext = {
          user: { _id: 'user123', firstName: 'Test', lastName: 'User' },
          updateUser: cy.stub().resolves(),
        };
      
        // Intercept the GET request for fetching messages and alias it as 'fetchMessages'
        cy.intercept('GET', '/api/messages/1', {
          statusCode: 200,
          body: messages.filter(m => m.sender._id === '1' || m.recipient._id === '1'),
        }).as('fetchMessages');
      
        // Intercept the POST request for sending a new message
        cy.intercept('POST', '/api/messages/1', (req) => {
            const newMessage = req.body; // Assuming body structure matches your expected message format
            
            // Update dynamicMessages with the new message for subsequent GET requests to include it
            dynamicMessages.push({
                ...newMessage,
                _id: `mockedId-${dynamicMessages.length+1}`, // Generate a mock _id or use relevant property
                sender: { _id: 'user123' }, // Mock sender details as per your test context
                recipient: { _id: '1' },
                createdAt: new Date().toISOString()
            });

            req.reply({
                statusCode: 201,
                body: { message: 'Message sent successfully' },
            });
        }).as('postMessage');
      
        // Use MemoryRouter to simulate routing context
        mount(
          <MemoryRouter initialEntries={['/chat/1']}>
            <AppContext.Provider value={mockedContext}>
              <Routes>
                <Route path="/chat/:matchId" element={<ChatWindow />} />
              </Routes>
            </AppContext.Provider>
          </MemoryRouter>
        );
      });

    it('loads and displays messages correctly', () => {
    cy.wait('@fetchMessages').then((interception) => {
        // Wait for the fetchMessages intercept to complete
        // Now you can assert based on the intercepted request or proceed with further testing actions
        messages.filter(m => m.sender._id === '1' || m.recipient._id === '1').forEach((message) => {
        cy.contains(message.text);
        });
    });
    });
    
    // ! Needs fixing
    // it('sends new messages and updates view', () => {
    //     const newMessageText = "Hello, this is a new message!";
    //     cy.get('input[placeholder="Type a message..."]').type(newMessageText);
    //     cy.get('button').contains('Send').click();
        
    //     cy.wait('@postMessage');
    //     cy.wait('@fetchMessages');

    //     // Now, wait for UI to potentially update based on state change or fetch completion
    //     cy.contains(newMessageText, { timeout: 10000 }).should('be.visible'); // Wait up to 10 seconds to account for any delay
    // });

});
// eof
