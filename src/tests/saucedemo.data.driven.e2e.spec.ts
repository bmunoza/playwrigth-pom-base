import { test } from '@playwright/test';
import { usuarios } from '../data/usuarios';
import { Productos, Producto } from '../data/productos';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CheckoutPage } from '../pages/CheckoutPage';

const productos: Producto[] = [
  Productos.BACKPACK,
  Productos.BOLT_TSHIRT
];
const usuario = usuarios[0];

  for (const prod of productos) {
    test(`@regression Compra ${prod} con ${usuario.user}`, async ({ page }) => {
      const login = new LoginPage(page);
      const inventory = new InventoryPage(page);
      const checkout = new CheckoutPage(page);

      await login.open();
      await login.login(usuario.user, usuario.password);

      await inventory.validarPagina();
      await inventory.agregarProducto(prod);
      await inventory.irAlCarrito();

      await checkout.iniciarCheckout();
      await checkout.completarInformacion('Brayan', 'QA', '110111');
      await checkout.finalizarCompra();
      await checkout.validarCompraExitosa();
    });
  }
