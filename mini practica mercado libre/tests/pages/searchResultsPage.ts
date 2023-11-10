import { type Locator, type Page } from "@playwright/test";

export class SearchResultsPage {
  readonly page: Page;
  readonly allResults: Locator;
  readonly currentFilter: Locator;
  readonly popularityFilter: Locator;
  readonly lowerPriceFilter: Locator;
  readonly highestPriceFilter: Locator;

  constructor(page: Page) {
    this.page = page;

    this.allResults = this.page.locator(".ui-search-layout__item");
    this.currentFilter = this.page.locator("//button[@id=':Rlh9b9:-trigger']");
    this.popularityFilter = this.page.getByRole("option", {
      name: "Más relevantes",
    });
    this.lowerPriceFilter = this.page.getByRole("option", {
      name: "Menor precio",
    });
    this.highestPriceFilter = this.page.getByRole("option", {
      name: "Mayor precio",
    });
  }

  async getEveryResultTitle() {
    const count: number = await this.allResults.count();
    const aux: Array<string> = [];

    for (let i = 0; i < count; ++i) {
      let itemTitle = await this.allResults
        .nth(i)
        .locator(".ui-search-item__title")
        .textContent();
      aux.push(itemTitle!);
    }

    console.log(aux);
  }

  async filterBy(filter?: "popularity" | "lowerPrice" | "highestPrice") {
    switch (filter) {
      
      case "popularity":
        await this.currentFilter.click();
        await this.popularityFilter.click();
        break;

      case "lowerPrice":
        await this.currentFilter.click();
        await this.lowerPriceFilter.click();
        break;

      case "highestPrice":
        await this.currentFilter.click();
        await this.highestPriceFilter.click();
        break;
    }
  }
}


