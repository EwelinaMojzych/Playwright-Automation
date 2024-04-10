const {test, expect,} = require('@playwright/test');



test('Browser Context First Playwright test', async ({browser})=>
{

    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://webdriveruniversity.com/Contact-Us/contactus.html");
    console.log(await page.title());
    await page.locator('[name="first_name"]').fill('Ewelina');
    await expect(page.locator('[name="first_name"]')).toHaveValue('Ewelina');
    await page.locator('[name="last_name"]').fill('Mojzych');
    await expect(page.locator('[name="last_name"]')).toHaveValue('Mojzych');
    await page.locator('[name="email"]').fill('ewelina.mojzych@itmagination.com');
    await expect(page.locator('[name="email"]')).toHaveValue('ewelina.mojzych@itmagination.com');
    await page.locator('[name="message"]').fill('no comment');
    await expect(page.locator('[name="message"]')).toHaveValue('no comment');
    await page.locator('#form_buttons [type="reset"]').click()
    await expect(page.locator('[name="first_name"]')).toHaveValue('');
    await expect(page.locator('[name="last_name"]')).toHaveValue('');
    await expect(page.locator('[name="email"]')).toHaveValue('');
    await expect(page.locator('[name="message"]')).toHaveValue('');

});

test('Partial data entry and error message', async ({page}) => {
    await page.goto("https://webdriveruniversity.com/Contact-Us/contactus.html");
    console.log(await page.title());
    await page.locator('[name="first_name"]').fill('Ewelina');
    await expect(page.locator('[name="first_name"]')).toHaveValue('Ewelina');
    await page.locator('[name="last_name"]').fill('Mojzych');
    await expect(page.locator('[name="last_name"]')).toHaveValue('Mojzych');
    await page.locator('#form_buttons [type="submit"]').click()
    await expect(page.locator('body')).toContainText('Error: all fields are required')
    await expect(page.locator('body')).toContainText('Error: Invalid email address')
});



