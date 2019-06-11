// pages/position/position.js
var QQMapWX = require('../../utils/wx-jssdk.min.js');
var app = getApp();


Page({
    /**
     * 页面的初始数据
     */
    data: {
        positionData: [], //初始数据
        result: [],
        pageOne: 1,
        pageSize: 20,
        work: '',
        disabled: true, //按钮状态
        color: null, //按钮颜色
        islogin: null,
        isclick: '',
        isworks: false,

    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        let user = wx.getStorageSync('userName'); //获取本地缓存中的userName
        if(user){
            this.setData({
                isworks: true,
            })
        }
        console.log(this.data.isworks)
        this.setData({
            islogin: app.globalData.islogin,
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

        // console.log(app.globalData.islogin)
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
        //首次加载
        let that = this;
        wx.showLoading({
            title: '加载中...',
            mask: true
        })
        wx.request({
            data: {
                pageOne: 1,
                pageSize: 20
            },
            url: app.globalData.url + '/position/positionList',
            success(res) {
                // console.log(res.data)
                that.setData({
                    positionData: res.data
                })
            }
        })
        wx.hideLoading()
    },
    seek(){
        ///页面跳转
        wx.navigateTo({
            url: '/pages/seek/seek'
        })
    },
    Detail(event) {
        var companyid = event.target.dataset.companyid || event.currentTarget.dataset.companyid;
        ///页面跳转
        wx.navigateTo({
            url: '/pages/jobDetails/jobDetails?companyid=' + companyid,
        })
        //缓存
        wx.setStorageSync('companyid', companyid)
    },

    isclick(e) {
        if (!e.detail.value) {
            this.setData({
                disabled: true,
                color: '',
            })
        } else {
            this.setData({
                color: '#2bc998',
                disabled: false
            })
        }
    },
    work(event) {
        this.setData({
            work: event.target.id,
            color: '#2bc998',
            disabled: false,
        })


    },
    gowork(e) {
        let that = this;
        wx.showLoading({
            title: '加载中...',
            mask: true
        })
        wx.request({
            data: {
                work: this.data.work
            },
            url: app.globalData.url + '/gowork',
            success(res) {
                console.log(res.data.works)
                that.setData({
                    positionData: res.data.works,
                    isworks: true
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
        wx.showLoading({
            title: '加载中...',
            mask: true
        })
        let that = this;
        let pageAdd = this.data.pageOne + 1;
        this.setData({
            pageOne: pageAdd
        })
        wx.request({
            url: app.globalData.url + '/position/positionList',
            data: {
                pageOne: pageAdd,
                pageSize: 20
            },
            success(res) {
                that.setData({
                    positionData: res.data,
                })
            }
        })
        wx.hideLoading()

        console.log(pageAdd)
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})