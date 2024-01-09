const express = require('express');
const router = express.Router();
const { admin } = require('../controllers');
const middlewares = require('../utils/middlewares');

//admin
router.post('/login', admin.login);
router.get('/whoami', middlewares.auth, admin.whoami);
router.put('/update', middlewares.auth, admin.update);

module.exports = router;