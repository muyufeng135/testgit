import Promise from 'bluebird'
export interface RequestEntity{
    Id:number,
    Requestcode:string,
    Starttime:Date,
    Requestcount:number,
}
export class WebapiService{
    GetRequestList():Promise<any>{
        return new Promise(function(resolve,reject){
            $.ajax({
                url:"/api/Tb_Ts_Request/GetListByParam?sortName=time&role=9&filter=&day=1&status=",
                method:"get",
                contentType:"application/json",
                success:data=>{
                    resolve( data);
                },
                error:err=>{
                    reject(err);
                }
            });
        });
    }

    GetVehicleTypeList():Promise<any>{
        return new Promise(function(resolve,reject){
            $.ajax({
                url:"/api/Sy_Dic/GetDicVehicleType",
                method:"get",
                contentType:"application/json",
                success:data=>{
                    resolve(data);
                },
                error:err=>{
                    reject(err);
                }
            });
        });
    }

    GetRequestStatistic():Promise<any>{
        return new Promise(function(resolve,reject){
            $.ajax({
                url:"/api/Tb_Ts_Request/StatisticCount?role=9&day=1",
                method:"get",
                contentType:"application/json",
                success:data=>{
                    resolve( data);
                },
                error:err=>{
                    reject(err);
                }
            });
        });
    }
}