const {test,expect} = require("@playwright/test");

//test.describe.configure({mode:'parallel'});// все тесты не зависимо друг от друга можно запустить паралельно
//test.describe.configure({mode:'serial'});// будет запускатся последовательно
//@Web теги нужны для того чтобы запустить нужные тесты. которые именно нам нужны в тесте
test(" Popup Validations", async ({page}) =>
{
await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
await expect(page.locator("#displayed-text")).toBeVisible();//скрывающее меню
await page.locator("#hide-textbox").click();
await expect(page.locator("#displayed-text")).toBeHidden(); 
await page.on('dialog',dialog=>dialog.accept());// нажимает на кнопку ок
//await page.on('dialog',dialog=>dialog.dismiss()); нажимает на кнопку кенсел
await page.locator("#confirmbtn").click();
await page.locator("#mousehover").hover();//наводит мышку на ховер
const framesPage = await page.frameLocator("#courses-iframe");// работать с фреймфорками
await framesPage.getByRole("link",{name:"NEW All Access plan"}).click();
const textCheck = await framesPage.locator(".text h2").textContent();
console.log(textCheck.split(" ")[1]);

});
test("Screenshot & Visual comparision", async ({page}) =>{

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator('#displayed-text').screenshot({path:'partialScreenshot.png'});
    await page.locator("#hide-textbox").click();
    await page.screenshot({path:'screenshot.png'});
    await expect(page.locator("#displayed-text")).toBeHidden(); 
});

test("Visual", async ({page}) =>
    {
        await page.goto("https://www.google.com/");
        expect(await page.screenshot()).toMatchSnapshot('landing.png');

    });