// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境
const db = cloud.database()

exports.main = async (event, context) => {
  const userId = cloud.getWXContext().OPENID;
  const page = event.page || 1; // 页数，默认为1
  const pageSize = event.pageSize || 5; // 每页数量，默认为5
  const skip = (page - 1) * pageSize
  try {
    const countResult = await db.collection('favorites')
      .where({
        userId: userId,
        type: 'collect'
      }).count();
    const total = countResult.total; // 总数量
    const totalPage = Math.ceil(total / pageSize); // 总页数
    const res = await db.collection('favorites')
      .where({
        userId: userId,
        type: 'collect'
      })
      .skip(skip)
      .limit(pageSize)
      .get()
      const postIds = res.data.map(favorite => favorite.postId)
      const postsRes = await db.collection('posts').where({
        _id: db.command.in(postIds)
      }).get()
    return { favorites: postsRes.data, totalPage: totalPage }
  } catch (err) {
    console.error(err)
    return { favorites: [] }
  }
}