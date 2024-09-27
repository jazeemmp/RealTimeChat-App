const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    isBlocked:{
        type:Boolean,
        default:false
    },
    password:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:false
    },
    job:{
        type:String,
        required:false
    },
    profileUrl: {
        type: String,
        required: false 
    },
    address:{
        type: String,
        required: false 
    },
    about:{
        type: String,
        required: false 
    },
    registered:{
        type:Date,
        default:Date.now()
    }
})

const UserDB = mongoose.model('user',userSchema)

module.exports = UserDB;