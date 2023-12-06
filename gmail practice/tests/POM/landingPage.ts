import { Locator, type Page } from "@playwright/test";

export class LandingPage{
    readonly page: Page;
    readonly favMailLocator: string;
    readonly tagButton: Locator;
    readonly apiTagCheck: Locator;


    constructor(page: Page) {
        this.page = page;
        this.favMailLocator = 'span[aria-label="Destacado"]';
        this.tagButton = this.page.getByText('Etiquetar como►');
        this.apiTagCheck = this.page.locator('div[title="API"]');
    }

    async tagAFavMail(){
        await this.page.click(this.favMailLocator, { button: 'right' });
        await this.tagButton.hover();
        await this.apiTagCheck.click();
        
    }
}