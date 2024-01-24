describe("Test Case 17: Remove Products From Cart", () => {
  it(`1. Launch browser
  2. Navigate to url 'http://automationexercise.com'
  3. Verify that home page is visible successfully
  4. Add products to cart
  5. Click 'Cart' button
  6. Verify that cart page is displayed
  7. Click 'X' button corresponding to particular product
  8. Verify that product is removed from the cart`, function () {
    cy.visit("/");
    cy.addRandomProductInCart(1);
    cy.addRandomProductInCart(1, true);
    cy.verifyCartProducts();
    cy.removeRandomCartProduct();
    cy.verifyCartProducts();
  });
});
