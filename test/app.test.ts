import { expect, test } from "@playwright/test";

test("Heading container project name", async ({ page }) => {
  await page.goto("/");
  const heading = page.locator("h1");
  await expect(heading).toHaveText("Vuedio");
});

test("Click changes play button icon", async ({ page }) => {
  await page.goto("/");
  const button = page.locator("[data-testid='contol-bar--play-button']");
  const icon = button.locator("span");

  await expect(icon).toHaveClass(/.*ph--play-fill.*/);
  await button.click();
  await expect(icon).toHaveClass(/.*ph--pause-fill.*/);
});

test("Slide changes volume icon", async ({ page }) => {
  await page.goto("/");
  const slider = page.locator(
    "[data-testid='contol-bar--volume-slider'] > input"
  );
  const icon = page.locator("[data-testid='contol-bar--volume-slider'] > span");

  await expect(icon).toHaveClass(/.*ph--speaker-simple-high-fill.*/);
  await slider.fill("25");
  await expect(icon).toHaveClass(/.*ph--speaker-simple-low-fill.*/);
});

test("Click changes button color", async ({ page }) => {
  await page.goto("/");
  const button = page
    .locator("[data-testid='note-list--snare'] > button")
    .nth(3);

  await expect(button).toHaveClass(/^((?!btn-secondary).)*$/);
  await button.click();
  await expect(button).toHaveClass(/.*btn-secondary.*/);
});
