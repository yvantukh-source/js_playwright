export class RegistedPage {
    constructor(page) {
        this.page = page
        this.emailInput = page.getByPlaceholder('e-mail')
        this.passwordInput = page.getByPlaceholder('password')
        this.sighUpButton = page.getByRole('button', { name: 'register' })
    
    }

    singUpAsNewUser = async (email, password) => {
        await this.emailInput.waitFor()
        await this.emailInput.fill(email)

        await this.passwordInput.waitFor()
        await this.passwordInput.fill(password)

        await this.sighUpButton.waitFor()
        await this.sighUpButton.click()

    }

}