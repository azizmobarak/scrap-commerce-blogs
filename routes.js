const express = require('express');
const app = express();
const router = express.Router();



const Scrpafunction = require('./controllers/data');
const { Register, Exist, verifyregister } = require('./controllers/user/register');
const { verify, Login } = require('./controllers/user/login');
const test = require('./controllers/test');

router.route('/scrap').post(Scrpafunction);
router.route('/register').post(verifyregister, Exist, Register);
router.route('/login').post(verify, Login);
router.route('/test').post(test);



module.exports = router;