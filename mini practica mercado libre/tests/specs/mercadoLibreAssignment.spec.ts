import { expect } from "@playwright/test";
import { pomTest } from "../fixtures/pomFixture";


pomTest(
  "search and filter results from mercado libre using POM and fixtures",
  async ({ page, landingPage, searchResultsPage }) => {
    /*
    busqueda
    filtrados
    imprimir por consola los resultados
    */

    await landingPage.land();
    await expect(page.getByRole('link', { name: 'Mercado Libre Argentina - Donde comprar y vender de todo' })).toBeVisible();
    
    //the product you will search for:
    let product = 'sandalias rojas';
    await landingPage.searchFor(product);

    const parsedProduct = await product.replace(/ /g, "-");
    const parsedUrl = page.url().split('[')[0];
    await expect(parsedUrl).toMatch(`https://listado.mercadolibre.com.ar/${parsedProduct}#D`);
    
    await searchResultsPage.filterBy("lowerPrice");
    await searchResultsPage.getEveryResultTitle();
    await searchResultsPage.filterBy("highestPrice");
    await searchResultsPage.getEveryResultTitle();
    await searchResultsPage.filterBy("popularity");
    await searchResultsPage.getEveryResultTitle();
  }
);
