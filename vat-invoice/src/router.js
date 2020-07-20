import Vue from 'vue'
import Router from 'vue-router'
// @ 等价于 /src 这个目录，避免写麻烦又易错的相对路径
import Agreement from '@/views/Agreement'
import Yhrz from '@/views/Yhrz'
import MyBindList from '@/views/MyBindSummary'
import BindListInOrg from '@/views/BindListInOrg'
import InvoiceStatusList from '@/views/InvoiceStatusList'
import InvMismatch from '@/views/InvMismatch'
import ApplyInvoice from '@/views/ApplyInvoice'
import ApplyUserInfoList from '@/views/ApplyUserInfoList'
import InvoiceTitle from '@/views/InvoiceTitle'

Vue.use(Router)

export default new Router({
  routes: [
    {
      name: 'Agreement',
      path: '/',
      meta: {
        title: '增值税专用发票预约'
      },
      component: Agreement
    },
    {
      name: 'Yhrz',
      path: '/yhrz',
      meta: {
        title: '用户认证'
      },
      component: Yhrz
    },
    {
      name: 'MyBindSummary',
      path: '/myBindSummary',
      meta: {
        title: '我的户号'
      },
      component: MyBindList
    },
    {
      name: 'BindListInOrg',
      path: '/bindListInOrg',
      meta: {
        title: '供电公司下挂户号信息列表'
      },
      component: BindListInOrg
    },
    {
      name: 'InvoiceStatusList',
      path: '/invoiceStatusList',
      meta: {
        title: '发票可预约状态查询'
      },
      component: InvoiceStatusList
    },
    {
      name: 'InvMismatch',
      path: '/invMismatch',
      meta: {
        title: '不满足开票条件'
      },
      component: InvMismatch
    },
    {
      name: 'ApplyInvoice',
      path: '/applyInvoice',
      meta: {
        title: '发票预约'
      },
      component: ApplyInvoice
    },
    {
      name: 'ApplyUserInfoList',
      path: '/applyUserInfoList',
      meta: {
        title: '预约用户列表'
      },
      component: ApplyUserInfoList
    },
    {
      name: 'InvoiceTitle',
      path: '/invoiceTitle',
      meta: {
        title: '开票信息'
      },
      component: InvoiceTitle
    }
  ]
})
