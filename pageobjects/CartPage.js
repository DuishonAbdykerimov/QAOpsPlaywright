class CartPage {
  constructor(page) {
    this.page = page;
    this.cartProducts = page.locator("div li");
    this.checkoutButton = page.locator("text=Checkout");
    this.productInCart = (productName) =>
      page.locator(`h3:has-text('${productName}')`);
  }
    async VerifyProductIsDisplayed(productName) {
    await this.cartProducts.first().waitFor();

    const isVisible = await this.productInCart(productName).isVisible();
    return isVisible; // ← возвращаем результат
  }
  async Checkout() {
    await this.checkoutButton.click();
  }
}
module.exports = { CartPage };
