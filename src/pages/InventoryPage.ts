import { Page, Locator, expect } from '@playwright/test';

export class InventoryPage {
  private page: Page;
  private inventoryList: Locator;
  private cartLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.inventoryList = page.locator('.inventory_list');
    this.cartLink = page.locator('.shopping_cart_link');
  }

  async validarPagina() {
    await expect(this.page).toHaveURL(/inventory/);
    await expect(this.inventoryList).toBeVisible();
  }

  async agregarProducto(product:string) {
    const botonProducto = this.page.getByTestId(`add-to-cart-${product}`);
    await expect(botonProducto).toBeVisible();
    await botonProducto.click();
      
      //sauce-labs-backpack
  }

  async irAlCarrito() {
    await this.cartLink.click();
  }
}
