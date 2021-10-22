//import express and route
const express = require('express');
const router  = express.Router();
const multer = require('multer');
const upload = multer({ dest: './public/uploads'});

//required controllers
const generalController = require('../controllers/generalController');

//required validations
const registerValidation= require('../validations/registerValidation');
const loginValidation= require('../validations/loginValidation');
const forgotPasswordValidation= require('../validations/forgotPasswordValidation');
const passwordResetValidation= require('../validations/passwordResetValidation');

//required middlewares
const authMiddleware= require('../middlewares/authMiddleware');

//routes
router.get('/', generalController.register);
router.post('/submit-register', upload.single('image'), generalController.submitRegister);
// router.post('/submit-register', registerValidation, upload.single('image'), generalController.submitRegister);
router.get('/login', generalController.login);
router.post('/submit-login', loginValidation, generalController.submitLogin);
router.get('/forgot-password', generalController.forgotPassword);
router.post('/submit-forgot-password', forgotPasswordValidation, generalController.submitForgotPassword);
router.get('/reset-password/:token', generalController.resetPassword);
router.post('/submit-reset-password', passwordResetValidation, generalController.submitResetPassword);

router.use(authMiddleware.authenticateToken);
router.get('/home', generalController.home);
router.get('/logout', generalController.logout);






// export to use in server.js
module.exports = router;