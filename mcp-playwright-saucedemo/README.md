# MCP-Playwright SauceDemo Automation

This experiment demonstrates automated web testing using Playwright on the SauceDemo website.

## Overview

This automation script performs the following actions:
1. Navigates to `https://www.saucedemo.com/v1/`
2. Fills the username field (`#user-name`) with "Adam"
3. Fills the password field (`#password`) with "Adam@123"
4. Clicks the login button (`#login-button`)
5. Waits for navigation to complete
6. Takes a screenshot for verification

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager

## Installation

1. Navigate to the experiment directory:
   ```bash
   cd mcp-playwright-saucedemo
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Install Playwright browsers:
   ```bash
   npx playwright install
   ```

## Usage

### Run the original automation (as specified in requirements):

```bash
npm start
```

Or directly with Node.js:

```bash
node saucedemo-automation.js
```

This will use the credentials specified in the requirements:
- Username: "Adam"  
- Password: "Adam@123"

### Run the demo with valid credentials (for comparison):

```bash
node demo-valid-login.js
```

This demonstrates successful login using valid SauceDemo credentials:
- Username: "standard_user"
- Password: "secret_sauce"

## What to Expect

### Original Script (saucedemo-automation.js)
- The script will execute all required steps exactly as specified
- You'll see console logs showing each step being completed
- The login will fail (as expected) because "Adam" is not a valid username
- An error message will be displayed: "Epic sadface: Username and password do not match any user in this service"
- A screenshot (`saucedemo-result.png`) will be saved showing the error state

### Demo Script (demo-valid-login.js)  
- Shows successful login with valid credentials
- Demonstrates what happens when login succeeds
- Takes a screenshot (`saucedemo-success.png`) showing the inventory page
- Provides comparison to understand the difference between success and failure

## Troubleshooting

If you encounter login errors, note that SauceDemo has specific valid usernames. The script uses "Adam" which may not be a valid username on the SauceDemo site. Valid usernames include:
- `standard_user`
- `locked_out_user`
- `problem_user`
- `performance_glitch_user`

You can modify the script to use a valid username for successful login testing.

## Files

- `saucedemo-automation.js` - Main automation script (implements exact requirements)
- `demo-valid-login.js` - Demo script showing successful login with valid credentials
- `package.json` - Project dependencies and scripts
- `README.md` - This documentation file
- `saucedemo-result.png` - Screenshot of the automation result (generated after running main script)
- `saucedemo-success.png` - Screenshot of successful login (generated after running demo script)