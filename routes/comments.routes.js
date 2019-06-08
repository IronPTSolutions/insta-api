const express = require('express');
const router = express.Router({ mergeParams: true });
const comments = require('../controllers/comments.controller');
const posts = require('../middlewares/post.mid');
const secure = require('../middlewares/secure.mid');

router.post('/comments', secure.isAuthenticated, posts.existsPost, comments.create);
router.delete('/comments/:id', secure.isAuthenticated, posts.existsPost, comments.delete);

module.exports = router;
