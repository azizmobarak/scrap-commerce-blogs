const puppeteer = require('puppeteer');
const data = require('../models/data');

const Scrapfunction = (req, res) => {
    console.log('start')
    try {
        (async() => {
            console.log('1');

            //creating browser and page
            const browser = await puppeteer.launch({
                headless: true,
                //args: ['--proxy-server=161.129.155.43:3128']
                timeout: 50000
            });
            console.log('2');
            await browser.userAgent("Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.0 Safari/537.36")
            const page = await browser.newPage();
            await page.setViewport({ width: 1920, height: 1080 });


            //block some features
            // for javascript block : req.resourceType() === 'script' => not used here
            await page.setRequestInterception(true);
            page.on('request', (req) => {
                if (req.resourceType() === 'script' || req.resourceType() === 'image' || req.resourceType() === 'stylesheet' || req.resourceType() === 'font') {
                    req.abort();
                } else {
                    req.continue();
                }
            });
            //page.waitFor(100000);
            //start open page
            await page.goto('https://www.shopify.com/blog', { waitFor: 100000 });
            console.log('3')

            const result = await page.evaluate(() => {
                var tab = [];

                try {
                    for (var i = 0; i < 50; i++) {
                        tab.push({
                            image: document.querySelectorAll('article>a>span>span>noscript')[i].textContent.slice(27, document.querySelectorAll('article>a>span>span>noscript')[i].textContent.indexOf(";width")),
                            title: document.querySelectorAll('h2>a')[i].textContent,
                            url: document.querySelectorAll('h2>a')[i].href,
                            name: "shoppify"
                        });
                    }
                } catch (e) {
                    console.log(e);
                }


                return tab;
            });

            await browser.close();

            /*
            //delete existence data
            var articledata = new data();
            articledata.deleteOne((err, doc) => {
                if (err) console.log(err);
                console.log(doc);
            })

            //add new data
            articledata = new data({ data: result });
            articledata.save((err, doc) => {
                if (err) console.log(err);
                console.log(doc)
            });*/
            res.send(result)
        })();
    } catch (e) {
        res.send(e);
    }
}

module.exports = Scrapfunction;