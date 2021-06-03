const express = require('express');
const router = express.Router();
const dialogAction = require('../actions/dialogAction')
const dialogModel = require('../models/dialogModel')

module.exports = () => {
    const dialog = dialogAction(dialogModel)

    router.get('/:skip&&:limit', async (req, res) => {
        const dialogs = await dialog.getAll(parseInt(req.params.skip), parseInt(req.params.limit))
        res.send(dialogs)
    });

    router.get('/:id', async (req, res) => {
        const target = await dialog.getById(req.params.id)
        res.send(target)
    });

    router.get('/user_id/:user_id', async (req, res) => {
        const target = await dialog.getAllByUserId(req.params.user_id)
        res.send(target)
    });

    router.get('/', async (req, res) => {
        const dialogs = await dialog.getAll()
        res.send(dialogs)
    });

    router.post('/', async (req, res) => {
        const target = await dialog.add(req.body.payload)
        res.send(target)
    });

    router.delete('/:id', async (req, res) => {
        const target = await dialog.delete(req.params.id)
        res.send(target)
    });

    router.put('/:id', async (req, res) => {
        const target = await dialog.update(req.params.id, req.body.payload)
        res.send(target)
    });

    return router;
}
