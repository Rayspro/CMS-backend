const Post = require("../model/post.model");
const Cat = require("../model/cat.model");

async function getAll(req, res) {
  try {
    const post = await Post.find({}, { body: 0 })
      .populate("category")
      .sort({ created_at: -1 });
    res.status(200).send(post);
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
}

async function getSinglePost(req, res) {
  const { id } = req.params;
  if (!id) {
    res.status(400).send("Something went wrong");
  } else {
    try {
      const post = await Post.findOne({ _id: id })
        .populate({
          path: "category",
          model: "categories",
          select: { name: 1, _id: 0 },
        })
        .populate({
          path: "author",
          model: "users",
          select: { name: 1, _id: 0 },
        })
        .populate({
          path: "comment",
          populate: {
            path: "user",
            model: "users",
            select: { name: 1, _id: 0 },
          },
          select: { _id: 0, __v: 0 },
        });
      res.status(200).send(post);
    } catch (err) {
      res.status(500).send("Internal Server Error");
    }
  }
}

async function getCat(req, res) {
  Cat.find({})
    .then((c) => {
      res.status(200).send(c);
    })
    .catch((err) => {
      res.status(500).send({ msg: "Internal Server Error" });
    });
}

module.exports = { getAll, getCat, getSinglePost };
