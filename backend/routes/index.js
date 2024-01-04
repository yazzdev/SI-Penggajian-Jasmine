const express = require('express');
const router = express.Router();
const pegawai = require('../controllers/pegawai');
const admin = require('../controllers/admin');

const middlewares = require('../utils/middlewares');

router.get('/', (req, res, next) => {
  res.render('index', {
    message: 'Welcome at Home Page!!',
  });
});

//admin
router.post('/admin/login', admin.login);
router.get('/admin/whoami', middlewares.auth, admin.whoami);
router.put('/admin/update', middlewares.auth, admin.updateAdmin);

//employee
router.post('/employee/add', middlewares.auth, pegawai.addEmployee);
router.get('/employee/show-all', middlewares.auth, pegawai.showAll);
router.put('/employee/update', middlewares.auth, pegawai.updateEmployee);
router.delete('/employee/delete', middlewares.auth, pegawai.deleteEmployee);

module.exports = router;