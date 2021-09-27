const Joi = require('joi');     //joi is validator
const User = require('../models/User');     //model
const helper = require('../helpers/helper');     //model
const fs = require('fs');

exports.register= (req, res) => {
    res.render('auth/register.ejs', {layout: './layouts/guest'});
}

exports.submitRegister=async (req, res, next) => {

    const schema = Joi.object().keys({
        first_name: Joi.string().alphanum().min(3).max(30).required(),
        last_name: Joi.string().alphanum().min(3).max(30).required(),
        user_name: Joi.string().min(3).max(30).required(), //.external(User.lookupUsername),
        email: Joi.string().min(3).max(255).required().trim(true).email(),
        //image: Joi.string().required(),
        gender: Joi.string().required().valid('Male', 'Female'),
        password: Joi.string().min(3).max(15).required().trim(true),
        password_confirmation: Joi.string().min(3).max(15).required().valid(Joi.ref('password'))
    });

    // schema options
    const options = {
        abortEarly: false, // include all errors
        allowUnknown: true, // ignore unknown props
        stripUnknown: true // remove unknown props
    };

    const validation = schema.validate(req.body, options);      //validateAsync
    if(validation.error){
        res.status(422).json({
            'status':false,
            'message': null,
            errors: validation.error
        })
    }
    else{
        //console.log(req.file, req.body)

        var tmp_path = req.file.path;
        var file_name= req.file.originalname;
        var target_path = './public/uploads/' + file_name;
        var src = fs.createReadStream(tmp_path);
        var dest = fs.createWriteStream(target_path);
        await src.pipe(dest);

        const user =new User();
        user.first_name=req.body.first_name;
        user.last_name=req.body.last_name;
        user.user_name=req.body.user_name;
        user.email=req.body.email;
        user.image=file_name;
        user.gender=req.body.gender;
        user.password=helper.bcrypt_password(req.body.password);
        user.save()

        res.status(200).json({
            'status':true,
            'message': "User registered successfully"
        })
    }
}

exports.login= (req, res) => {
    res.render('auth/login.ejs');
}

exports.submitLogin= (req, res) => {
    //
}

exports.home= (req, res) => {
    res.render('home.ejs');
}

