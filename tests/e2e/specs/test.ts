describe("Homepage", () => {
  it("Footer contains author", () => {
    cy.visit("/");
    cy.contains("div", "Designed by Wolfgang Wazzle Strauss");
  });
});
