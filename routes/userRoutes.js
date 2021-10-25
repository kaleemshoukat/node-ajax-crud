//import express and route
const router  = require('express').Router();

//required controllers
const userController = require('../controllers/userController');

//required middlewares
const authMiddleware= require('../middlewares/authMiddleware');

//routes
router.use(authMiddleware.authenticateToken);
router.get('/', userController.users);
router.post('/list', userController.list);




// export to use in server.js
module.exports = router;