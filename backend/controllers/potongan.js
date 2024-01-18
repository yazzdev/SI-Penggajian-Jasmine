const { Potongan, Pegawai, Penggajian } = require('../db/models');

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
  showOne: async (req, res) => {
    try {
      const { id } = req.params;

      const potongan = await Potongan.findOne({
        where: { id: id },
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

      if (!potongan) {
        return res.status(404).json({
          status: false,
          message: 'Potongan tidak ditemukan!',
          data: null
        });
      }

      return res.status(200).json({
        status: true,
        message: 'Success',
        data: potongan
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
      const { id } = req.params;
      const { makan, zakat, absensi, transport, pinjaman_pegawai, lain_lain } = req.body;

      const potongan = await Potongan.findOne({where:{id:id}});

      if (!potongan){
        return res.status(404).json({
          status: false,
          message: `Potongan tidak ditemukan!`,
          data: null
        });
      }

      // Update data potongan
      potongan.makan = makan || potongan.makan;
      potongan.zakat = zakat || potongan.zakat;
      potongan.absensi = absensi || potongan.absensi;
      potongan.transport = transport || potongan.transport;
      potongan.pinjaman_pegawai = pinjaman_pegawai || potongan.pinjaman_pegawai;
      potongan.lain_lain = lain_lain || potongan.lain_lain;

      await potongan.save();

      // Update penggajian terkait
      const penggajian = await Penggajian.findOne({ where: { nip_pegawai: potongan.nip_pegawai } });

      if (penggajian) {
        const total_potonganBaru =
          potongan.makan + potongan.zakat + potongan.absensi + potongan.transport + potongan.pinjaman_pegawai + potongan.lain_lain;

        penggajian.total_potongan = total_potonganBaru;
        penggajian.take_home_pay = penggajian.total_gaji - total_potonganBaru;

        await penggajian.save();
      }

      return res.status(200).json({
        status: true,
        message: 'Potongan Berhasil di Ubah!',
        data: null
      });
    } catch (error) {
      throw error;
    }
  }
}