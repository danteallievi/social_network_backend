const express = require("express");
// const { validate } = require("express-validation");
const { getUsers, editUser } = require("../controllers/usersController");
const checkAuthorization = require("../../middleware/checkAuthorization");

const router = express.Router();

router.get("/", checkAuthorization, getUsers);
router.put("/", checkAuthorization, editUser);

module.exports = router;
