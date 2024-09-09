// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database()
  const usersCollection = db.collection('users')

  // 通过openid查找用户
  const user = await usersCollection.where({
    _openid: event.openid
  }).get()

  return user
}