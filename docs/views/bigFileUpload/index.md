<!--
 * @Author: 刘宇青 yqliu25@iflytek.com
 * @Date: 2023-01-29 17:08:24
 * @LastEditors: 刘宇青 yqliu25@iflytek.com
 * @LastEditTime: 2023-01-29 17:25:39
 * @FilePath: \web-component-library\docs\views\bigFileUpload\README.MD
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
## 案例截图
![](/public/images/1674984380945.png)

## 使用前准备
1、下载分割文件js源码，放置位置如图所示：![](/public/images/1674984265017.png)

2、如果是在cli下进行，需要使用worker-loader，并且配置到cli config文件中，下面以vue-cli为例
```bash
npm i worker-loader@3.0.8 --save
```
在vue.config.js 中进行配置
```javascript
chainWebpack(config){
  config.module
    .rule('worker')
    .test(/\.worker\.js$/)
    .use('worker')
    .loader('worker-loader')
    .options({
      inline: 'fallback'
    })
}
```


## 使用方式
```javascript
// 在组件内或者全局进行文件上传组件的引入之后
<BigFileUpload
  ref="myFileUpload"
  :value="scope.row.videoAttachments"
  :remove-file-callback="
    () => removeFileListVideo(scope.row, scope.$index)
  "
  @success="
    (fileJson) => formSuccess(fileJson, scope.$index)
  "
/>

this.$refs.myFileUpload.fileList  // 可直接获取到文件数据
```


## 完整代码示例
```javascript
<template>
  <div v-loading="status === Status.uploading">
    <div v-if="canUpload">
      <input
        ref="inputFile"
        class="upload_input_file"
        type="file"
        :disabled="status !== Status.wait"
        @change="handleFileChange"
      >
      <el-button type="primary" size="small" plain @click="clickInputFileDOM">
        {{ uploadFileButtonValue }}
      </el-button>
      <div v-if="container.file">{{ container.file.name }}</div>
    </div>
    <div
      v-if="canUpload && showUploadFormatTips"
      slot="tip"
      class="el-upload__tip"
    >
      请上传
      <!-- <template v-if="fileSize">
        大小不超过 <b style="color: #f56c6c">{{ fileSize }}MB</b>
      </template> -->
      <template v-if="fileType">
        格式为 <b style="color: #f56c6c">{{ fileType.join('/') }}</b>
      </template>
      <template v-if="videoDurationLimit !== null">
        且时长小于 <b style="color: #f56c6c">{{ videoDurationLimit }}S</b>
      </template>
      的文件
    </div>
    <div v-if="!uploadDisabled">
      <el-button
        size="mini"
        type="primary"
        :disabled="!canUpload"
        @click="handleUpload"
      >
        上传
      </el-button>
    </div>
    <!-- 文件信息 -->
    <!-- 文件列表 -->
    <transition-group
      class="upload-file-list el-upload-list el-upload-list--text"
      name="el-fade-in-linear"
      tag="ul"
    >
      {{ fileList }}
      <li
        v-for="(file, index) in fileList"
        :key="file.filePath"
        class="el-upload-list__item ele-upload-list__item-content"
      >
        <a class="a_ellipsis" target="_blank" :href="file.filePath">
          {{ file.fileName }}
        </a>
        <!-- <el-link
          :href="file.filePath | pathJoint"
          :underline="false"
          target="_blank"
        >
          <span class="el-icon-document"> {{ file.fileName }} </span>
        </el-link> -->
        <div class="ele-upload-list__item-content-action">
          <el-button
            :underline="false"
            type="danger"
            @click="handleDelete(index)"
          >删除</el-button>
        </div>
      </li>
    </transition-group>

    <!-- <button v-if="status === Status.pause" @click="handleResume">恢复</button>

    <button
      v-else
      class="pause-btn"
      :disabled="status !== Status.uploading || !container.hash"
      @click.stop="handlePause"
    >
      暂 停
    </button> -->
  </div>
</template>

<script>
import { getToken } from '@/utils/auth'
import Worker from './bigFileUpload/hash.worker.js'

const Status = {
  wait: 'wait',
  pause: 'pause',
  uploading: 'uploading'
}
// 切片大小（200kb）

// 基于xhr封装的，用来发送请求的
const request = ({
  url,
  method = 'post',
  data,
  headers = {},
  onProgress = (e) => e,
  requestList
}) =>
  new Promise((resolve) => {
    const xhr = new XMLHttpRequest()
    // 一个无符号长整型（unsigned long）数字，表示该请求的最大请求时间（毫秒），若超出该时间，请求会自动终止。
    // xhr.timeout = 100000
    xhr.upload.onprogress = onProgress
    xhr.open(method, process.env.VUE_APP_BASE_API + url)
    Object.keys(headers).forEach((key) =>
      xhr.setRequestHeader(key, headers[key])
    )
    xhr.ontimeout = (e) => {
      console.log('请求超时')
    }
    xhr.send(data)
    // XMLHttpRequest请求成功完成时触发；
    xhr.onload = (e) => {
      // 将请求成功的 xhr 从列表中删除
      if (requestList) {
        const xhrIndex = requestList.findIndex((item) => item === xhr)
        requestList.splice(xhrIndex, 1)
      }
      resolve(JSON.parse(e.target.response))
    }
    // 当请求结束时触发, 无论请求成功(load)还是失败(abort 或 error)。也可以使用 onloadend 属性。
    xhr.onloadend = (e) => e
    // 暴露当前 xhr 给外部
    requestList?.push(xhr)
  })

export default {
  props: {
    // eslint-disable-next-line
    value: [String, Object, Array],
    removeFileCallback: {
      type: Function,
      default: () => {}
    },
    // 数量限制
    limit: {
      type: Number,
      default: 1
    },
    // 显示上传格式题型
    showUploadFormatTips: {
      type: Boolean,
      default: true
    },
    // 是否可以上传
    canUpload: {
      type: Boolean,
      default: true
    },
    // 上传文件格式限制
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
    videoDurationLimit: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      fileSize: 200 * 1024,
      fileList: [],
      container: {
        file: null,
        hash: '',
        worker: null
      },
      // 当前的请求xhr组成的数组
      requestListArr: [],
      // 组装的filechunk分段文件
      data: [],
      Status,
      status: Status.wait,
      // 生成文件hash的进度
      hashPercentage: 0,
      // 显示在页面上的文件上传进度
      fakeUploadPercentage: 0
    }
  },
  computed: {
    // 文件上传的进度
    uploadPercentage: {
      get() {
        if (!this.container.file || !this.data.length) {
          return 0
        }
        const loaded = this.data
          .map((item) => {
            return item.size * item.percentage
          })
          .reduce((acc, cur) => {
            return acc + cur
          })
        return parseInt((loaded / this.container.file.size).toFixed(2))
      },
      set(newValue) {}
    },
    uploadFileButtonValue() {
      if (this.fileList.length === 1 && this.limit === 1) {
        return '替换文件'
      }
      return '选择文件'
    },
    // 上传按钮是否可以点击
    uploadDisabled() {
      return (
        !this.container.file ||
        [Status.pause, Status.uploading].includes(this.status)
      )
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
    },
    uploadPercentage(newValue) {
      if (newValue > this.fakeUploadPercentage) {
        this.fakeUploadPercentage = newValue
      }
    }
  },
  methods: {
    // 删除已经上传的文件
    handleDelete(index) {
      this.fileList.splice(index, 1)
      this.removeFileCallback()
    },
    // 暂停
    handlePause() {
      this.status = Status.pause
      this.requestListArr.forEach((xhr) => xhr?.abort())
      this.requestListArr = []
      if (this.container.worker) {
        this.container.worker.onmessage = null
      }
    },
    // 重置
    resetData() {
      this.hashPercentage = 0
      this.uploadPercentage = 0 // 暂时注释掉
      this.fakeUploadPercentage = 0
      this.requestListArr.forEach((xhr) => xhr?.abort())
      this.requestListArr = []
      if (this.container.worker) {
        this.container.worker.onmessage = null
      }
    },
    /**
     * 【恢复上传】
     * 上传进度是实时根据所有的上传切片的进度汇总来的
     * 只有某个切片完整/全部上传到了服务端，才算这个切片上传完成了
     * 如果，一些切片如果只上传了一部分，就被暂停了，那么恢复上传时，这一些切片是需要重新上传的
     * 这样就会导致恢复上传时，上传进度倒退的问题（因为上传进度是计算属性，是实时计算切片，汇总而来的）
     */
    async handleResume() {
      this.status = Status.uploading
      const { uploadedList } = await this.verifyUpload(
        this.container.file.name,
        this.container.hash
      )
      this.uploadChunks(uploadedList)
    },
    /**
     * 选择了文件
     */
    handleFileChange(e) {
      const [file] = e.target.files
      this.resetData()
      if (!file) return
      this.container.file = file
    },
    // 上传按钮
    async handleUpload() {
      if (!this.container.file) {
        return
      }
      // 点了上传按钮，状态改为上传中...
      this.status = Status.uploading
      // 文件分片
      const fileChunkList = this.createFileChunk(this.container.file)
      // 文件hash
      this.container.hash = await this.calculateHash(fileChunkList)

      // uploadedList已上传的切片的切片文件名称
      // const { shouldUpload, uploadedList } = await this.verifyUpload(
      //   this.container.file.name,
      //   this.container.hash
      // )
      const uploadedList = [] // 待删除

      // 组装的filechunk数据先置空
      this.data = []

      // 服务器已经有完整文件了
      // if (!shouldUpload) {
      //   this.fakeUploadPercentage = 100
      //   this.status = Status.wait
      //   this.$nextTick(() => alert('秒传：上传成功'))

      //   return
      // }

      this.data = fileChunkList.map(({ file }, index) => ({
        fileHash: this.container.hash,
        index,
        hash: `${this.container.hash}-${index}`,
        chunk: file,
        size: file.size,
        // 如果已上传切片数组uploadedList中包含这个切片，则证明这个切片之前已经上传成功了，进度设为100。
        percentage: uploadedList.includes(index) ? 100 : 0
      }))
      this.uploadChunks(uploadedList)
    },
    /**
     * 根据文件内容生成hash，而不是根据文件名称生成hash
     * 考虑到如果上传一个超大文件，读取文件内容计算 hash 是非常耗费时间的，并且会引起 UI 的阻塞，
     * 导致页面假死状态，所以我们使用 web-worker 在 worker 线程计算 hash，这样用户仍可以在主界面正常的交互
     * @Author   Author
     * @DateTime 2021-12-31T14:19:59+0800
     * @param    {[type]}                 fileChunkList [description]
     * @return   {[type]}                               [description]
     */
    calculateHash(fileChunkList) {
      return new Promise((resolve) => {
        this.container.worker = new Worker()
        this.container.worker.postMessage({ fileChunkList })
        this.container.worker.onmessage = (e) => {
          const { percentage, hash } = e.data
          this.hashPercentage = percentage.toFixed(2)
          if (hash) {
            resolve(hash)
          }
        }
      })
    },
    // 生成文件切片
    createFileChunk(file) {
      const fileChunkList = []
      // 1mb
      const mbSize = 1024 * 1024
      // 大于1G
      if (1024 * mbSize <= file.size) {
        this.fileSize = parseInt(file.size / 20)
      } else if (300 * mbSize <= file.size) {
        this.fileSize = parseInt(file.size / 15)
      } else if (50 * mbSize <= file.size) {
        this.fileSize = parseInt(file.size / 10)
      } else {
        this.fileSize = parseInt(file.size / 5)
      }

      let cur = 0
      while (cur < file.size) {
        fileChunkList.push({
          file: file.slice(cur, cur + this.fileSize)
        })
        cur += this.fileSize
      }

      return fileChunkList
    },
    /**
     * 上传切片，同时过滤已上传的切片
     * uploadedList：已经上传了的切片，这次不用上传了
     */
    async uploadChunks(uploadedList = []) {
      const requestList = this.data
        .filter(({ hash }) => !uploadedList.includes(hash))
        .map(({ chunk, hash, index }) => {
          const formData = new FormData()
          // 切片文件
          formData.append('file', chunk)
          // 切片文件hash
          formData.append('chunkNum', index)
          // 大文件的文件名
          formData.append('fileName', this.container.file.name)
          // 大文件hash
          formData.append('fileHash', this.container.hash)
          return { formData, index }
        })
        .map(async({ formData, index }) =>
          request({
            url: '/file/shardingUpload',
            headers: {
              Authorization: 'Bearer ' + getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
            },
            data: formData,
            onProgress: this.createProgressHandler(index, this.data[index]),
            requestList: this.requestListArr
          })
        )

      // 并发切片
      await Promise.all(requestList)

      // 之前上传的切片数量 + 本次上传的切片数量 = 所有切片数量时
      // 切片并发上传完以后，发个请求告诉后端：合并切片
      if (uploadedList.length + requestList.length === this.data.length) {
        this.mergeRequest(requestList.length)
      }
    },
    /**
     * 上传切片进度的回调函数
     * 用闭包保存每个chunk的进度数据
     */
    createProgressHandler(index, item) {
      return (e) => {
        if (e.lengthComputable) {
          item.percentage = parseInt(String((e.loaded / e.total) * 100))
        }
      }
    },

    /**
     * 验证该文件是否需要上次，文件通过hash生成唯一，改名后也是不需要再上传的，也就相当于妙传
     */
    async verifyUpload(fileName, fileHash) {
      const data = await request({
        url: 'http://localhost:9999/verify',
        headers: {
          'content-type': 'application/json',
          Authorization: 'Bearer ' + getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
        },
        data: JSON.stringify({
          fileName,
          fileHash
        })
      })
      return JSON.parse(data)
    },
    /**
     * 发请求通知服务器，合并切片啦～
     */
    async mergeRequest(totalChunk) {
      // 判断是否有后缀
      if (this.container.file.name.lastIndexOf('.') > -1) {
        // 获取后缀名
        var fileExtension = this.container.file.name.slice(
          this.container.file.name.lastIndexOf('.') + 1
        )
      }
      const res = await request({
        url: '/manage/attachment/shardingMerage',
        headers: {
          'content-type': 'application/json',
          Authorization: 'Bearer ' + getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
        },
        data: JSON.stringify({
          totalChunk, // 总切片数
          fileType: fileExtension, // 文件后缀
          size: this.fileSize,
          fileHash: this.container.hash,
          fileName: this.container.file.name
        })
      })

      // 上传数量超出
      if (this.fileList.length >= this.limit) {
        // 如果上传最大数是1，那么就进行替换
        if (this.limit === 1) {
          this.fileList = [res.data]
          // 此处的替换，从DOM按钮上来提示用户
        } else {
          this.msgError(`文件最多只能上传${this.limit}个！`)
          return
        }
      } else {
        // 没有超出限制
        this.fileList.push(res.data)
      }

      const videoTime = await this.getVideoDuration(this.container.file)

      this.$emit('success', {
        ...res.data,
        videoTime
      })

      this.msgSuccess('上传成功')
      // 将上传按钮控制隐藏
      this.container.file = null
      this.status = Status.wait
    },
    getVideoDuration(fileData) {
      const url = URL.createObjectURL(fileData)
      const myVideo = document.createElement('video')

      return new Promise((resolve, reject) => {
        myVideo.addEventListener('loadedmetadata', function() {
          resolve(myVideo.duration)
        })
        myVideo.src = url
      })
    },
    // 通过自定义按钮来触发inputfile上传按钮
    clickInputFileDOM() {
      this.$refs.inputFile.click()
    }
  }
}
</script>

<style lang="scss" scoped>
.upload-file-list .el-upload-list__item {
  min-width: 100px;
  border: 1px solid #e4e7ed;
  padding-left: 5px;
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
.upload_input_file {
  display: none;
}
</style>

```
