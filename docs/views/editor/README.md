<h1 align="center">
  <a href="https://quilljs.com/" title="Quill">Quill 富文本</a>
</h1>
<p align="center">
  <a href="https://quilljs.com/" title="Quill"><img alt="Quill Logo" src="https://quilljs.com/assets/images/logo.svg" width="180"></a>
</p>
<p align="center">
  <a title="Quickstart" href="#quickstart"><strong>Quickstart</strong></a>
  &#x2022;
  <a title="Documentation" href="https://quilljs.com/docs/"><strong>Documentation</strong></a>
  &#x2022;
  <a title="Development" href="https://github.com/quilljs/quill/blob/master/.github/DEVELOPMENT.md"><strong>Development</strong></a>
  &#x2022;
  <a title="Contributing" href="https://github.com/quilljs/quill/blob/master/.github/CONTRIBUTING.md"><strong>Contributing</strong></a>
  &#x2022;
  <a title="Interactive Playground" href="https://quilljs.com/playground/"><strong>Interactive Playground</strong></a>
</p>
<p align="center">
  <a href="https://travis-ci.org/quilljs/quill" title="Build Status">
    <img src="https://travis-ci.org/quilljs/quill.svg?branch=master" alt="Build Status">
  </a>
  <a href="https://npmjs.com/package/quill" title="Version">
    <img src="https://img.shields.io/npm/v/quill.svg" alt="Version">
  </a>
  <a href="https://npmjs.com/package/quill" title="Downloads">
    <img src="https://img.shields.io/npm/dm/quill.svg" alt="Downloads">
  </a>
</p>
<p align="center">
  <a href="https://saucelabs.com/u/quill" title="Test Status">
    <img src="https://cdn.quilljs.com/badge.svg?v=2" alt="Test Status">
  </a>
</p>


[QuillJS](https://quilljs.com/) 是为兼容性和可扩展性而构建的现代富文本编辑器。它由 [Jason Chen](https://twitter.com/jhchen) 和 [Byron Milligan](https://twitter.com/byronmilligan) 创建，并由 Salesforce 开源。

首先，请查看 [Quill](https://quilljs.com/) 网站上的文档、指南和现场演示！


## 基于quill插件封装的富文本组件


### 安装

#### NPM

```bash
npm i quill -S
```

#### yarn

```bash
yarn add quill -S
```

#### 封装组件代码
```javascript
<template>
  <div>
    <el-upload
      v-if="type == 'url'"
      ref="upload"
      :action="uploadUrl"
      :before-upload="handleBeforeUpload"
      :on-success="handleUploadSuccess"
      :on-error="handleUploadError"
      name="file"
      :show-file-list="false"
      :headers="headers"
      style="display: none"
    />
    <div ref="editor" class="editor" :style="styles" />
  </div>
</template>

<script>
import Quill from 'quill'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { getToken } from '@/utils/auth'

export default {
  name: 'Editor',
  props: {
    /* 编辑器的内容 */
    value: {
      type: String,
      default: ''
    },
    /* 高度 */
    height: {
      type: Number,
      default: null
    },
    /* 最小高度 */
    minHeight: {
      type: Number,
      default: null
    },
    /* 只读 */
    readOnly: {
      type: Boolean,
      default: false
    },
    // 上传文件大小限制(MB)
    fileSize: {
      type: Number,
      default: 5
    },
    /* 类型（base64格式、url格式） */
    type: {
      type: String,
      default: 'url'
    },
    quillTextMaxLength: {
      type: Number,
      default: 4000
    }
  },
  data() {
    return {
      uploadUrl:
        process.env.VUE_APP_BASE_API + '/manage/attachment/uploadAttachment', // 上传的图片服务器地址
      headers: {
        Authorization: 'Bearer ' + getToken()
      },
      Quill: null,
      currentValue: '',
      text: '',
      options: {
        theme: 'snow',
        bounds: document.body,
        debug: 'warn',
        modules: {
          // 工具栏配置
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'], // 加粗 斜体 下划线 删除线
            ['blockquote', 'code-block'], // 引用  代码块
            [{ list: 'ordered' }, { list: 'bullet' }], // 有序、无序列表
            [{ indent: '-1' }, { indent: '+1' }], // 缩进
            [{ size: ['small', false, 'large', 'huge'] }], // 字体大小
            [{ header: [1, 2, 3, 4, 5, 6, false] }], // 标题
            [{ color: [] }, { background: [] }], // 字体颜色、字体背景颜色
            [{ align: [] }], // 对齐方式
            ['clean'], // 清除文本格式
            ['link', 'image'] //   链接、图片、视频-'video'
          ]
        },
        placeholder: '请输入内容',
        readOnly: this.readOnly
      }
    }
  },
  computed: {
    styles() {
      const style = {}
      if (this.minHeight) {
        style.minHeight = `${this.minHeight}px`
      }
      if (this.height) {
        style.height = `${this.height}px`
      }
      return style
    }
  },
  watch: {
    value: {
      handler(val) {
        if (val !== this.currentValue) {
          this.currentValue = val === null ? '' : val
          if (this.Quill) {
            this.Quill.pasteHTML(this.currentValue)
          }
        }
      },
      immediate: true
    }
  },
  mounted() {
    this.init()
  },
  beforeDestroy() {
    this.Quill = null
  },
  methods: {
    init() {
      const editor = this.$refs.editor

      this.Quill = new Quill(editor, this.options)
      // 如果设置了上传地址则自定义图片上传事件
      if (this.type === 'url') {
        const toolbar = this.Quill.getModule('toolbar')
        toolbar.addHandler('image', (value) => {
          this.uploadType = 'image'
          if (value) {
            this.$refs.upload.$children[0].$refs.input.click()
            // 开启loading
            // 执行上传之后的回调函数
          } else {
            this.quill.format('image', false)
          }
        })
      }
      this.Quill.pasteHTML(this.currentValue)
      this.Quill.on('text-change', (delta, oldDelta, source) => {
        const html = this.$refs.editor.children[0].innerHTML
        const text = this.Quill.getText()
        const quill = this.Quill
        this.text = text
        // console.log(this)
        // console.log(this.text)
        this.currentValue = html
        this.$emit('input', html)
        this.$emit('on-change', { html, text, quill })
        // 限制最大字数
        const { ops } = this.Quill.deleteText(this.quillTextMaxLength, 4)
        // 通过件
        if (ops.length && ops[1].delete) {
          this.msgInfo(`最多只能输入${this.quillTextMaxLength}个字符`)
        }

      })
      this.Quill.on('text-change', (delta, oldDelta, source) => {
        this.$emit('on-text-change', delta, oldDelta, source)
      })
      this.Quill.on('selection-change', (range, oldRange, source) => {
        this.$emit('on-selection-change', range, oldRange, source)
      })
      this.Quill.on('editor-change', (eventName, ...args) => {
        this.$emit('on-editor-change', eventName, ...args)
      })
    },
    // 上传前校检格式和大小
    handleBeforeUpload(file) {
      // 校检文件大小
      if (this.fileSize) {
        const isLt = file.size / 1024 / 1024 < this.fileSize
        if (!isLt) {
          this.$message.error(`上传文件大小不能超过 ${this.fileSize} MB!`)
          return false
        }
      }
      return true
    },
    handleUploadSuccess(res, file) {
      // 获取富文本组件实例
      const quill = this.Quill
      // 如果上传成功
      if (res.code === 200) {
        // 获取光标所在位置
        const length = quill.getSelection().index
        // 插入图片  res.url为服务器返回的图片地址
        quill.insertEmbed(length, 'image', res.data.filePath)
        // 调整光标到最后
        quill.setSelection(length + 1)
      } else {
        this.$message.error('图片插入失败')
      }
    },
    handleUploadError() {
      this.$message.error('图片插入失败')
    }
  }
}
</script>

<style>
.editor,
.ql-toolbar {
  white-space: pre-wrap !important;
  line-height: normal !important;
}
.quill-img {
  display: none;
}
.ql-snow .ql-tooltip[data-mode='link']::before {
  content: '请输入链接地址:';
}
.ql-snow .ql-tooltip.ql-editing a.ql-action::after {
  border-right: 0px;
  content: '保存';
  padding-right: 0px;
}

.ql-snow .ql-tooltip[data-mode='video']::before {
  content: '请输入视频地址:';
}

.ql-snow .ql-picker.ql-size .ql-picker-label::before,
.ql-snow .ql-picker.ql-size .ql-picker-item::before {
  content: '14px';
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value='small']::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value='small']::before {
  content: '10px';
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value='large']::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value='large']::before {
  content: '18px';
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value='huge']::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value='huge']::before {
  content: '32px';
}

.ql-snow .ql-picker.ql-header .ql-picker-label::before,
.ql-snow .ql-picker.ql-header .ql-picker-item::before {
  content: '文本';
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value='1']::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value='1']::before {
  content: '标题1';
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value='2']::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value='2']::before {
  content: '标题2';
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value='3']::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value='3']::before {
  content: '标题3';
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value='4']::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value='4']::before {
  content: '标题4';
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value='5']::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value='5']::before {
  content: '标题5';
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value='6']::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value='6']::before {
  content: '标题6';
}

.ql-snow .ql-picker.ql-font .ql-picker-label::before,
.ql-snow .ql-picker.ql-font .ql-picker-item::before {
  content: '标准字体';
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value='serif']::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value='serif']::before {
  content: '衬线字体';
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value='monospace']::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value='monospace']::before {
  content: '等宽字体';
}
</style>

```

## 在渲染通过富文本保存的内容时，请设置如下css(scss)
```css
.html_render_box {
  tab-size: 3.4;
  white-space: pre-wrap;
  word-wrap: break-word;
  text-indent: 1em !important;
  h1 {
    font-weight: 500;
  }

  img {
    max-height: 100%;
    max-width: 100%;
  }

  ul {
    width: 100%;

    li {
      list-style: disc;
    }
  }

  ol {
    li {
      list-style: decimal;
    }
  }
  p {
    word-break: break-all;
    word-break: break-word; //文本超出 自动换行
  }
}

$text_indent_size: 3em;

body {
  .ql-align-right {
    padding-right: 8px;
  }
  .ql-indent-1:not(.ql-direction-rtl) {
    padding-left: 0;
    text-indent: calc(1 * #{$text_indent_size});
  }
  .ql-indent-2:not(.ql-direction-rtl) {
    padding-left: 0;
    text-indent: calc(2 * #{$text_indent_size});
  }
  .ql-indent-3:not(.ql-direction-rtl) {
    padding-left: 0;
    text-indent: calc(3 * #{$text_indent_size});
  }
  .ql-indent-4:not(.ql-direction-rtl) {
    padding-left: 0;
    text-indent: calc(4 * #{$text_indent_size});
  }
  .ql-indent-5:not(.ql-direction-rtl) {
    padding-left: 0;
    text-indent: calc(5 * #{$text_indent_size});
  }
  .ql-indent-6:not(.ql-direction-rtl) {
    padding-left: 0;
    text-indent: calc(6 * #{$text_indent_size});
  }
  .ql-indent-7:not(.ql-direction-rtl) {
    padding-left: 0;
    text-indent: calc(7 * #{$text_indent_size});
  }
  .ql-indent-8:not(.ql-direction-rtl) {
    padding-left: 0;
    text-indent: calc(8 * #{$text_indent_size});
  }

  .ql-editor .ql-size-small {
    font-size: 0.75em;
  }
  .ql-size-large {
    font-size: 1.5em;
  }
  .ql-size-huge {
    font-size: 2.5em;
  }
  .ql-syntax {
    background: #000;
    line-height: 35px;
    color: #fff;
  }

  .ql-align-justify {
    a {
      color: #1675e8;
      text-decoration: underline;
    }
  }
  .ql-align-right {
    text-align: right;
  }
}

.ql-align-center {
  text-align: center !important;

  img {
    width: 100%;

    display: block;
  }
}
```