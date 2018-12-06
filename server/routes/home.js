
//Here is where we declare the modules and shit we will need
const express = require('express')

const { catchErrors } = require('../middleware/error-handler')

//set up the router
const router = express.Router()



router.get("/",function(req,res){    
      res.render("home");
});
router.get("/secret",function(req, res){    
     res.render("secret");
});

module.exports = router