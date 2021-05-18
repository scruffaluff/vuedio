import { Chainable } from "cypress";

Cypress.Commands.add(
  "clickVSlider",
  { prevSubject: true },
  (subject: Chainable<JQuery<HTMLElement>>, percentFromLeft: number) => {
    const sliderWidth = subject.width();
    const sliderHeight = subject.height();

    console.log(subject);

    const pixelsFromLeft = percentFromLeft * sliderWidth;
    const pixelsFromTop = 0.5 * sliderHeight;

    cy.wrap(subject).click(pixelsFromLeft, pixelsFromTop, { force: true });
  }
);
