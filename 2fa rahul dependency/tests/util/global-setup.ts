import { test, expect } from "@playwright/test";


test('login', async ({page})=>{
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

});

