const express = require('express');
const router = express.Router();
const { penggajian } = require('../controllers');
const middlewares = require('../utils/middlewares');

router.get('/show', middlewares.auth, penggajian.show);
router.get('/show/:id', middlewares.auth, penggajian.showDetail);

module.exports = router;