/// <reference types="cypress" />

describe('Basic UI Interactions', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should display the homepage', () => {
    cy.contains('Kitchen Sink')
    cy.url().should('include', 'example.cypress.io')
  })

  it('should navigate to different sections', () => {
    // Test navigation
    cy.get('[data-cy="navbar"]').should('be.visible')
    
    // Click on Querying link
    cy.contains('Querying').click()
    cy.url().should('include', '/commands/querying')
    
    // Test various querying commands
    cy.get('[data-cy="querying-best-practices"]').should('exist')
    cy.get('.query-btn').should('contain', 'Button')
  })

  it('should interact with form elements', () => {
    cy.contains('Actions').click()
    cy.url().should('include', '/commands/actions')
    
    // Test input fields
    cy.get('.action-email')
      .type('test@example.com')
      .should('have.value', 'test@example.com')
    
    // Test textarea
    cy.get('.action-large')
      .type('This is a test message')
      .should('have.value', 'This is a test message')
    
    // Test checkboxes and radio buttons
    cy.get('.action-checkboxes [type="checkbox"]').check(['checkbox1', 'checkbox3'])
    cy.get('.action-radios [type="radio"]').check('radio2')
    
    // Test select dropdown
    cy.get('.action-select')
      .select('fr')
      .should('have.value', 'fr')
  })

  it('should handle button interactions', () => {
    cy.contains('Actions').click()
    
    // Test button clicks
    cy.get('.action-btn').click()
    cy.get('#action-canvas').click()
    
    // Test double click
    cy.get('.action-div').dblclick().should('not.be.visible')
    
    // Test right click
    cy.get('.rightclick-action-div').rightclick().should('not.be.visible')
  })

  it('should test drag and drop functionality', () => {
    cy.contains('Actions').click()
    
    // Test drag functionality (if available)
    cy.get('.action-div')
      .trigger('mousedown', { which: 1 })
      .trigger('mousemove', { clientX: 100, clientY: 100 })
      .trigger('mouseup')
  })

  it('should test keyboard interactions', () => {
    cy.contains('Actions').click()
    
    // Test keyboard input
    cy.get('.action-focus')
      .focus()
      .type('{leftarrow}{rightarrow}{uparrow}{downarrow}')
      .type('{del}{selectall}{backspace}')
      .type('Test keyboard input')
      .should('have.value', 'Test keyboard input')
  })
})

describe('Advanced UI Tests', () => {
  it('should test responsive design', () => {
    // Test mobile viewport
    cy.viewport(375, 667)
    cy.visit('/')
    cy.get('[data-cy="navbar"]').should('be.visible')
    
    // Test tablet viewport
    cy.viewport(768, 1024)
    cy.reload()
    cy.get('[data-cy="navbar"]').should('be.visible')
    
    // Test desktop viewport
    cy.viewport(1920, 1080)
    cy.reload()
    cy.get('[data-cy="navbar"]').should('be.visible')
  })

  it('should test accessibility features', () => {
    cy.visit('/')
    
    // Test tab navigation
    cy.get('body').tab()
    cy.focused().should('have.attr', 'href')
    
    // Test ARIA labels and roles
    cy.get('[role="navigation"]').should('exist')
    cy.get('[aria-label]').should('exist')
  })

  it('should test error handling', () => {
    // Test 404 page
    cy.visit('/non-existent-page', { failOnStatusCode: false })
    cy.contains('404').should('be.visible')
  })
})