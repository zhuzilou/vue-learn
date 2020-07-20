<template>
  <div id="applyInvoice">
    <div class="container">
      <div class="tips">
        <img src="@/assets/image/invoice/zzs/tishi_ico02.png" class="tips_logo" />
        <div>目前线上仅支持对三个月内的账单进行发票预约，其他时间段发票开具请至营业厅咨询。</div>
      </div>
      <div class="main">
        <div>
          <div class="info_L">
            <img src="@/assets/image/invoice/zzs/rili_ico.png" class="logos" />
            <span>电费年月</span>
          </div>
          <div class="info_R" id="date">{{month}}</div>
        </div>
        <div>
          <div class="info_L">
            <img src="@/assets/image/invoice/zzs/num_ico.png" class="logos" />
            <span>开票户数</span>
          </div>
          <div class="info_R" id="hh_num" @click="toUserList">{{chooseCount}}</div>
        </div>
        <div>
          <div class="info_L">
            <img src="@/assets/image/invoice/zzs/wangdian_ico.png" class="logos" />
            <span>领取营业网点</span>
          </div>
        </div>
        <div>
          <div class="info_L">
            <span class="logos"></span>
            <select name="business_hall" id="business_hall" v-model="selectedDept">
              <option v-for="dept in busiHalls" :key="dept.deptNo" :value="dept">{{dept.deptName}}</option>
            </select>
          </div>
        </div>
        <div>
          <div class="info_L">
            <img src="@/assets/image/invoice/zzs/dizhi_ico.png" class="logos" />
            <span>领取地址</span>
          </div>
        </div>
        <div>
          <div class="info_L">
            <span class="logos"></span>
            <span id="address">{{selectedDeptAddr}}</span>
          </div>
        </div>
        <div>
          <div class="info_L">
            <img src="@/assets/image/invoice/zzs/time_ico.png" class="logos" />
            <span>领取时间</span>
          </div>
        </div>
        <div>
          <div class="info_L">
            <span class="logos"></span>
            <input type="text" id="get_date" disabled style="color: #000000" />
          </div>
          <!-- vue转换后无法居中，添加行内样式display: flex-->
          <div class="info_R" id="calendar" style="display: flex" @click="chooseIssueDate">
            <img src="@/assets/image/invoice/zzs/riqi_ico.png" id="choose_date" />
          </div>
        </div>
        <div>
          <div class="info_L">
            <img src="@/assets/image/invoice/zzs/lingquren_ico.png" class="logos" />
            <span>领取人</span>
          </div>
        </div>
        <div>
          <div class="info_L">
            <span class="logos"></span>
            <select name="get_person" id="get_person" v-model="selectedCertNo">
              <option v-for="certNo in listCertNo" :key="certNo">{{certNo}}</option>
            </select>
          </div>
        </div>
      </div>
      <div class="btns">
        <button
          id="submit"
          :class="{'submit_enable': canSubmit, 'submit_disable': !canSubmit}"
          @click="preSubmit"
        >提交预约</button>
      </div>
      <div class="tips2">
        <img src="@/assets/image/invoice/zzs/tishi_ico.png" class="tips_logo" />
        <div>
          请在预约领取日当日至营业厅取票，逾期未领取视作
          <span style="font-weight: bold">失约</span>，累计
          <span style="font-weight: bold">失约</span>3次，需重新至营业厅进行认证。
        </div>
      </div>
    </div>
    <!-- 发票预约信息确认弹出框 -->
    <div id="invoice_info_confirm" v-show="showPreApplyInfo">
      <div class="iic_mask"></div>
      <div class="iic_alert">
        <div class="iic_alert_hd">是否确认预约发票？</div>
        <div class="iic_alert_bd">
          <div>
            <span>开票户数</span>
            <span>{{chooseCount}}户</span>
          </div>
          <div>
            <span>电费年月</span>
            <span id="elecDate">{{month}}</span>
          </div>
          <div>
            <span>领取营业厅</span>
            <span id="getHall">{{selectedDept.deptName}}</span>
          </div>
          <div>
            <span>领取时间</span>
            <span id="getTime">{{selectedIssueDate}}</span>
          </div>
          <div>
            <span>领取人</span>
            <span id="getPerson">{{selectedCertNo}}</span>
          </div>
          <div>
            <span>工作日：</span>
            <span id="fixed_work_time">{{selectedDept.fixedWorkTime}}</span>
          </div>
        </div>
        <div class="iic_alert_ft">
          <div class="iic_alert_btn" id="no" @click="showPreApplyInfo = false">否</div>
          <div class="iic_alert_btn" id="yes" @click="applyInv">是</div>
        </div>
      </div>
    </div>
    <wechat-error-alert :errorAlert="errorAlert"></wechat-error-alert>
    <loading-toast :isDisplay="showLoadingToast"></loading-toast>
  </div>
</template>
<script>
import axios from 'axios'
import qs from 'qs'
// import '@/assets/laydate/laydate'
export default {
  name: 'applyInvoice',
  data () {
    return {
      showLoadingToast: false,
      errorAlert: {
        isDisplay: false,
        msg: '',
        rtnCode: 0
      },
      orgNo: sessionStorage.getItem('orgNo'),
      month: sessionStorage.getItem('month'),
      // 选择开票户号数量
      chooseCount: sessionStorage.getItem('chooseCount'),
      // 营业厅
      busiHalls: [],
      selectedDept: '',
      // 身份证
      listCertNo: [],
      selectedCertNo: '',
      selectedIssueDate: '',
      canSubmit: false,
      showPreApplyInfo: false,
      availableDayStyle: {
        backgroundColor: '#ffbb3c',
        color: '#ffffff',
        text: '预约'
      },
      restDayStyle: {
        backgroundColor: '#ececec',
        color: '#a0a0a0',
        text: '休息'
      },
      unavailableDayStyle: {
        backgroundColor: '#ececec',
        color: '#a0a0a0',
        text: '约满'
      }
    }
  },
  created () {
    this.initListDept()
    this.initListCertNo()
  },
  computed: {
    selectedDeptAddr: function () {
      return this.selectedDept ? this.selectedDept.address : ''
    }
  },
  methods: {
    showAlert (msg) {
      this.errorAlert.msg = msg
      this.errorAlert.isDisplay = true
    },
    initListDept () {
      this.showLoadingToast = true
      let postData = qs.stringify({
        orgNo: this.orgNo,
      })
      axios.post('/getListDeptByOrgNoAjax', postData)
        .then(resp => {
          this.showLoadingToast = false
          let result = resp.data
          if (result.code === 0) {
            this.busiHalls = result.data
            //设置默认选中项
            this.selectedDept = this.busiHalls[0]
          } else {
            this.showAlert('获取营业厅信息失败，请稍候再试！')
          }
        }).catch(error => {
          this.showLoadingToast = false
          this.showAlert('系统异常，请稍候再试！')
          console.log(error)
        })
    },
    initListCertNo () {
      axios.post('/getListCertNoAjax')
        .then(resp => {
          this.showLoadingToast = false
          let result = resp.data
          if (result.code === 0) {
            this.listCertNo = result.data
            this.selectedCertNo = this.listCertNo[0]
          } else {
            this.showAlert('获取认证身份证列表失败，请稍候再试！')
          }
        }).catch(error => {
          this.showLoadingToast = false
          this.showAlert('系统异常，请稍候再试！')
          console.log(error)
        })
    },
    chooseIssueDate () {
      // function套function，重定义this指向
      let _this = this
      let listDay;
      // eslint-disable-next-line no-undef
      let laydateRef = laydate
      laydateRef.render({
        //指定元素
        elem: '#get_date',
        //直接显示
        show: true,
        //这里代表的意思是：点击 calendar 所在元素阻止关闭事件冒泡。如果不设定，则无法弹出控件
        closeStop: '#calendar',
        format: 'yyyy-MM-dd',
        btns: ['confirm'],
        isInitValue: false,
        showBottom: false,
        ready: () => {
          let postData = qs.stringify({
            deptNo: _this.TOOL.encryptParam(_this.selectedDept.deptNo),
          })
          axios.post('/getApplyDateAjax', postData)
            .then(resp => {
              _this.showLoadingToast = false
              let result = resp.data
              if (result.code === 0) {
                // console.log(result)
                listDay = result.data
                _this.changeAllDayStyle()
                _this.changeGroupDayStyle(listDay)
              } else {
                _this.showAlert('获取可预约日期列表失败，请稍候再试！')
              }
            }).catch(error => {
              _this.showLoadingToast = false
              _this.showAlert('系统异常，请稍候再试！')
              console.log(error)
            })
        },
        change: () => {
          _this.changeAllDayStyle()
          _this.changeGroupDayStyle(listDay)
        },
        done: (formatVal, layYmd) => {
          let chooseDate = layYmd.year + '-' + layYmd.month + '-' + layYmd.date
          // console.log(formatVal, chooseDate)
          let chooseType = -2
          let dayObj = listDay.filter(dayStatus => dayStatus.dateStr === chooseDate)
          // console.log(dayObj)
          if (dayObj.length > 0) {
            chooseType = dayObj[0].status
          }
          if (1 === chooseType) {
            _this.selectedIssueDate = formatVal
            _this.canSubmit = true
            return
          } else if (-1 === chooseType) {
            _this.showAlert('节假日、休息日不可预约！')
          } else if (0 === chooseType) {
            _this.showAlert('当日已约满！')
          } else {
            // -2
            _this.showAlert('该日不可预约！')
          }
          _this.canSubmit = false
          _this.selectedIssueDate = ''
        }
      })
    },
    changeAllDayStyle () {
      // 处理当前表格中所有日期样式
      document.querySelectorAll('.layui-laydate td').forEach(td => {
        td.style.backgroundColor = 'transparent'
        td.style.textDecoration = 'line-through'
        td.style.color = '#666'
      })
      // 将非本月日期样式变灰
      document.querySelectorAll('[class*="laydate-day-"]').forEach(td => {
        td.style.color = '#d2d2d2'
      })
    },
    changeGroupDayStyle (groupDay) {
      groupDay.forEach(dayStatus => {
        if (dayStatus.status === 1) {
          // 修改可预约日样式
          this.changeDayStyle(dayStatus.dateStr, this.availableDayStyle)
        } else if (dayStatus.status === -1) {
          // 修改节假日样式
          this.changeDayStyle(dayStatus.dateStr, this.restDayStyle)
        } else if (dayStatus.status === 0) {
          // 修改已约满样式
          this.changeDayStyle(dayStatus.dateStr, this.unavailableDayStyle)
        } else {
          console.log('Error dayStatus: ' + dayStatus)
        }
      })
    },
    changeDayStyle (dayStr, styleContent) {
      let dayDom = document.querySelector(".layui-laydate td[lay-ymd='" + dayStr + "']")
      // 超出dayArray范围时，dayDom不存在
      if (dayDom) {
        dayDom.style.backgroundColor = styleContent.backgroundColor
        dayDom.style.textDecoration = 'none'
        dayDom.style.color = styleContent.color
        // 增加子节点p
        let p = document.createElement('p');
        p.style.fontSize = '0.05rem'
        let text = document.createTextNode(styleContent.text);
        p.appendChild(text)
        dayDom.appendChild(p)
      }
    },
    preSubmit () {
      if (this.canSubmit) {
        this.showPreApplyInfo = true
      }
    },
    applyInv () {
      this.showPreApplyInfo = false
      this.showLoadingToast = true
      //调用ajax申请
    },
    toUserList () {
      this.$router.push({ name: 'ApplyUserInfoList' })
    }
  },
}
</script>

<style scoped src="@/assets/css/invoice/zzs/plyy.css"></style>
