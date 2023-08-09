const express = require('express')
const UserController = require('../Controllers/UserController')
const MemberController = require('../Controllers/MemberController')
const SavingsController = require('../Controllers/SavingsController')
const LoanController = require('../Controllers/LoanController')
const RefundController = require('../Controllers/RefundController')
const AdressController = require('../Controllers/AdressController')
const CategoryController = require('../Controllers/CategoryController')
const Router = express.Router()
const AdminAuth = require('../Middleware/AdminAuth')


Router.get('/users', AdminAuth, UserController.index)
Router.post('/user', UserController.create)
Router.delete('/user/:id', UserController.delete)
Router.post('/user/passwordrecovery', UserController.passwordRecovery)
Router.put('/user/editpassword', UserController.editPassword)
Router.post('/user/login', UserController.login)
Router.get('/user/getLoginCredentials', UserController.getLoginCredentials)
Router.post('/user/loginTokenValidate', UserController.loginTokenValidate)

Router.get('/members', MemberController.index)
Router.post('/member', MemberController.create)
Router.get('/member/:id', MemberController.findOne)
Router.delete('/member/:id', MemberController.delete)
Router.put('/member', MemberController.update)

Router.get('/savings', SavingsController.index)
Router.post('/savings', SavingsController.create)
Router.delete('/savings', SavingsController.delete)

Router.get('/loan', LoanController.index)
Router.post('/loan', LoanController.create)

Router.post('/refund', RefundController.create)
Router.get('/refund/:id', RefundController.findRefund)

Router.post('/adress', AdressController.create)
Router.get('/adress/:id', AdressController.findAdress)
Router.get('/adress', AdressController.index)
Router.put('/adress', AdressController.update)
Router.delete('/adress/:id', AdressController.delete)

Router.post('/category', CategoryController.create)
Router.get('/categories', CategoryController.index)
Router.get('/category/:id', CategoryController.findOne)
Router.put('/category', CategoryController.update)
Router.delete('/category/:id', CategoryController.delete)


module.exports = Router