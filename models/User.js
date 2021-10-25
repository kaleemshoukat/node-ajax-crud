const mongoose=require('mongoose')
const Schema=mongoose.Schema
const Post=require('../models/Post')

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
    },
    token: {
        type: String,
        max: 255,
        default: null
    }
},{
    timestamps: true
});

//static methods
UserSchema.statics.findUserByEmail = async (email) => {
    let search = { email: email }
    let foundUser = null
    foundUser = await User.findOne(search)
    return foundUser
}

UserSchema.statics.findUserByUsername = async (user_name) => {
    let search = { user_name: user_name }
    let foundUser = null
    foundUser = await User.findOne(search)
    return foundUser
}

UserSchema.statics.findUserByToken = async (token) => {
    let search = { token: token }
    let foundUser = null
    foundUser = await User.findOne(search)
    return foundUser
}

UserSchema.statics.findUserByMongoID = async (id) => {
    ///Make sure to cast id as ObjectID
    let objID = mongoose.Types.ObjectId(id)
    let search = { _id: objID }
    let user = null
    user = await User.findById(search)
    return user
}

//document methods
UserSchema.methods.updatePassword = (newPass) => {
    this.password = newPass
    return this.save()
}

UserSchema.methods.updateToken = async (token) => {
    this.token = token
    return this.save()
}

//cascade removing post when user is deleted
UserSchema.pre('remove', function(next) {
    // 'this' is the client being removed. Provide callbacks here if you want
    Post.remove({user_id: this._id}).exec();
    next();
});

//set get while quering
UserSchema.set('toObject', { virtuals: true })
UserSchema.set('toJSON', { virtuals: true })

UserSchema.virtual('full_name').get(function() {
    return this.first_name + ' ' + this.last_name;
});

const User=mongoose.model('User', UserSchema)
module.exports=User
