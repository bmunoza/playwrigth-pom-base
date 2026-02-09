import { test, expect } from '@playwright/test';

test('@regression SauceDemo Login - MCP Test', async ({ page }) => {
  // Navigate to SauceDemo
  await page.goto('https://www.saucedemo.com/');

  // Fill username field
  const usernameInput = page.locator('input[data-test="username"]');
  await usernameInput.fill('standard_user');

  // Fill password field
  const passwordInput = page.locator('input[data-test="password"]');
  await passwordInput.fill('secret_sauce');

  // Click LOGIN button
  const loginButton = page.locator('input[data-test="login-button"]');
  await loginButton.click();

  // Assert correct redirection to inventory page
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  
  // Additional assertion: verify that the inventory page loaded correctly
  const inventoryTitle = page.locator('[data-test="title"]');
  await expect(inventoryTitle).toHaveText('Products');

  console.log('✅ Login successful and redirected to inventory page!');
});
