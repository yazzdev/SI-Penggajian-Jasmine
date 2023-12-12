const express = require('express');
const router = express.Router();
const pegawai = require('../controllers/pegawai');
const rbac = require('../controllers/rbac');
const enums = require('../utils/enum');
const multer = require('multer')();

const middlewares = require('../utils/middlewares');

router.get('/', (req, res, next) => {
  res.render('index', {
    message: 'Welcome at Home Page!!',
  });
});

router.get('/register', pegawai.registerPage);
router.post('/users/register', pegawai.register);
router.get('/users/show-all', pegawai.show);

// router.get('/login', user.loginPage);
router.post('/users/login', pegawai.login);

router.get('/users/whoami', middlewares.auth, pegawai.whoami);
//  middlewares.auth, middlewares.rbac(enums.rbacModule.authorization, true, false, false, false),
// //* Upload Avatar for pegawai
// bisa digunakan untuk upload profile atau update profile, tinggal memasukan gambar baru saja
router.post('/auth/upload-profile', middlewares.auth, multer.single('profilePicture'), pegawai.uploadProfile);

module.exports = router;