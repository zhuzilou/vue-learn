<template>
  <div id="authUser" class="container" @click="closePhoneHelp">
    <input type="hidden" id="userId" />
    <div class="top">
      <div>
        <div class="input_div">
          <div>
            <span class="logos">
              <img src="@/assets/image/invoice/zzs/tel_ico.png" id="phone_logo" />
            </span>
            <input
              v-model.trim="authUser.phone"
              type="number"
              id="phone_num"
              placeholder="请输入联系人手机号码"
              oninput="if(this.value>11)value=value.slice(0,11)"
            />
          </div>
          <div id="phone_help" @click="openPhoneHelp" ref="phoneHelp">
            <img src="@/assets/image/invoice/zzs/help_ico.png" id="phone_exp" />
            <div id="phone_exp_expand" :style="{display: showPhoneHelp}" ref="phoneExpExpand">
              <span></span>
              <p>什么是联系手机号？</p>
              <p>您在电力营业厅首次进行增值税专用发票预约认证时预留的手机号</p>
            </div>
          </div>
        </div>
        <div class="input_div">
          <div>
            <span class="logos">
              <img src="@/assets/image/invoice/zzs/renzheng.ico.png" class="mes_logo" />
            </span>
            <input
              v-model.trim="authUser.identityCard"
              type="text"
              id="identity_card"
              placeholder="请输入身份证号码"
              maxlength="18"
            />
          </div>
          <span></span>
        </div>
        <div class="input_div">
          <div>
            <span class="logos">
              <img src="@/assets/image/invoice/zzs/message_ico.png" class="mes_logo" />
            </span>
            <input
              type="number"
              id="mes_num"
              placeholder="请输入短信验证码"
              oninput="if(this.value>4)value=value.slice(0,4)"
            />
          </div>
          <span id="send_mes" @click="sendSms">获取验证码</span>
        </div>
      </div>
    </div>
    <div class="btns">
      <button id="submit">提交</button>
    </div>
    <wechat-error-alert :errorAlert="errorAlert"></wechat-error-alert>
    <loading-toast :isDisplay="showLoadingToast"></loading-toast>
  </div>
</template>
<script>
export default {
  name: 'authUser',
  data () {
    return {
      showLoadingToast: false,
      errorAlert: {
        isDisplay: false,
        msg: '',
        rtnCode: 0
      },
      showPhoneHelp: 'none',
      authUser: {
        identityCard: '',
        phone: ''
      }
    }
  },
  methods: {
    showAlert (msg) {
      this.errorAlert.msg = msg
      this.errorAlert.isDisplay = true
    },
    /**
     * 弹出什么是联系人手机号详细信息
     */
    openPhoneHelp () {
      this.showPhoneHelp = ''
    },
    /**
     * 点击任意地方关闭联系人详细信息
     */
    closePhoneHelp (e) {
      if (e.target !== this.$refs.phoneExpExpand &&
        e.target !== this.$refs.phoneHelp) {
        this.showPhoneHelp = 'none'
      }
    },
    sendSms () {
      // 发送短信前验证填写内容
      if (this.formValid()) {

      }
    },
    formValid () {
      if (this.authUser.phone === '') {
        this.showAlert('请输入手机号')
        return false
      }
      let regexPhone = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/
      if (!regexPhone.test(this.authUser.phone)) {
        this.showAlert('请输入正确的手机号码')
        return false
      }
      if (this.authUser.identityCard === '') {
        this.showAlert('请输入身份证号码')
        return false
      }
      let regex = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
      if (!regex.test(this.authUser.identityCard)) {
        this.showAlert('请输入正确的身份证号码')
        return false
      }
      return true
    }
  }
}
</script>

<style scoped src="@/assets/css/invoice/zzs/yhrz.css">
/* @import '../assets/css/invoice/zzs/yhrz.css'; */
</style>
