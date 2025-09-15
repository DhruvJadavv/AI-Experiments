/// <reference types="cypress" />

describe('Advanced Testing Scenarios', () => {
  
  describe('Session Management and Authentication', () => {
    it('should handle login session', () => {
      // Simulate login process
      cy.visit('/')
      
      // Mock a login scenario
      cy.window().then((win) => {
        win.localStorage.setItem('authToken', 'mock-jwt-token')
        win.sessionStorage.setItem('userSession', JSON.stringify({
          id: 1,
          email: 'test@example.com',
          role: 'user'
        }))
      })
      
      cy.reload()
      
      // Verify session data
      cy.window().its('localStorage.authToken').should('equal', 'mock-jwt-token')
    })

    it('should handle logout', () => {
      // Set up session data
      cy.window().then((win) => {
        win.localStorage.setItem('authToken', 'mock-jwt-token')
      })
      
      // Simulate logout
      cy.window().then((win) => {
        win.localStorage.removeItem('authToken')
        win.sessionStorage.clear()
      })
      
      // Verify session is cleared
      cy.window().its('localStorage').should('not.have.property', 'authToken')
    })
  })

  describe('Network and Performance Testing', () => {
    it('should test network conditions', () => {
      // Simulate slow network
      cy.intercept('GET', '**/api/**', (req) => {
        req.reply((res) => {
          res.delay(2000) // 2 second delay
          res.send({ fixture: 'example.json' })
        })
      })
      
      cy.visit('/')
      cy.wait(3000) // Wait for delayed response
    })

    it('should test offline behavior', () => {
      cy.visit('/')
      
      // Simulate going offline
      cy.window().then((win) => {
        cy.stub(win.navigator, 'onLine').value(false)
        win.dispatchEvent(new Event('offline'))
      })
      
      // Test offline functionality
      cy.log('Application is now offline')
      
      // Simulate going back online
      cy.window().then((win) => {
        cy.stub(win.navigator, 'onLine').value(true)
        win.dispatchEvent(new Event('online'))
      })
    })

    it('should measure page load performance', () => {
      cy.visit('/', {
        onBeforeLoad: (win) => {
          win.performance.mark('page-start')
        },
        onLoad: (win) => {
          win.performance.mark('page-end')
          win.performance.measure('page-load', 'page-start', 'page-end')
        }
      })
      
      cy.window().then((win) => {
        const measure = win.performance.getEntriesByName('page-load')[0]
        expect(measure.duration).to.be.lessThan(5000) // Under 5 seconds
      })
    })
  })

  describe('Error Handling and Edge Cases', () => {
    it('should handle JavaScript errors gracefully', () => {
      cy.visit('/')
      
      // Inject an error and verify it's handled
      cy.window().then((win) => {
        cy.stub(win.console, 'error').as('consoleError')
        // Trigger an intentional error
        win.eval('throw new Error("Test error")')
      })
      
      // Verify error was logged
      cy.get('@consoleError').should('have.been.called')
    })

    it('should test browser compatibility features', () => {
      cy.visit('/')
      
      // Test localStorage support
      cy.window().then((win) => {
        expect(win.localStorage).to.exist
        win.localStorage.setItem('test', 'value')
        expect(win.localStorage.getItem('test')).to.equal('value')
        win.localStorage.removeItem('test')
      })
      
      // Test sessionStorage support
      cy.window().then((win) => {
        expect(win.sessionStorage).to.exist
      })
      
      // Test modern JavaScript features
      cy.window().then((win) => {
        // Test arrow functions
        const testArrow = () => 'arrow function works'
        expect(testArrow()).to.equal('arrow function works')
        
        // Test template literals
        const name = 'Cypress'
        const greeting = `Hello, ${name}!`
        expect(greeting).to.equal('Hello, Cypress!')
      })
    })

    it('should test memory leaks prevention', () => {
      cy.visit('/')
      
      // Monitor memory usage
      cy.window().then((win) => {
        if (win.performance && win.performance.memory) {
          const initialMemory = win.performance.memory.usedJSHeapSize
          cy.log(`Initial memory usage: ${initialMemory}`)
          
          // Perform memory-intensive operations
          const largeArray = new Array(1000000).fill('test')
          
          // Clean up
          largeArray.length = 0
          
          // Force garbage collection if available
          if (win.gc) {
            win.gc()
          }
          
          const finalMemory = win.performance.memory.usedJSHeapSize
          cy.log(`Final memory usage: ${finalMemory}`)
        }
      })
    })

    it('should test cross-browser compatibility', () => {
      cy.visit('/')
      
      // Test user agent detection
      cy.window().then((win) => {
        const userAgent = win.navigator.userAgent
        cy.log(`User Agent: ${userAgent}`)
        
        // Test browser-specific features
        if (userAgent.includes('Chrome')) {
          cy.log('Running on Chrome/Chromium')
        } else if (userAgent.includes('Firefox')) {
          cy.log('Running on Firefox')
        } else if (userAgent.includes('Safari')) {
          cy.log('Running on Safari')
        }
      })
    })
  })

  describe('Data-driven Testing', () => {
    it('should run tests with multiple data sets', () => {
      cy.fixture('example').then((data) => {
        data.users.forEach((user) => {
          cy.log(`Testing with user: ${user.name}`)
          
          // Simulate user-specific actions
          cy.visit('/')
          cy.window().then((win) => {
            win.localStorage.setItem('currentUser', JSON.stringify(user))
          })
          
          // Verify user data is set
          cy.window().its('localStorage.currentUser').then((userStr) => {
            const userData = JSON.parse(userStr)
            expect(userData.email).to.equal(user.email)
            expect(userData.role).to.equal(user.role)
          })
          
          // Clean up
          cy.window().then((win) => {
            win.localStorage.removeItem('currentUser')
          })
        })
      })
    })

    it('should test with different viewport sizes', () => {
      const viewports = [
        { width: 320, height: 568, device: 'iPhone SE' },
        { width: 375, height: 667, device: 'iPhone 8' },
        { width: 768, height: 1024, device: 'iPad' },
        { width: 1440, height: 900, device: 'Desktop' }
      ]
      
      viewports.forEach((viewport) => {
        cy.viewport(viewport.width, viewport.height)
        cy.visit('/')
        cy.log(`Testing on ${viewport.device} (${viewport.width}x${viewport.height})`)
        
        // Test responsive elements
        cy.get('body').should('be.visible')
        
        // Take screenshot for visual verification
        cy.screenshot(`${viewport.device}-${viewport.width}x${viewport.height}`)
      })
    })
  })

  describe('Custom Commands Usage', () => {
    it('should use custom wait command', () => {
      cy.visit('/')
      
      // Use custom waitForElement command
      cy.waitForElement('body', 5000)
      cy.waitForElement('[data-cy="navbar"]', 10000)
    })

    it('should use custom API request command', () => {
      // Use custom apiRequest command
      cy.apiRequest('GET', 'https://jsonplaceholder.typicode.com/posts/1')
        .then((response) => {
          expect(response.status).to.eq(200)
          expect(response.body).to.have.property('id', 1)
        })
    })
  })
})