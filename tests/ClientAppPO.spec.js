const { test, expect } = require("@playwright/test");
const {customtest} = require('../utils/test-base');
const { POManager } = require("../pageobjects/POManager");
//Json->string->jsobject
const dataset = JSON.parse(JSON.stringify(require("../utils/placeorderTestData.json")));

for(const data of dataset)
{
test(`@Web -Login-4 for ${data.productName}`, async ({ page }) => {
  
  const poManager = new POManager(page);

  const loginPage = poManager.getLoginPage();
  const dashboardPage = poManager.getDashboardPage();
  const cartPage = poManager.getCartPage();
  const ordersReviewPage = poManager.getOrdersReviewPage();
// ==================== ЛОГИН ====================
  await loginPage.goTo();
  await loginPage.validLogin(data.username, data.password);
// ==================== ДОБАВЛЕНИЕ В КОРЗИНУ ====================
  await dashboardPage.searchProductAddCart(data.productName);
  await dashboardPage.navigateToCart();
// ==================== ПРОВЕРКА В КОРЗИНЕ ====================
  await cartPage.VerifyProductIsDisplayed(data.productName);
  await cartPage.Checkout();

  // ==================== ОФОРМЛЕНИЕ ЗАКАЗА ====================
  await ordersReviewPage.searchCountryAndSelect("ind", "India");
  const orderId = await ordersReviewPage.SubmitAndGetOrderId();

  // ==================== ПРОВЕРКА В MY ORDERS ====================
  await page.locator('button[routerlink*="myorders"]').click();
  await page.locator("tbody").waitFor();

  const rows = page.locator("tbody tr");
  let orderFound = false;

  for (let i = 0; i < (await rows.count()); i++) {
    const rowOrderId = await rows.nth(i).locator("th").textContent();
    if (orderId.includes(rowOrderId.trim())) {
      await rows.nth(i).locator("button").first().click();
      orderFound = true;
      break;
    }
  }

  expect(orderFound).toBeTruthy();
  console.log("✅ Тест успешно пройден! Order ID:", orderId);
});



// customtest('Login-4 with Data', async ({ page, testDataForOrder }) => {
    
//   const poManager = new POManager(page);

//   const loginPage = poManager.getLoginPage();
//   const dashboardPage = poManager.getDashboardPage();
//   const cartPage = poManager.getCartPage();
//   const ordersReviewPage = poManager.getOrdersReviewPage();

//   // ==================== ЛОГИН ====================
//   await loginPage.goTo();
//   await loginPage.validLogin(testDataForOrder.username, testDataForOrder.password);

//   // ==================== ДОБАВЛЕНИЕ В КОРЗИНУ ====================
//   await dashboardPage.searchProductAddCart(testDataForOrder.productName);
//   await dashboardPage.navigateToCart();

//   // ==================== ПРОВЕРКА В КОРЗИНЕ ====================
//   await cartPage.VerifyProductIsDisplayed(testDataForOrder.productName);
//   await cartPage.Checkout();

//   console.log("✅ Тест успешно выполнен с данными:", testDataForOrder.productName);
// });



// test("Search and View Order", async ({ page }) => {
//   await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
//   await page.locator("#userEmail").fill("mrsnouden47@gmail.com");
//   //await page.locator("#userEmail").fill(uniqueEmail);
//   await page.locator("#userPassword").fill("learningDk123*");
//   await page.locator("#login").click();

//   await page.locator('button[routerlink*="myorders"]').click();
//   const orderId = "69df7a5bf86ba51a6567bdab"; // Твой ID со скрина

//   // 1. Находим нужную строку, которая содержит этот ID
//   const row = page.locator("tr").filter({ hasText: orderId });

//   // 2. Проверяем, нашлась ли такая строка вообще
//   if ((await row.count()) > 0) {
//     console.log("Ура! Заказ найден. Нажимаю View...");

//     // 3. Внутри ЭТОЙ ЖЕ найденной строки кликаем по кнопке View
//     await row.locator("button:has-text('View')").click();
//   } else {
//     console.log("NOT FOUND: Такого ID в списке нет");
//   }
//   //await page.pause();
// });
}