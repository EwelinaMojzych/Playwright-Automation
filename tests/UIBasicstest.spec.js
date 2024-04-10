const {test,} = require('@playwright/test');



test('Browser Context First Playwright test', async ({browser})=>
{

    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://webdriveruniversity.com/Contact-Us/contactus.html");
    console.log(await page.title());
    await page.locator('[name="first_name"]').fill('Ewelina');
    await page.locator('[name="last_name"]').fill('Mojzych');
    await page.locator('[name="email"]').fill('ewelina.mojzych@itmagination.com');
    await page.locator('[name="message"]').fill('no comment');
    await page.locator('[name="message"]').fill('no comment');

});



