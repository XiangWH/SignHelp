//

const { mysql } = require('../qcloud');
const { mysql: config } = require('../config')

module.exports = async function (ctx) {
  
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

  var state = ctx.query.state
  var idNum = ctx.query.idNum
  var count = 'p' + ctx.query.count.toString() 
  var courseId = ctx.query.courseId
  // 在courseId签到表中，在idNum行count列中插入签到状态state
  //await mysql(courseId).update({ state }).where({ idNum : idNum, count});
  DB.raw('UPDATE '+courseId +' SET `' + count + '` = ' + state + ' WHERE `idNum` =' + idNum).then(res => {
    process.exit(0)
  })
}