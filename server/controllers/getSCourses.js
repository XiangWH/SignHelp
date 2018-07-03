const { mysql } = require('../qcloud');
const { mysql: config } = require('../config')
module.exports = async (ctx) => {
  /*
  // 在StudentsOfClass表中查询idNum，得到对应courseId
  var temp = mysql('StudentsOfClass').select('courseId').where('idNum', ctx.query.idNum);
  // 在Courses表中查询courseId，返回courseName、placeOfClass、classTime1、classroom1、classTime2、classroom2、courseId
  var cid = JSON.stringify(temp); 
  ctx.state.data = await mysql('Courses').select('courseName', 'placeOfClass', 'classTime1', 'classroom1', 'classTime2', 'classroom2', 'courseId').where('courseId', cid.courseId)
*/
  var idNum = ctx.query.idNum
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

//SELECT * FROM Courses INNER JOIN StudentsOfClass on Courses.courseId = StudentsOfClass.courseId WHERE StudentsOfClass.idNum = 15332002

  /*DB.raw('SELECT * FROM Courses INNER JOIN StudentsOfClass on Courses.courseId = StudentsOfClass.courseId WHERE StudentsOfClass.idNum = ' + idNum).then(res => {
    console.log('删除签到表成功')
    ctx.state.data = res
    process.exit(0)
  })*/
  ctx.state.data = await mysql('Courses').innerJoin('StudentsOfClass', 'Courses.courseId', '=', 'StudentsOfClass.courseId');
}