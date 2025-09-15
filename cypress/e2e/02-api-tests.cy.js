/// <reference types="cypress" />

describe('API Testing Examples', () => {
  const baseApiUrl = 'https://jsonplaceholder.typicode.com'

  it('should test GET requests', () => {
    // Test getting all posts
    cy.request('GET', `${baseApiUrl}/posts`)
      .then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).to.have.length.greaterThan(0)
        expect(response.body[0]).to.have.property('id')
        expect(response.body[0]).to.have.property('title')
        expect(response.body[0]).to.have.property('body')
        expect(response.body[0]).to.have.property('userId')
      })

    // Test getting a specific post
    cy.request('GET', `${baseApiUrl}/posts/1`)
      .then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).to.have.property('id', 1)
        expect(response.body).to.have.property('title')
        expect(response.body.title).to.be.a('string')
      })
  })

  it('should test POST requests', () => {
    const newPost = {
      title: 'Test Post',
      body: 'This is a test post created by Cypress',
      userId: 1
    }

    cy.request('POST', `${baseApiUrl}/posts`, newPost)
      .then((response) => {
        expect(response.status).to.eq(201)
        expect(response.body).to.have.property('id')
        expect(response.body.title).to.eq(newPost.title)
        expect(response.body.body).to.eq(newPost.body)
        expect(response.body.userId).to.eq(newPost.userId)
      })
  })

  it('should test PUT requests', () => {
    const updatedPost = {
      id: 1,
      title: 'Updated Test Post',
      body: 'This post has been updated by Cypress',
      userId: 1
    }

    cy.request('PUT', `${baseApiUrl}/posts/1`, updatedPost)
      .then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body.title).to.eq(updatedPost.title)
        expect(response.body.body).to.eq(updatedPost.body)
      })
  })

  it('should test PATCH requests', () => {
    const partialUpdate = {
      title: 'Partially Updated Title'
    }

    cy.request('PATCH', `${baseApiUrl}/posts/1`, partialUpdate)
      .then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body.title).to.eq(partialUpdate.title)
        expect(response.body).to.have.property('body')
        expect(response.body).to.have.property('userId')
      })
  })

  it('should test DELETE requests', () => {
    cy.request('DELETE', `${baseApiUrl}/posts/1`)
      .then((response) => {
        expect(response.status).to.eq(200)
      })
  })

  it('should test error responses', () => {
    // Test 404 error
    cy.request({
      url: `${baseApiUrl}/posts/999999`,
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(404)
    })
  })

  it('should test API with query parameters', () => {
    cy.request('GET', `${baseApiUrl}/posts?userId=1`)
      .then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).to.be.an('array')
        // Check that we get posts (the exact number may vary)
        expect(response.body.length).to.be.greaterThan(0)
        // Verify all returned posts belong to the requested user
        response.body.forEach(post => {
          expect(post.userId).to.eq(1)
        })
      })
  })

  it('should test API response headers', () => {
    cy.request('GET', `${baseApiUrl}/posts/1`)
      .then((response) => {
        expect(response.headers).to.have.property('content-type')
        expect(response.headers['content-type']).to.include('application/json')
      })
  })

  it('should test API response time', () => {
    const startTime = Date.now()
    
    cy.request('GET', `${baseApiUrl}/posts`)
      .then((response) => {
        const endTime = Date.now()
        const responseTime = endTime - startTime
        
        expect(response.status).to.eq(200)
        expect(responseTime).to.be.lessThan(5000) // Response should be under 5 seconds
      })
  })

  it('should test multiple API calls in sequence', () => {
    let userId

    // First, get a user
    cy.request('GET', `${baseApiUrl}/users/1`)
      .then((response) => {
        expect(response.status).to.eq(200)
        userId = response.body.id
      })

    // Then get posts for that user
    cy.then(() => {
      cy.request('GET', `${baseApiUrl}/posts?userId=${userId}`)
        .then((response) => {
          expect(response.status).to.eq(200)
          expect(response.body).to.be.an('array')
          response.body.forEach(post => {
            expect(post.userId).to.eq(userId)
          })
        })
    })
  })
})