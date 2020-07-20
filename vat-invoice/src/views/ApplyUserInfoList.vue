<template>
  <div id="applyUserInfoList">
    <div class="container">
      <div class="group" v-for="user in userInfoList" :key="user.consNo">
        <div class="group_row">
          <div>
            <span>户号</span>
          </div>
          <div class="number">{{user.consNo}}</div>
        </div>
        <div class="group_row">
          <div>
            <span>用电地址</span>
          </div>
          <div class="address">{{user.elecAddr}}</div>
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
  name: 'applyUserInfoList',
  data () {
    return {
      showLoadingToast: false,
      errorAlert: {
        isDisplay: false,
        msg: '',
        rtnCode: 0
      },
      userInfoList: []
    }
  },
  created() {
    this.initUserInfoList()
  },
  methods: {
    showAlert (msg) {
      this.errorAlert.msg = msg
      this.errorAlert.isDisplay = true
    },
    initUserInfoList() {
      this.showLoadingToast = true
      let postData = qs.stringify({
        bindIds: sessionStorage.getItem('bindIds'),
      })
      axios.post('/getListUserInfoAjax', postData)
        .then(resp => {
          this.showLoadingToast = false
          let result = resp.data
          if (result.code === 0) {
            this.userInfoList = result.data
          } else {
            this.showAlert('获取用户详细信息失败，请稍候再试！')
          }
        }).catch(error => {
          this.showLoadingToast = false
          this.showAlert('系统异常，请稍候再试！')
          console.log(error)
        })
    }
  },
}
</script>

<style scoped src="@/assets/css/invoice/zzs/wdyy_list.css"></style>