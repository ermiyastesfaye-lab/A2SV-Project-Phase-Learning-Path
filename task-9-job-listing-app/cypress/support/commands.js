Cypress.Commands.add("login", () => {
  cy.visit("/login");
  cy.get('input[name="email"]').type("ermiyastesfaye16@gmail.com"); // <-- Replace with your email
  cy.get('input[name="password"]').type("1234");
  cy.get('button[type="submit"]').click();
  cy.url().should("eq", Cypress.config().baseUrl + "/");
});
