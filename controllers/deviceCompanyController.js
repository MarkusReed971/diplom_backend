const express = require('express');
const router = express.Router();
const deviceCompanyAction = require('../actions/deviceCompanyAction')
const deviceCompanyModel = require('../models/deviceCompanyModel')

module.exports = () => {
    const deviceCompany = deviceCompanyAction(deviceCompanyModel)

    router.get('/:id', async (req, res) => {
        const target = await deviceCompany.getById(req.params.id)
        target ? res.send(target) : res.status(404).json("Тип не найден!")
    });

    router.get('/', async (req, res) => {
        const deviceCompanys = await deviceCompany.getAll()
        res.send(deviceCompanys)
    });

    router.post('/', async (req, res) => {
        const {payload} = req.body
        if (!await deviceCompany.getByTitle(payload.title)) {
            const target = await deviceCompany.add(payload)
            res.send(target)
        } else {
            res.status(404).json("Тип не найден!")
        }
    });

    router.delete('/:id', async (req, res) => {
        if (await deviceCompany.getById(req.params.id)) {
            const target = await deviceCompany.delete(req.params.id)
            res.send(target)
        } else {
            res.status(404).json("Тип не найден!")
        }
    });

    router.put('/:id', async (req, res) => {
        if (await deviceCompany.getById(req.params.id)) {
            const target = await deviceCompany.update(req.params.id, req.body.payload)
            res.send(target)
        } else {
            res.status(404).json("Тип не найден!")
        }
    });

    return router;
}
