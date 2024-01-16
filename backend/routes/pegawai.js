const express = require('express');
const router = express.Router();
const { pegawai } = require('../controllers');
const middlewares = require('../utils/middlewares');

router.post('/add', middlewares.auth, pegawai.store);
router.get('/show', middlewares.auth, pegawai.show);
router.get('/show/:nip', middlewares.auth, pegawai.showOne);
router.put('/update/:nip', middlewares.auth, pegawai.update);
router.delete('/delete/:nip', middlewares.auth, pegawai.destroy);

module.exports = router;