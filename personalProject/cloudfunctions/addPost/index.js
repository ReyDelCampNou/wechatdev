// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const { title, content, imageUrl, type } = event
  const wxContext = cloud.getWXContext()
  try {
    return await db.collection('posts').add({
      data: {
        title: title,
        content: content,
        imageUrl: imageUrl,
        type: type,
        creater: wxContext.OPENID,
        createTime: db.serverDate(),
        likes: 0,
        favorited: 0,
        shared: 0
      }
    })
  } catch(e) {
    console.error(e)
  }
}