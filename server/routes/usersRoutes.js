const express = require("express");
const { validate } = require("express-validation");
const { checkUser, getUsers } = require("../controller/usersControllers");
const userValidation = require("../schemas/userSchema");

const router = express.Router();

router.post("/", validate(userValidation, {}, {}), checkUser);
router.get("/", getUsers);

module.exports = router;
