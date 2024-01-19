const { Penggajian, Pegawai, Jabatan, Potongan, Tunjangan, Divisi } = require('../db/models');
const { parse, isValid, parseISO } = require('date-fns');

module.exports = {
  store: async (req, res) => {
    try {
      const { nip, nama_pegawai, tgl_masuk, gaji_pokok, bank, no_rekening, id_jabatan } = req.body;

      const exist = await Pegawai.findOne({ where: { nip } });
      if (exist) {
        return res.status(400).json({
          status: false,
          message: 'NIP Sudah digunakan!',
          data: null
        });
      }

      const parsedTglMasuk = parse(tgl_masuk, 'yyyy-MM-dd', new Date());

      if (!isValid(parsedTglMasuk)) {
        return res.status(400).json({
          status: false,
          message: 'Invalid date format untuk Tanggal Masuk!',
          data: null
        });
      }

      const dataPegawai = {
        nip,
        nama_pegawai,
        tgl_masuk: parsedTglMasuk,
        gaji_pokok,
        bank,
        no_rekening,
        id_jabatan
      };

      const pegawai = await Pegawai.create(dataPegawai);

      // Create default tunjangan
      await Tunjangan.create({
        transport: 0,
        makan: 0,
        komunikasi: 0,
        keahlian: 0,
        nip_pegawai: pegawai.nip
      });

      // Create default potongan
      await Potongan.create({
        makan: 0,
        zakat: 0,
        absensi: 0,
        transport: 0,
        pinjaman_pegawai: 0,
        lain_lain: 0,
        nip_pegawai: pegawai.nip
      });

      // Create default penggajian
      const jabatan = await Jabatan.findByPk(id_jabatan);

      const tunjangan = await Tunjangan.findOne({ where: { nip_pegawai: pegawai.nip } });
      const potongan = await Potongan.findOne({ where: { nip_pegawai: pegawai.nip } });

      const total_gaji =
        jabatan.biaya_jabatan + pegawai.gaji_pokok + tunjangan.transport + tunjangan.makan +
        tunjangan.komunikasi + tunjangan.keahlian;

      const total_potongan =
        potongan.makan + potongan.zakat + potongan.absensi +
        potongan.transport + potongan.pinjaman_pegawai + potongan.lain_lain;

      const take_home_pay = total_gaji - total_potongan;


      await Penggajian.create({
        total_gaji,
        total_potongan,
        nip_pegawai: pegawai.nip,
        take_home_pay,
        id_jabatan: pegawai.id_jabatan
      });

      return res.status(201).json({
        status: true,
        message: 'Success',
        data: {
          nip: pegawai.nip,
          nama_pegawai: pegawai.nama_pegawai,
          tgl_masuk: pegawai.tgl_masuk,
          gaji_pokok: pegawai.gaji_pokok,
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
  show: async (req, res) => {
    try {
      const pegawai = await Pegawai.findAll({
        attributes: {
          exclude: ['createdAt', 'updatedAt']
        },
        include: [{
          model: Jabatan,
          as: 'jabatan',
          attributes: { exclude: ['createdAt', 'updatedAt'] },
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
  showOne: async (req, res) => {
    try {
      const { nip } = req.params;

      const pegawai = await Pegawai.findOne({
        where: { nip },
        attributes: {
          exclude: ['createdAt', 'updatedAt']
        },
        include: [{
          model: Jabatan,
          as: 'jabatan',
          attributes: { exclude: ['createdAt', 'updatedAt'] },
        }]
      });

      if (!pegawai) {
        return res.status(404).json({
          status: false,
          message: 'Pegawai tidak ditemukan!',
          data: null
        });
      }

      return res.status(200).json({
        status: true,
        message: 'Success',
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
  update: async (req, res) => {
    try {
      const { nip } = req.params;
      const { nama_pegawai, tgl_masuk, gaji_pokok, bank, no_rekening, id_jabatan } = req.body;

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
          message: 'Invalid date format untuk Tanggal Masuk!',
          data: null
        });
      }

      // Update data pegawai
      pegawai.nama_pegawai = nama_pegawai || pegawai.nama_pegawai;
      pegawai.tgl_masuk = parsedTglMasuk || pegawai.tgl_masuk;
      pegawai.gaji_pokok = !isNaN(gaji_pokok) ? gaji_pokok : pegawai.gaji_pokok;
      pegawai.bank = bank || pegawai.bank;
      pegawai.no_rekening = no_rekening || pegawai.no_rekening;
      pegawai.id_jabatan = id_jabatan || pegawai.id_jabatan;

      await pegawai.save();

      // Update penggajian terkait
      const penggajian = await Penggajian.findOne({ where: { nip_pegawai: pegawai.nip } });
      const tunjangan = await Tunjangan.findOne({ where: { nip_pegawai: pegawai.nip } });

      if (penggajian) {
        const jabatan = await Jabatan.findByPk(pegawai.id_jabatan);

        const total_gaji =
          parseInt(jabatan.biaya_jabatan) + parseInt(pegawai.gaji_pokok) + parseInt(tunjangan.transport) + parseInt(tunjangan.makan) + parseInt(tunjangan.komunikasi) + parseInt(tunjangan.keahlian);

        penggajian.total_gaji = total_gaji;
        penggajian.take_home_pay = total_gaji - parseInt(penggajian.total_potongan);

        await penggajian.save();
      }

      return res.status(200).json({
        status: true,
        message: 'Pegawai Berhasil di Ubah!!',
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
  },
  destroy: async (req, res) => {
    try {
      const { nip } = req.params;
      const pegawai = await Pegawai.findOne({ where: { nip } });

      if (!pegawai) {
        return res.status(404).json({
          status: false,
          message: 'Pegawai tidak ditemukan!',
          data: null
        });
      }

      // Hapus data Tunjangan terkait
      await Tunjangan.destroy({ where: { nip_pegawai: pegawai.nip } });

      // Hapus data Potongan terkait
      await Potongan.destroy({ where: { nip_pegawai: pegawai.nip } });
      
      // Hapus data Penggajian terkait
      await Penggajian.destroy({ where: { nip_pegawai: pegawai.nip } });

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