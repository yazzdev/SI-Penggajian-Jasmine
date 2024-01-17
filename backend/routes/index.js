const express = require('express');
const router = express.Router();
const admin = require('./admin');
const pegawai = require('./pegawai');
const tunjangan = require('./tunjangan');
const potongan = require('./potongan');
const jabatan = require('./jabatan');
const penggajian = require('./penggajian');

router.get('/', (req, res, next) => {
  res.status(200).json({
    message: 'Welcome at Home Page!!',
  });
});

router.use('/admin', admin);
router.use('/pegawai', pegawai);
router.use('/tunjangan', tunjangan);
router.use('/potongan', potongan);
router.use('/jabatan', jabatan);
router.use('/penggajian', penggajian);

module.exports = router;