// pages/forum-detail/forum-detail.js
Page({
  data: {
    posts: [], // 帖子列表
    page: 0, // 当前页数
    search: '', // 搜索关键词
    isSearching: false
  },

  onSearchInput: function(e) {
    this.setData({
      search: e.detail.value
    });
  },

  onSearchConfirm: function(){
    this.setData({
      isSearching: true,
      page: 1
    });
    this.onSearchPosts();
  },

  onSearchPosts: function(){
    var that = this;
    wx.cloud.callFunction({
      name: 'searchPosts',
      data: {
        keyword: this.data.search,
        type: this.data.type,
        page: this.data.page,
        pageSize: 5
      },
      success: function(res) {
        that.setData({
          posts: res.result.data,
          total: res.result.total,
          totalPage: res.result.totalPage
        })
      },
      fail: function(err) {
        console.error('云函数调用失败', err);
      }
    });
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
      if (this.isSearching){
        this.onSearchPosts();
      } else {
        this.loadPosts();
      }
    }
  },

  onLoadPrev: function () {
    if (this.data.page > 1){
      this.setData({
        page: this.data.page - 1
      });
      if (this.isSearching){
        this.onSearchPosts();
      } else {
        this.loadPosts();
      }
    }
  },

  loadPosts: function() {
    wx.cloud.callFunction({
      name: 'getPostByType',
      data: {
        type: this.data.type,
        page: this.data.page,
        pageSize: 5
      },
      success: res => {
        this.setData({
          posts: res.result.data,
          total: res.result.total,
          totalPage: res.result.totalPage
        })
      },
      fail: err => {
        console.error('调用失败', err);
      }
    });
  },

  onLoad: function (options) {
    this.setData({
      type: options.type,
      page: 0
    })
    this.onLoadMore();
  },
});