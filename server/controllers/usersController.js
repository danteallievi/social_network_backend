const User = require("../../DB/models/user");

const getUsers = async (req, res, next) => {
  try {
    const newUser = await User.find();
    res.status(200).json(newUser);
  } catch {
    const error = new Error("Error loading the users");
    next(error);
  }
};

const editUser = async (req, res, next) => {
  const { id } = req.userData;
  try {
    const user = await User.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (user) {
      res.status(200).json(user);
    } else {
      const error = new Error("User not found");
      error.code = 404;
      next(error);
    }
  } catch {
    const error = new Error("Error editing the user");
    error.code = 500;
    next(error);
  }
};

module.exports = { getUsers, editUser };
