// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database();
  const _ = db.command;
  const postsCollection = db.collection('posts');

  const keyword = event.keyword;
  const type = event.type;
  const page = event.page || 1;
  const pageSize = event.pageSize || 5;

  const countResult = await postsCollection.where({
    type: type,
    title: db.RegExp({
      regexp: keyword,
      options: 'i',
    })
  }).count();

  const total = countResult.total;
  const totalPage = Math.ceil(total / 10);
  const hasMore = page < totalPage;

  const result = await postsCollection.where({
    type: type,
    title: db.RegExp({
      regexp: keyword,
      options: 'i',
    })
  })
  .skip((page - 1) * pageSize)
  .limit(pageSize)
  .get();

  return {
    data: result.data,
    page: page,
    pageSize: pageSize,
    total: total,
    totalPage: totalPage
  };
}