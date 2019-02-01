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
    let studentData = new User({
        
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

    User.findOne({ email: userData.email }, (err, user) => {
        if (err) {
            console.log(err)
        }
        else {
            if (!user) {
                res.status(401).send("Invalid user")
            }
            else {
                if (user.password !== userData.password) {
                    res.status(401).send("Invalid password")
                }
                else
                    res.status(200).send(user)
            }
        }
    })
})

module.exports = router