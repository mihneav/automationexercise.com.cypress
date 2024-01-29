import { cardNumber } from "../utils/payment";

const { shopMenu, shopPage } = require("../pageObjects/shopPage");
const contactUsPage = require("../pageObjects/contactUsPage");
const bacon = require("../utils/bacon");
const testCasesPage = require("../pageObjects/testCasesPage");
const fs = require("fs");

Cypress.Commands.add("cleanUp", () => {
  cy.clearAllCookies();
  cy.clearAllLocalStorage();
  cy.clearAllSessionStorage();
});

Cypress.Commands.add("verifyHompageIsVisible", () => {
  cy.get(shopPage.footer).should("be.visible");
  cy.get(shopPage.featuredItems).should("be.visible");
});

Cypress.Commands.add("fillContactUsForm", () => {
  cy.get("@user").then((user) => {
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
  cy.get("@user").then((user) => {
    cy.get(shopPage.subscriptionText).should("be.visible");
    cy.get(shopPage.subscribeEmail).type(user.email);
    cy.get(shopPage.subscribeButton).click();
    cy.get(shopPage.subscribeMessage).should(
      "have.text",
      "You have been successfully subscribed!"
    );
  });
});

Cypress.Commands.add("verifyScrollBottomArrow", () => {
  cy.isNotInViewport(shopPage.subscriptionText);
  cy.scrollTo("bottom");
  cy.isInViewport(shopPage.subscriptionText);
  // cy.get(shopPage.subscriptionText, { scrollBehavior: false }).should(
  //   "be.visible"
  // );
  cy.get(shopPage.upArrow).click();
  cy.isInViewport(shopPage.sliderText);
  cy.get(shopPage.sliderText, { scrollBehavior: false }).should(
    "have.text",
    "Full-Fledged practice website for Automation Engineers"
  );
});

Cypress.Commands.add("verifyScrollBottomNoArrow", () => {
  cy.isNotInViewport(shopPage.subscriptionText);
  cy.scrollTo("bottom");
  cy.isInViewport(shopPage.subscriptionText);

  cy.scrollTo("top");
  cy.isInViewport(shopPage.sliderText);
  cy.get(shopPage.sliderText, { scrollBehavior: false }).should(
    "have.text",
    "Full-Fledged practice website for Automation Engineers"
  );
});

// from https://github.com/cypress-io/cypress/issues/877#issuecomment-490504922
Cypress.Commands.add("isInViewport", (element) => {
  cy.get(element).then(($el) => {
    const bottom = Cypress.$(cy.state("window")).height();
    const rect = $el[0].getBoundingClientRect();

    expect(rect.top).not.to.be.greaterThan(bottom);
    expect(rect.bottom).not.to.be.greaterThan(bottom);
    expect(rect.top).not.to.be.greaterThan(bottom);
    expect(rect.bottom).not.to.be.greaterThan(bottom);
  });
});

// from https://github.com/cypress-io/cypress/issues/877#issuecomment-490504922
Cypress.Commands.add("isNotInViewport", (element) => {
  cy.get(element).then(($el) => {
    const bottom = Cypress.$(cy.state("window")).height();
    const rect = $el[0].getBoundingClientRect();

    expect(rect.top).to.be.greaterThan(bottom);
    expect(rect.bottom).to.be.greaterThan(bottom);
    expect(rect.top).to.be.greaterThan(bottom);
    expect(rect.bottom).to.be.greaterThan(bottom);
  });
});

export function generateRandomIndex(arr) {
  return Math.floor(Math.random() * arr.length);
}
