import Vue from 'vue';
import './Common/main.js';
// import app from './Parent.vue';
import { WebapiService, RequestEntity } from "./Service";
const service = new WebapiService();
//import * as Common from "./Common/Format";
//const common = new Common.Format();
import app from './Child.vue';
Vue.config.devtools = true;
let vehicleTypeList:Array<any>;
declare var mystatus:number;
window.onload = function () {
    var v = new Vue({
        el: "#app",
        data: {
            status:mystatus,
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
            list:[{
                "Requestuser":"sdfsdfdf",
                "Starttime":"2018-11-27",
                "Vehicletype":"sdfsdf",
                "Id":7897
            }]
        },
        components: {
            app
        },
        methods: {
            formatterVehicleType(value:any): string {
                let match=vehicleTypeList.filter((val:any):any=>{
                    return val.Diccode===value;
                });
                //console.log(match);
                if(match.length>0){
                    //console.log(match[0].Dicname);
                    return match[0].Dicname;
                }else{
                    return "";
                }
            }
        },
        created() {
            mystatus=1;
            console.log("value:"+status);
            let columns: Array<any> = this.Columns;
            columns.forEach(c => {
                switch (c.field) {
                    case 'Requestcode':
                        c.align = 'center';
                        break;
                    case 'Starttime':
                    case 'Requesttime':
                        c.formatter = formatterDate;
                        c.align = 'center';
                        break;
                    case 'Vehicletype':
                        c.formatter = this.formatterVehicleType;
                        break;
                }
            });
            service.GetVehicleTypeList().then(data=>{
                vehicleTypeList=data;
                window.localStorage.vehicleTypeList=JSON.stringify(vehicleTypeList);
            });
        }
    });
}



