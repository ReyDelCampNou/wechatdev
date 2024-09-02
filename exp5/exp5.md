# 2024年夏季《移动软件开发》实验报告

<center>姓名：陈正元  学号：22020007159</center>

| 姓名和学号？      | 陈正元，22020007159                                             |
| ----------- | ----------------------------------------------------------- |
| 本实验属于哪门课程？  | 中国海洋大学24夏《移动软件开发》                                           |
| 实验名称？       | 实验5：高校新闻网                                                   |
| 博客地址？       | https://blog.csdn.net/reydelCampNou/                        |
| Github仓库地址？ | https://github.com/ReyDelCampNou/wechatdev/tree/master/exp5 |

## **一、实验目标**

1、学习使用快速启动模板创建小程序的方法；2、学习不使用模板手动创建小程序的方法。

## 二、实验步骤

1. 创建所需目录
   
   ![](C:\Users\chen\AppData\Roaming\marktext\images\2024-09-02-15-42-03-image.png)

2. 完成`index.wxml`
   
   ```html
   <!--pages/index/index.wxml-->
   <!--幻灯片滚动-->
   <swiper indicator-dots="true" autoplay="true" interval="5000" duration="500">
     <block wx:for="{{swiperImg}}" wx:key='swiper{{index}}'>
       <swiper-item>
         <image src="{{item.src}}"></image>
       </swiper-item>
     </block>
   </swiper>
   <!--新闻列表-->
   <view id='news-list'>
     <view class='list-item' wx:for="{{newsList}}" wx:for-item="news" wx:key="{{news.id}}">
       <image src='{{news.poster}}'></image>
       <text bindtap='goToDetail' data-id='{{news.id}}'>◇{{news.title}}——{{news.add_date}}</text>
     </view>
   </view>
   ```

3. 完成`index.wxss`
   
   ```css
   /*swiper区域样式*/
   swiper{
     height: 400rpx;
   }
   swiper image{
     width: 100%;
     height: 100%;
   }
   /*新闻列表区域样式*/
   /*2-1新闻列表容器*/
   #news-list {
     min-height: 600rpx;
     padding: 15rpx;
   }
   /*2-2列表项目*/
   .list-item{
     display: flex;
     flex-direction: row;
     border-bottom: 1rpx solid gray;
   }
   /*2-3新闻图片*/
   .list-item image{
     width:230rpx;
     height: 150rpx;
     margin: 10rpx;
   }
   /*2-4新闻标题*/
   .list-item text{
     width: 100%;
     line-height: 60rpx;
     font-size: 10pt;
   }
   ```

4. 完成`index.js`（略去了部分自动生成函数）
   
   ```javascript
   // pages/index/index.js
   var common = require('../../utils/common.js') //引用公共JS文件
   Page({
   
     /**
      * 页面的初始数据
      */
     data: {
       //幻灯片素材
       swiperImg: [
         {src: 'https://gaopursuit.oss-cn-beijing.aliyuncs.com/2022/newsimage1.jpg'},
         {src: 'https://gaopursuit.oss-cn-beijing.aliyuncs.com/2022/newsimage2.jpg'},
         {src: 'https://gaopursuit.oss-cn-beijing.aliyuncs.com/2022/newsimage3.jpg'}
       ],
     },
   
     /**
      * 自定义函数--跳转新页面浏览新闻内容
      */
     goToDetail: function(e) {
       //获取携带的data-id数据
       let id = e.currentTarget.dataset.id;
       //携带新闻id进行页面跳转
       wx.navigateTo({
         url: '../detail/detail?id=' + id
       })
     },
   
     /**
      * 生命周期函数--监听页面加载
      */
     onLoad: function(options) {
       //获取新闻列表
       let list = common.getNewsList()
       //更新列表数据
       this.setData({
         newsList: list
       })
     },
   })
   ```

5.  完成`my.wxml`
   
   ```html
   <!--pages/my/my.wxml-->
   <!--登录面板-->
   <view id='myLogin'>
     <block wx:if='{{isLogin}}'>
       <image id='myIcon' src='{{src}}'></image>
       <text id='nickName'>{{nickName}}</text> 
     </block>
     <button wx:else open-type="getUserInfo" bindgetuserinfo="getMyInfo">未登录，点此登录</button>
   </view>
   <!--我的收藏-->
   <view id='myFavorites'>
     <text>我的收藏{{num}}</text>
     <!--收藏的新闻列表-->
     <view id='news-list'>
       <view class='list-item' wx:for='{{newsList}}' wx:for-item='news' wx:key="{{news.id}}">
         <image src='{{news.poster}}'></image>
         <text bindtap='goToDetail' data-id='{{news.id}}'>◇{{news.title}}--{{news.add_date}}</text>
       </view>
     </view>
   </view>
   ```

6. 完成`my.wxss`
   
   ```css
   /* pages/my/my.wxss */
   #myLogin{
     background-color: #328EEB;
     height: 400rpx;
     display: flex;
     flex-direction: column;
     align-items: center;
     justify-content: space-around;
   }
   
   #myIcon{
     width: 200rpx;
     height: 200rpx;
     border-radius: 50%;
   }
   
   #nickName{
     color: white;
   }
   
   #myFavorites{
     padding: 20rpx;
   }
   ```

7. 完成`my.js`（略去部分自动生成的函数）
   
   ```javascript
   // pages/my/my.js
   var common = require('../../utils/common.js')
   
   Page({
   
     /**
      * 页面的初始数据
      */
     data: {
       nickName: '',
       src: '',
       num: 0,
       newsList:[]
     },
   
     getMyFavorites: function(){
       let info = wx.getStorageInfoSync();
       let keys = info.keys;
       let num = keys.length-1;
   
       let myList = [];
       for (var i = 0; i < num; i++){
         let obj = wx.getStorageSync(keys[i]);
         myList.push(obj);
       }
       this.setData({
         newsList: myList,
         num: num
       })
     },
   
     /**
      * 生命周期函数--监听页面显示
      */
     onShow() {
       if(this.data.isLogin){
         this.getMyFavorites()
       }
     },
   
     getMyInfo: function(e){
       let info = e.detail.userInfo;
       this.setData({
         isLogin:true,
         src: info.avatarUrl,
         nickName: info.nickName
       })
   
       this.getMyFavorites();
     },
   
     goToDetail: function(e){
       let id = e.currentTarget.dataset.id;
       wx.navigateTo({
         url:'../detail/detail?id='+id
       })
     }
   
   })
   ```

8. 完成`detail.wxml`
   
   ```html
   <!--pages/detail/detail.wxml-->
   <view class='container'>
     <view class='title'>{{article.title}}</view>
     <view class='poster'>
       <image src='{{article.poster}}' mode='widthFix'></image>
     </view>
     <view class='content'>{{article.content}}</view>
     <view class='add_date'>时间：{{article.add_date}}</view>
     <button wx:if='{{isAdd}}' plain bindtap='cancelFavorites'>已收藏</button>
     <button wx:else plain bindtap='addFavorites'>点击收藏</button>
   </view>
   ```

9. 完成`detail.wxss`
   
   ```css
   /* pages/detail/detail.wxss */
   .container{
     padding: 15rpx;
     text-align: center;
   }
   .title{
     font-size: 14pt;
     line-height: 80rpx;
   }
   .poster image{
     width: 100%;
   }
   .content{
     text-align: left;
     font-size: 12pt;
     line-height: 60rpx;
   }
   .add_date{
     font-size: 12pt;
     text-align: right;
     line-height: 30rpx;
     margin-right: 25rpx;
     margin-top: 20rpx;
   }
   button{
     width: 250rpx;
     height: 100rpx;
     margin: 20rpx auto;
   }
   ```

10. 完成`detail.js`
    
    ```javascript
    // pages/detail/detail.js
    var common = require('../../utils/common.js')
    
    Page({
    
      /**
       * 页面的初始数据
       */
      data: {
        article:{}
      },
    
      /**
       * 生命周期函数--监听页面加载
       */
      onLoad(options) {
        let id = options.id
        var article = wx.getStorageSync(id)
        if(article != ''){
          this.setData({
            article:article,
            isAdd: true
          })
        }
        else{
          let result = common.getNewsDetail(id)
          if(result.code == '200'){
            this.setData({
              article:result.news,
              isAdd: false
            })
          }
        }
      },
    
      addFavorites: function(options){
        let article = this.data.article;
        wx.setStorageSync(article.id, article);
        this.setData({isAdd: true});
      },
    
      cancelFavorites: function(){
        let article = this.data.article;
        wx.removeStorageSync(article.id);
        this.setData({isAdd:false});
      }
    })
    ```

11. 完成`common.js`
    
    ```javascript
    //模拟新闻数据
    const news = [
      {id: '264698',
      title: '中国海洋大学校友会甘肃分会成立大会暨庆祝建校100周年校旗全球传递活动兰州站传递仪式举行',
      poster: '../../images/newsimage1.jpg',
      content: ' 本站讯 8月31日，中国海洋大学校友会甘肃分会（以下简称“甘肃分会”）成立大会暨庆祝建校100周年校旗全球传递活动兰州站传递仪式举行。中国海洋大学原校长、校友会会长于志刚，甘肃浙江大学校友会会长朱永华，兰州大学兰州校友会执行会长李国梁，兰州大学兰州校友会秘书长张香喜出席活动。在甘校友代表齐聚一堂，共叙情谊。于志刚对甘肃分会的成立表示祝贺，并简要介绍了学校近年来的事业发展情况和学校校友工作开展情况。他指出，广大在甘校友扎根甘肃、服务甘肃，为大美陇原经济社会发展贡献了中国海大力量。甘肃分会的成立，将进一步凝聚校友情感、汇聚校友力量、成就校友发展。期待在第一届理事会的带领下，分会充分发挥纽带作用，不断加强自身建设、持续推进自身发展，为校友、母校事业发展及地方经济社会发展贡献力量。',
      add_date: '2024-09-02'},
      {id: '304083',
      title: '加勒比国家联盟秘书长鲁道夫·萨邦赫来校访问',
      poster: '../../images/newsimage2.jpg',
      content: '本站讯 8月30日上午，加勒比国家联盟秘书长鲁道夫·萨邦赫到访中国海洋大学，副校长刘勇在崂山校区会见了来访客人。刘勇对鲁道夫·萨邦赫的来访表示欢迎，并向秘书长介绍了学校的概况和特色优势，简要回顾了学校与加勒比地区的交流合作情况。他表示，学校坚持开放办学，十分重视国际交流合作，近年来一直积极拓展与加勒比地区的教育合作。学校海洋和水产学科特色显著、学科门类齐全，加勒比地区具有丰富的海洋资源，希望双方加深了解，开展务实合作，实现互利共赢、共同发展。鲁道夫·萨邦赫对学校的热情接待表示感谢，并祝贺中国海洋大学即将迎来百年华诞。他表示，加勒比国家联盟非常重视海洋防灾减灾、海洋环境保护、海平面上升等问题，期待在马尾藻防治及开发等相关领域与学校开展合作。学校国际合作与交流处、水产学院、碳中和中心相关负责人和教师代表参加会谈。',
      add_date: '2024-08-31'},
      {id: '305670',
      title: '中国海大志愿者完成第五届跨国公司领导人青岛峰会志愿服务',
      poster: '../../images/newsimage3.jpg',
      content: '本站讯 8月27日至29日，第五届跨国公司领导人青岛峰会在青岛国际会议中心举办。为全面做好服务保障，确保峰会顺利举行，中国海洋大学招募选派115名志愿者参与峰会志愿服务，志愿者们以饱满的热情完成本次大会的各项工作，累计服务时长3000余小时，用实际行动展现中国海大青年风采。前期，学校团委根据峰会安排及各工作组志愿者需求，面向崂山校区15个学部、学院（中心）进行志愿者选拔招募，并邀请青岛团市委、峰会组委会相关专家对志愿者开展了峰会情况介绍、志愿服务礼仪与规范、大型赛会志愿服务知识与技能等系统培训。峰会举办期间，学校志愿者在4个工作组分别参与会务服务、媒体接待、酒店接待、交通抵离、青企峰会、人力资源高质量发展对话会等15个组别的工作任务。中国海大青年志愿者用耐心热心的服务态度、吃苦耐劳的坚韧品质、蓬勃向上的服务热情赢得广泛赞誉。恰逢学校百年华诞，此次峰会的志愿服务为志愿者和学校志愿服务工作提供了宝贵经验，也为学校建校100周年系列庆祝活动志愿服务夯基蓄力。学校团委将继续以服务大型赛会为依托，完善志愿服务工作体系，引领学生在志愿服务中成长成才，挺膺担当。',
      add_date: '2024-08-31'}
    ];
    
    //获取新闻列表
    function getNewsList() {
      let list = [];
      for (var i = 0; i < news.length; i++) {
        let obj = {};
        obj.id = news[i].id;
        obj.poster = news[i].poster;
        obj.add_date = news[i].add_date;
        obj.title = news[i].title;
        list.push(obj);
      }
      return list; //返回新闻列表
    }
    
    //获取新闻内容
    function getNewsDetail(newsID) {
      let msg = {
        code: '404', //没有对应的新闻
        news: {}
      };
      for (var i = 0; i < news.length; i++) {
        if (newsID == news[i].id) { //匹配新闻id编号
          msg.code = '200'; //成功
          msg.news = news[i]; //更新当前新闻内容
          break;
        }
      }
      return msg; //返回查找结果
    }
    
    // 对外暴露接口
    module.exports = {
      getNewsList: getNewsList,
      getNewsDetail: getNewsDetail
    }
    ```

## 三、程序运行结果

**主页**




![](C:\Users\chen\AppData\Roaming\marktext\images\2024-09-02-15-57-58-image.png)

**新闻详情页**

![](C:\Users\chen\AppData\Roaming\marktext\images\2024-09-02-15-59-44-image.png)

**收藏**

![](C:\Users\chen\AppData\Roaming\marktext\images\2024-09-02-16-00-21-image.png)

**个人界面**

![](C:\Users\chen\AppData\Roaming\marktext\images\2024-09-02-16-00-58-image.png)

**登录**

![](C:\Users\chen\AppData\Roaming\marktext\images\2024-09-02-16-01-18-image.png)

## 四、问题总结与体会

发现收藏列表中总有一个空数据，推测为返回时自带的空数据，于是修改`my.js`中的函数`getMyFavorites`: 

```javascript
let num = keys.length-1;
```

在返回时去除了空数据。

登录问题采用实验一中的方法解决，修改基础库至`2.16.1`。