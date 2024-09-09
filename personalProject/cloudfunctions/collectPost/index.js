// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const _id = event.postId
  var userId = cloud.getWXContext().OPENID;
  try {
    // 更新帖子的收藏数
    await db.collection('posts').doc(_id).update({
      data: {
        favorited: db.command.inc(1)
      }
    })
    // 在 favorites 集合中为用户添加一条记录
    await db.collection('favorites').add({
      data: {
        userId: userId,
        postId: _id,
        type: 'collect'
      }
    })
    return { message: '收藏成功' }
  } catch (err) {
    console.error(err)
    return { message: '收藏失败' }
  }
}