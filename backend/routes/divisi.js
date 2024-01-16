const express = require('express');
const router = express.Router();
const { divisi } = require('../controllers');
const middlewares = require('../utils/middlewares');

router.post('/add', middlewares.auth, divisi.store);
router.get('/show', middlewares.auth, divisi.show);
router.get('/show/:id', middlewares.auth, divisi.showOne);
router.put('/update/:id', middlewares.auth, divisi.update);
router.delete('/delete/:id', middlewares.auth, divisi.destroy);

module.exports = router;