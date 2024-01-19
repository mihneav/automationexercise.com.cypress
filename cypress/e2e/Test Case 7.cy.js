describe("Test Case 7: Verify Test Cases Page", () => {
  it(`1. Launch browser
  2. Navigate to url 'http://automationexercise.com'
  3. Verify that home page is visible successfully
  4. Click on 'Test Cases' button
  5. Verify user is navigated to test cases page successfully`, () => {
    cy.visit("");
    cy.verifyHompageIsVisible();
    cy.verifyTestCasesPage();
  });
});
