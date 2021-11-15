const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  const authExist = req.header("Authorization");
  if (!authExist) {
    const error = new Error("Authorization missing");
    error.code = 401;
    next(error);
  } else {
    const token = authExist.split(" ")[1];
    if (!token) {
      const error = new Error("Token missing");
      error.code = 401;
      next(error);
    } else {
      try {
        const user = jwt.verify(token, process.env.SECRET_TOKEN);
        req.userId = user.id;
        next();
      } catch (error) {
        error.message = "Wrong token";
        error.code = 401;
        next(error);
      }
    }
  }
};

module.exports = auth;
