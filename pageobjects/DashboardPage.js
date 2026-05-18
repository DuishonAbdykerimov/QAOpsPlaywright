class DashboardPage {
  constructor(page) {
    this.page = page;

    this.products = page.locator(".card-body");
    this.productsText = page.locator(".card-body b");
    this.cart = page.locator("[routerlink*='cart']");
  }

  async searchProductAddCart(productName) {
    const titles = await this.productsText.allTextContents();
    console.log("Все товары на странице:", titles);
    for (let i = 0; i < titles.length; i++) {
      if (titles[i].trim() === productName) {
        console.log(`✅ Нашли товар: ${productName}`);
        await this.products.nth(i).locator("text= Add To Cart").click();
        break;
      }
    }
  }

async navigateToCart() {
    await this.cart.click();
  }
}
module.exports = { DashboardPage };
