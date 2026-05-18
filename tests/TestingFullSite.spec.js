import { test, expect } from '@playwright/test';

test('Full Booking Flow with Event Creation', async ({ page }) => {
    // 1. Генерируем уникальное название, чтобы тест всегда находил именно СВОЙ ивент
    const uniqueId = Date.now();
    const eventTitle = `Festival_${uniqueId}`;
    const userEmail = "mrsnouden47@gmail.com";
    const password = "learningDk123*";

    // 2. Регистрация
    await page.goto('https://eventhub.rahulshettyacademy.com');
    await page.getByRole('link', { name: 'Register' }).click();
    await page.getByPlaceholder("you@email.com").fill(userEmail);
    await page.locator("#register-password").fill(password);
    await page.getByPlaceholder("Repeat your password").fill(password);
    await page.getByText("Create Account").click();

    // 3. Логин
    await page.getByRole('link', { name: 'Sign In' }).click();
    await page.waitForURL('**/login');
    await page.getByPlaceholder("you@email.com").fill(userEmail);
    await page.getByLabel("Password").fill(password);
    await page.locator("#login-btn").click();
    
    // Проверка успешного входа
    await expect(page.getByRole('link', { name: 'Browse Events' }).first()).toBeVisible();
    console.log("Логин подтвержден!");

    // 4. Создание ивента (Admin)
    await page.getByRole("button", { name: 'Admin' }).click();
    await page.getByRole("link", { name: "Manage Events" }).first().click();
    
    await page.locator("#event-title-input").fill(eventTitle); // Используем уникальное имя
    await page.locator("#admin-event-form textarea").fill("I will be late for this festival");
    
    await page.locator("#category").selectOption("Festival");
    await page.getByLabel("City").fill("Bishkek");
    await page.getByLabel("Venue").fill('Sovetskaya');

    // Хелпер даты
    const futureDateValue = () => {
        const d = new Date();
        d.setFullYear(2027, 1, 23); 
        return d.toISOString().slice(0, 16); 
    };
    await page.getByLabel('Event Date & Time').fill(futureDateValue());
    
    await page.getByLabel("Price").fill("100");
    await page.getByLabel("Total Seats").fill("50");
    await page.locator("#add-event-btn").click();
    
    // Ждем подтверждения создания
    await expect(page.getByText("Event created!")).toBeVisible();

    // 5. Поиск карточки и захват мест (Capture Seats)
    await page.getByRole("link", { name: "Events" }).first().click();
    
    const eventCards = page.locator('[data-testid="event-card"]');
    await eventCards.first().waitFor();

    // Фильтруем строго по нашему уникальному названию
    const myEventCard = eventCards.filter({ hasText: eventTitle });
    await expect(myEventCard).toBeVisible({ timeout: 5000 });

    // Вытаскиваем количество мест
    const seatsTextRaw = await myEventCard.locator('span:has-text("seats")').textContent();
    const seatsBeforeBooking = parseInt(seatsTextRaw);
    
    console.log(`Ивент создан: ${eventTitle}`);
    console.log(`Мест до бронирования: ${seatsBeforeBooking}`);

    // Проверка, что места распарсились правильно
    expect(seatsBeforeBooking).toBe(50);
    //Букинг
    
await myEventCard.locator('[data-testid="book-now-btn"]').click();
await expect(page.locator("#ticket-count")).toHaveText("1");
await page.getByLabel("Full Name").fill('Snouden');
await page.locator("#customer-email").fill("mrsnouden47@gmail.com");
await page.getByPlaceholder("+91 98765 43210").fill("+996555409348");
await page.locator(".confirm-booking-btn").click();
await expect(page.getByRole('heading', { name: 'Booking Confirmed! 🎉' })).toBeVisible();
await expect(page.getByText('Your tickets are reserved.')).toBeVisible();

const bookingRefElement = page.locator(".booking-ref").first();
await expect(bookingRefElement).toBeVisible();
const bookingRef = (await bookingRefElement.textContent()).trim();
console.log("Номер бронирования:", bookingRef);

await page.getByRole("link",{name:"View My Bookings"}).click();
await expect(page).toHaveURL(/.*bookings/);
const bookingCards = page.locator("#booking-card");
await expect(bookingCards.first()).toBeVisible();
const myBooking = bookingCards.filter({ has: page.locator('.booking-ref', { hasText: bookingRef }) });
await expect(myBooking).toBeVisible();
await expect(myBooking).toContainText(eventTitle);

await page.goto("https://eventhub.rahulshettyacademy.com/events");
const allEventCards = page.locator('[data-testid="event-card"]');
await expect(allEventCards.first()).toBeVisible();
const myFinalEventCard = allEventCards.filter({ hasText: eventTitle });
await expect(myFinalEventCard).toBeVisible();
const seatsTextAfter = await myFinalEventCard.locator('span:has-text("seats")').textContent();
const seatsAfterBooking = parseInt(seatsTextAfter);
expect(seatsAfterBooking).toBe(seatsBeforeBooking - 1);
console.log(`Проверка завершена! Было: ${seatsBeforeBooking}, стало: ${seatsAfterBooking}`);
});
