const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  await page.goto('http://localhost:5176/', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1000));

  // Scroll to the Architectural Method section
  // Let's find the section coordinates dynamically
  const sectionSelector = 'section.relative.bg-gray-50.pt-24';
  const section = await page.$(sectionSelector);
  
  if (section) {
    const box = await section.boundingBox();
    console.log('Section position:', box);

    // Scroll to the start of the section
    await page.evaluate((y) => window.scrollTo(0, y), box.y);
    await new Promise(r => setTimeout(r, 500));
    await page.screenshot({ path: 'C:/Users/Admin/.gemini/antigravity/brain/82895146-6119-4917-91c2-78c0419e4a1d/scratch/stack_start.png' });

    // Scroll down inside the section to trigger stacking of first few cards
    await page.evaluate((y) => window.scrollTo(0, y + 400), box.y);
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({ path: 'C:/Users/Admin/.gemini/antigravity/brain/82895146-6119-4917-91c2-78c0419e4a1d/scratch/stack_middle.png' });

    // Scroll further down to stack almost all cards
    await page.evaluate((y) => window.scrollTo(0, y + 1000), box.y);
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({ path: 'C:/Users/Admin/.gemini/antigravity/brain/82895146-6119-4917-91c2-78c0419e4a1d/scratch/stack_almost_all.png' });
  } else {
    console.log("Could not find section");
  }

  await browser.close();
  console.log("Done taking stacking screenshots!");
})();
