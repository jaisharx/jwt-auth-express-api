const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model/User');
const { loginValidation, registerValidation } = require('../validation');

// register route
router.post('/register', async (req, res) => {
    const { error } = registerValidation(req.body); // validation
    if (error) return res.status(404).send(error.details[0].message);

    // check for unique email
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send('Email Already Exists.');

    // hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // new user
    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
    });

    // saving user
    try {
        const savedUser = await newUser.save();
        res.send({
            user: newUser._id,
        });
    } catch (err) {
        res.status(400).send(err);
    }
});

router.post('/login', async (req, res) => {
    const { error } = loginValidation(req.body); // validation
    if (error) return res.status(404).send(error.details[0].message);

    // check for unique email
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Invalid email.');

    // check for correct pass
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) res.status(400).send('Invalid password.');

    const dataToSend = {
        id: user._id,
        name: user.name,
        email: user.email,
    };

    // using jwt for later sessions
    const token = jwt.sign(dataToSend, process.env.JWT_SECRET);

    // attaching jwt to the header
    res.header('auth-token', token);

    res.send({
        ...dataToSend,
        jwt_token: token,
    });
});


module.exports = router;