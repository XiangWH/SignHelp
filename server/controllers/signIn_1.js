//

const { mysql } = require('../qcloud');

module.exports = async function (ctx) {
  var courseId = ctx.query.courseId
  // 在StudentsOfClass表中查询courseId，返回signInFlag、count
  ctx.state.data = await mysql('StudentsOfClass').select('*').where({courseId});
}