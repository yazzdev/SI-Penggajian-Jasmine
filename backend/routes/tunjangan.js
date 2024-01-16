const express = require('express');
const router = express.Router();
const { tunjangan } = require('../controllers');
const middlewares = require('../utils/middlewares');

router.get('/show', middlewares.auth, tunjangan.show);
router.get('/show/:id', middlewares.auth, tunjangan.showOne);
router.put('/update/:id', middlewares.auth, tunjangan.update);

module.exports = router;