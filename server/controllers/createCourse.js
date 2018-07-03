// 根据课程信息在Courses表中添加课程，生成名为courseId的签到表

const { mysql } = require('../qcloud');
const { mysql: config } = require('../config')

module.exports = async (ctx) => {
  var courseData = {
    courseName:decodeURI(ctx.query.courseName),
    idNum: ctx.query.idNum,
    placeOfClass: decodeURI(ctx.query.placeOfClass),
    classTime1: ctx.query.classTime1,
    classroom1: decodeURI(ctx.query.classroom1),
    classTime2: ctx.query.classTime2,
    classroom2: decodeURI(ctx.query.classroom1),
    allStudents: ctx.query.allStudents,
    courseId: ctx.query.courseId 
  }

  const DB = require('knex')({
    client: 'mysql',
    connection: {
      host: config.host,
      port: config.port,
      user: config.user,
      password: config.pass,
      database: config.db,
      charset: config.char,
      multipleStatements: true
    }
  })
  // 添加课程
  await mysql('Courses').insert(courseData)
  // 生成签到表

  DB.raw('CREATE TABLE ' + courseData.courseId + 
    '(`name` varchar(50) ,`idNum` varchar(50), `p1` varchar(50), `p2` varchar(50), `p3` varchar(50), `p4` varchar(50), `p5` varchar(50), `p6` varchar(50), `p7` varchar(50), `p8` varchar(50), `p9` varchar(50), `p10` varchar(50), `p11` varchar(50), `p12` varchar(50), `p13` varchar(50), `p14` varchar(50), `p15` varchar(50), `p16` varchar(50), `p17` varchar(50), `p18` varchar(50), `p19` varchar(50), `p20` varchar(50))').then(res => {
    console.log('创建签到表成功')
    process.exit(0)
  })
}