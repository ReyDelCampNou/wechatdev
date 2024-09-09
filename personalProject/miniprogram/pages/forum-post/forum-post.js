// pages/forum-post/forum-post.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '', // 帖子标题
    content: '', // 帖子内容
    type: '',
    imageUrl: '' // 图片的临时文件路径
  },

  onTitleInput: function(e) {
    this.setData({
      title: e.detail.value
    });
  },

  onContentInput: function(e) {
    this.setData({
      content: e.detail.value
    });
  },

  onChooseImage: function() {
    wx.chooseMedia({
      mediaType: ['image'],
      count: 1,
      success: (res) => {
        if (res.tempFiles){
          this.setData({
            imageUrl: res.tempFiles[0].tempFilePath
          });
        }
      }
    });
  },

  onChooseType: function(e){
    this.setData({
      type: e.currentTarget.dataset.type
    });
  },

  onSubmit: function() {
    wx.showLoading({
      title: '',
    })
    wx.cloud.uploadFile({
      cloudPath: 'posts/' + Date.now() + '-' + this.data.imageUrl.slice(11),
      filePath: this.data.imageUrl,
      success: uploadResult => {
        // 获取图片的云存储路径
        const imageUrl = uploadResult.fileID
        // 将帖子和图片的云存储路径保存到数据库
        wx.cloud.callFunction({
          name: 'addPost',
          data: {
            title: this.data.title,
            content: this.data.content,
            imageUrl: imageUrl,
            type: this.data.type
          },
          success: res => {
            wx.hideLoading()
            wx.showToast({
              title: '帖子提交成功',
              icon: 'none'
            });
          },
          fail: err => {
            wx.hideLoading()
            wx.showToast({
                    title: '帖子提交失败',
                    icon: 'none'
            });
          }
        })
      },
      fail: err => {
        wx.hideLoading()
        wx.showToast({
          title: '图片上传失败',
          icon: 'none'
        });
      }
    })
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