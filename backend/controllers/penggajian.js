const { Penggajian, Pegawai, Jabatan, Potongan, Tunjangan } = require('../db/models');

module.exports = {
  show: async (req, res) => {
    try {
      const penggajian = await Penggajian.findAll({
        attributes: {
          exclude: ['createdAt', 'updatedAt']
        },
        include: [
          {
            model: Pegawai,
            as: 'pegawai',
            attributes: {
              exclude: ['id', 'nip', 'id_jabatan', 'createdAt', 'updatedAt']
            },
            include: [
              {
                model: Jabatan,
                as: 'jabatan',
                attributes: {
                  exclude: ['id', 'createdAt', 'updatedAt']
                },
              },
              {
                model: Tunjangan,
                as: 'tunjangan',
                attributes: {
                  exclude: ['id', 'nip_pegawai', 'createdAt', 'updatedAt']
                },
              },
              {
                model: Potongan,
                as: 'potongan',
                attributes: {
                  exclude: ['id', 'nip_pegawai', 'createdAt', 'updatedAt']
                },
              }
            ]
          }
        ]
      });

      return res.status(200).json({
        status: true,
        message: 'success',
        data: penggajian
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
  showDetail: async (req, res) => {
    try {
      const { id } = req.params;

      const penggajian = await Penggajian.findOne({
        where: { id },
        attributes: {
          exclude: ['createdAt', 'updatedAt']
        },
        include: [
          {
            model: Pegawai,
            as: 'pegawai',
            attributes: {
              exclude: ['id', 'nip', 'id_jabatan', 'createdAt', 'updatedAt']
            },
            include: [
              {
                model: Jabatan,
                as: 'jabatan',
                attributes: {
                  exclude: ['id', 'createdAt', 'updatedAt']
                },
              },
              {
                model: Tunjangan,
                as: 'tunjangan',
                attributes: {
                  exclude: ['id', 'nip_pegawai', 'createdAt', 'updatedAt']
                },
              },
              {
                model: Potongan,
                as: 'potongan',
                attributes: {
                  exclude: ['id', 'nip_pegawai', 'createdAt', 'updatedAt']
                },
              }
            ]
          }
        ]
      });

      if (!penggajian) {
        return res.status(404).json({
          status: false,
          message: 'Penggajian tidak ditemukan!',
          data: null
        });
      }

      return res.status(200).json({
        status: true,
        message: 'Success',
        data: penggajian
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
};
