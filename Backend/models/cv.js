const mongoose = require('mongoose')

const Schema = mongoose.Schema
const cvSchema = new Schema({
    username: {
        type: String
    },
    //Pomocne promenljive da se vidi sa li je CV napisan
    first: {
        type: Boolean
    },
    second: {
        type: Boolean
    },
    third: {
        type: Boolean
    },
    forth: {
        type: Boolean
    },
    complete: {
        type: Boolean
    },

    //==========Personal information==========
    name: {
        type: String
    },
    lastname: {
        type: String
    },
    sex: {
        type: String
    },
    dateOfBirth: {
        type: String
    },
    //location
    address: {
        type: String
    },
    country: {
        type: String
    },
    city: {
        type: String
    },
    postalCode: {
        type: String
    },

    //contact
    number: {
        type: Array
    },
    email: {
        type: Array
    },
    web: {
        type: Array
    },
    //========================================

    //==========Work experience===============
    experience: {
        type: Array
    },
    //========================================

    //==========Education and training===============
    education: {
        type: Array
    },
    //========================================

    //==========Personal skils===============
    languages: {
        type: Array
    },

    comSkills: {
        type: Array
    },
    organisationSkills: {
        type: Array
    },
    jobSkills: {
        type: Array
    },
    digitalSkills: {
        type: Array
    }
    //========================================
})

module.exports = mongoose.model('CV', cvSchema, "cv")