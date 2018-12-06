import jwt from 'jsonwebtoken'
const config = require('../../nuxt.config.js')

export function auth(req, res, next)
{
  let token = (req.method === 'POST') ? req.body.token : req.query.token

  this.verifyJWTToken(token)
    .then((decodedToken) =>
    {
      req.user = decodedToken.data
      next()
    })
    .catch((err) =>
    {
      res.status(400)
        .json({message: "Invalid auth token provided."})
    })
}


export function verifyJWTToken(token) 
{
  return new Promise((resolve, reject) =>
  {
    jwt.verify(token, config.env.secret, (err, decodedToken) => 
    {
      if (err || !decodedToken)
      {
        return reject(err)
      }

      resolve(decodedToken)
    })
  })
}