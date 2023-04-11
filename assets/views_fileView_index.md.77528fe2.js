import{_ as s,c as n,o as a,a as e}from"./app.48dab324.js";const d=JSON.parse('{"title":"文件预览（前后端）","description":"","frontmatter":{},"headers":[{"level":2,"title":"前端","slug":"前端","link":"#前端","children":[]},{"level":2,"title":"后端","slug":"后端","link":"#后端","children":[]}],"relativePath":"views/fileView/index.md"}'),p={name:"views/fileView/index.md"},l=e(`<h1 id="文件预览-前后端" tabindex="-1">文件预览（前后端） <a class="header-anchor" href="#文件预览-前后端" aria-hidden="true">#</a></h1><h2 id="前端" tabindex="-1">前端 <a class="header-anchor" href="#前端" aria-hidden="true">#</a></h2><p>代码片段中的 <strong>onlinePreviewPath 变量是通过后端接口返回的</strong></p><p>docPath变量是将<strong>常规文件路径进行加密</strong>之后的处理结果</p><p>注：在实际编写中，请注意<strong>判空处理</strong>，在部分字段为null的情况下需要针对性处理</p><div class="language-javascript"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">iframe</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#C792EA;">width</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">100%</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#C792EA;">height</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">690px</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#89DDFF;">    :src=&quot;\`\${onlinePreviewPath}onlinePreview?url=\${docPath}&amp;officePreviewType=pdf&amp;tifPreviewType=jpg&amp;tifPreviewType=jpg&amp;tifPreviewType=jpg\`&quot;</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#C792EA;">frameborder</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">0</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#89DDFF;">    /&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span></span>
<span class="line"><span style="color:#82AAFF;">docPath</span><span style="color:#A6ACCD;">() </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">window</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">encodeURIComponent</span><span style="color:#F07178;">(</span></span>
<span class="line"><span style="color:#89DDFF;">      </span><span style="color:#676E95;font-style:italic;">// 此处放置后端返回的文件路径</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#A6ACCD;">window</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">btoa</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">https://pics0.baidu.com/1.jpg</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">    )</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">   </span></span>
<span class="line"><span style="color:#A6ACCD;">    </span></span>
<span class="line"></span>
<span class="line"></span></code></pre></div><h2 id="后端" tabindex="-1">后端 <a class="header-anchor" href="#后端" aria-hidden="true">#</a></h2><p><a href="https://kkfileview.keking.cn/zh-cn/index.html" target="_blank" rel="noreferrer">kkFileView文档</a></p><p>1.按照官方文档安装：<a href="https://wiki.documentfoundation.org/Documentation/Install/Linux#Fedora_.2F_CentOS" target="_blank" rel="noreferrer">https://wiki.documentfoundation.org/Documentation/Install/Linux#Fedora_.2F_CentOS</a> 安装office</p><p>2.安装后配置application 中的 office.home =/opt/libreoffice7.2</p><p>3.进入/etc/profile中 export PATH=$PATH:/opt/libreoffice7.2/program/</p><p>4.执行中，如果报查询不到office.home:</p><p>使用ps -ef|grep office  ,kill -9  进程号</p><p>5.如果报中文乱码，那么 将fonts 文件拷贝到 需要把常用字体拷贝到Linux服务器上，具体操作如下： 下载如下字体包 <a href="http://kkfileview.keking.cn/fonts.zip" target="_blank" rel="noreferrer">http://kkfileview.keking.cn/fonts.zip</a> 文件解压完整拷贝到Linux下的 /usr/share/fonts目录。然后依次执行mkfontscale 、mkfontdir 、fc-cache使字体生效</p><p>6.再次将office进程关闭，然后执行.          在bin 路径下执行：nohup java -Dfile.encoding=UTF-8 -Dspring.config.location=../config/application.properties -jar file-view-3.4.0.jar &gt; ../log/kkFileView.log 2&gt;&amp;1 &amp;</p>`,15),o=[l];function t(r,i,c,F,D,y){return a(),n("div",null,o)}const h=s(p,[["render",t]]);export{d as __pageData,h as default};
