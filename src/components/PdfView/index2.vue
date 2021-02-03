<template>
  <div>
    <el-dialog :close-on-click-modal="false" :title="$t('common.view')" :visible.sync="open" width="1000px"
               append-to-body>
      <canvas v-for="page in pages" :id="'canvas' + page" :key="page"></canvas>
    </el-dialog>
  </div>
</template>

<script>
import PDF from 'pdfjs-dist'
PDF.GlobalWorkerOptions.workerSrc = 'pdfjs-dist/build/pdf.worker.js';
export default {
  data() {
    return {
      src: '',
      open: false,
      currentPage: 0, // pdf文件页码
      pageCount: 0, // pdf文件总页数
      numPages: "",
      width: 100,
      pdfDoc: null,
      pages: 0
    }
  },
  methods: {
    showDialog(url) {
      this.open = true;
      this.loadFile(url)
    },

    /*
    * 加载PDF文件
    * url：后台提供的pdf地址或者项目中public/pdf文件（test.pdf）
    * 在需要的位置调用 this.loadFile(url)
    * */
    loadFile (url) {
      PDF.getDocument(url)
        .then((pdf) => {
          this.pdfDoc = pdf
          this.pages = this.pdfDoc.numPages
          this.$nextTick(() => {
            this.renderPage(1)
          })
        })
    },
    /*
    * 渲染PDF文件
    * */
    renderPage (num) {
      this.pdfDoc.getPage(num)
        .then((page) => {
          let canvas = document.getElementById('canvas' + num)
          let ctx = canvas.getContext('2d')
          let dpr = window.devicePixelRatio || 1 // 设备像素比
          let bsr = ctx.webkitBackingStorePixelRatio || ctx.mozBackingStorePixelRatio || ctx.msBackingStorePixelRatio || ctx.oBackingStorePixelRatio || ctx.backingStorePixelRatio || 1 // 浏览器在渲染canvas之前会用几个像素来来存储画布信息,类似img
          let ratio = dpr / bsr
          let viewport = page.getViewport(3)
          canvas.width = viewport.width * ratio // 画布大小,默认值是width:300px,height:150px
          canvas.height = viewport.height * ratio
          canvas.style.width = viewport.width + 'px' // 画布的框架大小
          canvas.style.height = viewport.height + 'px'
          let renderContext = {
            canvasContext: ctx,
            viewport: viewport
          }
          page.render(renderContext)
          if (this.pages > num) {
            this.renderPage(num + 1)
          } else {
            this.closeServerLoadingHandle()
          }
        })
    }
  },
}
</script>

<style scoped>
.el-form-item {
  margin-bottom: 5px
}
.pdf-container{
  width: 100%;
  height: 100%;
  position: absolute;
  top:0;
  left:0;
  bottom:0;
  right:0;
}
</style>
