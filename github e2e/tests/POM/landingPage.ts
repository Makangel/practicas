import { type Locator, type Page } from "@playwright/test";

export class LandingPage {
  readonly page: Page;
  readonly URL: string;
  readonly practicasRepositoryButton: Locator;
  readonly filtersButton: Locator;
  readonly announcementFilterCheck: Locator;
  readonly releasesFilterCheck: Locator;
  readonly sponsorsFilterCheck: Locator;
  readonly starsFilterCheck: Locator;
  readonly repositoriesFilterCheck: Locator;
  readonly repositoryActivityFilterCheck: Locator;
  readonly followsFilterCheck: Locator;
  readonly recommendationsFilterCheck: Locator;
  readonly saveFilterButton: Locator;
  readonly profilePicLink: Locator;
  readonly gotoProfileButton: Locator;
  readonly oneFilterButton: Locator;

  protected aux: Array<Locator>;

  constructor(page: Page) {
    this.page = page;
    this.URL = "https://github.com/";
    this.practicasRepositoryButton = this.page.getByRole("link", {
      name: "Makangel/practicas",
    });

    this.filtersButton = this.page.getByRole("button", { name: "Filter", exact: true });
    this.announcementFilterCheck = this.page.locator(
      'input[name="Announcements"]'
    );
    this.releasesFilterCheck = this.page.locator('input[name="Releases"]');
    this.sponsorsFilterCheck = this.page.locator('input[name="Sponsors"]');
    this.starsFilterCheck = this.page.locator('input[name="Stars"]');
    this.repositoriesFilterCheck = this.page.locator(
      'input[name="Repositories"]'
    );
    this.repositoryActivityFilterCheck = this.page.locator(
      'input[name="RepositoryActivity"]'
    );
    this.followsFilterCheck = this.page.locator('input[name="Follows"]');
    this.recommendationsFilterCheck = this.page.locator(
      'input[name="Recommendations"]'
    );
    this.saveFilterButton = this.page.getByRole("button", { name: "Save" });
    this.profilePicLink = this.page.getByLabel("Open user account menu");
    this.gotoProfileButton = this.page.getByRole("link", {
      name: "Your profile",
    });
    this.oneFilterButton = this.page.getByRole('button', { name: 'Filter 1' });

    this.aux = [
      this.announcementFilterCheck,
      this.releasesFilterCheck,
      this.sponsorsFilterCheck,
      this.starsFilterCheck,
      this.repositoriesFilterCheck,
      this.repositoryActivityFilterCheck,
      this.followsFilterCheck,
      this.recommendationsFilterCheck,
    ];
  }

  async land() {
    await this.page.goto(this.URL);
  }

  async gotoPracticasRepository() {
    await this.practicasRepositoryButton.click();
  }

  async uncheckAllFilters() {
    await this.filtersButton.click();
    for (let i = 0; i < 8; i++) {
      //revisar con hora porque no entra en la condicion
      if ((await this.aux[i].isChecked()) === true) {
        await this.aux[i].uncheck();
      }
    }
    await this.saveFilterButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async checkFilterAndScreenshot(filter: Locator) {
    //falta laguna espera? o configurar mejor el path?
    await this.filtersButton.click();
    await filter.check();
    await this.saveFilterButton.click();
    await this.page.waitForLoadState('networkidle');
    await this.page.screenshot();
    await this.oneFilterButton.click();
    await filter.uncheck();
    await this.saveFilterButton.click();
  }

  async handleCheckFilterAndScreenshot(
    filter?:
      | "announcements"
      | "releases"
      | "sponsors"
      | "stars"
      | "repositories"
      | "repositoryActivity"
      | "follows"
      | "recommendations"
  ) {
    switch (filter) {
      case "announcements":
        await this.checkFilterAndScreenshot(this.announcementFilterCheck);
        break;
      case "releases":
        await this.checkFilterAndScreenshot(this.releasesFilterCheck);
        break;
      case "sponsors":
        await this.checkFilterAndScreenshot(this.sponsorsFilterCheck);
        break;
      case "stars":
        await this.checkFilterAndScreenshot(this.starsFilterCheck);
        break;
      case "repositories":
        await this.checkFilterAndScreenshot(this.repositoriesFilterCheck);
        break;
      case "repositoryActivity":
        await this.checkFilterAndScreenshot(this.repositoryActivityFilterCheck);
        break;
      case "follows":
        await this.checkFilterAndScreenshot(this.followsFilterCheck);
        break;
      case "recommendations":
        await this.checkFilterAndScreenshot(this.recommendationsFilterCheck);
        break;
    }
  }

  async checkEveryFilter() {
    for (let i = 0; i < 8; i++) {
      await this.checkFilterAndScreenshot(this.aux[i]);
    }
  }

  async gotoProfilePage() {
    await this.profilePicLink.click();
    await this.gotoProfileButton.click();
    await this.page.waitForLoadState();
  }

  async gotoFalseProfile() {
    await this.page.route("https://github.com/Makangel", (route) =>
      route.continue({
        url: "https://www.google.com/",
      })
    );

    await this.page.goto("https://github.com/Makangel");
    await this.page.waitForLoadState();
    await this.page.pause();
  }

  async gotoEmptyProfile() {
    await this.page.goto("https://github.com/Makangel");
    await this.page.route("**/*.{jpg,png,jpeg}", (route) => route.abort());
    await this.page.route("**/*.css", (route) => route.abort());
  }
}
