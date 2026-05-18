const { test, expect } = require('@playwright/test');

let webContext;

test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    await page.locator("#userEmail").fill('mrsnouden47@gmail.com');
    await page.locator("#userPassword").fill('learningDk123*');
    await page.locator("#login").click();

    await page.waitForLoadState('networkidle');

    await context.storageState({ path: 'state.json' });
    await context.close();

    // Создаём один общий залогиненный контекст
    webContext = await browser.newContext({
        storageState: 'state.json'
    });
});

test('Login-4', async () => {
    const page = await webContext.newPage();

    await page.goto('https://rahulshettyacademy.com/client');

    const productName = 'ZARA COAT 3';
    const products = page.locator(".card-body");

    // Добавление товара в корзину
    const count = await products.count();
    let added = false;

    for (let i = 0; i < count; i++) {
        const title = await products.nth(i).locator('b').textContent();
        if (title?.trim() === productName) {
            await products.nth(i).locator("text=Add To Cart").click();
            added = true;
            break;
        }
    }

    if (!added) {
        throw new Error(`Товар "${productName}" не найден!`);
    }

    await page.locator("[routerlink*='cart']").click();
    await page.locator("div li").first().waitFor({ timeout: 10000 });

    await expect(page.locator("h3:has-text('ZARA COAT 3')")).toBeVisible();

    await page.locator("text=Checkout").click();

    await page.locator("[placeholder*='Country']").pressSequentially('ind', { delay: 100 });

    const dropdown = page.locator(".ta-results");
    await dropdown.waitFor();

    const options = dropdown.locator("button");
    for (let i = 0; i < await options.count(); i++) {
        const text = await options.nth(i).textContent();
        if (text?.trim() === "India") {
            await options.nth(i).click();
            break;
        }
    }

    await expect(page.locator(".user__name [type='text']").first()).toHaveText("mrsnouden47@gmail.com");

    await page.locator(".action__submit").click();
    await expect(page.locator(".hero-primary")).toHaveText("Thankyou for the order.");

    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log("Order ID:", orderId);

    await page.locator('button[routerlink*="myorders"]').click();
    await page.locator("tbody").waitFor();

    const rows = page.locator("tbody tr");
    let orderFound = false;

    for (let i = 0; i < await rows.count(); i++) {
        const rowOrderId = await rows.nth(i).locator("th").textContent();
        if (orderId.includes(rowOrderId?.trim())) {
            await rows.nth(i).locator("button").first().click();
            orderFound = true;
            break;
        }
    }

    expect(orderFound).toBeTruthy();
    const orderIdDetails = await page.locator(".col-text.-main").textContent();
    expect(orderId.includes(orderIdDetails)).toBeTruthy();
});

// ==================== Второй тест ====================
test('Test case 2', async () => {
    const page = await webContext.newPage();   // используем уже залогиненный контекст

    await page.goto('https://rahulshettyacademy.com/client');   // ← сразу на главную страницу!

    console.log("Test case 2 запущен с уже залогиненным пользователем");

    // Здесь можно делать любые действия без логина
    await expect(page.locator(".fa-sign-out")).toBeVisible(); // пример проверки, что мы залогинены

    // Например: переход в My Orders
    await page.locator('button[routerlink*="myorders"]').click();
    await expect(page.locator("tbody")).toBeVisible();

    // или любые другие проверки...
});
