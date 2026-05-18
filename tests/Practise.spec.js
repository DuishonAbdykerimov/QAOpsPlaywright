import {test, expect} from '@playwright/test';


test ('Playwright Special Locators', async({page})=> {
 
  await page.goto("https://rahulshettyacademy.com/angularpractice/");
  await page.getByLabel("Check me out if you Love IceCreams!").click();
  await page.getByLabel("Employed").check();
  await page.getByLabel("Gender").selectOption("Female");
 await page.getByPlaceholder("Password").fill("abc123");
 await page.getByRole("button", {name:'Submit'}).click();
 await page.getByText("Success! The Form has been submitted successfully!.").isVisible();
 await page.getByRole("link",{name: "Shop"}).click();
await page.locator("app-card").filter({hasText: 'Nokia Edge'}).getByRole("button").click();
});

test ('Rewrite Codes', async({page})=> {
  const email="mrsnouden47@gmail.com";
    const productName='ZARA COAT 3';
 const products=page.locator(".card-body");
 await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
  await page.getByPlaceholder("email@example.com").fill("mrsnouden47@gmail.com");
  await page.getByPlaceholder("enter your passsword").fill('learningDk123*');
  await page.getByRole('button',{name:"Login"}).click();
  await page.waitForLoadState('networkidle');
  await page.locator(".card-body b").first().waitFor();
  
  await page.locator(".card-body").filter({hasText:"ZARA COAT 3"})
  .getByRole("button",{name:"Add to Cart"}).click();
  
  await page.getByRole("listitem").getByRole('button',{name:"Cart"}).click();
  
await page.locator("div li").first().waitFor();
await expect(page.getByText("ZARA COAT 3")).toBeVisible();
await page.getByRole("button", {name:"Checkout"}).click();
await page.getByPlaceholder("Select Country").pressSequentially('ind');
  
await page.getByRole('button',{name:"India"}).nth(1).click();
await page.getByText("PLACE ORDER").click();
await expect(page.getByText(" Thankyou for the order. ")).toBeVisible();
});

