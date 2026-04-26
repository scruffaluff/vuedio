/**
 * Playwright configuration file for end to end tests.
 *
 * For more information, visit https://playwright.dev/docs/test-configuration.
 */

import type { PlaywrightTestConfig } from "@playwright/test";
import * as playwright from "@playwright/test";

export default {
  fullyParallel: true,
  outputDir: "test/result",
  projects: [
    {
      name: "desktop",
      use: {
        ...playwright.devices["Desktop Chrome"],
        colorScheme: "dark",
        viewport: { height: 1080, width: 1920 },
      },
    },
    {
      name: "mobile",
      use: {
        ...playwright.devices["iPhone SE"],
        colorScheme: "light",
        defaultBrowserType: "chromium",
        viewport: { height: 568, width: 320 },
      },
    },
  ],
  reporter: [
    ["list"],
    ["html", { open: "never", outputFolder: "test/report" }],
  ],
  retries: process.env.CI ? 1 : 0,
  snapshotPathTemplate: "{testDir}/snapshot/{testName}.{projectName}{ext}",
  testDir: "test",
  use: {
    screenshot: "only-on-failure",
    trace: "on-first-retry",
    video: "retain-on-failure",
  },
  webServer: {
    command: "pnpm exec vite serve",
    port: 5173,
  },
} satisfies PlaywrightTestConfig;
