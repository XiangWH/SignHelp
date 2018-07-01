// pages/checksignchart/checksignchart.js
var app = getApp()
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    listData: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log("id为11：" + options.type);
    this.setData({
      courseId: options.type,
    });
    var courseId = options.type;
    qcloud.request({
      url: `${config.service.host}/weapp/exportSignInTable`,
      data: {
        courseId: options.type
      },
      login: true,
      success: function (res) {
        var list = res.data.data;
        console.log(list);
        var listdataa = [];
        for (let idx in list) {
          var temp = {
          idnum : list[idx].idNum,
          sign1 : list[idx].p1,
          sign2 : list[idx].p2,
          sign3 : list[idx].p3,
          sign4 : list[idx].p4,
          sign5 : list[idx].p5,
          sign6 : list[idx].p6,
          sign7 : list[idx].p7,
          sign8 : list[idx].p8,
          sign9 : list[idx].p9,
          sign10 : list[idx].p10
          };
          listdataa.push(temp);
        }
        console.log(listdataa);
        that.setData({
          listData: listdataa
        })
      
        console.log(listData);
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

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
   
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
