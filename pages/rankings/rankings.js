// pages/rankings/rankings.js
var QQMapWX = require('../../utils/wx-jssdk.min.js');
var app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        rankingsOne: 1,
        rankingsSize: 10,
        rankingsData: [],
        isshow:false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

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
        //首次加载排名
        let that = this;
        wx.showLoading({
            title: '加载中...',
            mask: true
        })
        wx.request({
            data: {
                rankingsOne: 1,
                rankingsSize: 10
            },
            url: app.globalData.url + '/rankings',
            success(res) {
                console.log(res.data)
                that.setData({
                    rankingsData: res.data
                })
            }
        })
        wx.hideLoading()
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

        let that = this;
        let rankingsAdd = this.data.rankingsOne + 1;
        if (this.data.rankingsOne >= 8) {
            that.setData({
                isshow:true
            })
        } else {
            wx.showLoading({
                title: '加载中...',
                mask: true
            })
            this.setData({
                rankingsOne: rankingsAdd
            })
            wx.request({
                url: app.globalData.url + '/rankings',
                data: {
                    rankingsOne: rankingsAdd,
                    rankingsSize: 10
                },
                success(res) {
                    that.setData({
                        rankingsData: res.data,
                    })
                }
            })
            wx.hideLoading()
        }
        console.log(this.data.rankingsOne)


    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})