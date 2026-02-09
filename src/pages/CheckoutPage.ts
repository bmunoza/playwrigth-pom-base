import { Page, Locator, expect } from '@playwright/test';

export class CheckoutPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async iniciarCheckout() {
    await this.page.locator('[data-test="checkout"]').click();
  }

  async completarInformacion(nombre: string, apellido: string, postal: string) {
    await this.page.locator('[data-test="firstName"]').fill(nombre);
    await this.page.locator('[data-test="lastName"]').fill(apellido);
    await this.page.locator('[data-test="postalCode"]').fill(postal);
    await this.page.locator('[data-test="continue"]').click();
  }

  async finalizarCompra() {
    await this.page.locator('[data-test="finish"]').click();
  }

  async validarCompraExitosa() {
    await expect(
      this.page.getByRole('heading', { name: 'Thank you for your order!' })
    ).toBeVisible();
  }
}
