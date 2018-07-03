// 

const { mysql } = require('../qcloud');
const { mysql: config } = require('../config')

module.exports = async function (ctx) {
  var courseId = ctx.query.courseId
  var signInFlag = ctx.query.signInFlag
  //var colname = ctx.query.sysTime

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

  // 在StudentsOfClass表中查询courseId，修改signInFlag
  await mysql('StudentsOfClass').update({ signInFlag }).where({ courseId });
  // 签到次数count + 1
  if (signInFlag == 1) {
    //await mysql('StudentsOfClass').update({ count:count+1 }).where({ courseId });
    DB.raw('UPDATE `StudentsOfClass` SET `count`= count+1 WHERE `courseId`=' + 'courseId').then(res => {
      //console.log('创建签到表成功')
      process.exit(0)
    })
  }
  
}