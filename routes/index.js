const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require("passport");

const api_controller = require('../controllers/apicontroller');

// Get all blog posts
router.get('/posts', api_controller.post_list);

// Get single blog post
router.get('/posts/:id', api_controller.single_post);



// create comment in blog post
router.post('/posts/:id/comment',api_controller.create_comment);

/* POST login. */
router.post('/login', function (req, res, next) {    passport.authenticate('local', {session: false}, (err, user, info) => {
        console.log("user in index is" + user);
        if (err || !user) {
            return res.status(400).json({
                message: 'Something is not right',
                user   : user
            });
        }req.login(user, {session: false}, (err) => {
        if (err) {
            res.send(err);
        }           // generate a signed son web token with the contents of user object and return it in the response           
        const token = jwt.sign(user.toJSON(), process.env.SECRET);
        return res.json({user, token});
        });
    })(req, res);
});


module.exports = router;