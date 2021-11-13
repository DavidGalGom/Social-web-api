require("dotenv").config();
const bcrypt = require("bcrypt");
const { initializeServer } = require("./server/index");
const initializeMongoDBServer = require("./database/index");
const User = require("./database/models/user");

const port = process.env.PORT || process.env.LOCAL_PORT || 5000;

(async () => {
  await initializeServer(port);
  await initializeMongoDBServer(process.env.MONGODB_STRING);
})();

(async () => {
  User.create({
    name: "David",
    username: "Davidgg",
    password: await bcrypt.hash("1234abcd", 10),
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvOEO4KICY198px42yFgVLsmMwrKtqMUnTbw&usqp=CAU",
    enemies: [],
    friends: [],
    bio: "Hi everyone",
  });
})();
