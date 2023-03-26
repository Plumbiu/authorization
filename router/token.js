const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const tokenVerifyMiddleware = (req, res, next) => {
  let token = req.get('token')
  if(!token) {
    return res.send({
      message: '没有 token'
    })
  }
  jwt.verify(token, 'plumbiu', (err, data) => {
    if(err) {
      return res.send({
        message: 'token无效'
      })
    }
    next()
  })
}
router.get('/login', (req, res) => {
  const { username, password } = req.query
  if(username !== 'admin' || password !== 'admin') {
    return res.send({
      message: '账户或者密码错误'
    })
  }
  let token = jwt.sign({
    username
  }, 'plumbiu', { expiresIn: 60 * 60 })
  res.send({
    message: '登陆成功',
    token
  })
})

router.get('/test', (req, res) => {
  let token = req.get('token')
  if(!token) {
    return res.send({
      message: '没有 token'
    })
  }
  jwt.verify(token, 'plumbiu', (err, data) => {
    if(err) {
      return res.send({
        message: 'token无效'
      })
    }
    res.send({
      message: '登陆成功',
      data
    })
  })
})

router.get('/info', tokenVerifyMiddleware, (req, res) => {
  res.send({
    message: 'token有效，来自 info 路由'
  })
})
router.use(tokenVerifyMiddleware)
router.get('/info-use', (req, res) => {
  res.send({
    message: 'token有效，来自 info-use 路由'
  })
})
module.exports = router