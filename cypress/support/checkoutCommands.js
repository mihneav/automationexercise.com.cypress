const checkoutPage = require("../pageObjects/checkoutPage");
const cartArray = require("./productCommands");
const cartPage = require("../pageObjects/cartPage");
const user = require("./userCommands");
const { verifyProducts } = require("./cartCommands");
const bacon = require("../utils/bacon");

Cypress.Commands.add("verifyCheckoutProducts", () => {
  verifyProducts();
  cy.get(cartPage.totalPrice).should("have.text", `Rs. ${calculateTotal()}`);
});

export function calculateTotal() {
  return cartArray.reduce(
    (sum, product) => sum + parseInt(product.price) * product.quantity,
    0
  );
}

Cypress.Commands.add("verifyAddresses", () => {
  const addresses = ["addressDelivery", "addressBilling"];
  ["addressDelivery", "addressInvoice"].forEach((addressType) => {
    const address = checkoutPage[addressType];
    cy.get(address.name).should("have.text", `${user.title}. ${user.name}`);
    cy.get(address.company).should("have.text", `${user.company}`);
    cy.get(address.address1).should("have.text", `${user.address1}`);
    cy.get(address.address2).should("have.text", `${user.address2}`);
    cy.get(address.city)
      .invoke("text")
      .then((text) => {
        const cleanedText = text.trim().replace(/\s+/g, " "); // remove \n\t\t\t\t\t\t\t\t
        cy.expect(cleanedText).to.include(`${user.city}`);
        cy.expect(cleanedText).to.include(`${user.state}`);
        cy.expect(cleanedText).to.include(`${user.zipcode}`);
      });
    cy.get(address.country).should("have.text", `${user.country}`);
    cy.get(address.mobile_number).should("have.text", `${user.mobile_number}`);
  });
});

Cypress.Commands.add("enterDescription", () => {
  cy.get(checkoutPage.form).type(bacon);
});

Cypress.Commands.add("placeOrder", () => {
  cy.get(checkoutPage.placeOrder).click();
});
