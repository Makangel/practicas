import { test as baseTest } from "@playwright/test";
import { LoginPage } from "../POM/loginPage"; 
import { LandingPage } from "../POM/landingPage";


type Pages = {
  loginPage: LoginPage;
  landingPage: LandingPage;

};

const PagesFixture = baseTest.extend<Pages>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  landingPage: async ({ page }, use) => {
    await use(new LandingPage(page));
  },

});

export const pomTest = PagesFixture;