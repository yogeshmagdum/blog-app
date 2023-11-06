const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const PostSchema = new Schema({
    title: {type: String},
    description: {type: String},
    author: {type: Object}
}, {timestamps: true,});

const PostModel = model('Post', PostSchema);

module.exports = PostModel;