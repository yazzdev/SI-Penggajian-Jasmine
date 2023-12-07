const { Pegawai, Role } = require('../db/models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = process.env;
const imagekit = require('../utils/imagekit');
const { format, parse, isValid } = require('date-fns');

module.exports = {
  register: async (req, res) => {
    try {
      const { nip, password, nama_pegawai, tgl_masuk, bank, no_rekening, role_id, id_jabatan } = req.body;

      const exist = await Pegawai.findOne({ where: { nip } });
      if (exist) {
        return res.status(400).json({
          status: false,
          message: 'nip already used!',
          data: null
        });
      }

      const hashPassword = await bcrypt.hash(password, 10);

      // Parsing tanggal dengan format dd-MM-yyyy
      const parsedTglMasuk = parse(tgl_masuk, 'dd-MM-yyyy', new Date());

      // Cek apakah tanggal yang di-parse valid
      if (!isValid(parsedTglMasuk)) {
        return res.status(400).json({
          status: false,
          message: 'Invalid date format for tgl_masuk!',
          data: null
        });
      }

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

      const rolePegawai = await Role.findOne({ where: { name: 'User' } });
      if (rolePegawai) {
        dataPegawai.role_id = rolePegawai.id;
      }
      const pegawai = await Pegawai.create(dataPegawai);

      // Format the date in the desired format (dd-MM-yyyy)
      const formattedTglMasuk = format(new Date(pegawai.tgl_masuk), 'dd-MM-yyyy');

      return res.status(201).json({
        status: true,
        message: 'User created!',
        data: {
          id: pegawai.id,
          nip: pegawai.nip,
          nama_pegawai: pegawai.nama_pegawai,
          tgl_masuk: formattedTglMasuk,
          bank: pegawai.bank,
          no_rekening: pegawai.no_rekening,
          role_id: pegawai.role_id,
          id_jabatan: pegawai.id_jabatan
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

  // login: async (req, res) => {
  //   try {
  //     const { nip, password } = req.body;

  //     const pegawai = await Pegawai.findOne({ where: { nip } });
  //     if (!pegawai) {
  //       return res.status(400).json({
  //         status: false,
  //         message: 'credential is not valid!',
  //         data: null
  //       });
  //     }

  //     const passwordCorrect = await bcrypt.compare(password, pegawai.password);
  //     if (!passwordCorrect) {
  //       return res.status(400).json({
  //         status: false,
  //         message: 'credential is not valid!',
  //         data: null
  //       });
  //     }

  //     const payload = {
  //       id: pegawai.id,
  //       nip: pegawai.nip,
  //       nama_pegawai: pegawai.nama_pegawai,
  //       role_id: pegawai.role_id,
  //       id_jabatan: pegawai.id_jabatan
  //     };

  //     const token = await jwt.sign(payload, JWT_SECRET_KEY);
  //     return res.status(200).json({
  //       status: true,
  //       message: 'login success!',
  //       data: {
  //         token: token
  //       }
  //     });

  //   } catch (error) {
  //     console.error(error);
  //     return res.status(500).json({
  //       status: false,
  //       message: 'Internal Server Error',
  //       data: null,
  //     });
  //   }
  // },

  // whoami: async (req, res) => {
  //   try {
  //     return res.status(200).json({
  //       status: true,
  //       message: 'fetch pegawai success!',
  //       data: req.pegawai
  //     });
  //   } catch (error) {
  //     console.error(error);
  //     return res.status(500).json({
  //       status: false,
  //       message: 'Internal Server Error',
  //       data: null,
  //     });
  //   }
  // },

  // show: async (req, res) => {
  //   try {
  //     const pegawai = await Pegawai.findAll();

  //     return res.status(200).json({
  //       status: true,
  //       message: 'success',
  //       data: pegawai
  //     });
  //   } catch (error) {
  //     console.error(error);
  //     return res.status(500).json({
  //       status: false,
  //       message: 'Internal Server Error',
  //       data: null,
  //     });
  //   }
  // },

  // uploadProfile: async (req, res) => {
  //   try {
  //     const { id } = req.user;

  //     const pegawai = await Pegawai.findByPk(id);

  //     if (!pegawai) {
  //       return res.status(404).json({
  //         status: false,
  //         message: 'Pegawai not found!',
  //         data: null
  //       });
  //     }

  //     if (!req.file) {
  //       return res.status(400).json({
  //         status: false,
  //         message: 'No file uploaded',
  //         data: null,
  //       });
  //     }

  //     const stringFile = req.file.buffer.toString('base64');

  //     const uploadFile = await imagekit.upload({
  //       fileName: req.file.originalname,
  //       file: stringFile
  //     });

  //     // Memperbarui gambar profil pengguna
  //     pegawai.profilePicture = uploadFile.url;
  //     await pegawai.save();

  //     return res.json({
  //       status: true,
  //       message: 'Profile picture uploaded successfully',
  //       data: {
  //         id: pegawai.id,
  //         nip: pegawai.nip,
  //         nama_pegawai: pegawai.nama_pegawai,
  //         profilePicture: pegawai.profilePicture
  //       }
  //     });
  //   } catch (err) {
  //     throw err;
  //   }
  // }
}