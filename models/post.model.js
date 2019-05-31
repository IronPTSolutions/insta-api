const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  attachments: {
    type: [{
      type: String
    }],
    required: true,
    validate: [validateAttachments, 'A Post needs at least one attachment']
  },
  message: {
    type: String,
    required: true
  },
  hastags: {
    type: [String],
    default: []
  },
  mentions: {
    type: [String],
    default: []
  }
}, { timestamps: true })

function validateAttachments(attachments) {
  return attachments && attachments.length >= 1
}

const Post = mongoose.model('Post', postSchema);
module.exports = Post;
