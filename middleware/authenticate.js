const User = require("../model/user.model");

module.exports = async (req, res, next) => {
  console.log("authentication Mode");
  const { token } = req.headers;
  try {
    let user = await User.findOne({ token: token });
    console.log(user)
    if (!!user) {
      req = Object.assign(req, { user: user });
      next();
    } else {
      res.status(401).send({ msg: "Unauthorized access" });
    }
  } catch (err) {
    res.status(401).send({ msg: "Unauthorized access" });
  }
};
