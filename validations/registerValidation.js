const Joi = require('joi');     //joi is validator
const multer  = require('multer');
const upload = multer({ dest: 'uploads/'});
const fs = require('fs');

const registerValidation = async (req, res, next) => {
    const schema = Joi.object().keys({
        first_name: Joi.string().alphanum().min(3).max(30).required(),
        last_name: Joi.string().alphanum().min(3).max(30).required(),
        user_name: Joi.string().min(3).max(30).required(),
        email: Joi.string().min(3).max(255).required().trim(true),
        image: Joi.string().required(),
        gender: Joi.string().required(),
        password: Joi.string().min(3).max(15).required().trim(true),
        password_confirmation: Joi.string().min(3).max(15).required().valid(Joi.ref('password'))
    });

    // schema options
    const options = {
        abortEarly: false, // include all errors
        allowUnknown: true, // ignore unknown props
        stripUnknown: true // remove unknown props
    };

    const validation = schema.validate(req.body, options);
    if(validation.error){
        res.status(422).json({
            'status':false,
            'message': null,
            errors: validation.error
        })
    }
    else {
        next();
    }
};
module.exports = registerValidation;