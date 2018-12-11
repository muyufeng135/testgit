<template>
  <div>
    <div style="height:50px;line-height:50px;background-color:#f7f7f7;padding-left:20px;font-size: 18px;">
      <button
        id="exprot"
        style="background-color:#00CD00;"
        class='execute-btn btn'
        onclick="Exprot()"
      >导出用车计划表</button>
      <button
        id="exprotmodi"
        style="background-color:#00CD00;"
        class='execute-btn btn'
        onclick="Exprotmodi()"
      >导出用车摸底表</button>
      <button
        class='execute-btn btn btn-success btn-day'
        data-val='1'
      >今天<span class='badge'></span></button>
      <button
        class='execute-btn btn btn-day'
        data-val='2'
      >明天<span class='badge'></span></button>
      <span id="statusgroup"></span>
      <button
        class='execute-btn btn btn-warning stc'
        data-val='time'
      >按用车时间统计</button>
      <button
        class='execute-btn btn stc'
        data-val='department'
      >按用车部门统计</button>
      <button
        class='execute-btn btn stc'
        data-val='type'
      >按车辆类型统计</button>
    </div>
    <div
      id="stcgroupContainer"
      style="height:36px;background-color:#f7f7f7;padding-left:20px;font-size: 18px;"
    >
      <span
        id="stcgroup"
        style="float:right;"
      ></span>
    </div>
    <table
      id="tb"
      data-toggle="table"
      data-pagination="true"
      data-page-list="[10,15,20]"
    >
    </table>
    <input type="text" v-model="Name" name="" id="">
    <input type="text" v-model="Url" name="" id="">
    <input type="text" name="" id="" v-model="fixed">
    <input type="checkbox" name="cbxteam" id="weilong" value="1"><label for="weilong">威龙车队</label> 
    <input type="checkbox" name="cbxteam" id="tatong" value="2"><label for="tatong">塔通运输</label> 
    <input type="checkbox" name="cbxteam" id="shengchan" value="3"><label for="shengchan">生产车队</label> 
    <input type="button" value="submit" v-on:click="clickModifyfunction()">
  </div>
</template>
<script lang="ts">
// import $ from 'jquery'
//import * as Common from "./Common/Format";
import Vue from "vue";
// import bootstrap from "bootstrap";
//import bootstrapTable from 'bootstrap-table'
// import './node_modules/bootstrap/dist/js/bootstrap.min.js'
// import "./node_modules/bootstrap-table/dist/bootstrap-table.min.js";
import './Style/bootstrap-table.js'
import "./Style/bootstrap.js";
import "./Style/bootstrap-table-zh-CN.js";
import { WebapiService, RequestEntity } from "./Service";
//const common = new Common.Format();
let day: number = 1;
let sortName: string = "time";
let UserType:number=9;

export default Vue.extend({
  name: "parent",
  props: ["Columns", "status"],
  data() {
    return {
      Name: "child request",
      Url:
        "/api/Tb_Ts_Request/GetListByParam?sortName=time&role=9&filter=&day=1&status="
    };
  },
  methods: {
    
    clickModifyfunction() {
      let checked=$("[name='cbxteam']:checked").val();
      console.log(checked);
      this.fixed="sdkfjsk,diosf@123.com";
      //this.$emit("updateByChild", [this.Name, this.Url]);
    },
    formattervehicletype(diccode: string): string {
      var typeList = JSON.parse(window.localStorage.vehicleTypeList);
      let match = typeList.filter(
        (val: any): any => {
          return val.Diccode === diccode;
        }
      );
      //console.log(match);
      if (match.length > 0) {
        //console.log(match[0].Dicname);
        return match[0].Dicname;
      } else {
        return "";
      }
    },
    formatterStatus(value: any) {
      if (UserType == 9 || UserType == 1) {
        //调度、管理员
        if (value == 1) {
          return '<span class="label label-success">审批已通过</span>';
        } else if (value == 5) {
          return '<span class="label label-warning">审批未通过</span>';
        } else if (value == 2) {
          return '<span class="label label-info">审批中</span>';
        } else if (value == 0) {
          return '<span class="label label-danger">待审批</span>';
        } else if (value == 4) {
          return '<span class="label label-primary">已派车</span>';
        } else if (value == 7) {
          return '<span class="label label-primary">已指派车队</span>';
        }
      } else if (UserType == 5) {
        //车队
        if (value == 7) {
          return '<span class="label label-success">已指派车队</span>';
        } else {
          return '<span class="label label-danger">未指派车队</span>';
        }
      } else {
        //塔通、威龙、生产
        switch (value) {
          case 4:
            return '<span class="label label-success">已派车</span>';
          case 1:
            return '<span class="label label-warning">未派车</span>';
          default:
            return "";
        }
      }
    },
    RetrieveStatistic() {
      let that = this;
      $("#stcgroup").empty();
      $.ajax({
        url: "api/Tb_Ts_Request/StatisticCount?role=9" + "&day=" + day,
        success: function(data) {
          if (data) {
            switch (sortName) {
              case "time":
                var time = data.filter(function(val: any) {
                  return val.type == "time";
                });
                if (time.length > 16) {
                  $("#stcgroupContainer").css("height", "74px");
                  if (window.screen.width < 1920) {
                    $("#tb_div").height(640);
                  } else {
                    $("#tb_div").height(800);
                  }
                } else {
                  $("#stcgroupContainer").css("height", "36px");
                  if (window.screen.width < 1920) {
                    $("#tb_div").height(670);
                  } else {
                    $("#tb_div").height(800);
                  }
                }
                time.forEach(function(item: any) {
                  $("#stcgroup").append(
                    $(
                      "<button class='filter-btn btn time' data-val='" +
                        item.val +
                        "'>" +
                        item.val +
                        ":00 " +
                        "<span class='badge'>" +
                        item.mount +
                        "</span></button>"
                    )
                  );
                });
                break;
              case "department":
                var department = data.filter(function(val: any) {
                  return val.type == "department";
                });
                if (department.length > 16) {
                  $("#stcgroupContainer").css("height", "74px");
                  if (window.screen.width < 1920) {
                    $("#tb_div").height(640);
                  } else {
                    $("#tb_div").height(800);
                  }
                } else {
                  $("#stcgroupContainer").css("height", "36px");
                  if (window.screen.width < 1920) {
                    if (department.length > 12) {
                      $("#stcgroupContainer").css("height", "74px");
                    }
                    $("#tb_div").height(670);
                  } else {
                    $("#tb_div").height(800);
                  }
                }
                department.forEach(function(item: any) {
                  $("#stcgroup").append(
                    $(
                      "<button class='filter-btn btn department' data-val='" +
                        item.val +
                        "'>" +
                        item.val +
                        "<span class='badge'>" +
                        item.mount +
                        "</span></button>"
                    )
                  );
                });
                break;
              case "type":
                var vehicletype = data.filter(function(val: any) {
                  return val.type == "vehicletype";
                });
                if (vehicletype.length > 16) {
                  $("#stcgroupContainer").css("height", "74px");
                  if (window.screen.width < 1920) {
                    $("#tb_div").height(640);
                  } else {
                    $("#tb_div").height(800);
                  }
                } else {
                  $("#stcgroupContainer").css("height", "36px");
                  if (window.screen.width < 1920) {
                    $("#tb_div").height(670);
                  } else {
                    $("#tb_div").height(800);
                  }
                }
                vehicletype.forEach(function(item: any) {
                  $("#stcgroup").append(
                    $(
                      "<button class='filter-btn btn type' data-val='" +
                        item.val +
                        "'>" +
                        that.formattervehicletype(item.val) +
                        "<span class='badge'>" +
                        item.mount +
                        "</span></button>"
                    )
                  );
                });
                break;
            }
            var statusList = data.filter(function(val: any) {
              return val.type == "status";
            });
            $("#statusgroup").empty();
            statusList.forEach(function(item: any) {
              $("#statusgroup").append(
                $(
                  "<button class='filter-btn btn status' data-val='" +
                    item.val +
                    "'>" +
                    that.formatterStatus(item.val) +
                    "<span class='badge'>" +
                    item.mount +
                    "</span></button>"
                )
              );
            });
          }
        }
      });
    }
  },
  mounted() {
    $("#tb").bootstrapTable({
      columns: this.Columns
    });
    //$('#tb').bootstrapTable('load', this.data);
    let service = new WebapiService();
    service.GetRequestList().then(data => {
      $("#tb").bootstrapTable("load", data);
      this.RetrieveStatistic();
    });
    service.GetRequestStatistic().then(data => {
      var time = data.filter((val: any, idx: number) => {
        return val.type == "time";
      });
      time.forEach((item: any) => {
        $("#stcgroup").append(
          $(
            "<button class='filter-btn btn time' data-val='" +
              item.val +
              "'>" +
              item.val +
              ":00 " +
              "<span class='badge'>" +
              item.mount +
              "</span></button>"
          )
        );
      });
    });
    this.$nextTick(function() {
      let that = this;
      $(".stc").click(function() {
        $(".btn-warning").removeClass("btn-warning");
        $(this).addClass("btn-warning");
        $("#stcgroup").empty();
        $("#statusgroup").empty();
        day = parseInt($(".btn-success").attr("data-val") as string);
        sortName = $(this).attr("data-val") as string;
        that.RetrieveStatistic();
      });
    });
  },
  created() {
    console.log(this.status);
  },
  computed:{
    fixed:{
      get():string{
        return this.Name+","+this.Url;
      },
      set(newVal:string){
        this.Url=newVal.split(',')[0];
        this.Name=newVal.split(',')[1];
      }
    }
  }
});
</script>
<style>
 /* @import './node_modules/bootstrap/dist/css/bootstrap.css';
 @import './node_modules/bootstrap-table/dist/bootstrap-table.css';  */
@import "./Style/bootstrap.css";
@import "./Style/bootstrap-table.css";
</style>




