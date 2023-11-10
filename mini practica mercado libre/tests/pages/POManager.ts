import { type Page } from "@playwright/test";
const {LandingPage} = require('../pages/landingPage');
const {SearchResultsPage} = require('../pages/searchResultsPage');

class POManager{

readonly page : Page;
readonly landingPage : typeof LandingPage;
readonly searchResultsPage : typeof SearchResultsPage;

constructor(page: Page){
    this.page = page;

    this.landingPage = new LandingPage(this.page);
    this.searchResultsPage = new SearchResultsPage(this.page);
}

getLandingPage(){
    return this.landingPage;
}

getSearchResultsPage(){
    return this.searchResultsPage;
}

}
module.exports = {POManager};