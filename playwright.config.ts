// Playwright configuration file for end to end tests.
//
// For more information, visit https://playwright.dev/docs/test-configuration.

import type { PlaywrightTestConfig } from "@playwright/test";
import { devices } from "@playwright/test";

export default {
  outputDir: "tests/results",
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
      },
    },
  ],
  reporter: "list",
  testDir: "tests",
  use: {
    colorScheme: "no-preference",
    screenshot: "only-on-failure",
    trace: "on-first-retry",
    video: "retain-on-failure",
  },
  webServer: {
    command: process.env.CI
      ? "vite build && vite preview"
      : "vite dev --port 4173",
    port: 4173,
  },
} satisfies PlaywrightTestConfig;
