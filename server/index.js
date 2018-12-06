const consola = require('consola')
const mongoose = require('mongoose')
const passport = require('passport')
const bodyParser = require('body-parser')
const { User } = require('./models/')
const LocalStrategy = require('passport-local')
const Oauth2Strategy = require('passport-oauth2')
const passportLocalMongoose = require('passport-local-mongoose')
const session = require('express-session')
const { Nuxt, Builder } = require('nuxt')
let config = require('../nuxt.config.js')

const express = require('express')

// const index = require('./src/routes/index');
const { apiRoutes } = require('./routes/index')
const { webRoutes } = require('./routes/index')

const app = express()
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000

app.set('port', port)

// Use native ES6 Promises since mongoose's are deprecated.
mongoose.Promise = global.Promise

// Connect to the database
mongoose.connect(
  config.env.mongoUri,
  { useNewUrlParser: true }
)
// Fail on connection error.
mongoose.connection.on('error', error => {
  throw error
})

//Passport
app.use(
  session({
    secret: process.env.secret || 'sentinelPeople',
    resave: false,
    saveUninitialized: false
  })
)
app.use(passport.initialize())
app.use(passport.session())

require('./config/passport')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/api', apiRoutes)

// Import and Set Nuxt.js options

config.dev = !(process.env.NODE_ENV === 'production')

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}
start()
