const express = require('express');
const router = express.Router();
const { tunjangan } = require('../controllers');
const middlewares = require('../utils/middlewares');

router.post('/add', middlewares.auth, tunjangan.store);
router.get('/show', middlewares.auth, tunjangan.show);
router.put('/update/:id', middlewares.auth, tunjangan.update);
router.delete('/delete/:id', middlewares.auth, tunjangan.destroy);

module.exports = router;