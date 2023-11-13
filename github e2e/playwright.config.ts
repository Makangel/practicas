import { defineConfig, devices } from '@playwright/test';
require('dotenv').config();

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
  
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: "setup",
      testDir: "./tests/global-setup",
      testMatch: "global-setup.ts"
    },
    {
      name: 'chromium',
      dependencies: ["setup"],
      use: { ...devices['Desktop Chrome'],
      storageState:'./tests/global-setup/storage-state.json',
    },
      
    },

  ],

});
