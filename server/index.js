const chalk = require("chalk");
const cors = require("cors");
const debug = require("debug")("users:server");
const express = require("express");
const morgan = require("morgan");
const { validate } = require("express-validation");
const {
  notFoundErrorHandler,
  generalErrorHandler,
} = require("./middlewares/error");
const usersRoutes = require("./routes/usersRoutes");
const userValidation = require("./schemas/userSchema");
const auth = require("./middlewares/auth");

const app = express();

const initializeServer = (port) =>
  new Promise((resolve, reject) => {
    const server = app.listen(port, () => {
      debug(chalk.yellow(`Listening at port number: ${port}`));
      resolve(server);
    });

    server.on("error", (error) => {
      debug(chalk.red("Error at initialize server"));
      if (error.code === "EADDRINUSE") {
        debug(chalk.red(`Port number ${port} is already in use`));
      }
      reject();
    });
    server.on("close", () => {
      debug(chalk.yellow("Express server disconnected"));
    });
  });

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use("/users", auth, validate(userValidation, {}, {}), usersRoutes);
app.use(notFoundErrorHandler);
app.use(generalErrorHandler);

module.exports = { app, initializeServer };
