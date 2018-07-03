// 在Courses表中查询courseId，返回courseName、placeOfClass、classTime1、classroom1、classTime2、classroom2、allStudentsNum、

const { mysql } = require('../qcloud');
module.exports = async (ctx) => {
  ctx.state.data = await mysql('Courses').select('courseName', 'placeOfClass', 'classTime1', 'classroom1', 'classTime2', 'classroom2', 'allStudents').where('courseId', ctx.query.courseId);
} 