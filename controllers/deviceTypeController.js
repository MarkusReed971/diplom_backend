const express = require('express');
const router = express.Router();
const deviceTypeAction = require('../actions/deviceTypeAction')
const deviceTypeModel = require('../models/deviceTypeModel')

module.exports = () => {
    const deviceType = deviceTypeAction(deviceTypeModel)

    router.get('/:id', async (req, res) => {
        const target = await deviceType.getById(req.params.id)
        target ? res.send(target) : res.status(404).json("Тип не найден!")
    });

    router.get('/', async (req, res) => {
        const deviceTypes = await deviceType.getAll()
        res.send(deviceTypes)
    });

    router.post('/', async (req, res) => {
        const {payload} = req.body
        if (!await deviceType.getByTitle(payload.title)) {
            const target = await deviceType.add(payload)
            res.send(target)
        } else {
            res.status(404).json("Уже существует!")
        }
    });

    router.delete('/:id', async (req, res) => {
        if (await deviceType.getById(req.params.id)) {
            const target = await deviceType.delete(req.params.id)
            res.send(target)
        } else {
            res.status(404).json("Тип не найден!")
        }
    });

    router.put('/:id', async (req, res) => {
        if (await deviceType.getById(req.params.id)) {
            const target = await deviceType.update(req.params.id, req.body.payload)
            res.send(target)
        } else {
            res.status(404).json("Тип не найден!")
        }
    });

    return router;
}
