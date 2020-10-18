const router = require('express').Router();
const verify = require('./verifyToken');
const User = require('../model/User');

router.get('/', verify, (req, res) => {
    User.findById(req.user.id, (err, user) => {
        res.send({
            name: user.name,
            email: user.email
        });
    });
});

module.exports = router;
