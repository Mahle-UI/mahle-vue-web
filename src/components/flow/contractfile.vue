<template>
  <div >
     <el-form ref="form" :model="form" :rules="rules" label-width="80px">
            <el-form-item label-width="130px" :label="$t('contract.startTime')" prop="archiveBeginTime">
              <el-input  clearable class="selectWidth" v-model="form.archiveBeginTime" :placeholder="$t('common.placeholder')+$t('contract.startTime')"></el-input>
            </el-form-item>
            <el-form-item label-width="130px" :label="$t('contract.contractExpirationReminder')" prop="warn">
            <el-switch
              v-model="message"
              active-color="#13ce66"
              inactive-color="#b6b6b6">
            </el-switch>
            <el-form-item label-width="130px" style="position: absolute;top: 3px;left: 10px;" :label="$t('contract.noticeWay')" prop="files" v-if="message">
              <!-- isRemind : 0 >> 没有 ;  isRemind : 1 >>邮箱 ; isRemind : 2 >>系统通知 ; isRemind : 3 >>  邮箱 + 系统通知 ; -->
              <el-checkbox v-model="notificationRadio1">{{$t('contract.email')}}</el-checkbox>
              <el-checkbox v-model="notificationRadio2">{{$t('contract.systemNotification')}}</el-checkbox>
            </el-form-item>
          </el-form-item>

            <el-form-item label-width="130px" :label="$t('contract.endTime')" prop="archiveEndTime">
              <el-input v-if="!message" clearable class="endTime" v-model="form.archiveEndTime" :placeholder="$t('common.placeholder')+$t('contract.endTime')"></el-input>
              <el-date-picker
                v-if="message"
                v-model="form.archiveEndTime"
                style="width:100%"
                type="date"
                value-format="yyyy-MM-dd"
                :placeholder="$t('common.choose')+$t('contract.startTime')">
              </el-date-picker>
            </el-form-item>
            <el-form-item label-width="130px" :label="$t('contract.signingTime')" prop="contractSignDate">
               <el-date-picker
                v-model="form.contractSignDate"
                style="width:100%"
                type="date"
                value-format="yyyy-MM-dd"
                :placeholder="$t('common.choose')+$t('contract.signingTime')">
              </el-date-picker>
            </el-form-item>
            <el-form-item label-width="130px" :label="$t('contract.archiveDocuments')" prop="archiveFileId">
              <el-upload
                ref="upload"
                :limit="1"
                accept=".docx, .pdf,.doc"
                :action="UploadUrl()"
                :headers="upload.headers"
                :file-list="upload.fileList"
                :on-preview="handleFilePreview"
                :on-success="handleFileSuccess"
                :before-upload="handleFileUploadProgress"
                auto-upload>
                <el-button slot="trigger" size="small" @click="type=form.fileType" type="primary">{{$t('common.selectFile')}}</el-button>
                <div slot="tip" class="el-upload__tip">{{$t('common.filePdfRemark')}}</div>
              </el-upload>
            </el-form-item>
            <el-form-item label-width="130px" :label="$t('contract.originalcopyAddress')" prop="originPlace">
              <el-input type="textarea" v-model="form.originPlace" :placeholder="$t('common.placeholder')+' '+$t('contract.originalcopyAddress')" />
            </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm" v-prevent-repeat-click>{{$t('common.submit')}}</el-button>
        <el-button @click="cancleDialog">{{$t('common.cancle')}}</el-button>
      </div>
    <FilePreview ref="filePreview"></FilePreview>
  </div>
</template>

<script>
  import { getToken } from "@/utils/auth";
  import FilePreview from "../FilePreview/index";
  export default {
    components: {FilePreview},
    props: {
      fileType:String,
      contractId:String,
    },
    data() {
      return {
        type:110,
        notificationRadio1:'',
        notificationRadio2:'',
        message:false,
        // 上传参数
        upload: {
          // 是否禁用上传
          isUploading: false,
          // 设置上传的请求头部
          headers: { Authorization: "Bearer " + getToken() },
          // 上传的地址
          url: process.env.VUE_APP_BASE_API + "/info/file/upload?type=160",
          // 上传的文件列表
          fileList: []
        },
        // 表单参数
        form: {},
        // 表单校验
        rules: {
          archiveEndTime: [
            { required: true, message: "结束时间不能为空", trigger: "blur" }
          ],
          originPlace: [
            { required: true, message: "原件存放地址不能为空", trigger: "blur" }
          ],
          archiveFileId: [
            { required: true, message: "附件不能为空", trigger: "blur" }
          ],
          contractSignDate: [
            { required: true, message: "合同签署时间不能为空", trigger: "blur" }
          ],
        }
      };
    },
    created() {
       this.form.contractId = this.contractId
    },
    watch:{
      contractId(val){
        this.reset()
        this.form.contractId = val
      }
    } ,
    methods: {
      UploadUrl(){
        //归档160
        return process.env.VUE_APP_BASE_API + "/info/file/upload?type=160";//+this.type
      },
      // 文件上传中处理
      handleFileUploadProgress(event, file, fileList) {
        this.upload.isUploading = true;
      },
      // 文件上传成功处理
      handleFileSuccess(response, file, fileList) {
        this.upload.isUploading = false;
        if(response.code=='200'){
          this.form.archiveFileId = response.msg
          this.form.fileId = response.msg
          this.form.fileName = file.name
        }else{
          this.msgSuccess(response.msg);
        }
      },
      //点击文件列表中已上传的文件时的钩子函数
      handleFilePreview(file){
        this.$nextTick(() => {
          this.$refs.filePreview.preview(file)
        })
      },
      // 取消按钮
      cancleDialog() {
        this.reset();
        this.$emit("cancel",'');
      },
      // 表单重置
      reset() {
        this.form = {
          id: null,
          archiveFileId: null,
          fileId: null,
          fileName: null,
          originPlace: null,
          archiveEndTime: null,
          archiveBeginTime: null,
        };
        this.notificationRadio1=''
        this.notificationRadio2=''
        this.upload.fileList = []
        this.resetForm("form");
      },
      /** 提交按钮 */
      submitForm() {
         this.form.isRemind = this.message?this.notificationRadio1&&this.notificationRadio2?3:this.notificationRadio1?1:2:0
          // isRemind : 0 >> 没有 ;  isRemind : 1 >>邮箱 ; isRemind : 2 >>系统通知 ; isRemind : 3 >>  邮箱 + 系统通知 ;
          this.$refs["form"].validate(valid => {
            if (valid) {
              this.form.fileType = 160
               this.$emit("submitForm",this.form);
            }
          });
      },
    }
  };
</script>
<style  >
.dialog-footer{
    padding: 10px 0 20px;
    text-align: right;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}
</style>
