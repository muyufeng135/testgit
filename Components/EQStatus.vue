<template>
  <div>
    <table
      id="tb"
      data-toggle="table"
      data-pagination="true"
      data-striped="true"
      data-search="true"
      data-page-list="[50,80,100]"
    ></table>
  </div>
  
</template>
<script lang="ts">
import { formatterDate } from "../Common/tool";
import Vue from "vue";

export default Vue.extend({
  
  data() {
    return {
      beginTime: formatterDate(new Date(), "yyyy-MM-dd hh:mm:ss"),
      endTime: formatterDate(new Date(), "yyyy-MM-dd hh:mm:ss"),
      columns: [
            {
                field: 'idx',
                align: 'center',
                title: '序号'
            },
            {
                field: 'eqname',
                align: 'center',
                title: '设备名称'
            },
            {
                field: 'eqposition',
                align: 'center',
                title: '设备位置'
            },
            {
                field: 'eqtype',
                align: 'center',
                title: '设备类别'
            },
            {
                field: 'ip',
                align: 'center',
                title: 'IP地址'
            },
            {
                field: 'status',
                align: 'center',
                title: '设备状态'
            }
        ]
    };
  },
  created() {
    let column: Array<any> = this.columns;
    column.forEach(c => {
      switch (c.field) {
        case "happentime":
        case "endtime":
          c.formatter = this.formatterDate;
          c.align = "center";
          break;
        case "idx":
          c.formatter = this.formatterIdx;
          c.align = "center";
          break;
        default:
          c.align = "center";
          break;
      }
    });
  },
  methods: {
    formatterDate(val: any) {
      return formatterDate(val, "yyyy-MM-dd hh:mm:ss");
    },
    formatterAction(val: any) {
      return (
        "<a class='edit glyphicon glyphicon-eye-open' title='查看详情' data-id='" +
        val +
        "'></a>"
      );
    },
    formatterIdx(value: any, row: any, index: number, field: any): number {
      return index + 1;
    },
    formatVehicleuse(value: any, row: any, index: number, field: any) {
      var times = row.requesttimes != null ? row.requesttimes : 1;
      return value + ":" + times + "趟";
    },
    LoadData() {
      let _this = this;
      $.ajax({
        url: "/api/HomeContent/GetEquipmentStatusList",
        method: "get",
        contentType: "application/json",
        success: function(data) {
          //$("#tb").bootstrapTable("load", data);
        }
      });
    }
  },
  mounted() {
    let _this = this;
    $("#tb").bootstrapTable({
      columns: this.columns,
      url: "api/HomeContent/GetEquipmentStatusList",
      method: "get"
    });
  }
});
</script>