const { chromium } = require('playwright');

/**
 * MCP-Playwright SauceDemo Automation
 * 
 * This script automates the login process on the SauceDemo website:
 * 1. Navigates to https://www.saucedemo.com/v1/
 * 2. Fills username field with "Adam"
 * 3. Fills password field with "Adam@123"
 * 4. Clicks the login button
 * 5. Waits for navigation to complete
 */

async function runSauceDemoAutomation() {
  const browser = await chromium.launch({ headless: true }); // Set to false to see the browser
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    console.log('🚀 Starting SauceDemo automation...');

    // Step 1: Navigate to SauceDemo website
    console.log('📱 Navigating to https://www.saucedemo.com/v1/');
    await page.goto('https://www.saucedemo.com/v1/');
    
    // Wait for the page to load completely
    await page.waitForLoadState('networkidle');
    console.log('✅ Page loaded successfully');

    // Step 2: Fill username field
    console.log('👤 Filling username field with "Adam"');
    await page.fill('#user-name', 'Adam');
    console.log('✅ Username filled');

    // Step 3: Fill password field
    console.log('🔒 Filling password field with "Adam@123"');
    await page.fill('#password', 'Adam@123');
    console.log('✅ Password filled');

    // Step 4: Click login button
    console.log('🔘 Clicking login button');
    await page.click('#login-button');
    console.log('✅ Login button clicked');

    // Step 5: Wait for navigation to complete
    console.log('⏳ Waiting for navigation to complete...');
    await page.waitForLoadState('networkidle');
    
    // Check if login was successful by looking for inventory page elements
    const currentUrl = page.url();
    console.log(`📍 Current URL: ${currentUrl}`);
    
    if (currentUrl.includes('inventory')) {
      console.log('🎉 Login successful! Redirected to inventory page');
    } else {
      console.log('⚠️  Login may have failed or error occurred');
      
      // Check for error messages
      const errorElement = await page.$('.error-message-container');
      if (errorElement) {
        const errorText = await errorElement.textContent();
        console.log(`❌ Error message: ${errorText}`);
      }
      
      // Also check for specific error text elements
      const errorButton = await page.$('[data-test="error"]');
      if (errorButton) {
        const errorButtonText = await errorButton.textContent();
        console.log(`❌ Error details: ${errorButtonText}`);
      }
    }

    // Take a screenshot for verification
    await page.screenshot({ path: 'saucedemo-result.png', fullPage: true });
    console.log('📸 Screenshot saved as saucedemo-result.png');

    // Wait a moment to see the result
    await page.waitForTimeout(3000);

  } catch (error) {
    console.error('❌ Error during automation:', error);
  } finally {
    await browser.close();
    console.log('🔚 Browser closed');
  }
}

// Run the automation if this script is executed directly
if (require.main === module) {
  runSauceDemoAutomation()
    .then(() => {
      console.log('✅ Automation completed successfully');
    })
    .catch((error) => {
      console.error('❌ Automation failed:', error);
      process.exit(1);
    });
}

module.exports = { runSauceDemoAutomation };