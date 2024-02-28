// src/components/Profile/ViewProfile.cy.js, JN, 28.02.2024
import React from 'react'
import { mount } from 'cypress/react' // Or the equivalent function for your setup
import ViewProfile from './ViewProfile'
import { AppContext } from '../../context'
import ProfilePic from './ProfilePic'

// Define a mock user for testing
const mockUser = {
  firstName: 'John',
  email: 'john@example.com',
  profilePic: 'profilePic.jpg'
}

describe('ViewProfile Component Tests', () => {
    beforeEach(() => {
      cy.stub(localStorage, 'getItem').withArgs('auth_token').returns('fakeAuthToken');
  
      mount(
        <AppContext.Provider value={{user: mockUser, updateUser: cy.stub().as('updateUser')}}>
          <ViewProfile />
        </AppContext.Provider>
      );
    });
  
    it('displays the correct user information from context', () => {
      // Check for presence of user info directly
      cy.contains(`Name: ${mockUser.firstName}`);
      cy.contains(`Email: ${mockUser.email}`);
      // Assuming ProfilePic properly sets image source from props
      cy.get('img').should('have.attr', 'src', `/${mockUser.profilePic}`);
    });
  });

// eof
