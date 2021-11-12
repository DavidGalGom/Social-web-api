const debug = require("debug")("robots:errors");
const { ValidationError } = require("express-validation");

const notFoundErrorHandler = (req, res) => {
  res.status(404).json({ error: "Endpoint not found" });
};

// eslint-disable-next-line no-unused-vars
const generalErrorHandler = (error, req, res, next) => {
  if (error instanceof ValidationError) {
    error.code = 400;
    error.message = "Validation error";
  }
  debug("A wild error appears: ", error.message);
  const message = error.code ? error.message : "Fatal error";
  res.status(error.code || 500).json({ error: message });
};

module.exports = {
  notFoundErrorHandler,
  generalErrorHandler,
};
