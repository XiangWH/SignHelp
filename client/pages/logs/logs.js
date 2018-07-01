//logs.js
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')
const app = getApp()

Page({
  data: {
    identity: "0",
  },
  
  onLoad: function () {
    
  },
  onShow: function () {
    
  },

  //点击登陆，获取
  tapnamess: function () {
    var that = this
    var test = getApp().globalData.wxId;
    var book = {
      wxId: test
    }
    console.log(book)
    qcloud.request({
      url: `${config.service.host}/weapp/checkId`,
      login: true,
      data: book,
      success(result) {
        //判断是否注册过
        if (result.data.data.length == 0) {
          that.setData({
            identity: 0
          })
        } else {
          console.log(result.data.data)
          //identity赋值
          that.setData({
            identity: JSON.stringify(result.data.data[0].identity)
          })
          //全局变量赋值
          getApp().globalData.idNum = result.data.data[0].idNum
          getApp().globalData.name = result.data.data[0].name
          //console赋值是否成功
          console.log(that.data.identity)
          var test2 = getApp().globalData.idNum
          var test3 = getApp().globalData.name
          //console.log(test2, test3)
        }
        // 页面跳转
        if (that.data.identity == 0) {
          wx.navigateTo({
            url: '../index/index'
          })
        }
        else if (that.data.identity == 1) {
          wx.redirectTo({
            url: '../teacher/teacher',
          })
        }
        else {
          wx.redirectTo({
            url: '../student/student',
          })
        }
      },
      fail(error) {
        util.showModel('请求失败', error);
        console.log('request fail', error);
      }
    })
    
  },

  //
  getSCourse:function() {
    var that = this
    var test = "15332002"
    qcloud.request({
      url: `${config.service.host}/weapp/getSCourses`,
      login: true,
      data: test,
      success(result) {
          console.log(result.data.data)
      },
      fail(error) {
        util.showModel('请求失败', error);
        console.log('request fail', error);
      }
    })
  },
  //
  joinClass: function () {
    var that = this
    var test = {
      name: encodeURI("黄文祥"),
      courseId: "qqq", 
      idNum: 15333333,
      signInFlag:0
    }
    qcloud.request({
      url: `${config.service.host}/weapp/joinClass`,
      login: true,
      data: test,
      success(result) {
        util.showModel('加入课程失败', result.data.data);
      },
      fail(error) {
        util.showModel('请求失败', error);
        console.log('request fail', error);
      }
    })
  },
  //
  signIn2: function () {
    var that = this
    var test = {
      state : 1,
      idNum : "15331425",
      count : "5",
      courseId: "af5aa8"
    }
    qcloud.request({
      url: `${config.service.host}/weapp/signIn_2`,
      login: true,
      data: test,
      success(result) {
        util.showSuccess('请求成功完成');
      },
      fail(error) {
        util.showModel('请求失败', error);
        console.log('request fail', error);
      }
    })
  },
  //
  signIn1: function () {
    var that = this
    var courseId = 'af5aa8'
    qcloud.request({
      url: `${config.service.host}/weapp/signIn_1`,
      login: true,
      data: { courseId },
      success(result) {
        console.log(result.data.data)
        util.showSuccess('请求成功完成');
      },
      fail(error) {
        util.showModel('请求失败', error);
        console.log('request fail', error);
      }
    })
  },
  updataSignIn: function () {
    var that = this
    var test = {
      state: 1,
      idNum: "15333333",
      count: "5",
      courseId: "qqq"
    }
    qcloud.request({
      url: `${config.service.host}/weapp/updateSignInInfo`,
      login: true,
      data: test,
      success(result) {
        util.showModel('加入课程失败', result.data.data);
      },
      fail(error) {
        util.showModel('请求失败', error);
        console.log('request fail', error);
      }
    })
  },

  exported : function () {
    var that = this
    var d = {
      courseId : 'e5c15g'
    } 
    qcloud.request({
      url: `${config.service.host}/weapp/exportSignInTable`,
      login: true,
      data: d,
      success(result) {
        util.showModel('加入课程失败', result.data.data);
      },
      fail(error) {
        util.showModel('请求失败', error);
        console.log('request fail', error);
      }
    })
  }
})
