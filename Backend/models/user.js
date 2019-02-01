const mongoose = require('mongoose')

const Schema = mongoose.Schema
const userSchema = new Schema({
    //polje role nam govori o kom tipu korisnika se radi
    //0 - student
    //1 - kompanija
    //2 - admin

    //ZA ADMINA
    role:String,
    username:String,
    password:String,
    name:String,
    lastname:String,
    number:String,
    email:String,
    image:{
        type:String
    },

    //DODATAK ZA STUDENTA
    graduated:Boolean,

    //DODATAK ZA KOMPANIJU
    city:String,
    address:String,
    pib:String,
    numOfEmployees:String,
    web:String,
    activities:Array,
    speciality:String
})

module.exports = mongoose.model('User',userSchema, "users")