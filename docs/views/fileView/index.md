# 文件预览（前后端）


## 前端
代码片段中的 **onlinePreviewPath 变量是通过后端接口返回的**

docPath变量是将**常规文件路径进行加密**之后的处理结果

注：在实际编写中，请注意**判空处理**，在部分字段为null的情况下需要针对性处理

```javascript
<iframe
    width="100%"
    height="690px"
    :src="`${onlinePreviewPath}onlinePreview?url=${docPath}&officePreviewType=pdf&tifPreviewType=jpg&tifPreviewType=jpg&tifPreviewType=jpg`"
    frameborder="0"
    />
    
docPath() {
    return window.encodeURIComponent(
      // 此处放置后端返回的文件路径
      window.btoa('https://pics0.baidu.com/1.jpg')
    )
  }
  return ''
   
    

```


## 后端

[kkFileView文档](https://kkfileview.keking.cn/zh-cn/index.html)

1.按照官方文档安装：https://wiki.documentfoundation.org/Documentation/Install/Linux#Fedora_.2F_CentOS 安装office


2.安装后配置application 中的 office.home =/opt/libreoffice7.2


3.进入/etc/profile中 export PATH=$PATH:/opt/libreoffice7.2/program/


4.执行中，如果报查询不到office.home:

  使用ps -ef|grep office  ,kill -9  进程号


5.如果报中文乱码，那么 将fonts 文件拷贝到 需要把常用字体拷贝到Linux服务器上，具体操作如下： 下载如下字体包 http://kkfileview.keking.cn/fonts.zip 文件解压完整拷贝到Linux下的 /usr/share/fonts目录。然后依次执行mkfontscale 、mkfontdir 、fc-cache使字体生效


6.再次将office进程关闭，然后执行.
      
  在bin 路径下执行：nohup java -Dfile.encoding=UTF-8 -Dspring.config.location=../config/application.properties -jar file-view-3.4.0.jar > ../log/kkFileView.log 2>&1 &