import { expect, test } from "@playwright/test";

test("Alert is hidden initially", async ({ page }) => {
  await page.goto("/");
  const alert = page.getByTestId("alert-box");
  await expect(alert).not.toBeVisible();
});

test("Alert displays error when playing with negative tempo", async ({
  page,
}) => {
  await page.goto("/");
  const alert = page.getByTestId("alert-box");
  await page.locator("[data-testid='contol-bar--tempo'] > input").fill("-12");

  await page.getByTestId("contol-bar--play-button").click();
  await expect(alert).toBeVisible();
});
