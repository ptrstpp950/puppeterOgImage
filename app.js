const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({
        headless: "new'",
        executablePath: '/usr/bin/google-chrome',
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();

    await page.setViewport({
        width: 1200,
        height: 600,
        //height: 630, facebook
    });
    await page.goto('https://ptrstpp950.github.io/wybieramTakMapa/index.html?v1&okreg=Cz%C4%99stochowa&ko=0');

    await page.screenshot({
        path: 'src/example.png',
        clip: {
            x: 0,
            y: 0,
            width: page.viewport().width,
            height: page.viewport().height,
        },
    });

    await browser.close();
})();