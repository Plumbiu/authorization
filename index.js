const express = require('express')
const cookieParser = require('cookie-parser')
const MongoStore = require('connect-mongo')
const session = require('express-session')
const jwt = require('jsonwebtoken')
const app = express()
const cookieRouter = require('./router/cookie')
const sessionRtouer = require('./router/session')
const tokenRouter = require('./router/token')
// 创建(生成) token
// let token = jwt.sign(用户数据，加密字符串，配置对象)
let token = jwt.sign({
  username: 'test'
}, 'plumbiu', {
  expiresIn: 60, // 单位 s
})
// 校验token
jwt.verify(token, 'plumbiu', (err, data) => {
  if(err) {
    console.log('校验失败')
    return
  }
  console.log(data)
})
app.use(cookieParser())
app.use(session({
  name: 'sid', // 设置 cookie 的 anme，默认值是：connect.sid
  secret: 'plumbiu', // 参与加密的字符串(又称签名)
  saveUninitialized: false, // 是否每次请求都设置一个 cookie 来存储 session 的 id
  resave: true, // 是否在每次请求时重新保存 session
  store: MongoStore.create({
    mongoUrl: 'mongodb://127.0.0.1:27017/session', // 数据库的连接配置
  }),
  cookie: {
    httpOnly: true, // 开启后前端无法通过 JS 操作
    maxAge: 1000 * 3000 // 控制 sessionId 的过期时间
  }
}))

app.use('/', cookieRouter)
app.use('/', sessionRtouer)
app.use('/token/', tokenRouter)

app.listen(3000, () => {
  console.log('server is running at http://127.0.0.1:3000')
})