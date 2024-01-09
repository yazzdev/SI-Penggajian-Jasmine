const { Tunjangan, Pegawai } = require('../db/models');

module.exports = {
  show: async (req, res) => {
    try {
      const tunjangan = await Tunjangan.findAll({
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
        data: tunjangan
      });
    } catch (error) {
      throw error;
    }
  },
  store: async (req, res) => {
    try {
      const { transport, makan, komunikasi, keahlian, nip_pegawai } = req.body;

      const transportValue = transport || 0;
      const makanValue = makan || 0;
      const komunikasiValue = komunikasi || 0;
      const keahlianValue = keahlian || 0;

      const nip = await Pegawai.findOne({ where: { nip: nip_pegawai } });
      if (!nip) {
        return res.status(404).json({
          status: false,
          message: `nip not does not exist!!`,
          data: null
        })
      }

      if(nip) {
        return res.status(401).json({
          status: false,
          message: `you already create tunjangan for nip ${nip_pegawai}`,
          data:null
        })
      }

      const tunjangan = await Tunjangan.create({
        transport: transportValue,
        makan: makanValue,
        komunikasi: komunikasiValue,
        keahlian: keahlianValue,
        nip_pegawai: nip_pegawai
      });

      return res.status(201).json({
        status: true,
        message: 'Tunjangan added successfully',
        data: tunjangan
      });
    } catch (error) {
      return res.status(500).json({
        status: false,
        message: 'Internal Server Error',
        data: null
      });
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;

      const updated = await Tunjangan.update(req.body, { where: { id: id } });

      if (updated[0] == 0) {
        return res.status(404).json({
          status: false,
          message: `Tunjangan not found!`,
          data: null
        });
      }

      return res.status(200).json({
        status: true,
        message: 'Tunjangan update successfully',
        data: null
      });
    } catch (error) {
      throw error;
    }
  },
  destroy: async (req, res) => {
    try {
      const { id } = req.params;

      const deleted = await Tunjangan.destroy({ where: { id: id } });

      if (!deleted) {
        return res.status(404).json({
          status: false,
          message: `Tunjangan not found!`,
          data: null
        });
      }

      return res.status(200).json({
        status: true,
        message: 'Tunjangan deleted successfully',
        data: null
      });
    } catch (error) {
      throw error;
    }
  }
}