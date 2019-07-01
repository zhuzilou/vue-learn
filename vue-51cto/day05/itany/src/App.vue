<template>
  <div id="app">
    <v-header></v-header>
    <div class="tab">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script>
import Header from './components/header/Header.vue'

export default {
  components: {
    // 利用别名替代Header，避免和Html标签混淆。
    'v-header': Header
  }
}
</script>

<style lang="less" scoped>
#app .tab{
  display: flex;
  width: 100%;
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid rgba(7,17,27,0.1);
  .tab-item {
    //等分宽度
    flex: 1;
    text-align: center;
    //&符号指上一级
    & > a{
      font-size: 14px;
      //让a标签占满布局，使超链接不一定非要点中文字才生效，旁边空白处也可以生效（类似button）。
      display: block;
      //当class="active"的a标签
      &.active {
        color: #ff7300;
      }
    }
  }
}
</style>
