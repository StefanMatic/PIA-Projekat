const mongoose = require('mongoose')

const Schema = mongoose.Schema
const fairSchema = new Schema({
   Fairs:{
       type:Array
   },
   Locations:{
       type:Array
   }
})

module.exports = mongoose.model('Fair', fairSchema, "fairs")