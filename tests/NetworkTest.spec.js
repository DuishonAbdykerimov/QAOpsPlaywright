const { test, expect, request } = require('@playwright/test');
const { APiUtils } = require('../utils/APiUtils');
const { asyncWrapProviders } = require('node:async_hooks');

const loginPayLoad = {
    userEmail: "mrsnouden47@gmail.com",
    userPassword: "learningDk123*"
};

const orderPayLoad = {
    orders: [{ 
        country: "India", 
        productOrderedId: "6960eae1c941646b7a8b3ed3" 
    }]
};

const fakePayLoadOrders = {
    data: [],           // пустой массив заказов
    message: "No Orders"
};

let response;

test.beforeAll(async () => {
    const apiContext = await request.newContext();
    const apiUtils = new APiUtils(apiContext, loginPayLoad);
    response = await apiUtils.createOrder(orderPayLoad);
});

test(' Place the order', async ({ page }) => {
    
    // Вставляем токен
    await page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, response.token);

    await page.goto("https://rahulshettyacademy.com/client");

    // === МОКИРУЕМ ЗАПРОС НА ПОЛУЧЕНИЕ ЗАКАЗОВ ===
    await page.route("**/get-orders-for-customer/**", async (route) => {
        console.log("✅ Intercepted request to get-orders-for-customer");

        await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify(fakePayLoadOrders)
        });
    });
// Теперь переходим в My Orders
    await page.locator("button[routerlink*='myorders']").click();
   console.log(await page.locator(".mt-4").textContent());
});