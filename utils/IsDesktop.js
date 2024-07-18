export const isDesktop = (page) => {
    const size = page.viewportSize()
    return size.width >= 600
}   