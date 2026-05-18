class OrdersReviewPage {
  constructor(page) {
    this.page = page;

    this.countryInput = page.locator("[placeholder*='Country']");
    this.dropdownResults = page.locator(".ta-results");
    this.submitButton = page.locator(".action__submit");
    this.orderConfirmationText = page.locator(".hero-primary");
    this.orderIdText = page.locator(".em-spacer-1 .ng-star-inserted");
  }

  async searchCountryAndSelect(country, shortName) {
    await this.countryInput.pressSequentially(country, { delay: 100 });
    await this.dropdownResults.waitFor();

    const options = this.dropdownResults.locator("button");
    const count = await options.count();

    for (let i = 0; i < count; i++) {
      const text = await options.nth(i).textContent();
      if (text.trim() === shortName) {
        await options.nth(i).click();
        break;
      }
    }
  }

  async SubmitAndGetOrderId() {
    await this.submitButton.click();

    // Возвращаем orderId, проверку будем делать в тесте
    const orderId = await this.orderIdText.textContent();
    console.log("Order ID:", orderId);

    return orderId.trim();
  }
}

module.exports = { OrdersReviewPage };
