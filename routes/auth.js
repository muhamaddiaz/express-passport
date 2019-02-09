const router = require('express').Router()
const jwt = require('jsonwebtoken')

router.get('/', (req, res) => {
  res.render('home')
})

router.post('/users', verifyToken, (req, res) => {
  jwt.verify(req.token, 'secret', (err, authData) => {
    if(err) {
      res.sendStatus(403)
      console.log(err)
    } else {
      res.json({
        message: "you has been authenticated!",
        authData
      })
    }
  })
})

router.post('/login', (req, res) => {
  const user = {
    name: "Muhamad Diaz",
    age: 19
  }

  jwt.sign({user}, 'secret', (err, token) => {
    res.json({
      token
    })
  })
})

function verifyToken(req, res, next) {
  const bearerToken = req.headers['authorization']
  if(typeof bearerToken !== 'undefined') {
    const splitToken = bearerToken.split(' ')
    const token = splitToken[1]
    req.token = token
    next()
  } else {
    return res.sendStatus(403)
  }
}

module.exports = router