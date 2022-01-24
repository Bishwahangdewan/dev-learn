const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const jwt = require('jsonwebtoken');
const key = require('../../config/keys').secretorpublic;
const passport = require("passport");

//import user model
const User = require('../../models/User');
const { append } = require('express/lib/response');

//ROUTE - GET /api/users/test
//desc - test api
//@access - Public
router.get('/test', (req, res) => res.json({ status: "Success" }))

//ROUTE - POST /api/users/register
//desc - register user
//access = Public
router.post('/register', (req, res) => {

    User.findOne({
        email: req.body.email
    })
        .then((user) => {

            if (user) {
                //user exists
                return res.status(400).json({ email: "Email already exists" })
            } else {

                const avatar = gravatar.url(req.body.email, {
                    s: '200', //size
                    r: "pg",  //rating
                    d: "mm"   //default
                })

                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    avatar,
                    password: req.body.password
                })

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) { console.log(err) };

                        newUser.password = hash;

                        newUser.save()
                            .then((user) => res.json(user))
                            .catch(err => console.log(err))
                    })
                })
            }

        })
})


//ROUTE - post /api/users/signin
//desc- signin user
//sccess - public
router.post('/signin', (req, res) => {
    const email = req.body.email.toString();
    const password = req.body.password;

    User.findOne({ email: email })
        .then((user) => {
            if (!user) {
                return res.status(400).json({ message: "Email is incorrect" })
            } else {

                bcrypt.compare(password, user.password).then((isMatch) => {
                    if (isMatch) {

                        const payload = {
                            id: user.id,
                            name: user.name,
                            avatar: user.avatar
                        }

                        jwt.sign(payload, key, { expiresIn: 36000 }, (err, token) => {
                            res.json({
                                success: true,
                                token: "Bearer " + token
                            })
                        })

                    } else {
                        return res.status(400).json({ message: "Password is Incorrect" });
                    }
                })
                    .catch(err => console.log(err))
            }
        })
        .catch(err => console.log(err))
})

//ROUTE - GET /api/users/current
//desc -  get current user
//access = Private
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
    return res.json({
        name: req.user.name,
        email: req.user.email,
        avatar: req.user.avatar
    })
})

module.exports = router;