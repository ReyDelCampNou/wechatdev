// pages/forum-selected/forum-selected.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: 'likes',
    posts: [] // 帖子列表
  },

  onPostTap: function(e) {
    const postId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/post-detail/post-detail?id=${postId}`
    });
  },

  loadPosts: function() {
    wx.cloud.callFunction({
      name: 'getTopPosts',
      data: {
        type: this.data.type,
      },
      success: res => {
        this.setData({
          posts: res.result.topPosts,
        })
      },
      fail: err => {
        console.error('调用失败', err);
      }
    });
  },

  onChooseType: function(e){
    this.setData({
      type: e.currentTarget.dataset.type
    });
    localStorage
    this.loadPosts();
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      type: 'likes'
    })
    this.loadPosts();
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