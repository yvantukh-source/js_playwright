import { expect } from "@playwright/test"


export class Checkout {
    constructor(page) {
        this.page = page

        this.basketCards = page.locator('[data-qa="basket-card"]')
        this.basketItemPrice = page.locator('[data-qa="basket-item-price"]')
        this.basketItemRemoveButton = page.locator('[data-qa="basket-card-remove-item"]')
        this.continueToCheckoutButon = page.locator('[data-qa="continue-to-checkout"]')
    }

    removeCheapestProduct = async () => {
        await this.basketCards.first().waitFor()
        const itemsBeforeRemoval = await this.basketCards.count()
        await this.basketItemPrice.first().waitFor()

        const allPriceText = await this.basketItemPrice.allInnerTexts()
        // { allPriceText: [ '499$', '599$', '320$' ] }
        
        const justNumbers = allPriceText.map((element) => {
            const withoutDollarSign = element.replace("$", "")
            return parseInt(withoutDollarSign, 10)
        })
        
        const smallestPrice = Math.min(...justNumbers)
        const smallstPriceIndex = justNumbers.indexOf(smallestPrice)
        const specificRemoveButton = this.basketItemRemoveButton.nth(smallstPriceIndex)
        await specificRemoveButton.waitFor()
        await specificRemoveButton.click()
        
        await expect(this.basketCards).toHaveCount(itemsBeforeRemoval - 1)
    }

    continueToCheckout = async () => {
        await this.continueToCheckoutButon.waitFor()
        await this.continueToCheckoutButon.click()
        await this.page.waitForURL(/\/login/, {timeout: 3000})
    }
}