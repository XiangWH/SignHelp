const { mysql } = require('../qcloud')
module.exports = async function (ctx, next) {
  // 改
  var id = ctx.query.id
  await mysql("Book").del().where({id} );
}