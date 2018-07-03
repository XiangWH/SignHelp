// 在StudentsOfClass表中查询courseId，修改signInFlag

const { mysql } = require('../qcloud');

module.exports = async function (ctx) {
  var courseId = ctx.query.courseId
  var signInFlag = ctx.query.signInFlag

  await mysql('StudentsOfClass').update({ signInFlag }).where({ courseId })
}