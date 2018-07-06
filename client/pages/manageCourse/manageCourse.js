// mypages/creatcourse/creatcourse.js
var app = getApp()
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    courseId:"0",
    count:"0",
  },
  
  bindTimeChange1: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      time1: e.detail.value
    })
  },
  bindTimeChange2: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      time2: e.detail.value
    })
  },
  bindTimeChange3: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      time3: e.detail.value
    })
  },
  bindTimeChange4: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      time4: e.detail.value
    })
  },
  submit: function (e) {
    var that = this;
    console.log(e.detail.value);
    var courseData = {
      courseName: e.detail.value.courseName,     
      placeOfClass: e.detail.value.placeOfClass,
      classTime1: e.detail.value.classTime1,
      classroom1: e.detail.value.classroom1,
      classTime2: e.detail.value.classTime2,
      classroom2: e.detail.value.classroom2,
      allStudents: e.detail.value.allStudents,
      courseId: this.data.courseId
    }
    qcloud.request({
      url: `${config.service.host}/weapp/updateCourse`,
      login: true,
      data: courseData,
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
    }),
      wx.navigateBack()
  },
  reset: function (e) {
    console.log('已经重置对象')
  },


  submit1: function (e) {
    console.log(e.detail.value);
    var that = this;
    var info = {
      idNum: e.detail.value.studentnum,
      state: e.detail.value.state,
      course: this.data.courseId,
      count: this.data.count
    };
    qcloud.request({
      url: `${config.service.host}/weapp/updateSignInInfo`,
      login: true,
      data:info,
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
    }),
      wx.navigateBack()
  },
  reset1: function (e) {
    console.log('已经重置对象')
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    this.setData({
      courseId:options.type,
    });
    var courseId = options.type;
    // 加载课程信息
    qcloud.request({
      url: `${config.service.host}/weapp/oneCourse`,
      data: {
        courseId: options.type
      },
      login: true,
      success: function (res) {
        var list = res.data.data;
        var dataJson = {};
        console.log(list);
        if (list == null) {
          list = [];
        }
        dataJson["coursedata[0].courseName"] = list[0].courseName;

        dataJson["coursedata[0].placeOfClass"] = list[0].placeOfClass;
        dataJson["coursedata[0].classTime1"] = list[0].classTime1;
        dataJson["coursedata[0].classroom1"] = list[0].classroom1;
        dataJson["coursedata[0].classTime2"] = list[0].classTime2;
        dataJson["coursedata[0].classroom2"] = list[0].classroom2; 
        dataJson["coursedata[0].allStudents"] = list[0].allStudents;
        dataJson["coursedata[0].courseId"] = courseId;
        console.log(dataJson);
        that.setData(dataJson);
        wx.showToast({
          title: "获取数据成功",
          icon: 'success',
          duration: 2000
        })
      },
      fail(error) {
        util.showModel('请求失败', error);
        console.log('request fail', error);
      }
    })
    // 加载课程签到情况
    console.log("111" + options.type);
    qcloud.request({
      url: `${config.service.host}/weapp/signIn_1`,
      data: {
        courseId: options.type
      },
      login: true,
      success: function (res) {
        console.log("111" + res.data.data);
        that.setData({
          count : res.data.data[0].count,
        });
        console.log(this.data.count);
      },
      fail(error) {
        util.showModel('请求失败', error);
        console.log('request fail', error);
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */

  onReady: function () {
    //this.loadcoursedata();

  },
  operateTap: function () {
    console.log("id为：" + this.data.courseId);
    var courseId = this.courseId;
    wx.navigateTo({
      url: '/pages/checksignchart/checksignchart?type=' + this.data.courseId,
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    that.setData({
      coursedata: [
        {
          "courseName": "",
          "idNum": "",
          "placeOfClass": "",
          "classTime1": "",
          "classroom1":"",
          "classTime2": "",
          "classroom2": "",
         " allStudents": "",
          "courseId": ""
          
        },
        {
          "name": "name2",
          "age": 101
        }
      ]
    });
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
