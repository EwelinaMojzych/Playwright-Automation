const { test, expect, } = require('@playwright/test');
const { ContactUsForm } = require('./PageObjects/ContactUsForm');
const { DropdownsCheckboxesRadiobuttons } = require('./PageObjects/DropdownsCheckboxexRadiobuttons');
const { DatePickerPage } = require('./PageObjects/datepickerPage');

const contactUsUrl = 'https://webdriveruniversity.com/Contact-Us/contactus.html'
const dropdownsUrl = 'https://webdriveruniversity.com/Dropdown-Checkboxes-RadioButtons/index.html';

test('Filling the fields and data reset', async ({ browser }) => {
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

test('Partial data entry and error message', async ({ page }) => {
    const contactForm = new ContactUsForm(page);

    const firstName = 'Joanna';
    const lastName = 'Kowalska';

    await page.goto(contactUsUrl);

    await contactForm.fillContactForm(firstName, lastName, '', '',);

    await expect(contactForm.firstName).toHaveValue(firstName);
    await expect(contactForm.lastName).toHaveValue(lastName);

    await contactForm.submitButton.click();

    await expect(page.locator('body')).toContainText('Error: all fields are required');
    await expect(page.locator('body')).toContainText('Error: Invalid email address');
});


test('Wrong email address test', async ({ page }) => {
    const contactForm = new ContactUsForm(page);

    const firstName = 'Joanna';
    const lastName = 'Kowalska';
    const email = 'joanna.kowalska@itmagi';
    const comment = 'no comment';

    await page.goto(contactUsUrl);

    await contactForm.fillContactForm(firstName, lastName, email, comment,);

    await expect(contactForm.firstName).toHaveValue(firstName);
    await expect(contactForm.lastName).toHaveValue(lastName);
    await expect(contactForm.email).toHaveValue(email);
    await expect(contactForm.comment).toHaveValue(comment);

    await contactForm.submitButton.click();

    await expect(page.locator('body')).toContainText('Error: Invalid email address');
});


test('All data input test', async ({ page }) => {

    const contactForm = new ContactUsForm(page);

    const firstName = 'Joanna';
    const lastName = 'Kowalska';
    const email = 'joanna.kowalska@itmagination.com';
    const comment = 'no comment';

    await page.goto(contactUsUrl);

    await contactForm.fillContactForm(firstName, lastName, email, comment,);

    await expect(contactForm.firstName).toHaveValue(firstName);
    await expect(contactForm.lastName).toHaveValue(lastName);
    await expect(contactForm.email).toHaveValue(email);
    await expect(contactForm.comment).toHaveValue(comment);

    await contactForm.submitButton.click();

    await expect(page.locator('#contact_reply h1')).toContainText('Thank You for your Message!')

});


test('Selecting dropdowns', async ({ page }) => {

    const dropdowns = new DropdownsCheckboxesRadiobuttons(page);

    const backendLanguage1 = 'java';
    const backendLanguage2 = 'c#';
    const backendLanguage3 = 'python';
    const backendLanguage4 = 'sql';

    const tool1 = 'eclipse';
    const tool2 = 'maven';
    const tool3 = 'testng';
    const tool4 = 'junit';

    const frontendLanguage1 = 'html';
    const frontendLanguage2 = 'css';
    const frontendLanguage3 = 'javascript';
    const frontendLanguage4 = 'jquery';

    await page.goto(dropdownsUrl);

    await dropdowns.selectBackendLanguage(backendLanguage1);
    await expect(dropdowns.dropdown1).toHaveValue(backendLanguage1);

    await dropdowns.selectBackendLanguage(backendLanguage2);
    await expect(dropdowns.dropdown1).toHaveValue(backendLanguage2);

    await dropdowns.selectBackendLanguage(backendLanguage3);
    await expect(dropdowns.dropdown1).toHaveValue(backendLanguage3);

    await dropdowns.selectBackendLanguage(backendLanguage4);
    await expect(dropdowns.dropdown1).toHaveValue(backendLanguage4);

    await dropdowns.selectTool(tool1);
    await expect(dropdowns.dropdown2).toHaveValue(tool1);

    await dropdowns.selectTool(tool2);
    await expect(dropdowns.dropdown2).toHaveValue(tool2);

    await dropdowns.selectTool(tool3);
    await expect(dropdowns.dropdown2).toHaveValue(tool3);

    await dropdowns.selectTool(tool4);
    await expect(dropdowns.dropdown2).toHaveValue(tool4);

    await dropdowns.selectFrontendLanguage(frontendLanguage1);
    await expect(dropdowns.dropdown3).toHaveValue(frontendLanguage1);

    await dropdowns.selectFrontendLanguage(frontendLanguage2);
    await expect(dropdowns.dropdown3).toHaveValue(frontendLanguage2);

    await dropdowns.selectFrontendLanguage(frontendLanguage3);
    await expect(dropdowns.dropdown3).toHaveValue(frontendLanguage3);

    await dropdowns.selectFrontendLanguage(frontendLanguage4);
    await expect(dropdowns.dropdown3).toHaveValue(frontendLanguage4);
});


test('Selecting checkboxes', async ({ page }) => {
    const checkboxesPage = new DropdownsCheckboxesRadiobuttons(page);

    await checkboxesPage.navigate();
  
    // Check checkboxes
    await checkboxesPage.checkCheckboxes(['option-1', 'option-2', 'option-3', 'option-4']);
    await checkboxesPage.expectCheckboxesToBeChecked(['option-1', 'option-2', 'option-3', 'option-4']);
  
    // Uncheck checkboxes
    await checkboxesPage.uncheckCheckboxes(['option-2', 'option-4']);
    await checkboxesPage.expectCheckboxesNotToBeChecked(['option-2', 'option-4']);
  });

  test('Selecting radiobuttons', async ({ page }) => {
    const dropdownsCheckboxesRadiobuttons = new DropdownsCheckboxesRadiobuttons(page);
  
    await dropdownsCheckboxesRadiobuttons.navigate();
  
    const radioButtons = ['green', 'blue', 'yellow', 'orange', 'purple'];
  
    for (const color of radioButtons) {
      const radioButton = await dropdownsCheckboxesRadiobuttons.checkRadioButton(color);
      await expect(radioButton).toBeChecked();
    }
  });

test('Calendar validations', async ({ page }) => {
    const datePickerPage = new DatePickerPage(page);
    await datePickerPage.navigate();
  
    const monthNumber = 6; // 0-indexed month (6 -> July)
    const date = '15';
    const year = '2027';
  
    await datePickerPage.selectDate(year, monthNumber, date);

     // Verify the selected date
    await datePickerPage.expectSelectedDate(year, monthNumber, date);
  });