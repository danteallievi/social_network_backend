const express = require("express");
const { validate } = require("express-validation");

const { userRegisterSchema } = require("../schemas/userSchema");
const { createUser } = require("../controllers/userController");

const router = express.Router();

router.post("/register", validate(userRegisterSchema), createUser);

module.exports = router;
