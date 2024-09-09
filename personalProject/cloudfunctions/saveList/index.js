// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境



// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database();
  const usersCollection = db.collection('users');
  const wxContext = cloud.getWXContext()
  const openid = wxContext.OPENID;

  usersCollection.where({
    _openid: openid
  }).update({
    data: {
      'randomlist.list': event.list
    },
    success: function(res) {
      console.log('更新成功', res);
    },
    fail: function(err) {
      console.error('更新失败', err);
    }
  });
}