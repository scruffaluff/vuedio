Cypress.Commands.add(
  "clickVSlider",
  { prevSubject: true },
  (
    subject: Cypress.Chainable<JQuery<HTMLElement>>,
    percentFromLeft: number
  ) => {
    const sliderWidth = subject.width();
    const sliderHeight = subject.height();

    const pixelsFromLeft = percentFromLeft * sliderWidth;
    const pixelsFromTop = 0.5 * sliderHeight;

    cy.wrap(subject).click(pixelsFromLeft, pixelsFromTop, { force: true });
  }
);
