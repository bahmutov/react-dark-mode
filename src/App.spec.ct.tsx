import React from 'react'
import { mount } from '@cypress/react'
import App from './App'

it('toggles the theme', () => {
  mount(<App />)
  cy.get('a').contains('Learn React')
  cy.get('#checkbox').should('not.be.checked')
  cy.document()
    .its('documentElement')
    .should('have.attr', 'data-theme', 'light')
  cy.get('.slider').click()
  cy.get('#checkbox').should('be.checked')
  cy.document()
    .its('documentElement')
    .should('have.attr', 'data-theme', 'dark')
  cy.log('back to ☀️')
  cy.get('.slider').click()
  cy.document()
    .its('documentElement')
    .should('have.attr', 'data-theme', 'light')
})

it('uses local storage value first', () => {
  cy.log('setting 🌒 in local storage')
  cy.document()
    .its('documentElement')
    .should('have.attr', 'data-theme', 'light')
  localStorage.setItem('theme', 'dark')
  mount(<App />)
  cy.get('#checkbox').should('be.checked')
  cy.document()
    .its('documentElement')
    .should('have.attr', 'data-theme', 'dark')
})

it('uses media match', () => {
  cy.window().then((win) => {
    cy.stub(win, 'matchMedia')
      .withArgs('(prefers-color-scheme: dark)')
      .returns({ matches: true })
      .as('matchMedia')
  })
  mount(<App />)
  cy.get('#checkbox').should('be.checked')
  cy.document()
    .its('documentElement')
    .should('have.attr', 'data-theme', 'dark')
  cy.get('@matchMedia').should('have.been.calledOnce')
})
