import { test, expect, chromium } from '@playwright/test';

test.describe.serial('Gercep E2E (state berlanjut antar test)', () => {
    /** @type {import('@playwright/test').Browser} */
    let browser;
    /** @type {import('@playwright/test').BrowserContext} */
    let context;
    /** @type {import('@playwright/test').Page} */
    let page;

    // let url1 = '';
    // let url2 = '';

    test.beforeAll(async () => {
        browser = await chromium.launch(); // pakai config headless dari Playwright config
        context = await browser.newContext(); // 1 context untuk seluruh suite
        page = await context.newPage(); // 1 page yang dipakai bersama
    });

    test.afterAll(async () => {
        await context?.close();
        await browser?.close();
    });

    test('Step 1 — Open Gercep Page & Verify URL and Title', async () => {
        await page.goto('https://vcgamers.com/gercep', {
            waitUntil: 'domcontentloaded',
        });

        // URL & title yang stabil
        await expect(page).toHaveURL(/\/gercep\/?$/);
        await expect(page).toHaveTitle(/Gercep/i);

        // (opsional) pastikan H1 halaman Gercep ada
        await expect(
            page.getByRole('heading', { level: 1, name: /gercep/i })
        ).toBeVisible();
    });

    test('Step 2 — Search "mobile legends" & verify results', async () => {
        // Target langsung ke elemen <input> dengan placeholder ini
        const search = page.getByPlaceholder(/Cari/i); // atau: page.locator('input[placeholder="Cari Nama Brand di Gercep..."]')

        await page.waitForTimeout(2000);

        await expect(search).toBeVisible();
        await expect(search).toBeEditable();

        await search.click(); // pastikan fokus ke input
        await search.fill(''); // ketik (trigger event ketikan)
        await search.fill('mobile legends'); // ketik (trigger event ketikan)

        await page.waitForTimeout(500);

        // Verifikasi minimal satu hasil muncul (contoh: link Mobile Legends)
        const mlResult = page.getByRole('link', { name: /Mobile Legends/i }).first();
        await expect(mlResult).toBeVisible();

        // url1 = page.url();
        // url2 = page.url();
        // Jeda 1 detik sebelum Step 3 (sesuai permintaan)
    });

    test('Step 3 — Click first item & verify brand detail opens', async () => {
        // Lanjut dari Step 2: daftar hasil sudah tampil
        const firstResult = page
            .getByRole('link', { name: /Mobile Legends/i })
            .first();
        await firstResult.click();

        await page.waitForTimeout(2000);

        // url2 = page.url();
        // await expect(url1).not.toEqual(url2);

        // Verifikasi: URL berubah ke detail brand ATAU judul/heading brand terlihat
        // await expect(page).toHaveURL(/\/gercep\/mobile-legends\/top-up-game/i);
        await expect(page).toHaveTitle(/ML/i);

        // (fallback yang lebih longgar jika URL bisa berubah-ubah)
        // await expect(page.getByRole('heading', { name: /mobile legends/i })).toBeVisible();
    });
});
