const { test, expect, request } = require("@playwright/test");

test("Security test request intercept", async ({ page }) => {
  //Login and reach orders page

  await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
  await page
    .getByPlaceholder("email@example.com")
    .fill("mrsnouden47@gmail.com");
  await page.getByPlaceholder("enter your passsword").fill("learningDk123*");
  await page.getByRole("button", { name: "Login" }).click();
  await page.waitForLoadState("networkidle");
  await page.locator(".card-body b").first().waitFor();
  await page.locator("button[routerlink*='myorders']").click();
  await page.route(
    "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
    (route) =>
      route.continue({
        url: "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=69f35f0df86ba51a6595df77",
      })//тут левый айди, проверить безопасность сайта
  );
  await page.locator("button:has-text('View')").first().click();
  await expect(page.locator('p').last()).toHaveText("You are not authorize to view this order");
});
