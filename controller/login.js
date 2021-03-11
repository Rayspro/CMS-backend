const User = require("../model/user.model");
const { jwtGenrate } = require("../utils/jwt");
const { compare } = require("../utils/passwordCompare");

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email: email });
    if (!!user) {
      if (user.verified) {
        await compare(password, user.password);
        let token = await jwtGenrate({
          name: user.name,
          email: user.email,
          password: user.password,
        });
        user.token = token;
        user.save((err, data) => {
          if (err) {
            res.status(500).send({ msg: "Internal Server Error" });
          } else {
            res.status(200).send({ token: token });
          }
        });
      } else {
        res.status(400).send({ msg: "Please verify first" });
      }
    } else {
      res.status(400).send({ msg: "Please register first" });
    }
  } catch (err) {
    if (err.code === 401) {
      res.status(401).send({ msg: "Unauthorized Access" });
    } else {
      res.status(500).send({ msg: "Internal Server Error" });
    }
  }
};

module.exports = login;
