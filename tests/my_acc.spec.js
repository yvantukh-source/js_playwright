import { test } from '@playwright/test'
import { MyAccountPage } from '../page-objects/MyAccountPage.js'
import { getLoginToken } from './../api-calls/getLoginToken.js'
import { adminDetaild } from '../data/userDetails.js'

test("My acc using coockie injection", async ({page}) => {
    const loginToken = await getLoginToken(adminDetaild.username, adminDetaild.password)

    await page.route("**/api/user/**", async (route, request) => {
        await route.fulfill({
            status: 500,
            contentType: "application/json",
            body: JSON.stringify({messase: "Playwright error from mocking"})
        })
    })

    const my_acc = new MyAccountPage(page)
    await my_acc.visit()
    await page.evaluate(([loginTokenInsideBrowserCode]) => {
        document.cookie = "token=" + loginTokenInsideBrowserCode
    }, [loginToken])

    await my_acc.visit()
    await my_acc.waitForPageHeading()
})