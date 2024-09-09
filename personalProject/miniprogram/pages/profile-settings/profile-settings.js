// pages/profile-settings/profile-settings.js
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

Page({
  data: {
    motto: 'Hello World',
    userInfo: {
      avatarUrl: defaultAvatarUrl,
      nickName: '',
    },
    hasUserInfo: false,
    canIUseGetUserProfile: wx.canIUse('getUserProfile'),
    canIUseNicknameComp: wx.canIUse('input.type.nickname'),
  },
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onChooseAvatar(e) {
    const { avatarUrl } = e.detail
    const { nickName } = this.data.userInfo
    this.setData({
      "userInfo.avatarUrl": avatarUrl,
      hasUserInfo: nickName && avatarUrl && avatarUrl !== defaultAvatarUrl,
    })
  },
  onInputChange(e) {
    const nickName = e.detail.value
    const { avatarUrl } = this.data.userInfo
    this.setData({
      "userInfo.nickName": nickName,
      hasUserInfo: nickName && avatarUrl && avatarUrl !== defaultAvatarUrl,
    })
  },
  saveProf: function(){
    if (this.data.hasUserInfo){
      wx.cloud.uploadFile({
        cloudPath: 'users/' + Date.now() + '-' + this.data.userInfo.avatarUrl.slice(11),
        filePath: this.data.userInfo.avatarUrl,
        success: uploadResult => {
          // 获取图片的云存储路径
          const imageUrl = uploadResult.fileID
          // 将帖子和图片的云存储路径保存到数据库
          wx.cloud.callFunction({
            name: 'updateUserProfile',
            data: {
              avatarUrl: imageUrl,
              nickName: this.data.userInfo.nickName
            },
            success: res => {
              wx.showModal({
                title: '提示',
                content: '用户信息更新成功',
                showCancel: false,
                complete: (res) => {
                  if (res.confirm) {
                    wx.navigateBack();
                  }
                }
              })
            },
            fail: err => {
              console.error('更新用户资料失败', err)
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
      
    } else {
      wx.showModal({
        title: 'WARNING',
        content: '请先输入信息',
        showCancel: false
      })
    }
  },

  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
})