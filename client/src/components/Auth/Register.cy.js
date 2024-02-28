// src/components/Auth/Register.cy.js, JN, 28.02.2024

// Import dependencies
import React from 'react';
import { mount } from 'cypress/react'; // Make sure to have @cypress/react installed for component testing
import Register from './Register';
import { toast } from 'react-toastify';

// Assuming the necessary mocking and setup for toast and redirect are done correctly
// We should start directly with describe function

describe('Register Component', () => {
    beforeEach(() => {
        // Mount the component before each test
        mount(<Register />);
        // Here we could stub non-Cypress functionalities if needed.

        // Stub toast.error to prevent it from showing up in the logs or failing the tests.
        cy.stub(toast, 'error').as('toastErrorStub');
    });

    it('submits the form with user input', () => {
        // Now we stub fetch within the test or beforeEach
        cy.stub(window, 'fetch').resolves({
            ok: true,
            json: () => Promise.resolve({}),
        }).as('registerFetchStub'); // Naming the stub for clearer reference

        // Fill in the form
        cy.get('[data-cy=register-email]').type('test@example.com');
        cy.get('[data-cy=register-password]').type('password123');
        cy.get('[data-cy=register-first-name]').type('John');
        cy.get('[data-cy=register-last-name]').type('Doe');
        cy.get('[data-cy=register-age]').type('30');
        cy.get('[data-cy=register-gender]').select('Male');

        // Submit the form
        cy.get('[data-cy=register-submit]').click();

        // Ensure fetch was called with correct arguments
        cy.get('@registerFetchStub').should('be.calledWith', '/api/auth/register', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: 'test@example.com',
                password: 'password123',
                firstName: 'John',
                lastName: 'Doe',
                age: '30',
                gender: 'Male',
            }),
        });
    });

    it('displays an error toast on registration failure', () => {
        // Here we again stub fetch, but with an error scenario
        cy.stub(window, 'fetch').resolves({
            ok: false,
            json: () => Promise.resolve({ error: "User already exists" }),
        }).as('registerFetchFailStub');

        // Fill in and submit the form as before
        cy.get('[data-cy=register-email]').type('test@example.com');
        cy.get('[data-cy=register-submit]').click();

        // We now expect the error toast to have been called.
        // The assertion is adjusted to fit the corrected stubbing approach.
        cy.get('@toastErrorStub').should('be.calledWith', 'User already exists');
    });
});

// eof
