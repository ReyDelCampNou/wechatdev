// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database();
  const postsCollection = db.collection('posts');

  const page = event.page || 1; // 页数，默认为1
  const pageSize = event.pageSize || 5; // 每页数量，默认为10

  try {
    const countResult = await postsCollection.where({
      creater: wxContext.OPENID
    }).count();
    const total = countResult.total; // 总数量
    const totalPage = Math.ceil(total / pageSize); // 总页数

    let posts = [];
    if (page <= totalPage) {
      const result = await postsCollection.where({
        creater: wxContext.OPENID
      }).skip((page - 1) * pageSize).limit(pageSize).get();
      posts = result.data;
    }

    return {
      data: posts,
      page: page,
      pageSize: pageSize,
      total: total,
      totalPage: totalPage
    };
  } catch (err) {
    console.error(err);
    return err;
  }
}