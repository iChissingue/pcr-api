const express = require('express')
const UserController = require('../Controllers/UserController')
const MemberController = require('../Controllers/MemberController')
const SavingsController = require('../Controllers/SavingsController')
const LoanController = require('../Controllers/LoanController')
const Router = express.Router()

Router.get('/users', UserController.index)
Router.post('/user', UserController.create)
Router.delete('/user/:id', UserController.delete)
Router.get('/members', MemberController.index)
Router.post('/member', MemberController.create)
Router.get('/member/:id', MemberController.findOne)
Router.delete('/member', MemberController.delete)
Router.put('/member', MemberController.update)
Router.get('/savings', SavingsController.index)
Router.post('/savings', SavingsController.create)
Router.delete('/savings', SavingsController.delete)
Router.get('/loan', LoanController.index)
Router.post('/loan', LoanController.create)


module.exports = Router