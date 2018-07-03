// 在Courses表中查询idNum，返回courseName、placeOfClass、classTime1、classroom1、classTime2、classroom2、allStudentsNum、courseId

const { mysql } = require('../qcloud');
module.exports = async (ctx) => {
  ctx.state.data = await mysql('Courses').select('courseName','placeOfClass','classTime1','classroom1','classTime2','classroom2','allStudents','courseId').where('idNum', ctx.query.idNum);
} 