//import express and route
const express = require('express');
const router  = express.Router();

//required controllers
const postController = require('../controllers/postController');

//required middlewares
const authMiddleware= require('../middlewares/authMiddleware');

//required validations
const addPostValidation= require('../validations/addPostValidation')

//routes
router.use(authMiddleware.authenticateToken);       //apply auth on all below routes (prefix can be added as first parameter)
router.get('/add-post', postController.addPost);
router.post('/submit-post', addPostValidation, postController.submitPost);
router.get('/posts', postController.posts);
router.post('/get-posts', postController.getPosts);
router.get('/delete-post/:id', postController.delete);
router.get('/edit-post/:id', postController.editPost);
router.post('/update-post/:id', postController.updatePost);





// export to use in server.js
module.exports = router;