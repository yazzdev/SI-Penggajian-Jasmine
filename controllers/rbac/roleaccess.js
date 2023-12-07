const { Role, Module, RoleAccess } = require('../../db/models');

module.exports = {
  store: async (req, res) => {
    try {
      const { role_id, module_id, is_read, is_write, is_update, is_delete } = req.body;
      if (!role_id || !module_id || is_read == undefined || is_write == undefined || is_update == undefined || is_delete == undefined) {
        return res.status(400).json({
          status: false,
          message: 'bad request!',
          data: null
        });
      }

      const roleAccess = await RoleAccess.findOne({ where: { role_id, module_id } });
      if (roleAccess) {
        return res.status(400).json({
          status: false,
          message: `role access is already exist!`,
          data: roleAccess
        });
      }
      const role = await Role.findOne({ where: { id: role_id } });
      if (!role) {
        return res.status(400).json({
          status: false,
          message: `role with id ${role_id} is not exist!`,
          data: null
        });
      }
      const module = await Module.findOne({ where: { id: module_id } });
      if (!module) {
        return res.status(400).json({
          status: false,
          message: `module with id ${module_id} is not exist!`,
          data: null
        });
      }

      const newRoleAccess = await RoleAccess.create({ role_id, module_id, is_read, is_write, is_update, is_delete });
      return res.status(201).json({
        status: true,
        message: `role access created!`,
        data: newRoleAccess
      });

    } catch (error) {
      throw error;
    }
  },

  index: async (req, res) => {
    try {
      const roleAccess = await RoleAccess.findAll();
      return res.status(200).json({
        status: false,
        message: `success`,
        data: roleAccess
      });
    } catch (error) {
      throw error;
    }
  },

  show: async (req, res) => {
    try {
      const { id } = req.params;
      const roleAccess = await RoleAccess.findOne({ where: { id } });
      if (!roleAccess) {
        return res.status(404).json({
          status: false,
          message: `role access with id ${id} is not exist!`,
          data: null
        });
      }

      return res.status(200).json({
        status: false,
        message: `success`,
        data: roleAccess
      });
    } catch (error) {
      throw error;
    }
  }
};
