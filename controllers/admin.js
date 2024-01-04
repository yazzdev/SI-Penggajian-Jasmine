const { Admin } = require('../db/models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = process.env;

module.exports = {
  login: async (req, res) => {
    try {
      const { username, password } = req.body;

      const admin = await Admin.findOne({ where: { username } });
      if (!admin) {
        return res.status(400).json({
          status: false,
          message: 'credential is not valid!',
          data: null
        });
      }

      const passwordCorrect = await bcrypt.compare(password, admin.password);
      if (!passwordCorrect) {
        return res.status(400).json({
          status: false,
          message: 'credential is not valid!',
          data: null
        });
      }

      const payload = {
        id: admin.id,
        username: admin.username
      };

      const token = await jwt.sign(payload, JWT_SECRET_KEY);
      return res.status(200).json({
        status: true,
        message: 'login success!',
        data: {
          token: token
        }
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        status: false,
        message: 'Internal Server Error',
        data: null,
      });
    }
  },
  whoami: async (req, res) => {
    try {
      return res.status(200).json({
        status: true,
        message: 'fetch admin success!',
        data: req.admin
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        status: false,
        message: 'Internal Server Error',
        data: null
      });
    }
  },
  updateAdmin: async (req, res) => {
    try {
      const { id } = req.user;
      const { username, password } = req.body;

      // Validasi password baru dan hashing
      let hashPassword;
      if (password) {
        hashPassword = await bcrypt.hash(password, 10);
      }

      // Temukan admin berdasarkan ID
      const admin = await Admin.findByPk(id);

      if (!admin) {
        return res.status(404).json({
          status: false,
          message: 'Admin tidak ditemukan!',
          data: null
        });
      }

      // Update data admin
      admin.username = username || admin.username;
      admin.password = hashPassword || admin.password;

      // Simpan perubahan ke database
      await admin.save();

      return res.status(200).json({
        status: true,
        message: 'Update admin success!',
        data: {
          username: admin.username,
          password: admin.password
        }
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        status: false,
        message: 'Gagal mengupdate admin. Silakan coba lagi nanti.',
        data: null
      });
    }
  }
}