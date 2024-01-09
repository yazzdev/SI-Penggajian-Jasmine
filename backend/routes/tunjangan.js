const express = require('express');
const router = express.Router();
const { tunjangan } = require('../controllers');
const middlewares = require('../utils/middlewares');

router.get('/show', middlewares.auth, tunjangan.show);
router.put('/update/:id', middlewares.auth, tunjangan.update);

module.exports = router;