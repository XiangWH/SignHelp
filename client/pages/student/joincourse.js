// pages/student/joincourse.js
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    idNum:'',
    courseId:''
  },

  joincourseid: function (e) {
    this.data.courseId = e.detail.value;
  },

  //学生添加新的课程
  takecourseId: function () {
    var that = this
    var id = {
      idNum: app.globalData.idNum,
      //idNum: '15332002',
      signInFlag: '1',
      courseId: this.data.courseId
    }

    qcloud.request({
      url: `${config.service.host}/weapp/joinClass`,
      login: true,
      data: id,
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
    })
  },

  //返回学生页面
  getback: function() {
    wx.navigateBack({
      delta: 1,
    })
  }

  

  
})