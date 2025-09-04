QA Technical Test — Playwright E2E

Panduan singkat untuk men-setup proyek, menginstal Playwright via npm, dan menjalankan test secara lokal maupun di CI.

## Prasyarat

- Node.js 18+ dan npm
- Git
- Akses Internet untuk mengunduh browser Playwright

## Clone & Instalasi

1. Clone repo
    - SSH: `git clone git@github.com:Albarokah9/QA_Technical_Test.git`
    - HTTPS: `git clone https://github.com/Albarokah9/QA_Technical_Test.git`
2. Masuk ke folder proyek: `cd QA_Technical_Test`
3. Install dependencies:
    - Disarankan: `npm ci` (reproducible, cepat di CI)
    - Alternatif: `npm install`

## Instal Playwright (browser & dependencies)

- Umum: `npx playwright install`
- Linux (butuh system deps): `npx playwright install --with-deps`

Catatan: Di Windows/macOS cukup `npx playwright install`.

## Menjalankan Test

- Jalankan semua test: `npx playwright test`
- Mode GUI (Playwright Test UI): `npx playwright test --ui`
- Headed (lihat browser terbuka): `npx playwright test --headed`
- Pilih browser tertentu (sesuai projects di config):
    - Chromium: `npx playwright test --project=chromium`
    - Firefox: `npx playwright test --project=firefox`
    - WebKit: `npx playwright test --project=webkit`
- Jalankan file test tertentu: `npx playwright test tests/gercep.spec.js`
- Filter berdasarkan nama test: `npx playwright test -g "Step 3"`

## Report & Trace

- Buka report lokal setelah test: `npx playwright show-report`
- Melihat trace dari hasil test (jika trace diaktifkan):
    - `npx playwright show-trace test-results/<folder-run>/trace.zip`

## Konfigurasi CI

- Repo ini sudah menyertakan workflow GitHub Actions di `/.github/workflows/playwright.yml`.
- Setiap push/pull request akan menjalankan test dan mengunggah artifact report `playwright-report.zip`.
- Anda dapat mengunduh artifact dari halaman Actions untuk melihat report/trace.

## Tips & Troubleshooting

- Timeout/elemen lambat: tambah timeout lokal `npx playwright test --timeout=30000` atau sesuaikan di assertion (`expect(...).toBeVisible({ timeout: 10000 })`).
- Proxy/jaringan kantor: pastikan npm dan unduhan browser tidak diblokir.
- Gagal install di Linux: gunakan `npx playwright install --with-deps` (membutuhkan sudo di mesin lokal, tidak di CI GitHub).
- Gagal jalan di WSL: pastikan `DISPLAY` diset (untuk headed) atau jalankan headless (default) tanpa `--headed`.

## Skrip npm (opsional)

Jika ingin, Anda dapat menambahkan skrip ini di `package.json` agar perintah lebih singkat:

```json
{
  "scripts": {
        "ui": "playwright test --ui",
        "test": "playwright test",
        "test:headed": "playwright test --headed",
        "report": "playwright show-report",
        "debug": "playwright test --headed --debug",
        "format": "prettier --write ."
}
```

Setelah itu, jalankan: `npm run test:e2e`, `npm run test:ui`, atau `npm run report`.

---
