const express = require('express');
const router = express.Router();

const passport = require("passport");
const Profile = require("../../models/Profile");
const User = require("../../models/User");

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


//ROUTE - POST /api/profile/experience
//desc - add experience to profile
//@access - Private
router.post('/experience', passport.authenticate('jwt', { session: false }), (req, res) => {
    Profile.findOne({ user: req.user.id }).then((profile) => {
        const experience = {};
        experience.title = req.body.title;
        experience.company = req.body.company;
        experience.location = req.body.location;
        experience.from = req.body.from;
        experience.to = req.body.to;
        experience.current = req.body.current;
        experience.description = req.body.description;

        profile.experience.unshift(experience);

        profile.save().then((updatedProfile) => {
            return res.json(updatedProfile)
        })
            .catch(err => res.json(err))
    })
        .catch((err) => res.json(err))
})


//ROUTE - POST /api/profile/education
//desc - add education to profile
//@access - Private
router.post('/education', passport.authenticate('jwt', { session: false }), (req, res) => {
    Profile.findOne({ user: req.user.id }).then((profile) => {
        const education = {};
        education.school = req.body.school;
        education.degree = req.body.degree;
        education.fieldOfStudy = req.body.fieldOfStudy;
        education.from = req.body.from;
        education.to = req.body.to;
        education.current = req.body.current;
        education.description = req.body.description;

        profile.education.unshift(education);

        profile.save().then((updatedProfile) => {
            return res.json(updatedProfile)
        })
            .catch(err => res.json(err))
    })
        .catch((err) => res.json(err))
})

//ROUTE - POST /api/profile/experience/:exp_id
//desc - delete experience from profile
//@access - Private
router.post('/experience/:exp_id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {

        //get the index of the item that you want to remove
        const expToRemove = profile.experience.map(item => item.id).indexOf(req.params.exp_id);

        //remove the element
        profile.experience.splice(expToRemove, 1);

        profile.save()
            .then(profile => res.json(profile))
            .catch(err => res.json(err));
    })
})

//ROUTE - POST /api/profile/education/:edu_id
//desc - delete education from profile
//@access - Private
router.post('/education/:edu_id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {

        //get the index of the item that you want to remove
        const eduToRemove = profile.education.map(item => item.id).indexOf(req.params.edu_id);

        //remove the element
        profile.education.splice(eduToRemove, 1);

        profile.save()
            .then(profile => res.json(profile))
            .catch(err => res.json(err));
    })
        .catch(err => res.json(err))
})

//ROUTE - DELETE/api/profile
//desc - delete User and Profile
//@access - Private
router.delete('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id }).then(() => {
        User.findOneAndRemove({ id: req.user.id }).then(() => {
            return res.json({ message: "Success" });
        })
            .catch(err => res.json(err));
    })
        .catch(err => res.json(err));
})



module.exports = router;