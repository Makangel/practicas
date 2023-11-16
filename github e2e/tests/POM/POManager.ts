import { type Page } from "@playwright/test";
const { RepositoryPage } = require ("../POM/repositoryPage");
const { LandingPage } = require("../POM/landingPage");
const { ProfilePage } = require("./profilePage");

class POManager {
  readonly page: Page;
  readonly landingPage: typeof LandingPage;
  readonly repositoryPage : typeof RepositoryPage;
  readonly profilePage : typeof ProfilePage;

  constructor(page: Page) {
    this.page = page;

    this.landingPage = new LandingPage(this.page);
    this.repositoryPage = new RepositoryPage(this.page);
    this.profilePage = new ProfilePage(this.page);
  }

  getLandingPage() {
    return this.landingPage;
  }

  getRepositoryPage(){
    return this.repositoryPage;
  }

  getProfilePage(){
    return this.profilePage;
  }
}
module.exports = { POManager };
