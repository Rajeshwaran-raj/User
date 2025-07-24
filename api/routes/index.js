const Express = require('express');

const router = Express.Router();

const user = require('./user');

router.use('/deployment-management/v1/users', user);


module.exports = router;
