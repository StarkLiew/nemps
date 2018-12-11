const { User } = require('../models')


exports.signin = () => {

}

exports.signout = () => {
  
}

/**
 * GET /api/users
 * Create a new local account.
 */
exports.all = (req, res, next) => {
    User.find({}, (err, data) => {
        res.send(data)
    })
}

exports.profile = (req, res, next) => {
    return res.send('NOT IMPLEMENTED')
    User.findOne({_id: req.body._id }, (err, data) => {
        res.send(data)
    })
}

/**
 * POST /api/users/create
 * Create a new local account.
 */
exports.create = (req, res, next) => {
  req.assert('email', 'Email is not valid').isEmail()

  req.assert('password', 'Password must be at least 8 characters long').len(8)

  req.sanitize('email').normalizeEmail({ gmail_remove_dots: false })


  const errors = req.validationErrors()

  if (errors) {
    req.flash('errors', errors)
    return res.redirect('/signup')

  }

  const user = new User({
    email: req.body.email,
    password: req.body.password
  })


  User.findOne({ email: req.body.email }, (err, existingUser) => {
    if (err) { return next(err)
 }
    if (existingUser) {
      req.flash('errors', { msg: 'Account with that email address already exists.' })

      return res.redirect('/signup')

    }
    user.save((err) => {
      if (err) { return next(err)
 }
      req.logIn(user, (err) => {
        if (err) {
          return next(err)

        }
        res.redirect('/')

      })

    })

  })

}


/**
 * PUT /api/users/update
 * Update profile information.
 */
exports.update = (req, res, next) => {
  req.assert('email', 'Please enter a valid email address.').isEmail()

  req.sanitize('email').normalizeEmail({ gmail_remove_dots: false })


  const errors = req.validationErrors()


  if (errors) {
    req.flash('errors', errors)

    return res.redirect('/account')

  }

  User.findById(req.user.id, (err, user) => {
    if (err) { return next(err)
 }
    user.email = req.body.email || ''

    user.profile.name = req.body.name || ''

    user.save((err) => {
      if (err) {
        if (err.code === 11000) {
          req.flash('errors', { msg: 'The email address you have entered is already associated with an account.' })

          return res.redirect('/account')

        }
        return next(err)

      }
      req.flash('success', { msg: 'Profile information has been updated.' })

      res.redirect('/account')

    })

  })

}


/**
 * POST /api/users/password
 * Update current password.
 */
exports.setPassword = (req, res, next) => {
  req.assert('password', 'Password must be at least 4 characters long').len(4)

  req.assert('confirmPassword', 'Passwords do not match').equals(req.body.password)


  const errors = req.validationErrors()


  if (errors) {
    req.flash('errors', errors)

    return res.redirect('/account')

  }

  User.findById(req.user.id, (err, user) => {
    if (err) { return next(err)
 }
    user.password = req.body.password

    user.save((err) => {
      if (err) { return next(err)
 }
      req.flash('success', { msg: 'Password has been changed.' })

      res.redirect('/account')

    })

  })

}


/**
 * POST /account/delete
 * Delete user account.
 */
exports.delete = (req, res, next) => {
  User.deleteOne({ _id: req.user.id }, (err) => {
    if (err) { return next(err)
 }
    req.logout()

    req.flash('info', { msg: 'Your account has been deleted.' })

    res.redirect('/')

  })

}

