class ContactUsForm {
constructor(page)
{
    this.firstName = page.locator('[name="first_name"]');
    this.lastName = page.locator('[name="last_name"]');
    this.email = page.locator('[name="email"]');
    this.comment = page.locator('[name="message"]');
    this.resetButton = page.locator('#form_buttons [type="reset"]');
    this.submitButton = page.locator('#form_buttons [type="submit"]');
}

async fillingForm(firstName,lastName,email,comment)
{
    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
    await this.email.fill(email);
    await this.comment.fill(comment);


}
}
module.exports = {ContactUsForm};