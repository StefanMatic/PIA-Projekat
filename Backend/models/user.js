const mongoose = require('mongoose')

const Schema = mongoose.Schema
const userSchema = new Schema({
    username:String,
    password:String,
    name:String,
    lastname:String,
    number:String,
    email:String,
    graduated:Boolean
})

module.exports = mongoose.model('User',userSchema, "users")