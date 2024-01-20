import { shopMenu } from "../pageObjects/shopPage";
import cartArray from "./productCommands";
const cartPage = require("../pageObjects/cartPage");

Cypress.Commands.add("verifyCartProducts", () => {
  cy.get(shopMenu.cart).click();
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
});
