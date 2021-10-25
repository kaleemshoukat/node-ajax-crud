//import express and route
const router  = require('express').Router();

const generalRoutes = require('./generalRoutes');
const postRoutes = require('./postRoutes');
const userRoutes = require('./userRoutes');

router.use(generalRoutes)
router.use(postRoutes)
router.use('/users', userRoutes)        //users is prefix of all userRoutes

module.exports = router