import React from 'react';
import { mount } from 'cypress/react';
import NotFound from './NotFound';

describe('NotFound Component', () => {
  it('renders the NotFound component correctly', () => {
    mount(<NotFound />);

    // Assert that the NotFound component is rendered
    cy.contains('404: This is not the webpage you are looking for').should('exist');
  });
});