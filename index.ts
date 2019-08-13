import Vue from 'vue';
import * as signalR from '@aspnet/signalr';
import navigator from './Components/navigator.vue';
Vue.config.devtools = true;
import vueRouter from "vue-router";
import eqststus from "./Components/EQStatus.vue";
import request from "./Child.vue";
// import "./Scripts/bootstrap.min.js";
// import "./Scripts/bootstrap-table.js";
Vue.use(vueRouter);
let router = new vueRouter({
  routes: [
    //配置路由，这里是个数组
    {
      //每一个链接都是一个对象
      path: "/Eqstatus", //链接路径
      name: "", //路由名称，
      component: eqststus //对应的组件模板
    },
    {
      //每一个链接都是一个对象
      path: "/request", //链接路径
      name: "", //路由名称，
      component: request //对应的组件模板
    }
  ]
});
window.onload = function () {
  var v = new Vue({
    el: "#app",
    router,
    data: {

    },
    components: {
      'App': navigator
    },
    methods: {

    },
    created() {

    },
    mounted() {

    }
  });

  const connection = new signalR.HubConnectionBuilder()
    .withUrl("http://192.168.132.254:5000/ServiceHub",{skipNegotiation: true,
      transport: signalR.HttpTransportType.WebSockets})
    .build();

  //connection.start().catch(err => console.log("错误消息:"+ err));
  connection.start().then(function () {
    console.log("connected");
  }).catch(err => console.log("错误消息:"+ err));
  connection.on("clientHandler", (message: string) => {
    console.log(message);
  });


  // let connection = $.hubConnection("/MessageHub",{
  //     useDefaultPath: false,
  //     qs:"010"
  //     });
  // var contosoChatHubProxy = connection.createHubProxy('MessageHub');
  // contosoChatHubProxy.on("clientHandler", (message: string) => {
  //     console.log(message);
  // });
  // connection.start().done((connection) => {
  //     console.log('Now connected, connection ID=' + connection.id);
  //     contosoChatHubProxy.invoke("Hello");
  // }).fail((error) => {
  //     console.log('连接失败' + error);
  //     console.log('Could not connect');
  // });

}



