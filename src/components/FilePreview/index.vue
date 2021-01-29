<template>
  <div>
    <el-image-viewer v-if="showViewer" :on-close="()=>{this.showViewer=false}" :url-list="[url]"
                     :z-index="9999"></el-image-viewer>
    <pdfview ref="pdfview"></pdfview>
  </div>
</template>

<script>
import ElImageViewer from 'element-ui/packages/image/src/image-viewer'
import pdfview from '../PdfView/index';


export default {
  name: "FilePreview",
  components: {
    ElImageViewer,
    pdfview
  },
  data() {
    return {
      showViewer: false,
      url: "",
    }
  },
  methods: {
    preview(file) {
      let fileId;
      if(file.fileId){
        fileId = file.fileId;
      }else {
        fileId = file.response.msg;
      }
      this.viewFile(file.name,  fileId)
    },
    viewFile(fileName, fileId) {
      let imgRegx = new RegExp('(.jpg|.jpeg|.png|.gif|.bmp)$')
      let docRegx = new RegExp('(.doc|.docx)$')
      let pdfRegx = new RegExp('(.pdf)$')
      let name = fileName.toLowerCase();
      let url = process.env.VUE_APP_BASE_DOWNLOAD_URL + fileId;
      if (docRegx.test(name)) {
        POBrowser.openWindowModeless(process.env.VUE_APP_BASE_API + '/page/office/view/' + fileId, 'width=1200px;height=915px;')
      } else if (pdfRegx.test(name)) {
        this.$nextTick(() => {
          this.$refs.pdfview.showDialog(url);
        })
      } else if (imgRegx.test(name)) {
        this.url = url;
        this.showViewer = true;
      } else {
        window.open(url, '_blank')
      }
    }
  }
}
</script>

<style scoped>

</style>
