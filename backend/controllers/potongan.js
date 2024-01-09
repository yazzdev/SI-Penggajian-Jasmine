const { Potongan, Pegawai } = require('../db/models');

module.exports = {
  show: async (req, res) => {
    try {
      const potongan = await Potongan.findAll({
        attributes: {
          exclude: ['createdAt', 'updatedAt']
        },
        include: [
          {
            model: Pegawai,
            as: 'pegawai',
            attributes: ['nama_pegawai']
          }
        ]
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

  update: async (req, res) => {
    try {
      const { id } = req.params;

      const updated = await Potongan.update(req.body, { where: { id: id } });

      if (updated[0] == 0) {
        return res.status(404).json({
          status: false,
          message: `Potongan not found!`,
          data: null
        });
      }

      return res.status(200).json({
        status: true,
        message: 'Potongan update successfully',
        data: null
      });
    } catch (error) {
      throw error;
    }
  }
}