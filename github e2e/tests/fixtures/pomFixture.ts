import { test as baseTest } from "@playwright/test";
import { LandingPage } from "../POM/landingPage";
import { RepositoryPage } from "../POM/repositoryPage";
import { ProfilePage } from "../POM/profilePage";

type Pages = {
  landingPage: LandingPage;
  repositoryPage: RepositoryPage;
  profilePage: ProfilePage;
};

const PagesFixture = baseTest.extend<Pages>({
  landingPage: async ({ page }, use) => {
    await use(new LandingPage(page));
  },
  repositoryPage: async ({page} , use) =>{
    await use(new RepositoryPage(page));
  },
  profilePage: async({page},use)=>{
    await use(new ProfilePage(page));
  },

});

export const pomTest = PagesFixture;