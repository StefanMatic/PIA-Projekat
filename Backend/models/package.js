const mongoose = require('mongoose')

const Schema = mongoose.Schema
const packageSchema = new Schema({
    Packages:{
        type: Array
    },
    Additional:{
        type:Array
    },
    Fair:{
        type:String
    }
})

module.exports = mongoose.model('Package', packageSchema, "paketi")