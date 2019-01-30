const express = require('express')
const router = express.Router()

const mongoose = require('mongoose')
const db = "mongodb://localhost:27017/jobfair"

const User = require('../models/user')

mongoose.connect(db, err =>{
    if (err){
        console.log(err)
    }
    else{
        console.log("Connection to database successful")
    }
})
router.get('/', (req, res)=>{
    res.send("From Api router")
})

router.post('/register', (req, res)=>{
    let userData = req.body
    let user = new User(userData)

    user.save((err, user)=>{
        if (err){
            console.log(err);
        }
        else{
            res.status(200).send(user)
        }
    })
})

router.post('/login', (req, res)=>{
    let userData = req.body

    User.findOne({email: userData.email},(err, user)=>{
        if (err){
            console.log(err)
        }
        else{
            if (!user){
                res.status(401).send("Invalid user")
            }
            else {
                if (user.password !== userData.password){
                    res.status(401).send("Invalid password")
                }
                res.status(200).send(user)
            }
        }
    })
})

module.exports = router