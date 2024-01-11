const { Divisi, Jabatan } = require('../db/models');

module.exports = {
  show: async (req, res) => {
    try {
      const potongan = await Divisi.findAll({
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
  store: async (req, res) => {
    try {
      const { nama_divisi } = req.body;

      if (!nama_divisi) {
        return res.status(400).json({
          status: false,
          message: 'Nama Divisi is required!',
          data: null
        });
      }

      const divisi = await Divisi.create({ nama_divisi: nama_divisi });

      return res.status(201).json({
        status: true,
        message: 'Divisi added successfully',
        data: divisi
      });
    } catch (error) {
      throw error;
    }
  },
  update: async (req, res) => {
    try {
      const { id } = req.params;

      const updated = await Divisi.update(req.body, { where: { id: id } });

      if (updated[0] == 0) {
        return res.status(404).json({
          status: false,
          message: `Divisi not found!`,
          data: null
        });
      }

      return res.status(200).json({
        status: true,
        message: 'Divisi update successfully',
        data: null
      });
    } catch (error) {
      throw error;
    }
  },
  destroy: async (req, res) => {
    try {
      const { id } = req.params;
      const divisi = await Divisi.findOne({ where: { id } });

      if (!divisi) {
        return res.status(404).json({
          status: false,
          message: 'Divisi tidak ditemukan!',
          data: null
        });
      }

      // Hapus data Jabatan terkait
      await Jabatan.destroy({ where: { id_divisi: divisi.id } });

      await divisi.destroy();

      return res.status(200).json({
        status: true,
        message: 'Hapus divisi berhasil!',
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