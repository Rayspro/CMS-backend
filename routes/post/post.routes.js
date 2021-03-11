const express = require("express");
const app = express.Router();
const Authentication = require("../../middleware/authenticate");
const {
  createPost,
  createCat,
  createComment,
} = require("../../controller/create");
const { getAll, getCat, getSinglePost } = require("../../controller/getPost");

app.post("/create", Authentication, createPost);

app.post("/createCat", Authentication, createCat);

app.post("/createComment", Authentication, createComment);

app.get("/getSinglePost/:id", getSinglePost);

app.get("/getCategory", getCat);

app.get("/getAll", getAll);

module.exports = app;
