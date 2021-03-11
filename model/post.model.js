const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const post = new Schema(
  {
    title: {
      type: String,
      require: true,
    },
    body: {
      type: String,
      require: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "categories",
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    created_at: {
      type: Date,
      default: Date.now,
      index: true,
    },
    des: {
      type: String,
    },
    comment: [
      {
        type: Schema.Types.ObjectId,
        ref: "comments",
      },
    ],
  },
  // {
  //   timestamps: {
  //     createdAt: "created_at",
  //     updatedAt: "updated_at",
  //   },
  // }
);

module.exports = mongoose.model("post", post);
