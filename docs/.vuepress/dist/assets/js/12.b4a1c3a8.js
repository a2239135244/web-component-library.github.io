(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{286:function(t,n,s){"use strict";s.r(n);var a=s(14),e=Object(a.a)({},(function(){var t=this,n=t._self._c;return n("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[n("h1",{attrs:{id:"文件预览-前后端"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#文件预览-前后端"}},[t._v("#")]),t._v(" 文件预览（前后端）")]),t._v(" "),n("h2",{attrs:{id:"前端"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#前端"}},[t._v("#")]),t._v(" 前端")]),t._v(" "),n("p",[t._v("代码片段中的 "),n("strong",[t._v("onlinePreviewPath 变量是通过后端接口返回的")])]),t._v(" "),n("p",[t._v("docPath变量是将"),n("strong",[t._v("常规文件路径进行加密")]),t._v("之后的处理结果")]),t._v(" "),n("p",[t._v("注：在实际编写中，请注意"),n("strong",[t._v("判空处理")]),t._v("，在部分字段为null的情况下需要针对性处理")]),t._v(" "),n("div",{staticClass:"language-javascript extra-class"},[n("pre",{pre:!0,attrs:{class:"language-javascript"}},[n("code",[n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("iframe\n    width"),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"100%"')]),t._v("\n    height"),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"690px"')]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v("src"),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"`${onlinePreviewPath}onlinePreview?url=${docPath}&officePreviewType=pdf&tifPreviewType=jpg&tifPreviewType=jpg&tifPreviewType=jpg`"')]),t._v("\n    frameborder"),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"0"')]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("\n    \n"),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("docPath")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" window"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("encodeURIComponent")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("\n      "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 此处放置后端返回的文件路径")]),t._v("\n      window"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("btoa")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v("'https://pics0.baidu.com/1.jpg'")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[t._v("''")]),t._v("\n   \n    \n\n")])])]),n("h2",{attrs:{id:"后端"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#后端"}},[t._v("#")]),t._v(" 后端")]),t._v(" "),n("p",[n("a",{attrs:{href:"https://kkfileview.keking.cn/zh-cn/index.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("kkFileView文档"),n("OutboundLink")],1)]),t._v(" "),n("p",[t._v("1.按照官方文档安装：https://wiki.documentfoundation.org/Documentation/Install/Linux#Fedora_.2F_CentOS 安装office")]),t._v(" "),n("p",[t._v("2.安装后配置application 中的 office.home =/opt/libreoffice7.2")]),t._v(" "),n("p",[t._v("3.进入/etc/profile中 export PATH=$PATH:/opt/libreoffice7.2/program/")]),t._v(" "),n("p",[t._v("4.执行中，如果报查询不到office.home:")]),t._v(" "),n("p",[t._v("使用ps -ef|grep office  ,kill -9  进程号")]),t._v(" "),n("p",[t._v("5.如果报中文乱码，那么 将fonts 文件拷贝到 需要把常用字体拷贝到Linux服务器上，具体操作如下： 下载如下字体包 http://kkfileview.keking.cn/fonts.zip 文件解压完整拷贝到Linux下的 /usr/share/fonts目录。然后依次执行mkfontscale 、mkfontdir 、fc-cache使字体生效")]),t._v(" "),n("p",[t._v("6.再次将office进程关闭，然后执行.\n      \n  在bin 路径下执行：nohup java -Dfile.encoding=UTF-8 -Dspring.config.location=../config/application.properties -jar file-view-3.4.0.jar > ../log/kkFileView.log 2>&1 &")])])}),[],!1,null,null,null);n.default=e.exports}}]);