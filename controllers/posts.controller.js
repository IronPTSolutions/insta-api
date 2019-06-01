const createError = require('http-errors');
const Post = require('../models/post.model');
const MAX_POST = 200;

module.exports.list = (req, res, next) => {
  Post.find()
    .sort({ createdAt: -1 })
    .limit(MAX_POST)
    .then(posts => res.json(posts))
    .catch(next)
}

module.exports.create = (req, res, next) => {
  const post = new Post({
    attachments: req.body.attachments,
    message: req.body.message
  });
  post.save()
    .then(post => res.status(201).json(post))
    .catch(next)
}

module.exports.get = (req, res, next) => {
  Post.findById(req.params.id)
    .then(post => {
      if (!post) {
        throw createError(404, 'Post not found')
      } else {
        res.json(post)
      }
    })
    .catch(next)
}

module.exports.update = (req, res, next) => {
  Post.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true, runValidators: true })
    .then(post => {
      if (!post) {
        throw createError(404, 'Post not found')
      } else {
        res.json(post)
      }
    })
    .catch(next)
}

module.exports.delete = (req, res, next) => {
  Post.findByIdAndDelete(req.params.id)
    .then(post => {
      if (!post) {
        throw createError(404, 'Post not found')
      } else {
        res.status(204).json();
      }
    })
    .catch(next)
}
