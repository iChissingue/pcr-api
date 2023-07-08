const express = require('express')
const UserController = require('../Controllers/UserController')
const Router = express.Router()

Router.get('/users', UserController.index)
Router.post('/user', UserController.create)
Router.delete('/user/:id', UserController.delete)


module.exports = Router