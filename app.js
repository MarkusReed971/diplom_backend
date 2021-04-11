const mongoose = require("mongoose");
const express = require('express')
const bodyParser = require('body-parser');
const app = express()
const port = 3000

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

try {
    const controllers = require('require-all')(__dirname + '/controllers');
    for (const controller in controllers) {
        if (controllers.hasOwnProperty(controller))
            app.use(`/${controller}`, controllers[controller])
    }
} catch (e) {
    console.error(e);
}

mongoose.connect("mongodb+srv://admin:1234ewq@cluster0.lqycm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false }, function(err){
    if(err) return console.log(err);
    app.listen(port, function(){
        console.log("Сервер ожидает подключения...");
    });
});

app.get('/', (req, res) => {
    res.send('Home Page')
})

// app.listen(port, () => {
//     console.log(`Example app listening at http://localhost:${port}`)
// })
