// Import the necessary modules
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { mount } from 'cypress/react';
import TopBar from './TopBar';
import { AppContext } from '../context';

// Mock data for our tests
const mockUser = {
  firstName: 'John',
  profilePic: '/path/to/profilePic.jpg',
};

const settings = [
  { name: 'Profile', route: '/profile/view' },
  { name: 'Account', route: '/profile/edit' },
  { name: 'Logout', route: '/login' },
];

// Describe block for our component tests
describe('TopBar Component', () => {
  // Test case 1: TopBar without logged-in user
  it('renders login and register buttons when user is not logged in', () => {
    mount(
      <BrowserRouter>
        <AppContext.Provider value={{ user: null, updateUser: () => {} }}>
          <TopBar />
        </AppContext.Provider>
      </BrowserRouter>
    );
    cy.contains('Login').should('be.visible');
    cy.contains('Register').should('be.visible');
  });

  // Test case 2: TopBar with logged-in user
  it('renders user menu when user is logged in', () => {
    mount(
      <BrowserRouter>
        <AppContext.Provider value={{ user: mockUser, updateUser: () => {} }}>
          <TopBar />
        </AppContext.Provider>
      </BrowserRouter>
    );
    cy.contains(mockUser.firstName.charAt(0))
      .should('be.visible')
      .click();
    settings.forEach((setting) => {
      cy.contains(setting.name).should('be.visible');
    });
  });

  // Add more tests as needed to cover different component behaviors
});