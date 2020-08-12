const express = require('express');
const app = express();
const router = express.Router();
const cors = require('cors');
const puppeteer = require('puppeteer')

app.use(cors());

const Scrpafunction = require('./controllers/data');
const { Register, Exist } = require('./controllers/user/register');


router.route('/scrap').post(cors(), Scrpafunction);
router.route('/register').post(cors(), Exist, Register);


module.exports = router;