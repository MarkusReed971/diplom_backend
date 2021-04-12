const express = require('express');
const router = express.Router();
const centerAction = require('../actions/centerAction')
const centerModel = require('../models/centerModel')


module.exports = () => {
    const center = centerAction(centerModel)

    router.get('/', async (req, res) => {
        const centers = await center.getAll()
        res.send(centers)
    });

    router.get('/:id', async (req, res) => {
        const target = await center.get(req.params.id)
        res.send(target)
    });

    router.post('/', async (req, res) => {
        const target = await center.add(req.body.payload)
        res.send(target)
    });

    router.delete('/:id', async (req, res) => {
        const target = await center.delete(req.params.id)
        res.send(target)
    });

    router.put('/:id', async (req, res) => {
        const target = await center.update(req.params.id, req.body.payload)
        res.send(target)
    });

    return router;
}

