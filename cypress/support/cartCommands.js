const { shopMenu } = require("../pageObjects/shopPage");
const cartArray = require("./productCommands");
const cartPage = require("../pageObjects/cartPage");
const { generateRandomIndex } = require("./commands");

Cypress.Commands.add("verifyCartProducts", (location) => {
  cy.get(shopMenu.cart).click();
  cartArray.length === 0
    ? cy
        .get(cartPage.cartIsEmpty)
        .should("have.text", "Cart is empty! Click here to buy products.")
    : verifyProducts();
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

Cypress.Commands.add("removeRandomCartProduct", () => {
  if (cartArray.length > 1) {
    cy.removeCartProduct(generateRandomIndex(cartArray));
  } else {
    cy.removeCartProduct(0);
  }
});

Cypress.Commands.add("removeCartProduct", (index) => {
  cy.get(shopMenu.cart).click();
  cy.get(cartPage.productLine(index).deleteButton).click();
  cartArray.splice(index, 1);
});
