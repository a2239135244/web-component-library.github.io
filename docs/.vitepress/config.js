/*
 * @Author: 刘宇青 yqliu25@iflytek.com
 * @Date: 2023-01-29 17:07:44
 * @LastEditors: 刘宇青 yqliu25@iflytek.com
 * @LastEditTime: 2023-03-07 16:09:35
 * @FilePath: \web-component-library\docs\.vuepress\config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export default {
  title: '前端组件库',
  description: '立即开始',
  base: '/web-component-library/',
  themeConfig: {
    // search: true,
    // logo: '/images/iflyui-logo.png',
    // searchMaxSuggestions: 10,
    // nav: [
    //   { text: '思维导图', link: '/guide/', target:'_self', rel:'' },
    // ],
    sidebar: {
      '/views/': [
        {
          text:'代码片段',
          items: [
            { text: "高德地图引用", link: "/views/map/" },
            { text: "在线文件预览", link: "/views/fileView/" }
          ]
        },
        {
          text: '组件部分',
          items: [
            { text: "大文件上传", link: "/views/bigFileUpload/" },
            { text: "富文本", link: "/views/editor/" },
            { text: "文件上传", link: "/views/fileUpload/" },
            { text: "思维导图", link: "/views/mindElixir/" },
          ]
        }
      ]
    },
  },

}
