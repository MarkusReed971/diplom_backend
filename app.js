const mongoose = require("mongoose");
const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express()
const port = 3001

const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

try {
    const controllers = require('require-all')(__dirname + '/controllers');
    app.use(`/centers`, controllers['centerController']())
    app.use(`/users`, controllers['userController']())
    app.use(`/requests`, controllers['requestController']())
    app.use(`/dialogs`, controllers['dialogController']())
    app.use(`/deviceTypes`, controllers['deviceTypeController']())
    app.use(`/deviceCompanies`, controllers['deviceCompanyController']())
} catch (e) {
    console.error(e);
}

mongoose.connect("mongodb+srv://admin:1234ewq@cluster0.lqycm.mongodb.net/diplomdb?retryWrites=true&w=majority", { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false }, function(err){
    if(err) return console.log(err);
    app.listen(port, function(){
        console.log(`ExpressJS -> http://localhost:${port}`);
    });
});

app.get('/', (req, res) => {
    res.send('Home Page')
})
