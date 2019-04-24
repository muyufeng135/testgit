import Vue from 'vue';
import * as request from './test';
//import * as signalr from '@aspnet/signalr';
import 'signalr';
import { WebapiService, RequestEntity } from "./Service";
const service = new WebapiService();
import app from './Child.vue';
Vue.config.devtools = true;
let vehicleTypeList: Array<any>;
window.onload = function () {
    var v = new Vue({
        el: "#app",
        //render:createElment=>createElment(app),
        data: {
            columns: [
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
                // {
                //     field: 'Id',
                //     align: 'center',
                //     title: 'Id'
                // },
                {
                    field: 'Vehicletype',
                    align: 'center',
                    //formatter: 'formatterVehicleType',
                    title: '车辆类型'
                },
                {
                    field: 'Id',
                    align: "center",
                    title: '操作'
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
                var obj = new request.GetTableData(1, 10, "id", "asc");
                obj.GetData().then(data => {
                    console.log(data);
                });
                let entity: request.default;
                //console.log(match);
                if (match.length > 0) {
                    //console.log(match[0].Dicname);
                    return match[0].Dicname;
                } else {
                    return "";
                }
            },
            formatterDate(v: any): string {
                console.log(v);
                let format = "yyyy-MM-dd hh:mm";

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
            },
            formatterAction(value: any): any {
                return "<a data-id='" + value + "' class='customUp glyphicon glyphicon-arrow-up'>&nbsp;&nbsp;</a><a data-id='" + value + "' class='customDown glyphicon glyphicon-arrow-down'></a>";
            }            
        },
        created() {
            let column: Array<any> = this.columns;
            column.forEach(c => {
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
                    case "Id":
                        c.formatter = this.formatterAction;
                        break;
                }
            });
            console.log(this.columns);
            service.GetVehicleTypeList().then(data => {
                vehicleTypeList = data;
                window.localStorage.vehicleTypeList = JSON.stringify(vehicleTypeList);
            });
        },
        mounted(){
            
        }
    });

    // let connection = $.hubConnection("/ServerHub",{
    //     useDefaultPath: false,
    //     qs:"010"
    //     });
    // var contosoChatHubProxy = connection.createHubProxy('ServerHub');
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



