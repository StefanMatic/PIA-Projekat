const mongoose = require('mongoose')

const Schema = mongoose.Schema
const companyApplicationSchema = new Schema({
   fairName:{
       type:String
   },
   package:{
       type:String
   },
   additional:{
       type:Array
   },
   price:{
       type:Number
   },
   companyName:{
       type:String
   },
   message:{
       type:String
   },
   //0 - pending review
   //1 - accepted
   //2 - denied
   status:{
       type:String
   }
})

module.exports = mongoose.model('CompanyApp', companyApplicationSchema, "companyApplications")