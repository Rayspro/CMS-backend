const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const user = new Schema(
  {
    name: {
      type: String,
    },
    clientLoginType:{
      type:String
    },
    email: {
      type: String,
    },
    avatar: {
      type: String,
    },
    password: {
      type: String,
    },
    token: {
      type: String,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    activation_code: {
      type: String,
      default: "0",
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

module.exports = mongoose.model("users", user);
