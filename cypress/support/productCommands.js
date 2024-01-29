const { shopMenu, shopPage } = require("../pageObjects/shopPage");
const productsPage = require("../pageObjects/productsPage");
const {
  productDetailsPage,
  cartModal,
} = require("../pageObjects/productDetailsPage");
let cartArray = [];
require("cypress-real-events/support");
const { generateRandomIndex } = require("./commands");
const bacon = require("../utils/bacon");

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
    if (selector != "reviewSuccess") {
      cy.get(productDetailsPage[selector]).should("be.visible");
    }
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
      cy.get(productsPage.productCard(generateRandomIndex(elements)).name)
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
  }
);

Cypress.Commands.add(
  "addRandomProductInCart",
  (quantity = 1, viewCart = false) => {
    cy.searchforRandomProduct();
    cy.verifyProductDetailsPage();
    cy.get(productDetailsPage.availability).should(
      "have.text",
      "Availability: In Stock"
    );
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

Cypress.Commands.add("verifyCategoryVisible", (category) => {
  cy.get(productsPage.categoryLinks(`${category}`).category).should(
    "include.text",
    category
  );
});

Cypress.Commands.add("verifySubcategoryVisible", (category, subCategory) => {
  cy.get(productsPage.categoryLinks(`${category}`).plus).click();
  cy.get(
    productsPage.categoryLinks(`${category}`).subCategory(`${subCategory}`)
  ).should("include.text", subCategory);
});

Cypress.Commands.add("verifyCategoryTitle", (category, subCategory) => {
  cy.get(productsPage.categoryLinks(`${category}`).plus).click();
  cy.get(
    productsPage.categoryLinks(`${category}`).subCategory(`${subCategory}`)
  ).click();
  cy.verifyProductsTitle(category, subCategory);
});

Cypress.Commands.add("verifyProductsTitle", (category, subCategory) => {
  cy.get(productsPage.categoryTitle).should(
    "have.text",
    `${category} - ${subCategory} Products`
  );
});

Cypress.Commands.add("verifyBrands", () => {
  cy.get(shopMenu.products).click();
  cy.getAllBrandsApi().then((response) => {
    const uniqueBrands = [
      ...new Set(response.brands.map((brand) => brand.brand)),
    ];
    cy.wrap(uniqueBrands).each((brand, index) => {
      cy.get(productsPage.brand(index).lineIndex).should("include.text", brand);
    });

    function clickRandomBrand() {
      const randomIndex = generateRandomIndex(uniqueBrands);
      cy.get(productsPage.brand(randomIndex).lineIndex).click();
      cy.verifyProductsTitle("Brand", uniqueBrands[randomIndex]);
    }

    clickRandomBrand();
    clickRandomBrand();
  });
});

Cypress.Commands.add("addSearchProductsInCart", function (searchString) {
  cy.get(shopMenu.products).click();
  cy.get(productsPage.search).type(searchString);
  cy.get(productsPage.submitSearch).click();
  cy.get(productsPage.title).should("have.text", "Searched Products");
  cy.get(productsPage.productCards).each((element, index) => {
    cy.get(productsPage.productCard(index).name).should(
      "include.text",
      searchString
    );
    cy.addProductInCart(index);
  });
});

Cypress.Commands.add("writeProductReview", function (searchString) {
  cy.searchforRandomProduct();
  cy.verifyProductDetailsPage();
  cy.get("@user").then((user) => {
    cy.get(productDetailsPage.reviewName).type(user.name);
    cy.get(productDetailsPage.reviewEmail).type(user.email);
    cy.get(productDetailsPage.reviewMessage).type(bacon);
    cy.get(productDetailsPage.reviewButton).click();
    cy.get(productDetailsPage.reviewSuccess).should(
      "include.text",
      "Thank you for your review."
    );
  });
});

Cypress.Commands.add("addRandomRecomendedProductToCart", function () {
  cy.get(shopPage.recommendedProductsTitle).should(
    "have.text",
    "recommended items"
  );
  cy.get(shopPage.recommendedLeftArrow).click({ waitForAnimations: true });
  cy.get(shopPage.recommendedRightArrow).click({ waitForAnimations: true });
  cy.get(shopPage.carouselActiveCards).then((elements) => {
    const index = generateRandomIndex(elements);
    cy.get(shopPage.recommendedProductCard(index))
      .click()
      .then(() => {
        cy.get(shopPage.recommendedProductName(index))
          .invoke("text")
          .then((productName) => {
            cy.searchProductApi(productName);
            cy.get("@responseBody").then((response) => {
              let product = response.products[0];
              updateCartArray(product, 1);
            });
          });
      });
    cy.get(cartModal.continueShopping).click();
  });
});
module.exports = cartArray;
