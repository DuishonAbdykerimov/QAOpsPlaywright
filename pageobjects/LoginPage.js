class LoginPage {

  constructor(page) {
      this.page = page;                    // ← обязательно сохраняем page

      this.signInButton = page.locator("#login");        // ← только locator
      this.userName = page.locator("#userEmail");
      this.password = page.locator("#userPassword");
  }

  async goTo() {
      await this.page.goto("https://rahulshettyacademy.com/client/#/auth/login");
  }

  async validLogin(username, password) {
      await this.userName.fill(username);
      await this.password.fill(password);
      await this.signInButton.click();
      await this.page.waitForLoadState('networkidle');   // хорошая практика
  }
}

module.exports = { LoginPage };