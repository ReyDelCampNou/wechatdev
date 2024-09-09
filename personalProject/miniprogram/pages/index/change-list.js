// pages/index/change-list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
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

  returnHome: function(){
    wx.showModal({
      title: '确认返回',
      content: '请确认是否返回，未保存的内容将丢失！',
      complete: (res) => {
        if (res.confirm) {
          wx.navigateBack()
        }
      }
    })
    
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
          app.globalData.needReload = false;
          app.globalData.randList = resp.result.list.list.slice();
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

  deleteItem: function(e){
    let index = e.currentTarget.dataset.idx;
    let list = this.data.list
    list.splice(index, 1)
    this.setData({
      list: list
    });
  },

  editItem: function(e) {
    var list = this.data.list;
    var index = e.currentTarget.dataset.idx; // 获取元素的索引
    var item = list[index]; // 获取元素的值

    // 显示模态框
    this.setData({
      showModal: true,
      inputValue: item,
      editIndex: index,
      modelTitle: "编辑条目"
    });
  },

  addItem: function(e) {
    var list = this.data.list;
    var index = list.length;
    list.push("");
    var item = list[index]; // 获取元素的值

    // 显示模态框
    this.setData({
      showModal: true,
      inputValue: item,
      editIndex: index,
      modelTitle: "增加条目"
    });
  },

  onInput: function(e) {
    this.setData({
      inputValue: e.detail.value
    });
  },

  confirmEdit: function() {
    var list = this.data.list;
    list[this.data.editIndex] = this.data.inputValue;

    this.setData({
      list: list,
      showModal: false,
      inputValue: '',
      editIndex: null
    });
  },

  cancelEdit: function() {
    this.setData({
      showModal: false,
      inputValue: '',
      editIndex: null
    });
  },

  saveItemList: function(){
    var app = getApp();
    if (this.data.list.length == 0){
      this.setData({
        list: app.globalData.randList.slice()
      })
      wx.showModal({
        title: 'WARNING',
        content: '随机列表不能为空！',
        showCancel: false
      })
      return;
    }
    if (app.globalData.isLoggedIn){
      wx.showLoading({
        title: '',
      });
      wx.cloud.callFunction({
        name: 'saveList',
        data: {
          list: this.data.list
        },
        success: function(res) {
          app.globalData.needReload = true
          wx.hideLoading();
          wx.showModal({
            title: '提示',
            content: '保存成功',
            showCancel: false
          })
        },
        fail: function(err) {
          wx.hideLoading();
          wx.showModal({
            title: '提示',
            content: '保存失败',
            showCancel: false
          })
        }
      });
    } else {
        app.globalData.randList = this.data.list.slice()
    }
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.upDateData();
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
    this.upDateData();
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