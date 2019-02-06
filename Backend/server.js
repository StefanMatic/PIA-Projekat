const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')

const PORT = 4000
const api = require('./routes/api')
const app = express();
app.use(cors())

app.use(bodyParser.json())
app.use("/images", express.static(path.join("./images")));
app.use("/uploads", express.static(path.join("./uploads")));

app.use('/api', api)

app.get('/', function(req, res){
    res.send('Hello from server')
})

app.listen(PORT, function(){
    console.log('serve running on localhost:' + PORT)
})
