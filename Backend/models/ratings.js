const mongoose = require('mongoose')

const Schema = mongoose.Schema
const ratingSchema = new Schema({
   Rating:{
       type:Number
    },
   CompanyName:{
       type:String
   },
   Username:{
       type:String
   }
})

module.exports = mongoose.model('Rating', ratingSchema, "ratings")