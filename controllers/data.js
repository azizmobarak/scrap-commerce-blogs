const puppeteer = require('puppeteer');
const data = require('../models/insertdata');

const Scrapfunction = (req, res) => {
    console.log('start')
    try {
        (async() => {
            console.log('1');
            const browser = await puppeteer.launch({
                headless: false,
                //args: ['--proxy-server=161.129.155.43:3128']
                timeout: 50000
            });
            console.log('2');
            await browser.userAgent("Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.0 Safari/537.36")
            const page = await browser.newPage();
            await page.goto('https://www.shopify.com/blog', { waitUntil: "load", timeout: 50000 });
            console.log('3')
            const result = await page.evaluate(() => {
                var tab = [];
                for (var i = 0; i < 50; i++) {
                    try {
                        tab.push({
                            image: document.querySelectorAll('img')[i].srcset,
                            title: document.querySelectorAll('h2>a')[i].textContent,
                            url: document.querySelectorAll('h2>a')[i].href,
                            name: "shoppify"
                        });
                    } catch (e) {
                        console.log(i + "/" + e);
                    }

                }
                return tab;
            });

            await browser.close();

            var articledata = new data({ data: result });
            articledata.save((err, doc) => {
                if (err) console.log(err);
                console.log(doc)
            });
            res.send(result)
        })();
    } catch (e) {
        res.send(e);
    }
}

module.exports = Scrapfunction;