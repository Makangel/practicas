import { chromium, expect } from "@playwright/test";

async function globalSetup(): Promise<void> {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto("https://rahulshettyacademy.com/client/");
  await expect(page).toHaveURL(
    "https://rahulshettyacademy.com/client/auth/login"
  );

  await page.locator("#userEmail").type("asgro4@makingsense.com");
  await page.locator("#userPassword").type("Makangel25!");
  await page.locator("#login").click();
  await expect(page).toHaveURL(
    "https://rahulshettyacademy.com/client/dashboard/dash"
  );

  await page.context().storageState({ path: "tests/util/storage-state.json" });
  await browser.close();
}

export default globalSetup;
