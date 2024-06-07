class DatePickerPage {
    constructor(page) {
      this.page = page;
      this.dateInput = page.locator('.form-control');
      this.datePickerSwitch = page.locator('.datepicker-switch:visible');
      this.yearSelector = year => page.getByText(year);
      this.monthSelector = monthIndex => page.locator('.month').nth(monthIndex);
      this.daySelector = day => page.getByText(day);
    }
  
    async navigate() {
      await this.page.goto('https://webdriveruniversity.com/Datepicker/index.html');
    }
  
    async openDatePicker() {
      await this.dateInput.click();
    }
  
    async selectYear(year) {
      await this.datePickerSwitch.nth(0).click();
      await this.datePickerSwitch.nth(0).click();
      await this.yearSelector(year).click();
    }
  
    async selectMonth(monthIndex) {
      await this.monthSelector(monthIndex).click();
    }
  
    async selectDay(day) {
      await this.daySelector(day).click();
    }
  
    async selectDate(year, monthIndex, day) {
      await this.openDatePicker();
      await this.selectYear(year);
      await this.selectMonth(monthIndex);
      await this.selectDay(day);
    }
  }
  
  module.exports = { DatePickerPage };