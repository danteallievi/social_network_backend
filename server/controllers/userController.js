const bcrypt = require("bcrypt");

const User = require("../../DB/models/user");

const createUser = async (req, res, next) => {
  const { username, password, admin } = req.body;
  try {
    const newUser = await User.create({
      username,
      password: await bcrypt.hash(password, 10),
      admin,
    });
    res.status(201).json(newUser);
  } catch {
    const error = new Error("Error creating the user");
    next(error);
  }
};

module.exports = { createUser };
