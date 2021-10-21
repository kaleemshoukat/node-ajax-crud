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
        required: true,
        unique: true
    },
    image: {
        type: String,
        max: 255,
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

UserSchema.statics.getUserByEmail = async function (email) {
    let search = { email: email }
    let foundUser = null
    foundUser = await User.findOne(search)
    return foundUser
}

UserSchema.statics.getUserByUsername = async function (user_name) {
    let search = { user_name: user_name }
    let foundUser = null
    foundUser = await User.findOne(search)
    return foundUser
}

const User=mongoose.model('User', UserSchema)
module.exports=User
