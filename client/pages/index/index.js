//index.js
//获取应用实例
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')
const app = getApp()

Page({
  data: {
    wxId: '',
    idNum: '',
    name: '',
    identity: ''
  },
  //事件处理函数
  formSubmit: function (e) {
    var that = this
    var test = getApp().globalData.wxId;
    var test2 = getApp().globalData.idNum;
    //console.log(test2)
    //console.log('form发生了submit事件，携带数据为：', e.detail.value)
    //注册数据
    var registerData = {
      wxId: encodeURI(test),
      idNum: e.detail.value.idNum,
      name: encodeURI(e.detail.value.name),
      identity: e.detail.value.identity
    }
    console.log(registerData.wxId)
    qcloud.request({
      url: `${config.service.host}/weapp/register`,
      login: true,
      data: registerData,
      success(result) {
        util.showSuccess('注册成功')
        console.log(result.data.data)
      },
      fail(error) {
        util.showModel('请求失败', error);
        console.log('request fail', error);
      }
    })
  },

})
