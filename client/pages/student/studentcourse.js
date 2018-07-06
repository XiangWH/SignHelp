// pages/student/studentcourse.js
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')
var bmap = require('../../libs/bmap-wx.min.js')
var app = getApp()
var wxMarkerData = [];
var signintable = [];

Page({

  /**
   * 页面的初始数据
   */
  data: {
    ak: 'rPGZgrc3dOm9ain7457X3GY8ELFNIqSh',
    markers: [],
    longitude: '',
    latitude: '',
    address: '',
    courseId:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    this.getCourse(options);
    this.bmap();
    this.logoing(options);
  },

  //logoing
  logoing: function (options) {
    var that = this;
    qcloud.request({
      url: `${config.service.host}/weapp/signIn_1`,
      login: true,
      data: {
        courseId: options.courseId
      },
      success(result) {
        signintable = result.data.data
        util.showSuccess('请求成功完成')
        //console.log(this.signintable)
        // console.log(signintable[0].signInFlag)
        console.log(result.data.data);
        var data2 = result.data.data
        var courses = [];
        for (let idx in data2) {
          var temp = {
            count: data2[0].count,
            courseId: data2[0].courseId,
            idNum: data2[0].idNum,
            signInFlag: data2[0].signInFlag
          };
          console.log(temp)
          courses.push(temp);
        }
        console.log(courses)
        that.setData({
          signintable: courses
        })
      },

      fail(error) {
        util.showModel('请求失败', error);
        console.log('request fail', error);
      }
    })
  },

  //获取地点
  bmap: function() {
    var that = this;
    /* 获取定位地理位置 */
    // 新建bmap对象   
    var BMap = new bmap.BMapWX({
      ak: that.data.ak
    });
    var fail = function (data) {
      console.log(data);
    };
    var success = function (data) {
      //返回数据内，已经包含经纬度  
      console.log(data);
      //使用wxMarkerData获取数据  
      wxMarkerData = data.wxMarkerData;
      //把所有数据放在初始化data内  
      that.setData({
        markers: wxMarkerData,
        latitude: wxMarkerData[0].latitude,
        longitude: wxMarkerData[0].longitude,
        address: wxMarkerData[0].address,
      });
    }
    // 发起regeocoding检索请求   
    BMap.regeocoding({
      fail: fail,
      success: success
    });       
  },

  //加载课程信息
  getCourse: function (options) {
    var that = this;
    qcloud.request({
      url: `${config.service.host}/weapp/oneCourse`,
      data: {
        courseId : options.courseId
      },
      login: true,
      success: function (res) {
        var list = res.data.data;
        var dataJson = {};
        //console.log(list);
        if (list == null) {
          list = [];
        }
        dataJson["coursedata[0].courseName"] = list[0].courseName;
        dataJson["coursedata[0].placeOfClass"] = list[0].placeOfClass;
        dataJson["coursedata[0].classTime1"] = list[0].classTime1;
        dataJson["coursedata[0].classroom1"] = list[0].classroom1;
        dataJson["coursedata[0].classTime2"] = list[0].classTime2;
        dataJson["coursedata[0].classroom2"] = list[0].classroom2;
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
  },

  //签到
  signin: function() {
    var that = this;
    console.log(signintable[0].signInFlag)
    console.log(signintable[0].count)
    console.log('???' + wxMarkerData[0].latitude)
    // 判断签到条件
    if (parseInt(wxMarkerData[0].latitude) == 23 && parseInt(wxMarkerData[0].longitude) == 113 && signintable[0].signInFlag == 1) {
      
      qcloud.request({
        url: `${config.service.host}/weapp/signIn_2`,
        login: true,
        data: {
          idNum: signintable[0].idNum,
          state: signintable[0].signInFlag,
          count: signintable[0].count,
          courseId: this.data.courseId
        },
        success(result) {
          wx.showToast({
            title: '签到成功',
            duration: 2000
          })
          //util.showSuccess('请求成功完成')
          that.setData({
            requestResult: JSON.stringify(result.data)
          })
        },
        fail(error) {
          util.showModel('请求失败', error);
          console.log('request fail', error);
        },
      })
      
    }
    else wx.showToast({
      title: '签到失败',
      duration: 2000
    })
    
  }
})