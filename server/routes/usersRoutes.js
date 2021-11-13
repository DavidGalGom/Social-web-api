const express = require("express");
const { checkUser, getUsers } = require("../controller/usersControllers");

const router = express.Router();

router.post("/", checkUser);
router.get("/", getUsers);

module.exports = router;
