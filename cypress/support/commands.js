const { shopMenu, shopPage } = require("../pageObjects/shopPage");
const contactUsPage = require("../pageObjects/contactUsPage");
const bacon = require("../utils/bacon");
const testCasesPage = require("../pageObjects/testCasesPage");
const user = require("./userCommands");

Cypress.Commands.add("verifyHompageIsVisible", () => {
  cy.get(shopPage.footer).should("be.visible");
  cy.get(shopPage.featuredItems).should("be.visible");
});

Cypress.Commands.add("fillContactUsForm", () => {
  cy.get(shopMenu.contactUs).click();
  cy.get(contactUsPage.name).type(user.name);
  cy.get(contactUsPage.email).type(user.email);
  cy.get(contactUsPage.subject).type("Bacon");
  cy.get(contactUsPage.message).type(bacon);
  cy.get(contactUsPage.fileSubmit).selectFile("cypress/utils/bacon.jpg");
  cy.get(contactUsPage.submitButton).click();
  cy.get(contactUsPage.succeesMessage).should(
    "include.text",
    "Success! Your details have been submitted successfully."
  );
  cy.get(shopMenu.home).click();
});

Cypress.Commands.add("verifyTestCasesPage", () => {
  cy.get(shopMenu.testCases)
    .should("be.visible")
    .should("include.text", `Test Cases`)
    .click();
  cy.get(testCasesPage.tableRows).should("have.length.least", 26);
  cy.get(shopPage.footer).should("be.visible");
});

Cypress.Commands.add("verifySubscription", () => {
  cy.get(shopPage.subscriptionText).should("be.visible");
  cy.get(shopPage.subscribeEmail).type(user.email);
  cy.get(shopPage.subscribeButton).click();
  cy.get(shopPage.subscribeMessage).should(
    "have.text",
    "You have been successfully subscribed!"
  );
});
