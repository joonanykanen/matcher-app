// src/components/Chat/ChatListView.spec.js, JN, 28.02.2022
import React from 'react';
import { mount } from 'cypress/react18';
import ChatListView from './ChatListView';
import { AppContext } from '../../context';
import matches from '../../../cypress/fixtures/matches.json';
import messages from '../../../cypress/fixtures/messages.json';

describe('ChatListView Component Tests', () => {
    let updateUserStub, updateMatchesStub, updateMessagesStub;

    beforeEach(() => {
        // Intercept the fetch matches call and return the matches from your fixture
        cy.intercept('GET', '/api/users/*', (req) => {
            const id = req.url.match(/\/api\/users\/(.*)/)[1];
            const match = matches.find((m) => m._id === id);
            req.reply(match);
        }).as('fetchMatches');
    
        // Initialize stubs here
        updateUserStub = cy.stub().resolves();
        updateMatchesStub = cy.stub().resolves(matches);
        updateMessagesStub = cy.stub().resolves(messages);

        // Mock the context values you'll use
        const mockedContext = {
            user: { _id: 'user123', firstName: 'Test', lastName: 'User' },
            updateUser: updateUserStub,
            matches: matches.map(match => match._id), // Assuming updateMatches sets matches ids
            updateMatches: updateMatchesStub,
            messages: messages,
            updateMessages: updateMessagesStub
        };

        // Stub localStorage before mounting
        cy.stub(localStorage, 'getItem').withArgs('auth_token').returns('fake_auth_token');

        mount(
            <AppContext.Provider value={mockedContext}>
                <ChatListView />
            </AppContext.Provider>
        );
    });
    
    it('loads and displays matches correctly', () => {
        // Your test code remains the same
        cy.get('.chat-list').should('have.length', matches.length);
        matches.forEach((match) => {
            cy.contains(match.firstName);
        });
    });

    it('updates match data with latest messages', () => {
        messages.forEach((message) => {
            if (message.sender._id !== 'user123') {
                cy.contains(message.text);
            }
        });
    });

    // Add more tests as necessary
});
// eof
