const express = require('express');
const puppeteer = require('puppeteer');

const app = express();

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/healthz', (req, res) => {
    res.status(200).send('Healthy!');
});

app.get('/screenshot', async (req, res) => {
    const url = req.query.url;
    if (!url) {
        return res.status(400).send('Missing URL parameter');
    }

    const browser = await puppeteer.launch({
        headless: "new'",
        executablePath: '/usr/bin/google-chrome',
//        executablePath: '"C:/Program Files/Google/Chrome/Application/chrome.exe"',
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();
    await page.setViewport({
        width: 1200,
        //height: 600, //Twitter
        height: 630, //Facebook
    });
    await page.goto(url, { waitUntil: 'load' });
    
    const elementHandle = await page.$('#map');
    const boundingBox = await elementHandle.boundingBox();

    const screenshot = await page.screenshot({
        clip: {
            x: 0,
            y: boundingBox.y + boundingBox.height,
            width: page.viewport().width,
            height: page.viewport().height,
        }
    });
    await browser.close();

    res.set('Content-Type', 'image/png');
    res.send(screenshot);
});

app.listen(3000, () => {
    console.log('Server listening on port 3000');
}); express 