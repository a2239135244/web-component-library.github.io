import{_ as s,c as n,o as a,a as l}from"./app.0118f7a1.js";const C=JSON.parse('{"title":"地图组件在脚手架下的引入方式(高德地图)","description":"","frontmatter":{},"headers":[{"level":2,"title":"前期准备","slug":"前期准备","link":"#前期准备","children":[]},{"level":2,"title":"代码部分（vue2）","slug":"代码部分-vue2","link":"#代码部分-vue2","children":[]}],"relativePath":"views/map/index.md"}'),p={name:"views/map/index.md"},o=l(`<h1 id="地图组件在脚手架下的引入方式-高德地图" tabindex="-1">地图组件在脚手架下的引入方式(高德地图) <a class="header-anchor" href="#地图组件在脚手架下的引入方式-高德地图" aria-hidden="true">#</a></h1><h2 id="前期准备" tabindex="-1">前期准备 <a class="header-anchor" href="#前期准备" aria-hidden="true">#</a></h2><h4 id="_1-依赖安装" tabindex="-1">1.依赖安装 <a class="header-anchor" href="#_1-依赖安装" aria-hidden="true">#</a></h4><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">npm</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">i</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">@amap/amap-jsapi-loader</span></span>
<span class="line"></span></code></pre></div><h4 id="_2-权限申请" tabindex="-1">2.权限申请 <a class="header-anchor" href="#_2-权限申请" aria-hidden="true">#</a></h4><p><a href="https://lbs.amap.com/api/webservice/guide/create-project/get-key" target="_blank" rel="noreferrer">创建工程key值申请</a></p><h2 id="代码部分-vue2" tabindex="-1">代码部分（vue2） <a class="header-anchor" href="#代码部分-vue2" aria-hidden="true">#</a></h2><div class="language-javascript"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">template</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;">&gt;&lt;/</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">template</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">const JSCODE = &quot;20c35ffd137256cf7ca61805c83019f9&quot;;  // 安全密钥</span></span>
<span class="line"><span style="color:#A6ACCD;">// const IP = &quot;http://10.42.42.159:82/&quot;;</span></span>
<span class="line"><span style="color:#A6ACCD;">// window._AMapSecurityConfig = </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">//   serviceHost: &quot;您的代理服务器域名或地址/_AMapService&quot;,</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">//   // 例如 ：serviceHost:&#39;http://1.1.1.1:80/_AMapService&#39;,</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// };</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 开发模式下使用</span></span>
<span class="line"><span style="color:#A6ACCD;">window</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">_AMapSecurityConfig </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">securityJsCode</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> JSCODE</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 需要在引入之前进行设置，否者设置无效</span></span>
<span class="line"><span style="color:#A6ACCD;">import AMapLoader from </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">@amap/amap-jsapi-loader</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">const KEY </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">6f56b28fc28937e0f83db1ff9fbe18bc</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">; </span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">export default </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">data</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">      map</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">null,</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">};</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">created</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">this.</span><span style="color:#82AAFF;">initMap</span><span style="color:#F07178;">()</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;">// https://restapi.amap.com/v3/ip?parameters</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">methods</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C792EA;">async</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">initMap</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">window</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">_AMapSecurityConfig</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">AMap</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;font-style:italic;">await</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">AMapLoader</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">load</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">        key</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">KEY</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#676E95;font-style:italic;">// 申请好的Web端开发者Key，首次调用 load 时必填</span></span>
<span class="line"><span style="color:#F07178;">        version</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">2.0</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#676E95;font-style:italic;">// 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15</span></span>
<span class="line"><span style="color:#F07178;">        plugins</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> [</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">AMap.Geolocation</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">AMap.CitySearch</span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">]</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#676E95;font-style:italic;">// 需要使用的的插件列表，如比例尺&#39;AMap.Scale&#39;等</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#89DDFF;">}</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">catch</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">e</span><span style="color:#89DDFF;">)</span><span style="color:#F07178;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">e</span><span style="color:#F07178;">))</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">citySearch</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">new</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">AMap</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">CitySearch</span><span style="color:#F07178;">()</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#A6ACCD;">citySearch</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">getLocalCity</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">status</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;font-style:italic;">result</span><span style="color:#89DDFF;">)</span><span style="color:#F07178;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#F07178;"> (</span><span style="color:#A6ACCD;">status</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">===</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">complete</span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&amp;&amp;</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">result</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">info</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">===</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">OK</span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">          </span><span style="color:#89DDFF;">this.</span><span style="color:#A6ACCD;">$store</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">commit</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">SET_GEOLOCATION</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">            adcode</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">result</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">adcode</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">            city</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">result</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">city</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">            province</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">result</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">province</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">          </span><span style="color:#89DDFF;">}</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#89DDFF;">}</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;font-style:italic;">else</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">          </span><span style="color:#676E95;font-style:italic;">// Do something</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#89DDFF;">}</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">      </span><span style="color:#676E95;font-style:italic;">// 在手机端获取详细定位，需要https; Only secure origins are allowed (see: https://goo.gl/Y0ZkNV).</span></span>
<span class="line"><span style="color:#89DDFF;">      </span><span style="color:#676E95;font-style:italic;">// const geolocation = new AMap.Geolocation({</span></span>
<span class="line"><span style="color:#89DDFF;">      </span><span style="color:#676E95;font-style:italic;">//   enableHighAccuracy: true, //是否使用高精度定位，默认:true</span></span>
<span class="line"><span style="color:#89DDFF;">      </span><span style="color:#676E95;font-style:italic;">//   timeout: 10000, //超过10秒后停止定位，默认：无穷大</span></span>
<span class="line"><span style="color:#89DDFF;">      </span><span style="color:#676E95;font-style:italic;">//   maximumAge: 0, //定位结果缓存0毫秒，默认：0</span></span>
<span class="line"><span style="color:#89DDFF;">      </span><span style="color:#676E95;font-style:italic;">//   convert: true, //自动偏移坐标，偏移后的坐标为高德坐标，默认：true</span></span>
<span class="line"><span style="color:#89DDFF;">      </span><span style="color:#676E95;font-style:italic;">//   showButton: true, //显示定位按钮，默认：true</span></span>
<span class="line"><span style="color:#89DDFF;">      </span><span style="color:#676E95;font-style:italic;">//   buttonPosition: &quot;LB&quot;, //定位按钮停靠位置，默认：&#39;LB&#39;，左下角</span></span>
<span class="line"><span style="color:#89DDFF;">      </span><span style="color:#676E95;font-style:italic;">//   buttonOffset: new AMap.Pixel(10, 20), //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)</span></span>
<span class="line"><span style="color:#89DDFF;">      </span><span style="color:#676E95;font-style:italic;">//   showMarker: true, //定位成功后在定位到的位置显示点标记，默认：true</span></span>
<span class="line"><span style="color:#89DDFF;">      </span><span style="color:#676E95;font-style:italic;">//   showCircle: true, //定位成功后用圆圈表示定位精度范围，默认：true</span></span>
<span class="line"><span style="color:#89DDFF;">      </span><span style="color:#676E95;font-style:italic;">//   panToLocation: true, //定位成功后将定位到的位置作为地图中心点，默认：true</span></span>
<span class="line"><span style="color:#89DDFF;">      </span><span style="color:#676E95;font-style:italic;">//   zoomToAccuracy: true, //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false</span></span>
<span class="line"><span style="color:#89DDFF;">      </span><span style="color:#676E95;font-style:italic;">// });</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">      </span><span style="color:#676E95;font-style:italic;">// geolocation.getCurrentPosition();</span></span>
<span class="line"><span style="color:#89DDFF;">      </span><span style="color:#676E95;font-style:italic;">// console.log(AMap);</span></span>
<span class="line"><span style="color:#89DDFF;">      </span><span style="color:#676E95;font-style:italic;">// AMap.Event.addListener(geolocation, &quot;complete&quot;, onComplete);</span></span>
<span class="line"><span style="color:#89DDFF;">      </span><span style="color:#676E95;font-style:italic;">// AMap.Event.addListener(geolocation, &quot;error&quot;, onError);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">      </span><span style="color:#676E95;font-style:italic;">// function onComplete(data) {</span></span>
<span class="line"><span style="color:#89DDFF;">      </span><span style="color:#676E95;font-style:italic;">//   // data是具体的定位信息</span></span>
<span class="line"><span style="color:#89DDFF;">      </span><span style="color:#676E95;font-style:italic;">//   console.log(data);</span></span>
<span class="line"><span style="color:#89DDFF;">      </span><span style="color:#676E95;font-style:italic;">// }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">      </span><span style="color:#676E95;font-style:italic;">// function onError(data) {</span></span>
<span class="line"><span style="color:#89DDFF;">      </span><span style="color:#676E95;font-style:italic;">//   // 定位出错</span></span>
<span class="line"><span style="color:#89DDFF;">      </span><span style="color:#676E95;font-style:italic;">//   console.log(data);</span></span>
<span class="line"><span style="color:#89DDFF;">      </span><span style="color:#676E95;font-style:italic;">// }</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#A6ACCD;">script</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">style</span><span style="color:#89DDFF;">&gt;&lt;/</span><span style="color:#F07178;">style</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span></code></pre></div>`,8),e=[o];function t(c,r,y,F,D,i){return a(),n("div",null,e)}const u=s(p,[["render",t]]);export{C as __pageData,u as default};
