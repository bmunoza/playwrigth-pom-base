import { test, expect } from '@playwright/test';

test('API demo-blaze login', async ({ request }) => {

  // 1️⃣ Hacer la petición POST al endpoint de login
  const response = await request.post('https://api.demoblaze.com/login', {
    data: {
      username: 'user_karate_123',
      password: '123456'
    }
  });

  // 2️⃣ Validar que el status sea 200
  expect(response.status()).toBe(200);

  // 3️⃣ Obtener y revisar el cuerpo JSON
  const body = await response.json();
  console.log('API Response:', body);

  // 4️⃣ Validar que el body contenga alguna propiedad esperada
  expect(body).toContain('Auth_token:');

});
