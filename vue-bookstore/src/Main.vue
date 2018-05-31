<template>
    <div id="main">
        <div class="tabs">
            <ul>
            <!-- 通过名称引用路由需要向to属性传入一个对象显式声明路由的名称。-->
            <router-link :to="{name : 'Home'}" tag="li" exact>
                <div><img src="./assets/images/home.svg" ></div>
                <div>首页</div>
            </router-link>
            <router-link :to="{name : 'Explorer'}" tag="li" exact>
                <div><img src="./assets/images/category.svg" alt=""></div>
                <div>分类</div>
            </router-link>
            <router-link :to="{name : 'Cart'}" tag="li" exact>
                <div><img src="./assets/images/cart.svg" alt=""></div>
                <div>购物车</div>
            </router-link>
            <router-link :to="{name : 'Me'}" tag="li" exact>
                <div><img src="./assets/images/me.svg" ></div>
                <div>我</div>
            </router-link>
            </ul>
        </div>
        <div class="content">
            <router-view></router-view>
        </div>
  </div>
</template>
<script>
// 全局引用 import './assets/less/tabs.less';
export default {}
</script>
<!-- 只应用当前组件 -->
<style lang="less" scoped>
@import './assets/less/tabs.less';
</style>

