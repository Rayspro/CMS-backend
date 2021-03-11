const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cat = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

module.exports = mongoose.model("categories", cat);
