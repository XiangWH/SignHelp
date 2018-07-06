var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')
var app = getApp()

Page({

  data: {
    
  },

  //加载学生当前课表
  onShow: function() {
    this.getCourse();

    /*qcloud.request({
      url: `${config.service.host}/weapp/getSCourses`,
      login: true,
      data: Scourses,
      success(result) {
        util.showSuccess('请求成功完成')
        that.setData({
          requestResult: JSON.stringify(result.data)
        })
      },
      fail(error) {
        util.showModel('请求失败', error);
        console.log('request fail', error);
      }
    })*/
  },

  getCourse: function () {
    var that = this;
    qcloud.request({
      url: `${config.service.host}/weapp/getSCourses`,
      data: {
        idNum: app.globalData.idNum
        //idNum: '15332002'
      },
      login: true,
      success: function (res) {
        //console.log(res.data.data);
        var data2 = res.data.data
        var courses = [];
        for (let idx in data2) {
          var temp = {
            courseName: data2[idx].courseName,
            placeOfClass: data2[idx].placeOfClass,
            classTime1: data2[idx].classTime1,
            classRoom1: data2[idx].classroom1,
            classTime2: data2[idx].classTime2,
            classRoom2: data2[idx].classroom2,
            allStudents: data2[idx].allStudents,
            courseId: data2[idx].courseId
          };
          //console.log(temp)
          courses.push(temp);
        }
        console.log(courses)
        that.setData({
          courseOfStudent: courses
        })
      },
      fail(error) {
        util.showModel('请求失败', error);
        console.log('request fail', error);
      }
    })
  },


  //加入课程
  joinCourse: function() {
    wx.navigateTo({
      url: '../student/joincourse',
    })

  },



  //课程信息页面跳转
  /*courseDetail: function (e) {
    console.log("id为：" + e.currentTarget.dataset.id);
    var courseId = 11111;
    wx.navigateTo({
      url: '../student/studentcourse?type' + courseId,
    })
  }，*/


  //课程信息跳转
  operateTap: function (e) {
    //console.log("id为：" + e.currentTarget.dataset.id);
    var courseId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../student/studentcourse?courseId=' + courseId,
    })
  },
  
})