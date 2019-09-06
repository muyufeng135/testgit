<template>
  <div>
    <div class="layui-side layui-bg-black">
      <div
        class="layui-side-scroll"
        style="height:97%;"
      >
        <ul class="layui-nav layui-nav-tree">
          <li
            class="layui-nav-item"
            v-for="(item,i) in this.MenuList"
          >
            <a href="javascript:;"><img
                style="width:25px;height:25px;margin-right:10px;"
                :src="item.Img"
                alt=""
              /><span>{{item.Name}}</span><span class="layui-nav-more"></span></a>
            <dl class="layui-nav-child">
              <dd v-for="(innerVal,idx) in item.Children">
                <router-link to="/request"><i
                    class="layui-icon layui-icon-app"
                    style="margin-right:20px; font-size: 20px;"
                  ></i>{{innerVal.Name}}</router-link>
              </dd>
            </dl>
          </li>
        </ul>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>
<script lang="ts">
declare const layui: any;
let element: any;
import Vue from "vue";
export default Vue.extend({
  data() {
    return {
      tabArr: new Array(),
      MenuList: new Array()
    };
  },
  mounted() {
    $.ajax({
      url: "/api/Sy_Authority/GetListJson?roleid=1",
      success: data => {
        sessionStorage.MenuList = JSON.stringify(data);
        this.MenuList = data;
        layui.use("element", () => {
          element = layui.element; //导航的hover效果、二级菜单等功能，需要依赖element模块
          element.init();
          element.on("tabDelete(tab)", (data: any) => {
            //console.log(data.index);
            this.tabArr.splice(this.tabArr.indexOf(this.tabArr[data.index]), 1);
            //console.log(tabArr);
          });
        });
        //this.LoadMenu(data);
      }
    });
  },
  methods: {
    LoadMenu(data: any) {
      if (data) {
        var str = "";
        data.forEach(function(val: any) {
          str +=
            '<li class="layui-nav-item" style="">' +
            '<a class="javascript:;" href="javascript:;">' +
            '<img src="' +
            val.Img +
            '" style="width:25px;height:25px;margin-right:10px;"></img>' +
            //'<i class="layui-icon ' + val.Icon + '" style="margin-right:10px; font-size: 20px;"></i>'+
            "<span>" +
            val.Name +
            '</span><span class="layui-nav-more"></span></a><dl class="layui-nav-child">';
          if (val.Children) {
            val.Children.forEach(function(innerVal: any, index: number) {
              str +=
                "<dd><a v-link=\"{ name:'" +
                "eqstatus'" +
                '}">' +
                '<i class="layui-icon layui-icon-app" style="margin-right:20px; font-size: 20px;"></i>' +
                innerVal.Name +
                "</a></dd>";
            });
          }
          str += "</dl></li>";
        });
        $(".layui-nav-tree").html(str);
        $(".link").on("click", () => {
          if (this.tabArr.indexOf($(this).attr("id")) > -1) {
            element.tabChange("tab", $(this).attr("id"));
          } else {
            element.tabAdd("tab", {
              title: $(this).text(),
              content:
                '<iframe src="' +
                $(this).attr("url") +
                '" style="width:100%;height:98%;border:0;overflow-y:auto; margin:0; padding:0;"></iframe>',
              id: $(this).attr("id")
            });
            element.tabChange("tab", $(this).attr("id"));
            this.tabArr.push($(this).attr("id"));
            //console.log(tabArr);
          }
        });
      }
    }
  }
});
</script>

