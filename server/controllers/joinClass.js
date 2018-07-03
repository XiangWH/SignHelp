//在StudentsOfClass表中查询courseId，加入idNum

const { mysql } = require('../qcloud');
const { mysql: config } = require('../config')

module.exports = async (ctx) => {
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
  var t = await mysql('Courses').select('courseId').where('courseId', ctx.query.courseId)
  if (t.length != 0) {
    var name = decodeURI(ctx.query.name)
    var data = { 
      courseId: ctx.query.courseId, 
      idNum:ctx.query.idNum, 
      signInFlag: 0 ,
      count:0
    }
    // 在StudentsOfClass添加信息
    await mysql('StudentsOfClass').insert(data);
    // 在签到表中添加信息
    await mysql(data.courseId).insert({ 'name': name , 'idNum': data.idNum });
  }
  else {
    ctx.state.data = "该课程不存在"
  }
  
} 