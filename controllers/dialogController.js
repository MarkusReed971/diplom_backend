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
        target ? res.send(target) : res.status(404).json("Диалог не найден!")
    });

    router.get('/user_id/:user_id', async (req, res) => {
        const dialogs = await dialog.getAllByUserId(req.params.user_id)
        dialogs[0] ? res.send(dialogs) : res.status(404).json("Диалоги не найдены!")
    });

    router.get('/', async (req, res) => {
        const dialogs = await dialog.getAll()
        dialogs[0] ? res.send(dialogs) : res.status(404).json("Диалоги не найдены!")
    });

    router.post('/', async (req, res) => {
        const {payload} = req.body
        if (!await dialog.isExist(payload.user_id, payload.user_to)) {
            const target = await dialog.add(payload)
            res.send(target)
        } else {
            res.status(400).json("Диалог уже существует!")
        }


    });

    router.delete('/:id', async (req, res) => {
        if (await dialog.getById(req.params.id)) {
            const target = await dialog.delete(req.params.id)
            res.send(target)
        } else {
            res.status(404).json("Диалог не найден!")
        }
    });

    router.put('/:id', async (req, res) => {
        if (await dialog.getById(req.params.id)) {
            const target = await dialog.update(req.params.id, req.body.payload)
            res.send(target)
        } else {
            res.status(404).json("Диалог не найден!")
        }
    });

    return router;
}
