import { test, expect } from '@playwright/test';



// 1. Хелпер СНАРУЖИ всех тестов
async function loginAndGoToBooking(page) {
    await page.goto('https://eventhub.rahulshettyacademy.com');
    await page.getByPlaceholder("you@email.com").fill("mrsnouden47@gmail.com");
    await page.getByLabel("Password").fill("learningDk123*");
    await page.locator("#login-btn").click();
    await expect(page.getByRole('link', { name: 'Browse Events' }).first()).toBeVisible();
}

// 2. Группа тестов (используем describe)
test.describe('Refund Tests', () => {

    test('Test 1 — Single ticket refund', async ({ page }) => {
        // Step 1: Login
        await loginAndGoToBooking(page); 

        // Step 2: Booking
        await page.goto('https://eventhub.rahulshettyacademy.com');
        const firstCard = page.locator('[data-testid="event-card"]').first();
        await firstCard.locator('[data-testid="book-now-btn"]').click();
        
        await page.getByLabel("Full Name").fill("Mr Snouden");
        await page.locator("#customer-email").fill("mrsnouden47@gmail.com");
        await page.getByPlaceholder("+91 98765 43210").fill("+996555409348");
        await page.locator(".confirm-booking-btn").click();
        await expect(page.getByRole('heading', { name: 'Booking Confirmed! 🎉' })).toBeVisible();

        await page.getByRole("link",{name:"View My Bookings"}).click();
        await expect(page).toHaveURL(/.*bookings/);
        await page.getByRole('link', { name: 'View Details' }).first().click();
        await expect(page.getByText("Booking Information")).toBeVisible();

// 1. Ждем появления ивента (h1)
await page.locator("h1").waitFor();

// 2. Берем номер бронирования (используем класс text-indigo-600, который мы видим в DOM)
const bookingRefRaw = await page.locator("span.text-indigo-600").textContent();
const bookingRef = bookingRefRaw.trim();

// 3. Берем название ивента (h1)
const eventTitleRaw = await page.locator("h1").textContent();
const eventTitle = eventTitleRaw.trim();

// 4. Сравниваем первые буквы (как в задании)
expect(bookingRef[0]).toBe(eventTitle[0]);

console.log(`Успех! Первая буква брони: ${bookingRef[0]}, ивента: ${eventTitle[0]}`);

await page.getByRole("button",{name:"Check eligibility for refund?"}).click();
const spinner = page.locator("#refund-spinner");
await expect(spinner).toBeVisible(); 
await expect(spinner).toBeHidden({ timeout: 20000 }); 

await page.locator("#refund-result").textContent();
await expect(page.getByText("Eligible for refund.")).toBeVisible();
await expect(page.getByText(" Single-ticket bookings qualify for a full refund.")).toBeVisible();
});

test('Test 2 — Group ticket refund', async ({ page }) => {
    await loginAndGoToBooking(page); 
    
    await page.goto('https://eventhub.rahulshettyacademy.com');
    const firstCard = page.locator('[data-testid="event-card"]').first();
    await firstCard.locator('[data-testid="book-now-btn"]').click();

    // 1. Сначала увеличиваем количество билетов до 3
    const plusButton = page.locator('button:has-text("+")');
    await plusButton.click();
    await plusButton.click();

    // 2. Теперь заполняем данные 
    await page.getByLabel("Full Name").fill("Mr Snouden");
    await page.locator("#customer-email").fill("mrsnouden47@gmail.com");
    await page.getByPlaceholder("+91 98765 43210").fill("+996555409348");

    // 3. Жмем кнопку подтверждения 
    await page.locator(".confirm-booking-btn").click();
    await page.getByRole("link",{name:"View My Bookings"}).click();
    
    // Дальше пойдут шаги из Test 1 (переход в My Bookings и проверка возврата)
    await expect(page).toHaveURL(/.*bookings/);
        await page.getByRole('link', { name: 'View Details' }).first().click();
        await page.getByRole("button",{name:"Check eligibility for refund?"}).click();
        const spinner = page.locator("#refund-spinner");
await expect(spinner).toBeVisible(); 
await expect(spinner).toBeHidden({ timeout: 20000 }); 

await page.locator("#refund-result").textContent();
await expect(page.getByText("Not eligible for refund.")).toBeVisible();
await expect(page.getByText("Group bookings (3 tickets) are non-refundable.")).toBeVisible();
});

    });


    
