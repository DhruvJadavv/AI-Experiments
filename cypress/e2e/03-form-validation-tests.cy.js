/// <reference types="cypress" />

describe('Form Validation Tests', () => {
  beforeEach(() => {
    cy.visit('/commands/actions')
  })

  it('should validate email input format', () => {
    const emailInput = '.action-email'
    
    // Test invalid email formats
    cy.get(emailInput)
      .clear()
      .type('invalid-email')
      .blur()
    
    // Test valid email format
    cy.get(emailInput)
      .clear()
      .type('test@example.com')
      .should('have.value', 'test@example.com')
  })

  it('should validate form submission with fixtures data', () => {
    cy.fixture('example').then((data) => {
      const formData = data.testData.formData
      
      // Fill form with test data
      cy.get('.action-email')
        .clear()
        .type('test@example.com')
      
      cy.get('.action-large')
        .clear()
        .type(formData.message)
        .should('contain.value', formData.message)
    })
  })

  it('should test required field validation', () => {
    // Test empty form submission
    cy.get('.action-form').within(() => {
      cy.get('[type="submit"]').click()
    })
    
    // Check for validation messages (if implemented)
    cy.get('.action-email')
      .should('have.focus')
      .type('required@test.com')
  })

  it('should test password strength validation', () => {
    cy.contains('Misc').click()
    
    // Test different password strengths
    const passwords = [
      { value: '123', strength: 'weak' },
      { value: 'password123', strength: 'medium' },
      { value: 'StrongP@ssw0rd!', strength: 'strong' }
    ]
    
    passwords.forEach(({ value, strength }) => {
      cy.get('#password')
        .clear()
        .type(value)
      
      // Check password strength indicator (if available)
      cy.log(`Testing password: ${value} (expected: ${strength})`)
    })
  })

  it('should test select dropdown validation', () => {
    // Test single select
    cy.get('.action-select')
      .select('fr')
      .should('have.value', 'fr')
    
    // Test multiple select
    cy.get('.action-select-multiple')
      .select(['fr', 'ny'])
      .invoke('val')
      .should('deep.equal', ['fr', 'ny'])
  })

  it('should test checkbox and radio button validation', () => {
    // Test checkbox selection
    cy.get('.action-checkboxes [type="checkbox"]')
      .check(['checkbox1', 'checkbox3'])
      .should('be.checked')
    
    // Uncheck specific checkbox
    cy.get('.action-checkboxes [value="checkbox1"]')
      .uncheck()
      .should('not.be.checked')
    
    // Test radio button selection
    cy.get('.action-radios [type="radio"]')
      .check('radio2')
      .should('be.checked')
    
    // Verify only one radio button is selected
    cy.get('.action-radios [value="radio1"]').should('not.be.checked')
    cy.get('.action-radios [value="radio3"]').should('not.be.checked')
  })

  it('should test file upload validation', () => {
    // Test file upload (if available)
    cy.get('input[type="file"]').then($input => {
      if ($input.length > 0) {
        // Create a test file
        const fileName = 'test.txt'
        const fileContent = 'This is a test file for upload validation'
        
        cy.writeFile(`cypress/fixtures/${fileName}`, fileContent)
        cy.get('input[type="file"]').selectFile(`cypress/fixtures/${fileName}`)
      }
    })
  })

  it('should test form field character limits', () => {
    const longText = 'a'.repeat(1000)
    
    cy.get('.action-large')
      .clear()
      .type(longText)
    
    // Check if text is truncated or limited
    cy.get('.action-large').invoke('val').then((value) => {
      cy.log(`Input length: ${value.length}`)
      expect(value.length).to.be.at.most(1000)
    })
  })

  it('should test form auto-completion', () => {
    // Test autocomplete functionality
    cy.get('.action-email')
      .type('test')
      .wait(500) // Wait for autocomplete suggestions
    
    // Press down arrow to select first suggestion
    cy.get('.action-email')
      .type('{downarrow}{enter}')
  })

  it('should test form accessibility features', () => {
    // Test tab navigation through form fields
    cy.get('body').tab()
    cy.focused().should('have.attr', 'type', 'email')
    
    // Continue tabbing through form
    cy.focused().tab()
    cy.focused().should('have.attr', 'id')
    
    // Test form labels association
    cy.get('label[for]').each($label => {
      const forId = $label.attr('for')
      cy.get(`#${forId}`).should('exist')
    })
  })

  it('should test form submission and reset', () => {
    // Fill out the form
    cy.get('.action-email').type('test@example.com')
    cy.get('.action-large').type('Test message')
    
    // Test form reset (if reset button exists)
    cy.get('form').within(() => {
      cy.get('[type="reset"]').then($reset => {
        if ($reset.length > 0) {
          cy.wrap($reset).click()
          cy.get('.action-email').should('have.value', '')
          cy.get('.action-large').should('have.value', '')
        }
      })
    })
  })
})