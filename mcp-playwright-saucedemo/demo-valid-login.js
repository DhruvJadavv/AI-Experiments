const { chromium } = require('playwright');

/**
 * MCP-Playwright SauceDemo Automation - Demo with Valid Credentials
 * 
 * This script demonstrates successful login with valid SauceDemo credentials
 * for comparison purposes. It shows what happens when using a valid username.
 */

async function runSauceDemoWithValidCredentials() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    console.log('🚀 Starting SauceDemo automation with valid credentials...');

    // Navigate to SauceDemo website
    console.log('📱 Navigating to https://www.saucedemo.com/v1/');
    await page.goto('https://www.saucedemo.com/v1/');
    await page.waitForLoadState('networkidle');
    console.log('✅ Page loaded successfully');

    // Fill with valid username
    console.log('👤 Filling username field with "standard_user" (valid)');
    await page.fill('#user-name', 'standard_user');
    console.log('✅ Username filled');

    // Fill with valid password
    console.log('🔒 Filling password field with "secret_sauce"');
    await page.fill('#password', 'secret_sauce');
    console.log('✅ Password filled');

    // Click login button
    console.log('🔘 Clicking login button');
    await page.click('#login-button');
    console.log('✅ Login button clicked');

    // Wait for navigation to complete
    console.log('⏳ Waiting for navigation to complete...');
    await page.waitForLoadState('networkidle');
    
    const currentUrl = page.url();
    console.log(`📍 Current URL: ${currentUrl}`);
    
    if (currentUrl.includes('inventory')) {
      console.log('🎉 Login successful! Redirected to inventory page');
      
      // Get page title to confirm we're on the right page
      const title = await page.title();
      console.log(`📄 Page title: ${title}`);
      
      // Check if products are loaded
      const products = await page.$$('.inventory_item');
      console.log(`📦 Found ${products.length} products on the page`);
      
    } else {
      console.log('⚠️  Login may have failed or error occurred');
    }

    // Take a screenshot
    await page.screenshot({ path: 'saucedemo-success.png', fullPage: true });
    console.log('📸 Screenshot saved as saucedemo-success.png');

    await page.waitForTimeout(2000);

  } catch (error) {
    console.error('❌ Error during automation:', error);
  } finally {
    await browser.close();
    console.log('🔚 Browser closed');
  }
}

// Run the demo
if (require.main === module) {
  runSauceDemoWithValidCredentials()
    .then(() => {
      console.log('✅ Demo automation completed successfully');
    })
    .catch((error) => {
      console.error('❌ Demo automation failed:', error);
      process.exit(1);
    });
}

module.exports = { runSauceDemoWithValidCredentials };