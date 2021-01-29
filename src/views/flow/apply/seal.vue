<template>
  <div class="app-container">
    <h3 style="text-align: center">{{!history?$t('sealinfo.functionName'):$t('sealinfo.sealUpload')}}</h3>

    <el-form ref="form" :model="form"  @submit.native.prevent  :rules="rules" :label-width="$i18n.locale=='en'?'12%':'14%'" style="width: 50%;margin:0 auto">
      <el-form-item v-if="!history">
        <el-steps align-center :space="200" finish-status="success">
          <el-step :title="$t('sealinfo.applicant')"></el-step>
          <el-step :title="$t('sealinfo.headOfApplicationDepartment')"></el-step>
          <el-step :title="$t('sealinfo.generalOfficeMinister')"></el-step>
        </el-steps>
      </el-form-item>
    </el-form>
    <el-form ref="form" :model="form"  @submit.native.prevent  :rules="rules" :label-width="$i18n.locale=='en'?'240px':'150px'" style="width: 50%;margin:0 auto">
        <el-form-item :label="$t('sealinfo.sealName')" prop="sealName">
          <el-input v-model="form.sealName" :placeholder="$t('common.placeholder')+' '+$t('sealinfo.sealName')" />
        </el-form-item>
        <el-form-item :label="$t('sealinfo.beginTime')" prop="beginTime">
          <el-date-picker clearable size="small" style="width: 100%"
            v-model="form.beginTime"
            :picker-options="startDatePicker"
            type="date"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            :placeholder="$t('common.choose')+$t('sealinfo.beginTime')">
          </el-date-picker>
        </el-form-item>
      <el-form-item :label="$t('sealinfo.isBrow')"  prop="isBrow">
        <el-select v-model="form.isBrow" style="width: 100%" :placeholder="$t('common.placeSelect')+' '+$t('sealinfo.isBrow')" clearable size="small">
          <el-option
            v-for="dict in browOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('sealinfo.isRegister')"  prop="isRegister">
        <el-select v-model="form.isRegister" style="width: 100%" :placeholder="$t('common.placeSelect')+' '+$t('sealinfo.isRegister')" clearable size="small">
          <el-option
            v-for="dict in registerOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
        <el-form-item :label="$t('sealinfo.userId')" prop="userId">
          <el-select v-model="form.userId" style="width: 100%"
          :placeholder="$t('common.placeSelect')+' '+$t('sealinfo.userId')" filterable
          ref="searchSelect" :filter-method="searchUser" @change="selectUser" clearable size="small">
            <el-option
              v-for="user in userOptions"
              :key="user.userId"
              :label="user.nickName+' '+user.userNameEn+' '+user.userName"
              :value="user.userId"
            />
        </el-select>
        </el-form-item>
        <el-form-item :label="$t('sealinfo.reserveUserId')" prop="reserveUserId">
          <el-select v-model="form.reserveUserId" style="width: 100%"
          :placeholder="$t('common.placeSelect')+' '+$t('sealinfo.reserveUserId')" filterable
          ref="searchSelect" :filter-method="searchUser"   clearable size="small">
            <el-option
              v-for="user in reserveUserOptions"
              :key="user.userId"
              :label="user.nickName+' '+user.userNameEn+' '+user.userName"
              :value="user.userId"
            />
        </el-select>
        </el-form-item>
        <el-form-item :label="$t('sealinfo.deptId')" prop="deptId">
          <!-- <el-input v-model="form.deptName" disabled=""/> -->
          <el-select v-model="form.deptId" style="width: 100%"
          :placeholder="$t('common.placeSelect')+' '+$t('sealinfo.deptId')" filterable
            clearable size="small">
            <el-option
              v-for="dept in deptOptions"
              :key="dept.deptId"
              :label="dept.deptName+' '+dept.deptNameEn"
              :value="dept.deptId"
            />
        </el-select>
        </el-form-item>
        <el-form-item :label="$t('sealinfo.sealUrl')" prop="fmsInfoId">
          <el-upload
                  ref="upload"
                  :limit="1"
                   accept=".jpg, .png, .bmp, .jpeg,.gif"
                  :action="upload.url"
                  :headers="upload.headers"
                  auto-upload
                  :before-upload="handleFileUploadProgress"
                  :on-success="handleFileSuccess"
                  :on-preview="handleFilePreview"
                  :on-exceed="handleFileExceed"
                  :file-list="upload.fileList"
                   list-type="picture"
                   class="upload-demo"
                >
                  <el-button slot="trigger" size="small" type="primary">{{$t('common.selectFile')}}</el-button>
                  <div slot="tip" class="el-upload__tip">{{$t('common.fileRemark')}}</div>
                </el-upload>
        </el-form-item>
        <el-form-item :label="$t('sealinfo.remark')" prop="remark">
          <el-input
            type="textarea"
            v-model="form.remark"
            :placeholder="$t('common.placeholder')+' '+$t('sealinfo.remarkPlaceholder')"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
    </el-form>
    <div style="text-align: center">
      <el-button type="primary" @click="submitForm" v-prevent-repeat-click>{{sealForm.sealDict=='7'?$t('common.updatecomplete'):$t('common.submit')}}</el-button>
<!--      <el-button type="success" @click="temporaryStorageForm" v-if="Object.keys(sealForm).length === 0" v-prevent-repeat-click>{{$t('common.temporaryStorage')}}</el-button>-->
      <el-button @click="cancelUpdate" v-if="sealForm.sealDict=='7'">{{$t('common.cancle')}}</el-button>
      <el-button @click="cancel" v-if="Object.keys(sealForm).length === 0">{{$t('common.cancle')}}</el-button>
    </div>
    <FilePreview ref="filePreview"></FilePreview>
  </div>
</template>

<script>
  import {  getSealinfo, addSealinfo, updateSealinfo,searchtmpseal,searchkeeper,rtncrrtime,ownership } from "@/api/info/sealinfo";
  import { getToken } from "@/utils/auth";
  import FilePreview from "../../../components/FilePreview/index";
  export default {
    name: "Sealinfo",
    components: {FilePreview},
    props:{
      sealForm:{
        type:Object,
        default:()=>{
          return {}
        }
      }
    },
    data() {
      const vaillinkmobile = (rule, value, callback) => {
        if (!this.form.beginTime) {
          callback(new Error("启用时间不能为空"));
        } else {
           if(new Date(this.form.beginTime).getTime()<
           new Date(this.startDate).getTime()){
              callback(new Error("启用时间不能小于今天"));
           }else{
             callback()
           }
        }
      };
      return {
        showViewer: false,
        preUrl:'',
        history:false,
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
        // 印章查询表格数据
        SealinfoList: [],
        // 弹出层标题
        title: "",
        // 1 启用 2作废字典
        statusOptions: [],
        browOptions: [],
        registerOptions: [],
        deptOptions:[],
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
          sealName: [
            { required: true, message: "印章名称不能为空", trigger: "blur" }
          ],
          beginTime: [
            { required: true,validator: vaillinkmobile,trigger: "blur" }
          ],
          isBrow: [
            { required: true, message: "可外借必填", trigger: "blur" }
          ],
          isRegister: [
            { required: true, message: "在CMS用印登记必填", trigger: "blur" }
          ],
          userId: [
            { required: true, message: "印章保管人不能为空", trigger: "blur" }
          ],
          fmsInfoId: [
            { required: true, message: "请上传印章图片", trigger: "blur" }
          ]
        },
        userOptions:[],
        reserveUserOptions:[],
        startDate:'',
        startDatePicker: this.beginDate()
      };
    },
    created() {
      this.getDicts("common_status").then(response => {
        this.statusOptions = response.data;
      });
      this.getDicts("seal_brow").then(response => {
        this.browOptions = response.data;
      });
      this.getDicts("seal_register").then(response => {
        this.registerOptions = response.data;
      });

      if(this.sealForm){
        this.form = this.sealForm
        this.getItem()
      }

    },
    methods: {
      // 文件提交处理
      submitUpload() {
        this.$refs.upload.submit();
      },
      // 文件上传中处理
      handleFileUploadProgress(file) {
        let type = file.type;
        let imgRegx = new RegExp('image\\/.+')
        if(!imgRegx.test(type)){
          this.msgError("只能上传图片类型的文件！")
          return false;
        }
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
        //console.log(file)
        this.$nextTick(() => {
          this.$refs.filePreview.preview(file)
        })
      },
      //文件超出个数限制时的钩子函数
      handleFileExceed(){
        this.msgError("上传文件超出数量限制");
      },
      // 1 启用 2作废字典翻译
      statusFormat(row, column) {
        return this.selectDictLabel(this.statusOptions, row.status);
      },
      // 取消按钮
      cancel() {
        this.$store.state.tagsView.visitedViews.splice(this.$store.state.tagsView.visitedViews.findIndex(item => item.path === this.$route.path), 1)
        this.$router.push("/seal/sealinfo")
        this.reset();
      },
      //取消修改
      cancelUpdate(){
          this.$emit('update', false)
      },
      // 表单重置
      reset() {
        this.form = {
          id: null,
          name: null,
          startTime: null,
          keeperUser: null,
          remark: null,
          status: null
        };
        this.resetForm("form");
      },
      /** 搜索按钮操作 */
      handleQuery() {
        this.queryParams.pageNum = 1;
      },
      /** 重置按钮操作 */
      resetQuery() {
        this.resetForm("queryForm");
        this.handleQuery();
      },
      // 多选框选中数据
      handleSelectionChange(selection) {
        this.ids = selection.map(item => item.id)
        this.single = selection.length !== 1
        this.multiple = !selection.length
      },
      /** 新增按钮操作 */
      handleAdd() {
        this.upload.fileList = [];
        this.reset();
      },
      /** 修改按钮操作 */
      handleUpdate(row) {
        this.reset();
        const id = row.id || this.ids
        getSealinfo(id).then(response => {
          this.form = response.data;
          this.form.isBrow = this.form.isBrow+''
          this.upload.fileList = this.form.list;

        });
      },
      /** 提交按钮 */
      submitForm() {
        if (this.sealForm.sealDict != 7){
          this.form.sealDict = 1
        }
        this.submit()
      },
      submit(){
        //1 ===>  新的印章    ///0===>历史印章
        if(this.history==true){
          this.form.category = 0
          if (!this.form.supplyId) {
            this.form.sealDict = 1
          }
        }else {
          this.form.category = 1
        }
        this.$refs["form"].validate(valid => {
          if (valid) {
            if (this.form.supplyId != null) {
              updateSealinfo(this.form).then(response => {
                if (response.code === 200) {
                  this.msgSuccess(this.$t('common.successEdit'));
                  if(!this.sealForm){
                    this.$store.state.tagsView.visitedViews.splice(this.$store.state.tagsView.visitedViews.findIndex(item => item.path === this.$route.path), 1)
                    this.$router.push("/seal/sealinfo")
                  }
                  if(this.sealForm.sealDict==7){
                    this.$emit('update', true)
                  }
                }
              });
            } else {
              addSealinfo(this.form).then(response => {
                if (response.code === 200) {
                  this.msgSuccess(this.$t('common.successAdd'));
                  this.$store.state.tagsView.visitedViews.splice(this.$store.state.tagsView.visitedViews.findIndex(item => item.path === this.$route.path), 1)
                  this.$router.push("/seal/sealinfo")
                }
              });
            }
          }
        });
      },
      searchUser(val){
        this.userOptions = []
        searchkeeper({uName :val}).then(response => {
            if (response.code === 200) {
              this.userOptions = response.data
              this.reserveUserOptions =  response.data
            }
        });
      },
      selectUser(){
        // this.form.deptName = ''
        // this.form.deptId = ''
        // if(this.userOptions){
        //   this.userOptions.forEach(item=>{
        //       if(item.userId == this.form.userId){
        //         this.form.deptName = item.upDeptName+' '+item.upDeptNameEn
        //         this.form.deptId = item.upDeptId
        //       }
        //   })
        // }
      },
      getItem(){
        let type=this.$route.query.type;
        this.form = {}
        this.upload.fileList = []
        if(type=='history'){
          this.history=true;
        }else{
          this.history = false
        }
        ownership().then(response => {
          this.deptOptions = response.data
        })
        this.userOptions = []
        if(this.$route.query.id){
          getSealinfo({supplyId:this.$route.query.id}).then(response => {
            if(response.code=='200'){
              var data = response.data
              if(data.list&&data.list.length>0){
                  this.upload.fileList = data.list;
                  this.upload.fileList.forEach(item=>{
                    item.name = item.fileName
                    item.url = process.env.VUE_APP_BASE_DOWNLOAD_URL +  item.fmsInfoId
                  })
                  data.fmsInfoId = data.list[0].fmsInfoId?data.list[0].fmsInfoId:''
                }
                this.form = data;
                this.form.deptId = Number(this.form.deptId)
                this.form.deptName = data.deptName+' '+data.deptNameEn
                this.form.isBrow = this.form.isBrow+''
                this.form.isRegister = this.form.isRegister+''
                this.userOptions = [{
                  deptId: this.form.deptId,
                  upDeptName: this.form.deptName,
                  upDeptNameEn: this.form.deptNameEn,
                  nickName: this.form.userName,
                  userId: this.form.userId,
                  userName: this.form.userName,
                  userNameEn: this.form.userNameEn,
                }]
                if(this.form.reserveUserId){
                  this.reserveUserOptions=[{
                    nickName: this.form.reserveUserName,
                    userId: this.form.reserveUserId,
                    userName: this.form.reserveUserName,
                    userNameEn: this.form.reserveUserNameEn,
                  }]
                }
            }
          });
        }else{
          if(type!='history'){
            searchtmpseal().then(response => {
              if(response.code === 200 && response.data !== undefined){
                var data = response.data
                if(data.list&&data.list.length>0){
                  this.upload.fileList = data.list;
                  this.upload.fileList.forEach(item=>{
                    item.name = item.fileName
                    item.url = item.filePath
                  })
                  data.fmsInfoId = data.list[0].fmsInfoId?data.list[0].fmsInfoId:''
                }
                this.form = data;
                this.form.deptId = Number(this.form.deptId)
                this.form.deptName = data.deptName+' '+data.deptNameEn
                this.form.isBrow = this.form.isBrow+''
                this.form.isRegister = this.form.isRegister+''
                this.userOptions = [{
                  deptId: this.form.deptId,
                  upDeptName: this.form.deptName,
                  upDeptNameEn: this.form.deptNameEn,
                  nickName: this.form.userName,
                  userId: this.form.userId,
                  userName: this.form.userName,
                  userNameEn: this.form.userNameEn,
                }]
                if(this.form.reserveUserId){
                  this.reserveUserOptions=[{
                    nickName: this.form.reserveUserName,
                    userId: this.form.reserveUserId,
                    userName: this.form.reserveUserName,
                    userNameEn: this.form.reserveUserNameEn,
                  }]
                }
              }
            });
          }
        }
        rtncrrtime().then(response => {
          this.startDate = response.msg;
        });
      },
      beginDate(){
        const self = this
        return {
          disabledDate(time){
            if (self.startDate) {
              return new Date(self.startDate).getTime()-8.64e7 > time.getTime()
            } else {
              return time.getTime() < Date.now()-8.64e7
            }
          }
        }
      },
    },
    beforeRouteEnter(to,from,next){
        next((vm)=>{
          vm.getItem()
      })
    },
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
