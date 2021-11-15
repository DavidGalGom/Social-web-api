const express = require("express");
const { checkUser, getUsers } = require("../controller/usersControllers");
const auth = require("../middlewares/auth");

const router = express.Router();

router.post("/", checkUser);
router.get("/", auth, getUsers);

module.exports = router;
