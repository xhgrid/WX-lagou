// pages/jobDetails/jobDetails.js
var QQMapWX = require('../../utils/wx-jssdk.min.js');
let app = getApp()

Page({
    data: {
        companyid: "",
        jobDetails: ""
    },

    onLoad: function(options) {
        console.log(options.companyid)
        console.log(options)

        let that = this;
        this.setData({
            companyid: options.companyid
        })
        wx.request({
            data: {
                condition: this.data.companyid
            },
            url: app.globalData.url + '/Details/jobDetails',
            success(res) {
                console.log(res.data.data)
                that.setData({
                    jobDetails: res.data.data
                })

            }
        })

    },



})