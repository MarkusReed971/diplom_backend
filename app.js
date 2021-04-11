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


app.get('/', (req, res) => {
    res.send('Home Page')
})

app.post(`/`, (req, res) => {
    res.end(JSON.stringify(req.body))
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
