import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",

  fullyParallel: true,

  forbidOnly: !!process.env.CI,

  retries: process.env.CI ? 2 : 0,

  workers: process.env.CI ? 1 : undefined,

  reporter: "html",

  use: {
    trace: "on-first-retry",
  },

  projects: [
    {
      name: 'setup',
      testDir: 'tests/util/global-setup.ts',
      testMatch: 'global-setup.ts'
    },
    {
      name: "chromium",
      dependencies: ['setup'],
      use: {
        ...devices["Desktop Chrome"],
        storageState: "./tests/util/storage-state.json",
      },
    },
  ],
});
