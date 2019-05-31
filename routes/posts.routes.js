const express = require('express');
const router = express.Router();
const posts = require('../controllers/posts.controller');

router.get('/', posts.list);
router.post('/', posts.create);
router.get('/:id', posts.get);
router.delete('/:id', posts.delete);

module.exports = router;
