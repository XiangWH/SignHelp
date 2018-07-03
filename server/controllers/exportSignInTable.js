// 把名为‘courseId’的签到表全部输出

const { mysql } = require('../qcloud');
/*const { mysql: config } = require('../config')

module.exports = async (ctx) => {
  var tableName = ctx.query.courseId
  var count = 0
  count = count + 1;
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

    DB.raw('select * FROM '+ tableName +" WHERE 1 into outfile '/tmp/count.xls'").then(res => {
        process.exit(0)
      })
}*/

module.exports = async (ctx) => {
  ctx.state.data = await mysql(ctx.query.courseId).select('*');
} 