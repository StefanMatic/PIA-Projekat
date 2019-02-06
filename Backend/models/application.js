const mongoose = require('mongoose')

const Schema = mongoose.Schema
const applicationSchema = new Schema({
   idOffer:{
       type:String
   },
   username:{
       type:String
   },
   coverLetter:{
       type:String
   },
   coverLetterPDF:{
       type:String
   },
   //0 - pending review
   //1 - accepted
   //2 - denied
   status:{
       type:String
   }
})

module.exports = mongoose.model('Application', applicationSchema, "applications")