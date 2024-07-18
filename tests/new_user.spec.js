import { test } from '@playwright/test'
import { v4 as uuidv4 } from "uuid"
import { ProductsPage } from '../page-objects/ProductsPage.js'
import { Navigation } from '../page-objects/Navigation.js'
import { Checkout} from '../page-objects/Checkout.js'
import { Register } from '../page-objects/Register.js'
import { RegistedPage } from '../page-objects/RegisterPage.js'
import { DeliveryDetails } from '../page-objects/DeliveryDetals.js'
import { deliveryDetails as dd } from '../data/deliveryDetails.js'
import { PaymentPage } from '../page-objects/Payment.js'
import { paymentDetails } from '../data/paymantDetails.js'

test('New user full end-to-end test jorney', async ({ page }) => {
    
    const productsPage = new ProductsPage(page)
    await productsPage.visit()

    await productsPage.sortByCheapest()

    await productsPage.addProductToBasket(0)
    await productsPage.addProductToBasket(1)
    await productsPage.addProductToBasket(2)

    const navigation = new Navigation(page)

    await navigation.goToCheckout()

    const checkout = new Checkout(page)
    await checkout.removeCheapestProduct()

    await checkout.continueToCheckout()

    const register = new Register(page)
    await register.goToRegisted()

    const registerPage = new RegistedPage(page)
    const email = uuidv4() + '@gmail.com'
    const password = uuidv4()
    await registerPage.singUpAsNewUser(email, password)

    const deliveryDetails = new DeliveryDetails(page)
    await deliveryDetails.fillDetails(dd)
    await deliveryDetails.checkSavedDetails()
    await deliveryDetails.continueToPayment()

    const paymentPage = new PaymentPage(page)
    await paymentPage.activatedDiscount()
    await paymentPage.fillPaymentDetails(paymentDetails)
    await paymentPage.clickPayButton()
})