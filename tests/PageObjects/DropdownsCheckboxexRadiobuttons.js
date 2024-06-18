const { expect } = require('@playwright/test');

class DropdownsCheckboxesRadiobuttons {
    constructor(page) {
        this.page = page;

        this.dropdown1 = page.locator('#dropdowm-menu-1');
        this.dropdown2 = page.locator('#dropdowm-menu-2');
        this.dropdown3 = page.locator('#dropdowm-menu-3');
        
        this.checkbox1 = page.locator('[value="option-1"]');
        this.checkbox2 = page.locator('[value="option-2"]');
        this.checkbox3 = page.locator('[value="option-3"]');
        this.checkbox4 = page.locator('[value="option-4"]');
     
        this.radioButtonLocator = value => page.locator(`#radio-buttons input[value="${value}"]`);
    }
    async navigate() {
        await this.page.goto('https://webdriveruniversity.com/Dropdown-Checkboxes-RadioButtons/index.html');
      }
    
    async selectBackendLanguage(language) {
        await this.dropdown1.selectOption(language);
    }

    async selectTool(tool) {
        await this.dropdown2.selectOption(tool);
    }

    async selectFrontendLanguage(language) {
        await this.dropdown3.selectOption(language);
    }

    async checkCheckboxes(values) {
        for (const value of values) {
            const checkbox = this.page.locator(`[value="${value}"]`);
            if (await checkbox.isChecked() === false) {
                await checkbox.click();
            }
        }
    }

    async uncheckCheckboxes(values) {
        for (const value of values) {
            const checkbox = this.page.locator(`[value="${value}"]`);
            if (await checkbox.isChecked()) {
                await checkbox.click();
            }
        }
    }

    async expectCheckboxesToBeChecked(values) {
        for (const value of values) {
            const checkbox = this.page.locator(`[value="${value}"]`);
            await expect(checkbox).toBeChecked();
        }
    }

    async expectCheckboxesNotToBeChecked(values) {
    for (const value of values) {
      const checkbox = this.page.locator(`[value="${value}"]`);
      await expect(checkbox).not.toBeChecked();
    }
    }
    async checkRadioButton(value) {
        const radioButton = this.radioButtonLocator(value);
        await radioButton.check();
        return radioButton;
    
    }
}

module.exports = { DropdownsCheckboxesRadiobuttons };



