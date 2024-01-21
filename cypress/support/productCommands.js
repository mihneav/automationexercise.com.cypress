const { shopMenu, shopPage } = require("../pageObjects/shopPage");
const productsPage = require("../pageObjects/productsPage");
const {
  productDetailsPage,
  cartModal,
} = require("../pageObjects/productDetailsPage");
let cartArray = [];
require("cypress-real-events/support");

Cypress.Commands.add("verifyAllProductsPage", () => {
  cy.get(shopMenu.products)
    .should("be.visible")
    .should("include.text", `Products`)
    .click();
  cy.get(productsPage.productCards).should("have.length.least", 2);

  cy.get(shopPage.footer).should("be.visible");
});

Cypress.Commands.add("verifyProductDetailsPage", (productIndex = 0, name) => {
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
  cy.get(productsPage.productCards)
    .should("have.length.least", 2)
    .then(function (elements) {
      //select a random product name
      const randomIndex = Math.floor(Math.random() * elements.length - 1);
      cy.get(productsPage.productCard(randomIndex).name)
        .invoke("text")
        .as("productName")
        .then(function (productName) {
          cy.get(productsPage.search).type(productName);
          cy.get(productsPage.submitSearch).click();
          cy.get(productsPage.title).should("have.text", "Searched Products");
          cy.get(productsPage.productCards).should("contain", productName);
        });
    });
});

Cypress.Commands.add(
  "addProductInCart",
  function (productIndex, viewCart = false) {
    cy.get(productsPage.productCard(productIndex).productInfo).realHover();
    cy.get(productsPage.productCard(productIndex).overlayAddToCart).click();
    cy.get(productsPage.productCard(productIndex).name)
      .invoke("text")
      .then((productName) => {
        cy.searchProductApi(productName);
        cy.get("@responseBody").then((response) => {
          let product = response.products[0];
          updateCartArray(product, 1);
        });
      });
    viewCart
      ? cy.get(cartModal.viewCart).click()
      : cy.get(cartModal.continueShopping).click();

    cy.log(cartArray);
  }
);

Cypress.Commands.add(
  "addRandomProductInCart",
  (quantity = 1, viewCart = false) => {
    cy.searchforRandomProduct();
    cy.verifyProductDetailsPage();
    cy.get(productDetailsPage.quantity).clear().type(quantity);
    cy.get(productDetailsPage.addToCart).click();
    cy.get(productDetailsPage.name)
      .invoke("text")
      .then((productName) => {
        cy.searchProductApi(productName);
        cy.get("@responseBody").then((response) => {
          let product = response.products[0];
          updateCartArray(product, quantity);
        });
      });
    viewCart
      ? cy.get(cartModal.viewCart).click()
      : cy.get(cartModal.continueShopping).click();
    cy.log(cartArray);
  }
);

function updateCartArray(product, quantity) {
  product.quantity = quantity;
  product.price = product.price.trim().replace(/^Rs\. /, ""); //trim currency
  //in case product already exists
  const existingProduct = cartArray.find((item) => item.id === product.id);
  if (existingProduct) {
    existingProduct.quantity += quantity;
  } else {
    cartArray.push({ ...product, quantity: quantity });
  }
}

module.exports = cartArray;
