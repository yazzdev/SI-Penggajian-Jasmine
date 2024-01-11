const { Tunjangan, Pegawai, Penggajian, Jabatan } = require('../db/models');

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

  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { transport, makan, komunikasi, keahlian } = req.body;

      const tunjangan = await Tunjangan.findOne({ where: { id: id } });

      if (!tunjangan) {
        return res.status(404).json({
          status: false,
          message: `Tunjangan not found!`,
          data: null
        });
      }

      // Update data tunjangan
      tunjangan.transport = transport || tunjangan.transport;
      tunjangan.makan = makan || tunjangan.makan;
      tunjangan.komunikasi = komunikasi || tunjangan.komunikasi;
      tunjangan.keahlian = keahlian || tunjangan.keahlian;

      await tunjangan.save();

      // Update penggajian terkait
      const penggajian = await Penggajian.findOne({ where: { nip_pegawai: tunjangan.nip_pegawai } });

      if (penggajian) {
        const pegawai = await Pegawai.findOne({ where: { nip: tunjangan.nip_pegawai } });
        const jabatan = await Jabatan.findByPk(pegawai.id_jabatan);

        const total_penggajianBaru =
          tunjangan.transport + tunjangan.makan + tunjangan.komunikasi + tunjangan.keahlian;

        penggajian.total_gaji = jabatan.biaya_jabatan + total_penggajianBaru;
        penggajian.take_home_pay = penggajian.total_gaji - penggajian.total_potongan;

        await penggajian.save();
      }

      return res.status(200).json({
        status: true,
        message: 'Tunjangan update successfully',
        data: null
      });
    } catch (error) {
      throw error;
    }
  }
}