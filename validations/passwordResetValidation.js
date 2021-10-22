const Joi = require('joi');     //joi is validator
const multer  = require('multer');
const upload = multer({ dest: 'uploads/'});
const fs = require('fs');

const passwordResetValidation = async (req, res, next) => {
    //console.log(req.body);

    const schema = Joi.object().keys({
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
module.exports = passwordResetValidation;