const bcrypt = require("bcryptjs");

const compare = (password, hash) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hash, function (err, res) {
      if (err) {
        reject(err);
      } else {
        if (res) {
          resolve({ msg: "Valid Password", code: 200 });
        } else {
          reject({ msg: "Invalid Password", code: 401 });
        }
      }
    });
  });
};

const genHash = (password) => {
  return new Promise((resolve, reject) => {
    try {
      var salt = bcrypt.genSaltSync(10);
      var hash = bcrypt.hashSync(password, salt);
      resolve(hash);
    } catch (err) {
      reject(err);
    }
  });
};

module.exports = { compare, genHash };
