import user from "./userCommands";

Cypress.Commands.add("createAccountApi", () => {
  cy.request({
    method: "POST",
    url: "/api/createAccount",
    form: true,
    body: user,
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => {
    expect(response.status).to.equal(200);
    response.body = JSON.parse(response.body);
    expect(response.body).to.have.property("responseCode", 201);
    expect(response.body).to.have.property("message", "User created!");
  });
});

Cypress.Commands.add("deleteAccountApi", () => {
  const payload = {
    email: user.email,
    password: user.password,
  };
  cy.request({
    method: "DELETE",
    url: "/api/deleteAccount",
    form: true,
    body: payload,
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => {
    expect(response.status).to.equal(200);
    response.body = JSON.parse(response.body);
    expect(response.body).to.have.property("responseCode", 200);
    expect(response.body).to.have.property("message", "Account deleted!");
  });
});

Cypress.Commands.add("searchProductApi", (productName) => {
  const payload = {
    search_product: productName,
  };
  cy.request({
    method: "POST",
    url: "/api/searchProduct",
    form: true,
    body: payload,
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => {
    expect(response.status).to.equal(200);
    response.body = JSON.parse(response.body);
    cy.wrap(response.body).as("responseBody");
  });
});
