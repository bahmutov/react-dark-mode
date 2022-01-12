import React from 'react'
import DarkMode from './DarkMode'
import { mount } from '@cypress/react'

it('toggles dark mode', () => {
  mount(<DarkMode />)
  cy.get('#checkbox').should('not.be.checked')
  cy.get('.slider').click()
  cy.get('#checkbox').should('be.checked')
  cy.document()
    .its('documentElement')
    .should('have.attr', 'data-theme', 'dark')
  cy.wrap(localStorage)
    .invoke('getItem', 'theme')
    .should('eq', 'dark')

  cy.log('**toggle light mode**')
  cy.get('.slider').click()
  cy.get('#checkbox').should('not.be.checked')
})

it('loads the theme from the local storage', () => {
  cy.wrap(localStorage).invoke('setItem', 'theme', 'dark')
  mount(<DarkMode />)
  cy.get('#checkbox').should('be.checked')
  cy.document()
    .its('documentElement')
    .should('have.attr', 'data-theme', 'dark')
})

it('takes preferred media', () => {
  cy.window()
    .then((win) => {
      cy.stub(win, 'matchMedia')
        .returns({ matches: true })
        // @ts-ignore
        .as('matches')
    })
    .then(() => {
      mount(<DarkMode />)
    })
  // the matchMedia was called and the dark theme was applied
  cy.get('@matches').should('be.called')
  cy.get('#checkbox').should('be.checked')
  cy.document()
    .its('documentElement')
    .should('have.attr', 'data-theme', 'dark')
})

afterEach(() => {
  cy.clearLocalStorage('theme')
})
