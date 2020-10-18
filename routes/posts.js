const router = require('express').Router();
const verify = require('./verifyToken');
const User = require('../model/User');

router.get('/', verify, (req, res) => {
    User.findById(req.user.id, (err, user) => {
        console.log(user);
        res.send(user);
    });
});

module.exports = router;
