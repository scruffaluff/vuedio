describe("ControlBar", () => {
  it("Click changes play button icon", () => {
    cy.visit("/");
    cy.get("[data-testid='contol-bar-play-button']")
      .should("have.class", "mdi-play")
      .click()
      .should("have.class", "mdi-pause");
  });

  it("Click changes volume icon", () => {
    cy.visit("/");

    cy.get("div.v-input__slider")
      .find("button.v-icon")
      .should("have.class", "mdi-volume-medium")
      .click()
      .should("have.class", "mdi-volume-mute");
  });

  it("Slide changes volume icon", () => {
    cy.visit("/");
    cy.get("div.v-slider").first().clickVSlider(0.25);

    cy.get("div.v-input__slider")
      .find("button.v-icon")
      .should("have.class", "mdi-volume-low");
  });
});

describe("NoteList", () => {
  it("Default renders name", () => {
    cy.visit("/");
    cy.get("[data-testid='note-list-component']")
      .first()
      .find("[data-testid='note-list-name']")
      .contains("Kick");
  });

  it("Click changes color", () => {
    cy.visit("/");
    cy.get("[data-testid='note-list-component']")
      .first()
      .find("[data-testid='note-list-button']")
      .first()
      .should("have.class", "lighten-4")
      .click()
      .should("not.have.class", "lighten-4");
  });
});
