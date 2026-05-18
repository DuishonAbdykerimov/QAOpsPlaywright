const {test, expect} = require('@playwright/test');


test ('Browser Context  Playwright test-1', async({browser})=> {
 
 
 const context = await browser.newContext();
 const page = await context.newPage();
 
 const userName = page.locator("#username");// мы можем дать variable userName, вот таком варианте. То можем снизу сделать по кроче в боди
 const signIn = page.locator("#signInBtn"); //укоротили кнопку
const cardTitles = page.locator(".card-body a");
 
 await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
 console.log (await page.title());
 
 // Тема: css, (xpath- не нужно). css selector идентификация для юзернейм
// in playwright type(retired) method retired(depricated) already, fill(usefull) 
 await userName.fill('rahulshettyacademy'); // вот тут мы сделали по короче. связано с первым const
 //await page.locator('#username').fill("rahulshettyacademy"); //вместо этого испльзовали верхнюю
 await page.locator("[type='password']").fill('Learning@830$3mK2');
 await signIn.click();// использовали по короче
 //await page.locator("#signInBtn").click(); //использовали верхнюю
 
 // await page.locator("[style*=block]"); //когда юзернейме идет ошибка, находим ошибку css locator и используем этот метод [style*=block]
 //console.log(await page.locator("[style*='block']").textContent()); //выводит ошибку на экране -textContent and console.log
 //await expect(page.locator("[style*='block']")).toContainText('Incorrect'); //короче ждем надпись incorrect, 
// но у нас в скобке inccorrect то выдаст нам ошибку в экране

//Тема: type-fill
await userName.fill("");
await userName.fill("rahulshettyacademy");
await signIn.click();

//console.log(await page.locator(".card-body a").first().textContent());//находим элементов по индексу
//console.log(await page.locator(".card-body a").nth(1).textContent());//теперь тут сокращаем внизу
//каждый раз вытаскивать элемента таким образом, или может 45 шт(то тогда сardTitles)
 console.log(await cardTitles.first().textContent());
 console.log(await cardTitles.nth(1).textContent());
const allTitles = await cardTitles.allTextContents();
console.log(allTitles);
});

test ('Page Playwright test-2', async({page})=> { //когда мы хотим проверить один тест, используем test.only(only пишем)
    // chrome - plugins/ cookies
    // const context = await browser.newContext();
    // const page = await context.newPage();
    await page.goto('https://google.com/');
    //get title - assertion
    console.log (await page.title());
   await expect(page).toHaveTitle('Google');
});

   test ('Practise-Registration-3', async({browser})=> { 
    
 const context = await browser.newContext();
 const page = await context.newPage();
 const firstName = page.locator("#firstName");
 const lastName = page.locator("#lastName");
 const userEmail =page.locator("#userEmail");
 //const uniqueEmail = `testuser${Date.now()}@gmail.com`;
 const userMobile =page.locator("#userMobile");
 const userPassword =page.locator("#userPassword");
 const confirmPassword =page.locator("#confirmPassword");
 const checkbox = page.locator('input[type="checkbox"]')
 const login = page.locator("#login");
 

 await page.goto('https://rahulshettyacademy.com/client/#/auth/register');
 console.log (await page.title());
 
 
 await firstName.fill('Duishonbek');
 await lastName.fill('Abdykerimov');
 await userEmail.fill('mrsnouden47@gmail.com');
 //await page.locator("#userEmail").fill(uniqueEmail);
 await userMobile.fill('6704084169');
 await page.locator("#userPassword").fill('learningDk123*');
 await page.locator("#confirmPassword").fill('learningDk123*');
 await checkbox.setChecked(true);
 await login.click();

});
 
test ('Login-4', async({page})=> {
 const email="mrsnouden47@gmail.com";
   const productName='ZARA COAT 3';
const products=page.locator(".card-body");
await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
 await page.locator("#userEmail").fill('mrsnouden47@gmail.com');
 //await page.locator("#userEmail").fill(uniqueEmail);
 await page.locator("#userPassword").fill('learningDk123*');
 await page.locator("#login").click();
 //await page.waitForSelector(".card-body b");
 const cardTitles = page.locator(".card-body b");
 console.log(await cardTitles.first().textContent());//Выведет первый заголовок (индекс 0) или второй (nth(1)), если их много

 const count = await products.count();
for (let i=0; i<count; i++)
{
if (await products.nth(i).locator('b').textContent() ===productName)
{
//add to cart- если мы нашли свой нужный товар, добавляем в карт
await products.nth(i).locator("text= Add To Cart").click();
break;
}
}
await page.locator("[routerlink*='cart']").click();
await page.locator("div li").first().waitFor();
const bool=await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
expect(bool).toBeTruthy();
await page.locator("text=Checkout").click();
await page.locator("[placeholder*='Country']").pressSequentially('ind',{delay:100});//Here, a delay of 150 milliseconds is introduced between each key press.
//That means it enters  i → (delay 150 ms) → enters n → (delay 150 ms) → enters d

const dropdown = page.locator(".ta-results");
await dropdown.waitFor();
const optionsCount = await dropdown.locator("button").count();
for(let i=0; i<optionsCount; i++){
    const text = await dropdown.locator("button").nth(i).textContent();
    if(text === " India")//если мы не хотим оставлять место перед Индией, то можем написать text.trim что можем без место
      {
      await dropdown.locator("button").nth(i).click();
      break;
    }
}
expect (page.locator(".user__name [type='text']").first()).toHaveText("mrsnouden47@gmail.com");
await page.locator(".action__submit").click();
await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
console.log(orderId);

await page.locator('button[routerlink*="myorders"]').click();
await page.locator("tbody").waitFor();
const rows= await page.locator("tbody tr");
for(let i=0; i<await rows.count(); i++)
{
const rowOrderId= await rows.nth(i).locator("th").textContent();
if(orderId.includes(rowOrderId))
{
  await rows.nth(i).locator("button").first().click();
  break;
}
}
const orderIdDetails= await page.locator(".col-text.-main").textContent();
expect(orderId.includes(orderIdDetails)).toBeTruthy();

});

test ('Search and View Order', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
 await page.locator("#userEmail").fill('mrsnouden47@gmail.com');
 //await page.locator("#userEmail").fill(uniqueEmail);
 await page.locator("#userPassword").fill('learningDk123*');
 await page.locator("#login").click();
   
   await page.locator('button[routerlink*="myorders"]').click();
   const orderId = "69df7a5bf86ba51a6567bdab"; // Твой ID со скрина

   // 1. Находим нужную строку, которая содержит этот ID
   const row = page.locator("tr").filter({ hasText: orderId });

   // 2. Проверяем, нашлась ли такая строка вообще
   if (await row.count() > 0) {
       console.log("Ура! Заказ найден. Нажимаю View...");
       
       // 3. Внутри ЭТОЙ ЖЕ найденной строки кликаем по кнопке View
       await row.locator("button:has-text('View')").click();
   } else {
       console.log("NOT FOUND: Такого ID в списке нет");
   }
   //await page.pause();
});



