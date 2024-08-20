// index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    region:['上海市', '上海市', '徐汇区'],
    now:{
      cloud: "0",
      dew: "0",
      feelsLike: "0",
      humidity: "0",
      icon: "999",
      obsTime: "2024-01-01T00:00+08:00",
      precip: "0.0",
      pressure: "10",
      temp: "0",
      wind360: "0",
      windDir: "/",
      windScale: "0",
      windSpeed: "0",
    }
  },

  getWeather:function(){
    var that = this;
    wx.request({
      url: 'https://geoapi.qweather.com/v2/city/lookup',
      data:{
        location:that.data.region[1],
        key:'40cb89951d9f4d31b25f8e7a1a2d7294'
      },
      success:function(res){
        console.log(res)
        wx.request({
          url: 'https://devapi.qweather.com/v7/weather/now',
          data:{
            location:res.data.location[0].id,
            key:'40cb89951d9f4d31b25f8e7a1a2d7294'
          },
          success:function(res){
            console.log(res.data.now);
            that.setData({now:res.data.now})
          }
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getWeather();
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
    
  },

  regionChange: function(e){
    this.setData({region: e.detail.value})
    this.getWeather();
  }
})
