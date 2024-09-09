// pages/forum-main/forum-main.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  navigateToSelected: function(){
    wx.navigateTo({
      url: '/pages/forum-selected/forum-selected',
    })
  },

  navigateToTest: function(){
    wx.navigateTo({
      url: '/pages/forum-detail/forum-detail?type=test',
    })
  },

  navigateToRecipe: function(){
    wx.navigateTo({
      url: '/pages/forum-detail/forum-detail?type=recipe',
    })
  },

  navigateToPost: function(){
    var app = getApp()
    if (app.globalData.isLoggedIn){
      wx.navigateTo({
        url: '/pages/forum-post/forum-post',
      })
    } else {
      wx.showModal({
        title: 'WARNING',
        content: '您还未登录！',
        showCancel: false
      })
    }
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})