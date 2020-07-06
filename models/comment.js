const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var CommentSchema = new Schema(
    {
        content: {type:String, required:true },
        author: {type:String, required:true },
        timestamp: { type: Date, default: Date.now() },
        post: { type: Schema.Types.ObjectId, ref: "Post", required: true },
    }
);


module.exports = mongoose.model('Comment', CommentSchema);