## 使用方式
```javascript
// 在组件内或者全局进行文件上传组件的引入之后
<fileUpload :value="文件数据列表" ref="myFileUpload"  />

// 获取文件列表数据通过
this.$refs.myFileUpload.fileList
```

## 代码部分
```javascript
<template>
  <div class="upload-file">
    <el-upload
      v-if="isShowUpload"
      ref="upload"
      :action="uploadFileUrl"
      :before-upload="handleBeforeUpload"
      :file-list="fileList"
      :limit="limit"
      :multiple="multiple"
      :on-error="handleUploadError"
      :on-exceed="handleExceed"
      :on-success="handleUploadSuccess"
      :show-file-list="false"
      :headers="headers"
      class="upload-file-uploader"
      :disabled="isDisabled"
    >
      <!-- 上传按钮 -->
      <div v-if="isShowUpload">
        <el-button
          ref="uploadBtn" 
          :class="{ specialButton: isShowSpecialFile === true }"
          size="mini"
          type="primary"
          :disabled="isDisabled"
        >本地上传</el-button>
        <slot name="tips" />
        <!-- 自定义文件列表 -->
        <transition-group
          v-if="isShowSpecialFile"
          name="el-fade-in-linear"
          tag="ul"
        >
          <li
            v-for="file in fileList"
            :key="file.filePath"
            class="specialFlie_li"
          >
            <el-link :href="file.filePath" :underline="false" target="_blank">
              <span> {{ file.fileName }} </span>
            </el-link>
          </li>
        </transition-group>
      </div>

      <!-- <el-button class="ml0" size="mini" type="success" @click="submitUpload" v-if="!autoUpload">上传到服务器</el-button> -->
      <!-- 上传提示 -->
      <div v-if="showTip" slot="tip" class="el-upload__tip">
        请上传
        <template v-if="fileSize">
          大小不超过 <b style="color: #f56c6c">{{ fileSize }}MB</b>
        </template>
        <template v-if="fileType">
          格式为 <b style="color: #f56c6c">{{ fileType.join('/') }}</b>
        </template>
        的文件
      </div>
    </el-upload>
    <!-- 文件列表 -->
    <transition-group
      v-if="isShowFile"
      class="upload-file-list el-upload-list el-upload-list--text"
      name="el-fade-in-linear"
      tag="ul"
    >
      <li
        v-for="(file, index) in fileList"
        :key="file.filePath"
        class="el-upload-list__item ele-upload-list__item-content"
      >
        <a class="a_ellipsis" @click.prevent="fileDownload(file)">{{
          file.fileName
        }}</a>
        <!-- <el-link
          :href="file.filePath"
          :download="file.fileName"
          :underline="false"
          target="_blank"
        >
          <span class="el-icon-document"> {{ file.fileName }} </span>
        </el-link> -->
        <div v-if="!isDisabled" class="ele-upload-list__item-content-action">
          <el-link
            :underline="false"
            type="danger"
            @click="handleDelete(index)"
          >删除</el-link>
        </div>
      </li>
    </transition-group>
  </div>
</template>

<script>
import { getToken } from '@/utils/auth'

export default {
  name: 'FileUpload',
  props: {
    // 值
    // eslint-disable-next-line
    value: [String, Object, Array],
    // 数量限制
    limit: {
      type: Number,
      default: 5
    },
    // 限制一个文件，已经上传一次之后再次上传进行替换
    limitOneReplaceTheUpload: {
      type: Boolean,
      default: false
    },
    // 大小限制(MB)
    fileSize: {
      type: Number,
      default: 2
    },
    fileType: {
      type: Array,
      default: () => [
        'doc',
        'docx',
        'xls',
        'xlsx',
        'ppt',
        'pptx',
        'txt',
        'jpg',
        'jpeg',
        'png',
        'pdf',
        'zip',
        'rar'
      ]
    },
    // 是否显示提示
    isShowTip: {
      type: Boolean,
      default: true
    },
    // 是否支持多选
    multiple: {
      type: Boolean,
      default: false
    },
    // 是否可以上传
    isUpload: {
      type: Boolean,
      default: false
    },
    // 是否可以上传
    uploadType: {
      type: Number,
      default: -1
    },
    // 是否显示上传
    isShowUpload: {
      type: Boolean,
      default: true
    },
    // 是否显示文件列表
    isShowFile: {
      type: Boolean,
      default: true
    },
    // 是否显示自定义文件列表
    isShowSpecialFile: {
      type: Boolean,
      default: false
    },
    // 上传路径
    uploadFileUrl: {
      type: String,
      default:
        process.env.VUE_APP_BASE_API + '/manage/attachment/uploadAttachment'
    },
    // 上传禁用 删除不显示
    isDisabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      // uploadFileUrl:
      //   process.env.VUE_APP_BASE_API + '/manage/attachment/uploadAttachment', // 上传的图片服务器地址
      headers: {
        Authorization: 'Bearer ' + getToken()
      },
      fileList: [], // 已上传的文件列表
      fileData: new FormData(), // 需要上传的文件列表
      loading: null // 上传loading
    }
  },
  computed: {
    // 是否显示提示
    showTip() {
      return this.isShowTip && (this.fileType || this.fileSize)
    }
  },
  watch: {
    value: {
      handler(val) {
        if (val) {
          let temp = 1
          // 首先将值转为数组
          const list = Array.isArray(val) ? val : this.value.split(',')
          // 然后将数组转为对象数组
          this.fileList = list.map((item) => {
            if (typeof item === 'string') {
              item = { name: item, url: item }
            }
            item.uid = item.uid || new Date().getTime() + temp++
            return item
          })
        } else {
          this.fileList = []
          return []
        }
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    // 上传前校检格式和大小
    handleBeforeUpload(file) {
      // 校检文件类型
      if (this.fileType) {
        let fileExtension = ''
        if (file.name.lastIndexOf('.') > -1) {
          fileExtension = file.name.slice(file.name.lastIndexOf('.') + 1)
        }
        const isTypeOk = this.fileType.some((type) => {
          // if (file.type.includes(type)) return true
          if (fileExtension && fileExtension.indexOf(type) > -1) return true
          return false
        })
        if (!isTypeOk) {
          this.$message.error(
            `文件格式不正确, 请上传${this.fileType.join('/')}格式文件!`
          )
          return false
        }
      }
      // 校检文件大小
      if (this.fileSize) {
        const isLt = file.size / 1024 / 1024 < this.fileSize
        if (!isLt) {
          this.$message.error(`上传文件大小不能超过 ${this.fileSize} MB!`)
          return false
        }
      }
      this.loading = this.$loading({
        lock: true,
        text: '上传中',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      return true
    },
    // 文件个数超出
    handleExceed() {
      this.$message.error(`上传文件数量不能超过 ${this.limit} 个!`)
    },
    // 上传失败
    handleUploadError(err) {
      this.$message.error('上传失败, 请重试' + err)
      this.loading.close()
    },
    // 将文件上传到服务器
    submitUpload() {
      // this.$refs.upload.submit()
    },
    // 上传成功回调
    handleUploadSuccess(res, file, fileList) {
      if (res.code === 200) {
        // 如果限制一个再次上传替换上一个的开关为true
        if (this.limitOneReplaceTheUpload) {
          this.fileList = [res.data]
          this.$emit('update:value', this.fileList)
        } else {
          this.fileList.push(res.data)
        }
        this.$message.success('上传成功')
        this.$emit('success', res.data)
      } else {
        this.$message.error(res.msg)
      }
      this.loading.close()
    },
    // 删除文件
    handleDelete(index) {
      this.fileList.splice(index, 1)
    },
    // 获取文件名称
    getFileName(name) {
      if (name.lastIndexOf('/') > -1) {
        return name.slice(name.lastIndexOf('/') + 1).toLowerCase()
      } else {
        return ''
      }
    },
    // 对象转成指定字符串分隔
    listToString(list, separator) {
      let strs = ''
      separator = separator || ','
      for (const i in list) {
        strs += list[i].url + separator
      }
      return strs !== '' ? strs.substr(0, strs.length - 1) : ''
    }
  }
}
</script>

<style scoped lang="scss">
.specialButton {
  float: left;
}
.specialFlie_li {
  list-style: none;
  padding-left: 62px;
}
.upload-file-uploader {
  margin-bottom: 5px;
}
.upload-file-list .el-upload-list__item {
  border: 1px solid #e4e7ed;
  padding-left: 5px;
  min-width: 400px;
  line-height: 2;
  margin-bottom: 10px;
  position: relative;
}
.upload-file-list .ele-upload-list__item-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: inherit;
}
.ele-upload-list__item-content-action .el-link {
  margin-right: 10px;
}
.el-link {
  width: 35px;
}
.a_ellipsis {
  width: 300px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>

```