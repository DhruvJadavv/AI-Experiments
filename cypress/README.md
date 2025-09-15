# Cypress Testing Framework - AI Experiments

This directory contains a comprehensive Cypress testing framework with sample tests covering various testing scenarios.

## Framework Overview

This Cypress framework includes:
- **Basic UI Tests**: Element interactions, navigation, form filling
- **API Testing**: REST API endpoints testing with full CRUD operations
- **Form Validation**: Input validation, form submission, accessibility
- **Advanced Scenarios**: Session management, performance testing, error handling
- **Visual & Accessibility**: Screenshot testing, a11y compliance, responsive design

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

### Installation
```bash
# Install dependencies
npm install

# Open Cypress Test Runner (GUI)
npm run cypress:open

# Run all tests in headless mode
npm run cypress:run
```

## Test Scripts

### Running Tests
```bash
# Run all tests
npm test

# Run specific test suites
npm run test:ui          # Basic UI interaction tests
npm run test:api         # API testing suite
npm run test:forms       # Form validation tests
npm run test:advanced    # Advanced testing scenarios
npm run test:visual      # Visual and accessibility tests

# Run tests in different browsers
npm run cypress:run:chrome
npm run cypress:run:firefox
npm run cypress:run:edge

# Run tests with tags
npm run test:smoke       # Smoke tests only
npm run test:regression  # Regression tests only
```

### Interactive Mode
```bash
# Open Cypress Test Runner for interactive testing
npm run cypress:open
```

## Test Structure

### Directory Layout
```
cypress/
├── e2e/                           # Test files
│   ├── 01-basic-ui-tests.cy.js    # UI interaction tests
│   ├── 02-api-tests.cy.js         # API testing examples
│   ├── 03-form-validation-tests.cy.js # Form validation
│   ├── 04-advanced-scenarios.cy.js    # Advanced test cases
│   └── 05-visual-accessibility-tests.cy.js # Visual/a11y tests
├── fixtures/                      # Test data
│   └── example.json              # Sample test data
├── support/                      # Support files
│   ├── commands.js              # Custom commands
│   └── e2e.js                   # Global configuration
└── downloads/                   # Downloaded files during tests
```

### Test Categories

#### 1. Basic UI Tests (`01-basic-ui-tests.cy.js`)
- Homepage validation
- Navigation testing
- Form element interactions
- Button clicks and interactions
- Keyboard navigation
- Responsive design testing

#### 2. API Tests (`02-api-tests.cy.js`)
- GET, POST, PUT, PATCH, DELETE requests
- Response validation
- Error handling
- Query parameters
- Headers validation
- Response time testing
- Sequential API calls

#### 3. Form Validation Tests (`03-form-validation-tests.cy.js`)
- Email format validation
- Required field validation
- Password strength testing
- Dropdown selections
- Checkbox and radio button testing
- File upload validation
- Character limits
- Accessibility features

#### 4. Advanced Scenarios (`04-advanced-scenarios.cy.js`)
- Session management
- Authentication flows
- Network condition simulation
- Offline behavior testing
- Performance monitoring
- Error handling
- Cross-browser compatibility
- Data-driven testing
- Memory leak prevention

#### 5. Visual & Accessibility Tests (`05-visual-accessibility-tests.cy.js`)
- Visual regression testing
- Screenshot comparisons
- Responsive layout testing
- Keyboard navigation
- ARIA attributes validation
- Color contrast testing
- Screen reader compatibility
- Motion preference testing
- Core Web Vitals measurement

## Custom Commands

The framework includes several custom Cypress commands:

```javascript
// Login with session management
cy.login(email, password)

// API requests with authentication
cy.apiRequest(method, url, body)

// Wait for elements with timeout
cy.waitForElement(selector, timeout)

// File upload helper
cy.uploadFile(selector, fileName)
```

## Configuration

### Cypress Configuration (`cypress.config.js`)
- Base URL configuration
- Viewport settings
- Timeout configurations
- Video and screenshot settings
- Browser settings

### Key Features Enabled
- Video recording of test runs
- Screenshots on failure
- Grep plugin for test filtering
- Custom command timeout settings
- Multiple browser support

## Test Data Management

### Fixtures (`cypress/fixtures/example.json`)
The framework uses JSON fixtures for test data:
- User data for authentication tests
- Product data for e-commerce scenarios
- Form data for validation testing
- API response mocking

## Best Practices Implemented

### 1. Page Object Pattern
- Reusable element selectors
- Modular test structure
- Maintainable test code

### 2. Test Organization
- Descriptive test names
- Grouped test suites
- Clear test documentation

### 3. Data Management
- External test data files
- Environment-specific configurations
- Secure credential handling

### 4. Error Handling
- Graceful failure handling
- Detailed error reporting
- Retry mechanisms

### 5. Performance Testing
- Load time measurements
- Memory usage monitoring
- Network performance testing

## Continuous Integration

The framework is ready for CI/CD integration:

```yaml
# Example GitHub Actions workflow
- name: Run Cypress Tests
  run: |
    npm install
    npm run cypress:run
```

## Browser Support

Tests can run on:
- Chrome/Chromium
- Firefox
- Edge
- Electron (default)

## Reporting

- Built-in Cypress Dashboard integration
- Video recordings of test runs
- Screenshots on test failures
- Console logging for debugging

## Contributing

When adding new tests:
1. Follow the existing naming convention
2. Use appropriate test categories
3. Include proper assertions
4. Add test data to fixtures when needed
5. Use custom commands for common operations

## Troubleshooting

### Common Issues
1. **Tests timing out**: Increase timeout in cypress.config.js
2. **Element not found**: Use proper waiting strategies
3. **Browser not opening**: Check browser installation
4. **API tests failing**: Verify network connectivity

### Debug Mode
```bash
# Run with debug information
DEBUG=cypress:* npm run cypress:run
```

## Resources

- [Cypress Documentation](https://docs.cypress.io)
- [Best Practices Guide](https://docs.cypress.io/guides/references/best-practices)
- [Custom Commands](https://docs.cypress.io/api/cypress-api/custom-commands)
- [CI/CD Integration](https://docs.cypress.io/guides/continuous-integration/introduction)