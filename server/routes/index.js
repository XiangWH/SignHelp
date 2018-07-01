/**
 * ajax 服务路由集合
 */
const router = require('koa-router')({
    prefix: '/weapp'
})
const controllers = require('../controllers')

// 从 sdk 中取出中间件
// 这里展示如何使用 Koa 中间件完成登录态的颁发与验证
const { auth: { authorizationMiddleware, validationMiddleware } } = require('../qcloud')

// --- 登录与授权 Demo --- //
// 登录接口
router.get('/login', authorizationMiddleware, controllers.login)
// 用户信息接口（可以用来验证登录态）
router.get('/user', validationMiddleware, controllers.user)

// --- 图片上传 Demo --- //
// 图片上传接口，小程序端可以直接将 url 填入 wx.uploadFile 中
router.post('/upload', controllers.upload)

// --- 信道服务接口 Demo --- //
// GET  用来响应请求信道地址的
router.get('/tunnel', controllers.tunnel.get)
// POST 用来处理信道传递过来的消息
router.post('/tunnel', controllers.tunnel.post)

// --- 客服消息接口 Demo --- //
// GET  用来响应小程序后台配置时发送的验证请求
router.get('/message', controllers.message.get)
// POST 用来处理微信转发过来的客服消息
router.post('/message', controllers.message.post)

// 用于向数据库查询微信号，获取用户信息
router.get('/checkId', controllers.checkId)
// 用于生成课程
router.get('/createCourse', controllers.createCourse)
// 用于学生退出课程
router.get('/deleteSCourse', controllers.deleteSCourse)
// 用于删除老师的课程
router.get('/deleteTCourse', controllers.deleteTCourse)
// 用于获取学生的课程
router.get('/getSCourses', controllers.getSCourses)
// 用于获取老师的课程
router.get('/getTCourses', controllers.getTCourses)
// 用于学生加入课程
router.get('/joinClass', controllers.joinClass)
// 用于限时开始时打开签到
router.get('/releaseSignIn_1', controllers.releaseSignIn_1)
// 用于限时结束时关闭签到
router.get('/releaseSignIn_2', controllers.releaseSignIn_2)
// 用于学生获取签到标志
router.get('/signIn_1', controllers.signIn_1)
// 用于学生保存签到状态
router.get('/signIn_2', controllers.signIn_2)
// 用于老师更新课程信息
router.get('/updateCourse', controllers.updateCourse)
// 用于老师修改学生的签到信息
router.get('/updateSignInInfo', controllers.updateSignInInfo)
// 用于向数据库中添加用户
router.get('/register', controllers.register)
// 导出签到表
router.get('/exportSignInTable', controllers.exportSignInTable)
// 在Courses表中查询courseId，返回特定课程
router.get('/oneCourse', controllers.oneCourse)
module.exports = router
