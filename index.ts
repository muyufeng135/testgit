import Vue from 'vue';
//import './Common/main.js';
// import app from './Parent.vue';
import { WebapiService, RequestEntity } from "./Service";
const service = new WebapiService();
//import * as Common from "./Common/Format";
//const common = new Common.Format();
import app from './Child.vue';
Vue.config.devtools = true;
let vehicleTypeList: Array<any>;
declare var mystatus: number;
window.onload = function () {
    var v = new Vue({
        el: "#app",
        data: {
            Columns: [
                {
                    field: 'Requestuser',
                    align: 'center',
                    title: '申请单位'
                },
                {
                    field: 'Starttime',
                    align: 'center',
                    //formatter: 'formatterDate',
                    title: '发车时间'
                },
                {
                    field: 'Id',
                    align: 'center',
                    title: 'Id'
                },
                {
                    field: 'Vehicletype',
                    align: 'center',
                    //formatter: 'formatterVehicleType',
                    title: '车辆类型'
                }
            ],
            list: [{
                "Requestuser": "sdfsdfdf",
                "Starttime": "2018-11-27",
                "Vehicletype": "sdfsdf",
                "Id": 7897
            }]
        },
        components: {
            app
        },
        methods: {
            formatterVehicleType(value: any): string {

                let match = vehicleTypeList.filter((val: any): any => {
                    return val.Diccode === value;
                });
                //console.log(match);
                if (match.length > 0) {
                    //console.log(match[0].Dicname);
                    return match[0].Dicname;
                } else {
                    return "";
                }
            },
            formatterDate(v: any): string {
                let format: string = "yyyy-MM-dd hh:mm";
                if (!v) return "";
                var d = v;
                if (typeof v === 'string') {
                    if (v.indexOf("/Date(") > -1)
                        d = new Date(parseInt(v.replace("/Date(", "").replace(")/", ""), 10));
                    else {
                        var a = Date.parse(v.replace(/-/g, "/").replace("T", " ").split(".")[0]);
                        if (a.toString() === "NaN") {
                            d = new Date(v);
                        }
                        else {
                            d = new Date(a);//.split(".")[0] 用来处理出现毫秒的情况，截取掉.xxx，否则会出错
                        }
                    }
                }

                var o: any = {
                    "M+": d.getMonth() + 1,  //month
                    "d+": d.getDate(),       //day
                    "h+": d.getHours(),      //hour
                    "m+": d.getMinutes(),    //minute
                    "s+": d.getSeconds(),    //second
                    "q+": Math.floor((d.getMonth() + 3) / 3),  //quarter
                    "S": d.getMilliseconds() //millisecond
                };
                if (/(y+)/.test(format)) {
                    format = format.replace(RegExp.$1, (d.getFullYear() + "").substr(4 - RegExp.$1.length));
                }
                for (var k in o) {
                    if (new RegExp("(" + k + ")").test(format)) {
                        format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
                    }
                }
                return format;
            }
        },
        created() {
            let columns: Array<any> = this.Columns;
            columns.forEach(c => {
                switch (c.field) {
                    case 'Requestcode':
                        c.align = 'center';
                        break;
                    case 'Starttime':
                    case 'Requesttime':
                        c.formatter = this.formatterDate;
                        c.align = 'center';
                        break;
                    case 'Vehicletype':
                        c.formatter = this.formatterVehicleType;
                        break;
                }
            });
            service.GetVehicleTypeList().then(data => {
                vehicleTypeList = data;
                window.localStorage.vehicleTypeList = JSON.stringify(vehicleTypeList);
            });
        }
    });
}



