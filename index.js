const express = require("express");
require("dotenv").config();
const app = express();
const http = require("http").Server(app);
const mongoose = require("mongoose");
const { MongoURL } = require("./config");
const cors = require("cors");
const path = require("path");

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true}));
app.use(express.static(path.join(__dirname, "public")));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

//Middleware for cors...
app.use(cors());

//Database connection...
const connection = mongoose.connect(MongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

connection
  .then((success) => {
    console.log("Database Connected");
  })
  .catch((err) => {
    console.log(err);
  });

const Auth = require("./routes/authentication/auth.routes");
const Post = require("./routes/post/post.routes");

app.use("/auth", Auth);
app.use("/post", Post);

app.get("/", (req, res) => {
  //console.log(req)
  res.send("Server connected");
});

http.listen(process.env.PORT || process.env.SERVER_PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Server Connected");
  }
});
