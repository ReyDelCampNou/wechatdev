# 2024年夏季《移动软件开发》实验报告

<center>姓名：陈正元  学号：22020007159</center>

| 姓名和学号？      | 陈正元，22020007159                                                                       |
| ----------- | ------------------------------------------------------------------------------------- |
| 本实验属于哪门课程？  | 中国海洋大学24夏《移动软件开发》                                                                     |
| 实验名称？       | 实验4：媒体API之口述校史                                                                        |
| 博客地址？       | https://blog.csdn.net/reydelCampNou/article/details/141596194?spm=1001.2014.3001.5501 |
| Github仓库地址？ | https://github.com/ReyDelCampNou/wechatdev/tree/master/exp4                           |

## **一、实验目标**

1、学习使用快速启动模板创建小程序的方法；2、学习不使用模板手动创建小程序的方法。

## 二、实验步骤

1. 完成`index.wxml`
   
   ```html
   <!--index.wxml-->
   
   <!--block1 videoPlayer-->
   <video id='myVideo' src="{{src}}" controls enable-danmu danmu-btn></video>
   
   <!--block2 danmuCtrl-->
   <view class='danmuArea'>
     <input type='text' placeholder='请输入弹幕内容' bindinput='getDanmu'></input>
     <button bindtap='sendDanmu'>发送弹幕</button>
   </view>
   
   <!--block3 videoList-->
   <view class='videoList'>
     <view class='videoBar' wx:for='{{list}}' wx:key='video{{index}}' data-url='{{item.videoUrl}}' bindtap='playVideo'>
       <image src='/images/play.png'></image>
       <text>{{item.title}}</text>
     </view>
   </view>
   ```

2. 完成`index.wxss`
   
   ```css
   /**index.wxss**/
   video{
     width: 100%;
   }
   
   .danmuArea{
     display: flex;
     flex-direction: row;
   }
   
   input{
     border: 1rpx solid #987938;
     flex-grow: 1;
     height: 100rpx;
   }
   
   button{
     color: white;
     background-color: #987938;
   }
   
   .videoList{
     width: 100%;
     min-height: 400rpx;
   }
   
   .videoBar{
     width: 95%;
     display: flex;
     flex-direction: row;
     border-bottom: 1rpx solid #987938;
     margin: 10rpx;
   }
   
   image{
     width: 70rpx;
     height: 70rpx;
     margin: 20rpx;
   }
   
   text{
     font-size: 45rpx;
     color: #987938;
     margin: 20rpx;
     flex-grow: 1;
   }
   
   ```

3. 完成`index.js`（略去了部分自动生成函数）
   
   ```javascript
   // index.js
   
   function getRandomColor(){
     let rgb = []
     for(let i = 0; i < 3; ++i){
       let color = Math.floor(Math.random() * 256).toString(16)
       color = color.lenth == 1 ? '0'+ color : color
       rgb.push(color)
     }
     return '#' + rgb.join('')
   }
   
   Page({
   
     /**
      * 页面的初始数据
      */
     data: {
       danmuTxt: '',
       list: [
         {
           id: '299371',
           title: '杨国宜先生口述校史实录',
           videoUrl: 'https://arch.ahnu.edu.cn/__local/6/CB/D1/C2DF3FC847F4CE2ABB67034C595_025F0082_ABD7AE2.mp4?e=.mp4'
         },
         {
           id: '299396',
           title: '唐成伦先生口述校史实录',
           videoUrl: 'https://arch.ahnu.edu.cn/__local/E/31/EB/2F368A265E6C842BB6A63EE5F97_425ABEDD_7167F22.mp4?e=.mp4'
         },
         {
           id: '299378',
           title: '倪光明先生口述校史实录',
           videoUrl: 'https://arch.ahnu.edu.cn/__local/9/DC/3B/35687573BA2145023FDAEBAFE67_AAD8D222_925F3FF.mp4?e=.mp4'
         },
         {
           id: '299392',
           title: '吴仪兴先生口述校史实录',
           videoUrl: 'https://arch.ahnu.edu.cn/__local/5/DA/BD/7A27865731CF2B096E90B522005_A29CB142_6525BCF.mp4?e=.mp4'
         }
       ]
       
     },
   
     /**
      * 生命周期函数--监听页面加载
      */
     onLoad: function (options) {
       this.videoCtx = wx.createVideoContext('myVideo')
     },
   
     
     playVideo: function(e){
       this.videoCtx.stop()
       this.setData({
         src: e.currentTarget.dataset.url
       })
       this.videoCtx.play()
     },
   
     getDanmu: function(e){
       this.setData({
         danmuTxt: e.detail.value
       })
     },
   
     sendDanmu: function(e){
       let text = this.data.danmuTxt;
       this.videoCtx.sendDanmu({
         text: text,
         color: getRandomColor()
       })
     },
   })
   ```

## 三、程序运行结果

![](C:\Users\chen\AppData\Roaming\marktext\images\2024-08-27-10-09-20-image.png)

![](C:\Users\chen\AppData\Roaming\marktext\images\2024-08-27-10-10-01-image.png)

## 四、问题总结与体会

发现切换视频之后仍然能够看到一样的弹幕，说明`videoContext`是全局的，且不会随视频源改变而重置，可以通过如下代码解决（单纯就是为每一个视频设置一个`videoContext`）：

```javascript
let videoContext1 = wx.createVideoContext('video1');
let videoContext2 = wx.createVideoContext('video2');
```

有点蠢，就没有写进去。