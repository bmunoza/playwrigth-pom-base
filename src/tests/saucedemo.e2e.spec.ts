import { test } from '@playwright/test'
import { LoginPage } from '../pages/LoginPage'
import { InventoryPage } from '../pages/InventoryPage'
import { CheckoutPage } from '../pages/CheckoutPage'


test('Flujo completo Sauce Demo con POM', async ({ page }) =>{

    const loginPage = new LoginPage(page);
    const checkoutPage = new CheckoutPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.open();
    await loginPage.login('standard_user', 'secret_sauce')

    await inventoryPage.validarPagina();
    await inventoryPage.agregarProducto('sauce-labs-bolt-t-shirt');
    await inventoryPage.irAlCarrito();

    await checkoutPage.iniciarCheckout();
    await checkoutPage.completarInformacion('Brayan', 'QA', '110111');
    await checkoutPage.finalizarCompra();
    await checkoutPage.validarCompraExitosa();


});
