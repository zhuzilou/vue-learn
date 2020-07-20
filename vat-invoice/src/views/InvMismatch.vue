<template>
  <div id="invMismatch">
    <div class="container">
      <div class="head">
        <div class="line"></div>
        <div>以下户号不满足开票条件（{{month}}）</div>
        <div class="line"></div>
      </div>
      <div class="modules">
        <div class="module" v-for="(value, index) in invalidUserInfoList" :key="index">
          <div class="module_title">
            <div>
              <span class="status">
                <span v-if="value.invoiceFlag === '0'">开票信息不完整，请至所属营业厅核实信息。</span>
                <span v-if="value.invoiceFlag === '2'">开票信息不完整，请至所属营业厅核实信息。</span>
                <span v-if="value.invoiceFlag === '3'">您预约的开票月份电费未结清</span>
                <span v-if="value.invoiceFlag === '4'">您预约的电费发票已开票</span>
                <span v-if="value.invoiceFlag === '5'">您预约的发票已开具或已预约</span>
                <span v-if="value.invoiceFlag === '6'">您的电费未出账</span>
                <span v-if="value.invoiceFlag === '7'">电费金额为零或溢付</span>
                <span v-if="value.invoiceFlag === '-1'">您预约的发票已开具或已预约</span>
              </span>
            </div>
          </div>
          <div class="module_cell">
            <div class="module_cell_li">
              <div>
                <span>户号</span>
              </div>
              <div class="phone_show">{{value.consNo}}</div>
            </div>
            <div class="module_cell_li">
              <div>
                <span>用电地址</span>
              </div>
              <div class="addr_show">{{value.elecAddr}}</div>
            </div>
          </div>
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
  name: 'invMismatch',
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
      invalidUserInfoList: []
    }
  },
  created() {
    this.getInvMismatchList()
  },
  methods: {
    showAlert (msg) {
      this.errorAlert.msg = msg
      this.errorAlert.isDisplay = true
    },
    getInvMismatchList() {
       this.showLoadingToast = true
      let postData = qs.stringify({
        orgNo: this.orgNo,
        month: this.TOOL.encryptParam(this.month.replace('-', ''))
      })

      axios.post('/getInvMismatchAjax', postData)
        .then(resp => {
          this.showLoadingToast = false
          let result = resp.data
          if (result.code === 0) {
            console.log(result)
            this.invalidUserInfoList = result.data
          } else {
            this.showAlert('获取不可开票状态失败，请稍候再试！')
          }
        }).catch(error => {
          this.showLoadingToast = false
          this.showAlert('系统异常，请稍候再试！')
          console.log(error)
        })
    }
  }
}
</script>

<style scoped src="@/assets/css/invoice/zzs/wdhh_mismatch.css"></style>
