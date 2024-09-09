// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境
const db = cloud.database()

exports.main = async (event, context) => {
  const { postId } = event
  var userId = cloud.getWXContext().OPENID
  try {
    // 更新帖子的点赞数
    await db.collection('posts').doc(postId).update({
      data: {
        likes: db.command.inc(-1)
      }
    })
    // 在 favorites 集合中删除用户的点赞记录
    await db.collection('favorites').where({
      userId: userId,
      postId: postId,
      type: 'like'
    }).remove()
    return { message: '撤销点赞成功' }
  } catch (err) {
    console.error(err)
    return { message: '撤销点赞失败' }
  }
}