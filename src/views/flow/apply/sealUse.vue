<template>
  <div class="app-container">
    <h3 style="text-align: center">{{$t('sealinfo.childSeal')}}</h3>

    <el-form ref="form" :model="form" :rules="rules" label-width="0px" style="width: 70%;margin:0 auto">

      <el-form-item>
        <el-steps align-center :space="200" finish-status="success">
          <el-step :description="$t('contract.applyForUserId')"></el-step>
          <el-step :description="$t('contract.generalManagerOfSubsidiary')"></el-step>
          <el-step :description="$t('common.headOfRelevantDepartments')"></el-step>
          <el-step :description="$t('contract.viceGeneralManager')"></el-step>
          <el-step :description="'SMTS'+$t('contract.legalOfficer')"></el-step>
          <el-step :description="$t('contract.verificationByGeneralManagerOfSubsidiary')"></el-step>
        </el-steps>
      </el-form-item>
    </el-form>
      <el-form ref="form" :model="form" :rules="rules" :label-width="$i18n.locale=='en'?'180px':'130px'" style="width: 70%;margin:0 auto">
        <el-form-item :label="$t('sealUse.sealId')" prop="sealId">
         <el-select v-model="form.sealId" @change="selectSeal" style="width: 100%"
           :placeholder="$t('common.placeSelect')+' '+$t('sealUse.sealId')" clearable size="small">
            <el-option
              v-for="seal in sealOptions"
              :key="seal.supplyId"
              :label="seal.sealName"
              :value="seal.supplyId"
            />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('sealinfo.userId')">
          <el-input disabled v-model="form.custodian" />
        </el-form-item>
        <el-form-item :label="$t('sealUse.userName')" prop="userName">
           <el-input v-model="form.userName" :placeholder="$t('common.placeholder')+' '+$t('sealUse.userName')" />
        </el-form-item>
        <el-form-item :label="$t('sealUse.useDate')" prop="useDate">
          <el-date-picker clearable size="small" style="width: 200px"
                          v-model="form.useDate"
                          type="date"
                          value-format="yyyy-MM-dd HH:mm:ss"
                          :placeholder="$t('common.choose')+$t('sealUse.useDate')">
          </el-date-picker>
        </el-form-item>
        <el-form-item :label="$t('contractTemplate.relevantdept')" prop="relatedDept">
          <el-select class="selectWidth" v-model="form.relatedDept" multiple="" :placeholder="$t('common.placeSelect')+' '+$t('contractTemplate.relevantdept')">
            <el-option
                v-for="dept in deptDictOptions"
                :key="dept.dictCode"
                :label="dept.remark"
                :value="dept.dictCode"
              />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('sealUse.files')" prop="files">
          <el-input v-model="form.files" :placeholder="$t('common.placeholder')+' '+$t('sealUse.files')" />
        </el-form-item>
      <el-form-item :label="$t('sealUse.uploadFiles')" prop="uploadFiles">
          <el-upload
                ref="upload"
                :limit="1"
                accept=".docx, doc,.pdf"
                :action="upload.url"
                :headers="upload.headers"
                auto-upload
                :before-upload="handleFileUploadProgress"
                :on-preview="handleFilePreview"
                :on-success="handleFileSuccess"
                :file-list="upload.fileList">
                <el-button slot="trigger" size="small" type="primary">{{$t('common.selectFile')}}</el-button>
                <div slot="tip" class="el-upload__tip">{{$t('common.filePdfRemark')}}</div>
              </el-upload>
      </el-form-item>
        <el-form-item :label="$t('sealUse.filesNum')" prop="filesNum">
          <el-input v-model="form.filesNum" :placeholder="$t('common.placeholder')+' '+$t('sealUse.filesNum')" />
        </el-form-item>
        <el-form-item :label="$t('sealUse.createDate')" prop="createDate" v-if="false">
          <el-date-picker clearable size="small" style="width: 200px"
                          v-model="form.createDate"
                          type="date"
                          value-format="yyyy-MM-dd"
                          :placeholder="$t('common.choose')+$t('sealUse.createDate')">
          </el-date-picker>
        </el-form-item>
        <el-form-item :label="$t('sealUse.remark')" prop="remark">
         <el-input type="textarea" v-model="form.remark" :placeholder="$t('common.placeholder')+' '+$t('sealUse.remark')" />
        </el-form-item>
      </el-form>
      <div style="text-align: center">
        <el-button type="primary" @click="submitForm" v-prevent-repeat-click>{{$t('common.submit')}}</el-button>
<!--        <el-button type="success" v-if="!viewForm" @click="submitStorageForm" v-prevent-repeat-click>{{$t('common.temporaryStorage')}}</el-button>-->
        <el-button @click="cancel" v-if="!viewForm">{{$t('common.cancle')}}</el-button>
        <el-button @click="cancelUpdate" v-else>{{$t('common.cancle')}}</el-button>
      </div>
    <FilePreview ref="filePreview"></FilePreview>
  </div>
</template>

<script>
  import { addSealUse,getSealcombo,postCheckStorage,storageSealUse } from "@/api/flow/sealUse";
  import {  loaddictdept} from "@/api/info/contractTemplate";
  import { getToken } from "@/utils/auth";
  import FilePreview from "../../../components/FilePreview/index";

  export default {
    name: "Sealinfo",
    components: {
      FilePreview
    },
    props:{
      viewForm:Object
    },
    data() {
      return {
        showViewer: false,
        preUrl:'',
        // 上传参数
        upload: {
          // 是否禁用上传
          isUploading: false,
          // 设置上传的请求头部
          headers: { Authorization: "Bearer " + getToken() },
          // 上传的地址
          url: process.env.VUE_APP_BASE_API + "/info/file/upload?type=220",
          // 上传的文件列表
          fileList: []
        },
        // 遮罩层
        loading: true,
        // 选中数组
        ids: [],
        // 非单个禁用
        single: true,
        // 非多个禁用
        multiple: true,
        // 显示搜索条件
        showSearch: true,
        // 总条数
        total: 0,
        // 印章查询表格数据
        SealinfoList: [],
        // 弹出层标题
        title: "",
        // 是否显示弹出层
        open: false,
        // 1 启用 2作废字典
        statusOptions: [],
        // 查询参数
        queryParams: {
          pageNum: 1,
          pageSize: 10,
          name: null,
          startTime: null,
          keeperUser: null,
          status: null
        },
        // 表单参数
        form: {},
        // 表单校验
        rules: {
          sealId: [
            { required: true, message: "印章名称不能为空", trigger: "blur" }
          ],
          userName: [
            { required: true, message: "使用人不能为空", trigger: "blur" }
          ],
          useDate: [
            { required: true, message: "计划用印日期不能为空", trigger: "blur" }
          ],
          relatedDept: [
            { required: true, message: "相关部门不能为空", trigger: "blur" }
          ],
        },
        sealOptions:[],
        deptDictOptions:[],
      };
    },
    created() {
      this.sealcombo()
      if(this.viewForm){
        console.log(this.viewForm)
        this.form = this.viewForm
        this.upload.fileList = []
        if(this.viewForm.file){
          this.upload.fileList = this.upload.fileList.concat(this.viewForm.file)
        }
        this.upload.fileList.forEach(item=>{
          item.name = item.fileName
          item.url = item.filePath
        })
      }
    },
    methods: {
      selectSeal(supplyId){
        console.log(supplyId)
        if(supplyId === undefined){
          return;
        }
        let sealItem = this.sealOptions.find((item)=>{
          return item.supplyId === supplyId;
        });
        if(sealItem){
          this.form.sealName = sealItem.sealName;
          this.form.custodian = sealItem.custodian;
        }else {
          this.form.sealName = "";
          this.form.custodian = "";
        }
      },
      sealcombo(){
        getSealcombo().then(response => {
          if(response.code=='200'){
            this.sealOptions = response.data
            if(this.viewForm){
              this.selectSeal(this.viewForm.sealId)
            }
          }
        });
        loaddictdept().then(response => {
            if (response.code === 200) {
              this.deptDictOptions = response.data
            }
        });
      },
      // 文件提交处理
      submitUpload() {
        this.$refs.upload.submit();
      },
      // 文件上传中处理
      handleFileUploadProgress(event, file, fileList) {
        this.upload.isUploading = true;
      },
      //文件预览
      handleFilePreview(file){
        this.$nextTick(() => {
          this.$refs.filePreview.preview(file)
        })
      },
      // 文件上传成功处理
      handleFileSuccess(response, file, fileList) {
        this.upload.isUploading = false;
        if(response.code=='200'){
          this.form.attachmentId = response.msg
        }else{
          this.msgSuccess(response.msg);
        }
      },
      // 取消按钮
      cancel() {
        this.$store.state.tagsView.visitedViews.splice(this.$store.state.tagsView.visitedViews.findIndex(item => item.path === this.$route.path), 1)
        this.$router.push("/seal/sealUse")
        this.reset();
      },
      cancelUpdate(){
        this.$emit('update', true)
      },
      // 表单重置
      reset() {
        this.form = {
          id: null,
          sealId: null,
          user: null,
          userId: null,
          useDate: null,
          files: null,
          filesNum: null,
          remark: null,
          createBy: null,
          createDate: null
        };
        this.resetForm("form");
      },
      /** 提交按钮 */
      submitForm() {
        this.form.useType = 1
        this.$refs["form"].validate(valid => {
          if (valid) {
            this.form.relatedDept = this.form.relatedDept.join(',')
            addSealUse(this.form).then(response => {
              if (response.code === 200) {
                if(this.viewForm){
                  this.$emit('update', true)
                }else {
                  this.msgSuccess(this.$t('common.successAdd'));
                  this.$store.state.tagsView.visitedViews.splice(this.$store.state.tagsView.visitedViews.findIndex(item => item.path === this.$route.path), 1)
                  this.$router.push("/seal/sealUse")
                }
              }
            });
          }
        });
      }
    }
  };
</script>


<style>

  .header{text-align: center;
  }
  .text {
    font-size: 14px;
  }
  .selectWidth{width: 100%!important;}
  .item {
    margin-bottom: 18px;
    padding-bottom: 8px;
    text-align: center;
    border-bottom: 1px solid #f3f3f3;
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
  .el-step__title{font-size: 13px}
</style>
