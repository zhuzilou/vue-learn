<template>
<!-- View视图模板 -->
  <div id="app">
    <h1>{{title}}</h1>
    <ul class="todos">
      <li v-for="(todo, index) in todos" :key="todo.id" :id="index" :class="{'checked': todo.done}">
        <label>{{index+1}}.{{todo.value}}</label>
        <time>{{todo.created | date}}</time>
      </li>
    </ul>
  </div>
</template>

<script>
/* Model组件定义*/
import "./assets/todos.less";
import moment from "moment";
import "moment/locale/zh-cn";
moment.locale("zh-cn");

export default {
  name: "app",
  data() {
    return {
      title: "vue-todos",
      todos: [
        {
          id: 1,
          value: "阅读一本关于前端开发的书",
          done: false,
          created: Date.now()
        },
        {
          id: 2,
          value: "补充范例代码",
          done: true,
          created: Date.now() + 300000
        },
        {
          id: 3,
          value: "写心得",
          done: false,
          created: Date.now() - 300000
        }
      ]
    };
  },
  filters: {
    date(val) {
      return moment(val).calendar();
    }
  }
};
</script>

<style>
/*组件样式表*/
</style>
