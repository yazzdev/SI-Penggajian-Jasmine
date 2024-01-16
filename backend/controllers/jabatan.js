const { Jabatan } = require('../db/models');

module.exports = {
  show: async (req, res) => {
    try {
      const potongan = await Jabatan.findAll({
        attributes: {
          exclude: ['createdAt', 'updatedAt']
        }
      });

      return res.status(200).json({
        status: true,
        message: 'success',
        data: potongan
      });
    } catch (error) {
      throw error;
    }
  },
  showOne: async (req, res) => {
    try {
      const { id } = req.params;

      const jabatan = await Jabatan.findOne({
        where: { id: id },
        attributes: {
          exclude: ['createdAt', 'updatedAt']
        }
      });

      if (!jabatan) {
        return res.status(404).json({
          status: false,
          message: 'Jabatan tidak ditemukan!',
          data: null
        });
      }

      return res.status(200).json({
        status: true,
        message: 'Success',
        data: jabatan
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
  store: async (req, res) => {
    try {
      const { nama_divisi, nama_jabatan, biaya_jabatan } = req.body;

      if (!nama_divisi || !nama_jabatan || !biaya_jabatan) {
        return res.status(400).json({
          status: false,
          message: 'Nama Divisi, Nama jabatan, Dan Biaya Jabatan wajib di isi!',
          data: null
        });
      }

      const jabatan = await Jabatan.create({
        nama_divisi: nama_divisi,
        nama_jabatan: nama_jabatan,
        biaya_jabatan: biaya_jabatan,
      });

      return res.status(201).json({
        status: true,
        message: 'Jabatan Berhasil Ditambahkan!!',
        data: jabatan
      });
    } catch (error) {
      throw error;
    }
  },
  update: async (req, res) => {
    try {
      const { id } = req.params;

      const updated = await Jabatan.update(req.body, { where: { id: id } });

      if (updated[0] == 0) {
        return res.status(404).json({
          status: false,
          message: `Jabatan Tidak Ditemukan!!`,
          data: null
        });
      }

      return res.status(200).json({
        status: true,
        message: 'Jabatan Berhasil Di Ubah!!',
        data: null
      });
    } catch (error) {
      throw error;
    }
  },
  destroy: async (req, res) => {
    try {
      const { id } = req.params;
      const jabatan = await Jabatan.findOne({ where: { id } });

      if (!jabatan) {
        return res.status(404).json({
          status: false,
          message: 'Jabatan tidak ditemukan!',
          data: null
        });
      }

      await jabatan.destroy();

      return res.status(200).json({
        status: true,
        message: 'Hapus Jabatan berhasil!',
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