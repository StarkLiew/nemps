//Here is where we declare the modules and shit we will need
const express = require('express')

//const { authController } = require('./controllers/index')
const { catchErrors } = require('../middleware/error-handler')

//set up the router
const router = express.Router()

// restrict index for logged in user only
// router.get('/', auth.home);

// route to register page
// router.get('/register', auth.register);

// route for register action
// router.post('/register', auth.doRegister);

// route to login page
// router.get('/login', catchErrors(authController.login));

// route for login action
// router.post('/login', catchErrors(authController.doLogin));

// route for logout action
// router.get('/logout', catchErrors(authController.logout));

module.exports = router