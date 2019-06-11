// pages/my/my.js
var QQMapWX = require('../../utils/wx-jssdk.min.js');
var app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        islogin: null,
        username: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) { 
        this.setData({
            islogin: app.globalData.islogin,
            username: app.globalData.username
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

    },
    clicklogin() {
        if (!app.globalData.islogin) {
            wx.navigateTo({
                url: '/pages/login/login'
            })
        }
    },
    exit(){
        wx.clearStorage('userName')
        app.globalData.islogin=false
        this.setData({
            islogin:false
        })

    }
})