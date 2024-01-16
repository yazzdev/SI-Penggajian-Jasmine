const express = require('express');
const router = express.Router();
const { potongan } = require('../controllers');
const middlewares = require('../utils/middlewares');

router.get('/show', middlewares.auth, potongan.show);
router.get('/show/:id', middlewares.auth, potongan.showOne);
router.put('/update/:id', middlewares.auth, potongan.update);

module.exports = router;