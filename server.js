const express = require("express");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 3001;
const {
  verifyToken,
  signAccessToken,
  signRefreshToken,
} = require("./init_jwt");

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});


// api demo login 
app.get("/api/login", async(req, res) => {
  return res.status(200).json({
    status: "success",
    elements: {
      token: await signAccessToken(),
      refreshToken: await signRefreshToken()
    },
  });
});
// api demo get user list 
app.get("/api/users", verifyToken ,(req, res) => {
  return res.status(200).json({
    status: "success",
    elements: [{ name: "tran" }, { name: "cao" }, { name: "tue" }],
  });
});

// api demo get new Token  when token expired
app.get("/api/refreshToken", async(req, res) => {
  return res.status(200).json({
    status: "success",
    elements: {
      accessToken: await signAccessToken(),
    },
  });
});

//end api
app.listen(PORT, () => {
  console.log(`Server listen in port :::: ${PORT}`);
});
