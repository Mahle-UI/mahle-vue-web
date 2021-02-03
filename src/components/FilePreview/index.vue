<template>
  <div>
    <el-image ref="preImage" style="width: 0; height: 0" :src="url"
              :preview-src-list="[url]">
    </el-image>
    <pdfview ref="pdfview"></pdfview>
  </div>
</template>

<script>
//import ElImageViewer from 'element-ui/packages/image/src/image-viewer'
import pdfview from '../PdfView/index';
import {getFileById} from "@/api/info/file";


export default {
  name: "FilePreview",
  components: {
    /*ElImageViewer,*/
    pdfview
  },
  data() {
    return {
      showViewer: false,
      url: '',
      id:''
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
      this.id = fileId;
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
        let that = this;
        getFileById(fileId).then(response => {
          if(response.code === 200){
            this.url = process.env.VUE_APP_BASE_API + "/file/" + response.data.filePath
            this.$nextTick(() => {
              setTimeout(function () {
                that.$refs.preImage.clickHandler();
              },200)
            })
          }
        })
      } else {
        window.open(url, '_blank')
      }
    }
  }
}
</script>
