const {test, expect} = require('@playwright/test');



test('Browser Context First Playwright test', async ({browser})=>
{

const context = await browser.newContext();
const page = await context.newPage();
await page.goto("https://webdriveruniversity.com/Contact-Us/contactus.html");


});

test.only('Page Playwright test', async ({page})=>
{
await page.goto("https://google.com");
//get title - assertion
console.log(await page.title())
await expect(page).toHaveTitle("Google");

});

