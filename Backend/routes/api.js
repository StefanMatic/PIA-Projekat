const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')

const mongoose = require('mongoose')
const db = "mongodb://localhost:27017/jobfair"

const MIME_TYPE_MAP = {
    "image/png": "png",
    "image/jpeg": "jpg",
    "image/jpg": "jpg"
};

const MIME_TYPE_MAP_FILE = {
    "application/msword": "docx",
    "application/pdf": "pdf"
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

const storeFile = multer.diskStorage({
    destination: function (req, file, cb) {
        const isValid = MIME_TYPE_MAP_FILE[file.mimetype];
        let error = new Error("Invalid mime type");
        if (isValid) {
            error = null;
        }
        cb(error, './uploads');
    },
    filename: function (req, file, cb) {
        const name = file.originalname
            .toLowerCase()
            .split(" ")
            .join("-");
        const ext = MIME_TYPE_MAP_FILE[file.mimetype];
        cb(null, name + "-" + Date.now() + "." + ext);
    }
});

const User = require('../models/user')
const CV = require('../models/cv')
const Offer = require('../models/offer')
const Application = require('../models/application')
const Package = require('../models/package')
const CompanyApp = require('../models/companyApplication')
const Fair = require('../models/fair')

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

router.post('/registerCompany', multer({ storage: storage }).single("image"), (req, res) => {
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

router.post('/registerStudent', multer({ storage: storage }).single("image"), (req, res) => {
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

router.get('/allCompanies', (req, res) => {
    User.find({ role: "1" }, (err, companies) => {
        if (err)
            console.log(err)
        else
            res.json(companies)
    })
})

router.post('/currentUser', (req, res) => {
    User.findOne({ username: req.body.username }, (err, user) => {
        if (err) {
            console.log(err)
        }
        else {
            res.json(user)
        }
    })
})

//==================================
//funkcije za CV
//==================================
router.post('/makeCV', (req, res) => {
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

router.post('/findCV', (req, res) => {
    CV.findOne({ username: req.body.username }, (err, curiculam) => {
        if (err) {
            console.log(err)
        }
        else {
            res.json(curiculam)
        }
    })
})

router.post('/updateCV', (req, res) => {
    console.log(req.body)
    CV.update({ username: req.body.username }, req.body, (err, crc) => {
        if (err) {
            console.log(err)
        }
        else {
            console.log(crc)
        }
    })
})
//=======================================
//funkcije za kompanije
//=======================================

router.post('/makeOffer', (req, res) => {
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

router.post('/findOffer', (req, res) => {

    Offer.findById(req.body.id, (err, offers) => {
        if (err)
            console.log(err)
        else {
            console.log(offers)
            res.json(offers)
        }
    })
})

router.get('/allOffers', (req, res) => {
    Offer.find({}, (err, offers) => {
        if (err)
            console.log(err)
        else
            res.json(offers)
    })
})

router.post('/companyOffers', (req, res) => {
    Offer.find({ username: req.body.username }, (err, offers) => {
        if (err) {
            console.log(err)
        }
        else {
            res.json(offers)
        }
    })
})
//===========================================
//Rad sa aplikacijama
//===========================================
router.post('/apply', (req, res) => {
    let newApplication = new Application({
        idOffer: req.body.idOffer,
        username: req.body.username,
        status: req.body.status
    })
    newApplication.save((err, myOffer) => {
        if (err) {
            console.log(err);
        }
        else {
            res.status(200).send(myOffer)
        }
    })
})

router.post('/sendCoverLetter', (req, res) => {
    Application.update({ idOffer: req.body.idOffer, username: req.body.username },
        req.body,
        (err, app) => {
            if (err)
                console.log(err)
            else
                console.log(app)
        })
})

router.post('/sendCoverLetterPDF', multer({ storage: storeFile }).single("coverLetterPDF"), (req, res) => {
    const url = req.protocol + "://" + req.get("host");
    const applicationData = {
        coverLetterPDF: url + "/uploads/" + req.file.filename
    }
    Application.update({ idOffer: req.body.idOffer, username: req.body.username },
        applicationData,
        (err, app) => {
            if (err) {
                console.log(err)
                return res.status(501).json({ error: err });
            }
            //do all database record saving activity
            return res.json({ originalname: req.file.originalname, uploadname: req.file.filename });
        })

})

router.post('/updateApplicationStatus', (req, res) => {
    Application.update({ idOffer: req.body.idOffer, username: req.body.username },
        req.body,
        (err, app) => {
            if (err)
                console.log(err)
            else
                console.log(app)
        })
})

router.post('/findAllApplications', (req, res) => {
    Application.find({ idOffer: req.body.idOffer }, (err, apps) => {
        if (err)
            err => console.log(err)
        else
            res.json(apps)
    })
})

router.post("/getCoverLetterPDF", (req, res) => {
    console.log(req.body.coverLetterPDF)
    filePath = path.join(__dirname, '../uploads') + '/' + req.body.coverLetterPDF
    console.log(filePath)
    res.sendFile(filePath)
})

//===========================================
//Rad sa paketima
//===========================================

router.get('/allPackages', (req, res) => {
    Package.findOne({}, (err, offers) => {
        if (err)
            console.log(err)
        else
            res.json(offers)
    })
})


router.post('/updatePackages', (req, res) => {
    Package.findByIdAndUpdate(req.body._id,
        req.body,
        (err, app) => {
            if (err)
                console.log(err)
            else
                console.log(app)
        })
})

//===========================================
//===========================================

//===========================================
//Rad sa fair-om i aplikacijama kompanija
//===========================================
router.get('/allFairs', (req, res) => {
    Fair.findOne({}, (err, fairs) => {
        if (err)
            console.log(err)
        else
            res.json(fairs)
    })
})

router.post('/allCompanyApplications', (req, res) => {
    CompanyApp.find({ fairName: req.body.fairName }, (err, comApp) => {
        if (err)
            console.log(err)
        else
            res.json(comApp)
    })
})

router.post('/updateCopmanyApplication', (req, res) => {
    CompanyApp.update({ fairName: req.body.fairName, companyName: req.body.companyName },
        req.body,
        (err, app) => {
            if (err)
                console.log(err)
            else
                console.log(app)
        })
})

router.post('/companyApplication', (req, res) => {
    let companyApp = new CompanyApp({
        fairName: req.body.fairName,
        package: req.body.package,
        additional: req.body.additional,
        price: req.body.price,
        companyName: req.body.companyName,
        status: req.body.status,
        message: req.body.message
    })

    companyApp.save((err, submit) => {
        if (err) {
            console.log(err);
        }
        else {
            res.status(200).send(submit)
        }
    })
})
//===========================================
//===========================================

module.exports = router