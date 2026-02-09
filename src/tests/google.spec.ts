import { test } from '@playwright/test';
import { GoogleHomePage } from '@pages/GoogleHomePage';

test.describe('Smoke - Google', () => {
  test('abre Google y valida que cargó', async ({ page }) => {
    const google = new GoogleHomePage(page);

    await google.goto();
    await google.assertLoaded();
    await google.search('Playwright');
  });
});
