<template>
    <div class="header">
        {{seller.name}}
        <img :src="seller.avatar" alt="" @click="showDetail">
        <br>
        {{msg}}
        <!-- 弹出层（子组件） -->
        <seller-detail></seller-detail>
    </div>
</template>
<script>
//import {mapActions} from 'vuex'
import {mapGetters} from 'vuex'
import Detail from '../detail/Detail.vue'
export default {
    components: {
        'seller-detail': Detail
    },
    //在组件创建时获取数据
    created() {
        //对应seller.js中的action中的方法
        this.$store.dispatch('getSeller');
    },
    // computed:mapGetters([
    //     'seller'
    // ])
    /**
        使用ES6方式‘...mapGetters’等同于上面写法，
        此写法可以添加自定义计算属性
    */
    computed: {
        ...mapGetters([
            'seller'
        ]),
        //添加自定义计算属性
        msg() {
            return 'welcome to itany'
        }
    },
    methods: {
        showDetail() {
            this.$store.dispatch('showDetail');
        }
    }
}
</script>

<style lang="less" scoped>
    .header {
        height: 134px;
        background-color: rgba(7, 17, 27, 0.1);
        font-size: 14px;
        color: #000;
        img {
            width: 64px;
            height: 64px;
            border-radius: 2ps;
        }
    }
</style>

