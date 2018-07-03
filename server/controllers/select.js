const { mysql } = require('../qcloud')
module.exports = async function (ctx, next) {
  // 查
  ctx.state.data = await mysql("Book").select('*')
  ctx.state.code = 1
}