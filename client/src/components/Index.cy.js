// src/components/Index.cy.js, JN, 28.02.2024
import React from 'react';
import { mount } from 'cypress/react';
import Index from './Index';
import { AppContext } from '../context';

// Mock user data for a logged-in scenario
const mockedUser = {
  firstName: 'Jane',
  lastName: 'Doe',
};

// Context Provider mock for updating and providing user status
const MockProvider = ({ children, value = {} }) => {
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

describe('Index Component Tests', () => {

  // Testing logged-in state
  it('should display welcome message for logged-in users', () => {
    // Mock local storage to simulate a logged-in user
    cy.stub(localStorage, 'getItem').withArgs('auth_token').returns('mock_token');

    // Mounting Index component with AppContext and a mocked user
    mount(
      <MockProvider value={{ user: mockedUser, updateUser: cy.stub().as('updateUser') }}>
        <Index />
      </MockProvider>
    );

    // Assertions
    cy.contains(`Welcome, ${mockedUser.firstName} ${mockedUser.lastName}!`).should('be.visible');
    cy.contains('This is the default index page component.').should('be.visible');
  });

  // Testing non-logged-in state
  it('should display sign in and sign up buttons for guests', () => {
    // Ensure localStorage returns nothing to simulate guest state
    cy.stub(localStorage, 'getItem').withArgs('auth_token').returns(null);

    // Mounting Index component with AppContext and no user
    mount(
      <MockProvider value={{ user: null, updateUser: cy.stub().as('updateUser') }}>
        <Index />
      </MockProvider>
    );

    // Assertions
    cy.contains('Welcome to Matcher!').should('be.visible');
    cy.contains('Please start by signing in or signing up.').should('be.visible');
    cy.contains('Sign in').should('be.visible');
    cy.contains('Sign up').should('be.visible');
  });

});

// eof
  