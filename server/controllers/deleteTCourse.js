// 
const { mysql } = require('../qcloud');
const { mysql: config } = require('../config')

module.exports = async (ctx) => {
  var courseId = ctx.query.courseId
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
  // 在Courses表中查询courseId，删除对应行
  await mysql('Courses').del().where({ courseId});
  // 删除StudentsOfClass表中相应课程
  await mysql('StudentsOfClass').del().where({ courseId });
  // 删除签到表
  DB.raw('DROP TABLE ' + courseId).then(res => {
    console.log('删除签到表成功')
    process.exit(0)
  })
  
} 