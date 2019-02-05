const mongoose = require('mongoose')

const Schema = mongoose.Schema
const offerSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    name: {
        type: String
    },
    description:{
        type: String
    },
    deadlineDate:{
        type:String
    },
    deadlineTime:{
        type:String
    },
    typeOfJob:{
        type:Array
    }
})

module.exports = mongoose.model('Offer', offerSchema, "offers")