const { DashboardPage } = require("./DashboardPage");
const { LoginPage } = require("./LoginPage");
const { CartPage } = require("./CartPage");
const { OrdersReviewPage } = require("./OrdersReviewPage");
const { OrdersHistoryPage } = require("./OrdersHistoryPage");

class POManager {
  constructor(page) {
    this.page = page;
    this.loginPage = new LoginPage(this.page);
    this.dashboardPage = new DashboardPage(this.page);
    this.cartPage = new CartPage(page);
    this.ordersReviewPage = new OrdersReviewPage(page);
    this.ordersHistoryPage = new OrdersHistoryPage(page);
  }
  getLoginPage() {
    return this.loginPage;
  }
  getDashboardPage() {
    return this.dashboardPage;
  }
  getCartPage() {
    return this.cartPage;
  }
  getOrdersReviewPage() {
    return this.ordersReviewPage;
  }
  getOrdersHistoryPage() {
    return this.ordersHistoryPage;
  }
}
module.exports = { POManager };
