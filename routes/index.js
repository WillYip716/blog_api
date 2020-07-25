const express = require('express');
const router = express.Router();
var User = require('../models/user');
const jwt = require('jsonwebtoken')

const api_controller = require('../controllers/apicontroller');

// Get all blog posts
router.get('/posts', api_controller.post_list);

// Get single blog post
router.get('/posts/:id', api_controller.single_post);

// Get single blog post
router.get('/posts/:id/comments', api_controller.post_comments);

// Create blog post
router.post('/posts/create',verifyToken,api_controller.create_post);

// Update blog post
router.put('/posts/:id',verifyToken,api_controller.update_post);

// Update blog post to publish
router.put('/posts/:id/publish',verifyToken, api_controller.publish_post);

// Delete post
router.delete('/posts/:id/delete', verifyToken, api_controller.delete_post);

// create comment in blog post
router.post('/posts/:id/comment', api_controller.create_comment);

router.post("/login", async (req, res) => {
  const user = await User.findOne({ name: req.body.username });
  if (!user)
    return res.status(400).send("Username and/or password is incorrect");

  //const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (req.body.password!=user.password) return res.sendStatus(400);


  const token = jwt.sign({ _id: user._id }, process.env.SECRET);
  const userid = user._id;
  res.status(200).send({ userid, token });


});



function verifyToken(req, res, next) {
  // Get auth header value
  const bearerHeader = req.headers['authorization'];
  // Check if bearer is undefined
  if(typeof bearerHeader !== 'undefined') {
    // Split at the space
    const bearer = bearerHeader.split(' ');
    // Get token from array
    const bearerToken = bearer[1];
    // Set the token
    try {
      const verified = jwt.verify(bearerToken, process.env.SECRET);
      req.user = verified;
      next();
    } catch (err) {
      res.status(400).send("Invalid token");
    }
  } else {
    // Forbidden
    res.sendStatus(403);
  }
}



// GET request for logging out
router.get("/log-out", (req, res) => {
  req.logout();
  res.redirect(req.get("referer"));
});

module.exports = router;