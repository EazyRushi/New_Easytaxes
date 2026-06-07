const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  await page.goto('http://localhost:5176/', { waitUntil: 'networkidle2' });

  // Trace ancestors of the first card and check their overflow property
  const ancestors = await page.evaluate(() => {
    const card = document.querySelector('section.relative.bg-gray-50.pt-24 div.lg\\:w-7\\/12 > div');
    if (!card) return 'Card not found';
    
    let el = card.parentElement;
    const path = [];
    
    while (el) {
      const computedStyle = window.getComputedStyle(el);
      path.push({
        tagName: el.tagName,
        className: el.className,
        id: el.id,
        overflow: computedStyle.overflow,
        overflowX: computedStyle.overflowX,
        overflowY: computedStyle.overflowY,
        display: computedStyle.display,
        position: computedStyle.position
      });
      el = el.parentElement;
    }
    return path;
  });

  console.log('Ancestors computed style:', JSON.stringify(ancestors, null, 2));
  await browser.close();
})();
