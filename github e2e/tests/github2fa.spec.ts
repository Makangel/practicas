import { expect } from "@playwright/test";
import { pomTest } from "./fixtures/pomFixture";

pomTest(
  " goto 'practicas repository', star/unstar it and come back to dashboard",
  async ({ page, landingPage, repositoryPage }) => {
    await landingPage.land();
    await landingPage.gotoPracticasRepository();
    await repositoryPage.starRepository();
    await page.goBack();
  }
);

pomTest(
  "uncheck all filters and take a screenshot of dashboard",
  async ({ page, landingPage }) => {
    await landingPage.land();
    await landingPage.uncheckAllFilters(); //revisar con hora este metodo
    await page.screenshot({ path: "dashboard.png" });
  }
);

pomTest(
  "go to my profile and get a list of every repository and print it through console.log",
  async ({ page, landingPage, profilePage }) => {
    await landingPage.land();
    await landingPage.gotoProfilePage();
    await profilePage.getAndPrintRepositories(); //revisar con hora este metodo
    await page.pause();
  }
);

pomTest(
  "check filter and take a screenshot per every filter",
  async ({ landingPage }) => {
    await landingPage.land();
    await landingPage.uncheckAllFilters();
    await landingPage.checkEveryFilter(); //revisar con hora este metodo
  }
);
//los metodos api no estarian funcionando, los hice como vi con rahul
pomTest(
  "@smoke intercept an api call and mock the url",
  async ({ page, landingPage }) => {
    await landingPage.land();

    
    await page.route('"https://github.com/Makangel"', (route) =>
      route.continue({
        url: "https://www.google.com/",
      })
    );

    await landingPage.gotoProfilePage();
    await expect(page.url()).toMatch("https://www.google.com/");
  }
);
pomTest(
  "intercept an api call and abort it",
  async ({ page, landingPage }) => {
    await landingPage.land();

    await landingPage.gotoProfilePage();
    await page.route('**/*.{jpg,png,jpeg}', route => route.abort());
    await page.route('**/*.css', route => route.abort());
    
    await page.screenshot({path:'nonCssJpgProfile.png'})

  }
);
