const {test, expect,} = require('@playwright/test');
const {ContactUsForm} = require('./PageObjects/ContactUsForm');

const contactUsUrl = 'https://webdriveruniversity.com/Contact-Us/contactus.html'

test('Filling the fields and data reset', async ({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    const contactForm = new ContactUsForm(page);

    const firstName = 'Ewelina';
    const lastName = 'Mojzych';
    const email = 'ewelina.mojzych@itmagination.com';
    const comment = 'no comment';

    await page.goto(contactUsUrl);

    await contactForm.fillContactForm(firstName, lastName, email, comment);

    await expect(contactForm.firstName).toHaveValue(firstName);
    await expect(contactForm.lastName).toHaveValue(lastName);
    await expect(contactForm.email).toHaveValue(email);
    await expect(contactForm.comment).toHaveValue(comment);

    await contactForm.resetButton.click();

    await expect(contactForm.firstName).toHaveValue('');
    await expect(contactForm.lastName).toHaveValue('');
    await expect(contactForm.email).toHaveValue('');
    await expect(contactForm.comment).toHaveValue('');
});

test('Partial data entry and error message', async ({page}) => 
{
    const contactForm = new ContactUsForm(page);

    const firstName = 'Joanna';
    const lastName = 'Kowalska';

    await page.goto(contactUsUrl);

    await contactForm.fillContactForm(firstName, lastName, '','',);

    await expect(contactForm.firstName).toHaveValue(firstName);
    await expect(contactForm.lastName).toHaveValue(lastName);

    await contactForm.submitButton.click();

    await expect(page.locator('body')).toContainText('Error: all fields are required');
    await expect(page.locator('body')).toContainText('Error: Invalid email address');
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


test('Selecting checkboxes', async ({page}) => {
    await page.goto("https://webdriveruniversity.com/Dropdown-Checkboxes-RadioButtons/index.html");
    const checkbox1 = page.locator('[value="option-1"]');
    await (checkbox1).check();
    await expect(checkbox1).toBeChecked();

    const checkbox2 = page.locator('[value="option-2"]');
    await (checkbox2).check();
    await expect(checkbox2).toBeChecked();

    const checkbox3 = page.locator('[value="option-3"]');
    await (checkbox3).check();
    await expect(checkbox3).toBeChecked();

    const checkbox4 = page.locator('[value="option-4"]');
    await (checkbox4).check();
    await expect(checkbox4).toBeChecked();

    await (checkbox2).uncheck();
    await expect(checkbox2).not.toBeChecked();
    await (checkbox4).uncheck();
    await expect(checkbox4).not.toBeChecked();
}); 


test('Selecting radiobuttons', async ({page}) => {
    await page.goto("https://webdriveruniversity.com/Dropdown-Checkboxes-RadioButtons/index.html");
    const radiobutton1 = page.locator('#radio-buttons input[value="green"]');
    await (radiobutton1).check();
    await expect(radiobutton1).toBeChecked();

    const radiobutton2 = page.locator('#radio-buttons input[value="blue"]');
    await (radiobutton2).check();
    await expect(radiobutton2).toBeChecked();

    const radiobutton3 = page.locator('#radio-buttons input[value="yellow"]');
    await (radiobutton3).check();
    await expect(radiobutton3).toBeChecked();

    const radiobutton4 = page.locator('#radio-buttons input[value="orange"]');
    await (radiobutton4).check();
    await expect(radiobutton4).toBeChecked();

    const radiobutton5 = page.locator('#radio-buttons input[value="purple"]');
    await (radiobutton5).check();
    await expect(radiobutton5).toBeChecked();




}); 