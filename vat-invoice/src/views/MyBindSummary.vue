<template>
  <div id="myBindSummary" class="container">
    <div class="top"></div>
    <div class="main">
      <!-- <input type="hidden" id="userId" value="${userId}"> -->
      <!-- <c:forEach items="${invoiceOrgVos}" var="invoice" varStatus="statue">
            <div class="group_cell">
                <span class="comp">${invoice.orgName}</span>
                <c:if test="${invoice.isValid == 1}">
                    <span class="hh_num">${invoice.bindCount}户</span>
                </c:if>
                <c:if test="${invoice.isValid == 0}">
                    <span class="hh_num">未开通</span>
                </c:if>
                <input  type="hidden" class="isValid" value="${invoice.isValid}">
                <input type="hidden" class="orgNo" value="${invoice.orgNo}">
            </div>
      </c:forEach>-->
      <div class="group_cell" v-for="item in invByOrgGroup" :key="item.orgNo" @click="toBindListInOrg(item.orgNo)">
        <span class="comp">{{item.orgName}}</span>
        <span class="hh_num" v-if="item.isValid == 1">{{item.bindCount}}户</span>
        <span class="hh_num" v-else>未开通</span>
      </div>
    </div>
    <div class="bot" id="progress">
      <img src="@/assets/image/invoice/zzs/jindu_ico.png" id="jindu_logo">
      <span>查看预约进度</span>
    </div>
    <wechat-error-alert :errorAlert="errorAlert"></wechat-error-alert>
    <loading-toast :isDisplay="showLoadingToast"></loading-toast>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'myBindSummary',
  data () {
    return {
      showLoadingToast: false,
      errorAlert: {
        isDisplay: false,
        msg: '',
        rtnCode: 0
      },
      userId: 0,
      invByOrgGroup: []
    }
  },
  created () {
    this.initBindSummary()
  },
  methods: {
    showAlert (msg) {
      this.errorAlert.msg = msg
      this.errorAlert.isDisplay = true
    },
    initBindSummary () {
      this.showLoadingToast = true
      axios.post('/getMyBindSummaryAjax')
        .then(resp => {
          this.showLoadingToast = false
          let result = resp.data
          // console.log(data)
          if (result.code === 0) {
            this.invByOrgGroup = result.data
          } else {
            console.log(result)
            this.showAlert('获取绑定数据失败，请稍候再试！')
          }
        }).catch(error => {
          this.showLoadingToast = false
          this.showAlert('系统异常，请稍候再试！')
          console.log(error)
        })
    },
    toBindListInOrg(orgNo) {
      // console.log(orgNo)
      sessionStorage.setItem("orgNo", this.TOOL.encryptParam(orgNo))
      this.$router.push({ name: 'BindListInOrg' })
    }
  },
}
</script>

<style scoped src="@/assets/css/invoice/zzs/wdhh_01.css"></style>
