import { expect } from "@playwright/test"

export class PaymentPage {
    constructor(page) {
        this.page = page

        this.discountCode = page.frameLocator('[data-qa="active-discount-container"]').locator('[data-qa="discount-code"]')
        this.discountCodeInput = page.locator('[data-qa="discount-code-input"]')
        this.discountAtivatedMessage = page.locator('[data-qa="discount-active-message"]')
        this.totalValue = page.locator('[data-qa="total-value"]')
        this.totalWithDiscountValue = page.locator('[data-qa="total-with-discount-value"]')
        // getByPlaceholder('Discount code')
        this.submitDiscountButton = page.getByRole('button', { name: 'Submit discount' })
        
        this.cartOwner = page.locator('[data-qa="credit-card-owner"]')
        this.cartNumber = page.locator('[data-qa="credit-card-number"]')
        this.validUntil = page.locator('[data-qa="valid-until"]')
        this.cartCvc = page.locator('[data-qa="credit-card-cvc"]')
        this.payButton = page.getByRole('button', { name: 'Pay' })
    }

    activatedDiscount = async() => {
        await this.discountCode.waitFor()
        const code = await this.discountCode.innerText()
        
        await this.discountCodeInput.waitFor()
        await this.discountCodeInput.fill(code)
        await expect(this.discountCodeInput).toHaveValue(code)

        // Option 2, slow typing
        // await this.discountCodeInput.focus()
        // await this.page.keyboard.type(code, {delay: 1000})
        // expect(await this.discountCodeInput.inputValue()).toBe(code)
        
        expect(await this.totalWithDiscountValue.isVisible()).toBe(false)
        expect(await this.discountAtivatedMessage.isVisible()).toBe(false)

        await this.submitDiscountButton.waitFor()
        await this.submitDiscountButton.click()

        await this.discountAtivatedMessage.waitFor()
        await this.totalWithDiscountValue.waitFor()
        const discontedValueText = await this.totalWithDiscountValue.innerText()
        const discontedValueOnlyStringNumber = discontedValueText.replace("$", "")
        const discontedValueNumber = parseInt(discontedValueOnlyStringNumber, 10)

        await this.totalValue.waitFor()
        const totalValueText = await this.totalValue.innerText()
        const totalValueOnlyStringNumber = totalValueText.replace("$", "")
        const totalValueNumber = parseInt(totalValueOnlyStringNumber, 10)

        expect(discontedValueNumber).toBeLessThan(totalValueNumber)
    }  

    fillPaymentDetails = async (paymentDetails) => {
        await this.cartOwner.waitFor()

        await this.cartOwner.fill(paymentDetails.owner)
        await this.cartNumber.fill(paymentDetails.number)
        await this.validUntil.fill(paymentDetails.validUntil)
        await this.cartCvc.fill(paymentDetails.cvc)
    }

    clickPayButton = async () => {
        await this.payButton.waitFor()
        await this.payButton.click()

        await this.page.waitForURL(/\/thank-you/, {timeout: 3000})
    }
}
