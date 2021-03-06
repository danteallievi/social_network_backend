const { Schema, model, Types } = require("mongoose");

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    default:
      "https://cdns.iconmonstr.com/wp-content/assets/preview/2012/240/iconmonstr-user-14.png",
  },
  friends: [
    {
      type: [Types.ObjectId],
      ref: "User",
      default: [],
    },
  ],
  enemies: [
    {
      type: [Types.ObjectId],
      ref: "User",
      default: [],
    },
  ],
});

const User = model("User", userSchema, "Users");

module.exports = User;
