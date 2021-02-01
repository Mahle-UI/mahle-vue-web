import zhLocale from 'element-ui/lib/locale/lang/zh-CN' // 引入element语言包
export default{
  common: {
    test:"测试中文",
    add:"新增",
    edit:"编辑",
    search:"查询",
    view:"查看",
    delView:"作废查看",
    reset:"重置",
    delete:"删除",
    export:"导出",
    import:"导入",
    submit:"确定",
    cancle:"取消",
    confirmDelete:"确定要删除此项吗?",
    confirmExport:"确认要导出数据项吗?",
    warning:"警告",
    success:"成功",
    successAdd:"新增成功",
    successEdit:"编辑成功",
    successDelete:"删除成功",
    isNotNull:"不能为空",
    choose:"选择",
    placeholder:"请输入",
    placeSelect:"请选择",
    placeDict:"请选择字典生成",
    detailOperation:"详情",
    operation:"操作",
    inputContent:"请输入内容",
    keyWords:"关键词",
    date:"日期",
    download:"下载",
    template:"模板",
    clickImport:'点击导入',
    additional:'添加默认联系人',
    transfer:'移交',
    history:'历史',
    submits:'提交',
    temporaryStorage:'暂存',
    selectFile:'选取文件',
    fileRemark:'只能上传jpg/png/jpeg/gif/bmp文件，且不超过200M',
    filePdfRemark:'只能上传pdf/word文件，且不超过200M',
    fileWordRemark:'只能上传word文件，且不超过200M',
    filePdfPngRemark:'只能上传pdf/word/png/jpg/jpeg/gif/bmp文件，且不超过200M',
    disable:'禁用',
    start:'启用',
    stop:'停用',
    nullify:'作废',
    revert:'归还',
    apply:'申请',
    reject:'退回',
    cancels:'撤销',
    reportForm:'报表',
    agree:'同意',
    notApplicable:'不适用',
    refuse:'拒绝',
    to:'至',
    startDate:'开始日期',
    endDate:'结束日期',
    replace:"更新",
    seniorLegal:'高级法务',
    generalOfficeMinister:'总经办部长',
    headOfRelevantDepartments:'相关部门/职能负责人(选)',
    detail:'详情',
    yes:'是',
    no:'否',
    advancedSearch:'高级检索',
    nextStep:'下一步',
    contractfile:'归档',
    startTime:"开始时间",
    endTime:"结束时间",
    to:'至',
    completeAndContinue:'完成并继续',
    complete:'完成',
    clear:'清空',
    setting:"设置",
    status:"状态",
    termination:'终止',
    confirm:'确认',
    tips:'提示',
    news:'消息',
    mynews:'我的消息',
    notice:'通知公告',
    proces:'待我处理',
    content:"内容",
    urge:'催办',
    examinationApproval:'处理环节',
    MyApplication:"我的申请",
    add1:'添加',
    makesureyouwantto:'确认要',
    doYou:'吗',
    update:'修改',
    updatecomplete:'修改完成',
    contractApplicationFile:'合同申请文件',
    MasterAgreementArchiving:'关联合同',
    ApprovalOpinionSheet:'审批意见单',
    ArchiveFile:'归档合同',
    ArchiveInfoSheet:'归档信息单',
    TerminationDocument:'终止文件',
    stopTips:'请在意见内容中输入撤销理由',
    successUrge:'催办成功',
    successOperate:'操作成功',
    rejectTips:'请在意见内容中输入退回原因'
  },
  contractcate:{
    id:"编号",
    name:"类别名称",
    sort:"排序",
    remark:"备注",
    status:"状态",
    functionName:'合同分类'
  },
  contract: {
    id:"编号",
    cateId:"合同分类",
    no:"合同编号",
    preNo:"预编号",
    type:"合同类型",
    lang:"合同语言",
    deptId:"签约主体",
    link:"关联合同",
    customerId:"相对方",
    customerName:"签约方",
    startTime:"开始时间",
    endTime:"结束时间",
    amount:"金额",
    tax:"税点",
    templateId:"模板ID",
    currency:"币种",
    remark:"备注",
    createBy:"经办人",
    createTime:"创建时间",
    updateBy:"更新者",
    updateTime:"更新时间",
    flowDefinedId:"流程ID",
    flowInstanceId:"流程实例ID",
    explain:"解释",
    status:"状态",
    approveTime:"最近处理时间",
    archivedBy:"归档人",
    archivedTime:"归档时间",
    attachment:"附件",
    originalcopyAddress:"原件存放地址",
    functionName:'合同查询',
    smts:'SMTS合同审批申请',
    divisionManager:'部门经理(选)',
    financeMinister:'财务部长',
    headOfRelevantDepartments:'相关部门/职能负责人(选)',
    seniorLegal:'高级法务',
    viceGeneralManager:'SMTS副总经理',
    generalManager:'SMTS总经理',
    filingOfApplicants:'申请人归档',
    contractName:'合同名称',
    themes:'主题事项',
    taxDict:'税种',
    isMangerApprove:'本部门经理审批',
    concernDeptArr:'相关部门/职能审批',
    sybmolP:'有主协议',
    sybmolT:'是否模板',
    contractFileIdArr:'合同文件',
    urgentReason:'紧急理由',
    applyForUserId:'申请人',
    applyForDeptId:'申请部门',
    fileContract:'选取合同',
    fileContracts:'选取相关文件',
    archivedAttachment:'归档文档',
    child:'合同类型',
    child1:'SMTS合同',
    child2:'子公司合同',
    application:'申请',
    contractApplication:'合同审批申请',
    contractStatement:'合同报表',
    transferContract:'移交合同',
    pendingApplication:'您有新的待审批任务',
    expire:'即将到期合同',
    selectionConditions:'选择条件',
    problem1:'是否属于非生产性租借和租赁，或日常非生产性服务协议？',
    problem2:'金额是否小于等于100,000RMB，且属于非单价/非无价合同？',
    contractPreNo:'申请编号',
    applyForUName:'所属人',
    updateTime:'最近处理时间',
    currentPerson:'当前所属人',
    minAmount:'最小金额',
    maxAmount:'最大金额',
    createDeptId:'申请部门',
    contractStatus:'合同状态',
    completeTime:'完成审批时间',
    applicationForApprovalOfSubsidiaryContract:'子公司合同审批申请',
    departmentManagerOfSubsidiary:'子公司部门经理',
    choose:'(选)',
    generalManagerOfSubsidiary:'子公司总经理',
    SMTSfinanceMinister:'SMTS财务部长',
    historicalContractFiling:'历史合同归档',
    contractExpirationReminder:'合同到期提醒',
    email:'电子邮箱',
    email1:'电子邮箱',
    systemNotification:'系统通知',
    noticeWay:"通知方式",
    contractApprovalDetails:'合同审批详情',
    contractDetails:'合同详情',
    historyContractDetails:'历史合同详情',
    archiveDocuments:'归档文档',
    keyWords:'合同名称',
    objectNoMistake:'该相对方名称是否无误？',
    process:'合同流程' ,
    addOrUpdate:'合同模板新增/更新申请',
    termination:'确定要终止该合同吗？',
    terminationfile:'终止合同',
    remark:'备注',
    legalOfficer:'法务专员',
    verificationByGeneralManagerOfSubsidiary:'子公司总经理核销',
    expireTime:'合同到期时间',
    childSealDetail:'子公司法人章使用详情',
    objectNoMistake1:'是否无误？',
    signingTime:'合同签署时间',
    contractKind:'合同种类',
    transferredPerson:'被移交者',
    likePlaceholder: '主协议合同编号'
  },
  //流程相关
  flow:{
    "applicant":"申请人",
    "flowNo":"申请编号",
    "flowTitle":"流程名称",
    "level":"紧急程度",
    "flowType":"流程类型",
    "applyTime":"申请时间",
    "approvedTime":"最近处理时间",
    "status":"流程状态",
    "preNode":"上个节点",
    "treatmentState":"处理状态"
  },
  //合同模板
  contractTemplate: {
    id:"编号",
    no:"模板编号",
    name:"模板名称",
    cateId:"合同分类",
    type:"合同类型",
    reason:"申请理由",
    remark:"备注",
    attachment:"附件",
    startTime:"开始时间",
    endTime:"停用时间",
    status:"状态",
    createBy:"申请人",
    functionName:'合同模板',
    beginTime:'启用时间',
    templateNo:"模板编号",
    templateName:"模板名称",
    cateDict:"合同分类",
    templDict:"状态",
    reason:"申请理由",
     keyword:'关键词',
     templateNoOrtemplateName:'模板编号或模板名称',
     upload:'上传已有',
     usedept:'使用部门',
     relevantdept:'相关部门',
     add:'新增申请',
     edit:'更新申请',
     attachment:"附件",
     addOld:"新增历史模板",
     update:"修改点",
     exportForm:"导出合同模板报表"
  },
  sealUse: {
    id:"编号",
    sealId:"印章名称",
    user:"使用人",
    userId:"用户ID",
    useDate:"用印日期",
    files:"用印文件",
    filesNum:"文件数量",
    remark:"说明",
    functionName:'印章登记',
    userName:"使用人",
    useDate:"计划用印日期",
    realUseDate:"实际用印日期",
    uploadFiles:"用印文件",
    remark:"用印说明",
    status:"状态",
    createDate:"创建日期",
    functionName:'用印登记',
    complete:'用印确认',
    file:'用印文件',
    confirmUsed:"确定已用印吗?",
    export:'用印报表',
    annex:'反馈表',
    transferSuccess:'反馈表'
  },
  customer: {
    objId:"主键",
     createTime:"创建时间",
     createBy:"创建者",
     objName:"关键字",
     objNameCn:"相对方名称",
     objNameEn:"相对方名称(英)",
     objNameEns:"Please input English Name",
     managerId:"经办人",
     objMobile:"联系电话",
     postcode:"邮编",
     zone:"省市",
     country:"国家",
     objAddrsCn:"地址(中)",
     objAddrsEn:"地址(英)",
     objAddrsEns:"Please input English Address",
     remark:"备注",
     isDelete:"是否删除",
     updateTime:"更新时间",
     updateBy:"更新者",
     ver:"版本号",
      functionName:'相对方',
      linkName:'联系人',
      linkNames:'默认联系人',
      notOnePerson:'默认联系人和备用联系人不能是同一人',
      SparelinkNames:'备用联系人'
   },
   linkman: {
    linkId:"主键",
     createTime:"创建时间",
     createBy:"创建者",
     linkManCn:"姓名(中)",
     linkManEn:"姓名(英)",
     linkManEns:"Please input english Name",
     sex:"性别",
     position:"职务",
     mobile:"手机",
     telephone:"联系电话",
     email:"电子邮箱",
     fax:"传真",
     remark:"备注",
     objId:"相对方外键",
     isDefault:"是否默认    0 : 不默认 ; 1: 默认",
     updateBy:"更新者",
     updateTime:"更新时间",
     ver:"版本号",
     isDelete:"0 : 不删 ; 1 :逻辑删",
      functionName:'联系人'
   },
   sealinfo: {
    supplyId:"主键",
    createTime:"创建时间",
    createBy:"创建者",
    sealName:"印章名称",
    beginTime:"启用时间",
    userId:"保管人",
    reserveUserId:'备用保管人',
    remark:"说明",
    remarkPlaceholder:"说明内容",
    stopTime:"废止时间",
    sealDict:"状态",
    isBrow:"可外借",
    isRegister:"在CMS用印登记",
    deptId:"归属主体",
    updateBy:"更新者",
    updateTime:"更新时间",
    ver:"版本号",
     functionName:'印章制作申请',
     seal:"印章",
     fmsPath:'印章图片',
     sealUrl:'上传印章图片',
     applicant:'申请人',
     headOfApplicationDepartment:'申请部门部长',
     generalOffice:'总经办',
     generalOfficeMinister:'总经办部长',
     sealUpload:'上传已有印章',
     reason:'作废原因',
     detail:'印章登记详情',
     flowTracing:'流程追踪',
     approvalOpinions:'审批意见',
     opinioncontent:'意见内容',
     nodename:'环节',
     username:'姓名',
     deptname:'部门',
     dotimemin:'处理时长',
     actiontime:'处理时间',
     actionMemo:'操作',
     comments:'意见',
     deleteDetail:'印章作废详情',
     process:'印章作废申请',
     sealMaking:'印章制作申请',
     childSeal:'子公司法人章使用申请',
     sealProcess:'印章流程',
     explan:'追加解释',
     send:'发送',
     nullifyImg:'作废图片',
     updateImg:'更新图片',
     sealDelete:"印章作废申请"
   },
   proces: {
    procesId:"主键",
    createTime:"申请时间",
    workId:"工作流",
    userId:"用户",
    procesSn:"申请编号",
    procesType:"申请类型",
    procesNode:"流程节点",
    procesTime:"最近审批时间",
    urgent:"紧急程度",
    procesStatus:"申请状态",
    procesName:"名称",
    keyword:'关键字'

   },
    sealBorrow: {
      id:"编号",
      sealId:"印章",
      sealName:"印章名称",
      user:"借用人",
      borrowUserId:"借用人",
      borrowed:"借出",
      borrowDeptId:"借用部门",
      realUserId:"实际借用人",
      planBorrowDate:"计划借用日期",
      realityBorrowDate:"实际借用日期",
      borrowExplain:"借用说明",
      createBy:"创建人",
      createDate:"创建时间",
      returnDate:"计划返还日期",
      returnedDate:"实际返还日期",
      functionName:'公章外借申请',
      returned:"归还",
      returnedRemark:"归还说明",
      keyword:"关键字",
      keywords:"借用部门或借用人",
      export:"公章外借报表",
      custodian:"公章保管人",
      detail:"公章外借详情",
      addSealBorrow:"新增公章外借申请",
      exportSealBorrow:"导出公章外借报表"
    },
    fromme: {
      applicationType:'申请类型',
      underApproval:'审批中',
      approved:'已审批'
    },
    flowAuth:{
      flowName:"流程名称",
      authUser:"被授权人",
      userAuth:"授权人",
      startTime:"开始时间",
      endTime:"结束时间",
      noticeWay:"通知方式",
      approveTime:"处理时间",
      title:"标题",
      functionName:'临时授权',
      cancle:"确认要取消设置吗?",
      email:'邮箱',
      systemNotification:'系统通知',
      batchSetting:'批量设置',
      batchCancelSetting:'批量取消设置',
      pleaseSelectTheDataToSet:'请选择要设置的数据',
      pleaseSelectTheSameDataForOperation:'请选择操作相同的数据',
      pleaseSelectTheSetData:'请选择已设置过的数据',
      pleaseSelectUnsetData:'请选择未设置过的数据'
   },
   system: {
    deptName:'部门名称',
    deptNameEn:'部门名称(EN)',
    sort:"排序",
    createTime:'创建时间',
    parentId:'上级部门',
    orderNum:'显示排序',
    leader:'负责人',
    phone:'联系电话',
    email:'邮箱',
    status:'状态',
    noticeTitle:'公告标题',
    createBys:'操作人员',
    noticeType:'公告类型',
    id:'序号',
    createBy:'创建者',
    content:'内容',
    postId:'岗位编码',
    postName:'岗位名称',
    postCode:'岗位名称(EN)',
    postSort:'岗位排序',
    remark:'备注',
    roleId:'角色编号',
    roleName:'角色名称',
    roleKey:'权限字符',
    roleSort:'显示顺序',
    dataScope:'数据权限',
    dataScope1:'权限范围',
    keyWords:"关键词",
    phonenumber:'手机号码',
    userId:"用户编号",
    userName:"工号",
    nickName:"用户姓名",
    deptName:'部门',
    password:'用户密码',
    sex:'用户性别',
    postIds:'岗位',
    roleIds:'角色',
    oldPassword:'旧密码',
    newPassword:'新密码',
    confirmPassword:'确认密码',
    personalInformation:'个人信息',
    basicInformation:'基本资料',
    changePassword:'修改密码',
    loginName:'登录名',
    userNameEn:'英文名'
  },
  statistics:{
    contractNumber:'合同审批数量',
    historyContractNumber:'历史合同数量',
    contractApprovalCompletionRate:'合同审批完成率',
    completionRateOfContractFiling:'合同归档完成率',
    sealNumber:'印章数量',
    SealApprovalCompletionRate:'印章审批完成率',
    ContractProcessStatistics:'合同流程统计',
    StatisticsContractsPendingApproval:'待审批合同统计',
    ContractApprovalCompletionRateStatistics:'合同审批完成率统计',
    ContractFilingCompletionRateStatistics:'合同归档完成率统计',
    ProcessCategory:'流程类别',
    cateId:'合同分类',
    contractName:'合同名称',
    deptName:'申请部门',
    createTime:'申请日期',
    doTimes:'流程用时（H）',
    warningSum:'预警次数',
    year:'年份',
    yearApply:'申请年度',
    min:'最少用时（H）',
    max:'最多用时（H）',
    median:'中位数（H）',
    dividend:'合同审批完成数',
    divisor:'有效合同申请数',
    rate:'审批完成率',
    archiveRate:'归档完成率',
    dividend1:'合同归档完成数',
    divisor1:'有效可归档合同数',
    userName:'姓名',
    count:'待审批合同数'
  },
  ...zhLocale
}
