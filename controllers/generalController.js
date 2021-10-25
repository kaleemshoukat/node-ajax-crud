const Joi = require('joi');     //joi is validator
const User = require('../models/User');     //model
const helper = require('../helpers/helper');     //model
const fs = require('fs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const mail = require('../config/mail');
const ejs = require('ejs');

exports.register= (req, res) => {
    res.render('auth/register.ejs', {layout: './layouts/guest'});
}

exports.submitRegister=async (req, res, next) => {

    const schema = Joi.object().keys({
        first_name: Joi.string().alphanum().min(3).max(30).required().empty().messages({
            'string.empty': 'This field cannot be empty.',
            'string.alphanum': 'This field can have Only alphabets.',
            'string.min': 'This field should have a minimum length of {#limit}.',
            'string.max': 'This field can have maximum length of {#limit}.',
            'any.required': 'This field is required.'
        }),
        last_name: Joi.string().alphanum().min(3).max(30).required().empty('').messages({
            'string.alphanum': 'This field can have Only alphabets.',
            'string.min': 'This field should have a minimum length of {#limit}.',
            'string.max': 'This field can have maximum length of {#limit}.',
            'any.required': 'This field is required.'
        }),
        user_name: Joi.string().min(3).max(30).required().empty('').messages({
            'string.min': 'This field should have a minimum length of {#limit}.',
            'string.max': 'This field can have maximum length of {#limit}.',
            'any.required': 'This field is required.'
        }), //.external(User.lookupUsername),
        email: Joi.string().min(3).max(255).required().empty('').trim(true).email().messages({
            'string.min': 'This field should have a minimum length of {#limit}.',
            'string.max': 'This field can have maximum length of {#limit}.',
            'any.required': 'This field is required.',
            'string.email': 'This field has invalid email.',
        }),
        //image: Joi.string().required(),
        gender: Joi.string().required().empty('').messages({
            'any.required': 'This field is required.',
        }),
        password: Joi.string().min(3).max(15).required().empty('').trim(true).messages({
            'string.min': 'This field should have a minimum length of {#limit}.',
            'string.max': 'This field can have maximum length of {#limit}.',
            'any.required': 'This field is required.',
        }),
        password_confirmation: Joi.any().equal(Joi.ref('password')).messages({
            'any.only': 'Invalid password confirmation.',
        }),
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
        console.log(req.file, req.body)

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
        user.password=await helper.bcrypt_password(req.body.password)
        user.save()

        res.status(200).json({
            'status':true,
            'message': "User registered successfully"
        })
    }
}

exports.login= (req, res) => {
    res.render('auth/login.ejs', {layout: './layouts/guest'});
}

exports.submitLogin= async (req, res) => {
    const user=await User.findOne({email: req.body.email})
    if (user && await helper.compare_password(req.body.password, user.password)){
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        //res.setHeader('authorization', token)    for api
        res.cookie("jwt", token, {secure: true, httpOnly: true})  //for view engines
        res.status(200).json({
            'status': true,
            'message': 'logged in user.',
        })
    }
    else{
        res.status(200).json({
            'status': false,
            'message': 'Email or password is incorrect.',
        })
    }
}

exports.home= (req, res) => {
    res.render('home.ejs')
}

exports.logout= (req, res) => {
    res.clearCookie("jwt")
    res.redirect('/login')
}

exports.forgotPassword= (req, res) => {
    res.render('auth/forgot-password.ejs', {layout: './layouts/guest'})
}

exports.submitForgotPassword= async (req, res) => {
    const user= await User.findUserByEmail(req.body.email)
    if (user){
        const token= await helper.randomStr(20)
        user.token=token
        user.save()

        // const file_path= require('../views/emails/forgot-password-email.ejs')
        // const template = await ejs.renderFile(file_path, {layout : false, token: token});
        const mainOptions = {
            from: process.env.MAIL_ADDRESS,
            to: req.body.email,
            subject: 'Forgot Password',
            html: '<h1>Click this <a href="'+process.env.APP_URL+'/reset-password/'+token+'">link</a> to rest password.</h1>'
        }

        mail.transporter.sendMail(mainOptions, (err, info) => {
            if (err) {
                console.log(err);
            } else {
                console.log('\nMessage sent: ' + info.response);
            }
        })

        res.status(200).json({
            status: true,
            message: 'Password reset link is sent to this email please check.',
        })
    }
    else {
        res.status(200).json({
            status: false,
            message: 'Email do not exist.',
        })
    }
}

exports.resetPassword= async (req, res) => {
    const user= await User.findUserByToken(req.params.token)
    if (user){
        user.token=null
        user.save()

        res.render('auth/reset-password.ejs', {layout: './layouts/guest', id: user._id})
    }
    else{
        res.redirect('/login')      //user here flah message
    }
}

exports.submitResetPassword= async (req, res, next) => {
    const user= await User.findUserByMongoID(req.body.id)
    if (user){
        user.token=null
        user.password= await helper.bcrypt_password(req.body.password)
        user.save()

        res.status(200).json({
            status: true,
            message: 'Password reset successfully please login.',
        })
    }
    else{
        res.status(200).json({
            status: false,
            message: 'Something went wrong.',
        })
    }
}




