// 在StudentsOfClass表中查询courseId，删除对应行

const { mysql } = require('../qcloud');
module.exports = async (ctx) => {
  var courseId = ctx.query.courseId
  // 在StudentsOfClass表中查询courseId，删除对应行
  await mysql('StudentsOfClass').del().where({courseId});
  // 在courseId签到表中删除相应行
  await mysql( courseId ).del().where({ courseId });
} 