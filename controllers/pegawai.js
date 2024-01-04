const { Pegawai, Jabatan, Divisi } = require('../db/models');
const { parse, isValid, parseISO } = require('date-fns');

module.exports = {
  addEmployee: async (req, res) => {
    try {
      const { nip, nama_pegawai, tgl_masuk, bank, no_rekening, id_jabatan } = req.body;

      const exist = await Pegawai.findOne({ where: { nip } });
      if (exist) {
        return res.status(400).json({
          status: false,
          message: 'NIP is already used!',
          data: null
        });
      }

      const parsedTglMasuk = parse(tgl_masuk, 'yyyy-MM-dd', new Date());

      if (!isValid(parsedTglMasuk)) {
        return res.status(400).json({
          status: false,
          message: 'Invalid date format for Tanggal Masuk!',
          data: null
        });
      }

      const dataPegawai = {
        nip,
        nama_pegawai,
        tgl_masuk: parsedTglMasuk,
        bank,
        no_rekening,
        id_jabatan
      };

      const pegawai = await Pegawai.create(dataPegawai);

      return res.status(201).json({
        status: true,
        message: 'Success',
        data: {
          nip: pegawai.nip,
          nama_pegawai: pegawai.nama_pegawai,
          tgl_masuk: pegawai.tgl_masuk,
          bank: pegawai.bank,
          no_rekening: pegawai.no_rekening,
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
  showAll: async (req, res) => {
    try {
      const pegawai = await Pegawai.findAll({
        attributes: {
          exclude: ['createdAt', 'updatedAt']
        },
        include: [{
          model: Jabatan,
          as: 'jabatan',
          attributes: { exclude: ['createdAt', 'updatedAt'] },
          include: [{
            model: Divisi,
            as: 'divisi',
            attributes: { exclude: ['createdAt', 'updatedAt'] }
          }]
        }]
      });

      return res.status(200).json({
        status: true,
        message: 'success',
        data: pegawai
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
  updateEmployee: async (req, res) => {
    try {
      const { nip, nama_pegawai, tgl_masuk, bank, no_rekening, id_jabatan } = req.body;

      const pegawai = await Pegawai.findOne({ where: { nip } });

      if (!pegawai) {
        return res.status(404).json({
          status: false,
          message: 'Pegawai tidak ditemukan!',
          data: null
        });
      }

      // Validasi format tanggal masuk
      const parsedTglMasuk = parseISO(tgl_masuk);
      if (!isValid(parsedTglMasuk)) {
        return res.status(400).json({
          status: false,
          message: 'Invalid date format for Tanggal Masuk!',
          data: null
        });
      }

      // Update data pegawai
      pegawai.nip = nip || pegawai.nip;
      pegawai.nama_pegawai = nama_pegawai || pegawai.nama_pegawai;
      pegawai.tgl_masuk = parsedTglMasuk || pegawai.tgl_masuk;
      pegawai.bank = bank || pegawai.bank;
      pegawai.no_rekening = no_rekening || pegawai.no_rekening;
      pegawai.id_jabatan = id_jabatan || pegawai.id_jabatan;

      await pegawai.save();

      return res.status(200).json({
        status: true,
        message: 'Update pegawai success!',
        data: {
          nip: pegawai.nip,
          nama_pegawai: pegawai.nama_pegawai,
          tgl_masuk: pegawai.tgl_masuk,
          bank: pegawai.bank,
          no_rekening: pegawai.no_rekening,
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
  deleteEmployee: async (req, res) => {
    try {
      const { nip } = req.body;

      // Cari pegawai berdasarkan NIP
      const pegawai = await Pegawai.findOne({ where: { nip } });

      // Jika pegawai tidak ditemukan
      if (!pegawai) {
        return res.status(404).json({
          status: false,
          message: 'Pegawai tidak ditemukan!',
          data: null
        });
      }

      // Hapus pegawai
      await pegawai.destroy();

      return res.status(200).json({
        status: true,
        message: 'Hapus pegawai berhasil!',
        data: null
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        status: false,
        message: 'Internal Server Error',
        data: null,
      });
    }
  }
}