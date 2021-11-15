const User = require("../../DB/models/user");

const getUsers = async (req, res, next) => {
  const { id } = req.userData;
  try {
    const newUser = await User.find({ _id: { $ne: id } });
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

const deleteUser = async (req, res, next) => {
  const { id } = req.userData;
  try {
    const user = await User.findByIdAndDelete(id);
    if (user) {
      res.status(200).json(user);
    } else {
      const error = new Error("User to delete not found");
      error.code = 404;
      next(error);
    }
  } catch {
    const error = new Error("Error deleting the user");
    error.code = 500;
    next(error);
  }
};

const addFriend = async (req, res, next) => {
  const friend = req.body;
  const { id: myUserId } = req.userData;

  try {
    const myUser = await User.findById(myUserId);
    const friendToAdd = await User.findById(friend.id);

    if (!friendToAdd) {
      const error = new Error("Could not find the friend to add.");
      error.code = 404;
      next(error);
    } else {
      myUser.friends = [...myUser.friends, friendToAdd.id];
      await myUser.save(myUser);

      res.status(201).json({
        status: "success",
        user: friendToAdd.id,
      });
    }
  } catch {
    const error = new Error("Could not add friend.");
    error.code = 500;
    next(error);
  }
};

const getFriends = async (req, res, next) => {
  const { id: myUserId } = req.userData;

  try {
    const user = await User.findById(myUserId).populate({
      path: "friends",
      select: "name",
    });

    if (!user) {
      const error = new Error("User not found.");
      error.code = 404;
      next(error);
    } else {
      res.json(user);
    }
  } catch (error) {
    error.code = 400;
    error.message = "General pete getFriends";
    next(error);
  }
};

module.exports = { getUsers, editUser, deleteUser, getFriends, addFriend };
