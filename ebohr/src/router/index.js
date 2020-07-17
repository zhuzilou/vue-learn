import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import BillInfo from '@/views/BillInfo'
import InvIndex from '@/views/vatinvoice/InvIndex'

Vue.use(Router)

//重复路由到当前页面，控制台异常
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err);
}

export default new Router({
  routes: [
    {
      //默认页面
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/billInfo',
      name: 'BillInfo',
      component: BillInfo,
    },
    {
      path: '/inv',
      name: 'InvIndex',
      component: InvIndex,
      children: [
        {
          path: '/abc',
          component: InvIndex,
        },
      ],
    },
  ],
})
