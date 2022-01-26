const express = require('express');
const router = express.Router();
const passport = require("passport");
const Post = require("../../models/Posts");

//ROUTE - GET /api/posts/test
//desc - test api
//@access - Public
router.get('/test', (req, res) => res.json({ status: "Success" }))

//ROUTE - POST /api/posts
//desc - test api
//@access - Public
router.post("/", passport.authenticate("jwt", { session: false }), (req, res) => {
    const postDetails = {
        title: req.body.title,
        description: req.bosy.description,
        user: req.user.id,
        name: req.user.name,
        avatar: req.user.avatar
    }

    const post = new Post(postDetails);

    post.save()
        .then((newPost) => {
            return res.json(newPost);
        })
        .catch(err => res.json(err));

})

//ROUTE - GET /api/posts
//desc - get all posts
//@access - Public
router.get("/", (req, res) => {
    Post.find().then((posts) => {
        if (posts) {
            return res.json(posts);
        } else {
            return res.status(400).json({ msg: "No posts found" });
        }
    })
        .catch((err) => res.json(err));
})

//ROUTE - GET /api/posts/:post_id
//desc - get post by id
//@access - Public
router.get("/:post_id", (req, res) => {
    Post.findOne({ id: req.params.id }).then(post => {
        if (post) {
            return res.json(post);
        } else {
            return res.status(400).json({ msg: "No post found" })
        }
    })
        .catch(err => res.json(err))
})


//ROUTE - DELETE /api/posts/:post_id
//desc - delete post
//@access - Private
router.delete("/:post_id", passport.authenticate("jwt", { session: false }), (req, res) => {
    Post.findOneAndRemove({ id: req.params.id }).then(post => {
        return res.json(post)
    })
        .catch(err => res.json(err))
})


//ROUTE - POST /api/posts/like/:user_id
//desc - like post
//@access - Private
router.post("/like/:post_id", (req, res) => {
    Post.findOne({ id: req.params.post_id }).then(post => {
        if (!post) {
            return res.status(400).json({ message: "Post does not exist." });
        } else {
            if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
                //already liked
                return res.status(400).json({ message: "You have already liked this post" })
            } else {
                const newLike = {
                    user: req.user.id
                }

                post.likes.unshift(newLike);

                post.save().then(updatedPost => {
                    return res.json(updatedPost);
                })
                    .catch(err => res.status(400).json(err))
            }
        }
    })
        .catch(err => res.json(err))
})


//ROUTE - POST /api/posts/unlike/:post_id
//desc - unlike post
//@access - Private
router.post("/unlike/:post_id", (req, res) => {
    Post.findOne({ id: req.params.post_id }).then(post => {
        if (!post) {
            return res.status(400).json({ message: "Post does not exist." });
        } else {
            if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
                //already liked
                return res.status(400).json({ message: "You have not liked this post" })
            } else {
                //remove user from likes
                const removeIndex = post.likes.map(like => like.user.toString()).indexOf(req.user.id);

                post.likes.splice(removeIndex, 1);

                post.save().then(newPost => {
                    return res.json(newPost);
                })
                    .catch(err => res.status(400).json(err))
            }
        }
    })
        .catch(err => res.json(err))
})

module.exports = router;