import Sinon from "cypress/types/sinon";

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

  it("Slide changes store volume", () => {
    cy.visit("/");

    cy.window().its("app.$store.state.volume").should("eq", 50);
    cy.get("div.v-slider").first().clickVSlider(0.25);
    cy.window().its("app.$store.state.volume").should("eq", 25);
  });

  it("Type changes store tempo", () => {
    cy.visit("/");
    cy.window().its("app.$store.state.tempo").should("eq", 120.0);

    // Del removes trailing zero that appears from clearing the text.
    cy.get("[data-testid='contol-bar-tempo']").clear().type("42{del}");
    cy.window().its("app.$store.state.tempo").should("eq", 42.0);
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

  it("Click calls AudioContext", () => {
    let spy: Cypress.Agent<Sinon.SinonSpy>;

    cy.visit("/");
    cy.window()
      .its("app")
      .then((app) => {
        spy = cy.spy(app.$store.state.audioContext, "createBufferSource");
      });

    cy.get("[data-testid='note-list-component']")
      .first()
      .find("[data-testid='note-list-name']")
      .click()
      .then(() => expect(spy).to.be.calledOnce);
  });
});

describe("Snackbar", () => {
  it("Is hidden initially", () => {
    cy.visit("/");
    cy.get("[data-testid='snackbar-error']").should("not.be.visible");
  });

  it("Displays error when playing with negative tempo", () => {
    cy.visit("/");
    cy.get("[data-testid='contol-bar-tempo']").clear().type("-42{del}");
    cy.get("[data-testid='contol-bar-play-button']").click();

    cy.get("[data-testid='snackbar-error']").should("be.visible");
  });

  it("Disappears when clicked", () => {
    cy.visit("/");
    cy.get("[data-testid='contol-bar-tempo']").clear().type("-42{del}");
    cy.get("[data-testid='contol-bar-play-button']").click();

    cy.get("[data-testid='snackbar-error']").click().should("not.be.visible");
  });
});
