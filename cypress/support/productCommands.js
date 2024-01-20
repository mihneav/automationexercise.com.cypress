const { shopMenu, shopPage } = require("../pageObjects/shopPage");
const productsPage = require("../pageObjects/productsPage");
const productDetailsPage = require("../pageObjects/productDetailsPage");

Cypress.Commands.add("verifyAllProductsPage", () => {
  cy.get(shopMenu.products)
    .should("be.visible")
    .should("include.text", `Products`)
    .click();
  cy.get(productsPage.productCards).should("have.length.least", 2);

  cy.get(shopPage.footer).should("be.visible");
});

Cypress.Commands.add("verifyProductDetailsPage", (productIndex, name) => {
  cy.get(productsPage.productCard(productIndex).viewProduct).click();
  for (const selector in productDetailsPage) {
    cy.get(productDetailsPage[selector]).should("be.visible");
  }
  if (name) {
    cy.get(productDetailsPage.name).should("have.text", name);
  }
});

Cypress.Commands.add("searchforRandomProduct", function () {
  cy.get(shopMenu.products).click();
  cy.get(productsPage.productCards).then(function (elements) {
    //select a random product name
    const randomIndex = Math.floor(Math.random() * elements.length - 1);
    cy.get(productsPage.productCard(randomIndex).name)
      .invoke("text")
      .as("productName")
      .then(function (productName) {
        cy.get(productsPage.search).type(productName);
        cy.get(productsPage.submitSearch).click();
        cy.get(productsPage.productCards).should("contain", productName);
      });
  });
});
