class OrdersHistoryPage {
  constructor(page) {
    this.page = page;
    this.rows = page.locator("tbody tr");
    this.orderIdColumn = page.locator("th");
    this.viewButton = page.locator("button").first();
  }

  async navigateToOrders() {
    await this.page.locator('button[routerlink*="myorders"]').click();
    await this.rows.first().waitFor();
  }

  async selectOrder(orderId) {
    const rowsCount = await this.rows.count();

    for (let i = 0; i < rowsCount; i++) {
      const currentOrderId = await this.rows.nth(i).locator("th").textContent();
      if (orderId.includes(currentOrderId.trim())) {
        await this.rows.nth(i).locator("button").first().click();
        break;
      }
    }
  }
}
module.exports = { OrdersHistoryPage };
