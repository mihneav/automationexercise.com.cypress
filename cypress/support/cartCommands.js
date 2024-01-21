const { shopMenu } = require("../pageObjects/shopPage");
const cartArray = require("./productCommands");
const cartPage = require("../pageObjects/cartPage");

Cypress.Commands.add("verifyCartProducts", (location) => {
  cy.get(shopMenu.cart).click();
  verifyProducts();
});

Cypress.Commands.add("proceedToCheckout", () => {
  cy.get(shopMenu.cart).click();
  cy.get(cartPage.proceedToCheckout).click();
});

export function verifyProducts() {
  cy.get(cartPage.productLines).should("have.length", cartArray.length);
  cy.wrap(cartArray).each((cartItem, index) => {
    cy.get(cartPage.productLine(index).description).should(
      "have.text",
      cartArray[index].name
    );
    cy.get(cartPage.productLine(index).price).should(
      "have.text",
      `Rs. ${cartArray[index].price}`
    );
    cy.get(cartPage.productLine(index).quantity).should(
      "have.text",
      cartArray[index].quantity
    );
    cy.get(cartPage.productLine(index).total).should(
      "have.text",
      `Rs. ${cartArray[index].price * cartArray[index].quantity}`
    );
  });
}
