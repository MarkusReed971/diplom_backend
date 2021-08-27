const express = require('express');
const router = express.Router();
const userAction = require('../actions/userAction')
const userModel = require('../models/userModel')

module.exports = () => {
    const user = userAction(userModel)

    router.get('/:skip&&:limit&&:sort&&:name', async (req, res) => {
        const users = await user.getAll(
            parseInt(req.params.skip),
            parseInt(req.params.limit),
            req.params.sort,
            req.params.name)
        users[0] ?
            res.send(users) :
            res.status(404).json("Пользователи не найдены!")
    });

    router.get('/:skip&&:limit&&:sort', async (req, res) => {
        const users = await user.getAll(
            parseInt(req.params.skip),
            parseInt(req.params.limit),
            req.params.sort)
        res.send(users)
    });

    router.get('/auth/:username&&:password', async (req, res) => {
        const target = await user.getByAuth(req.params.username, req.params.password)
        target ?
            res.send(target) : res.status(404).json("Пользователь не найден!")
    });

    router.get('/:id', async (req, res) => {
        const target = await user.getById(req.params.id)
        target ? res.send(target) : res.status(404).json("Пользователь не найден!")
    });

    router.get('/', async (req, res) => {
        const users = await user.getAll()
        res.send(users)
    });

    router.get('/centerId/:centerId', async (req, res) => {
        const users = await user.getAllByCenterId(req.params.centerId)
        users[0] ? res.send(users) : res.status(404).json("Пользователи не найдены!")
    });

    router.post('/', async (req, res) => {
        const {payload} = req.body
        if (!await user.isExist(payload.phone, payload.mail, payload.username)) {
            const target = await user.add(payload)
            res.send(target)
        } else {
            res.status(400).json("Пользователь уже существует!")
        }
    });

    router.delete('/:id', async (req, res) => {
        if (await user.getById(req.params.id)) {
            const target = await user.delete(req.params.id)
            res.send(target)
        } else {
            res.status(404).json("Пользователь не найден!")
        }
    });

    router.put('/:id', async (req, res) => {
        if (await user.getById(req.params.id)) {
            const target = await user.update(req.params.id, req.body.payload)
            res.send(target)
        } else {
            res.status(404).json("Пользователь не найден!")
        }
    });

    return router;
}
