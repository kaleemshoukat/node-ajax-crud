const Joi = require('joi');     //joi is validator
const Post = require('../models/Post');     //model

exports.addPost= (req, res) => {
    res.render('add-post.ejs');
}

exports.submitPost= async (req, res) => {
    try{
        // console.log(await jwt.decode(req.cookies.jwt, process.env.JWT_SECRET))

        let post=new Post()
        post.title= req.body.title
        post.description= req.body.description
        post.user_id= req.user_id
        post.save()

        res.status(200).json({
            'status':true,
            'message': "Post created successfully"
        })
    }
    catch (error) {
        res.status(200).json({
            'status':true,
            'message': "Something went wrong."
        })
    }
}

exports.posts=async (req, res, next)=> {
    res.render('posts.ejs')
}

exports.getPosts=async (req, res, next)=> {
    try {
        const body= req.body
        const offset = (body.page_num - 1) * 10;

        const search={}
        if (body.title){
            search.title={$regex: body.title, $options: 'i'}        //like query
        }
        if (body.description){
            search.description=body.description
        }
        //console.log(search)

        const results=await Post.find(search).limit(10).skip(offset);
        const total =await Post.count(search);

        res.status(200).json({
            status : true,
            message: "Success",
            data : {
                results: results,
                total: total,
                count: offset+1,
            }
        })
    }
    catch (error) {
        res.status(500).send(error);
    }
}

exports.delete= async (req, res) => {
    try{
        await Post.findByIdAndDelete(req.params.id)

        res.status(200).json({
            status: true,
            message: "Post deleted successfully!"
        })
    }
    catch (error) {
        res.status(500).json({
            status: true,
            message: "Something went wrong."
        })
    }
}

exports.updatePost= async (req, res) => {
    try{
        const post=await Post.findById(req.body.id)
        post.title=req.body.title
        post.description=req.body.description
        post.save()

        res.status(200).json({
            'status':true,
            'message': "Post updated successfully."
        })
    }
    catch (error) {
        res.status(500).send(error);
    }
}

