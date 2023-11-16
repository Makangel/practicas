import { test, expect } from "@playwright/test";
import * as OTPAuth from "otpauth";
import "dotenv/config";
import { log } from "console";

let totp = new OTPAuth.TOTP({
  issuer: "GitHub",
  label: process.env.EMAIL,
  algorithm: "SHA1",
  digits: 6,
  period: 30,
  secret: process.env.SECRET,
});

test("Login", async ({ page }) => {
  await page.goto("https://github.com/");
  await page.getByRole("link", { name: "Sign in" }).click();
  await page.getByLabel("Username or email address").fill(process.env.EMAIL!);
  await page.getByLabel("Password").fill(process.env.PASSWORD!);
  await page.getByRole("button", { name: "Sign in", exact: true }).click();
  await page.locator("#app_totp").fill(totp.generate());
  await expect(page).toHaveURL("https://github.com");

  await page.context().storageState({ path: "tests/util/storage-state.json" });
});
