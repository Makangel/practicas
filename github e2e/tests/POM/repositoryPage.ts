import { type Locator, type Page } from "@playwright/test";

export class RepositoryPage{

    readonly page : Page;
    readonly starButton : Locator;


    constructor(page : Page){
        this.page = page;

        this.starButton = this.page.getByRole("button", {name:'Star'});
    }


    async starRepository(){
        await this.starButton.click();
    }
}