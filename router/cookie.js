const express = require('express')
const router = express.Router()

router.get('/set-cookie', (req, res) => {
  // res.cookie('name', 'test') // 会在浏览器关闭的时候销毁
  res.cookie('name', 'test2', { maxAge: 60 * 1000 }) // maxAge 最大有效时间
  res.cookie('theme', 'blue')
  res.send('home')
})

// 删除 cookie
router.get('/remove-cookie', (req, res) => {
  // 调用方法
  res.clearCookie('name')
  res.send('删除成功')
})

// 获取 cookie
router.get('/get-cookie', (req, res) => {
  // 获取 cookie
  res.send(req.cookies)
})

module.exports = router