const { test: base } = require("@playwright/test");

exports.customtest = base.extend({
    testDataForOrder: {
        username: "mrsnouden47@gmail.com",
        password: "learningDk123*",
        productName: "ZARA COAT 3"
    }
});