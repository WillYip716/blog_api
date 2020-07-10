const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var PostSchema = new Schema(
    {
        title: {type:String, required: true, max:20},
        article: {type:String, required:true },
        author: { type: Schema.Types.ObjectId, ref: "User", required: true },
        timestamp: { type: Date, default: Date.now() },
        published: {type:Boolean, default: false}
    }
);


module.exports = mongoose.model('Post', PostSchema);