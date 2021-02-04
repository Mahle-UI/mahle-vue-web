<template>
  <div class="dashboard-editor-container">
    <panel-group @handleSetLineChartData="handleSetLineChartData" :num1="num1" :num2="num2" />

    <el-row :gutter="40">
      <el-col :xs="24" :sm="24" :lg="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span><i class="el-icon-message"></i> {{$t('common.mynews')}}</span>
            <!-- <i style="float: right" class="el-icon-d-arrow-right cursor"></i> -->
          </div>
          <div>
            <el-table
              :data="messageData"
              :show-header="false"
              style="width: 100%">
              <el-table-column
                prop="noticeContent"
                min-width="100"
                :show-overflow-tooltip="true"
                :label="$t('common.news')">
                <template slot-scope="scope">
                  <span class="cursor" @click="handleNewsView(scope.row)">{{$i18n.locale=='en'&&scope.row.noticeContentEn?scope.row.noticeContentEn:scope.row.noticeContent}}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="createTime"
                width="160"
                :label="$t('common.date')">
              </el-table-column>
            </el-table>
            <pagination
            v-show="total1>0"
            :total="total1"
            layout="prev, pager, next"
            :page.sync="q1.pageNum"
            :limit.sync="q1.pageSize"
            @pagination="getList1"
          />
          </div>
        </el-card>
      </el-col>



      <el-col :xs="24" :sm="24" :lg="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span><i class="el-icon-document"></i> {{$t('sealinfo.explan')}}</span>
          </div>
          <div>
            <el-table
              :data="meData"
              :show-header="false"
              style="width: 100%">
              <el-table-column
                prop="msgContent"
                min-width="100"
                :show-overflow-tooltip="true"
                label="消息">
                <template slot-scope="scope">
                  <span  class="cursor" @click="handleView1(scope.row)">{{$i18n.locale=='en'&&scope.row.msgTemplEn?scope.row.msgTemplEn:scope.row.msgTempl}}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="createTime"
                :show-overflow-tooltip="true"
                width="160"
                label="日期">
              </el-table-column>
            </el-table>
            <pagination
            v-show="total2>0"
            :total="total2"
            layout="prev, pager, next"
            :page.sync="q2.pageNum"
            :limit.sync="q2.pageSize"
            @pagination="getList2"
          />
          </div>
        </el-card>
      </el-col>

    </el-row>

    <el-row :gutter="40" style="margin-top: 26px">
      <el-col :xs="24" :sm="24" :lg="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span><i class="el-icon-edit"></i> {{$t('common.proces')}}</span>
            <!-- <i style="float: right" class="el-icon-d-arrow-right cursor" @click="()=>{this.$router.push('/flow/byme')}"></i> -->
          </div>
          <div>
            <el-table
              :data="flowData"
              :show-header="false"
              @row-click="handleView"
              style="width: 100%">
              <el-table-column
                prop="procesNode"
                min-width="100"
                :show-overflow-tooltip="true"
                label="消息">
                <template slot-scope="scope">
                  <span class="cursor"  @click="handleView(scope.row)">{{scope.row.procesNode}}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="procesName"
                width="100"
                :show-overflow-tooltip="true"
                label="姓名">
              </el-table-column>
              <el-table-column
                prop="urgent"
                width="60" :formatter="urgentFormat"
                :show-overflow-tooltip="true"
                label="紧急"></el-table-column>
              <el-table-column
                prop="procesTime"
                width="160"
                :show-overflow-tooltip="true"
                label="日期">
              </el-table-column>
            </el-table>
            <pagination
            v-show="total3>0"
            :total="total3"
            layout="prev, pager, next"
            :page.sync="q3.pageNum"
            :limit.sync="q3.pageSize"
            @pagination="getList3"
          />
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span><i class="el-icon-chat-dot-square"></i> {{$t('common.notice')}}</span>
          </div>
          <div>
            <el-table
              :data="msgData"
              :show-header="false"
              style="width: 100%">
              <el-table-column
                prop="noticeTitle"
                :show-overflow-tooltip="true"
                min-width="100"
                :label="$t('common.news')">
                <template slot-scope="scope">
                  <span class="cursor" @click="handleNoticeView(scope.row)">{{scope.row.noticeTitle}}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="createTime"
                width="160"
                :label="$t('common.date')">
              </el-table-column>
            </el-table>
            <pagination
            v-show="total4>0"
            :total="total4"
            layout="prev, pager, next"
            :page.sync="q4.pageNum"
            :limit.sync="q4.pageSize"
            @pagination="getList4"
          />
          </div>
        </el-card>
      </el-col>
    </el-row>
    <!-- 添加或修改公告对话框 -->
    <el-dialog :close-on-click-modal="false" :title="$t('common.notice')" :visible.sync="open" width="780px" append-to-body>
       <div v-html="form.noticeTitle" style="font-weight: bold;font-size: 20px;text-align: center;"></div>
       <div v-html="form.noticeContent"></div>
    </el-dialog>

  </div>
</template>

<script>

import { welcomeExplain, welcomeInfrom, welcomeNotice,readNotice } from "@/api/welcome/welcome";
import {listProces,applyList} from "@/api/info/proces";
import PanelGroup from './dashboard/PanelGroup'
import {checkPermi} from "@/utils/permission"
import {usedSealUse} from "@/api/flow/sealUse";

export default {
  name: 'Index',
  components: {
    PanelGroup
  },
  data() {
    return {
      messageData: [],
      msgData: [],

      flowData: [],
      meData: [],
      urgentOptions:[],
      num1:0,
      num2:0,
      timer: '',
      total1:0,total2:0,total3:0,total4:0,
      q1:{
        pageNum: 1,
        pageSize: 4,
      },
      q2:{
        pageNum: 1,
        pageSize: 4,
      },
      q3:{
        pageNum: 1,
        pageSize: 4,
      },
      q4:{
        pageNum: 1,
        pageSize: 4,
      },
      open:false,
      form:{}
    }
  },
  created() {
    this.getList();
    this.getDicts("urgent").then(response => {
        this.urgentOptions = response.data;
    });
    //实时检测刷新token
    // this.refreshToken();
  },
  mounted() {
      //启动websocket
    // let socketUrl=process.env.VUE_APP_BASE_WS_API+"/wspoint/"+this.$store.getters.name;
    let socketUrl=process.env.VUE_APP_BASE_WS_API + process.env.VUE_APP_BASE_API +"/wspoint/"+this.$store.getters.name;
    if(typeof(WebSocket) == "undefined") {
      console.log("您的浏览器不支持WebSocket");
      this.$message.error("您的浏览器不支持WebSocket,无法使用推送功能!")
    }else {
      this.websocket = new WebSocket(socketUrl);
      this.websocket.onopen = this.websocketonopen;          //连接成功
      this.websocket.onmessage = this.websocketonmessage;    //广播成功
      this.websocket.onerror = this.websocketonerror;        //连接断开，失败
      this.websocket.onclose = this.websocketclose;          //连接关闭
    }
    //检查权限
    if(checkPermi(["flow:me:byme"])){
      this.timer = setInterval(this.getListProces, 5000);
    }
  },
  methods: {
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type]
    },
    urgentFormat(row, column) {
      return this.selectDictLabel(this.urgentOptions, row.urgent);
    },
    getList() {
      this.getList1()
      this.getList2()
      this.getList3()
      this.getList4()
    },
    getList1(){
      welcomeNotice(this.q1).then(response => {
        this.messageData = response.rows;
        this.total1 = response.total || 0;
        // this.messageData=[{noticeContent:'1'}]
      });
    },
    getList2(){
      welcomeExplain(this.q2).then(response => {
        this.meData = response.rows;
        this.total2 = response.total || 0;
      });
    },
    getList3(){
      if(checkPermi(["flow:me:byme"])){
        applyList(this.q3).then(response => {
          this.num2 = response.total;
        });
        this.getListProces()
      }
    },
    getList4(){
      welcomeInfrom(this.q4).then(response => {
        this.msgData = response.rows;
        this.total4 = response.total || 0;
        //  this.msgData=[{noticeTitle:'1' }]
      });
    },
    getListProces(){
      listProces(this.q3).then(response => {
          this.flowData = response.rows;
          this.num1 = response.total;
          this.total3 = response.total;
          // this.flowData=[{procesNode:'1',procesType:'0',hostId:'1'}]
      });
    },
    handleView(row) {
        if(row.procesType=='0'){
          //合同
          this.$router.push("/me/detail?id="+row.hostId);
        }else if(row.procesType=='1'){
          //子合同
          this.$router.push("/me/detail?id="+row.hostId);
        }else if(row.procesType=='2'){
          //合同模板
          this.$router.push("/flow/templateDetail?id="+row.hostId);
        }else if(row.procesType=='3'){
          //印章制作申请
          this.$router.push("/flow/sealDetail?id="+row.hostId+"&category=1");
        }else if(row.procesType=='4'){
          //印章作废申请
          this.$router.push("/flow/sealDeleteDetail?id="+row.hostId);
        }else if(row.procesType=='5'){
          //子公司法人
          this.$router.push("/seal/sealUseDetail?id="+row.hostId);
        }else if(row.procesType == "6"){
          //公章外借
          this.$router.push("/flow/sealBorrowDetail?id="+row.hostId);
        }else if(row.procesType == "11"){
          //子合同2
          this.$router.push("/me/detail?id="+row.hostId);
        }

      },
    //追加解释详情
      toExplainDetail(row){
        console.log(row)
        //this.$router.push("/me/detail?id="+row.contentId);
      },
      handleView1(row){
        this.$router.push(`/me/detail?id=${row.contentId}&msg=true`);
      },
      handleNewsView(row){
        let that = this;
        let url;
        //0  是 合同;   1 是 模板 ;  2是 印章
        if(row.hostType=='0'){
          //合同
          url = "/me/detail?id="+row.hostId
        }else if(row.hostType=='1'){
          //子合同
          url = "/me/detail?id="+row.hostId
        }else if(row.hostType=='2'){
          //合同模板
          url = "/flow/templateDetail?id="+row.hostId
        }else if(row.hostType=='3'){
          //印章制作申请
          url = "/flow/sealDetail?id="+row.hostId+"&category=1"
        }else if(row.hostType=='4'){
          //印章作废申请
          url = "/flow/sealDeleteDetail?id="+row.hostId
        }else if(row.hostType=='5'){
          //子公司法人
          url = "/seal/sealUseDetail?id="+row.hostId
        }else if(row.hostType == "6"){
          //公章外借
          url = "/flow/sealBorrowDetail?id="+row.hostId
        }else if(row.hostType == "11"){
          //子合同2
          url = "/me/detail?id="+row.hostId
        }else {
          this.$confirm(row.noticeContent, this.$t('common.detailOperation'), {
            confirmButtonText: this.$t('common.IKnow'),
            cancelButtonText: this.$t('common.cancle'),
            type: "warning"
          }).then(function() {
            readNotice(row.noticeId).then(response => {
              if(response.code === 200){
                that.getList1()
              }
            });
          }).catch(function() {});
        }
        if(url){
          readNotice(row.noticeId).then(response => {
            if(response.code === 200){
              that.$router.push(url);
            }
          });
        }
        // this.$router.push("/news/detail?id="+row.id);
      },
      handleNoticeView(row){
         this.$router.push("/notice/detail?id="+row.noticeId);
        //this.open = true
        //this.form = row
        // this.$router.push("/notice?id="+row.id);
      },
      // 定时检测token
      refreshToken() {
        // this.refreshTime = setInterval(() => {
        //   const token = getStore({
        //     name: "token",
        //     debug: true
        //   }) || {};
        //   const date = calcDate(token.datetime, new Date().getTime());
        //   if (validatenull(date)) return;
        //   if (date.seconds >= this.website.tokenTime && !this.refreshLock) {
        //     this.refreshLock = true;
        //     this.$store
        //       .dispatch("refreshToken")
        //       .then(() => {
        //         this.refreshLock = false;
        //       })
        //       .catch(() => {
        //         this.refreshLock = false;
        //       });
        //   }
        // }, 10000);
      },
      websocketonopen(){
        // console.log('连接成功')
      },
      websocketonerror(){
        // console.log('连接失败')
      },
      websocketclose(){
        // console.log('断开连接');
      },
      websocketonmessage(data) {
        try {
          if(data.data !== 'success') {
            let obj = JSON.parse(data.data);
            //{"dateTime":"2020-11-25 09:27","zone":0,"content":"【C-2020-0022】【测试】待您审批，【薛玲玲】请您尽快处理。"}
            //{"dateTime":"2020-11-25 09:27","zone":1,"content":"【C-2020-0022】【测试】待您审批，【薛玲玲】请您尽快处理。"}
            //{"dateTime":"2020-11-25 09:39","Zone":3,"name":"薛玲玲","contractId":"1a2e330209144b4c9eb42bd7fac36560","content":"123"}
            if (obj.zone == 0) {
              //我的消息
              // var datas = {}
              // datas.noticeContent = obj.content
              // datas.createTime = obj.dateTime
              // this.messageData.unshift(datas)
              // this.total1 +=1
              this.getList1()
            } else if (obj.zone == 1 || obj.Zone == 1) {
              //公告
              // var datas = {}
              // datas.noticeTitle = obj.content
              // datas.createTime = obj.dateTime
              // this.msgData.unshift(datas)
              // this.total4 +=1
              this.getList4()
            } else if (obj.zone == 3 || obj.Zone == 3) {
              //追加解释
              // var datas = {}
              // datas.msgContent = obj.content
              // datas.createName = obj.name
              // datas.createTime = obj.dateTime
              // datas.contentId = obj.contractId
              // this.meData.unshift(datas)
              // this.total2 +=1
              this.getList2()
            }
          }
        }catch (e) {
          console.log(e)
        }
        // console.log(data);
      },
      websocketsend(data){
        this.websocket.send(JSON.stringify(data));
      },
  },
  destroyed() {
    if(this.websocket!=null) this.websocket.close() //离开路由之后断开websocket连接
    if(checkPermi(["flow:me:byme"])) {
      clearInterval(this.timer);
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  padding-top: 16px;
  background-color: rgb(240, 242, 245);
  position: relative;
  height: calc(100vh - 84px);

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
  .box-card{
    height: 320px;
    .cursor{
      cursor: pointer;
    }
  }
}

@media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
