import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import LoadingToast from '@/components/LoadingToast'
import WechatErrorAlert from '@/components/WechatErrorAlert'
import Tool from '@/assets/js/tool'
/* 全局css和js引用 */
import '@/assets/js/autoSuite'
import '@/assets/css/weui.css'
import '@/assets/css/weChat.css'
// import '@/assets/css/common.css'


Vue.config.productionTip = false

/* 全局Loading动画 */
Vue.component('loading-toast', LoadingToast)
Vue.component('wechat-error-alert', WechatErrorAlert)

// axios.defaults.timeout = 5000 // 请求超时
axios.defaults.baseURL = '/wechat/vatInvoice'  // api 即上面 vue.config.js 中配置的地址
axios.defaults.withCredentials = true //允许跨域请求携带cookie

Vue.prototype.TOOL = Tool

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
