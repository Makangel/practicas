import { test as baseTest } from "@playwright/test";
import { LoginPage } from "../POM/loginPage"; 


type Pages = {
  loginPage: LoginPage;

};

const PagesFixture = baseTest.extend<Pages>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  

});

export const pomTest = PagesFixture;