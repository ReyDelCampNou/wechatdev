const { envList } = require('../../envList');

// pages/me/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    nickName: '',
    showUploadTip: false,
    avatarUrl: "../../images/icons/avatar.png"
  },

  getOpenId() {
    wx.showLoading({
      title: '',
    });
    wx.cloud
      .callFunction({
        name: 'login',
      })
      .then((resp) => {
        this.setData({
          haveGetOpenId: true,
          nickName: resp.result.nickName,
        });
        if (resp.result.avatarUrl){
          this.setData({
            avatarUrl: resp.result.avatarUrl,
          });
        }
        var app = getApp();
        app.globalData.isLoggedIn = true;
        app.globalData.openid = resp.result.openid;
        app.globalData.needReload = true;
        wx.hideLoading();
      })
      .catch((e) => {
        this.setData({
          showUploadTip: true,
        });
        wx.hideLoading();
      });
  },

  navigateToProfSettings: function(){
    var app = getApp()
    if (app.globalData.isLoggedIn){
      wx.navigateTo({
        url: '/pages/profile-settings/profile-settings',
      })
    } else {
      wx.showModal({
        title: 'WARNING',
        content: '请先登录！',
        showCancel: false
      })
    }
    
  },

  navigateToMyFavor: function(){
    var app = getApp()
    if (app.globalData.isLoggedIn){
      wx.navigateTo({
        url: '/pages/my-favorites/my-favorites',
      })
    } else {
      wx.showModal({
        title: 'WARNING',
        content: '请先登录！',
        showCancel: false
      })
    }
  },

  navigateToMyPost: function(){
    var app = getApp()
    if (app.globalData.isLoggedIn){
      wx.navigateTo({
        url: '/pages/my-posts/my-posts',
      })
    } else {
      wx.showModal({
        title: 'WARNING',
        content: '请先登录！',
        showCancel: false
      })
    }
  },

  onLoad: function (options) {
    
  },

  onShow: function (options) {
    if (this.data.haveGetOpenId){
      this.getOpenId()
    }
  },

  gotoWxCodePage() {
    wx.navigateTo({
      url: `/pages/exampleDetail/index?envId=${envList?.[0]?.envId}&type=getMiniProgramCode`,
    });
  },
});
