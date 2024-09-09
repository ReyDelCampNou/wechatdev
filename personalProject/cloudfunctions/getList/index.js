// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  const user = await db.collection('users').where({
    _openid: wxContext.OPENID
  }).get()

  return {
    event,
    openid: wxContext.OPENID,
    list: user.data[0].randomlist,
  }
}