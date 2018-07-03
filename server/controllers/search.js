const { mysql } = require('../qcloud')
module.exports = async function (ctx, next) {
  // 查
  /*
  var prize = ctx.query.prize
  ctx.state.data = await mysql("Book").select('*').where({prize}).first()
  ctx.state.code = 1
  */
  var a = ctx.query.a
  var _data = await mysql("abc").select('*').where({ a }).first()
  var id = _data.id
  ctx.state.data = await mysql("Book").select('*').where({ id }).first()
}