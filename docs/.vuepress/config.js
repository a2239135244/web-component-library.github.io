/*
 * @Author: 刘宇青 yqliu25@iflytek.com
 * @Date: 2023-01-29 17:07:44
 * @LastEditors: 刘宇青 yqliu25@iflytek.com
 * @LastEditTime: 2023-02-03 15:02:25
 * @FilePath: \web-component-library\docs\.vuepress\config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
module.exports = {
  base: '/web-component-library.github.io/',
  title: '',
  description: 'Just playing around',
  cache: false,
  head: [
    [
      'link', { rel:'icon', href:'/assets/img/ifly-shortcut.png.png' }
    ]
  ],
  themeConfig: {
    search: true,
    logo: '/assets/img/iflyui-logo.png',
    searchMaxSuggestions: 10,
    nav: [
      { text: '思维导图', link: '/guide/', target:'_self', rel:'' },
    ],
    sidebar: [
      ['/views/mindElixir/','思维导图'],
      ['/views/fileUpload/','文件上传'],
      ['/views/bigFileUpload/','大文件上传'],
      ['/views/editor/','富文本'],
      ['/views/map/','地图使用*'],
      ['/views/fileView/','文件预览*']
    ]
  },

}
