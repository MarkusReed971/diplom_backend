const express = require('express');
const router = express.Router();
const requestAction = require('../actions/requestAction')
const requestModel = require('../models/requestModel')

module.exports = () => {
    const request = requestAction(requestModel)

    router.get('/center_id/:center_id&&:skip&&:limit&&:sort', async (req, res) => {
        const requests = await request.getAllByCenterId(req.params.center_id, parseInt(req.params.skip), parseInt(req.params.limit), req.params.sort)
        res.send(requests)
    });

    router.get('/center_id/:center_id', async (req, res) => {
            const requests = await request.getAllByCenterId(req.params.center_id)
            res.send(requests)
    });

    router.get('/user_id/:user_id&&:skip&&:limit&&:sort', async (req, res) => {
        const requests = await request.getAllByUserId(req.params.user_id, parseInt(req.params.skip), parseInt(req.params.limit), req.params.sort)
        res.send(requests)
    });

    router.get('/user_id/:user_id', async (req, res) => {
        const requests = await request.getAllByUserId(req.params.user_id)
        res.send(requests)
    });

    router.get('/worker_id/:worker_id&&:skip&&:limit&&:sort', async (req, res) => {
            const requests = await request.getAllByWorkerId(req.params.worker_id, parseInt(req.params.skip), parseInt(req.params.limit), req.params.sort)
            res.send(requests)
    });
    router.get('/worker_id/:worker_id', async (req, res) => {
            const requests = await request.getAllByWorkerId(req.params.worker_id)
            res.send(requests)
    });

    router.get('/:id', async (req, res) => {
        const target = await request.getById(req.params.id)
        res.send(target)
    });

    router.get('/', async (req, res) => {
        const requests = await request.getAll()
        res.send(requests)
    });

    router.post('/', async (req, res) => {
        const target = await request.add(req.body.payload)
        res.send(target)
    });

    router.delete('/:id', async (req, res) => {
        const target = await request.delete(req.params.id)
        res.send(target)
    });

    router.put('/:id', async (req, res) => {
        const target = await request.update(req.params.id, req.body.payload)
        res.send(target)
    });

    return router;
}
