Page({

  /**
   * 页面的初始数据
   */
  data: {
    result: '决定吃......',
    list: [
      '听海1楼',
      '听海2楼',
      '望海1楼',
      '望海2楼',
      '望海3楼',
      '711',
      '外卖'
    ]
  },

  rollDice: async function() {
    var num;
    for (var i = 0; i < 10; i++){
      num = Math.floor(Math.random() * this.data.list.length);
      this.setData({
        result: this.data.list[num]
      });
      await delay(50);
    }
    num = Math.floor(Math.random() * this.data.list.length);
    this.setData({
      result: this.data.list[num]
    });
  },

  changeList: function(){
    var app = getApp();
    wx.navigateTo({
      url: '/pages/index/change-list'
    });
  },

  upDateData: function(){
    var app = getApp();
    if (app.globalData.needReload){
      wx.showLoading({
        title: '',
      });
      wx.cloud
        .callFunction({
          name: 'getList',
        })
        .then((resp) => {
          this.setData({
            list: resp.result.list.list.slice()
          })
          app.globalData.randList = resp.result.list.list.slice();
          app.globalData.needReload = false;
          wx.hideLoading();
        })
        .catch((e) => {
          this.setData({
            showUploadTip: true,
          });
          wx.hideLoading();
        });
    } else {
      this.setData({
        list: app.globalData.randList.slice()
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var app = getApp();
    this.setData({
      result: "决定吃......"
    })
    this.upDateData();
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
    this.setData({
      result: "决定吃......"
    })
    this.upDateData();
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

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
