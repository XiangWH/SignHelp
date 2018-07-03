const { mysql : config } = require('../config')
const { mysql } = require('../qcloud')
/*
const { mysql } = require('../qcloud')
module.exports = async function (ctx, next) {
  // 增加一列
  var colname = ctx.query.colname
  var total = 'alter table Book add column ' + colname +' varchar(100) not null'
  DB("Book").raw(total)
 ctx.state.data = total
}
*/
module.exports = async function (ctx, next) {
  var colname = ctx.query.colname
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
  DB.raw('ALTER TABLE Book ADD COLUMN ' + colname + ' VARCHAR(100) NOT NULL').then(res => {
    console.log(res)
  })
  ctx.state.code = 10
}