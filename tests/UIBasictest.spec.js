const {test, expect} = require('@playwright/test');
const { request } = require('node:http');


test ('Browser Context  Playwright test-1', async({browser})=> {
 
 const context = await browser.newContext();
 const page = await context.newPage();
 //page.route('**/*.css',route=>route.abort());//вместо css{...} можем ставить({jpg,png,jpeg})
 
 const userName = page.locator("#username");// мы можем дать variable userName, вот таком варианте. То можем снизу сделать по кроче в боди
 const signIn = page.locator("#signInBtn"); //укоротили кнопку
const cardTitles = page.locator(".card-body a");
 page.on('request',request=>console.log(request.url()));
 page.on('response',response=>console.log(response.url(), response.status()));
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

 await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
 await page.locator("#userEmail").fill('mrsnouden47@gmail.com');
 //await page.locator("#userEmail").fill(uniqueEmail);
 await page.locator("#userPassword").fill('learningDk123*');
 await page.locator("#login").click();
 await page.waitForLoadState('networkidle');//один из вариантов ожидании
 //await page.locator(".card-body b").waitFor();//тоже один вариантов ожидании
 //await page.waitForSelector(".card-body b");
//const cardTitles = page.locator(".card-body b");
const cardTitles= await page.locator(".card-body b").allTextContents();
// Выведет первый заголовок (индекс 0) или второй (nth(1)), если их много
//console.log(await cardTitles.first().textContent()); 
console.log(cardTitles);
});

test ('UI Components test-5', async({page})=> 
{ 
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    const userName = page.locator("#username");
    const signIn = page.locator("#signInBtn");
    const documentLink=page.locator("[href*='documents-request']");//проверяем мигающий текст
    const dropdown= page.locator("select.form-control");//выбираем селектор из дропдавн
    await dropdown.selectOption("consult");//как выбирать дропдавн опцию
    //await page.pause();//=>Когда Playwright доходит до этой строки, он полностью останавливает 
    //выполнение теста и открывает специальное окно — Playwright Inspector.
    //Тест не закроется, пока ты сам не нажмешь «Resume» (Продолжить).
    await page.locator(".radiotextsty").last().click();
    await page.locator("#okayBtn").click();
    console.log(await page.locator(".radiotextsty").last().isChecked());//это вывод в консоль что выбран или нет
    await expect (page.locator(".radiotextsty").last()).toBeChecked();
    await page.locator("#terms").click();
    await expect(page.locator("#terms")).toBeChecked();
    await page.locator("#terms").uncheck();
    expect(await page.locator("#terms").isChecked()).toBeFalsy();
    await expect(documentLink).toHaveAttribute("class","blinkingText");//проверяем мигающий текст
    //await page.pause();
});

test('Child windows handling test-6', async({browser})=> 
    { 
        const context = await browser.newContext();
        const page = await context.newPage();
        const userName = page.locator("#username");
        await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
        const documentLink = page.locator("[href*='documents-request']");//проверяем мигающий текст
        
        const [newPage]=await Promise.all(
        [context.waitForEvent('page'),//это контекст означает, подождать, когда страница переходит на другую страницу
        documentLink.click(),])//новая страница открывается
         
        //открыть новую страницу
        const text = await newPage.locator(".red").textContent();
        const arrayText=text.split("@");//этод метод используется для разделения текста и от туда получить имейл
        const domain = arrayText[1].split(" ")[0];
        console.log(domain);
        await page.locator("#username").fill(domain);
        
        //console.log(await page.locator("#username").textContent());//Используется для тегов, которые «хранят» 
        // текст между открывающим и закрывающим тегом
        
        console.log(await page.locator("#username").inputValue()); //Используется для элементов формы:<input>, <textarea>, <select>. 
        // У этих тегов нет «внутреннего» текста, у них есть атрибут value.
});

test ('Test-7', async({page})=> {
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
   });