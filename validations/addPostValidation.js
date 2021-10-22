const Joi = require('joi');     //joi is validator

const addPostValidation = async (req, res, next) => {
    //console.log(req.body);

    const schema = Joi.object().keys({
        title: Joi.string().alphanum().min(3).max(30).required().empty('').messages({
            'string.alphanum': 'This field can have Only alphabets.',
            'string.min': 'This field should have a minimum length of {#limit}.',
            'string.max': 'This field can have maximum length of {#limit}.',
            'any.required': 'This field is required.'
        }),
        description: Joi.string().min(3).max(1000).required().empty('').messages({
            'string.min': 'This field should have a minimum length of {#limit}.',
            'string.max': 'This field can have maximum length of {#limit}.',
            'any.required': 'This field is required.'
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
module.exports = addPostValidation;