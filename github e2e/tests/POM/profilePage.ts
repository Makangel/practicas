import { Page, type Locator } from "@playwright/test";

export class ProfilePage {
  readonly page: Page;
  readonly repoContainer: Locator;

  constructor(page) {
    this.page = page;
    this.repoContainer = this.page.locator(
      'li[class="mb-3 d-flex flex-content-stretch col-12 col-md-6 col-lg-6"]'
    );
  }

  async getAndPrintRepositories() {//ver con hora por que pasa el test pero no imprime el array con el texto del locator. con debug no se ve que pase al metodo
    const count: number = await this.repoContainer.count();
    const aux: Array<string> = [];

    for (let i = 0; i < count; ++i) {
      let itemTitle = await this.repoContainer
        .nth(i)
        .locator("span[class='repo']")
        .textContent();
      aux.push(itemTitle!);
    }

    console.log(aux);
  }
}
