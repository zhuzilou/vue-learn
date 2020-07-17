import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'
import axios from 'axios'

Vue.config.productionTip = false
// axios.defaults.timeout = 5000 // 请求超时
// axios.defaults.baseURL = '/wechat/vatInvoice'  // api 即上面 vue.config.js 中配置的地址
axios.defaults.withCredentials = true //允许跨域请求携带cookie

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
