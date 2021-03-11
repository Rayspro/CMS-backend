const User = require("../model/user.model");
const { passwordCheck, emailCheck } = require("../utils/validator.util");
const { genHash } = require("../utils/passwordCompare");
const MAIL_SERVER = "https://server143.herokuapp.com";
const axios = require("axios");

const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    await emailCheck(email);
    await passwordCheck(password);
    User.findOne({ email: email }).then(async (d) => {
      if (!!d) {
        res.status(400).send({ msg: "User Already Exist" });
      } else {
        hash = await genHash(password);
        let link = await genHash(email);
        let body = {
          email: email,
          redirectLink: `${process.env.NETWORK_TYPE}://${req.headers.host}/auth/verify?link=${link}`,
          app: "CMS",
        };
        try {
          await axios.post(`${MAIL_SERVER}/mail`, body);

          const user = User({
            email: email,
            name: name,
            password: hash,
            activation_code: link,
          });
          user.save((err, user) => {
            console.log(err, user);
            if (err) {
              res.status(500).send({ msg: "Internal Server Error" });
            } else {
              res.status(200).send({
                msg: "Account activation link send to your registered email",
              });
            }
          });
        } catch (err) {
          console.log(err);
          res.status(500).send({ msg: "Internal Server Error" });
        }
      }
    });
  } catch (err) {
    console.log("Error", err);
    res.status(500).send({ msg: "Internal Server Error2" });
  }
};

module.exports = register;
