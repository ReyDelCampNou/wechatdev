// pages/post-detail/post-detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    post: {},
    likeMessage: "点赞",
    collectMessage: "收藏",
    favorited: 0,
    likes:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const postId = options.id;
    this.loadPost(postId);
  },

  loadPost: function(postId) {
    var that = this;
    wx.cloud.callFunction({
      name: 'getPostById',
      data: {
        postId: postId
      },
      success: res => {
        this.setData({
          post: res.result.data,
          likes: res.result.data.likes,
          favorited: res.result.data.favorited
        });
        const serverDate = that.data.post.createTime;

        // 转换为 Date 对象
        const date = new Date(serverDate);

        // 格式化时间
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const hour = date.getHours();
        const minute = date.getMinutes();
        const second = date.getSeconds();

        const formattedTime = `${year}-${month}-${day} ${hour}:${minute}:${second}`;

        this.setData({
          createTime: formattedTime
        })
        wx.cloud.callFunction({
          name: 'getUserById',
          data: {
            openid: this.data.post.creater
          },
          success: function(res) {
            that.setData({
              creater: res.result.data[0]
            })
            that.checkHasLikedAndColle();
          },
          fail: function(err) {
            console.error('云函数调用失败', err)
          }
        })
      },
      fail: err => {
        console.error('调用失败', err);
      }
    });
  },

  onImageTap: function() {
    wx.previewImage({
      urls: [this.data.post.imageUrl]
    });
  },

  onLikeTap: function() {
    var app = getApp();
    var that = this;
    if (app.globalData.isLoggedIn) {
      if (that.data.likeMessage == "点赞"){
        wx.cloud.callFunction({
          name: 'likePost',
          data: {
            postId: that.data.post._id
          },
          success: res => {
            that.setData({
              likes : that.data.likes + 1
            })
            wx.showToast({
              title: '点赞成功',
              icon: 'none'
            });
            that.checkHasLikedAndColle();
          },
          fail: err => {
            wx.showToast({
              title: '点赞失败',
              icon: 'none'
            });
          }
        });
      } else {
        wx.cloud.callFunction({
          name: 'unlikePost',
          data: {
            postId: that.data.post._id
          },
          success: res => {
            that.setData({
              likes : that.data.likes - 1
            })
            wx.showToast({
              title: '取消点赞成功',
              icon: 'none'
            });
            that.checkHasLikedAndColle();
          },
          fail: err => {
            wx.showToast({
              title: '取消点赞失败',
              icon: 'none'
            });
          }
        });
      }
    } else {
      wx.showModal({
        title: 'WARNING',
        content: '您还未登录',
        showCancel: false
      });
    };
  },

  onCollectTap: function() {
    var app = getApp();
    var that = this;
    if (app.globalData.isLoggedIn){
      if (that.data.collectMessage == "收藏"){
        wx.cloud.callFunction({
          name: 'collectPost',
          data: {
            postId: that.data.post._id
          },
          success: res => {
            that.setData({
              favorited : that.data.favorited + 1
            })
            wx.showToast({
              title: '收藏成功',
              icon: 'none'
            });
            that.checkHasLikedAndColle();
          },
          fail: err => {
            wx.showToast({
              title: '收藏失败',
              icon: 'none'
            });
          }
        });
      } else {
        wx.cloud.callFunction({
          name: 'uncollectPost',
          data: {
            postId: that.data.post._id
          },
          success: res => {
            that.setData({
              favorited : that.data.favorited - 1
            })
            wx.showToast({
              title: '取消收藏成功',
              icon: 'none'
            });
            that.checkHasLikedAndColle();
          },
          fail: err => {
            wx.showToast({
              title: '取消收藏失败',
              icon: 'none'
            });
          }
        });
      } 
    } else {
      wx.showModal({
        title: 'WARNING',
        content: '您还未登录',
        showCancel: false
      });
    };
  },

  checkHasLiked: function(){
    var app = getApp();
    var that = this;
    if (app.globalData.isLoggedIn){
      wx.cloud.callFunction({
        name: 'checkLiked',
        data: {
          postId: that.data.post._id
        },
        success: res => {
          if (res.result.hasLiked){
            that.setData({
              likeMessage: "已点赞"
            })
          } else {
            that.setData({
              likeMessage: "点赞"
            })
          }
        },
        fail: err => {
          console.error('失败', err);
        }
      });
    } else {
      that.setData({
        likeMessage: "点赞"
      })
    }
  },

  checkHasCollected: function(){
    var app = getApp();
    var that = this;
    if (app.globalData.isLoggedIn){
      wx.cloud.callFunction({
        name: 'checkCollected',
        data: {
          postId: that.data.post._id
        },
        success: res => {
          if (res.result.hasCollected){
            that.setData({
              collectMessage: "已收藏"
            })
          } else {
            that.setData({
              collectMessage: "收藏"
            })
          }
        },
        fail: err => {
          console.error('失败', err);
        }
      });
    } else {
      that.setData({
        collectMessage: "收藏"
      })
    }
  },

  checkHasLikedAndColle: function(){
    this.checkHasLiked();
    this.checkHasCollected();
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