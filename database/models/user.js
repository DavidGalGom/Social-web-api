const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    default:
      "https://img1.freepng.es/20180330/rkq/kisspng-final-fantasy-x-2-final-fantasy-vii-final-fantasy-monk-5abefedadd4921.4653884615224665229064.jpg",
  },
  bio: {
    type: String,
    default: "Hi to everyone",
  },
});

const User = model("User", userSchema, "Users");

module.exports = User;
