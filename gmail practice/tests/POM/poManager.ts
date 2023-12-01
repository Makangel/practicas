import { type Page } from "@playwright/test";
const { LoginPage } = require("loginPage");


export class POManager {
    readonly page: Page;
    readonly loginPage: typeof LoginPage;

    constructor(page: Page) {
        this.page = page;

        this.loginPage = new LoginPage(this.page);

    }

    getLoginPage() {
        return this.loginPage;
    }
}
