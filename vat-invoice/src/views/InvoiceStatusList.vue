<template>
  <div id="invoiceStatusList">
    <div class="container">
      <div class="head">
        <div class="head_top">
          <div>
            <span id="comp_name">{{orgName}}</span>
            <img src="@/assets/image/invoice/zzs/group_ico.png" id="comp_logo" />
          </div>
        </div>
        <div class="head_mid">电费年月</div>
        <div class="head_bot">
          <ul id="date">
            <li
              class="bill_month"
              :class="{'on': index==activeIndex}"
              v-for="(value, index) in threeMonth"
              :key="index"
              @click="changeMonth(value, index)"
            >{{value}}</li>
          </ul>
        </div>
      </div>
      <div class="div1">
        <div id="inv_users_count">
          <span id="match_users">可开票({{validInvCount}}户)</span>
          <span id="mismatch_users" @click="toMismatch">不可开票</span>
        </div>
      </div>
      <div id="search">
        <div id="search_box">
          <input type="text" id="search_input" placeholder="输入关键字搜索" v-model="validInvFilter" />
          <img src="@/assets/image/invoice/zzs/search_ico.png" id="find" />
        </div>
      </div>
      <div class="div2">
        <div v-show="this.validInvCount !== 0">
          <input
            type="radio"
            :class="{'radio_off': !isChooseAll, 'radio_on': isChooseAll}"
            @click="chooseAll()"
            id="all"
          />
          <span class="match_count" :style="{color: chooseAllStyle}">&nbsp;全选</span>
        </div>
      </div>
      <div class="modules">
        <div class="module" v-for="(value, name, index) in validInvMap" :key="index">
          <div class="module_title">
            <input
              type="radio"
              :class="{'radio_off': !isGroupChooseMap[name], 'radio_on': isGroupChooseMap[name]}"
              @click="groupChooseAll(name)"
            />
            <div>
              <img src="@/assets/image/invoice/zzs/qiye_ico.png" class="group_logo" />
              <span class="group_name">{{name}}</span>
            </div>
          </div>
          <div class="module_cell" v-for="consInfo in value" :key="consInfo.userBindId">
            <div class="module_cell_li">
              <div>
                <input
                  type="radio"
                  :class="{'radio_off': !consInfo.isChoose, 'radio_on': consInfo.isChoose}"
                  @click="consInfoChoose(name, consInfo)"
                />
                <span>户号</span>
              </div>
              <div class="phone_show">{{consInfo.consNo}}</div>
            </div>
            <div class="module_cell_li">
              <div>
                <span style="width: 0.16rem;height: 0.16rem;"></span>
                <span>用电地址</span>
              </div>
              <div class="addr_show">{{consInfo.elecAddr}}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="btns">
        <button
          id="submit"
          :class="{'submit_enable': canSubmit, 'submit_disable': !canSubmit}"
          @click="preSubmit"
        >下一步</button>
      </div>
    </div>
    <!-- 开票信息确认提示 -->
    <div id="info_confirm" v-show="showNextStepTip">
      <div class="weChat_mask"></div>
      <div class="weChat_confirm">
        <div class="confirm_hd"></div>
        <div class="confirm_bd">
          <p>请先核对各户号开票信息，若信息有误，请先至营业厅更新后再来开票。确认全部开票信息无误吗？</p>
        </div>
        <div class="confirm_ft">
          <div class="confirm_btn" id="back" @click="showNextStepTip=false">取消</div>
          <div class="confirm_btn" id="continue" @click="toPreApply">确定</div>
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
export default {
  name: 'invoiceStatusList',
  data () {
    return {
      showLoadingToast: false,
      errorAlert: {
        isDisplay: false,
        msg: '',
        rtnCode: 0
      },
      orgNo: sessionStorage.getItem('orgNo'),
      orgName: sessionStorage.getItem('orgName'),
      threeMonth: [],
      activeIndex: 0,
      validInvMap: {},
      validInvMapCopy: {},
      validInvCount: 0,
      isChooseAll: false,
      isGroupChooseMap: {},
      validInvFilter: '',
      canSubmit: false,
      showNextStepTip: false
    }
  },
  // beforeRouteLeave (to, from, next) {
  //   // 跳转页面路由信息
  //   console.log(to)
  //   if ('BindListInOrg' === to.name && 0 === this.goBack) {
  //     // 后退到前一页面，需要添加参数
  //     this.goBack = 1
  //     next({ name: 'BindListInOrg', params: { orgNo: this.orgNo } })
  //   } else {
  //     next()
  //   }
  // },
  created () {
    this.initLastThreeMonth()
  },
  computed: {
    chooseAllStyle: function () {
      return this.isChooseAll ? '#01a29a' : '#edc76b'
    }
  },
  watch: {
    validInvFilter: function (newVal) {
      newVal = newVal.trim()
      if ('' === newVal) {
        this.validInvMap = this.validInvMapCopy
        Object.keys(this.validInvMap).map(key => {
          this.isGroupChooseMap[key] = false
        })
      } else {
        // 筛选应在原始集合进行，而不是叠加筛选
        this.validInvMap = this.validInvMapCopy
        let invfilter = Object.values(this.validInvMap)
          .flat()
          .filter(consInfo => consInfo.consNo.indexOf(newVal) !== -1
            || consInfo.elecAddr.indexOf(newVal) !== -1)
        // console.log(invfilter)
        // 将结果集重新赋值
        this.validInvMap = {}
        this.isGroupChooseMap = {}
        invfilter.forEach(consInfo => {
          let groupName = consInfo.vatName
          this.isGroupChooseMap[groupName] = false
          if (!this.validInvMap[groupName]) {
            this.validInvMap[groupName] = []
          }
          this.validInvMap[groupName].push(consInfo)
        })
      }
    }
  },
  methods: {
    showAlert (msg) {
      this.errorAlert.msg = msg
      this.errorAlert.isDisplay = true
    },
    initLastThreeMonth () {
      this.showLoadingToast = true
      axios.post('/lastThreeMonthsAjax')
        .then(resp => {
          this.showLoadingToast = false
          let result = resp.data
          if (result.code === 0) {
            this.threeMonth = result.data
            this.getValidInvStatusByMonth(this.threeMonth[0])
          } else {
            this.showAlert('获取电费年月失败，请稍候再试！')
          }
        }).catch(error => {
          this.showLoadingToast = false
          this.showAlert('系统异常，请稍候再试！')
          console.log(error)
        })
    },
    getValidInvStatusByMonth (month) {
      this.showLoadingToast = true
      let postData = qs.stringify({
        orgNo: this.orgNo,
        month: this.TOOL.encryptParam(month.replace('-', ''))
      })
      axios.post('/getValidInvStatusByMonthAjax', postData)
        .then(resp => {
          this.showLoadingToast = false
          let result = resp.data
          if (result.code === 0) {
            // console.log(result)
            // 计算可开票户数
            this.validInvCount = Object.values(result.data)
              .flat()
              .map(consInfo => {
                // 为每个户号数据添加是否选中属性，用于页面控制
                consInfo.isChoose = false
                return consInfo
              }).length

            this.validInvMap = result.data
            // 复制当前返回结果，用于筛选后恢复初始结果
            this.validInvMapCopy = this.validInvMap
            // console.log(this.validInvMap)
            // 为分组添加是否选中属性
            Object.keys(result.data).map(groupName => {
              this.isGroupChooseMap[groupName] = false
            })
            // console.log(this.isGroupChooseMap)
          } else {
            this.showAlert('获取可开票状态失败，请稍候再试！')
          }
        }).catch(error => {
          this.showLoadingToast = false
          this.showAlert('系统异常，请稍候再试！')
          console.log(error)
        })
    },
    changeMonth (value, index) {
      if (index === this.activeIndex) {
        console.log('当前月份未改变，不需要重新获取！')
        return
      }
      console.log('准备获取' + value)
      this.activeIndex = index
      this.getValidInvStatusByMonth(value)
    },
    chooseAll () {
      this.isChooseAll = !this.isChooseAll

      // 设置所有分组选中状态
      Object.keys(this.isGroupChooseMap).forEach(key => {
        this.isGroupChooseMap[key] = this.isChooseAll
      })

      // 设置所有分组下挂信息选中状态
      Object.values(this.validInvMap)
        .flat()
        .forEach(item => {
          item.isChoose = this.isChooseAll
        })

      this.watchSubmitStatus()
    },
    groupChooseAll (groupName) {
      this.isGroupChooseMap[groupName] = !this.isGroupChooseMap[groupName]
      // 设置分组下挂信息状态
      this.validInvMap[groupName].forEach(consInfo => {
        consInfo.isChoose = this.isGroupChooseMap[groupName]
      })

      // 检查各分组是否全部选中
      let checkAllChoose = Object.values(this.isGroupChooseMap).reduce((init, cur) => {
        return init && cur
      }, this.isGroupChooseMap[groupName])
      // console.log(checkAllChoose)
      this.isChooseAll = checkAllChoose
      this.watchSubmitStatus()
    },
    consInfoChoose (groupName, consInfo) {
      consInfo.isChoose = !consInfo.isChoose
      // 检查该分组是否全部选中
      let checkGroupChoose = this.validInvMap[groupName].reduce((init, cur) => {
        return init && cur.isChoose
      }, consInfo.isChoose)
      // console.log('consInfo: ' + consInfo.isChoose)
      // console.log('group: ' + checkGroupChoose)
      this.isGroupChooseMap[groupName] = checkGroupChoose

      // 检查各分组是否全部选中
      let checkAllChoose = Object.values(this.isGroupChooseMap).reduce((init, cur) => {
        return init && cur
      }, consInfo.isChoose)
      // console.log('all: ' + checkAllChoose)
      this.isChooseAll = checkAllChoose
      this.watchSubmitStatus()
    },
    /**
     * 监视选中状态，变更提交按钮样式。（是否有更好的方式？）
     */
    watchSubmitStatus () {
      this.canSubmit = Object.values(this.validInvMap)
        .flat()
        .reduce((init, consInfo) => init || consInfo.isChoose, false)
    },
    preSubmit () {
      if (this.canSubmit) {
        this.showNextStepTip = true
      }
    },
    toMismatch () {
      sessionStorage.setItem("month", this.threeMonth[this.activeIndex].replace('-', ''))
      this.$router.push({ name: 'InvMismatch' })
    },
    toPreApply () {
      if (!this.canSubmit) {
        this.showAlert('请选择要开具发票的户号！')
      }
      // 数组需要toString，直接加密失败
      let bindIds = Object.values(this.validInvMap)
        .flat()
        .filter(consInfo => consInfo.isChoose)
        .map(consInfo => consInfo.userBindId)

      sessionStorage.setItem("bindIds", this.TOOL.encryptParam(bindIds.toString()))
      sessionStorage.setItem("chooseCount", bindIds.length)
      sessionStorage.setItem("month", this.threeMonth[this.activeIndex].replace('-', ''))
      this.$router.push({ name: 'ApplyInvoice' })
    },
    toCheckInvTitle () {
      this.$router.push({ name: 'InvoiceTitle' })
    }
  }
}
</script>

<style scoped src="@/assets/css/invoice/zzs/wdhh_03.css"></style>
