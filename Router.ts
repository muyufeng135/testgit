import Vue from 'vue';
import vueRouter from 'vue-router';
import eqststus from './Components/EQStatus.vue';
import request from './Child.vue';
Vue.use(vueRouter);
export default new vueRouter({
    routes: [              //配置路由，这里是个数组
      {                    //每一个链接都是一个对象
        path: '/Eqstatus',         //链接路径
        name: '',     //路由名称，
        component: eqststus   //对应的组件模板
      },
      {                    //每一个链接都是一个对象
        path: '/reqeust',         //链接路径
        name: '',     //路由名称，
        component: request   //对应的组件模板
      }
    ]
  })