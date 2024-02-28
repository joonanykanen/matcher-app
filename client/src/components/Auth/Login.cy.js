// src/components/Auth/Login.cy.js, JN, 28.02.2024
import React from 'react';
import { mount } from 'cypress/react';
import Login from './Login';
import { ToastContainer } from 'react-toastify';

// Import styles for react-toastify if needed. Adjust the path according to your project structure.
import 'react-toastify/dist/ReactToastify.css';

describe('Login Component', () => {
  beforeEach(() => {
    mount(
      <>
        <ToastContainer />
        <Login />
      </>
    );
  });

  it('renders the login form', () => {
    cy.get('h2').should('contain', 'Login');
    cy.get('[data-cy=login-email]').should('exist');
    cy.get('[data-cy=login-password]').should('exist');
    cy.get('[data-cy=login-submit]').should('exist');
  });

  it('allows input of email and password', () => {
    cy.get('[data-cy=login-email]').type('test@example.com');
    cy.get('[data-cy=login-email]').should('have.value', 'test@example.com');

    cy.get('[data-cy=login-password]').type('password');
    cy.get('[data-cy=login-password]').should('have.value', 'password');
  });

  // Optional: If you want to simulate a successful or failed login attempt,
  // you need to handle network requests using Cypress intercept commands.
  // Below is a way to simulate a successful login:

  it('handles successful login', () => {
    // Mock the API request that is triggered on login
    cy.intercept('POST', '/api/auth/login', {
      statusCode: 200,
      body: { token: 'fakeToken' }
    }).as('loginRequest');

    // Simulating user input
    cy.get('[data-cy=login-email]').type('user@example.com');
    cy.get('[data-cy=login-password]').type('password');

    // Simulating form submission
    cy.get('[data-cy=login-submit]').click();

    // Check if our mock request was made
    cy.wait('@loginRequest');

    // Further checks can be performed here, like verifying localStorage or checking window.location changes
    cy.window().its('localStorage.auth_token').should('equal', 'fakeToken');
  });

  // Additional tests can be added to simulate failed login attempts, displaying error messages, etc.
});

// eof
