// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境
const db = cloud.database()


exports.main = async (event, context) => {
  const type = event.type;
  try {
    const res = await db.collection('posts').orderBy(type, 'desc').limit(5).get()
    return { topPosts: res.data }
  } catch (err) {
    console.error(err)
    return { topPosts: [] }
  }
}