import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './src/tests',
  timeout: 30_000,
  expect: { timeout: 5_000 },

  // Run tests in parallel by default
  workers: 4,        // ajusta a tu CPU / CI
  fullyParallel: true,
  retries: 1,

  // Reporter
  reporter: [
  ['html', { outputFolder: 'playwright-report', open: 'never' }]
],


  use: {
    // Base URL can be overridden with: BASE_URL=https://... npm test
    baseURL: process.env.BASE_URL || 'https://www.google.com',
    headless: true,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    testIdAttribute: 'data-test',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
  ],
});
