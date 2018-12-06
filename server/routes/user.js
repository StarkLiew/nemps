//Here is where we declare the modules and shit we will need
const express = require('express')
const passport = require('passport')
// const { authController } = require('../controllers/index')
const { catchErrors } = require('../middleware/error-handler')
import { auth } from '../middlewares/auth'
const { UserController } = require('../controllers')

 
//set up the router
const router = express.Router()

router.get('/', UserController.all);
router.post('/create', UserController.create);
router.put('/update', UserController.update);
router.post('/change', UserController.setPassword);
router.post('/delete', UserController.delete);

module.exports = router
