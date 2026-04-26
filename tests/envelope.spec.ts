import { test, expect } from "@playwright/test";

test.describe("Envelope animation", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("load");
    await page.waitForTimeout(500);
  });

  test("page loads with envelope visible", async ({ page }) => {
    await expect(page.locator("#env-back")).toBeVisible();
    await expect(page.locator("#env-front")).toBeVisible();
    await expect(page.locator("#letter")).toBeVisible();
  });

  test("text is hidden initially", async ({ page }) => {
    const opacity = await page
      .locator("#letter-text")
      .evaluate((el) => getComputedStyle(el).opacity);
    expect(opacity).toBe("0");
  });

  test("letter slides up during pull phase", async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, 350));
    await page.waitForTimeout(200);

    const transform = await page
      .locator("#letter")
      .evaluate((el) => getComputedStyle(el).transform);
    const match = transform.match(
      /matrix\([^,]+,[^,]+,[^,]+,[^,]+,[^,]+,\s*([^)]+)\)/
    );
    expect(match).toBeTruthy();
    expect(parseFloat(match![1])).toBeLessThan(0);
  });

  test("envelope slides down during pull phase", async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, 600));
    await page.waitForTimeout(200);

    const transform = await page
      .locator("#env-back")
      .evaluate((el) => getComputedStyle(el).transform);
    expect(transform).not.toBe("none");
  });

  test("text appears after envelope is gone", async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, 850));
    await page.waitForTimeout(200);

    const opacity = await page
      .locator("#letter-text")
      .evaluate((el) => parseFloat(getComputedStyle(el).opacity));
    expect(opacity).toBeGreaterThan(0.5);
  });

  test("content scrolls in final phase", async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, 1100));
    await page.waitForTimeout(200);

    const transform = await page
      .locator("#letter-content")
      .evaluate((el) => getComputedStyle(el).transform);
    const match = transform.match(
      /matrix\([^,]+,[^,]+,[^,]+,[^,]+,[^,]+,\s*([^)]+)\)/
    );
    expect(match).toBeTruthy();
    expect(parseFloat(match![1])).toBeLessThan(0);
  });

  test("letter is horizontally centered", async ({ page }) => {
    const letterBox = await page.locator("#letter").boundingBox();
    const viewport = page.viewportSize()!;
    expect(letterBox).toBeTruthy();
    const centerX = letterBox!.x + letterBox!.width / 2;
    expect(Math.abs(centerX - viewport.width / 2)).toBeLessThan(5);
  });

  test("embossed logo exists in letter spacer", async ({ page }) => {
    await expect(page.locator(".letter-emboss")).toBeVisible();
  });

  /* ── Visual snapshots ── */

  test("snapshot: initial state (just the envelope)", async ({ page }) => {
    await page.screenshot({
      path: "tests/screenshots/01-initial.png",
      fullPage: false,
    });
  });

  test("snapshot: letter sliding out", async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, 350));
    await page.waitForTimeout(300);
    await page.screenshot({
      path: "tests/screenshots/02-letter-sliding.png",
      fullPage: false,
    });
  });

  test("snapshot: envelope disappearing", async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, 600));
    await page.waitForTimeout(300);
    await page.screenshot({
      path: "tests/screenshots/03-envelope-disappearing.png",
      fullPage: false,
    });
  });

  test("snapshot: text appearing", async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, 850));
    await page.waitForTimeout(300);
    await page.screenshot({
      path: "tests/screenshots/04-text-appearing.png",
      fullPage: false,
    });
  });

  test("snapshot: content scrolling", async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, 1200));
    await page.waitForTimeout(300);
    await page.screenshot({
      path: "tests/screenshots/05-content-scrolling.png",
      fullPage: false,
    });
  });

  test("snapshot: mobile initial", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/");
    await page.waitForLoadState("load");
    await page.waitForTimeout(500);
    await page.screenshot({
      path: "tests/screenshots/06-mobile-initial.png",
      fullPage: false,
    });
  });

  test("snapshot: mobile text visible", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/");
    await page.waitForLoadState("load");
    await page.waitForTimeout(500);
    await page.evaluate(() => window.scrollTo(0, 900));
    await page.waitForTimeout(300);
    await page.screenshot({
      path: "tests/screenshots/07-mobile-text.png",
      fullPage: false,
    });
  });
});
