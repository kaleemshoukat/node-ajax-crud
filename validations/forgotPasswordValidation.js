const Joi = require('joi');     //joi is validator

const forgotPasswordValidation = async (req, res, next) => {
    //console.log(req.body);

    const schema = Joi.object().keys({
        email: Joi.string().max(255).required().empty('').trim(true).email().messages({
            'string.max': 'This field can have maximum length of {#limit}.',
            'any.required': 'This field is required.',
            'string.email': 'This field has invalid email.',
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
module.exports = forgotPasswordValidation;