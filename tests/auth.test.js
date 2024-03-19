import { test, expect, chromium } from '@playwright/test';

test('has title', async () => {
    const annotations = [
        { type: "TestCaseId", description: "TC1" },
        { type: "TestRunId", description: "TR1" },
    ];
    test.info().annotations.push(...annotations);

    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('https://playwright.dev/');

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async () => {
    const annotations = [
        { type: "TestCaseId", description: "TC2" },
        { type: "TestRunId", description: "TR1" },
    ];
    test.info().annotations.push(...annotations);

    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('https://playwright.dev/');

    // Click the get started link.
    await page.getByRole('link', { name: 'Get started' }).click();

    // Expects page to have a heading with the name of Installation.
    await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});