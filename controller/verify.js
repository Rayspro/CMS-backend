const User = require("../model/user.model");
const { compare } = require("../utils/passwordCompare");

const verify = async (req, res) => {
  const { link } = req.query;
  try {
    let user = await User.findOne({ activation_code: link });
    let flag = await compare(user.email, link);
    if (flag.code === 200) {
      user.verified = true;
      user.save((err, user) => {
        if (err) {
          res.status(400).render("index",{status:"failed"});
        } else {
          res.status(200).render("index",{status:"successfull",link:req.headers.origin});
        }
      });
    } else {
      throw Error({ msg: "Something Went Wrong", code: 400 });
    }
  } catch (err) {
    res.status(500).send({ msg: "Internal Server Error" });
  }
};

module.exports = verify;
