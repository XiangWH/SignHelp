//在Users表中查询wxId，返回idNum和identity

const { mysql } = require('../qcloud');
module.exports = async (ctx) => {
  var wxId = decodeURI(ctx.query.wxId);
  ctx.state.data = await mysql('Users').select('idNum','name','identity').where('wxId',ctx.query.wxId);
} 