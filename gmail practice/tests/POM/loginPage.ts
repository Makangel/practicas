import { generateToken } from 'authenticator';
import { Locator, type Page } from "@playwright/test";

export class LoginPage {

    protected otp: any;
    readonly page: Page;
    readonly logInButton: Locator;
    readonly emailInput: Locator;
    readonly nextButton: Locator;   
    readonly passwordInput: Locator;
    readonly totpInput: Locator;
    readonly totpNextButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.otp = generateToken(process.env.SECRET);
        this.logInButton = this.page.getByRole('link', { name: 'Acceder' });
        this.emailInput = this.page.getByLabel('Email or phone');
        this.nextButton = this.page.getByRole('button', { name: 'Next' });
        this.passwordInput = this.page.getByLabel('Enter your password');
        this.totpInput = this.page.getByLabel('Enter your password');
        this.totpNextButton = this.page.locator('#totpNext').getByRole('button', { name: 'Next' });
    };


    async login() {
        await this.page.goto('https://www.google.com/intl/es-419/gmail/about/');
        await this.logInButton.click();
        await this.emailInput.fill(process.env.EMAIL!);
        await this.nextButton.click();
        await this.page.waitForLoadState('networkidle');
        await this.passwordInput.fill(process.env.password!);
        await this.nextButton.click();
        await this.page.waitForLoadState('networkidle');
        await this.totpInput.fill(this.otp);
        await this.totpNextButton.click();

        await this.page.waitForLoadState('networkidle');
        await this.page.context().storageState({ path: "../storage-state.json" });
    };


}