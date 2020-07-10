const express = require('express');
const router = express.Router();

const api_controller = require('../controllers/apicontroller');

// Get all blog posts
router.get('/posts', api_controller.post_list);

// Get single blog post
router.get('/posts/:id', api_controller.single_post);

// Create blog post
router.post('/posts/create',api_controller.create_post);

// Update blog post
router.put('/posts/:id',api_controller.update_post);

// Update blog post to publish
router.put('/posts/:id/publish', api_controller.publish_post);

// Delete post
router.delete('/posts/:id/delete',api_controller.delete_post);

// create comment in blog post
router.post('/posts/:id/comment',api_controller.create_comment);

module.exports = router;