const express = require('express');
const router = express.Router();
const centerAction = require('../actions/centerAction')
const centerModel = require('../models/centerModel')


module.exports = () => {
    const center = centerAction(centerModel)

    router.post('/search/:skip//:limit//:sort', async  (req, res) => {
        const {payload} = req.body
        const target = await center.getAll(parseInt(req.params.skip), parseInt(req.params.limit), req.params.sort, payload)
        res.send(target)
    })

    router.get('/', async (req, res) => {
        const centers = await center.getAll()
        res.send(centers)
    });

    router.get('/:id', async (req, res) => {
        const target = await center.getById(req.params.id)
        target ?
            res.send(target) :
            res.status(404).json("Сервисный центр не найден!")
    });

    router.get('/owner/:id', async (req, res) => {
        const target = await center.getByOwnerId(req.params.id)
        target ?
            res.send(target) :
            res.status(404).json("Сервисный центр не найден!")
    });

    router.post('/', async (req, res) => {
        const {payload} = req.body
        if (!await center.isExist(payload.inn)) {
            const target = await center.add(req.body.payload)
            res.send(target)
        } else {
            res.status(400).json("Сервисный центр уже существует!")
        }
    });

    router.delete('/:id', async (req, res) => {
        if (await center.getById(req.params.id)) {
            const target = await center.delete(req.params.id)
            res.send(target)
        } else {
            res.status(404).json("Сервисный центр не найден!")
        }
    });

    router.put('/:id', async (req, res) => {
        if (await center.getById(req.params.id)) {
            const target = await center.update(req.params.id, req.body.payload)
            res.send(target)
        } else {
            res.status(404).json("Сервисный центр не найден!")
        }

    });

    return router;
}

