import { test as baseTest } from "@playwright/test";
import { LandingPage } from "../pages/landingPage";
import { SearchResultsPage } from "../pages/searchResultsPage";

type Pages = {
  landingPage: LandingPage;
  searchResultsPage: SearchResultsPage;
};

const PagesFixture = baseTest.extend<Pages>({
  landingPage: async ({ page }, use) => {
    await use(new LandingPage(page));
  },

  searchResultsPage: async ({ page }, use) => {
    await use(new SearchResultsPage(page));
  },
});

export const pomTest = PagesFixture;
