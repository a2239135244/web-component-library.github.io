# 地图组件在脚手架下的引入方式(高德地图)

## 前期准备

#### 1.依赖安装
```bash
npm i @amap/amap-jsapi-loader
```

#### 2.权限申请
[创建工程key值申请](https://lbs.amap.com/api/webservice/guide/create-project/get-key)

## 代码部分（vue2）
```javascript
<template>
  <div></div>
</template>
<script>
const JSCODE = "20c35ffd137256cf7ca61805c83019f9";  // 安全密钥
// const IP = "http://10.42.42.159:82/";
// window._AMapSecurityConfig = {
//   serviceHost: "您的代理服务器域名或地址/_AMapService",
//   // 例如 ：serviceHost:'http://1.1.1.1:80/_AMapService',
// };

// 开发模式下使用
window._AMapSecurityConfig = {
  securityJsCode: JSCODE,
};
// 需要在引入之前进行设置，否者设置无效
import AMapLoader from "@amap/amap-jsapi-loader";

const KEY = "6f56b28fc28937e0f83db1ff9fbe18bc"; 

export default {
  data() {
    return {
      map: null,
    };
  },
  created() {
    this.initMap();
    // https://restapi.amap.com/v3/ip?parameters
  },
  methods: {
    async initMap() {
      console.log(window._AMapSecurityConfig);

      const AMap = await AMapLoader.load({
        key: KEY, // 申请好的Web端开发者Key，首次调用 load 时必填
        version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins: ["AMap.Geolocation", "AMap.CitySearch"], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
      }).catch((e) => console.log(e));

      const citySearch = new AMap.CitySearch();

      citySearch.getLocalCity((status, result) => {
        if (status === "complete" && result.info === "OK") {
          this.$store.commit("SET_GEOLOCATION", {
            adcode: result.adcode,
            city: result.city,
            province: result.province,
          });
        } else {
          // Do something
        }
      });

      // 在手机端获取详细定位，需要https; Only secure origins are allowed (see: https://goo.gl/Y0ZkNV).
      // const geolocation = new AMap.Geolocation({
      //   enableHighAccuracy: true, //是否使用高精度定位，默认:true
      //   timeout: 10000, //超过10秒后停止定位，默认：无穷大
      //   maximumAge: 0, //定位结果缓存0毫秒，默认：0
      //   convert: true, //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
      //   showButton: true, //显示定位按钮，默认：true
      //   buttonPosition: "LB", //定位按钮停靠位置，默认：'LB'，左下角
      //   buttonOffset: new AMap.Pixel(10, 20), //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
      //   showMarker: true, //定位成功后在定位到的位置显示点标记，默认：true
      //   showCircle: true, //定位成功后用圆圈表示定位精度范围，默认：true
      //   panToLocation: true, //定位成功后将定位到的位置作为地图中心点，默认：true
      //   zoomToAccuracy: true, //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
      // });

      // geolocation.getCurrentPosition();
      // console.log(AMap);
      // AMap.Event.addListener(geolocation, "complete", onComplete);
      // AMap.Event.addListener(geolocation, "error", onError);

      // function onComplete(data) {
      //   // data是具体的定位信息
      //   console.log(data);
      // }

      // function onError(data) {
      //   // 定位出错
      //   console.log(data);
      // }
    },
  },
};
</script>

<style></style>


```