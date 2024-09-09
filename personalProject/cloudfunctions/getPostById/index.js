// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database();
  const postsCollection = db.collection('posts');

  const postId = event.postId; // 帖子 ID

  try {
    const result = await postsCollection.doc(postId).get();
    const post = result.data;

    return {
      data: post
    };
  } catch (err) {
    console.error(err);
    return err;
  }
}