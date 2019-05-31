const mongoose = require('mongoose');

const URL_PATTERN = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;

const postSchema = new mongoose.Schema({
  attachments: {
    type: [{
      type: String,
      match: [URL_PATTERN, 'Invalid url pattern']
    }],
    required: true,
    validate: [validateAttachments, 'A Post needs at least one attachment']
  },
  message: {
    type: String,
    required: ['Post message is required']
  },
  hastags: {
    type: [String],
    default: []
  },
  mentions: {
    type: [String],
    default: []
  }
}, { 
  timestamps: true,
  toJSON: {
    transform: function(doc, ret) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  }
 })

function validateAttachments(attachments) {
  return attachments && attachments.length >= 1
}

postSchema.pre('save', function(next) {
  const messageWords = this.message.split(' ')
  this.hastags = messageWords
    .filter(word => word.split('#').length === 2)
  this.mentions = messageWords
    .filter(word => word.split('@').length === 2)

  next();
})

const Post = mongoose.model('Post', postSchema);
module.exports = Post;
