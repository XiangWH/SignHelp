// 根据课程信息在Courses表中添加课程，在StudentsOfClass表中添加courseId

const { mysql } = require('../qcloud');
//const uuid = require('node-uuid');

module.exports = async (ctx) => {

  var courseName = decodeURI(ctx.query.courseName)
    var idNum = ctx.query.idNum
    var placeOfClass = decodeURI(ctx.query.placeOfClass)
    var classTime1 = ctx.query.classTime1
    var classroom1 = decodeURI(ctx.query.classroom1)
    var classTime2 = ctx.query.classTime2
    var classroom2 = decodeURI(ctx.query.classroom1)
    var allStudents = ctx.query.allStudents
    var courseId = ctx.query.courseId


  // 更新课程信息
    await mysql('Courses').update({courseName ,   placeOfClass ,  classTime1 ,  classroom1 ,  classTime2 , classroom2 ,  allStudents }).where({ courseId});
  
}