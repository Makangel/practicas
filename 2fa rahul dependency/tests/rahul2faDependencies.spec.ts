import { test, expect } from "@playwright/test";

test("login w dependencies", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/client/");
  await expect(page).toHaveURL(
    "https://rahulshettyacademy.com/client/dashboard/dash"
  );
  // await page.pause();
});
