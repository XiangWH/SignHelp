// pages/teacher/teacher.js
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
      condition:false, //用于决定长按列表是否显示
      conditionId:0, //侦测长按点击的Id并且将其进行传输
      signInFlag:false, //发起签到使用的标志
      courseOfTeacher:[]
  },

  /**
   * 点击list进行跳转
   */
    operateTap:function(e) {
        console.log("id为：" + e.currentTarget.dataset.id);
        var courseId = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: '/pages/manageCourse/manageCourse?type='+courseId,
        })
    },

    /**
     * 长按弹出菜单
     * 用于删除的id传递给了courseId来方便长按之后的操作
     */
    operateLongTap:function(e) {       
        this.setData({
            condition:true,
            conditionId:e.currentTarget.dataset.id,
        })
        console.log("长按获得的ID为" + this.data.conditionId);
       
    },

    /**
     * 点击取消收回菜单
     */
    cancel:function() {
        this.setData({
            condition:false
        })
    },

    /**
     * 跳转到创建课程
     */
    createCourse:function() {
        wx.redirectTo({
            url: '/pages/createCourse/createCourse',
            success: function(res) {},
            fail: function(res) {},
            complete: function(res) {},
        })
    },



    /**
     * 网络请求得到课程
     * idNum传递课程id
     * 通过processCourseData增加数据
     * */
    getCourse:function() {
        var that = this;
        qcloud.request({
            url: `${config.service.host}/weapp/getTCourses`,
            data: {
                idNum: app.globalData.idNum
            }, 
            login : true,
            success: function (res) {
                console.log(res.data.data);
                var data2 =res.data.data
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
                    console.log(temp)
                    courses.push(temp);
                }
              console.log(courses)
              that.setData({
                    courseOfTeacher:courses
              })
                },
            fail(error) {
               util.showModel('请求失败', error);
               console.log('request fail', error);
           }            
        })
    },


    /**
     * 设置限时10min，修改签到标志，获取系统时间
     * 发起后转为canSignIn
     * 超过时间后转换为notSignIn
     */
    releaseSignIn:function(e) {
        this.setData({
            signInFlag:true
        });
        var that = this;
        var time = new Date().toLocaleDateString();
        
        console.log("signInFlag：" + this.data.signInFlag + " time " + time);
       /**标志有效则可以进行  */
        if (this.data.signInFlag == true) {
            qcloud.request({
                url: `${config.service.host}/weapp/releaseSignIn`,
                login: true,
                data: {
                    courseId:this.data.conditionId,
                    signInFlag:1,
                    sysTime:time
                },
                //header: {},
                //method: 'POST',
                //dataType: 'json',
                //responseType: 'text',
                success: function(res) {
                    console.log("签到请求发送成功")
                },
                fail: function(res) {
                    console.log("签到请求发送失败")
                },
                complete: function(res) {},
            })
        } 
        //设置10分钟后发送停止签到标签，现在为了简便设置时间为10秒
        setTimeout(
            function()  {
                qcloud.request({
                    url: `${config.service.host}/weapp/releaseSignIn`,
                    login: true,
                data: {
                    id: that.data.conditionId,
                    signInFlag: 0,
                   },
                //method: 'POST',
                success: function (res) {
                   console.log("停止签到请求发送成功")
                },
                fail: function (res) {
                    console.log("停止签到请求发送失败")
                },
            }) 
            }, 60000);

        //令其自动收回
        this.setData({
            condition: false
        })
    },


    /**
    *删除课程，在本地删除后传递给服务器要删除的课程编号 
    */
    deleteCourse:function(e) {
        console.log("要删除的课程ID是：" + this.data.conditionId);
       
        var newCourse = this.data.courseOfTeacher;
        var index = this.data.conditionId;
        for(let idx in newCourse) {
            if(newCourse[idx].courseId == index) {
                newCourse.splice(idx, 1)
            }
        }
        this.setData({
            courseOfTeacher: newCourse
        })

        qcloud.request({
            url: `${config.service.host}/weapp/deleteTCourse`,
             login : true,
            data: {
                courseId:this.data.conditionId
            },
            success: function(res) {
                console.log("课程已经成功删除")

            },
            fail(error) {
                util.showModel('课程删除请求失败', error);
                console.log('request fail', error);
            },       
            complete: function(res) {},
        })
        //令其自动收回
        this.setData({
            condition:false
        })
       
    },
  

  /**
   * 生命周期函数--监听页面加载
   * * 网络请求得到课程
     * idNum传递课程id
     * 通过processCourseData增加数据
   */
  onLoad: function (options) {
     this.getCourse();
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
      //this.getCourse();
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

