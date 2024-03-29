describe("Test Case 10: Verify Subscription in home page", () => {
  before(() => {
    cy.cleanUp();
    cy.generateUser().as("user");
  });
  it(`1. Launch browser
  2. Navigate to url 'http://automationexercise.com'
  3. Verify that home page is visible successfully
  4. Scroll down to footer
  5. Verify text 'SUBSCRIPTION'
  6. Enter email address in input and click arrow button
  7. Verify success message 'You have been successfully subscribed!' is visible`, () => {
    cy.visit("");
    cy.verifySubscription();
  });
});
