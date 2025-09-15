// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// -- This is a parent command --
Cypress.Commands.add('login', (email, password) => {
  cy.session(
    [email, password],
    () => {
      cy.visit('/login')
      cy.get('[data-cy=email]').type(email)
      cy.get('[data-cy=password]').type(password)
      cy.get('[data-cy=submit]').click()
      cy.url().should('contain', '/dashboard')
    },
    {
      validate: () => {
        cy.getCookie('session').should('exist')
      },
    }
  )
})

// -- This is a child command --
Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => {
  // ... previous subject is automatically received
  // and yielded as the first argument
})

// -- This is a dual command --
Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => {
  // ... conditionally accept previous subject
  // and yield it or a new subject
})

// Custom command for API requests with authentication
Cypress.Commands.add('apiRequest', (method, url, body = {}) => {
  return cy.request({
    method: method,
    url: url,
    body: body,
    headers: {
      'Content-Type': 'application/json',
    }
  })
})

// Custom command for waiting for elements to be visible
Cypress.Commands.add('waitForElement', (selector, timeout = 10000) => {
  cy.get(selector, { timeout }).should('be.visible')
})

// Custom command for handling file uploads
Cypress.Commands.add('uploadFile', (selector, fileName) => {
  cy.get(selector).selectFile(`cypress/fixtures/${fileName}`)
})