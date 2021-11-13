require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../database/models/user");

const checkUser = async (req, res, next) => {
  const { userName, password } = req.body;
  const user = await User.findOne({ userName });
  if (!user) {
    const error = new Error("Authentication failed");
    error.code = 401;
    next(error);
  } else {
    const currentPassword = await bcrypt.compare(password, user.password);
    if (!currentPassword) {
      const error = new Error("Authentication failed");
      error.code = 401;
      next(error);
    } else {
      const token = jwt.sign(
        {
          id: user.id,
          name: user.name,
        },
        process.env.SECRET_TOKEN,
        {
          expiresIn: 24 * 60 * 60,
        }
      );
      res.json({ token });
    }
  }
};

const getUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

module.exports = {
  checkUser,
  getUsers,
};
