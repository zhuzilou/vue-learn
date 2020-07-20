<template>
  <div id="invoiceTitle">
    invoiceTitle
  </div>
</template>

<script>
import axios from 'axios'
import qs from 'qs'
export default {
  name: 'invoiceTitle',
  data() {
    return {
      showLoadingToast: false,
      errorAlert: {
        isDisplay: false,
        msg: '',
        rtnCode: 0
      },
    }
  },
  created() {
    this.initInvoiceTitle()
  },
  methods: {
    showAlert (msg) {
      this.errorAlert.msg = msg
      this.errorAlert.isDisplay = true
    },
    initInvoiceTitle() {

    }
  }
}
</script>