// 根据用户信息在users表中添加用户

const { mysql } = require('../qcloud');
module.exports = async (ctx) => {
  var registerData = {
    wxId: decodeURI(ctx.query.wxId),
    idNum: ctx.query.idNum,
    name: decodeURI(ctx.query.name),
    identity: ctx.query.identity
  }
  await mysql('Users').insert(registerData)
} 