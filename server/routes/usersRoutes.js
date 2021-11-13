const express = require("express");
const { validate } = require("express-validation");
const { checkUser, getUsers } = require("../controller/usersControllers");
const userValidation = require("../schemas/userSchema");

const router = express.Router();

router.post("/", checkUser);
router.get("/", validate(userValidation, {}, {}), getUsers);

module.exports = router;
