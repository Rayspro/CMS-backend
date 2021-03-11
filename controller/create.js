const Post = require("../model/post.model");
const Cat = require("../model/cat.model");
const Comment = require("../model/comment.model");

function createPost(req, res) {
  const { body, title, catId, des } = req.body;
  if (!body && !title && !catId && !des) {
    res.status(400).send({ msg: "Fill empty field" });
  } else {
    const newPost = new Post({
      title: title,
      body: body,
      category: catId,
      des: des,
      author: req.user.id,
    });
    newPost.save((err, data) => {
      if (err) {
        res.status(400).send({ msg: "Something went wrong" });
      } else {
        res.status(200).send({ msg: "Post created" });
      }
    });
  }
}

function createComment(req, res) {
  const { comment, postId } = req.body;
  const { id } = req.user;

  if ((!comment && !id, !postId)) {
    res.status(400).send({ msg: "Something went wrong" });
  } else {
    const newComment = new Comment({
      comment: comment,
      user: id,
    });
    newComment.save((err, com) => {
      if (!err) {
        Post.findOneAndUpdate(
          { _id: postId },
          { $push: { comment: com._id } },
          { new: true, useFindAndModify: false }
        ).then((d) => {
          if (!!d) {
            res
              .status(200)
              .send({ comment: comment, user: { name: req.user.name } });
          } else {
            res.status(400).send({ msg: "Something went wrong" });
          }
        });
      } else {
        res.status(400).send({ msg: "Something went wrong" });
      }
    });
  }
}

function createCat(req, res) {
  const { name, description } = req.body;
  const newCat = new Cat({
    name: name,
    description: description,
  });

  newCat.save((err, data) => {
    if (err) {
      res.status(400).send({ msg: "Something went wrong" });
    } else {
      res.status(200).send({ msg: "Category created" });
    }
  });
}

module.exports = { createPost, createCat, createComment };
