//Here is where we declare the modules and shit we will need
const express = require('express')
const passport = require('passport')
// const { authController } = require('../controllers/index')
const { catchErrors } = require('../middleware/error-handler')
const { UserController } = require('../controllers')

 
//set up the router
const router = express.Router()


router.post('/login', UserController.signin);
router.get('/logout', passport.authenticate('jwt', {session: false}), UserController.signout);

router.get('/', passport.authenticate('jwt', {session: false}), UserController.all);
router.post('/create', passport.authenticate('jwt', {session: false}), UserController.create);
router.put('/update', passport.authenticate('jwt', {session: false}), UserController.update);
router.post('/change', passport.authenticate('jwt', {session: false}), UserController.setPassword);
router.post('/delete', passport.authenticate('jwt', {session: false}), UserController.delete);


module.exports = router
