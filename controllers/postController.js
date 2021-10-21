const Joi = require('joi');     //joi is validator
const Post = require('../models/Post');     //model
const paginate = require('express-paginate');

exports.addPost= (req, res) => {
    res.render('add-post.ejs');
}

exports.submitPost= async (req, res) => {
    const schema = Joi.object().keys({
        title: Joi.string().alphanum().min(3).max(30).required(),
        description: Joi.string().min(3).max(1000).required(),
    });

    // schema options
    const options = {
        abortEarly: false, // include all errors
        allowUnknown: true, // ignore unknown props
        stripUnknown: true // remove unknown props
    };

    const validation = schema.validate(req.body, options);
    if(validation.error){
        res.render("add-post.ejs", {errorMessage: validation.error, inputData: req.body});
    }
    else {
        try{
            //console.log(await jwt.decode(req.cookies['jwt'], process.env.JWT_SECRET))

            let post=new Post()
            post.title= req.body.title
            post.description= req.body.description
            post.user_id= '6151ca0000217b5b36b1ac88'
            post.save()

            res.render("add-post.ejs", {successMessage: 'Post created successfully!'});
        }
        catch (error) {
            res.status(500).send(error);
        }
    }
}

exports.posts=async (req, res, next)=> {
    // try {
    //     const posts=await Post.find({});
    //     res.render('posts.ejs', {posts: posts});
    // }
    // catch (error) {
    //     res.status(500).send(error);
    // }

    try {
        const results=await Post.find({}).limit(req.query.limit).skip(req.skip).lean().exec();
        const itemCount =await Post.count({});
        const pageCount = Math.ceil(itemCount / req.query.limit);

        res.render('posts.ejs', {
            posts: results,
            pageCount,
            itemCount,
            pages: paginate.getArrayPages(req)(3, pageCount, req.query.page)
        });
    }
    catch (error) {
        res.status(500).send(error);
    }
}

exports.delete= async (req, res) => {
    try{
        await Post.findByIdAndDelete(req.params.id)
        res.redirect('/posts')
    }
    catch (error) {
        res.status(500).send(error);
    }
}

exports.editPost= async (req, res) => {
    try{
        const post=await Post.findById(req.params.id)
        res.render('edit-post.ejs', {post: post});
    }
    catch (error) {
        res.status(500).send(error);
    }
}

exports.updatePost= async (req, res) => {
    const schema = Joi.object().keys({
        title: Joi.string().alphanum().min(3).max(30).required(),
        description: Joi.string().min(3).max(1000).required(),
    });

    // schema options
    const options = {
        abortEarly: false, // include all errors
        allowUnknown: true, // ignore unknown props
        stripUnknown: true // remove unknown props
    }

    const validation = schema.validate(req.body, options);
    if(validation.error){
        res.render("edit-post.ejs", {errorMessage: validation.error});
    }
    else {
        try{
            const post=await Post.findById(req.params.id)
            post.title=req.body.title
            post.description=req.body.description
            post.save()

            res.redirect('/posts')
        }
        catch (error) {
            res.status(500).send(error);
        }
    }
}

