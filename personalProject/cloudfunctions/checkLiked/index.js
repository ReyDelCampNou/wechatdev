// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

const db = cloud.database()

exports.main = async (event, context) => {
  const { postId } = event
  var userId = cloud.getWXContext().OPENID;
  try {
    const res = await db.collection('favorites').where({
      userId: userId,
      postId: postId,
      type: 'like'
    }).get()
    return { hasLiked: res.data.length > 0 }
  } catch (err) {
    console.error(err)
    return { hasLiked: false }
  }
}