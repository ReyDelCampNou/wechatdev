# 2024年夏季《移动软件开发》实验报告

<center>姓名：陈正元  学号：22020007159</center>

| 姓名和学号？      | 陈正元，22020007159                                             |
| ----------- | ----------------------------------------------------------- |
| 本实验属于哪门课程？  | 中国海洋大学24夏《移动软件开发》                                           |
| 实验名称？       | 实验3：                                                        |
| 博客地址？       | 无                                                           |
| Github仓库地址？ | https://github.com/ReyDelCampNou/wechatdev/tree/master/exp3 |

## **一、实验目标**

1、学习使用快速启动模板创建小程序的方法；2、学习不使用模板手动创建小程序的方法。

## 二、实验步骤

1. 在百度云智能上注册账号并创建应用
   
   ![](C:\Users\chen\AppData\Roaming\marktext\images\2024-08-26-14-23-14-image.png)

2. 在微信平台上添加合法域名
   
   ![](C:\Users\chen\AppData\Roaming\marktext\images\2024-08-26-14-23-42-image.png)

3. 领取免费资源
   
   ![](C:\Users\chen\AppData\Roaming\marktext\images\2024-08-26-14-24-58-image.png)
   
   ![](C:\Users\chen\AppData\Roaming\marktext\images\2024-08-26-14-25-12-image.png)

4. 配置百度API KEY \ SECRET 和 小程序appid, 云环境ID
   
   ![](C:\Users\chen\AppData\Roaming\marktext\images\2024-08-26-14-31-26-image.png)
   
   ![](C:\Users\chen\AppData\Roaming\marktext\images\2024-08-26-14-32-41-image.png)
   
   ![](C:\Users\chen\AppData\Roaming\marktext\images\2024-08-26-14-30-22-image.png)

5. 创建云环境
   
   ![](C:\Users\chen\AppData\Roaming\marktext\images\2024-08-26-14-25-43-image.png)

6. 上传云函数并导入数据库
   
   ![](C:\Users\chen\AppData\Roaming\marktext\images\2024-08-26-14-26-50-image.png)

## 三、程序运行结果

输入图片：

![](C:\Users\chen\AppData\Roaming\marktext\images\2024-08-26-14-34-23-8544ccf6af838495cae10d0e04834d8.jpg)

输出结果：

![](C:\Users\chen\AppData\Roaming\marktext\images\2024-08-26-14-34-44-ddf7fc6631951bfbf1a4deabca14010.jpg)

输入图片：

![](C:\Users\chen\AppData\Roaming\marktext\images\2024-08-26-14-35-11-82af12bf634cb8fed7179ba7e389cac.jpg)

输出结果：

![](C:\Users\chen\AppData\Roaming\marktext\images\2024-08-26-14-35-25-841227a42ea370dbd0b6d89a513bacd.jpg)

直接查寻：

![](C:\Users\chen\AppData\Roaming\marktext\images\2024-08-26-14-35-50-image.png)

一些结果：

![](C:\Users\chen\AppData\Roaming\marktext\images\2024-08-26-14-39-09-image.png)

## 四、问题总结与体会

一开始部署完成测试时发现输入图片后没有反应，经检查发现是未将域名加入合法域名列表；之后输入发现一直没有识别出任何物体，检查传回的json数据发现是请求达到限制，领取百度云免费内容并等待一定时间后解决。