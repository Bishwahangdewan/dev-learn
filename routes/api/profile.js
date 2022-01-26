const express = require('express');
const router = express.Router();

const passport = require("passport");
const Profile = require("../../models/Profile");

//ROUTE - GET /api/profile/test
//desc - test api
//@access - Public
router.get('/test', (req, res) => res.json({ status: "Success" }))

//ROUTE - GET /api/profile/
//desc - get users profile
//@access - Private
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    Profile.findOne({
        user: req.user.id
    })
        .then((user) => {
            if (user) {
                return res.json(user)
            } else {
                return res.status(400).json({ message: "No user found" })
            }
        })
        .catch((err) => console.log(err))
})

//ROUTE - POST /api/profile/
//desc - create or update users profile
//@access - Private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const profileFields = {}

    profileFields.user = req.user.id;
    profileFields.handle = req.body.handle;
    profileFields.company = req.body.company;
    profileFields.location = req.body.location;
    profileFields.website = req.body.website;
    profileFields.status = req.body.status;
    profileFields.githubusername = req.body.githubusername;
    profileFields.bio = req.body.bio;

    profileFields.skills = req.body.skills.split(',');

    const socials = {}
    socials.youtube = req.body.youtube;
    socials.instagram = req.body.instagram;
    socials.linkedln = req.body.linkedln;
    socials.twitter = req.body.twitter;

    profileFields.social = socials;

    //check if profile exists
    Profile.findOne({ user: req.user.id }).then((profile) => {

        if (profile) {
            //profile exists..... update
            Profile.findOneAndUpdate({ user: req.user.id }, { $key: profileFields }, { new: true }).then((newProfile) => {
                return res.json(newProfile);
            })
                .catch(err => console.log(err))
        } else {
            //profile does not exist ..... create

            //check if handle exists
            Profile.findOne({ handle: profileFields.handle }).then((profile) => {
                if (profile) {
                    //handle exists
                    return res.status(400).json({ msg: "The profile with handle already exists." });
                } else {
                    //handle does not exist
                    new Profile(profileFields).save().then((profile) => {
                        return res.json(profile);
                    })
                        .catch((err) => console.log(err));
                }
            })
        }

    })

})


//ROUTE - GET /api/profile/handle/:handle
//desc - get profile by handle
//@access - Public
router.get('/handle/:handle', (req, res) => {
    Profile.findOne({ handle: req.params.handle }).populate('user', ['name', 'avatar']).then((profile) => {
        if (!profile) {
            return res.status(400).json({ message: "No profile found" })
        } else {
            return res.json(profile)
        }
    })
        .catch(err => console.log(err))
})

//ROUTE - GET /api/profile/user/:user_id
//desc - get profile by user id
//@access - Public
router.get('/user/:user_id', (req, res) => {
    Profile.findOne({ id: req.params.user_id }).populate('user', ['name', 'avatar']).then((profile) => {
        if (!profile) {
            return res.status(400).json({ message: "No profile found" })
        } else {
            return res.json(profile)
        }
    })
        .catch(err => console.log(err))
})

//ROUTE - GET /api/profile/all
//desc - get all profiles
//@access - Public
router.get('/all', (req, res) => {
    Profile.find().populate('user', ['name', 'avatar']).then((profiles) => {
        if (!profiles) {
            return res.status(400).json({ message: "No Profiles" })
        } else {
            return res.json(profiles)
        }
    })
        .catch(err => res.json(err))
})


module.exports = router;