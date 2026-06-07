const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  await page.goto('http://localhost:5176/', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1000));

  const sectionSelector = 'section.relative.bg-gray-50.pt-24';
  const section = await page.$(sectionSelector);
  
  if (section) {
    const box = await section.boundingBox();
    console.log('Section position:', box);

    // Scroll to section.y + 1000
    await page.evaluate((y) => window.scrollTo(0, y + 1000), box.y);
    await new Promise(r => setTimeout(r, 1000));

    // Get style and position of all cards
    const cardsInfo = await page.evaluate(() => {
      const cards = document.querySelectorAll('section.relative.bg-gray-50.pt-24 div.lg\\:w-7\\/12 > div');
      return Array.from(cards).map((c, i) => {
        const rect = c.getBoundingClientRect();
        const computedStyle = window.getComputedStyle(c);
        return {
          index: i,
          text: c.querySelector('h3')?.innerText,
          rect: {
            top: rect.top,
            bottom: rect.bottom,
            left: rect.left,
            right: rect.right,
            width: rect.width,
            height: rect.height
          },
          style: {
            position: computedStyle.position,
            top: computedStyle.top,
            opacity: computedStyle.opacity,
            transform: computedStyle.transform,
            zIndex: computedStyle.zIndex,
            display: computedStyle.display,
            visibility: computedStyle.visibility
          }
        };
      });
    });

    console.log('Cards Info:', JSON.stringify(cardsInfo, null, 2));
  } else {
    console.log("Could not find section");
  }

  await browser.close();
})();
