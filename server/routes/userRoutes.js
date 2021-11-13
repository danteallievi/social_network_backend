const express = require("express");
const { validate } = require("express-validation");

const {
  userRegisterSchema,
  userLoginSchema,
} = require("../schemas/userSchema");
const { createUser, loginUser } = require("../controllers/userController");

const router = express.Router();

router.post("/register", validate(userRegisterSchema), createUser);
router.post("/login", validate(userLoginSchema), loginUser);

module.exports = router;
