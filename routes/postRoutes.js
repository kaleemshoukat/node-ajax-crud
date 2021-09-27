//import express and route
const express = require('express');
const router  = express.Router();
//required controllers
const postController = require('../controllers/postController');

//routes
router.get('/add-post', postController.addPost);
router.post('/submit-post', postController.submitPost);
router.get('/posts', postController.posts);
router.get('/delete-post/:id', postController.delete);
router.get('/edit-post/:id', postController.editPost);
router.post('/update-post/:id', postController.updatePost);





// export to use in server.js
module.exports = router;