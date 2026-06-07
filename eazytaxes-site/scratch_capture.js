const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  // 1. Capture Home Page Hero
  await page.goto('http://localhost:5176/', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: 'C:/Users/Admin/.gemini/antigravity/brain/82895146-6119-4917-91c2-78c0419e4a1d/scratch/home_hero.png' });

  // Scroll down page slowly to trigger scroll animations
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let totalHeight = 0;
      const distance = 100;
      const timer = setInterval(() => {
        const scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;

        if (totalHeight >= scrollHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 50);
    });
  });

  // Wait a bit
  await new Promise(r => setTimeout(r, 2000));

  // Take screenshot of fully scrolled page to check counters and final states
  await page.screenshot({ path: 'C:/Users/Admin/.gemini/antigravity/brain/82895146-6119-4917-91c2-78c0419e4a1d/scratch/home_scrolled.png', fullPage: true });

  // 2. Capture Calculators Page
  await page.goto('http://localhost:5176/calculators', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: 'C:/Users/Admin/.gemini/antigravity/brain/82895146-6119-4917-91c2-78c0419e4a1d/scratch/calculators.png', fullPage: true });

  await browser.close();
  console.log("Done taking screenshots!");
})();
