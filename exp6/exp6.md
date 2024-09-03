# 2024年夏季《移动软件开发》实验报告

<center>姓名：陈正元  学号：22020007159</center>

| 姓名和学号？      | 陈正元，22020007159                                                                       |
| ----------- | ------------------------------------------------------------------------------------- |
| 本实验属于哪门课程？  | 中国海洋大学24夏《移动软件开发》                                                                     |
| 实验名称？       | 实验6：推箱子游戏                                                                             |
| 博客地址？       | https://blog.csdn.net/reydelCampNou/article/details/141855530?spm=1001.2014.3001.5501 |
| Github仓库地址？ | https://github.com/ReyDelCampNou/wechatdev/tree/master/exp6                           |

## **一、实验目标**

1、学习使用快速启动模板创建小程序的方法；2、学习不使用模板手动创建小程序的方法。

## 二、实验步骤

1. 创建所需目录
   
   ![](C:\Users\chen\AppData\Roaming\marktext\images\2024-09-03-10-28-12-image.png)

2. 完成`index.wxml`
   
   ```html
   <!--index.wxml-->
   <view class='container'>
     <view class='title'>游戏选关</view>
     <view class='levelBox'>
       <view class='box' wx:for="{{levels}}" wx:key='levels{{index}}' bindtap='chooseLevel' data-level='{{index}}'>
         <image src='/images/{{item}}'></image>
         <text>第{{index + 1}}关</text>
       </view>
     </view>
   </view>
   ```

3. 完成`index.wxss`
   
   ```css
   /**index.wxss**/
   .levelBox{
     width: 100%;
   }
   
   .box{
     width: 50%;
     float: left;
     margin: 20rpx 0;
     display: flex;
     flex-direction: column;
     align-items: center;
   }
   
   image{
     width: 300rpx;
     height: 300rpx;
   }
   ```

4. 完成`index.js`（略去了部分自动生成函数）
   
   ```javascript
   // index.js
   Page({
   
     /**
      * 页面的初始数据
      */
     data: {
       levels:[
         'level01.png',
         'level02.png',
         'level03.png',
         'level04.png'
       ]
     },
   
     chooseLevel: function(e){
       let level = e.currentTarget.dataset.level
       wx.navigateTo({
         url:'../game/game?level=' + level
       })
     },
   })
   ```

5. 完成`game.wxml`
   
   ```html
   <!--pages/game/game.wxml-->
   <view class='container'>
     <view class='title'>第{{level}}关</view>
     <canvas canvas-id="myCanvas"></canvas>
     <view class='btnBox'>
       <button type='warn' bindtap='up'>↑</button>
       <view>
         <button type="warn" bindtap='left'>←</button>
         <button type="warn" bindtap='down'>↓</button>
         <button type="warn" bindtap='right'>→</button>
       </view>
     </view>
     <button type='warn' bindtap='restartGame'>重新开始</button>
   </view>
   ```

6. 完成`game.wxss`
   
   ```css
   canvas{
     border: 1rpx solid;
     width: 320px;
     height: 320px;
   }
   
   .btnBox{
     display: flex;
     flex-direction: column;
     align-items: center;
   }
   
   .btnBox view{
     display: flex;
     flex-direction: row;
   }
   
   .btnBox button{
     width: 90rpx;
     height: 90rpx;
   }
   
   button{
     margin: 10rpx;
   }
   ```

7. 完成`game.js`（略去部分自动生成的函数）
   
   ```javascript
   // pages/game/game.js
   var data = require('../../utils/data.js')
   var map = [
     [0, 0, 0, 0, 0, 0, 0, 0],
     [0, 0, 0, 0, 0, 0, 0, 0],
     [0, 0, 0, 0, 0, 0, 0, 0],
     [0, 0, 0, 0, 0, 0, 0, 0],
     [0, 0, 0, 0, 0, 0, 0, 0],
     [0, 0, 0, 0, 0, 0, 0, 0],
     [0, 0, 0, 0, 0, 0, 0, 0],
     [0, 0, 0, 0, 0, 0, 0, 0]
   ]
   var box = [
     [0, 0, 0, 0, 0, 0, 0, 0],
     [0, 0, 0, 0, 0, 0, 0, 0],
     [0, 0, 0, 0, 0, 0, 0, 0],
     [0, 0, 0, 0, 0, 0, 0, 0],
     [0, 0, 0, 0, 0, 0, 0, 0],
     [0, 0, 0, 0, 0, 0, 0, 0],
     [0, 0, 0, 0, 0, 0, 0, 0],
     [0, 0, 0, 0, 0, 0, 0, 0]
   ]
   var w = 40
   var row = 0
   var col = 0
   
   Page({
   
     /**
      * 页面的初始数据
      */
     data: {
       level: 1
     },
   
     initMap: function(level){
       let mapData = data.maps[level]
       for (var i = 0; i < 8; i++){
         for (var j = 0; j < 8; j++){
           box[i][j] = 0
           map[i][j] = mapData[i][j]
           if(mapData[i][j] == 4){
             box[i][j] = 4
             map[i][j] = 2
           } else if (mapData[i][j] == 5){
             map[i][j] = 2
             row = i
             col = j
           }
         }
       }
     },
   
     drawCanvas: function(){
       let ctx = this.ctx
       ctx.clearRect(0, 0, 320, 320)
       for (var i = 0; i < 8; i++) {
         for (var j = 0; j < 8; j++) {
           let img = 'ice'
           if (map[i][j] == 1) {
             img = 'stone'
           } else if (map[i][j] == 3) {
             img = 'pig'
           }
           ctx.drawImage('/images/icons/' + img + '.png', j * w, i * w, w, w)
           if (box[i][j] == 4) {
             ctx.drawImage('/images/icons/box.png', j * w, i * w, w, w)
           }
         }
       }
       ctx.drawImage('/images/icons/bird.png', col * w, row * w, w, w)
       ctx.draw()
     },
   
     up: function(){
       if(row > 0) {
         if (map[row - 1][col] != 1 && box[row - 1][col] != 4) {
           row = row - 1
         } else if (box[row - 1][col] == 4) {
           if (row - 1 > 0) {
             if (map[row - 2][col] != 1 && box[row - 2][col] != 4) {
               box[row - 2][col] = 4
               box[row - 1][col] = 0
               row = row - 1
             }
           }
         }
         this.drawCanvas()
         this.checkWin()
       }
     },
   
     down: function(){
       if(row < 7) {
         if (map[row + 1][col] != 1 && box[row + 1][col] != 4) {
           row = row + 1
         } else if (box[row + 1][col] == 4) {
           if (row + 1 < 7) {
             if (map[row + 2][col] != 1 && box[row + 2][col] != 4) {
               box[row + 2][col] = 4
               box[row + 1][col] = 0
               row = row + 1
             }
           }
         }
         this.drawCanvas()
         this.checkWin()
       }
     },
   
     left: function(){
       if(col > 0) {
         if (map[row][col - 1] != 1 && box[row][col - 1] != 4) {
           col = col - 1
         } else if (box[row][col - 1] == 4) {
           if (col - 1 > 0) {
             if (map[row][col - 2] != 1 && box[row][col - 2] != 4) {
               box[row][col - 2] = 4
               box[row][col - 1] = 0
               col = col - 1
             }
           }
         }
         this.drawCanvas()
         this.checkWin()
       }
     },
   
     right: function(){
       if(col < 7) {
         if (map[row][col + 1] != 1 && box[row][col + 1] != 4) {
           col = col + 1
         } else if (box[row][col + 1] == 4) {
           if (col + 1 < 7) {
             if (map[row][col + 2] != 1 && box[row][col + 2] != 4) {
               box[row][col + 2] = 4
               box[row][col + 1] = 0
               col = col + 1
             }
           }
         }
         this.drawCanvas()
         this.checkWin()
       }
     },
   
     isWin: function(){
       for (var i = 0; i < 8; i++){
         for (var j = 0; j < 8; j++){
           if (box[i][j] == 4 && map[i][j] != 3){
             return false
           }
         }
       }
       return true
     },
   
     checkWin: function(){
       if (this.isWin()){
         wx.showModal({
           title: '恭喜',
           content: '游戏成功！',
           showCancel: false,
           success(res){
             if (res.confirm){
               wx.navigateTo({
                 url:'../index/index'
               })
             }
           }
         })
       }
     },
   
     restartGame: function(){
       this.initMap(this.data.level - 1)
       this.drawCanvas()
     },
   
     /**
      * 生命周期函数--监听页面加载
      */
     onLoad(options) {
       let level = options.level
       this.setData({
         level: parseInt(level) + 1
       })
       this.ctx = wx.createCanvasContext('myCanvas')
       this.initMap(level)
       this.drawCanvas()
     },
   })
   ```

8. 完成`app.wxss`
   
   ```css
   /**app.wxss**/
   .container{
     height: 100vh;
     color: #E64340;
     font-weight: bold;
     display: flex;
     flex-direction: column;
     align-items: center;
     justify-content: space-evenly;
   }
   
   .title{
     font-size: 18pt;
   }
   ```

9. 完成`data.js`
   
   ```javascript
   var map1 = [
     [0, 1, 1, 1, 1, 1, 0, 0],
     [0, 1, 2, 2, 1, 1, 1, 0],
     [0, 1, 5, 4, 2, 2, 1, 0],
     [1, 1, 1, 2, 1, 2, 1, 1],
     [1, 3, 1, 2, 1, 2, 2, 1],
     [1, 3, 4, 2, 2, 1, 2, 1],
     [1, 3, 2, 2, 2, 4, 2, 1],
     [1, 1, 1, 1, 1, 1, 1, 1]
   ]
   
   var map2 = [
     [0, 0, 1, 1, 1, 0, 0, 0],
     [0, 0, 1, 3, 1, 0, 0, 0],
     [0, 0, 1, 2, 1, 1, 1, 1],
     [1, 1, 1, 4, 2, 4, 3, 1],
     [1, 3, 2, 4, 5, 1, 1, 1],
     [1, 1, 1, 1, 4, 1, 0, 0],
     [0, 0, 0, 1, 3, 1, 0, 0],
     [0, 0, 0, 1, 1, 1, 0, 0]
   ]
   
   var map3 = [
     [0, 0, 1, 1, 1, 1, 0, 0],
     [0, 0, 1, 3, 3, 1, 0, 0],
     [0, 1, 1, 2, 3, 1, 1, 0],
     [0, 1, 2, 2, 4, 3, 1, 0],
     [1, 1, 2, 2, 5, 4, 1, 1],
     [1, 2, 2, 1, 4, 4, 2, 1],
     [1, 2, 2, 2, 2, 2, 2, 1],
     [1, 1, 1, 1, 1, 1, 1, 1]
   ]
   
   var map4 = [
     [0, 1, 1, 1, 1, 1, 1, 0],
     [0, 1, 3, 2, 3, 3, 1, 0],
     [0, 1, 3, 2, 4, 3, 1, 0],
     [1, 1, 1, 2, 2, 4, 1, 1],
     [1, 2, 4, 2, 2, 4, 2, 1],
     [1, 2, 1, 4, 1, 1, 2, 1],
     [1, 2, 2, 2, 5, 2, 2, 1],
     [1, 1, 1, 1, 1, 1, 1, 1]
   ]
   
   module.exports = {
     maps:[map1, map2, map3, map4]
   }
   ```

10. 完成`app.json`
    
    ```json
    {
      "pages": [
        "pages/index/index",
        "pages/game/game"
      ],
      "window": {
        "navigationBarTextStyle": "white",
        "navigationBarTitleText": "推箱子游戏",
        "navigationBarBackgroundColor": "#E64340"
      },
      "style": "v2",
      "componentFramework": "glass-easel",
      "sitemapLocation": "sitemap.json",
      "lazyCodeLoading": "requiredComponents"
    }
    ```

## 三、程序运行结果

**主页**

![](C:\Users\chen\AppData\Roaming\marktext\images\2024-09-03-10-33-19-image.png)

**关卡详情页**

![](C:\Users\chen\AppData\Roaming\marktext\images\2024-09-03-10-40-03-image.png)

**通关界面**

![](C:\Users\chen\AppData\Roaming\marktext\images\2024-09-03-10-39-25-image.png)

## 四、问题总结与体会

通关后点击确定原本只是关闭弹窗，有点不符合常理，于是修改`game.js`中的`checkWin` 函数，使点击完确定后直接返回首页。修改如下：

```javascript
checkWin: function(){
    if (this.isWin()){
      wx.showModal({
        title: '恭喜',
        content: '游戏成功！',
        showCancel: false,
        success(res){
          if (res.confirm){
            wx.navigateTo({
              url:'../index/index'
            })
          }
        }
      })
    }
  },
```