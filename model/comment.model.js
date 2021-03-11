const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const comment = new Schema(
  {
    comment: {
      type: String,
      require: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref:"users"
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

module.exports = mongoose.model("comments", comment);
