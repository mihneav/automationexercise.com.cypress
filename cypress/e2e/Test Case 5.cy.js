describe("Test Case 5: Register User with existing email", () => {
  before(() => {
    cy.cleanUp();
    cy.generateUser().as("user");
    cy.createAccountApi();
  });
  it(`1. Launch browser
  2. Navigate to url 'http://automationexercise.com'
  3. Verify that home page is visible successfully
  4. Click on 'Signup / Login' button
  5. Verify 'New User Signup!' is visible
  6. Enter name and already registered email address
  7. Click 'Signup' button
  8. Verify error 'Email Address already exist!' is visible`, () => {
    cy.visit("");
    cy.verifyHompageIsVisible();
    cy.initiateSignUp();
    cy.verifySignUpFailed();
  });

  after(() => {
    cy.deleteAccountApi();
  });
});
