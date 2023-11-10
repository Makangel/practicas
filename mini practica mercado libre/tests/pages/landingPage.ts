import { type Locator, type Page } from "@playwright/test";

export class LandingPage {
  readonly page: Page;
  readonly URL: string;
  readonly searchBar: Locator;

  constructor(page: Page) {
    this.page = page;
    this.URL = "https://www.mercadolibre.com.ar/";

    this.searchBar = this.page.locator("#cb1-edit");
  }

  async land() {
    await this.page.goto(this.URL);
  }

  async searchFor(item) {
    await this.searchBar.type(item);
    await this.page.keyboard.press("Enter");
    await this.page.waitForLoadState("networkidle");
  }
}

