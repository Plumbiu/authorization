const express = require('express')
const router = express.Router()


// session 的设置
router.get('/login', (req, res) => {
  // usernmae=admin&password=amin
  const { username, password } = req.query
  if(username === 'admin' && password === 'admin') {
    // 设置 session 信息
    req.session.username = 'admin'
    req.session.uid = '258aefccc'
    // 成功响应
    res.send('登陆成功')
  } else {
    res.send('登陆失败')
  }
})

// session 的读取
router.get('/cart', (req, res) => {
  // 检测 session 是否存在用户属性
  const { username, uid } = req.session
  console.log(username, uid)
  if(username) {
    res.send(`欢迎您${username}`)
  } else {
    res.send('对不起，您还未登陆')
  }
})
// session 的销毁
router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.send('退出成功~~')
  })
})

module.exports = router