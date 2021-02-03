<template>
  <div class="app-container">
    <el-form :model="queryParams"  @submit.native.prevent  ref="queryForm" @submit.native.prevent :inline="true" v-show="showSearch" :label-width="$i18n.locale=='en'?'120px':'68px'">
      <el-form-item :label="$t('customer.objName')" prop="objName">
        <el-input
          v-model="queryParams.objName"
          :placeholder="$t('common.placeholder')+$t('customer.objName')"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="cyan" icon="el-icon-search" size="mini" @click="handleQuery">{{$t('common.search')}}</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">{{$t('common.reset')}}</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['info:customer:add']"
        >{{$t('common.add')+$t('customer.functionName')}}</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['info:customer:remove']"
        >{{$t('common.delete')+$t('customer.functionName')}}</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['info:customer:export']"
        >{{$t('common.export')+$t('customer.functionName')}}</el-button>
      </el-col>
       <el-col :span="1.5">
          <!-- <el-popover
            placement="top"
            width="160"
            v-model="visible">
            <div >
              <el-button
                type="warning"
                icon="el-icon-download"
                size="mini"
                style="display: inline;margin-bottom:10px"
                @click="handleDownloadTemplate"
                v-hasPermi="['info:customer:export']"
              >{{$t('common.download')+$t('customer.functionName')+$t('common.template')}}</el-button>
              <el-upload
                  style="display: inline;"
                  :disabled="fileBtnLoading"
                  :action="uploadUrl"
                  :headers="myHeaders"
                  auto-upload
                  :before-upload="importStudentFile"
                  :on-success="successUpFile"
                  :show-file-list='false'
                >
                  <el-button
                      type="success"
                      icon="el-icon-upload"
                      size="mini"
                      v-hasPermi="['system:customer:export']"
                    >{{$t('common.import')+$t('customer.functionName')}}</el-button>
                </el-upload>
            </div>
            <el-button
                slot="reference"
                type="success"
                icon="el-icon-upload"
                size="mini"
                v-hasPermi="['system:customer:export']"
              >{{$t('common.import')+$t('customer.functionName')}}</el-button>
          </el-popover> -->
          <el-button
                type="success"
                icon="el-icon-upload"
                size="mini"
                @click="openDownload = true"
                v-hasPermi="['info:customer:import']"
              >{{$t('common.import')+$t('customer.functionName')}}</el-button>
      </el-col>
	  <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="customerList" @selection-change="handleSelectionChange" border>
      <el-table-column type="selection" width="55" align="center" :resizable="false"/>
      <el-table-column width="260" :label="$t('customer.objNameCn')" align="left" prop="objNameCn" :resizable="false">
        <!-- <template slot-scope="scope">
          <span v-html="name(scope.row)"></span>
        </template> -->
      </el-table-column>
      <el-table-column :label="$t('customer.country')" align="center" prop="country" :formatter="countryFormat":resizable="false" />
      <el-table-column :label="$t('customer.zone')" align="center" prop="zone" :resizable="false"/>
      <el-table-column :label="$t('customer.managerId')" align="center" prop="managerName" :resizable="false"/>
      <el-table-column :label="$t('customer.linkNames')" align="center" prop="linkManCn" :resizable="false"/>
      <el-table-column width="200" :label="$t('common.operation')" align="center" class-name="small-padding fixed-width" :resizable="false">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-user"
            @click="toLinkMan(scope.row)"
            v-hasPermi="['info:customer:edit']"
          >{{$t('customer.linkName')}}</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['info:customer:edit']"
          >{{$t('common.edit')}}</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['info:customer:remove']"
          >{{$t('common.delete')}}</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改相对方对话框 -->
    <el-dialog :title="title" :visible.sync="open" :close-on-click-modal="false" :width=" '1000px'" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" :label-width="$i18n.locale=='en'?'220px':'120px'">
          <el-row :gutter="24">
          <el-col :span="12">
        <el-form-item :label="$t('customer.objNameCn')" prop="objNameCn" >
          <!-- :required="isCN" -->
          <el-input v-model="form.objNameCn" :placeholder="$t('common.placeholder')+$t('customer.objNameCn')" />
        </el-form-item>
          </el-col>
          <el-col :span="12" v-if="false">
        <el-form-item :label="$t('customer.objNameEn')" prop="objNameEn" >
          <!-- :required="isEn" -->
          <el-input v-model="form.objNameEn" :placeholder="$t('common.placeholder')+$t('customer.objNameEn')" />
        </el-form-item>
        </el-col>
          </el-row>
          <el-row :gutter="24">
          <el-col :span="12">
        <el-form-item :label="$t('customer.objMobile')" prop="objMobile">
          <el-input v-model="form.objMobile" :placeholder="$t('common.placeholder')+$t('customer.objMobile')+'010-87654321'" />
        </el-form-item>
        </el-col>
          <el-col :span="12">
        <el-form-item :label="$t('customer.postcode')" prop="postcode">
          <el-input v-model="form.postcode" :placeholder="$t('common.placeholder')+$t('customer.postcode')" />
        </el-form-item>
        </el-col>
          </el-row>
          <el-row :gutter="24">
          <el-col :span="12">
        <el-form-item :label="$t('customer.country')" prop="country">
          <el-select v-model="form.country" :placeholder="$t('common.placeSelect')+$t('customer.country')">
            <el-option
              v-for="dict in countryOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
        </el-col>

          <el-col :span="12">
        <el-form-item :label="$t('customer.zone')" v-if="form.country=='中国'" prop="zone">
          <el-cascader
          v-model="form.city"
                  :options="provinceAndCityData"
                  clearable></el-cascader>
          <!-- <el-input v-model="form.zone" :placeholder="$t('common.placeSelect')+$t('customer.zone')" /> -->
        </el-form-item>
        </el-col>
          </el-row>
          <el-row :gutter="24">
          <el-col :span="24">
            <el-form-item :label="$t('customer.linkNames')" prop="linkManCn">
              <!-- 编辑时去掉按钮  改为下拉 -->
              <el-input v-if="!form.objId" v-model="linkMan.linkManCn" style="width:180px;margin-right:5px" :disabled="true" :placeholder="$t('common.placeholder')+$t('customer.linkNames')" />
              <el-button v-if="!form.objId" @click="handleAddLinkMan('default')">{{$t('common.add1')}}</el-button>
              <el-select v-if="form.objId" v-model="linkManId" @change="linkChange('default')"  :placeholder="$t('common.placeSelect')+$t('customer.linkNames')">
                <el-option
                  v-for="link in linkOptions"
                  :key="link.linkId"
                  :label="(link.linkManCn || '')+' '+(link.linkManEn || '')"
                  :value="link.linkId"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          </el-row>
        <el-row :gutter="24">
          <el-col :span="24">
            <el-form-item :label="$t('customer.SparelinkNames')" prop="SparelinkNames">
              <!-- 编辑时去掉按钮  改为下拉 -->
              <el-input v-if="!form.objId" v-model="spareLinkMan.linkManCn" style="width:180px;margin-right:5px" :disabled="true" :placeholder="$t('common.placeholder')+$t('customer.SparelinkNames')" />
              <el-button v-if="!form.objId" @click="handleAddLinkMan('spare')">{{$t('common.add1')}}</el-button>
              <el-select v-if="form.objId" v-model="spareLinkManId" @change="linkChange('spare')"  :placeholder="$t('common.placeSelect')+$t('customer.SparelinkNames')">
                <el-option
                  v-for="link in linkOptions"
                  :key="link.linkId"
                  :label="(link.linkManCn || '')+' '+(link.linkManEn || '')"
                  :value="link.linkId"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
          <el-row :gutter="24">
            <el-col :span="24">
              <el-form-item :label="$t('customer.managerId')" prop="userId">
                <el-select v-model="form.managerId" style="width: 100%"
                :placeholder="$t('common.placeSelect')+' '+$t('customer.managerId')" filterable
                ref="searchSelect" :filter-method="searchUser"  clearable size="small">
                  <el-option
                    v-for="user in userOptions"
                    :key="user.userId"
                    :label="user.nickName+' '+user.userNameEn+' '+user.userName"
                    :value="user.userId"
                  />
              </el-select>
             </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
          <el-col :span="24">
        <el-form-item :label="$t('customer.objAddrsCn')" prop="objAddrsCn">
          <el-input v-model="form.objAddrsCn" :placeholder="$t('common.placeholder')+$t('customer.objAddrsCn')" />
        </el-form-item>
        </el-col>
          </el-row>
          <el-row :gutter="24">
          <el-col :span="24">
        <el-form-item :label="$t('customer.objAddrsEn')" prop="objAddrsEn">
          <el-input v-model="form.objAddrsEn" :placeholder="$t('common.placeholder')+$t('customer.objAddrsEn')" />
        </el-form-item>
        </el-col>
          </el-row>
          <el-row :gutter="24">
          <el-col :span="24">
            <el-form-item :label="$t('customer.remark')"  prop="remark">
              <el-input type="textarea" :rows="2" v-model="form.remark" :placeholder="$t('common.placeholder')+$t('customer.remark')" />
            </el-form-item>
          </el-col>
          </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">{{$t('common.submit')}}</el-button>
        <el-button @click="cancel">{{$t('common.cancle')}}</el-button>
      </div>
    </el-dialog>
    <!-- 添加或修改相对方对话框 -->
    <el-dialog :close-on-click-modal="false"  :title="$t('common.import')+$t('customer.functionName')" :visible.sync="openDownload" width="400px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <el-form-item :label="$t('common.import')+$t('customer.functionName')" prop="objNameCn">
          <el-upload
                  style="display: inline;"
                  :disabled="fileBtnLoading"
                  :action="uploadUrl"
                  :headers="myHeaders"
                  auto-upload
                  :before-upload="importStudentFile"
                  :on-success="successUpFile"
                  :show-file-list='false'
                >
                  <el-button
                      type="success"
                      icon="el-icon-upload"
                      size="mini"
                      v-hasPermi="['system:customer:export']"
                    >{{$t('common.clickImport')+$t('customer.functionName')}}</el-button>
                </el-upload>
                <el-button
                      type="text"
                      icon="el-icon-download"
                      size="mini"
                      style="display: inherit;margin-bottom:10px"
                      @click="handleDownloadTemplate"
                      v-hasPermi="['info:customer:export']"
                    >{{$t('common.download')+$t('customer.functionName')+$t('common.template')}}</el-button>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="openDownload=false">{{$t('common.submit')}}</el-button>
        <el-button @click="openDownload=false">{{$t('common.cancle')}}</el-button>
      </div>
    </el-dialog>
    <dialogLinkman  ref="dialogLinkman" @getLinkMan="getLinkMan"></dialogLinkman>
  </div>
</template>

<script>
import { listCustomer, getCustomer, delCustomer, addCustomer, updateCustomer, exportCustomer,vaildObjName } from "@/api/info/customer";
import dialogLinkman from '../../components/linkman/dialog'
import {selectLikeUserName} from "@/api/system/user";
import {
  provinceAndCityData, CodeToText,TextToCode
} from "@/components/areaData/app.js"
import { getToken } from '@/utils/auth'

export default {
  name: "Customer",
  components: {
      dialogLinkman
  },
  data() {
    const vaildObjNames = (rule, value, callback) => {
      // if(this.form.objNameCn){
      //   this.isEn=false;
      // }else{
      //   this.isEn=true;
      // }
      // &&!this.form.objNameEn
      if (!this.form.objNameCn) {
        callback(new Error("请输入相对方名称"));
      } else {
        this.vaildObjName(callback)
      }
    };
    return {
      currentLinkType:"default",
      visible:false,
      uploadUrl: '/dev-api/info/obj/readxls',
      myHeaders:{'Authorization':'Bearer ' + getToken()},
      fileBtnLoading:false,
      provinceAndCityData,
      // 遮罩层
      loading: true,
      linkMan:{},
      spareLinkMan:{},
      linkManId:'',
      spareLinkManId:'',
      isCN:true,
      isEn:true,
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
      // 相对方表格数据
      customerList: [],
      // 弹出层标题
      title: "",
      titleDownload: "",
      viewTitle:"",
      viewOpen:false,
      // 是否显示弹出层
      open: false,
      openDownload: false,
      // 国家字典
      countryOptions: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        objName: null,
      },
      titleLinkMan:'',
      openLinkMan:false,
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        objNameCn: [
          { required: true,trigger: "blur",validator: vaildObjNames  }
        ],
        // objNameEn: [
        //   {  trigger: "blur",validator: vaildObjNames  }
        // ],
        objAddrsCn: [
          { required: true, message: "地址不能为空", trigger: "blur" }
        ],
        linkManCn: [
          { required: true, message: "联系人不能为空", trigger: "blur" }
        ],
        // objMobile: [
        //   { required: true, message: "联系方式不能为空", trigger: "blur" }
        // ],
        zone: [
          { required: true, message: "省市不能为空", trigger: "blur" }
        ],
        managerId: [
          { required: true, message: "经办人不能为空", trigger: "blur" }
        ]
      },
      linkOptions:[],
      userOptions:[]
    };
  },
  created() {
    this.getList();
    this.getDicts("info_country").then(response => {
      this.countryOptions = response.data;
    });
  },
  computed:{
     name(){
       return function (row) {
         if(row.objNameEn!=null || row.objNameEn==''){
           return row.objNameCn+"</br>"+row.objNameEn;
         }else{
           return row.objNameCn;
         }
       }
     }
  },
  methods: {
    /** 查询相对方列表 */
    getList() {
      this.loading = true;
      listCustomer(this.queryParams).then(response => {
        this.customerList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 国家字典翻译
    countryFormat(row, column) {
      return this.selectDictLabel(this.countryOptions, row.country);
    },
    /** 验证 */
    vaildObjName(callback) {
      if(this.form.objNameCn){
          vaildObjName({objName:this.form.objNameCn,objId:this.form.objId}).then(response => {
            if(response.code=='200'){
              callback()
            }else{
              callback(new Error("相对方名称已存在"))
            }
          });
      }

      if(this.form.objNameEn){
          vaildObjName({objName:this.form.objNameEn,objId:this.form.objId}).then(response => {
            if(response.code=='200'){
              callback()
            }else{
              callback(new Error("相对方名称已存在"))
            }
          });
      }else{
        callback()
      }
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        objId: null,
        createTime: null,
        createBy: null,
        objNameCn: null,
        objNameEn: null,
        managerId: null,
        objMobile: null,
        postcode: null,
        zone: null,
        country: null,
        objAddrsCn: null,
        objAddrsEn: null,
        remark: null,
        isDelete: null,
        updateTime: null,
        updateBy: null,
        ver: null,
        linkManCn: null,
        linkManEn: null,
        sex: null,
        position: null,
        mobile: null,
        telephone: null,
        email: null,
        fax: null,
        city:'',
        linkList:[]
      };
      this.linkMan={};
      this.spareLinkMan={};
      this.spareLinkManId=null;
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.queryParams.objName = '';
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = [];//selection.map(item => item.objId)
      selection.forEach(item => {
        this.ids.push({id:item.objId,ver:item.infoVer})
      });
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = this.$t('common.add')+this.$t('customer.functionName');
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      this.linkOptions = []
      const objId = row.objId || this.ids
      var that = this
      this.searchUser('')
      getCustomer({objId:objId}).then(response => {
        var data = response.data
        data.linkId = ''
        data.linkManCn= ''
        this.form = response.data;
        if(this.form.country=='中国'&&this.form.zone&&this.form.zone.split('/').length==2){
          this.form.city = [TextToCode[ this.form.zone.split('/')[0]].code,TextToCode[ this.form.zone.split('/')[0]][this.form.zone.split('/')[1]].code];
        }else{
          this.form.city = []
          this.form.zone = ''
        }
        this.linkOptions = this.form.list
        this.linkOptions.forEach(form=>{
          if(form.isDefault==1){
              this.linkMan=form;
              this.linkManId=form.linkId;
              this.form.linkManCn=form.linkManCn;
          }else if(form.isDefault==0){
              this.spareLinkMan=form;
              this.spareLinkManId=form.linkId;
          }
        })
        this.open = true;
        this.title = this.$t('common.edit')+this.$t('customer.functionName');
      });
    },
    linkChange(type){
      var that = this
      this.linkOptions.forEach(form=>{
          if(type=='default' && form.linkId==this.linkManId){
             this.linkMan=form;
             this.linkMan.isDefault="1";
              this.form.linkId=form.linkId;
             this.form.linkManCn=form.linkManCn;
          }else if(type=='spare' && form.linkId==this.spareLinkManId){
             this.spareLinkMan=form;
             this.spareLinkMan.isDefault="0";
         }

      });
    },
      /** 查看按钮操作 */
    handleView(row) {
       this.reset();
       const objId = row.objId || this.ids
       getCustomer(objId).then(response => {
          this.form = response.data;                                                                                                                                                                                                                                                                                                                                                                                                                     this.viewOpen = true;
          this.viewTitle = this.$t('common.view')+this.$t('customer.functionName');
      });
    },

    /** 提交按钮 */
    submitForm() {
      //组合联系人和备用联系人
      if(this.form.country=='中国'){
        if(this.form.city&&this.form.city.length==2){
          this.form.zone = CodeToText[ this.form.city[0]] + '/' +CodeToText[ this.form.city[1]];
        }
      }else{
        this.form.zone = " "
      }
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.form.linkList = [];
          if (this.spareLinkMan!=null && this.spareLinkMan.linkManCn != undefined && this.linkMan != null) {
            this.form.linkList.push(this.linkMan, this.spareLinkMan);
          } else {
            this.form.linkList.push(this.linkMan);
          }
          //编辑时判断两者是否一致
          if (this.form.objId != null) {
            if (this.spareLinkMan!=null && this.linkMan.linkId == this.spareLinkMan.linkId) {
              this.msgError(this.$t('customer.notOnePerson'));
              return;
            }
          }
          if (this.form.objId != null) {
            updateCustomer(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess(this.$t('common.successEdit'));
                this.open = false;
                this.getList();
              }
            });
          } else {
            addCustomer(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess(this.$t('common.successAdd'));
                this.open = false;
                this.getList();
              }
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const objArr = row.objId?[{id:row.objId,ver:row.infoVer}]: this.ids;

      this.$confirm(this.$t('common.confirmDelete'), this.$t('common.warning'), {
          confirmButtonText: this.$t('common.submit'),
          cancelButtonText: this.$t('common.cancle'),
          type: "warning"
        }).then(function() {
          return delCustomer(objArr);
        }).then(() => {
          this.getList();
          this.msgSuccess(this.$t('common.successDelete'));
        }).catch(function() {});
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm(this.$t('common.confirmExport'), this.$t('common.warning'), {
          confirmButtonText: this.$t('common.submit'),
          cancelButtonText: this.$t('common.cancle'),
          type: "warning"
        }).then(function() {
          return exportCustomer(queryParams);
        }).then(response => {
          this.download(response.msg);
        }).catch(function() {});
    },
    toLinkMan(item){
      this.$router.push("linkman?objId="+item.objId+"&objNameCn="+item.objNameCn)
    },
    handleAddLinkMan(type){
      this.currentLinkType=type;
      this.$nextTick(()=>{
        if(this.currentLinkType=='default')
        {
          this.$refs.dialogLinkman.showDialog(this.linkMan, 1);
        }else{
          this.$refs.dialogLinkman.showDialog(this.spareLinkMan, 1);
        }
      })
    },
    getLinkMan(form){
      if(this.currentLinkType=='default'){//默认联系人
        form.isDefault="1";
        this.form.linkManCn=form.linkManCn;
        this.linkMan=form;
      }else if(this.currentLinkType=='spare'){//备用联系人
        form.isDefault="0";
        this.spareLinkMan=form;
      }
    },
    importStudentFile(file) {
        this.fileBtnLoading = true
        var f_content = file.name;
        var fileext=f_content.substring(f_content.lastIndexOf("."),f_content.length)
        fileext=fileext.toLowerCase()
        if (fileext!='.xls'&&fileext!='.xlsx'){
          this.$message.error("对不起，导入数据格式必须是xls格式文件哦，请您调整格式后重新上传，谢谢 ！");
          this.fileBtnLoading = false
          return false;
        }

        return true
      },
      successUpFile(response, file, fileList) {
        this.fileBtnLoading = false
        this.visible = false
        if (response.code === '200') {
          this.$confirm(response.msg, '提示', {
            confirmButtonText: '确定',
            type: 'warning'
          }).then(() => {
              this.getList();
          }).catch(() => {

          })
        } else {
          this.$confirm(response.msg, '提示', {
            confirmButtonText: '确定',
            type: 'warning'
          }).then(() => {
              this.getList();
          }).catch(() => {

          })
        }
      },
      handleDownloadTemplate(){
        this.visible = false
        window.location.href = '/xdfTemple.xlsx';
      },
      searchUser(val){
        this.userOptions = []
        selectLikeUserName({uName :val}).then(response => {
            if (response.code === 200) {
              this.userOptions = response.data
            }
        });
      }
  }
};
</script>
