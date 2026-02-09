import { test, expect } from '@playwright/test';

type UsuarioTest = {
  user: string;
  password: string;
};

const usuarios: UsuarioTest[] = [
  { user: 'admin', password: 'admin123' },
  { user: 'qa', password: 'qa123' }
];

test.describe('Pruebas de login y flujo de compra en SauceDemo', () => {
    
    test('@smoke Flujo completo: login, add to cart y checkout', async ({ page }) => {

        // 1️⃣ Login
        await page.goto('https://www.saucedemo.com/');

        await page.getByTestId('username').fill('standard_user');
        await page.getByTestId('password').fill('secret_sauce');
        await page.getByTestId('login-button').click();

        // 2️⃣ Validar página de inventario
        await expect(page).toHaveURL(/inventory/);
        await expect(page.locator('.inventory_list')).toBeVisible();

        // 3️⃣ Agregar producto específico
        await page.getByTestId('add-to-cart-sauce-labs-backpack').click();

        // 4️⃣ Ir al carrito
        await page.locator('.shopping_cart_link').click();
        await expect(page.locator('.cart_item')).toHaveCount(1);

        // 5️⃣ Checkout - Información del usuario
        await page.getByTestId('checkout').click();

        await page.getByTestId('firstName').fill('Brayan');
        await page.getByTestId('lastName').fill('QA');
        await page.getByTestId('postalCode').fill('110111');

        await page.getByTestId('continue').click();

        // 6️⃣ Finalizar compra
        await page.getByTestId('finish').click();

        // 7️⃣ Validación final
        await expect(
            page.getByRole('heading', { name: 'Thank you for your order!' })
        ).toBeVisible();
    });

    test('@smoke Login con credenciales inválidas', async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');

        await page.getByTestId('username').fill('invalid_user');
        await page.getByTestId('password').fill('invalid_password');
        await page.getByTestId('login-button').click();

        await expect(page.getByTestId('error')).toBeVisible();
    });
});