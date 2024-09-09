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

  // 如果用户未注册，注册新用户
  if (user.data.length === 0) {
    await db.collection('users').add({
      data: {
        _openid: wxContext.OPENID,
        nickName: "微信用户",
        avatarUrl: "",
        randomlist: {
          list: [
          '听海1楼',
          '听海2楼',
          '望海1楼',
          '望海2楼',
          '望海3楼',
          '711',
          '外卖'
        ]}
      }
    })
  }

  const user_fin = await db.collection('users').where({
    _openid: wxContext.OPENID
  }).get()

  return {
    event,
    openid: wxContext.OPENID,
    nickName: user_fin.data[0].nickName,
    avatarUrl: user_fin.data[0].avatarUrl,
  }
}