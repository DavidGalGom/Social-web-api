const debug = require("debug")("users:indexDatabase");

const chalk = require("chalk");

const mongoose = require("mongoose");

const initializeMongoDBServer = (connectionString) =>
  new Promise((resolve, reject) => {
    mongoose.connect(connectionString, (error) => {
      if (error) {
        debug(chalk.red("Can't connect to the database"));
        debug(chalk.red(error.message));
        reject(error);
        return;
      }
      debug(chalk.green("Connected to the database"));
      resolve();
    });
    mongoose.set("debug", true);
    mongoose.set("toJSON", {
      virtuals: true,
      transform: (doc, ret) => {
        // eslint-disable-next-line no-underscore-dangle
        delete ret._id;
      },
    });
  });

module.exports = initializeMongoDBServer;
