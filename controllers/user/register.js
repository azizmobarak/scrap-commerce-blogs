const User = require('../../models/user');


//add user middlawre
const Register = (req, res) => {
    try {
        if (req.body !== null || req.body !== "undefined" || req.body !== {}) {
            const newuser = new User(req.body);
            newuser.save((err, doc) => {
                if (err) res.status(403).json({ success: "no" });
                console.log("added : " + doc);
            });
            res.status(200).json({ success: "ok" });

        } else {
            res.status(403).json({ success: "The content should not be empty!" });
        }

    } catch (e) {
        res.status(403).json({ success: "something happens try later!" })
    }
}

//verify email middlawre
function Exist(req, res, next) {
    User.find({ "email": req.body.email }, (err, doc) => {
        if (err) res.status(403).json({ success: "error detected ,please try later!" })
        if (doc.length !== 0) {
            console.log('inside')
            if (doc[0].email === req.body.email) {
                res.status(403).send({ success: "a user with this email already exist" });
            }
        } else {
            next();
        }

    });
}


module.exports = { Register, Exist }