//TOTP GITHUB 2FA AUTH npm install otpauth

import { test, expect } from "@playwright/test";

test("github 2fa login w globalsetup & process.env", async ({ page }) => {
  await page.goto("https://github.com/");
  await page.screenshot();
  await page.pause();
});
