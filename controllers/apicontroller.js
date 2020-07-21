
var Post = require('../models/post');
var Comment = require('../models/comment');

exports.post_list = function(req,res,next){

    Post.find({}).exec(
        function(err,result){
            if (err) { return next(err); }
            res.json(result);
        }
    )
};

exports.single_post = function(req,res,next){

    Post.findById(req.params.id).exec(
        function(err,result){
            if(err){return next(err);}
            res.json(result);
        }
    );
};

exports.post_comments = function(req,res,next){
    Comment.find({ post: req.params.id }).exec(
        function(err,result){
            if(err){return next(err);}
            res.json(result);
        }
    );
};




exports.create_post = function(req,res,next){

    var post = new Post({
        title: req.body.title,
        article: req.body.content,
        author: req.body.id,
        timestamp: Date.now(),
        published: false
    }).save(function(err, savedpost) {
        if (err) {
            return next(err);
        }
        res.status(200).json(savedpost);
    });
};


exports.create_comment = function(req,res,next){

    var comment = new Comment({
        content: req.body.content,
        author: req.body.author,
        timestamp: Date.now(),
        post: req.params.id
    }).save(function(err, savedcomment) {
        if (err) {
            return next(err);
        }
        res.status(200).json(savedcomment);
    });
};


exports.update_post = function(req,res,next){


    Post.findById(req.params.id).exec(function(err,result){
        if (err) { return next(err); }
        if (result==null) { // No results.
            return res.status(401).json({ error: 'Blog post not found' });
        }
        result.title = req.body.title;
        result.article = req.body.content;

        result.save(function(err1) {
            if(err1){return next(err);}
            res.json(result)
        });
    });
};


exports.publish_post = function(req,res,next){

    Post.findById(req.params.id).exec(function(err,result){
        if (err) { return next(err); }
        if (result==null) { // No results.
            return res.status(401).json({ error: 'Blog post not found' });
        }
        result.published = true;

        result.save(function(err1) {
            if(err1){return next(err);}
            res.json(result)
        });
    });
};

exports.delete_post = function(req,res,next){

    Comment.deleteMany({ post: req.params.id }).exec(function(err){
        if (err) { return next(err); }
        Post.findByIdAndRemove(req.params.id,function(err1){
            if (err1) { return res.json(err); }
            return res.json({ msg: 'Blog deleted' })
        })
    });
};