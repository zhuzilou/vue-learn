<template>
  <div id="bindListInOrg">
    <div class="container">
      <div class="top">
        <div>
          <img src="@/assets/image/invoice/zzs/group_ico.png" id="group_logo" />
          <p id="comp_name">{{orgName}}</p>
          <p id="hh_count">{{bindInfo.length}}户</p>
        </div>
      </div>
      <div class="main">
        <div class="list_div">
          <div class="list">
            <div class="info" v-for="item in bindInfo" :key="item.bindId">
              <div class="user_number">{{item.consNo}}</div>
              <input class="user_addr" type="text" :value="item.elecAddr" disabled="disabled" />
            </div>
          </div>
        </div>
      </div>
      <div class="btns">
        <button id="submit" @click="toInvoiceStatus">开始预约</button>
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
  name: 'bindListInOrg',
  data () {
    return {
      showLoadingToast: false,
      errorAlert: {
        isDisplay: false,
        msg: '',
        rtnCode: 0
      },
      orgNo: sessionStorage.getItem('orgNo'),
      orgName: '',
      bindInfo: []
    }
  },
  // 用sessionStorage替换
  // beforeRouteEnter (to, from, next) {
  //   next(vm => {
  //     if ('InvoiceStatusList' === from.name) {
  //       //从下一个页面后退到本页面
  //       vm.orgNo = from.params.orgNo
  //     } else {
  //       //正常从前一页面进入到本页面
  //       vm.orgNo = to.params.orgNo
  //     }
  //     vm.getOrgInfo()
  //     vm.initBindInfoByOrgNo()
  //   })
  // },
  created () {
    // this.orgNo = this.$route.params.orgNo
    // console.log('orgNo: ' + this.orgNo)
    // console.log(this.$route)
    this.getOrgInfo()
    this.initBindInfoByOrgNo()
  },
  methods: {
    showAlert (msg) {
      this.errorAlert.msg = msg
      this.errorAlert.isDisplay = true
    },
    initBindInfoByOrgNo () {
      this.showLoadingToast = true
      let postData = qs.stringify({
        orgNo: this.orgNo
      })
      axios.post('/getBindInfoByOrgNoAjax', postData)
        .then(resp => {
          this.showLoadingToast = false
          let result = resp.data
          // console.log(result)
          if (result.code === 0) {
            this.bindInfo = result.data
          } else {
            this.showAlert('获取绑定户号列表失败，请稍候再试！')
          }
        }).catch(error => {
          this.showLoadingToast = false
          this.showAlert('系统异常，请稍候再试！')
          console.log(error)
        })
    },
    getOrgInfo () {
      this.showLoadingToast = true
      let postData = qs.stringify({
        orgNo: this.orgNo
      })
      axios.post('/getOrgInfoAjax', postData)
        .then(resp => {
          this.showLoadingToast = false
          let result = resp.data
          // console.log(result)
          if (result.code === 0) {
            this.orgName = result.data[1]
          } else {
            this.showAlert('获取供电单位信息失败，请稍候再试！')
          }
        }).catch(error => {
          this.showLoadingToast = false
          this.showAlert('系统异常，请稍候再试！')
          console.log(error)
        })
    },
    toInvoiceStatus () {
      sessionStorage.setItem("orgName", this.orgName)
      this.$router.push({ name: 'InvoiceStatusList'})
    }
  }
}
</script>

<style scoped src="@/assets/css/invoice/zzs/wdhh_02.css"></style>

