import { chromium, expect } from "@playwright/test";
import * as OTPAuth from "otpauth";
import 'dotenv/config';

let totp = new OTPAuth.TOTP({
  issuer: "GitHub",
  label: process.env.USERNAME,
  algorithm: "SHA1",
  digits: 6,
  period: 30,
  secret: process.env.SECRET,
});

async function globalSetup(): Promise<void> {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto("https://github.com/");
  await page.getByRole("link", { name: "Sign in" }).click();
  await page.getByLabel("Username or email address").fill(process.env.USERNAME!);
  await page.getByLabel("Password").fill(process.env.PASSWORD!);
  await page.getByRole("button", { name: "Sign in" }).click();
  await page.getByPlaceholder("XXXXXX").fill(totp.generate());
  await expect(page).toHaveURL("https://github.com");
  
  await page.context().storageState({ path: "tests/util/storage-state.json" });
  await browser.close();
}

export default globalSetup;
