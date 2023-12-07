const { Role } = require('../../db/models');

module.exports = {
  store: async (req, res) => {
    try {
      const { name, description } = req.body;
      if (!name) {
        return res.status(400).json({
          status: false,
          message: 'role name is required!',
          data: null
        });
      }

      const role = await Role.findOne({ where: { name } });
      if (role) {
        return res.status(400).json({
          status: false,
          message: `role ${name} is already exist!`,
          data: role
        });
      }

      const newRole = await Role.create({ name, description });
      return res.status(201).json({
        status: true,
        message: `role ${name} created!`,
        data: newRole
      });

    } catch (error) {
      throw error;
    }
  },

  index: async (req, res) => {
    try {
      const roles = await Role.findAll();
      return res.status(200).json({
        status: false,
        message: `success`,
        data: roles
      });
    } catch (error) {
      throw error;
    }
  },

  show: async (req, res) => {
    try {
      const { id } = req.params;
      const role = await Role.findOne({ where: { id } });
      if (!role) {
        return res.status(404).json({
          status: false,
          message: `role with id ${id} is not exist!`,
          data: null
        });
      }

      return res.status(200).json({
        status: false,
        message: `success`,
        data: role
      });
    } catch (error) {
      throw error;
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;

      const updated = await Role.update(req.body, { where: { id: id } });

      if (updated[0] == 0) {
        return res.status(404).json({
          status: false,
          message: `Role not found!`,
          data: null
        });
      }

      return res.status(200).json({
        status: true,
        message: 'Role update successfully',
        data: null
      });
    } catch (error) {
      throw error;
    }
  },

  destroy: async (req, res) => {
    try {
      const { id } = req.params;

      const deleted = await Role.destroy({ where: { id: id } });

      if (!deleted) {
        return res.status(404).json({
          status: false,
          message: `Role not found!`,
          data: null
        });
      }

      return res.status(200).json({
        status: true,
        message: 'Role deleted successfully',
        data: null
      });
    } catch (error) {
      throw error;
    }
  }
};
