const user = require("./userCommands");
const payment = require("../utils/payment");
const paymentPage = require("../pageObjects/paymentPage");
const { calculateTotal } = require("./checkoutCommands");

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

Cypress.Commands.add("verifyDownloadInvoice", () => {
  cy.get(paymentPage.downloadInvoice).should("be.visible").click();
  cy.readFile("cypress/downloads/invoice.txt").then((actualText) => {
    let expectedText = `Hi ${
      user.name
    }, Your total purchase amount is ${calculateTotal()}. Thank you`;
    expect(actualText.trim()).to.equal(expectedText.trim());
  });
});
