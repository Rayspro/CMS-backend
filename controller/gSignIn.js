const { OAuth2Client } = require("google-auth-library");
const User = require("../model/user.model");

async function VarifyGToken(req, res) {
  const { tokenId } = req.body;
  const client = new OAuth2Client(process.env.G_SIGN_CLIENT_ID);

  try {
    const ticket = await client.verifyIdToken({
      idToken: tokenId,
      audience: process.env.G_SIGN_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    User.findOne({ email: payload.email }).then((user) => {
      if (!!user) {
        user.token = tokenId;
        user.clientLoginType = "Google";
        user.save((err, user) => {
          if (err) {
            res.status(500).send({ msg: "Internal Server Error" });
          } else {
            res.status(200).send({ token: tokenId });
          }
        });
      } else {
        var userObj = {};
        userObj = {
          name: payload.name,
          avatar: payload.picture,
          email: payload.email,
          token: tokenId,
          verified: true,
          clientLoginType: "Google",
        };
        const newUser = new User(userObj);

        newUser.save((err, user) => {
          if (err) {
            res.status(500).send({ msg: "Internal Server Error" });
          } else {
            res.status(200).send({ token: tokenId });
          }
        });
      }
    });
  } catch (err) {
    console.error("Error", err);
    res.status(400).send({ msg: "Something Went Wrong" });
  }
}

module.exports = VarifyGToken;
