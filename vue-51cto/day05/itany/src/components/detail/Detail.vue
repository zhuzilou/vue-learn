<template>
  <!-- 添加动画提示，从右进入 -->
  <transition
    enter-active-class="animated slideInRight"
    leave-active-class="animated slideOutRight"
  >
    <!-- v-show控制是否显示 -->
    <div class="detail" v-show="detailShow">详情页
      <br>
      <br>
      <h2>{{seller.name}}</h2>
      <br>
      <h2>{{seller.bulletin}}</h2>
      <br>
      <ul>
        <li v-for="item in seller.supports" :key="item.type">{{item.description}}</li>
      </ul>
      <button @click="hideDetail" class="close">关闭</button>
    </div>
  </transition>
</template>

<script>
import { mapGetters } from "vuex";
import "animate.css/animate.css";
export default {
  data() {
    return {
      //使用vuex替代局部变量，通过父组件传递属性值
      showDetail: false
    };
  },
  computed: {
    ...mapGetters(["detailShow", "seller"])
  },
  methods: {
    hideDetail() {
      this.$store.dispatch("hideDetail");
    }
  }
};
</script>

<style lang="less" scoped>
//div铺满全屏
.detail {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 666;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(7, 17, 27, 0.8);
  color: #fff;
  .close {
    position: absolute;
    bottom: 50px;
    left: 45%;
  }
}
</style>
