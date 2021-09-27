//import express and route
const express = require('express');
const router  = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/'});

//required controllers
const generalController = require('../controllers/generalController');

//required validations
const registerValidation= require('../validations/registerValidation');

//routes
router.get('/', generalController.register);
router.post('/submit-register', upload.single('image'), generalController.submitRegister);
// router.post('/submit-register', registerValidation, upload.single('image'), generalController.submitRegister);
router.get('/login', generalController.login);
router.post('/submit-login', generalController.submitLogin);
router.get('/home', generalController.home);






// export to use in server.js
module.exports = router;