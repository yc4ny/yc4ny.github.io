// Renders index.html with headless Chromium and saves a full-page screenshot
// to .github/screenshot.png. Used by .github/workflows/screenshot.yml.
//
// Run locally (needs Node + a global Playwright install):
//   npm install -g playwright && playwright install chrome
//   NODE_PATH="$(npm root -g)" node .github/scripts/screenshot.cjs
const path = require("path");
const { chromium } = require("playwright");

const INDEX = path.resolve(__dirname, "../../index.html");
const OUT = path.resolve(__dirname, "../screenshot.png");

(async () => {
  // Google Chrome ships H.264, Playwright's Chromium does not; without it the
  // .mp4 thumbnails render as empty boxes.
  const browser = await chromium.launch({ channel: "chrome" });
  const page = await browser.newPage({
    viewport: { width: 1280, height: 800 },
    deviceScaleFactor: 1,
  });

  await page.goto("file://" + INDEX, { waitUntil: "load" });
  await page.evaluate(async () => {
    await document.fonts.ready;
    // Freeze videos on their first frame so the output is stable run to run.
    for (const v of document.querySelectorAll("video")) {
      v.pause();
      v.currentTime = 0;
    }
  });
  // Give web fonts, badges and video posters a moment to settle.
  await page.waitForTimeout(3000);

  await page.screenshot({ path: OUT, fullPage: true });
  await browser.close();
  console.log("Saved", OUT);
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
