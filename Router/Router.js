const express = require('express')
const UserController = require('../Controllers/UserController')
const MemberController = require('../Controllers/MemberController')
const SavingsController = require('../Controllers/SavingsController')
const LoanController = require('../Controllers/LoanController')
const RefundController = require('../Controllers/RefundController')
const AdressController = require('../Controllers/AdressController')
const ContactController = require('../Controllers/ContactController')
<<<<<<< HEAD
const CategoryController = require('../Controllers/CategoryController')
=======
>>>>>>> bf1e4e5c676d2991cc2554d2c1e263c62042030a
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
Router.post('/refund', RefundController.create)
Router.get('/refund/:id', RefundController.findRefund)
Router.post('/adress', AdressController.create)
Router.get('/adress/id', AdressController.findAdress)
Router.get('/contact/:id', ContactController.findContact)
Router.post('/contact', ContactController.create)
<<<<<<< HEAD
Router.post('/category', CategoryController.create)
Router.get('/categories', CategoryController.index)
Router.get('/category/:id', CategoryController.findOne)
=======
>>>>>>> bf1e4e5c676d2991cc2554d2c1e263c62042030a


module.exports = Router