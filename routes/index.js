//import express and route
const router  = require('express').Router();

const generalRoutes = require('./generalRoutes');
const postRoutes = require('./postRoutes');

router.use(generalRoutes)
router.use(postRoutes)

module.exports = router