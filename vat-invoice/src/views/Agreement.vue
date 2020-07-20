<template>
  <div id="Agreement">
    <div class="container">
      <div class="top">
        <div class="title">
          <img src="@/assets/image/invoice/zzs/title_index.png">
        </div>
      </div>
      <div class="main">
        <div class="main_content">
          <div class="exp">
            <p>为推进“互联网+营销服务”，方便电力用户，国网上海电力推出电费增值税专用发票微信预约领取服务，实现专票“线上预约、线下领取”，服务对象为本市具备增值税一般纳税人资格的电力用户。</p>
            <p>
              在进行线上预约前，请您首先携带
              <a
                href="/wechat/wcawyywr/notification0801.pdf"
                style="color: #f27b46;text-decoration: underline;"
              >企业授权委托书</a>，办理人员身份证原件前往所在地区电力营业厅办理信息认证。
            </p>
            <p>如您的预约手机号、领票身份证、电费账单户名、开票信息等发生变更，请至电力营业厅办理更正手续。</p>
            <p>请根据预约通知及时在预约领票日当天进行取票，并有1次修改取票时间的机会。若逾期未领取，则视作违约，违约累计3次，将暂停6个月的线上取票资格，如需开通需重新至营业厅进行认证。</p>
          </div>
          <div class="btns">
            <button class="next" id="agree" @click="checkForLogin">我已知晓，下一步</button>
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
export default {
  name: 'Agreement',
  data () {
    return {
      showLoadingToast: false,
      errorAlert: {
        isDisplay: false,
        msg: '',
        rtnCode: 0
      }
    }
  },
  methods: {
    showAlert (msg, rtnCode) {
      this.errorAlert.msg = msg
      this.errorAlert.isDisplay = true
      this.errorAlert.rtnCode = rtnCode
    },
    checkForLogin () {
      this.showLoadingToast = true
      axios
        .post('/checkForLoginAjax')
        .then(resp => {
          // console.log(resp.data)
          this.showLoadingToast = false
          let result = resp.data
          if (result.code === 0) {
            this.$router.push({ name: 'MyBindSummary' })
          } else {
            this.showAlert(result.message, result.code)
          }
        })
        .catch(error => {
          this.showLoadingToast = false
          this.showAlert('系统异常，请稍后再试！')
          console.log(error)
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src="@/assets/css/invoice/zzs/index.css"></style>
