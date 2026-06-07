const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  
  await page.goto('https://1800accountant.com/', { waitUntil: 'networkidle2' });
  
  // Wait for 2 seconds to allow animations to settle
  await new Promise(r => setTimeout(r, 2000));
  
  // Take screenshot of the hero section
  await page.screenshot({ path: '1800accountant_hero.png', fullPage: false });
  
  // Take a full page screenshot
  await page.screenshot({ path: '1800accountant_full.png', fullPage: true });

  await browser.close();
})();
