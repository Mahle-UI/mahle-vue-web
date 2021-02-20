<template>
  <div >
    <el-form ref="form" :model="form" :rules="rules"  :label-width="$i18n.locale=='en'?'120px':'100px'"
    :style="history?'':'width: 50%;margin:0 auto'">

      <el-form-item v-if="!history">
        <el-steps align-center :space="200" finish-status="success">
          <el-step :title="$t('common.seniorLegal')"></el-step>
          <el-step :title="$t('common.generalOfficeMinister')"></el-step>
          <el-step :title="$t('common.headOfRelevantDepartments')"></el-step>
        </el-steps>
      </el-form-item>
      <el-form-item   :label="$t('contractTemplate.templateName')" prop="templateName">
        <el-input :disabled="templId?true:false"  v-model="form.templateName" :placeholder="$t('common.placeSelect')+' '+$t('contractTemplate.templateName')" />
      </el-form-item>
      <el-form-item :label="$t('contractTemplate.usedept')" prop="usageDepts">
        <el-select class="selectWidth" v-model="form.usageDepts" :placeholder="$t('common.placeSelect')+' '+$t('contractTemplate.usedept')">
           <el-option
              v-for="dept in deptOptions"
              :key="dept.deptId"
              :label="dept.deptName+' '+dept.deptNameEn"
              :value="dept.deptId"
            />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('contractTemplate.relevantdept')" prop="concernDept">
        <el-select class="selectWidth" v-model="form.concernDept" multiple="" @change="concernDept"  :placeholder="$t('common.placeSelect')+' '+$t('contractTemplate.relevantdept')">
           <el-option
              v-for="dept in deptDictOptions"
              :key="dept.dictCode"
              :label="$i18n.locale=='en'?dept.dictLabelEn:dept.remark"
              :value="dept.dictCode"
            />
        </el-select>
      </el-form-item>
      <el-form-item  :label="$t('contract.cateId')" prop="cateDict">
        <el-select class="selectWidth" v-model="form.cateDict" :placeholder="$t('common.placeSelect')+' '+$t('contract.cateId')">
           <el-option
              v-for="contractcate in contractcateOptions"
              :key="contractcate.code"
              :label="contractcate.cn+' '+contractcate.en"
              :value="contractcate.code"
            />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('sealinfo.beginTime')" prop="beginTime"  >
        <el-date-picker clearable size="small"
                v-model="form.beginTime"
                style="width:100%"
                type="date"
                value-format="yyyy-MM-dd"
                :placeholder="$t('common.placeSelect')+$t('sealinfo.beginTime')">
        </el-date-picker>
      </el-form-item>
      <el-form-item v-if="templId" :label="$t('common.history')+$t('contractTemplate.update')" prop="oldPoint">
        <el-input v-model="form.oldPoint" type="textarea" :autosize="{ minRows: 2, maxRows: 10}" disabled :placeholder="$t('common.inputContent')" />
      </el-form-item>
      <el-form-item v-if="templId" :label="$t('contractTemplate.update')" prop="updPoint">
        <el-input v-model="form.updPoint" type="textarea" :autosize="{ minRows: 2, maxRows: 10}" :placeholder="$t('common.inputContent')" />
      </el-form-item>
      <el-form-item v-if="!history"  :label="$t('contractTemplate.reason')" prop="reason">
        <el-input v-model="form.reason" type="textarea" :placeholder="$t('common.inputContent')" />
      </el-form-item>
      <el-form-item :label="$t('contractTemplate.remark')" prop="remark">
        <el-input v-model="form.remark" type="textarea" :placeholder="$t('common.inputContent')" />
      </el-form-item>
      <el-form-item v-if="history" :label="$t('contractTemplate.templDict')">
          <el-radio-group v-model="form.templDict">
            <el-radio  value="3" :label="3" >{{$t('common.start')}}</el-radio>
            <el-radio  value="2" :label="2" >{{$t('common.disable')}}</el-radio>
          </el-radio-group>
        </el-form-item>
      <el-form-item :label="$t('contractTemplate.attachment')" prop="fmsInfoId">
        <el-upload
           ref="upload"
                  :limit="1"
                   accept=".docx,.doc"
                  :action="upload.url"
                  :headers="upload.headers"
                  auto-upload
                  :on-preview="handleFilePreview"
                  :before-upload="handleFileUploadProgress"
                  :on-success="handleFileSuccess"
                  :file-list="upload.fileList" >
          <el-button slot="trigger" size="small" type="primary">{{$t('common.selectFile')}}</el-button>
          <div slot="tip" class="el-upload__tip">{{$t('common.selectFile')}} docx,doc</div>
        </el-upload>
      </el-form-item>
    </el-form>
    <div style="text-align: center">
      <el-button type="primary"  @click="submitForm" v-prevent-repeat-click>{{form.templDict=='4'?$t('common.updatecomplete'):$t('common.submit')}}</el-button>
      <el-button type="success" v-if="!history&&!templId" @click="temporaryStorageForm" v-prevent-repeat-click>{{$t('common.temporaryStorage')}}</el-button>
      <el-button @click="cancel" v-if="type!='3'">{{$t('common.cancle')}}</el-button>
    </div>
    <FilePreview ref="filePreview"/>
  </div>
</template>

<script>
  import {  updTemplate,vaildtemplname,searchtmptempl,loaddictdept,loaddept,loadcontractcate,addContractTemplate,loadtempl,contemplView } from "@/api/info/contractTemplate";
  import { getToken } from "@/utils/auth";
  import FilePreview from "../../../components/FilePreview/index";
  export default {
    name: "ContractTemplate",
    components: {FilePreview},
    props: {
      history: {
        type:Boolean,
        default: false
      } ,
      templId:'',
      type:''
    },
    data() {
      const vaildObjNames = (rule, value, callback) => {
      if (!this.form.templateName) {
        callback(new Error("请输入模板名称"));
      } else {
        this.vaildObjName(callback)
      }
    };
      return {
        types:false,
        types2:true,
        // 上传参数
        upload: {
          // 是否禁用上传
          isUploading: false,
          // 设置上传的请求头部
          headers: { Authorization: "Bearer " + getToken() },
          // 上传的地址
          url: process.env.VUE_APP_BASE_API + "/info/file/upload?type=210",
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
        // 合同模板表格数据
        contractTemplateList: [],
        // 弹出层标题
        title: "",
        // 是否显示弹出层
        open: false,
        // 合同分类字典
        cateIdOptions: [
          {
            dictValue:"1",
            dictLabel:"服务合同"
          },
          {
            dictValue:"2",
            dictLabel:"采购合同"
          }
        ],
        // 合同类型字典
        typeOptions: [],
        // 状态字典
        statusOptions: [],
        // 查询参数
        queryParams: {
          pageNum: 1,
          pageSize: 10,
          no: null,
          cateId: null,
          type: null,
          status: null,
        },
        // 表单参数
        form: {},
        // 表单校验
        rules: {
          cateDict:[
            { required: true, message: "合同分类不能为空", trigger: "blur" }
          ],
          templateName: [
            { required: true, message: "模板名称不能为空",validator: vaildObjNames }
          ],
          usageDepts: [
            { required: true, message: "请选择负责部门", trigger: "blur" }
          ],
          concernDept: [
            { required: true, message: "请选择相关部门", trigger: "blur" }
          ],
          fmsInfoId: [
            { required: true, message: "附件不能为空", trigger: "blur" }
          ],
          reason:[
            { required: true, message: "申请理由不能为空", trigger: "blur" }
          ],
          updPoint:[
            { required: true, message: "修改点不能为空", trigger: "blur" }
          ],
          // beginTime:[
          //   { required: true, message: "启用时间不能为空", trigger: "blur" }
          // ],
        },
        deptOptions:[],
        deptDictOptions:[],
        contractcateOptions:[]
      };
    },
    methods: {
      /** 验证 */
    vaildObjName(callback) {
      if(this.form.templateName){
          vaildtemplname({templName:this.form.templateName,templId:this.form.templateId}).then(response => {
            if(response.code=='200'){
              callback()
            }else{
              callback(new Error("模板名称已存在"))
            }
          });
      }else{
        callback()
      }
    },
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
        if(response.code=='200'){
          this.form.fmsInfoId = response.msg
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
      cancel() {
        this.reset();
        this.$emit("cancel",'');
      },
      // 表单重置
      reset() {
        this.form = {
          id: null,
          templateName: null,
          cateId: null,
          reason: null,
          remark: null,
          attachment: null,
          fmsInfoId: null,
          templDict : 3
        };
        this.upload.fileList = []
        this.resetForm("form");
      },
      /** 提交按钮 */
      submitForm() {
        this.submit()
      },
      temporaryStorageForm() {
        this.form.templDict = 0
        this.submit()
      },
      submit(){
        //1 ===>  新的印章    ///0===>历史印章
        if(this.history==true){
          this.form.category = 0
        }else {
          this.form.category = 1
        }
        this.$refs["form"].validate(valid => {
          if (valid) {
              if (!this.history) {
                this.form.templDict = 1
              }
              this.form.beginTime = this.form.beginTime&&this.form.beginTime.length>10?this.form.beginTime.substring(0,10):this.form.beginTime
              var data = this.form
              data.contractCate = this.form.cateDict
              data.usageDept = this.form.usageDepts.split(',')
              data.fileId = this.form.fmsInfoId
              if(this.type==3){
                data.templDict = 4
                updTemplate(data).then(response => {
                  if (response.code === 200) {
                    this.msgSuccess(this.templId?this.$t('common.successEdit'):this.$t('common.successAdd'));
                    if(data.templDict==4){
                        this.$emit('update', "")
                    }
                  }
                });
              }else{
                if(this.templId){
                    data.parentId = this.form.templId
                    data.templateId = ''
                    data.templId = ''
                }
                addContractTemplate(data).then(response => {
                  if (response.code === 200) {
                    this.msgSuccess(this.templId?this.$t('common.successEdit'):this.$t('common.successAdd'));
                    this.cancel();
                  }
                });
              }
          }
        });
      },
      getItem(){
        this.getDicts("contract_type").then(response => {
          this.typeOptions = response.data;
        });
        this.getDicts("common_status").then(response => {
          this.statusOptions = response.data;
        });
        this.form = {}
        this.upload.fileList = []
        if(this.templId){
          if(this.type==1){
            loadtempl({templId:this.templId}).then(response => {
              if(response.code=='200'){
                var data = response.data
                this.upload.fileList = []
                if(data){
                  data.templateName = data.templName
                  data.templateId = data.templId
                  //data.updPoint1 = data.updPoint
                  //data.updPoint = ''
                  this.form = data;
                }
              }
            });
          }else{
            contemplView({templId:this.templId}).then(response => {
              var data = response.data.detail;
              if(data){
                if(data.list&&data.list.length>0){
                  this.upload.fileList = data.list;
                  this.upload.fileList.forEach(item=>{
                    item.name = item.fileName
                    item.url = item.filePath
                  })
                  data.fmsInfoId = data.list[0].fmsInfoId?data.list[0].fmsInfoId:''
                }
                data.usageDepts = ''
                if(data.usageDeptList&&data.usageDeptList.length>0){
                  data.usageDepts = data.usageDeptList[0].deptId?data.usageDeptList[0].deptId:''
                }
                data.concernDept = []
                if(data.concernDeptList&&data.concernDeptList.length>0){
                  data.concernDeptList.forEach(item=>{
                    data.concernDept.push(Number(item.dictId))
                  })
                }
                //data.updPoint1 = data.updPoint
                //data.updPoint = ''
                this.form = data;
              }
            });
          }
        }else{
          searchtmptempl().then(response => {
            if(response.code=='200'){
              var data = response.data
              if(data){
                if(data.list&&data.list.length>0){
                  this.upload.fileList = data.list;
                  this.upload.fileList.forEach(item=>{
                    item.name = item.fileName
                    item.url = item.filePath
                  })
                  let date=new Date(data.beginTime);
                  let day=date.getDate()<10 ? "0"+date.getDate():date.getDate();
                  let month=(date.getMonth()+1)<10 ? "0"+(date.getMonth()+1) :(date.getMonth()+1)
                  data.beginTime=date.getFullYear()+"-"+month+"-"+day;
                  data.fmsInfoId = data.list[0].fmsInfoId?data.list[0].fmsInfoId:''
                }
                data.usageDepts = ''
                if(data.usageDeptList&&data.usageDeptList.length>0){
                  data.usageDepts = data.usageDeptList[0].deptId?data.usageDeptList[0].deptId:''
                }
                data.concernDept = []
                if(data.concernDeptList&&data.concernDeptList.length>0){
                  data.concernDeptList.forEach(item=>{
                    data.concernDept.push(Number(item.dictId))
                  })
                }
                //data.oldPoint = data.updPoint
                //data.updPoint = ''
                this.form = data;
              }
            }
          });
        }

        this.dict()
      },
      dict(){
        loaddept().then(response => {
            if (response.code === 200) {
              this.deptOptions = response.data
            }
        });
        loaddictdept().then(response => {
            if (response.code === 200) {
              this.deptDictOptions = response.data
            }
        });
        loadcontractcate().then(response => {
            if (response.code === 200) {
              this.contractcateOptions = response.data
            }
        });
      },
      concernDept(){
        if(this.form.concernDept.length>1&&this.form.concernDept.indexOf(134)>-1){
          this.msgError("选择了无，就不能选择其他部门了");
          this.form.concernDept = [134]
          return
        }

      }
    },
    created(){
      if(!this.history){
        if(!this.templId||this.type=='3'){
          this.getItem()
        }
      }else{
        this.form = {templDict : 3}
        this.dict()
      }
    } ,
    watch:{
      templId(val){
        if(val){
          this.getItem()
        }
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
