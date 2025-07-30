// Use cy.login() only if you have defined it in cypress/support/commands.js
describe("Bookmark Feature", () => {
  beforeEach(() => {
    cy.login();
    cy.visit("/");
  });

  it("should display job cards on the home page", () => {
    cy.get('[data-cy="job-card"]', { timeout: 60000 }).should("exist");
  });

  it("should bookmark a job and see it in bookmarks page", () => {
    cy.get('[data-cy="job-card"]', { timeout: 60000 })
      .first()
      .within(() => {
        cy.get('[data-cy="bookmark-toggle"]').as("bookmarkBtn");
        cy.get("@bookmarkBtn").click();
      });
    cy.get('[data-cy="nav-bookmarks"]', { timeout: 60000 }).click();
    cy.url().should("include", "/bookmarks");
    cy.get('[data-cy="bookmarked-jobs-list"] [data-cy="job-card"]', {
      timeout: 60000,
    }).should("exist");
  });

  it("should remove a bookmark and not see it in bookmarks page", () => {
    cy.get('[data-cy="nav-bookmarks"]', { timeout: 60000 }).click();
    cy.url().should("include", "/bookmarks");
    cy.get('[data-cy="bookmarked-jobs-list"] [data-cy="job-card"]', {
      timeout: 60000,
    })
      .first()
      .within(() => {
        cy.get('[data-cy="bookmark-toggle"]').as("bookmarkBtn");
        cy.get("@bookmarkBtn").click();
      });
    cy.wait(1000); // Wait for UI to update after removing bookmark
    cy.reload(); // Force reload to get updated state from server
    cy.get('[data-cy="bookmarked-jobs-list"] [data-cy="job-card"]', {
      timeout: 60000,
    }).should("not.exist");
  });

  it("should navigate between home and bookmarks", () => {
    cy.get('[data-cy="nav-bookmarks"]', { timeout: 60000 }).click();
    cy.url().should("include", "/bookmarks");
    cy.contains("Go Back").click();
    cy.url().should("not.include", "/bookmarks");
  });
});
