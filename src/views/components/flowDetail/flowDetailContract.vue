<template>
  <div>
    <el-collapse v-model="activeNames">
      <el-collapse-item :title="$t('sealinfo.flowTracing')" name="4">
        <el-steps :space="200" finish-status="success">
          <flow-pic :workId="workId" v-if="workId != null"></flow-pic>
        </el-steps>
      </el-collapse-item>
      <el-collapse-item :title="$t('sealinfo.approvalOpinions')" name="2">
        <el-form ref="form2" :label-width="$i18n.locale=='en'?'130px':'80px'">
          <el-tabs v-model="activeName">
            <el-tab-pane v-if="mShowComment" :label="$t('sealinfo.opinioncontent')" name="first">
              <el-form-item :label="$t('sealinfo.opinioncontent')" prop="attachment">
                <el-input
                  type="textarea"
                  v-model="temp.comment"
                  :placeholder="$t('common.placeholder')+$t('sealinfo.opinioncontent')"
                  maxlength="1000"
                  show-word-limit
                ></el-input>
              </el-form-item>
            </el-tab-pane>
            <el-tab-pane :label="$t('sealinfo.explan')" name="second">
              <el-row>
                <el-col :span="12">
                  <el-form-item :label="$t('sealinfo.explan')" prop="explan">
                    <el-input type="textarea"
                              v-model="explan"
                              :placeholder="$t('common.placeholder')+$t('sealinfo.explan')"
                              maxlength="1000"
                              show-word-limit
                    ></el-input>
                  </el-form-item>
                  <el-button v-if="btn.length > 0" type="success" @click="addexplan" v-prevent-repeat-click>
                    {{ $t('sealinfo.send') }}
                  </el-button>
                  <el-button type="success" v-if="form.applyForUserId!=userId && mShowComment" @click="confirmexplan"
                             v-prevent-repeat-click>{{ $t('common.confirm') }}
                  </el-button>
                </el-col>
                <el-col :span="12">
                  <div class="msg">
                    <div style="color:#F56C6C">{{ $t('sealinfo.explan') }}：</div>
                    <div v-for="(item,index) in msgList" :key="index+item.nodeName">
                      <div v-for="(item1,index1) in item.msglist" :key="item1.createTime+item1.msgContent">
                        <p v-if="item1.msgContent === '同意'">{{ item1.createName }} ：{{ item1.createTime }}
                          {{ item1.msgContent }}</p>
                        <p v-else>{{ item1.createName }}： {{ item1.msgContent }}</p>
                      </div>
                    </div>

                  </div>
                </el-col>
              </el-row>
            </el-tab-pane>
          </el-tabs>
        </el-form>

        <el-form label-width="80px">
          <el-table
            :data="tableData"
            style="width: 100%;margin-top: 15px" border>
            <el-table-column
              prop="nodename"
              :label="$t('sealinfo.nodename')"
              width="240">
            </el-table-column>
            <el-table-column
              prop="username"
              :label="$t('sealinfo.username')"
              width="100">
            </el-table-column>
            <el-table-column
              prop="deptname"
              width="150"
              :label="$t('sealinfo.deptname')">
            </el-table-column>
            <el-table-column
              prop="dotime"
              width="150"
              :label="$t('sealinfo.dotimemin')">
<!--              <template scope="scope">
                {{ scope.row.dotimemin }}分钟
              </template>-->
            </el-table-column>
            <el-table-column
              prop="actiontime"
              width="160"
              :label="$t('sealinfo.actiontime')">
            </el-table-column>
            <el-table-column
              prop="actionname"
              width="150"
              :label="$t('sealinfo.actionMemo')">
            </el-table-column>
            <el-table-column
              prop="comments"
              :label="$t('sealinfo.comments')">
            </el-table-column>
          </el-table>
        </el-form>
      </el-collapse-item>

    </el-collapse>

    <div style="margin-top: 30px;background-color: white;padding: 10px;border: 1px solid #ededed" v-if="btn.length > 0">
      <!-- 暂存：save   提交：submit  退回： reject  撤销：cancel -->
      <el-button
        :disabled="form.applyForUserId !== userId && !!msgFlagTemp" type="primary"
        @click="item.buttonId=='archiveSubmit'?archivedOpen=true:handleUpdate(item.buttonId)"
        v-for="(item,index) in btn" :key="item.buttonId">
        {{ item.buttonName }}
      </el-button>
    </div>
    <!-- 归档页面 -->
    <el-dialog :close-on-click-modal="false" :title="$t('common.contractfile')" :visible.sync="archivedOpen"
               width="800px" append-to-body>
      <contractfile :contractId="form.contractId" :fileType="form.fileType" @submitForm="submitForm"
                    @cancel="archivedOpen = false"></contractfile>
    </el-dialog>
  </div>
</template>

<script>
import {getFlowOperateButton, getFlowOperateOperate} from "@/api/info/flow";
import {addexplan, msgConfirm, msgLaunchmsg, msgLoadmsg, archiveoperation} from "@/api/flow/contract";
import FlowPic from "@/components/IFrameItem/FlowPic"
import contractfile from '@/components/flow/contractfile' ;

export default {
  name: "Contract",
  components: {
    FlowPic, contractfile
  },
  props: {
    form: Object,
    tableData: Array,
    workId: String,
    showComment: {
      type: Boolean,
      default: false
    },
    msgFlag: String
  },
  data() {
    return {
      userId: "",
      hostId: '',
      activeNames: ['4', '2'],
      activeName: 'first',
      // 表单参数
      //暂存：save   提交：submit  退回： reject  撤销：cancel
      btn: [],
      temp: {radio: '', comment: ''},
      mShowComment: false,
      msgList: [],
      msgFlagTemp: '',
      explan: '',
      archivedOpen: false
    };
  },
  created() {
    this.msgFlagTemp = this.msgFlag;
    this.hostId = this.$route.query.id;
    this.userId = this.$store.getters.userId
    this.getFlowOperateButton();
    this.msgLoadmsg();
    //console.log("caeated:" + this.msgFlagTemp);
    //console.log(this.form.applyForUserId !== this.userId && !!this.msgFlagTemp);
  },
  watch: {
    msgFlag(val) {
      this.msgFlag = val
      this.msgFlagTemp = val;
      console.log(val);
    }
  },
  methods: {
    getFlowOperateButton() {
      let that = this;
      getFlowOperateButton({hostId: this.hostId}).then(response => {
        that.btn = response.data;
        if (!that.showComment) {
          that.mShowComment = false
          that.btn.forEach(item => {
            if (item.buttonId == 'submit') {
              that.mShowComment = true
            }
          })
        } else {
          that.mShowComment = false
        }
        if (!that.mShowComment) {
          that.activeName = "second"
        }
      });
    },
    /** 按钮操作 */
    handleUpdate(btn) {
      //暂存：save   提交：submit  退回： reject  撤销：cancel 任意退回：jumpreject
      let temp = {}
      temp.hostId = this.hostId
      temp.operate = btn
      temp.comment = this.temp.comment.trim();
      if (this.mShowComment && temp.comment.length === 0) {
        let tip = '';
        if (btn === 'reject' || btn === 'jumpreject') {
          //退回 提示输入信息
          tip = this.$t('common.rejectTips');
        }
        if (btn === 'stop') {
          //撤销 提示信息
          tip = this.$t('common.stopTips');
        }
        if (btn === 'submit' && this.userId !== this.form.applyForUserId) { //提交操作提示输入意见内容 申请人提交可以不写
          tip = this.$t('common.placeholder') + this.$t('sealinfo.opinioncontent');
        }
        if (!!tip) {
          this.msgError(tip);
          return
        }
      }

      getFlowOperateOperate(temp).then(response => {
        //操作成功返回上一页
        if (response.code === 200) {
          this.msgSuccess(this.$t('common.successOperate'));
          this.closeCurrentTag();
        }
      });
    },
    addexplan() {
      let that = this;
      if (!this.explan) {
        this.msgError(this.$t('common.placeholder') + this.$t('sealinfo.explan'));
        return
      }
      msgLaunchmsg({contractId: this.hostId, msgContent: this.explan}).then(response => {
        if (response.code === 200) {
          that.msgFlagTemp = that.explan
          that.explan = '';
          that.msgLoadmsg()
        }
      });
    },
    confirmexplan() {
      let that = this;
      msgConfirm({contractId: this.hostId}).then(response => {
        if (response.code === 200) {
          this.msgSuccess(this.$t('common.successEdit'));
          that.msgFlagTemp = ''
        }
      });
    },
    msgLoadmsg() {
      msgLoadmsg({contractId: this.hostId}).then(response => {
        this.msgList = response.data
      });
    },
    submitForm(form) {
      archiveoperation(form).then(response => {
        if (response.code === 200) {
          this.msgSuccess(this.$t('common.successAdd'));
          this.archivedOpen = false;
          this.closeCurrentTag();
        }
      });
    },
  }
};
</script>


<style>

.header {
  text-align: center;
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

.el-collapse {
  border: 0px;
}

.el-collapse-item__header {
  font-size: 16px;
  background-color: #f9f9f9;
  margin-bottom: 10px;
  padding-left: 10px;
  border-bottom: 1px solid #ededed;
}

.el-collapse-item {
  background-color: white;
  border: 1px solid #ededed;
  margin-top: 20px;
}

.el-collapse-item__content {
  padding: 10px;
}

.msg {
  padding: 0 20px;
  height: 110px;
  overflow: auto;
}

.msg div {
  padding: 0;
  margin: 0;
}

.msg p {
  padding: 0;
  margin: 0;
  padding-left: 20px;
}
</style>
