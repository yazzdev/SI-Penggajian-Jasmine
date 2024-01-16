const express = require('express');
const router = express.Router();
const { jabatan } = require('../controllers');
const middlewares = require('../utils/middlewares');

router.post('/add', middlewares.auth, jabatan.store);
router.get('/show', middlewares.auth, jabatan.show);
router.get('/show/:id', middlewares.auth, jabatan.showOne);
router.put('/update/:id', middlewares.auth, jabatan.update);

module.exports = router;