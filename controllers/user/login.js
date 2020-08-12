const Joi = require('@hapi/joi');
const User = require('../../models/user');
const jwt = require('jsonwebtoken');


//verification middlware
const verify = (req, res, next) => {
    console.log("called")
    const schema = Joi.object({
        email: Joi.string().required().max(60).min(6),
        password: Joi.string().required().max(100).min(4)
    });
    if (typeof(schema.validate(req.body).error) !== "undefined") {
        res.send(schema.validate(req.body).error.details[0].message);
    } else {
        next();
    }
}

//authorization middlware
const Login = (req, res) => {
    User.find({ email: req.body.email }, 'password', (err, doc) => {
        if (err) console.log(err);
        if (doc.length !== 0) {
            if (req.body.password === doc[0].password) {
                jwt.sign(req.body.email, "login", (err, token) => {
                    if (err) console.log(err);
                    res.status(200).json({ success: "ok", token: token });
                });
            } else {
                res.status(403).json({ success: "no", message: "Email or password not correct" })
            }
        } else {
            res.status(403).json({ success: "no", message: "Email or password not correct" })
        }
    });
}


module.exports = { verify, Login };