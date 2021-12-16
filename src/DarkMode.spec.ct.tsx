import React from "react";
import DarkMode from "./DarkMode";
import { mount } from '@cypress/react';

it('toggles dark mode', () => {
  mount(<DarkMode />)
  cy.get('#checkbox').should('not.be.checked')
  cy.get('.slider').click()
  cy.get('#checkbox').should('be.checked')
  cy.document().its('documentElement').should('have.attr', 'data-theme', 'dark')
  cy.wrap(localStorage).invoke('getItem', 'theme').should('eq', 'dark')
})

it.only('takes preferred media', () => {
  cy.window().then(win => {
    cy.stub(win, 'matchMedia').returns({ matches: true}).as('matches')
  }).then(() => {
    mount(<DarkMode />)
  })
})

afterEach(() => {
  cy.clearLocalStorage('theme')
})
