const express = require('express');
const app = express();
const router = express.Router();
const cors = require('cors');
const puppeteer = require('puppeteer')

app.use(cors());

const Scrpafunction = require('./controllers/data');


router.route('/scrap').post(cors(), Scrpafunction);


module.exports = router;