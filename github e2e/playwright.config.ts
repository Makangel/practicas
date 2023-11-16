import { defineConfig, devices } from "@playwright/test";
require("dotenv").config();

export default defineConfig({
  testDir: "./tests",
  timeout: 30000,
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
      name: "loginSetup",
      testDir: "./tests/global-setup",
      testMatch: "global-setup.ts",
      use:{
        headless: true
      }
    },
    {
      name: "chromium",
      dependencies: ["loginSetup"],
      use: {
        ...devices["Desktop Chrome"],
        storageState: "./tests/global-setup/storage-state.json",
      },
    },
  ],
});
