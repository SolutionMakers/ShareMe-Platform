require("dotenv").config();
const jwt = require("jsonwebtoken");
const authentication = (req, res, next) => {
  let token = req.headers.authorization;

  if (token) {
    token = req.headers.authorization.split(" ")[1];
  }

  jwt.verify(token, process.env.SECRET, (err, result) => {
    if (err) {
      if (err.message == "jwt expired") {
        return res.status(403).json({
          success: false,
          message: "The Token is invalid or expired",
        });
      }

      if (err.message == "jwt must be provided") {
        return res.status(403).json({
          success: false,
          message: "Forbidden",
        });
      }
    }

    if (result) {
      req.token = result;
      
      next();
    }
  });
};

module.exports = {
  authentication,
};
