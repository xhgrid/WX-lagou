// pages/login/login.js
var QQMapWX = require('../../utils/wx-jssdk.min.js');
var app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        userNamevalue: '',
        userPwdvalue: '',
        islogin: null,
        username: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.setData({
            islogin: app.globalData.islogin
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },
    userNamevalue(e) {
        this.setData({
            userNamevalue: e.detail.value
        })
    },
    userPwdvalue(e) {
        this.setData({
            userPwdvalue: e.detail.value
        })
    },
    login(event) {
        let userName = this.data.userNamevalue
        let userPwd = this.data.userPwdvalue
        let that = this;
        if (!userName || !userPwd) {
            wx.showToast({
                title: '用户名密码不能为空',
                icon: "none"
            })
        } else {
            wx.login({
                success(res) {
                    if (res.code) {
                        // 发起网络请求
                        wx.request({
                            data: {
                                userName,
                                userPwd
                            },
                            url: app.globalData.url + '/login/logins',
                            success(res) {
                                console.log(res.data)
                                if (res.data.num == 0) {
                                    app.globalData.islogin = true
                                    app.globalData.username = res.data.userName
                                    wx.setStorageSync('userName', res.data.userName); //将userName存入本地缓存

                                    wx.reLaunch({
                                        url: '../../pages/position/position'
                                    })
                                } else {
                                    wx.showToast({
                                        title: '用户名或密码错误',
                                        icon: "none"
                                    })
                                }
                            }
                        })
                    } else {
                        console.log('登录失败！' + res.errMsg)
                    }
                }
            })
        }
    },
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})