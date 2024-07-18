import { expect } from "@playwright/test"

export class DeliveryDetails {
    constructor(page) {
        this.page = page
        this.firstNameInput = page.locator('[data-qa="delivery-first-name"]')
        this.lastNameInput = page.locator('[data-qa="delivery-last-name"]')
        this.streetInput = page.locator('[data-qa="delivery-address-street"]')
        this.postCodeInput = page.locator('[data-qa="delivery-postcode"]')
        this.cityInput = page.locator('[data-qa="delivery-city"]')
        this.countryDrop = page.locator('[data-qa="country-dropdown"]')

        this.savedAddressContainer = page.locator('[data-qa="saved-address-container"]')
        this.savedAddressFirstName = page.locator('[data-qa="saved-address-firstName"]')
        this.savedAddressLastName = page.locator('[data-qa="saved-address-lastName"]')
        this.savedAddressStreet = page.locator('[data-qa="saved-address-street"]')
        this.savedAddressPostCode = page.locator('[data-qa="saved-address-postcode"]')
        this.savedAddressCity = page.locator('[data-qa="saved-address-city"]')
        this.savedAddressCountry = page.locator('[data-qa="saved-address-country"]')

        this.saveForNextTimeButton = page.getByRole('button', { name: 'Save address for next time' })
        this.continueToPaymentButton = page.getByRole('button', { name: 'Continue to payment' })
    }

    fillDetails = async (deliveryDetails) => {
        await this.firstNameInput.waitFor()

        await this.firstNameInput.fill(deliveryDetails.firstName)
        await this.lastNameInput.fill(deliveryDetails.lastName)
        await this.streetInput.fill(deliveryDetails.street)
        await this.postCodeInput.fill(deliveryDetails.postcode)
        await this.cityInput.fill(deliveryDetails.city)
        await this.countryDrop.selectOption(deliveryDetails.county)
    }

    saveDetails = async () => {
        await this.saveForNextTimeButton.waitFor()
        await this.saveForNextTimeButton.click()
    }

    checkSavedDetails = async () => { 
        const addressCountBeforeSaving = await this.savedAddressContainer.count()
        this.saveDetails()
        await expect(this.saveForNextTimeButton).toHaveCount(addressCountBeforeSaving + 1)
    
        await this.savedAddressFirstName.first().waitFor()

        expect(await this.savedAddressFirstName.first().innerText()).toBe(await this.firstNameInput.inputValue())
        expect(await this.savedAddressLastName.first().innerText()).toBe(await this.lastNameInput.inputValue())
        expect(await this.savedAddressStreet.first().innerText()).toBe(await this.streetInput.inputValue())
        expect(await this.savedAddressCity.first().innerText()).toBe(await this.cityInput.inputValue())
        expect(await this.savedAddressPostCode.first().innerText()).toBe(await this.postCodeInput.inputValue())
        expect(await this.savedAddressCountry.first().innerText()).toBe(await this.countryDrop.inputValue())
    }

    continueToPayment = async () => {
        await this.continueToPaymentButton.waitFor()
        await this.continueToPaymentButton.click()
        await this.page.waitForURL(/\/payment/, {timeout: 3000})
    }

}