const express = require('express');
const router = express.Router();


const CENTERS = [
    {
        name: 'ООО Мобилка',
        inn: '1234567890',
        isAuthorized: true,
    },
    {
        name: 'ИП Аллах',
        inn: '0987654321',
        isAuthorized: false,
    },
]

router.get('/', (req, res) => {
    res.send('centers');
});

router.post('/', (req, res) => {
    res.send('Body: ' + JSON.stringify(req.body));
});

router.get(`/:id`, (req, res) => {
    res.end(JSON.stringify(CENTERS[req.params.id]))
});


module.exports = router;
