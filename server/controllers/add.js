const { mysql } = require('../qcloud')
const { mysql: config } = require('../config')
//async function (ctx, next)
module.exports = async (ctx) =>{
  // 增
  var book = {
    id: ctx.query.id,
    name : ctx.query.name,
    prize : ctx.query.prize,
    iiii : ctx.query.iiii
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
  await mysql("Book").insert(book);
  DB.raw('CREATE TABLE ' + book.id +
    '(`name` varchar(50) ,`studentID` varchar(50), `p1` varchar(50), `p2` varchar(50), `p3` varchar(50), `p4` varchar(50), `p5` varchar(50), `p6` varchar(50), `p7` varchar(50), `p8` varchar(50), `p9` varchar(50), `p10` varchar(50), `p11` varchar(50), `p12` varchar(50), `p13` varchar(50), `p14` varchar(50), `p15` varchar(50), `p16` varchar(50), `p17` varchar(50), `p18` varchar(50), `p19` varchar(50), `p20` varchar(50) NOT NULL)').then(res => {
      console.log('创建签到表成功')
      process.exit(0)
    })
}