const express = require('express');
const router = express.Router();
const userAction = require('../actions/userAction')
const userModel = require('../models/userModel')

module.exports = () => {
    const user = userAction(userModel)

    router.get('/:skip&&:limit&&:sort&&:name', async (req, res) => {
        const users = await user.getAll(parseInt(req.params.skip), parseInt(req.params.limit), req.params.sort, req.params.name)
        res.send(users)
    });

    router.get('/:skip&&:limit&&:sort', async (req, res) => {
        const users = await user.getAll(parseInt(req.params.skip), parseInt(req.params.limit), req.params.sort)
        res.send(users)
    });

    router.get('/:id', async (req, res) => {
        const target = await user.getById(req.params.id)
        res.send(target)
    });

    router.get('/', async (req, res) => {
        const users = await user.getAll()
        res.send(users)
    });

    router.get('/center_id/:center_id', async (req, res) => {
        const users = await user.getAllByCenterId(req.params.center_id)
        res.send(users)
    });

    router.post('/', async (req, res) => {
        const target = await user.add(req.body.payload)
        res.send(target)
    });

    router.delete('/:id', async (req, res) => {
        const target = await user.delete(req.params.id)
        res.send(target)
    });

    router.put('/:id', async (req, res) => {
        const target = await user.update(req.params.id, req.body.payload)
        res.send(target)
    });

    return router;
}
