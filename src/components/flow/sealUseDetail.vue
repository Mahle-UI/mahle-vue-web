<template>
  <div>
    <el-form ref="form" :model="viewForm" :label-width="$i18n.locale=='en'?'150px':'130px'">
      <el-form-item :label="$t('sealUse.sealId')" prop="sealName">
        <el-input disabled="" v-model="viewForm.sealName"
                  :placeholder="$t('common.placeSelect')+' '+$t('sealUse.sealId')" suffix-icon="el-icon-search"/>
      </el-form-item>
      <el-form-item :label="$t('sealUse.userName')" prop="userId">
        <el-input disabled v-model="viewForm.userName"
                  :placeholder="$t('common.placeSelect')+' '+$t('sealUse.userName')"/>
      </el-form-item>
      <el-form-item :label="$t('sealUse.useDate')" prop="useDate">
        <el-date-picker disabled clearable size="small" style="width: 200px"
                        v-model="viewForm.useDate"
                        type="date"
                        value-format="yyyy-MM-dd"
                        :placeholder="$t('common.choose')+$t('sealUse.useDate')">
        </el-date-picker>
      </el-form-item>
      <el-form-item :label="$t('contractTemplate.relevantdept')" prop="relatedDept">
        <el-select disabled="" class="selectWidth" v-model="viewForm.relatedDept" multiple=""
                   :placeholder="$t('common.placeSelect')+' '+$t('contractTemplate.relevantdept')">
          <el-option
            v-for="dept in deptDictOptions"
            :key="dept.dictCode"
            :label="dept.remark"
            :value="dept.dictCode"
          />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('sealUse.files')" prop="files">
        <el-input disabled v-model="viewForm.files" :placeholder="$t('common.placeholder')+' '+$t('sealUse.files')"/>
      </el-form-item>


      <el-form-item :label="$t('sealUse.file')" prop="attachment">
        <div v-if="viewForm.file&&viewForm.file.fileName">
          {{ viewForm.file && viewForm.file.fileName ? viewForm.file.fileName : '' }}
          <el-link @click="viewFile(viewForm.file)" type="success" style="margin-right: 10px;">{{ $t('common.view') }}
          </el-link>
          <el-link @click="download(viewForm.file)" type="danger">{{ $t('common.download') }}</el-link>
        </div>
      </el-form-item>

      <el-form-item :label="$t('sealUse.filesNum')" prop="filesNum">
        <el-input disabled v-model="viewForm.filesNum"
                  :placeholder="$t('common.placeholder')+' '+$t('sealUse.filesNum')"/>
      </el-form-item>

      <el-form-item :label="$t('sealUse.createDate')" prop="createDate" v-if="false">
        <el-date-picker clearable size="small" style="width: 200px"
                        v-model="viewForm.createDate"
                        type="date"
                        value-format="yyyy-MM-dd"
                        :placeholder="$t('common.choose')+$t('sealUse.createDate')">
        </el-date-picker>
      </el-form-item>
      <el-form-item :label="$t('sealUse.remark')" prop="remark">
        <el-input disabled type="textarea" v-model="viewForm.remark"
                  :placeholder="$t('common.placeholder')+' '+$t('sealUse.remark')"/>
      </el-form-item>

      <el-form-item v-if="viewForm.isupload" :label="$t('sealUse.annex')" prop="uploadFiles">
        <el-upload
          ref="upload"
          :limit="1"
          accept=".docx, .doc,.pdf"
          :action="upload.url"
          :headers="upload.headers"
          auto-upload
          :before-upload="handleFileUploadProgress"
          :on-preview="handleFilePreview"
          :on-success="handleFileSuccess"
          :file-list="upload.fileList">
          <el-button slot="trigger" size="small" type="primary">{{ $t('common.selectFile') }}</el-button>
          <div slot="tip" class="el-upload__tip">{{ $t('common.filePdfRemark') }}</div>
        </el-upload>
      </el-form-item>
      <el-form-item :label="$t('sealUse.annex')" v-else prop="attachment">
        <div v-if="viewForm.annexs&&viewForm.annexs.fileName">
          {{ viewForm.annexs && viewForm.annexs.fileName ? viewForm.annexs.fileName : '' }}
          <el-link @click="viewFile(viewForm.annexs)" type="success" style="margin-right: 10px;">
            {{ $t('common.view') }}
          </el-link>
          <el-link @click="download(viewForm.annexs)" type="danger">{{ $t('common.download') }}</el-link>
        </div>
      </el-form-item>
    </el-form>
    <div style="text-align: center" v-if="viewForm.isupload">
      <el-button type="primary" @click="submitForm" v-prevent-repeat-click>{{ $t('common.submit') }}</el-button>
    </div>
    <FilePreview ref="filePreview"></FilePreview>
  </div>
</template>

<script>
import {updateAnnex} from "@/api/flow/sealUse";
import {loaddictdept} from "@/api/info/contractTemplate";
import {getToken} from "@/utils/auth";
import {downloadfile} from "@/api/flow/contract";
import FilePreview from "../FilePreview/index";

export default {
  props: {
    viewForm: Object
  },
  components: {
    FilePreview
  },
  data() {
    return {
      deptDictOptions: [],
      upload: {
        // 是否禁用上传
        isUploading: false,
        // 设置上传的请求头部
        headers: {Authorization: "Bearer " + getToken()},
        // 上传的地址
        url: process.env.VUE_APP_BASE_API + "/info/file/upload?type=220",
        // 上传的文件列表
        fileList: []
      }
    }
  },
  created() {
    loaddictdept().then(response => {
      if (response.code === 200) {
        this.deptDictOptions = response.data
      }
    });
  },
  name: "sealDetail",
  methods: {
    // 文件提交处理
    submitUpload() {
      this.$refs.upload.submit();
    },
    // 文件上传中处理
    handleFileUploadProgress(event, file, fileList) {
      this.upload.isUploading = true;
    },
    // 文件上传成功处理
    handleFileSuccess(response, file, fileList) {
      this.upload.isUploading = false;
      if (response.code == '200') {
        this.viewForm.annex = response.msg
      } else {
        this.msgSuccess(response.msg);
      }
    },
    //点击文件列表中已上传的文件时的钩子函数
    handleFilePreview(file){
      this.$nextTick(() => {
        this.$refs.filePreview.preview(file)
      })
    },
    viewFile(item) {
      this.$nextTick(() => {
        this.$refs.filePreview.viewFile(item.fileName,item.filePath)
      })
    },
    download(item) {
      downloadfile({fileId: item.fmsId}).then(response => {
        var data = response
        if (!data) {
          return
        }
        //判断ie
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
          window.navigator.msSaveOrOpenBlob(new Blob([data]), item.fileName)
        } else {
          let url = window.URL.createObjectURL(new Blob([data]))
          let link = document.createElement('a')
          link.style.display = 'none'
          link.href = url
          link.setAttribute('download', item.fileName)

          document.body.appendChild(link)
          link.click()
        }

      }).catch(function () {
      });

    },
    /** 提交按钮 */
    submitForm() {
      if (!this.viewForm.annex) {
        this.$message.error('请上传文件');
        return false;
      }
      updateAnnex({id: this.viewForm.id, annex: this.viewForm.annex}).then(response => {
        if (response.code === 200) {
          this.msgSuccess(this.$t('common.successEdit'));
        }
      });
    }
  }
}
</script>

<style scoped>

</style>
