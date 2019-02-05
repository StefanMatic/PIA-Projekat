const express = require('express')
const router = express.Router()
const multer = require('multer')

const mongoose = require('mongoose')
const db = "mongodb://localhost:27017/jobfair"

const MIME_TYPE_MAP = {
    "image/png": "png",
    "image/jpeg": "jpg",
    "image/jpg": "jpg"
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const isValid = MIME_TYPE_MAP[file.mimetype];
        let error = new Error("Invalid mime type");
        if (isValid) {
            error = null;
        }
        cb(error, "./images");
    },
    filename: (req, file, cb) => {
        const name = file.originalname
            .toLowerCase()
            .split(" ")
            .join("-");
        const ext = MIME_TYPE_MAP[file.mimetype];
        cb(null, name + "-" + Date.now() + "." + ext);
    }
});

const User = require('../models/user')
const CV = require('../models/cv')
const Offer = require('../models/offer')

mongoose.connect(db, err => {
    if (err) {
        console.log(err)
    }
    else {
        console.log("Connection to database successful")
    }
})

//--------------------Pocetak funkcija---------------------
router.get('/', (req, res) => {
    res.send("From Api router")
})

router.post('/registerCompany', multer({storage: storage}).single("image"),(req, res) => {
    const url = req.protocol + "://" + req.get("host");
    let companyData = new User({
        role: req.body.role,
        username: req.body.username,
        password: req.body.password,
        name: req.body.name,
        city: req.body.city,
        address: req.body.address,
        pib: req.body.pib,
        numOfEmployees: req.body.numOfEmployees,
        email: req.body.email,
        web: req.body.web,
        activities: JSON.parse(req.body.activities),
        speciality: req.body.speciality,
        image: url + "/images/" + req.file.filename
    });
    companyData.save((err, company) => {
        if (err) {
            console.log(err);
        }
        else {
            res.status(200).send(company);
        }
    })
})

router.post('/registerStudent', multer({storage: storage}).single("image"),(req, res) => {
    const url = req.protocol + "://" + req.get("host");
    let studentData = new User({
        role: req.body.role,
        username: req.body.username,
        password: req.body.password,
        name: req.body.name,
        lastname: req.body.lastname,
        number: req.body.number,
        email: req.body.email,
        graduated: req.body.graduated,
        image: url + "/images/" + req.file.filename
    });
    studentData.save((err, student) => {
        if (err) {
            console.log(err);
        }
        else {
            res.status(200).send(student)
        }
    })
})

router.post('/login', (req, res) => {
    let userData = req.body
    User.findOne({ username: userData.username, password: userData.password }, (err, user) => {
        if (err) {
            console.log(err)
        }
        else {
            res.json(user)
        }
    })
})

router.get('/allCompanies', (req, res)=>{
    User.find({role:"1"}, (err, companies)=>{
        if (err)
            console.log(err)
        else 
            res.json(companies)
    })
})

router.post('/currentUser', (req, res)=>{
    User.findOne({username: req.body.username}, (err, user)=>{
        if (err){
            console.log(err)
        }
        else{
            res.json(user)
        }
    })
})

//==================================
//funkcije za CV
//==================================
router.post('/makeCV', (req, res)=>{
    let newCV = new CV({
        username: req.body.username,
        first: req.body.first,
        second: req.body.second,
        third: req.body.third,
        forth: req.body.forth,
        complete: req.body.complete
    })
    newCV.save((err, curiculam) => {
        if (err) {
            console.log(err);
        }
        else {
            res.status(200).send(curiculam)
        }
    })
})

router.post('/findCV', (req, res)=>{
    CV.findOne({username: req.body.username}, (err, curiculam)=>{
        if (err){
            console.log(err)
        }
        else{
            res.json(curiculam)
        }
    })
})

router.post('/updateCV', (req, res)=>{
    console.log(req.body)
    CV.update({username: req.body.username}, req.body, (err, crc)=>{
        if (err){
            console.log(err)
        }
        else{
            console.log(crc)
        }
    })
})
//=======================================
//funkcije za kompanije
//=======================================

router.post('/makeOffer', (req, res)=>{
    let newOffer = new Offer({
        username: req.body.username,
        name: req.body.name,
        description: req.body.description,
        deadlineDate: req.body.deadlineDate,
        deadlineTime: req.body.deadlineTime,
        typeOfJob: req.body.typeOfJob
    })
    newOffer.save((err, myOffer) => {
        if (err) {
            console.log(err);
        }
        else {
            res.status(200).send(myOffer)
        }
    })
})

router.get('/allOffers', (req, res)=>{
    Offer.find({}, (err, offers)=>{
        if (err)
            console.log(err)
        else 
            res.json(offers)
    })
})

router.post('/companyOffers', (req, res)=>{
    Offer.find({username: req.body.username}, (err, offers)=>{
        if (err){
            console.log(err)
        }
        else{
            res.json(offers)
        }
    })
})
//===========================================
//===========================================


module.exports = router