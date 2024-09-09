// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

const db = cloud.database()

exports.main = async (event, context) => {
  const { OPENID } = cloud.getWXContext()
  const { avatarUrl, nickName } = event
  try {
    await db.collection('users').where({
      _openid: OPENID
    }).update({
      data: {
        avatarUrl: avatarUrl,
        nickName: nickName
      }
    })
    return { message: '更新用户资料成功' }
  } catch (err) {
    console.error(err)
    return { message: '更新用户资料失败' }
  }
}