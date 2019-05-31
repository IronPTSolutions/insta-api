const Post = require('../models/post.model');

module.exports.list = (req, res, next) => {
  Post.find()
    .then(posts => res.json(posts))
    .catch(next)
}

module.exports.create = (req, res, next) => {
  const post = new Post(req.body);
  post.save()
    .then(post => res.status(201).json(post))
    .catch(next)
}

