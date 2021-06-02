const express = require('express');
const router = express.Router();
const workerAction = require('../actions/workerAction')
const workerModel = require('../models/workerModel')

module.exports = () => {
    const worker = workerAction(workerModel)

    router.get('/user_id/:user_id', async (req, res) => {
        const workers = await worker.getAllByUserId(req.params.user_id)
        res.send(workers)
    });

    router.get('/center_id/:center_id', async (req, res) => {
        const workers = await worker.getAllByCenterId(req.params.center_id)
        res.send(workers)
    });

    router.get('/:id', async (req, res) => {
        const target = await worker.getById(req.params.id)
        res.send(target)
    });

    router.get('/', async (req, res) => {
        const workers = await worker.getAll()
        res.send(workers)
    });

    router.post('/', async (req, res) => {
        const target = await worker.add(req.body.payload)
        res.send(target)
    });

    router.delete('/:id', async (req, res) => {
        const target = await worker.delete(req.params.id)
        res.send(target)
    });

    router.put('/:id', async (req, res) => {
        const target = await worker.update(req.params.id, req.body.payload)
        res.send(target)
    });

    return router;
}
