const User = require('../../models/user');
const joi = require('@hapi/joi');

//add user middlawre
const Register = (req, res) => {
    console.log('here')
    try {
        if (req.body !== null || req.body !== "undefined" || req.body !== {}) {
            const newuser = new User(req.body);
            newuser.save((err, doc) => {
                if (err) res.status(403).json({ success: "no" });
                else {
                    console.log("added : " + doc);
                    res.status(200).json({ success: "Congrates,your account created susscefuly , go to login page and sign in" });
                }
            });
        } else {
            res.status(403).json({ success: "The content should not be empty!" });
        }

    } catch (e) {
        res.status(403).json({ success: "something happens try later!" })
    }
}

//verify email middlawre
function Exist(req, res, next) {
    console.log(req.body)
    User.find({ "email": req.body.email }, (err, doc) => {
        if (err) res.status(403).json({ success: "error detected ,please try later!" })
        else {
            if (doc.length !== 0) {
                console.log(doc.length)
                console.log('inside')
                if (doc[0].email === req.body.email) {
                    console.log(doc[0].email)
                    console.log(req.body.email)
                    res.status(403).send({ success: "a user with this email already exist" });
                }
            } else {
                next();
            }
        }
    });
}

const verifyregister = (req, res, next) => {
    schema = joi.object({
        email: joi.string().min(6).max(100).regex(/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/, "example@example.com").required(),
        name: joi.string().min(4).required(),
        password: joi.string().min(6).max(50).required(),
        date: joi.required()
    });

    if (typeof(schema.validate(req.body).error) !== "undefined") {
        res.send({ success: schema.validate(req.body).error.details[0].message });
    } else {
        next();
    }

}

module.exports = { Register, Exist, verifyregister }