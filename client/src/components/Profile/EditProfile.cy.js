// src/components/Profile/EditProfile.cy.js, JN, 28.02.2024
import React from 'react'
import { mount } from 'cypress/react' // Import mount from @cypress/react
import EditProfile from './EditProfile'
import { AppContext } from '../../context'

// Mock user object and functions
const mockUser = {
  _id: '123',
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  age: '30',
  gender: 'Male',
  bio: 'This is a bio',
  profilePic: 'path/to/image.jpg'
}

// Stub fetch with cy.stub() if needed
Cypress.Commands.add('stubFetch', (statusCode, response) => {
  cy.stub(window, 'fetch').resolves({
    ok: true,
    json: () => Promise.resolve(response),
    status: statusCode
  })
})

describe('EditProfile Component Tests', () => {
  beforeEach(() => {
    // Here you can also stub the `localStorage.getItem` if authToken is needed.
    cy.stub(localStorage, 'getItem').withArgs('auth_token').returns('fakeAuthToken')
    
    // Mount the component with AppContext provider mock
    mount(
      <AppContext.Provider value={{ user: mockUser, updateUser: cy.stub().as('updateUser') }}>
        <EditProfile />
      </AppContext.Provider>
    )
  })

  it('loads with correct initial placeholders populated from context', () => {
    // Ensure that the input fields have correct placeholder text
    cy.get('#firstName').should('have.attr', 'placeholder', mockUser.firstName);
    cy.get('#lastName').should('have.attr', 'placeholder', mockUser.lastName);
    // Continue for other fields using their respective placeholders...
  });

  it('submits the form and shows success message', () => {
    // Stub network request for saving profile
    cy.stubFetch(200, {message: 'Profile updated successfully!'})

    // Interact with form elements and submit the form
    cy.get('#firstName').clear().type('Jane')
    cy.get('form').submit()

    // Check for Snackbar with success message
    cy.get('.MuiSnackbar-root').should('contain', 'Profile updated successfully!')
    // Check if updateUser was called
    cy.get('@updateUser').should('be.called')
  })

  // Add more tests as needed, for example, error handling, profile picture upload, etc.
})

// eof
