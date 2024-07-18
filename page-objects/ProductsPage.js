import { expect } from "@playwright/test"
import { Navigation } from "./Navigation.js"
import {isDesktop} from "./../utils/IsDesktop.js"


export class ProductsPage {
    constructor(page) {
        this.page = page

        this.addButtors = page.locator('[data-qa="product-button"]')
        this.sortDropdown = page.locator('[data-qa="sort-dropdown"]')
        this.productTitle = page.locator('[data-qa="product-title"]')
    }

    visit = async () => {
        await this.page.goto("/")
    }

    addProductToBasket = async (index) => {
        const specificAddButton = this.addButtors.nth(index)

        await specificAddButton.waitFor()
        await expect(specificAddButton).toHaveText('Add to Basket')
        const navigation = new Navigation(this.page)
        let basketCountBefore
        if (isDesktop(this.page)) {
            basketCountBefore = await navigation.getBusketCount()}
        await specificAddButton.click()
        await expect(specificAddButton).toHaveText('Remove from Basket')
        if (isDesktop(this.page)) {
            const basketCountAfter = await navigation.getBusketCount()
            expect(basketCountAfter).toBeGreaterThan(basketCountBefore)}
    }



    sortByCheapest = async () => {  
        await this.sortDropdown.waitFor()
        await this.productTitle.first().waitFor()
        const productTitleBefore = await this.productTitle.allInnerTexts()
        await this.sortDropdown.selectOption('price-asc')
        const productTitleAfter = await this.productTitle.allInnerTexts()

        expect(productTitleAfter).not.toEqual(productTitleBefore)
    }
}