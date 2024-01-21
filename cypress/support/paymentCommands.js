const user = require("./userCommands");
const payment = require("../utils/payment");
const paymentPage = require("../pageObjects/paymentPage");

Cypress.Commands.add("enterPaymentDetails", () => {
  cy.get(paymentPage.nameOnCard).type(user.name);
  cy.get(paymentPage.cardNumber).type(payment.cardNumber);
  cy.get(paymentPage.cvc).type(payment.cvc);
  cy.get(paymentPage.expiryMonth).type(payment.expiryMonth);
  cy.get(paymentPage.expiryYear).type(payment.expiryYear);
  cy.get(paymentPage.payAndConfirm).click();
});

Cypress.Commands.add("verifyOrderPlaced", () => {
  cy.get(paymentPage.orderPlacedTitle).should("have.text", "Order Placed!");
  cy.get(paymentPage.orderPlacedMessage).should(
    "have.text",
    "Congratulations! Your order has been confirmed!"
  );
  cy.get(paymentPage.continueButton).click();
});
