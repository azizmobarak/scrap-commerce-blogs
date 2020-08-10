const express = require('express');
const app = express();
const router = express.Router();
const cors = require('cors');
const puppeteer = require('puppeteer')

const Scrpafunction = require('./controllers/data');


router.route('/scrap').post(Scrpafunction);


module.exports = router;