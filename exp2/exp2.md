# 2024年夏季《移动软件开发》实验报告

<center>姓名：陈正元  学号：22020007159</center>

| 姓名和学号？      | 陈正元，22020007159                                             |
| ----------- | ----------------------------------------------------------- |
| 本实验属于哪门课程？  | 中国海洋大学24夏《移动软件开发》                                           |
| 实验名称？       | 实验2：天气查询小程序                                                 |
| 博客地址？       | 无                                                           |
| Github仓库地址？ | https://github.com/ReyDelCampNou/wechatdev/tree/master/exp2 |

（备注：将实验报告发布在博客、代码公开至 github 是 **加分项**，不是必须做的）

## **一、实验目标**

1、学习使用快速启动模板创建小程序的方法；2、学习不使用模板手动创建小程序的方法。

## 二、实验步骤

1. 在和风天气上注册账号
   
   ![](C:\Users\chen\AppData\Roaming\marktext\images\2024-08-20-10-21-27-image.png)

2. 在微信平台上添加`request`合法域名
   
   ![](C:\Users\chen\AppData\Roaming\marktext\images\2024-08-20-10-22-44-image.png)

3. 下载icon
   
   ![](C:\Users\chen\AppData\Roaming\marktext\images\2024-08-20-10-32-46-image.png)

4. 添加页面各组件
   
   ```html
   <!--index.wxml-->
   <view class='container'>
     <picker mode='region' bindchange='regionChange'>
       <view>{{region}}</view>
     </picker>
     <text>{{now.temp}}°C{{now.text}}</text>
     <image src='/images/weather_icon/{{now.icon}}.svg' mode='widthFix'></image>
     <view class='detail'>
       <view class='bar'>
         <view class='box'>温度</view>
         <view class='box'>气压</view>
         <view class='box'>能见度</view>
       </view>
       <view class='bar'>
         <view class='box'>{{now.humidity}} %</view>
         <view class='box'>{{now.pressure}} hPa</view>
         <view class='box'>{{now.vis}} km</view>
       </view>
       <view class="bar">
         <view class='box'>风向</view>
         <view class='box'>风速</view>
         <view class='box'>风力</view>
       </view>
       <view class="bar">
         <view class='box'>{{now.windDir}}</view>
         <view class='box'>{{now.windSpeed}} km/h</view>
         <view class='box'>{{now.windScale}} 级</view>
       </view>
     </view>
   </view>
   ```

5. 配置相应的wxss文件
   
   ```css
   /**index.wxss**/
   text{
     font-size: 80rpx;
     color: #3C5F81;
   }
   .detail{
     width: 100%;
     display: flex;
     flex-direction: column;
   }
   .bar{
     display: flex;
     flex-direction: row;
     margin: 20rpx 0;
   }
   .box{
     width: 33.3%;
     text-align: center;
   }
   ```

6. 添加js脚本
   
   ```javascript
   // index.js
   Page({
   
     /**
      * 页面的初始数据
      */
     data: {
       region:['上海市', '上海市', '徐汇区'],
       now:{
         cloud: "0",
         dew: "0",
         feelsLike: "0",
         humidity: "0",
         icon: "999",
         obsTime: "2024-01-01T00:00+08:00",
         precip: "0.0",
         pressure: "10",
         temp: "0",
         wind360: "0",
         windDir: "/",
         windScale: "0",
         windSpeed: "0",
       }
     },
   
     getWeather:function(){
       var that = this;
       wx.request({
         url: 'https://geoapi.qweather.com/v2/city/lookup',
         data:{
           location:that.data.region[1],
           key:'40cb89951d9f4d31b25f8e7a1a2d7294'
         },
         success:function(res){
           console.log(res)
           wx.request({
             url: 'https://devapi.qweather.com/v7/weather/now',
             data:{
               location:res.data.location[0].id,
               key:'40cb89951d9f4d31b25f8e7a1a2d7294'
             },
             success:function(res){
               console.log(res.data.now);
               that.setData({now:res.data.now})
             }
           })
         }
       })
     },
   
     /**
      * 生命周期函数--监听页面加载
      */
     onLoad: function (options) {
       this.getWeather();
     },
   
     regionChange: function(e){
       this.setData({region: e.detail.value})
       this.getWeather();
     }
   })
   ```
   
   与教程中不同的是和风天气修改了它的api，需要先通过`https://geoapi.qweather.com`查询城市代码，再通过城市代码查询天气信息，因此这里使用了两次`request`。

## 三、程序运行结果

![](C:\Users\chen\AppData\Roaming\marktext\images\2024-08-20-10-35-16-image.png)

![](C:\Users\chen\AppData\Roaming\marktext\images\2024-08-20-10-35-42-image.png)

![](C:\Users\chen\AppData\Roaming\marktext\images\2024-08-20-10-35-55-image.png)

## 四、问题总结与体会

在本次实验中遇到了api与实验手册不一致的情况，通过查询官方文档[GeoAPI | 和风天气开发服务 (qweather.com)](https://dev.qweather.com/docs/api/geoapi/)、[实时天气 for API | 和风天气开发服务 (qweather.com)](https://dev.qweather.com/docs/api/weather/weather-now/)以及观察控制台中返回的json格式完成了脚本编写。