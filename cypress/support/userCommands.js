const { shopMenu } = require("../pageObjects/shopPage");
const loginPage = require("../pageObjects/loginPage");
const signUpPage = require("../pageObjects/signUpPage");
const accountCreatedPage = require("../pageObjects/accountCreatedPage");
const User = require("../utils/User");
const accountDeletedPage = require("../pageObjects/accountDeletedPage");

Cypress.Commands.add("generateUser", () => {
  const userInstance = new User();
  const user = userInstance.generateUser();
  return user;
});

Cypress.Commands.add("login", () => {
  cy.get("@user").then((user) => {
    cy.get(shopMenu.signUpLogin).click();
    cy.get(loginPage.loginEmail).type(user.email);
    cy.get(loginPage.loginPassword).type(user.password);
    cy.get(loginPage.loginButton).click();
  });
});

Cypress.Commands.add("verifyLoginFailed", () => {
  cy.get(loginPage.loginFailMessage)
    .should("be.visible")
    .should("include.text", `Your email or password is incorrect!`);
});

Cypress.Commands.add("verifySignUpFailed", () => {
  cy.get(loginPage.signUpFailMessage)
    .should("be.visible")
    .should("include.text", `Email Address already exist!`);
});

Cypress.Commands.add("initiateSignUp", () => {
  cy.get("@user").then((user) => {
    cy.get(shopMenu.signUpLogin).click();
    cy.get(loginPage.signUpButton).should("be.visible");
    cy.get(loginPage.signUpName).type(user.firstname);
    cy.get(loginPage.signUpEmail).type(user.email);
    cy.get(loginPage.signUpButton).click();
  });
});

Cypress.Commands.add("enterAccountInformation", () => {
  cy.get("@user").then((user) => {
    cy.get(signUpPage.enterAccountInformation)
      .should("be.visible")
      .should("include.text", "Enter Account Information");
    cy.get(signUpPage.name).clear().type(user.name);
    cy.get(signUpPage.title).contains(user.title).click();
    cy.get(signUpPage.password).type(user.password);
    cy.get(signUpPage.dayOfBirth).select(user.birth_date);
    cy.get(signUpPage.monthOfBirth).select(user.birth_month);
    cy.get(signUpPage.yearOfBirth).select(user.birth_year);
    cy.get(signUpPage.newsletter).check();
    cy.get(signUpPage.offers).check();
    cy.get(signUpPage.firstName).type(user.firstname);
    cy.get(signUpPage.lastName).type(user.lastname);
    cy.get(signUpPage.company).type(user.company);
    cy.get(signUpPage.address).type(user.address1);
    cy.get(signUpPage.address2).type(user.address2);
    cy.get(signUpPage.country).select(user.country);
    cy.get(signUpPage.state).type(user.state);
    cy.get(signUpPage.city).type(user.city);
    cy.get(signUpPage.zipCode).type(user.zipcode);
    cy.get(signUpPage.mobileNumber).type(user.mobile_number);
  });
});

Cypress.Commands.add("clickCreateAccount", () => {
  cy.get(signUpPage.createAccount).click();
  cy.get(accountCreatedPage.title)
    .should("be.visible")
    .should("include.text", "Account Created!");
  cy.get(accountCreatedPage.continue).click();
});

Cypress.Commands.add("createAccount", () => {
  cy.visit("");
  cy.initiateSignUp();
  cy.enterAccountInformation();
  cy.clickCreateAccount();
});

Cypress.Commands.add("verifyUserIsLogged", () => {
  cy.get("@user").then((user) => {
    cy.get(shopMenu.loggedInAsUsername)
      .should("be.visible")
      .should("include.text", `Logged in as ${user.name}`);
  });
});

Cypress.Commands.add("deleteAccount", () => {
  cy.get(shopMenu.delete).should("be.visible").click();
  cy.get(accountDeletedPage.title)
    .should("be.visible")
    .should("include.text", "Account Deleted!");
  cy.get(accountDeletedPage.continue).click();
});

Cypress.Commands.add("logout", () => {
  cy.get(shopMenu.logout)
    .should("be.visible")
    .should("include.text", `Logout`)
    .click();
  cy.url().should("contain", "login");
});

// module.exports = generateUser;
