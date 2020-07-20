<template>
  <!-- 错误提示弹出窗口 -->
  <div id="wechat_error_alert" class="wechat_error_alert" v-show="isDisplay">
    <div class="wechat_mask"></div>
    <div class="wechat_alert">
      <div class="wechat_alert_hd"></div>
      <div class="wechat_alert_bd" id="wechat_alert_content">{{errorAlert.msg}}</div>
      <div class="wechat_alert_ft">
        <a class="wechat_alert_btn" id="close_error_alert" @click="closeAlert">我知道了</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WechatErrorAlert',
  props: {
    errorAlert: {
      isDisplay: Boolean,
      msg: String,
      rtnCode: Number
    }
  },
  computed: {
    isDisplay: function() {
      return this.errorAlert.isDisplay
    }
  },
  methods: {
    closeAlert () {
      // 触发父组件定义的函数来操作props中的字段，不建议直接操作
      this.errorAlert.isDisplay = false
      // this.$emit('afterClose')
      if(this.errorAlert.rtnCode === 2) {
        this.$router.push({ name: 'Yhrz' })
      }
    }
  }
}

</script>
