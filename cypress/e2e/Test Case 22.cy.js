describe("Test Case 22: Add to cart from Recommended items", () => {
  before(() => {
    cy.cleanUp();
  });
  it(`1. Launch browser
  2. Navigate to url 'http://automationexercise.com'
  3. Scroll to bottom of page
  4. Verify 'RECOMMENDED ITEMS' are visible
  5. Click on 'Add To Cart' on Recommended product
  6. Click on 'View Cart' button
  7. Verify that product is displayed in cart page`, function () {
    cy.visit("/");
    cy.addRandomRecomendedProductToCart();
    cy.addRandomRecomendedProductToCart();
    cy.verifyCartProducts();
  });
});
