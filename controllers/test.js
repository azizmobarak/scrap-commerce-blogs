const test = (req, res) => {
    console.log("call me")
    console.log(req.cookies.token)
    res.send({ success: req.cookies.token });
}


module.exports = test;