// pages/my-favorites/my-favorites.js
Page({
  data: {
    posts: [], // 帖子列表
    page: 0 // 当前页数
  },

  onPostTap: function(e) {
    const postId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/post-detail/post-detail?id=${postId}`
    });
  },

  onLoadMore: function () {
    if (this.data.page == 0 || this.data.page < this.data.totalPage){
      this.setData({
        page: this.data.page + 1
      });
      this.loadPosts();
    }
  },

  onLoadPrev: function () {
    if (this.data.page > 1){
      this.setData({
        page: this.data.page - 1
      });
      this.loadPosts();
    }
  },

  loadPosts: function() {
    var that = this;
    wx.cloud.callFunction({
      name: 'getUserFavorites',
      data: {
        page: this.data.page,
        pageSize: 5
      },
      success: res => {
        console.log(res.result.favorites)
        that.setData({
          posts: res.result.favorites.slice(),
          totalPage: res.result.totalPage
        })
        console.log(that.data.posts)
      },
      fail: err => {
        console.error('获取用户收藏的帖子失败：', err)
      }
    });
  },

  onLoad: function (options) {
    this.setData({
      page: 0
    })
    this.onLoadMore();
  },
});