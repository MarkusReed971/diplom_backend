const express = require('express');
const router = express.Router();
const requestAction = require('../actions/requestAction')
const requestModel = require('../models/requestModel')

module.exports = () => {
    const request = requestAction(requestModel)

    router.get('/centerId/:centerId&&:skip&&:limit&&:sort', async (req, res) => {
        const requests = await request.getAllByCenterId(req.params.centerId, parseInt(req.params.skip), parseInt(req.params.limit), req.params.sort)
        requests[0] ? res.send(requests) : res.status(404).json("Заявки не найдены!")
    });

    router.get('/centerId/:centerId', async (req, res) => {
        const requests = await request.getAllByCenterId(req.params.centerId)
        requests[0] ? res.send(requests) : res.status(404).json("Заявки не найдены!")
    });

    router.get('/userId/:userId&&:skip&&:limit&&:sort', async (req, res) => {
        const requests = await request.getAllByUserId(req.params.userId, parseInt(req.params.skip), parseInt(req.params.limit), req.params.sort)
        requests[0] ? res.send(requests) : res.status(404).json("Заявки не найдены!")
    });

    router.get('/userId/:userId', async (req, res) => {
        const requests = await request.getAllByUserId(req.params.userId)
        requests[0] ? res.send(requests) : res.status(404).json("Заявки не найдены!")
    });

    router.get('/workerId/:workerId&&:skip&&:limit&&:sort', async (req, res) => {
        const requests = await request.getAllByWorkerId(req.params.workerId, parseInt(req.params.skip), parseInt(req.params.limit), req.params.sort)
        requests[0] ? res.send(requests) : res.status(404).json("Заявки не найдены!")
    });
    router.get('/masterId/:masterId', async (req, res) => {
        const requests = await request.getAllByMasterId(req.params.masterId)
        requests[0] ? res.send(requests) : res.status(404).json("Заявки не найдены!")
    });

    router.get('/:id', async (req, res) => {
        const target = await request.getById(req.params.id)
        target ? res.send(target) : res.status(404).json("Заявка не найдена!")
    });

    router.get('/', async (req, res) => {
        const requests = await request.getAll()
        requests[0] ? res.send(requests) : res.status(404).json("Заявки не найдены!")
    });

    router.post('/', async (req, res) => {
        const target = await request.add(req.body.payload)
        res.send(target)
    });

    router.delete('/:id', async (req, res) => {
        if (await request.getById(req.params.id)) {
            const target = await request.delete(req.params.id)
            res.send(target)
        } else {
            res.status(404).json("Заявка не найдена!")
        }
    });

    router.put('/:id', async (req, res) => {
        if (await request.getById(req.params.id)) {
            const target = await request.update(req.params.id, req.body.payload)
            res.send(target)
        } else {
            res.status(404).json("Заявка не найдена!")
        }
    });

    return router;
}
