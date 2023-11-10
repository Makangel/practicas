//TOTP GITHUB 2FA AUTH npm install otpauth

import { test, expect } from "@playwright/test";
import * as OTPAuth from "otpauth";

const username = "sgroangie@gmail.com";
const password = "CeleMene123";

let totp = new OTPAuth.TOTP({
  issuer: "GitHub",
  label: username,
  algorithm: "SHA1",
  digits: 6,
  period: 30,
  //AL CONFIGURAR EL 2FA DE GITHUB TENEMOS QUE GUARDARNOS ESTE SECRETO
  secret: "LMXFWK4EQP62FBEW",
});

test("github 2fa login automated with TOTP library", async ({ page }) => {
  await page.goto("https://github.com/");
  await page.getByRole("link", { name: "Sign in" }).click();
  await page.getByLabel("Username or email address").fill(username);
  await page.getByLabel("Password").fill(password);
  await page.getByRole("button", { name: "Sign in" }).click();
  //GENERA UNA CLAVE BASADA EN EL MOMENTO DE EJECUCION
  await page.getByPlaceholder("XXXXXX").fill(totp.generate());
  await expect(page).toHaveURL("https://github.com");
  await page.screenshot({ path: "home.png" });
});


/*
SOLUCION ORIGINAL
import { expect, test } from "@playwright/test"
import * as OTPAuth from "otpauth"

let totp = new OTPAuth.TOTP({
  issuer: "Raccoon",
  label: "GitHub",
  algorithm: "SHA1",
  digits: 6,
  period: 30,
  secret: process.env.GITHUB_OTP,
})

test("GitHub 2FA works", async ({ page }) => {
  await page.goto("https://github.com/")
  await page.getByRole("link", { name: "Sign in" }).click()
  await page.getByLabel("Username or email address").click()
  await page
   .getByLabel("Username or email address")
   .fill(process.env.GITHUB_USER)
  await page.getByLabel("Username or email address").press("Tab")
  await page.getByLabel("Password").fill(process.env.GITHUB_PW)
  await page.getByRole("button", { name: "Sign in" }).click()
  await page.getByPlaceholder("XXXXXX").click()
  await page.getByPlaceholder("XXXXXX").fill(totp.generate())
  await expect(page).toHaveURL("https://github.com")
  await page.screenshot({ path: "home.png" })
})

*/