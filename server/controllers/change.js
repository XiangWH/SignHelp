const { mysql } = require('../qcloud')
module.exports = async function (ctx, next) {
  // 改
  var id = ctx.query.id
  var name = ctx.query.name
  await mysql("Book").update({ name }).where({ id })
}