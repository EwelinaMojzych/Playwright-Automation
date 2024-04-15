const {test, expect,} = require('@playwright/test');



test('Browser Context First Playwright test', async ({browser})=>
{

    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://webdriveruniversity.com/Contact-Us/contactus.html");
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
    await page.locator('[name="first_name"]').fill('Ewelina');
    await expect(page.locator('[name="first_name"]')).toHaveValue('Ewelina');
    await page.locator('[name="last_name"]').fill('Mojzych');
    await expect(page.locator('[name="last_name"]')).toHaveValue('Mojzych');
    await page.locator('#form_buttons [type="submit"]').click()
    await expect(page.locator('body')).toContainText('Error: all fields are required')
    await expect(page.locator('body')).toContainText('Error: Invalid email address')
});


test('Wrong email address test', async ({page}) => {
    await page.goto("https://webdriveruniversity.com/Contact-Us/contactus.html");
    await page.locator('[name="first_name"]').fill('Ewelina');
    await expect(page.locator('[name="first_name"]')).toHaveValue('Ewelina');
    await page.locator('[name="last_name"]').fill('Mojzych');
    await expect(page.locator('[name="last_name"]')).toHaveValue('Mojzych');
    await page.locator('[name="email"]').fill('ewelina.mojzych@itmagina');
    await expect(page.locator('[name="email"]')).toHaveValue('ewelina.mojzych@itmagina');
    await page.locator('[name="message"]').fill('no comment');
    await expect(page.locator('[name="message"]')).toHaveValue('no comment');
    await page.locator('#form_buttons [type="submit"]').click()
    await expect(page.locator('body')).toContainText('Error: Invalid email address')
  


});


test('All data input test', async ({page}) => {
    await page.goto("https://webdriveruniversity.com/Contact-Us/contactus.html");
    await page.locator('[name="first_name"]').fill('Ewelina');
    await expect(page.locator('[name="first_name"]')).toHaveValue('Ewelina');
    await page.locator('[name="last_name"]').fill('Mojzych');
    await expect(page.locator('[name="last_name"]')).toHaveValue('Mojzych');
    await page.locator('[name="email"]').fill('ewelina.mojzych@itmagination.com');
    await expect(page.locator('[name="email"]')).toHaveValue('ewelina.mojzych@itmagination.com');
    await page.locator('[name="message"]').fill('no comment');
    await expect(page.locator('[name="message"]')).toHaveValue('no comment');
    await page.locator('#form_buttons [type="submit"]').click()
    await expect(page.locator('#contact_reply h1')).toContainText('Thank You for your Message!')

});


test('Selecting dropdowns', async ({page}) => {
    await page.goto("https://webdriveruniversity.com/Dropdown-Checkboxes-RadioButtons/index.html");
    const dropdown = page.locator('#dropdowm-menu-1');
    await dropdown.selectOption("java");
    await expect(dropdown).toHaveValue('java');
    await dropdown.selectOption("c#");
    await expect(dropdown).toHaveValue('c#');
    await dropdown.selectOption("python");
    await expect(dropdown).toHaveValue('python');
    await dropdown.selectOption("sql");
    await expect(dropdown).toHaveValue('sql');

    const dropdown2 = page.locator('#dropdowm-menu-2');
    await dropdown2.selectOption("eclipse");
    await expect(dropdown2).toHaveValue('eclipse');
    await dropdown2.selectOption("maven");
    await expect(dropdown2).toHaveValue('maven');
    await dropdown2.selectOption("testng");
    await expect(dropdown2).toHaveValue('testng');
    await dropdown2.selectOption("junit");
    await expect(dropdown2).toHaveValue('junit');

    const dropdown3 = page.locator('#dropdowm-menu-3');
    await dropdown3.selectOption("html");
    await expect(dropdown3).toHaveValue('html');
    await dropdown3.selectOption("css");
    await expect(dropdown3).toHaveValue('css');
    await dropdown3.selectOption("javascript");
    await expect(dropdown3).toHaveValue('javascript');
    await dropdown3.selectOption("jquery");
    await expect(dropdown3).toHaveValue('jquery');
});
