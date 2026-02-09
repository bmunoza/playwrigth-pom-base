import { expect, Page, Locator } from '@playwright/test';

export class GoogleHomePage {
  readonly page: Page;
  readonly searchInput: Locator;

  constructor(page: Page) {
    this.page = page;
    // Selector simple y estable para el input de búsqueda
    this.searchInput = page.locator('textarea[name="q"], input[name="q"]').first();
  }

  async goto() {
    // Usa baseURL del config
    await this.page.goto('/');
  }

  async assertLoaded() {
    await expect(this.page).toHaveTitle(/Google/);
    await expect(this.searchInput).toBeVisible();
  }

  async search(text: string) {
    await this.searchInput.fill(text);
    await this.searchInput.press('Enter');
  }
}
