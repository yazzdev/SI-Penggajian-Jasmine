const { Pegawai, Role } = require('../db/models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = process.env;
const imagekit = require('../utils/imagekit');
const { parse, isValid } = require('date-fns');

// Fungsi untuk format tanggal
function formatDate(dateString) {
  const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
  const formattedDate = new Date(dateString).toLocaleDateString('en-GB', options);
  return formattedDate;
}

module.exports = {
  registerPage: (req, res) => {
    return res.render('users/register', {
      errors: {
        nip: '',
        password: '',
        nama_pegawai: '',
        tgl_masuk: '',
        bank: '',
        no_rekening: '',
        role_id: '',
        id_jabatan: ''
      }
    });
  },
  register: async (req, res) => {
    try {
      const { nip, password, nama_pegawai, tgl_masuk, bank, no_rekening, role_id, id_jabatan } = req.body;

      const error = { errors: {} };
      // Check if NIP already exists
      const exist = await Pegawai.findOne({ where: { nip } });
      if (exist) {
        error.errors.nip = 'NIP is already used!';
        return res.render('users/register', error);
      }

      // Hash the password
      const hashPassword = await bcrypt.hash(password, 10);

      // Parse the date
      const parsedTglMasuk = parse(tgl_masuk, 'yyyy-MM-dd', new Date());

      // Check if the parsed date is valid
      if (!isValid(parsedTglMasuk)) {
        return res.render('users/register', {
          status: false,
          message: 'Invalid date format for Tanggal Masuk!',
          data: null
        });
      }

      // Create Pegawai
      const dataPegawai = {
        nip,
        password: hashPassword,
        nama_pegawai,
        tgl_masuk: parsedTglMasuk,
        bank,
        no_rekening,
        role_id,
        id_jabatan
      };

      await Pegawai.create(dataPegawai);

      return res.redirect('/users/show-all');
    } catch (error) {
      console.error(error);
      return res.render('users/register', {
        status: false,
        message: 'Internal Server Error',
        data: null,
      });
    }
  },
  login: async (req, res) => {
    try {
      const { nip, password } = req.body;

      const pegawai = await Pegawai.findOne({ where: { nip } });
      if (!pegawai) {
        return res.status(400).json({
          status: false,
          message: 'credential is not valid!',
          data: null
        });
      }

      const passwordCorrect = await bcrypt.compare(password, pegawai.password);
      if (!passwordCorrect) {
        return res.status(400).json({
          status: false,
          message: 'credential is not valid!',
          data: null
        });
      }

      const payload = {
        id: pegawai.id,
        nip: pegawai.nip,
        nama_pegawai: pegawai.nama_pegawai,
        role_id: pegawai.role_id,
        id_jabatan: pegawai.id_jabatan
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
        message: 'fetch pegawai success!',
        data: req.pegawai
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

  show: async (req, res) => {
    try {
      const pegawai = await Pegawai.findAll();

      // Format tanggal sebelum dikirimkan ke view
      const formattedPegawai = pegawai.map(user => {
        return {
          ...user.toJSON(),
          tgl_masuk: formatDate(user.tgl_masuk),
        };
      });

      res.render('users/show-all', {
        status: true,
        message: 'success',
        data: formattedPegawai,
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

  uploadProfile: async (req, res) => {
    try {
      const { id } = req.user;

      const pegawai = await Pegawai.findByPk(id);

      if (!pegawai) {
        return res.status(404).json({
          status: false,
          message: 'Pegawai not found!',
          data: null
        });
      }

      if (!req.file) {
        return res.status(400).json({
          status: false,
          message: 'No file uploaded',
          data: null,
        });
      }

      const stringFile = req.file.buffer.toString('base64');

      const uploadFile = await imagekit.upload({
        fileName: req.file.originalname,
        file: stringFile
      });

      // Memperbarui gambar profil pengguna
      pegawai.profilePicture = uploadFile.url;
      await pegawai.save();

      return res.json({
        status: true,
        message: 'Profile picture uploaded successfully',
        data: {
          id: pegawai.id,
          nip: pegawai.nip,
          nama_pegawai: pegawai.nama_pegawai,
          profilePicture: pegawai.profilePicture
        }
      });
    } catch (err) {
      throw err;
    }
  }
}