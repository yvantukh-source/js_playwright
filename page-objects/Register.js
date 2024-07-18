import { expect } from "@playwright/test"
import { Navigation } from "./Navigation.js"

export class Register {
    constructor(page) {
        this.page = page
        this.movetoSighUpButton = this.page.locator('[data-qa="go-to-signup-button"]')
        this.loginField
    }

    goToRegisted = async () => {
        await this.movetoSighUpButton.waitFor()
        await this.movetoSighUpButton.click()

        this.page.waitForURL(/\/signup/, {timeout: 3000})
    }

}