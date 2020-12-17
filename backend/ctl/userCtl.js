const userDAO = require("../dao/userDAO");

class UserCtl {
  // List of all users
  getUsersList = function (req, res) {
    userDAO
      .list()
      .then((rs) => {
        res.json(rs);
      })
      .catch((err) => {
        res.json({
          success: false,
          message: err,
        });
      });
  };

  // Create a new users
  createUser = function (req, res) {
    userDAO
      .create(req.body)
      .then((rs) => {
        const resp = {
          success: true,
          message: "User has been added successfully.",
        };
        res.json(resp);
      })
      .catch((err) => {
        res.json({
          success: false,
          message: err,
        });
      });
  };

  // Update a users
  updateUser = function (req, res) {
    userDAO
      .update(req.params.id, req.body)
      .then((rs) => {
        const resp = {
          success: true,
          message: "User has been updated successfully.",
        };
        res.json(resp);
      })
      .catch((err) => {
        res.json({
          success: false,
          message: err,
        });
      });
  };

  // Get a specific users
  getUser = function (req, res) {
    userDAO
      .get(req.params.id)
      .then((rs) => {
        res.json(rs);
      })
      .catch((err) => {
        res.json({
          success: false,
          message: err,
        });
      });
  };

  // Delete a users
  deleteUser = function (req, res) {
    userDAO
      .del(req.params.id)
      .then((rs) => {
        const resp = {
          success: true,
          message: "User has been removed successfully.",
        };
        res.json(resp);
      })
      .catch((err) => {
        res.json({
          success: false,
          message: err,
        });
      });
  };

  // authenticate a specific users
  userAuth = function (req, res) {
    userDAO
      .authenticate(req.body)
      .then((rs) => {
        if (rs[0]) {
          const resp = {
            success: true,
            message: "User login successful.",
          };
          res.json(resp);
        } else {
          const resp = {
            success: false,
            message: "Invalid email / password.",
          };
          res.json(resp);
        }
      })
      .catch((err) => {
        res.json({
          success: false,
          message: err,
        });
      });
  };
}

module.exports = new UserCtl();
