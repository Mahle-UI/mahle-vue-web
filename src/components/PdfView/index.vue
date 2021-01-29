<template>
  <div>
    <el-dialog :close-on-click-modal="false" :title="$t('common.view')" :visible.sync="open" width="1000px"
               append-to-body>
      <pdf ref="pdf" v-for="item in numPages" :key="item" :src="src" :page="item" style="margin: 10px 0"/>
    </el-dialog>
  </div>
</template>

<script>
import pdf from 'vue-pdf'

export default {
  components: {
    pdf
  },
  data() {
    return {
      src: '',
      open: false,
      currentPage: 0, // pdf文件页码
      pageCount: 0, // pdf文件总页数
      numPages: "",
    }
  },
  methods: {
    showDialog(url) {
      this.open = true;
      this.src = pdf.createLoadingTask(url)
      this.src.promise.then((pdf) => {
        this.numPages = pdf.numPages
      })
    },
    // pdf加载时
    loadPdfHandler(e) {
      this.currentPage = 1 // 加载的时候先加载第一页
    }
  },
}
</script>

<style scoped>
.el-form-item {
  margin-bottom: 5px
}
</style>
