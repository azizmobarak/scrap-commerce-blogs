const express = require('express');
const app = express();
const router = express.Router();
const cors = require('cors');
const puppeteer = require('puppeteer')

app.use(cors());

const Scrpafunction = require('./controllers/data');
const { Register, Exist } = require('./controllers/user/register');
const { verify, Login } = require('./controllers/user/login');


router.route('/scrap').post(cors(), Scrpafunction);
router.route('/register').post(cors(), Exist, Register);
router.route('/login').post(cors(), verify, Login);


module.exports = router;