<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="24">
        <el-form :model="queryParams" @submit.native.prevent ref="queryForm" @keyup.enter.stop.native="handleQuery" :inline="true" v-show="showSearch">
          <el-form-item :label="$t('common.keyWords')" prop="keyWord">
            <el-input
              v-model="queryParams.keyWord"
              :placeholder="$t('common.placeholder')+$t('contract.keyWords')"
              clearable
              size="small"
            />
          </el-form-item>

          <el-form-item :label="$t('contract.child')" prop="cateDict">
            <el-select ref="multiSelect1" v-model="queryParams.cateDict"
                       :placeholder="$t('common.placeSelect')+' '+$t('contract.child')"
                        clearable size="small">
              <el-option :label="$t('contract.child1')" value="1"></el-option>
              <el-option :label="$t('contract.child2')" value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('contract.contractKind')" prop="contractKind">
            <el-select ref="multiSelect2" v-model="queryParams.contractKind"
                       :placeholder="$t('common.placeSelect')+' '+$t('contract.contractKind')"
                        clearable size="small">
              <el-option
                v-for="dict in contractKindOptions"
                :key="dict.dictValue"
                :label="dict.dictLabel"
                :value="parseInt(dict.dictValue)"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('contract.status')" prop="contractDrict">
            <el-select ref="multiSelect3" v-model="queryParams.contractDrict"
                       :placeholder="$t('common.placeSelect')+' '+$t('contract.status')"
                        clearable size="small">
              <el-option
                v-for="dict in statusOptions"
                :key="dict.dictValue"
                :label="dict.dictLabel"
                :value="parseInt(dict.dictValue)"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item>
            <el-button type="cyan" icon="el-icon-search" size="mini" @click="handleQuery">{{ $t('common.search') }}
            </el-button>
            <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">{{ $t('common.reset') }}</el-button>
          </el-form-item>

          <el-form-item>
            <el-button type="text" @click="isComplex=true">{{ $t('common.advancedSearch') }}</el-button>
          </el-form-item>
        </el-form>
        <el-row :gutter="10" class="mb8">
          <el-col :span="1.5">
            <el-popover
              placement="bottom"
              trigger="hover">
              <div>
                <el-button @click="toSmtsApply" :style="$i18n.locale=='en'?'width: 300px':'width: 200px'" type="primary"
                           icon="el-icon-document-add">{{ $t('contract.child1') + $t('contract.application') }}
                </el-button>
                <br/>
                <el-button @click="toChildApply"
                           :style="$i18n.locale=='en'?'width: 300px;margin-top: 15px':'width: 200px;margin-top: 15px'"
                           type="success" icon="el-icon-collection">
                  {{ $t('contract.child2') + $t('contract.application') }}
                </el-button>
              </div>
              <el-button
                type="primary"
                icon="el-icon-plus"
                size="mini"
                slot="reference"
                v-hasPermi="['flow:contract:add']"
              >{{ $t('common.add') }} {{ $t('contract.contractApplication') }}
              </el-button>
            </el-popover>

          </el-col>
          <el-col :span="1.5" v-if="false">
            <el-button
              type="success"
              icon="el-icon-edit"
              size="mini"
              :disabled="single"
              @click="handleUpdate"
              v-hasPermi="['flow:contract:edit']"
            >{{ $t('common.edit') }}
            </el-button>
          </el-col>
          <el-col :span="1.5" v-if="false">
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              :disabled="multiple"
              @click="handleDelete"
              v-hasPermi="['flow:contract:remove']"
            >{{ $t('common.delete') }}
            </el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button
              type="warning"
              icon="el-icon-download"
              size="mini"
              @click="handleExport"
              v-hasPermi="['flow:contract:export']"
            >{{ $t('common.export') }}{{ $t('contract.contractStatement') }}
            </el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button
              type="success"
              icon="el-icon-right"
              size="mini"
              :disabled="multiple"
              @click="handleTransfer"
              v-hasPermi="['flow:contract:transferContract']"
            >{{ $t('contract.transferContract') }}
            </el-button>
          </el-col>
          <el-col :span="1.5">
            <el-badge :value="num">
              <el-button size="small" @click="toByme">{{ $t('contract.pendingApplication') }}</el-button>
            </el-badge>
          </el-col>

          <el-col :span="1.5" style="padding: 5px;padding-left: 10px">
            <el-switch
              v-model="queryParams.isReminds"
              :active-text="$t('contract.expire')"
              active-color="#13ce66"
              inactive-color="#b6b6b6">
            </el-switch>
          </el-col>
          <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>

        <el-dialog :close-on-click-modal="false" @keyup.enter.stop.native="handleQuery" :title="$t('common.advancedSearch')" :visible.sync="isComplex"
                   width="700px" append-to-body="">

          <el-form :model="queryParams" label-width="150px" ref="queryForm" style="width: 90%">
            <el-form-item :label="$t('contract.no')" prop="contractNo">
              <el-input
                v-model="queryParams.contractNo"
                :placeholder="$t('common.placeholder')+' '+$t('contract.no')"
                clearable
                size="small"/>
            </el-form-item>
            <el-form-item :label="$t('contract.currentPerson')" prop="applyForUserId">
              <el-select v-model="queryParams.applyForUserId" style="width: 100%"
                         :placeholder="$t('common.placeSelect')+' '+$t('contract.currentPerson')" filterable
                         ref="searchSelect" :filter-method="searchUser" clearable size="small">
                <el-option
                  v-for="user in userOptions"
                  :key="user.userId"
                  :label="user.nickName+' '+user.userNameEn"
                  :value="user.userId"
                />
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('contract.amount')" prop="minAmount" :inline="true">
              <el-input
                style="width: 200px"
                v-model="queryParams.minAmount"
                :placeholder="$t('contract.minAmount')"
                suffix-icon="el-icon-money">
              </el-input>
              -
              <el-input
                style="width: 200px"
                v-model="queryParams.maxAmount"
                :placeholder="$t('contract.maxAmount')"
                suffix-icon="el-icon-money">
              </el-input>
            </el-form-item>

            <el-form-item :label="$t('contract.completeTime')" prop="approveTime">
              <el-date-picker
                v-model="queryParams.approveTime"
                type="daterange"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                :range-separator="$t('common.to')"
                :start-placeholder="$t('common.startTime')"
                :end-placeholder="$t('common.endTime')">
              </el-date-picker>
            </el-form-item>

            <el-form-item :label="$t('contract.customerId')" prop="objId">
              <el-select v-model="queryParams.objId" class="select-width"
                         autocomplete :filterable="true"
                         :placeholder="$t('common.placeSelect')+' '+$t('contract.customerId')">
                <el-option
                  v-for="obj in objectOptions"
                  :key="obj.objId"
                  :label="obj.objNameCn"
                  :value="obj.objId"
                ></el-option>
                <!-- +' '+obj.objNameEn -->
              </el-select>
            </el-form-item>

            <el-form-item :label="$t('contract.createDeptId')" prop="deptId">
              <treeselect v-model="form.deptId" :options="deptOptions" :show-count="true"
                          :placeholder="$t('common.placeSelect')+' '+$t('contract.createDeptId')"/>
            </el-form-item>

            <el-form-item :label="$t('contract.createBy')" prop="createBy">
              <el-input v-model="queryParams.createBy"
                        :placeholder="$t('common.placeSelect')+' '+$t('contract.createBy')"
                        suffix-icon="el-icon-search"/>
            </el-form-item>

            <el-form-item :label="$t('contract.contractStatus')" prop="contractDrict">
              <el-select v-model="queryParams.contractDrict"
                         :placeholder="$t('common.placeSelect')+' '+$t('contract.status')" clearable size="small">
                <el-option
                  v-for="dict in statusOptions"
                  :key="dict.dictValue"
                  :label="dict.dictLabel"
                  :value="parseInt(dict.dictValue)"
                ></el-option>
              </el-select>
            </el-form-item>

            <el-form-item :label="$t('contract.currency')" prop="currencyDict">
              <el-select class="selectWidth" v-model="queryParams.currencyDict"
                         :placeholder="$t('common.placeSelect')+' '+$t('contract.currency')">
                <el-option
                  v-for="dict in currencyOptions"
                  :key="dict.dictValue"
                  :label="dict.dictLabel"
                  :value="dict.dictValue"
                ></el-option>
              </el-select>
            </el-form-item>

            <el-form-item :label="$t('contract.createTime')" prop="createTime">
              <el-date-picker
                v-model="queryParams.createTime"
                type="daterange"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                :range-separator="$t('common.to')"
                :start-placeholder="$t('common.startTime')"
                :end-placeholder="$t('common.endTime')">
              </el-date-picker>
            </el-form-item>

            <el-form-item :label="$t('contract.archivedTime')" prop="archiveTime">
              <el-date-picker
                v-model="queryParams.archiveTime"
                type="daterange"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                :range-separator="$t('common.to')"
                :start-placeholder="$t('common.startTime')"
                :end-placeholder="$t('common.endTime')">
              </el-date-picker>
            </el-form-item>

            <el-form-item :label="$t('contract.signingTime')" prop="contractSignDate">
              <el-date-picker
                v-model="queryParams.contractSignDate"
                type="daterange"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                :range-separator="$t('common.to')"
                :start-placeholder="$t('common.startTime')"
                :end-placeholder="$t('common.endTime')">
              </el-date-picker>
            </el-form-item>


            <el-form-item style="text-align: center">
              <el-button type="cyan" icon="el-icon-search" size="mini" @click="handleQuery">{{ $t('common.search') }}
              </el-button>
              <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">{{ $t('common.reset') }}</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>


        <el-table v-loading="loading" :data="contractList" @selection-change="handleSelectionChange" border>
          <el-table-column width="55" type="selection"  align="center"/>
          <el-table-column :label="$t('contract.applyForUserId')" align="center" prop="applyForUName"/>
          <el-table-column width="130" :label="$t('contract.contractPreNo')" align="center" prop="contractPreNo">
            <template slot-scope="scope"><span>{{ scope.row.contractPreNo || '--' }}</span></template>
          </el-table-column>
          <el-table-column width="200" :label="$t('contract.contractName')" align="center" prop="contractName"/>
          <el-table-column width="200" :label="$t('contract.customerName')" align="center" prop="objNameCn"/>
          <el-table-column width="150" :label="$t('contract.amount')" align="center" prop="amount"
                           :formatter="formatCurrency"/>
          <el-table-column :label="$t('flow.status')" align="center" prop="contractDict" :formatter="statusFormat"/>
          <el-table-column width="150" :label="$t('common.examinationApproval')" align="center" prop="workName"/>
          <el-table-column width="160" :label="$t('contract.updateTime')" align="center" prop="updateTime"/>
          <el-table-column  :label="$t('common.detailOperation')" align="center"
                           class-name="small-padding fixed-width">
            <template slot-scope="scope">
              <!-- 查看 =>催办 =>更新 =>归档=>下载 =>终止 -->
              <el-button
                size="mini"
                type="text"
                icon="el-icon-view"
                @click="handleDetail(scope.row)"
              >{{ $t('common.view') }}
              </el-button>
            </template>
          </el-table-column>
          <el-table-column   :label="$t('common.operation')" align="center"
                             class-name="small-padding fixed-width">
            <template slot-scope="scope">
              <!-- 催办 -->
              <el-button
                size="mini"
                icon="el-icon-bell"
                type="text" v-if="scope.row.contractDict==1&&scope.row.applyForUserId==userId"
                @click="handleUrge(scope.row.contractId)"
              >{{ $t('common.urge') }}
              </el-button>
              <!-- 修改 -->
              <el-button
                size="mini"
                icon="el-icon-news"
                type="text" v-if="scope.row.contractDict==4&&scope.row.isUpdate==1"
                @click="handleUpdate(scope.row)"
              >{{ $t('common.replace') }}
              </el-button>
              <!-- 归档 -->
              <el-button
                size="mini"
                icon="el-icon-document"
                type="text"
                v-if="scope.row.contractDict==2&&scope.row.applyForUserId==userId"
                @click="handleArchived(scope.row)"
              >{{ $t('common.contractfile') }}
              </el-button>
              <el-button
                size="mini"
                icon="el-icon-download"
                type="text" v-if="scope.row.contractDict==4&&scope.row.isdownLoad==1"
                @click="handleDownload(scope.row)"
              >{{ $t('common.download') }}
              </el-button>
              <!-- 终止 -->
              <el-button
                size="mini"
                icon="el-icon-close"
                type="text" v-if="scope.row.contractDict==4&&scope.row.applyForUserId==userId"
                @click="handleTermination(scope.row)"
              >{{ $t('common.termination') }}
              </el-button>
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

      </el-col>
    </el-row>
    <el-dialog :close-on-click-modal="false" :visible.sync="showApply" append-to-body width="500px"
               style="text-align: center">
      <el-button style="padding: 10px;display: block;width:160px;height:60px;margin: 0 auto;" type="primary"
                 @click="toSmtsApply" icon="el-icon-document-add">
        {{ $t('contract.child1') + $t('contract.application') }}
      </el-button>
      <el-button type="success"
                 style="padding: 10px;display: block;width:160px;height:60px;margin: 0 auto; margin-top: 20px">
        {{ $t('contract.child2') + $t('contract.application') }}
      </el-button>
    </el-dialog>

    <!-- 修改合同查询对话框 -->
    <el-dialog :close-on-click-modal="false" :title="title" :visible.sync="open" width="800px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" :label-width="$i18n.locale=='en'?'250px':'150px'">
        <!--归档-->
        <span>
          <el-row :gutter="24">
            <el-col :span="24">
                 <el-form-item :label="$t('contract.archivedBy')" prop="archiveBy">
                    <el-select v-model="form.archiveBy" style="width: 100%"
                               :placeholder="$t('common.placeSelect')+' '+$t('contract.archivedBy')" filterable
                               ref="searchSelect" :filter-method="searchUser" clearable size="small">
                  <el-option
                    v-for="user in userOptions"
                    :key="user.userId"
                    :label="user.nickName"
                    :value="user.userId"
                  />
              </el-select>
                </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
          <el-col :span="24">
            <el-form-item :label="$t('contract.archiveDocuments')" prop="archiveFileId">
              <el-upload
                ref="upload"
                :limit="1"
                accept=".pdf, .doc,.docx"
                :action="UploadUrl()"
                :headers="upload.headers"
                :file-list="upload.fileList"
                :on-preview="handleFilePreview"
                :on-success="handleFileSuccess"
                :before-upload="handleFileUploadProgress"
                auto-upload>
                <!-- form.fileType -->
                <el-button slot="trigger" size="small" @click="type=160"
                           type="primary">{{ $t('common.selectFile') }}</el-button>
                <div slot="tip" class="el-upload__tip">{{ $t('common.filePdfRemark') }}</div>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
          <el-form-item :label="$t('contract.originalcopyAddress')" prop="originPlace">
              <el-input type="textarea" v-model="form.originPlace"
                        :placeholder="$t('common.placeholder')+' '+$t('contract.originalcopyAddress')"/>
            </el-form-item>
        </span>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitFileForm" v-prevent-repeat-click>{{ $t('common.submit') }}</el-button>
        <el-button @click="open=false">{{ $t('common.cancle') }}</el-button>
      </div>
    </el-dialog>

    <!-- 归档页面 -->
    <el-dialog :close-on-click-modal="false" :title="$t('common.contractfile')" :visible.sync="archivedOpen"
               width="800px" append-to-body>

      <contractfile :contractId.sync="form.contractId" :fileType.sync="form.fileType" @submitForm="submitForm"
                    @cancel="archivedOpen = false"></contractfile>
    </el-dialog>

    <!-- 终止页面 -->
    <el-dialog :close-on-click-modal="false" :title="$t('contract.terminationfile')" :visible.sync="terminationOpen"
               width="800px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="150px">
        <el-form-item label-width="130px" :label="$t('common.selectFile')" prop="fileId">
          <el-upload
            ref="upload"
            :limit="1"
            accept=".docx, .doc,.pdf"
            :action="UploadUrl()"
            :headers="upload.headers"
            :file-list="upload.fileList"
            :on-success="handleFileSuccess"
            :on-preview="handleFilePreview"
            :before-upload="handleFileUploadProgress"
            auto-upload>
            <!-- 终止170 -->
            <el-button slot="trigger" size="small" @click="type=170" type="primary">{{ $t('common.selectFile') }}
            </el-button>
            <div slot="tip" class="el-upload__tip">{{ $t('common.filePdfRemark') }}</div>
          </el-upload>
        </el-form-item>
        <el-form-item label-width="130px" :label="$t('contract.remark')" prop="remark">
          <el-input type="textarea" v-model="form.remark"
                    :placeholder="$t('common.placeholder')+' '+$t('contract.remark')"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitTerminationForm" v-prevent-repeat-click>{{ $t('common.submit') }}
        </el-button>
        <el-button @click="terminationOpen=false">{{ $t('common.cancle') }}</el-button>
      </div>
    </el-dialog>

    <el-dialog :close-on-click-modal="false" :title="$t('common.transfer')" :visible.sync="transferVisible"
               append-to-body width="700px">
      <el-form ref="transferForm" :model="transferForm" :rules="transferRules" label-width="150px">
        <el-form-item :label="$t('contract.contractName')">
          {{ selectSeal.contractName }}
        </el-form-item>
        <el-form-item :label="$t('contract.transferredPerson')" prop="ownerName">
          <!-- <el-select v-model="transferForm.ownId">
            <el-option v-for="item in sealStoreList" :value="item.userId" :label="item.nickName" v-bind:key="item.userId">{{item.nickName}}</el-option>
          </el-select> -->
          <el-autocomplete
            v-model="transferForm.ownerName"
            :fetch-suggestions="getOwner"
            :placeholder="$t('common.placeholder')+' '+$t('contract.transferredPerson')"
            @select="handleSelect"
          >
            <template v-slot="{ item }">{{ item.nickName }}</template>
          </el-autocomplete>
        </el-form-item>
        <el-form-item :label="$t('contract.remark')" prop="transferRemark">
          <el-input type="textarea" v-model="transferForm.transferRemark"
                    :placeholder="$t('common.placeholder')+' '+$t('contract.remark')"/>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitTransferForm">{{ $t('common.submit') }}</el-button>
        <el-button @click="transferVisible=false">{{ $t('common.cancle') }}</el-button>
      </div>
    </el-dialog>
  <FilePreview ref="filePreview"></FilePreview>
  </div>
</template>

<script>
import {
  listContract,
  getContract,
  delContract,
  addContract,
  updateContract,
  changearchiveend,
  exportContract,
  searchapplyman,
  loadobjcombo,
  downloadcontractinfo,
  archiveoperation,
  updcontractfile,
  continfoTransfer,
  continfoSearchowner
} from "@/api/flow/contract";
import {getFlowOperateOperate, getProcesHandler} from "@/api/info/flow";
import {getToken} from "@/utils/auth";
import divider from "@/components/divider/index"
import contractDetail from "@/components/flow/contractDetail";
import {treeselect} from "@/api/system/dept";
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import contractfile from '@/components/flow/contractfile' ;
import {listProces} from "@/api/info/proces";
import {checkPermi} from '@/utils/permission';
import {downLoadZip} from "@/utils/zipdownload";
import FilePreview from "../../../components/FilePreview/index";

export default {
  components: {
    FilePreview,
    divider,
    contractDetail,
    Treeselect,
    contractfile
  },
  name: "Contract",
  data() {
    return {
      type: 160,
      notificationRadio1: '',
      notificationRadio2: '',
      showReason: false,
      isMaster: false,
      message: false,
      showApply: false,
      tableSpan: 20,
      showLeft: true,
      // 上传参数
      upload: {
        // 是否禁用上传
        isUploading: false,
        // 设置上传的请求头部
        headers: {Authorization: "Bearer " + getToken()},
        // 上传的地址
        url: process.env.VUE_APP_BASE_API + "/info/file/upload?type=160",
        // 上传的文件列表
        fileList: []
      },
      // 遮罩层
      loading: true,
      isComplex: false,
      // 选中数组
      ids: [],
      isTemplate: "1",
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 合同查询表格数据
      contractList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      archivedOpen: false,
      terminationOpen: false,
      // 合同语言字典
      langOptions: [],
      typeOptions: [],
      statusOptions: [],
      contractKindOptions: [],
      currencyOptions: [],
      // 所属公司字典
      deptIdOptions: [],
      // 签约方字典
      customerIdOptions: [],
      userOptions: [],
      objectOptions: [],
      deptOptions: undefined,
      // 查询参数
      queryParams: {
        keyWord:'',
        pageNum: 1,
        pageSize: 10,
        cateId: '',
        no: '',
        preNo: '',
        type: '',
        lang: '',
        deptId: '',
        link: '',
        customerId: '',
        customerName: '',
        startTime: '',
        endTime: '',
        amount: '',
        tax: '',
        templateId: '',
        currency: '',
        flowDefinedId: '',
        flowInstanceId: '',
        explain: '',
        status: '',
        isHistory:1,
        applyForUserId:'',
        minAmount:'',
        maxAmount:'',
        approveTime:'',
        objId:'',
        createBy:'',
        contractDrict:'',
        currencyDict:'',
        createTime:'',
        archiveTime:'',
        contractSignDate:'',
        cateDict:'',
        contractKind:'',
      },
      // 表单参数
      form: {
        type: "2"
      },
      // 表单校验
      rules: {
        cateId: [
          {required: true, message: "分类不能为空", trigger: "blur"}
        ],
        type: [
          {required: true, message: "合同类型不能为空", trigger: "blur"}
        ],
        lang: [
          {required: true, message: "合同语言不能为空", trigger: "blur"}
        ],
        deptId: [
          {required: true, message: "所属公司不能为空", trigger: "blur"}
        ],
        customerId: [
          {required: true, message: "签约方不能为空", trigger: "blur"}
        ],
        /*archiveBeginTime: [
          {required: true, message: "开始时间不能为空", trigger: "blur"}
        ],*/
        archiveEndTime: [
          {required: true, message: "结束时间不能为空", trigger: "blur"}
        ],
        expireTime: [
          {required: true, message: "合同到期时间不能为空", trigger: "blur"}
        ],
        amount: [
          {required: true, message: "金额不能为空", trigger: "blur"}
        ],
        tax: [
          {required: true, message: "税点不能为空", trigger: "blur"}
        ],
        currency: [
          {required: true, message: "币种不能为空", trigger: "blur"}
        ],
        linkman: [
          {required: true, message: "联系人不能为空", trigger: "blur"}
        ],
        departmentIds: [
          {required: true, message: "请选择职能部门", trigger: "blur"}
        ],
        templateId: [
          {required: true, message: "请选择模板名称", trigger: "blur"}
        ],
        link: [
          {required: true, message: "关联主协议", trigger: "blur"}
        ],
        fileId: [
          {required: true, message: "请选择文件", trigger: "blur"}
        ],
        remark: [
          {required: true, message: "请填写备注", trigger: "blur"}
        ],
        archiveFileId: [
          {required: true, message: "请上传归档文件", trigger: "blur"}
        ],
        originPlace: [
          {required: true, message: "请填写原件存放地址", trigger: "blur"}
        ]
      },
      userId: '',
      num: 0,
      timer: '',
      selectSeal: {"contractName": ""},
      transferRules: {
        ownerName: [
          {required: true, message: "请选择被移交者", trigger: "blur"}
        ],
        transferRemark: [
          {required: true, message: "请填写备注", trigger: "blur"}
        ],
      },
      transferForm: {},
      transferVisible: false,
      sealStoreList: []
    };
  },
  created() {
    this.userId = this.$store.getters.userId
    //console.log(this.userId)
    this.getList();
    this.getDicts("contract_type").then(response => {
      this.typeOptions = response.data;
    });
    this.getDicts("currency").then(response => {
      this.currencyOptions = response.data;
    });
    this.getDicts("contract_status").then(response => {
      this.statusOptions = response.data;
    });
    this.getDicts("contract_kind").then(response => {
      this.contractKindOptions = response.data;
    });

    this.getDicts("langs").then(response => {
      this.langOptions = response.data;
    });
    this.getDicts("common_status").then(response => {
      this.deptIdOptions = response.data;
    });
    this.getDicts("common_status").then(response => {
      this.customerIdOptions = response.data;
    });
    loadobjcombo().then(response => {
      this.objectOptions = response.data;
    });
    treeselect().then((response) => {
      this.deptOptions = response.data;
    });
    if (checkPermi(["flow:me:byme"])) {
      this.getListProces()
      this.timer = setInterval(this.getListProces, 60000);
    }
  },
  methods: {
    UploadUrl: function () {
      return process.env.VUE_APP_BASE_API + "/info/file/upload?type=" + this.type;
    },
    // 文件上传中处理
    handleFileUploadProgress(event, file, fileList) {
      this.upload.isUploading = true;
    },
    // 文件上传成功处理
    handleFileSuccess(response, file, fileList) {
      this.upload.isUploading = false;
      if (response.code == '200') {
        this.form.archiveFileId = response.msg
        this.form.fileId = response.msg
        this.form.fileName = file.name
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
    searchUser(val) {
      this.userOptions = []
      searchapplyman({uName: val}).then(response => {
        if (response.code === 200) {
          this.userOptions = response.data
        }
      });
    },
    toSmtsApply() {
      this.$router.push("/flow/applyContract?type=1");
      this.showApply = false;
    },
    toChildApply() {
      this.$router.push("/flow/childContract?type=2");
      this.showApply = false;
    },
    openApply() {
      this.showApply = true;
    },
    handleArchived(row) {
      this.form.contractId = row.contractId
      this.form.fileType = row.fileType
      this.archivedOpen = true;
    },
    toByme() {
      this.$router.push("/flow/byme");
    },
    /** 查询合同查询列表 */
    getList() {
      this.loading = true;
      if (this.queryParams.approveTime) {
        this.queryParams.beginApproveTime = this.queryParams.approveTime[0]
        this.queryParams.endApproveTime = this.queryParams.approveTime[1]
      } else {
        this.queryParams.beginApproveTime = ''
        this.queryParams.endApproveTime = ''
      }
      if (this.queryParams.createTime) {
        this.queryParams.beginCreateTime = this.queryParams.createTime[0]
        this.queryParams.endCreateTime = this.queryParams.createTime[1]
      } else {
        this.queryParams.beginCreateTime = ''
        this.queryParams.endCreateTime = ''
      }
      if (this.queryParams.archiveTime) {
        this.queryParams.beginArchiveTime = this.queryParams.archiveTime[0]
        this.queryParams.endArchiveTime = this.queryParams.archiveTime[1]
      } else {
        this.queryParams.beginArchiveTime = ''
        this.queryParams.endArchiveTime = ''
      }
      if (this.queryParams.contractSignDate) {
        this.queryParams.signBegTime = this.queryParams.contractSignDate[0]
        this.queryParams.signEndTime = this.queryParams.contractSignDate[1]
      } else {
        this.queryParams.signBegTime = ''
        this.queryParams.signEndTime = ''
      }


      listContract(this.queryParams).then(response => {
        var tablist = response.rows
        tablist.forEach(item => {
          item.workName = ''
        })
        this.contractList = tablist;
        this.contractList.forEach(item => {
          item.approveTime = "2020-08-23 10:00"
          item.tax = item.tax + "%";
          item.no = "C2021-0001";
          if (item.status == 5) {
            item.archivedTime = "2020-08-22 20:00"
          }
        })
        this.total = response.total;
        this.workIdFormat()
        this.loading = false;
      });
    },
    workIdFormat() {
      this.contractList.forEach(item => {
        if (item.workId) {
          getProcesHandler({workId: item.workId}).then(response => {
            item.workName = response.data
          }).catch(() => {
              item.workName = ''
            })
        }
      })
    },
    // 合同类型
    typeFormat(row, column) {
      return this.selectDictLabel(this.typeOptions, row.type);
    },
    // 合同语言字典翻译
    langFormat(row, column) {
      return this.selectDictLabel(this.langOptions, row.lang);
    },
    // 状态
    statusFormat(row, column) {
      if (row.contractDict == 2) {
        return this.selectDictLabel(this.statusOptions, row.contractDict);//+"(SMTS-总经理)";
      } else {
        return this.selectDictLabel(this.statusOptions, row.contractDict);
      }
    },
    formatCurrency(row) {
      let num = row.amount;
      if (num) {
        // 将num中的$,去掉，将num变成一个纯粹的数据格式字符串
        num = num.toString().replace(/\$|\,/g, '')
        // 如果num不是数字，则将num置0，并返回
        if (num == 'N/A') {
          return 'N/A'
        }
        if (num === '' || isNaN(num)) {
          return num + "(" + row.currencyDict.toUpperCase() + ")";
        }
        // 如果num是负数，则获取她的符号
        var sign = ''
        if (num.indexOf('-') !== -1) {
          sign = '-'
          num = num.substr(1)
        }
        // 如果存在小数点，则获取数字的小数部分
        var cents = num.indexOf('.') > 0 ? num.substr(num.indexOf('.')) : ''
        cents = cents.length > 1 ? cents : '' // 注意：这里如果是使用change方法不断的调用，小数是输入不了的
        // 获取数字的整数数部分
        num = num.indexOf('.') > 0 ? num.substring(0, (num.indexOf('.'))) : num
        // 如果没有小数点，整数部分不能以0开头
        if (cents === '') {
          if (num.length > 1 && num.substr(0, 1) === '0') {
            return ''
          }
        } else {
          if (num.length > 1 && num.substr(0, 1) === '0') {
            return ''
          }
        }
        // 针对整数部分进行格式化处理，这是此方法的核心，也是稍难理解的一个地方，逆向的来思考或者采用简单的事例来实现就容易多了
        /*
          也可以这样想象，现在有一串数字字符串在你面前，如果让你给他家千分位的逗号的话，你是怎么来思考和操作的?
          字符串长度为0/1/2/3时都不用添加
          字符串长度大于3的时候，从右往左数，有三位字符就加一个逗号，然后继续往前数，直到不到往前数少于三位字符为止
         */
        for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++) {
          num = num.substring(0, num.length - (4 * i + 3)) + ',' + num.substring(num.length - (4 * i + 3))
        }
        // 将数据（符号、整数部分、小数部分）整体组合返回
        return sign + num + cents + "(" + row.currencyDict.toUpperCase() + ")";
      }
    },
    // 所属公司字典翻译
    deptIdFormat(row, column) {
      return this.selectDictLabel(this.deptIdOptions, row.deptId);
    },
    // 签约方字典翻译
    customerIdFormat(row, column) {
      return this.selectDictLabel(this.customerIdOptions, row.customerId);
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        id: null,
        cateId: null,
        no: null,
        preNo: null,
        type: null,
        lang: null,
        deptId: null,
        link: null,
        customerId: null,
        customerName: null,
        startTime: null,
        endTime: null,
        amount: null,
        tax: null,
        templateId: null,
        currency: null,
        remark: null,
        createBy: null,
        createTime: null,
        updateBy: null,
        updateTime: null,
        flowDefinedId: null,
        flowInstanceId: null,
        explain: null,
        status: null,
        archiveFileId: null,
        fileId: null,
        fileName: null,
      };
      this.upload.fileList = []
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.isComplex = false;
      this.queryParams.pageNum = 1;
      this.getList();
      this.$refs.multiSelect1.blur()
      this.$refs.multiSelect2.blur()
      this.$refs.multiSelect3.blur()
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.contractId)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = this.$t('common.edit') + this.$t('contract.functionName');
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      this.form = row;
      this.open = true;
      this.title = "更新" + this.$t('contract.functionName');
      this.form.archiveBy = this.$store.getters.userId
      this.upload.fileList = [];
      this.userOptions = [{userId: this.$store.getters.userId, nickName: this.$store.getters.userName}]
    },

    /** 修改按钮操作 */
    handleEdit(row) {
      this.reset();
      const id = row.id || this.ids
      getContract(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.form.type = "2";
        this.title = "编辑" + this.$t('contract.functionName');
      });
    },
    handleDetail(row) {
      this.reset();
      const id = row.contractId;
      this.$router.push("/me/detail?id=" + id);
    },
    /** 提交按钮 */
    submitForm(form) {
      // this.form.isRemind = this.message?this.notificationRadio1&&this.notificationRadio2?3:this.notificationRadio1?1:2:0
      // // isRemind : 0 >> 没有 ;  isRemind : 1 >>邮箱 ; isRemind : 2 >>系统通知 ; isRemind : 3 >>  邮箱 + 系统通知 ;
      // this.$refs["form"].validate(valid => {
      //   if (valid) {
      //      archiveoperation(this.form).then(response => {
      //         if (response.code === 200) {
      //           this.msgSuccess(this.$t('common.successAdd'));
      //           this.archivedOpen = false;
      //           this.getList();
      //         }
      //       });
      //   }
      // });
      archiveoperation(form).then(response => {
        if (response.code === 200) {
          this.msgSuccess(this.$t('common.successAdd'));
          this.archivedOpen = false;
          this.getList();
        }
      });
    },
    submitFileForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.form.fileType = 160
          updcontractfile(this.form).then(response => {
            if (response.code === 200) {
              this.msgSuccess(this.$t('common.successAdd'));
              this.open = false;
              this.getList();
            }
          });
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$confirm(this.$t('common.confirmDelete'), this.$t('common.warning'), {
        confirmButtonText: this.$t('common.submit'),
        cancelButtonText: this.$t('common.cancle'),
        type: "warning"
      }).then(function () {
        return delContract(ids);
      }).then(() => {
        this.getList();
        this.msgSuccess(this.$t('common.successDelete'));
      }).catch(function () {
      });
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm(this.$t('common.confirmExport'), this.$t('common.warning'), {
        confirmButtonText: this.$t('common.submit'),
        cancelButtonText: this.$t('common.cancle'),
        type: "warning"
      }).then(function () {
        return exportContract(queryParams);
      }).then(response => {
        this.download(response.msg);
      }).catch(function () {
      });
    },
    handleDownload(row) {
      downLoadZip("/info/continfo/downloadcontractinfo?contractId=" + row.contractId, "");
    },
    handleTermination(row) {
      var that = this
      this.reset()
      this.$confirm(this.$t('contract.termination'), this.$t('common.warning'), {
        confirmButtonText: this.$t('common.submit'),
        cancelButtonText: this.$t('common.cancle'),
        type: "warning"
      }).then(function () {
        that.terminationOpen = true
        that.form.contractId = row.contractId
        that.form.fileType = row.fileType
      }).catch(function () {
      });
    },
    submitTerminationForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.form.fileType = 170
          changearchiveend(this.form).then(response => {
            if (response.code === 200) {
              this.msgSuccess(this.$t('common.successEdit'));
              this.terminationOpen = false;
              this.getList();
            }
          });
        }
      });
    },
    handleUrge(id) {
      var temp = {}
      temp.hostId = id
      temp.operate = 'urge'
      temp.comment = ''
      getFlowOperateOperate(temp).then(response => {
        if (response.code === 200) {
          this.msgSuccess(this.$t('common.successUrge'));
        }
      });
    },
    getListProces() {
      listProces(this.q3).then(response => {
        this.num = response.total;
      });
    },
    //被移交者
    getOwner(queryString, cb) {
      if (queryString) {
        continfoSearchowner({ownerName: queryString}).then(res => {
          cb(res.data ? res.data : []);
        })
      }
    },
    handleSelect(item) {
      this.transferForm.ownId = item.userId
      this.transferForm.ownerName = item.nickName
      //console.log(this.transferForm)

    },
    //移交
    handleTransfer() {
      this.transferVisible = true;
      this.transferForm = {};
      if (this.ids.length == 1) {
        this.transferForm.contractId = this.ids[0]
        this.contractList.forEach(item => {
          if (item.contractId == this.ids[0]) {
            this.selectSeal = item;
          }
        })
      }
    },
    //移交合同
    submitTransferForm() {
      //console.log(this.transferForm)
      this.$refs["transferForm"].validate(valid => {
        if (valid) {
          continfoTransfer(this.transferForm).then(res => {
            if (res.code == 200) {
              this.msgSuccess(this.$t('common.transfer') + this.$t('common.success'));
              this.getList();
            }
          });
        }
      });
    },
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.getList()
    })
  },
  watch: {
    'queryParams.isReminds'(val) {
      this.queryParams.isRemind = val ? 1 : 0
      this.handleQuery()
    },
    message(value) {
      this.form.archiveEndTime = ''
    },
  },
  destroyed() {
    clearInterval(this.timer);
  }
};
</script>


<style scoped>
.el-divider--vertical {
  height: 600px
}

.box-card i {
  padding-right: 5px;
  color: #5c5c5c
}

.el-card__header {
  text-align: center;
  background-color: #50b4ff;
  color: #fff;
}

.text {
  font-size: 14px;
}

.selectWidth {
  width: 100% !important;
}

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
</style>
<style>
.el-table .cell {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>
