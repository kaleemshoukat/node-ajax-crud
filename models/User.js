const mongoose=require('mongoose')
const Schema=mongoose.Schema

const UserSchema = new Schema({
    first_name: {
        type: String,
        min: 3,
        max: 255,
        required: true
    },
    last_name: {
        type: String,
        min: 3,
        max: 1000,
        required: true
    },
    user_name: {
        type: String,
        min: 3,
        max: 255,
        required: true,
        unique: true
    },
    email: {
        type: String,
        min: 3,
        max: 255,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum : ['Male','Female'],
        default: 'Male',
        required: true
    },
    password: {
        type: String,
        max: 255,
        required: true
    }
},{
    timestamps: true
});

const User=mongoose.model('User', UserSchema)
module.exports=User