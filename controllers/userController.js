const User = require('../models/User');     //model


exports.users=async (req, res, next)=> {
    res.render('users.ejs')
}

exports.list=async (req, res, next)=> {
    try {
        const body= req.body
        const offset = (body.page_num - 1) * 10;

        const search={}
        if (body.name){
            search.full_name={$regex: body.name, $options: 'i'}        //like query
        }
        if (body.user_name){
            search.user_name={$regex: body.user_name, $options: 'i'}        //like query
        }
        // console.log(search)

        const results=await User.find(search).limit(10).skip(offset);
        const total =await User.count(search);

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