const express = require('express');
const router = express.Router();
const admin = require('./admin');
const pegawai = require('./pegawai');
const tunjangan = require('./tunjangan');

router.get('/', (req, res, next) => {
  res.render('index', {
    message: 'Welcome at Home Page!!',
  });
});

router.use('/admin', admin);
router.use('/pegawai', pegawai);
router.use('/tunjangan', tunjangan);

module.exports = router;