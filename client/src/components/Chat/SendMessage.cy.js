// src/components/Chat/SendMessage.cy.js, JN, 28.02.2022
import React from 'react';
import { mount } from 'cypress/react18';
import SendMessage from './SendMessage';

describe('SendMessage Component Tests', () => {
  it('allows the user to type and send a message', () => {
    const sendMessageMock = cy.stub().as('sendMessageMock');
    mount(<SendMessage sendMessage={sendMessageMock} />);

    cy.get('input[type="text"]')
      .type('Hello, World!{enter}');

    cy.wrap(sendMessageMock).should('be.calledWith', 'Hello, World!');
  });
});

// eof
