const express = require('express')
const UserController = require('../Controllers/UserController')
const MemberController = require('../Controllers/MemberController')
const Router = express.Router()

Router.get('/users', UserController.index)
Router.post('/user', UserController.create)
Router.delete('/user/:id', UserController.delete)
Router.get('/members', MemberController.index)
Router.post('/member', MemberController.create)
Router.get('/member/:id', MemberController.findOne)
Router.delete('/member', MemberController.delete)


module.exports = Router