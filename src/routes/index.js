const Express = require('express');

const router = Express.Router();

const userRoutes = require('./userroutes');

router.use('/users', userRoutes);

module.exports = router;