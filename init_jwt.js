const JWT = require("jsonwebtoken");
require("dotenv").config();

const signAccessToken = async () => {
  const payload = {
    userId: 1,
    name: "tuetrancao",
  };

  const token = await JWT.sign(payload, process.env.KEY_ACCESS_TOKEN, {
    expiresIn: "10s",
  });
  return token;
};
const signRefreshToken = async () => {
  const payload = {
    userId: 1,
    name: "tuetrancao",
  };

  const token = await JWT.sign(payload, process.env.KEY_REFRESH_TOKEN, {
    expiresIn: "10m",
  });
  return token;
};

const verifyToken = async (req, res, next) => {
  try {
    if (req.headers["x-token"]) {
      const token = req.headers["x-token"];
      const payload = JWT.verify(token, process.env.KEY_ACCESS_TOKEN)
      req.user = payload;
      return next()
    }
  } catch (error) {
    if (error.name == "TokenExpiredError") {
      return res.status(200).json({
        code: 401,
        msg: error.message,
      });
    } else {
      return res.status(200).json({
        code: 500,
        msg: error,
      });
    }
  }
};

module.exports = {
  verifyToken,
  signAccessToken,
  signRefreshToken,
};
