const createError = require('http-errors');
const Comment = require('../models/comment.model');

module.exports.create = (req, res, next) => {
  const comment = new Comment({
    text: req.body.text,
    post: req.params.postId
  });
  comment.save()
    .then(() => res.status(201).json(comment))
    .catch(next);
}
