const jwt = require("jsonwebtoken");

const jwtGenrate = (user) => {
  return new Promise((resolve, reject) => {
    try {
      let token = jwt.sign(JSON.stringify(user), process.env.JWT_SECRET);
      resolve(token);
    } catch (err) {
      reject(err);
    }
  });
};

const jwtDecode = (user, callback) => {};


module.exports = {jwtGenrate}