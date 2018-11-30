

$(function () {
    DisableBack();
});

//阻止浏览器后退
function DisableBack() {
    var counter = 0;
    if (window.history && window.history.pushState) {
        $(window).on('popstate', function () {
            window.history.pushState('forward', null, '#');
            window.history.forward(1);
        });
    }
    window.history.pushState('forward', null, '#'); //在IE中必须得有这两行
    window.history.forward(1);
};
//----------------------------数据请求-------------------------------------------------------------------

$.ajaxSetup({
    cache: false //close AJAX cache
});

/* 
请求Ajax(同步) ，返回字符串
url：请求路径
postData：请求参数
callBack：回调函数
*/
function getAjax(url, postData, callBack) {
    $.ajax({
        url: url,
        type: 'post',
        data: postData,
        dataType: "text",
        cache: false,
        async: false,
        success: function (data) {
            callBack(data);
        },
        error: function (data) {
            alert("error:" + data + "url:" + url);
            Loading(false);
        }
    });
}

/*
请求Ajax(异步)，返回Json
url：请求路径
postData：请求参数
callBack：回调函数
*/
function getJson(url, postData, callBack) {
    $.ajax({
        url: url,
        type: "post",
        data: postData,
        dataType: "json",
        async: true,
        cache: false,
        success: function (data) {
            if (data != null) {
                Loading(false);
                callBack(data);
            }
        },
        error: function (data) {
            //Loading(false);
            //alertDialog(data.responseText, -1);
        }
    });
}

//----------------------------页面同步、刷新-------------------------------------------------------------------

/*
页面中间加载对话窗
*/
function Loading(bool, text) {
    var ajaxbg = top.$("#loading_background,#loading");
    if (!!text) {
        top.$("#loading").css("left", (top.$('body').width() - top.$("#loading").width()) / 2);
        top.$("#loading span").html(text);
    } else {
        top.$("#loading").css("left", "42%");
        top.$("#loading span").html("正在为您加载…");
    }
    if (bool) {
        ajaxbg.show();
    } else {
        ajaxbg.hide();
    }
}

/*
刷新当前页面
*/
function Replace() {
    location.reload();
    return false;
}

/*
iframe同步连接
*/
function iframe_src(iframe, src) {
    Loading(true);
    $("#" + iframe).attr('src', src);
    $("#" + iframe).load(function () {
        Loading(false);
    });
}


//首页选项卡缩放
function ResizePanel() {
    //----缩放首页中top面板
    var hidden = $("#menu").prop("hidden");
    if (hidden == false) {
        $("#menu").prop("hidden", true);
    } else {
        $("#menu").prop("hidden", false);
    }

    //---缩放选项卡内工具栏（条件查询面板）
    var tabs = $('#tabs_container').tabs('getSelected');
    var tab = tabs.panel('options').tab;
    var title = $('.tabs-selected').text()
    var iframeID = getCookie(title);
    iframeID = "tabs_iframe_" + iframeID;
    if (window.frames[iframeID]) {
        var win = document.getElementById(iframeID).contentWindow;
        if (win) {
            try {
                if (hidden == false) {
                    $(win.document).find("#toolbar").prop("hidden", true);//toolbar：选项卡内工具栏(条件查询面板)ID
                } else {
                    $(win.document).find("#toolbar").prop("hidden", false);//toolbar：选项卡内工具栏(条件查询面板)ID
                }
            } catch (err) {
                console.info(err);
            }
        }
    }

    $(window).resize();
}


//----------------------------动态选项卡-----------------------------------------------------------------

/*
动态新增选项卡
tabid：选项卡id
title  ：选项卡标题
url    ：选项卡内容页路径
icon  ：选项卡图标名称
*/
function AddTabMenu(tabid, title, url, icon) {
    Loading(true);
    var content = '<iframe style="width:100%;height:99%;border:0;overflow: hidden; margin:0; padding:0;" id="tabs_iframe_' + tabid + '"   name="' + title + '"   src="' + url + '" scrolling="no"></iframe>';
    if ($("#tabs_container").tabs("exists", title)) {
        $("#tabs_container").tabs("select", title);
    } else {
        $("#tabs_container").tabs("add", {
            title: title,
            content: content,
            closable: true,
            icon: icon
        });
    }
    Loading(false);
}

//----------------------------弹出窗口--------------------------------------------------------------------

/*打开网页 window.open
/*url:          表示请求路径
/*windowname:   定义页名称
/*width:        宽度
/*height:       高度
*/
function OpenWindow(url, title, w, h) {
    var width = w;
    var height = h;
    var left = ($(window).width() - width) / 2;
    var top = ($(window).height() - height) / 2;
    window.open(url, title, 'height=' + height + ', width=' + width + ', top=' + top + ', left=' + left + ', toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no, titlebar=yes, alwaysRaised=yes');
}

/*
打开弹出框函数
id:窗口ID
diagUrl:路径
diagTitle：标题
diagWidth：宽度
diagHeight：高度
*/
function openDialog(id, diagUrl, diagTitle, diagWidth, diagHeight) {
    var diagID = 'newDialog';
    if (id) {
        diagID = id;
    }
    if (!diagTitle) diagTitle = '弹出框';
    if (!diagWidth || diagWidth == 0) {
        diagWidth = $(document.body).outerWidth(true);
        if (diagWidth < 640) {
            diagWidth = 640;
        } else {
            diagWidth -= 60;
        }
    }
    if (!diagHeight || diagHeight == 0) {
        diagHeight = $(document.body).outerHeight(true);
        if (diagHeight < 300) {
            diagHeight = 300;
        } else {
            diagHeight -= 60;
        }
    }
    if ($('#' + diagID).length <= 0) {
        $('<div />', { id: diagID }).appendTo('body');
    }
    //创建对话框
    $('#' + diagID).dialog({
        title: diagTitle, href: diagUrl,
        width: diagWidth, height: diagHeight,
        closable: true, fit: false, collapsible: false, resizable: false,
        minimizable: false, maximizable: false, shadow: true, modal: true, cache: true,
        iconCls: 'icon-view', loadingMessage: '正在载入...',
        onClose: function () {
            try {
                $('#' + diagID).dialog('destroy');
            } catch (e) {
                alert('关闭自定义弹出框失败: ' + e.message);
            }
        }
    });
}

/*
打开弹出框函数
diagUrl:路径
diagTitle：标题
diagWidth：宽度
diagHeight：高度
*/
function openHrefDialog(diagUrl, diagTitle, diagWidth, diagHeight) {
    var diagID = 'newDialog';
    if (!diagTitle) diagTitle = '弹出框';
    if (!diagWidth || diagWidth == 0) {
        diagWidth = $(document.body).outerWidth(true);
        if (diagWidth < 640) {
            diagWidth = 640;
        } else {
            diagWidth -= 60;
        }
    }
    if (!diagHeight || diagHeight == 0) {
        diagHeight = $(document.body).outerHeight(true);
        if (diagHeight < 300) {
            diagHeight = 300;
        } else {
            diagHeight -= 60;
        }
    }
    if ($('#' + diagID).length <= 0) {
        $('<div />', { id: diagID }).appendTo('body');
    }
    //创建对话框
    $('#' + diagID).dialog({
        title: diagTitle, href: diagUrl,
        width: diagWidth, height: diagHeight,
        closable: true, fit: false, collapsible: false, resizable: false,
        minimizable: false, maximizable: false, shadow: true, modal: true, cache: true,
        iconCls: 'icon-view', loadingMessage: '正在载入...',
        onClose: function () {
            try {
                $('#' + diagID).dialog('destroy');
            } catch (e) {
                alert('关闭自定义弹出框失败: ' + e.message);
            }
        }
    });
}

/*
弹出窗体window
id:弹出层id
title：标题
href：路径
width：宽度
height：高度
modal：弹出模式（true：模态弹出）
minimizable:是否显示最小化
maximizable：是否显示最大化
callback：关闭窗口回调函数
*/
function alertWindow(id, title, href, width, height, modal, maximized, minimizable, maximizable, callback) {
    if (!title) title = "弹出窗体";
    if (!id) id = "operation_Window";

    //设置弹出位置
    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;
    var setWidth = (windowWidth - width) / 2;
    var setHeight = (windowHeight - height) / 2;

    parent.$('#' + id).window({
        //标题
        title: title,
        //宽度
        width: width === undefined ? 600 : width,
        //高度
        height: height === undefined ? 400 : height,
        top: setHeight,
        left: setWidth,
        //弹出内容
        content: '<iframe scrolling="yes" frameborder="0"  src="' + href + '" style="width:100%;height:99%;margin:0px; padding:0px"></iframe>',
        //是否模态弹出
        modal: modal === undefined ? true : modal,
        //是否最小化
        minimizable: minimizable === undefined ? false : minimizable,
        //是否最大化
        maximizable: maximizable === undefined ? false : maximizable,
        shadow: false,
        cache: true,
        //默认初始化是否关闭面板
        closed: false,
        //面板是否可折叠
        collapsible: true,
        resizable: false,
        //是否可拖拽
        draggable: true,
        loadingMessage: '正在加载数据，请稍等......',
        //关闭窗口时执行
        onClose: function () {
            if (callback) {
                callback();
            }
        },
        maximized: maximized === undefined ? false : maximized
    });
}


//----------------------------数据格式转换(数字、日期)----------------------------------------------------------------

/** 
*数字保留两位小数 
*@x要转换的数字
*/
function toDecimal(x) {
    var f = parseFloat(x);
    if (isNaN(f)) {
        return;
    }
    f = Math.round(x * 100) / 100;
    return f;
}

/**
格式化时间显示方式、用法:format="yyyy-MM-dd hh:mm:ss";
*/
formatDate = function (v, format) {
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

    var o = {
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
};

//datagrid格式化时间显示方式 格式默认为: yyyy-MM-dd hh:mm:ss
function formatterDate(value) {
    return formatDate(value, 'yyyy-MM-dd hh:mm');
}

//yyyy-MM-dd HH:mm:ss格式的字符串转日期
function stringToDate(str) {
    var tempStrs = str.split(" ");
    var dateStrs = tempStrs[0].split("-");
    var year = parseInt(dateStrs[0], 10);
    var month = parseInt(dateStrs[1], 10) - 1;
    var day = parseInt(dateStrs[2], 10);
    var timeStrs = tempStrs[1].split(":");
    var hour = parseInt(timeStrs[0], 10);
    var minute = parseInt(timeStrs[1], 10);
    var second = parseInt(timeStrs[2], 10);
    var date = new Date(year, month, day, hour, minute, second);
    return date;
}


/*
获取不同时间类型的时间间隔（毫秒）
startTime：开始时间（xxxx-xx-xx）
endTime：结束时间（xxxx-xx-xx）
时间类型：second、minute、hour、day
*/
function GetDateDiff(startTime, endTime, diffType) {
    //将xxxx-xx-xx的时间格式，转换为 xxxx/xx/xx的格式
    startTime = startTime.replace(/-/g, "/");
    endTime = endTime.replace(/-/g, "/");
    //将计算间隔类性字符转换为小写
    diffType = diffType.toLowerCase();
    var sTime = new Date(startTime); //开始时间
    var eTime = new Date(endTime); //结束时间
    //作为除数的数字
    var divNum = 1;
    switch (diffType) {
        case "second":
            divNum = 1000;
            break;
        case "minute":
            divNum = 1000 * 60;
            break;
        case "hour":
            divNum = 1000 * 3600;
            break;
        case "day":
            divNum = 1000 * 3600 * 24;
            break;
        default:
            break;
    }
    return parseInt((eTime.getTime() - sTime.getTime()) / parseInt(divNum)); //17jquery.com
}


/*
获取两个时间间隔时长
startTime：开始时间（毫秒数）
endTime：结束时间（毫秒数）
返回格式：*天*时*分前
*/
function GetTimeSpan(startTime, endTime) {
    var date = endTime - startTime;
    //计算出相差天数
    var days = Math.floor(date / (24 * 3600 * 1000))
    //计算出小时数
    var leave1 = date % (24 * 3600 * 1000)    //计算天数后剩余的毫秒数
    var hours = Math.floor(leave1 / (3600 * 1000))
    //计算相差分钟数
    var leave2 = leave1 % (3600 * 1000)        //计算小时数后剩余的毫秒数
    var minutes = Math.floor(leave2 / (60 * 1000))
    var result = days + "天 " + hours + "时 " + minutes + " 分前";
    return result;
}


/*
获取系统时间
*/
function GetCurDate() {
    var curDate = new Date();
    return curDate;
}

/*
获取系统时间的前后n天日期
count:当前时间之前为正数，当前时间之后为负数
*/
function GetPreNextDate(count) {
    var millisecond = 24 * 60 * 60 * 1000;
    var vDate = new Date(GetCurDate().getTime() - millisecond * count);  //前一天
    return vDate;
}

//获得本月的开始日期
function getMonthStartDate() {
    var now = new Date(); //当前日期
    var nowYear = now.getYear(); //当前年
    nowYear += (nowYear < 2000) ? 1900 : 0;
    var nowMonth = now.getMonth(); //当前月
    var monthStartDate = new Date(nowYear, nowMonth, 1);
    return formatterDate(monthStartDate);
}
//获得本月的结束日期
function getMonthEndDate() {
    var now = new Date(); //当前日期
    var nowYear = now.getYear(); //当前年
    nowYear += (nowYear < 2000) ? 1900 : 0;
    var nowMonth = now.getMonth(); //当前月
    var monthEndDate = new Date(nowYear, nowMonth, getMonthDays(nowMonth));
    return formatterDate(monthEndDate);
}

//获得某月的天数
function getMonthDays(myMonth) {
    var now = new Date(); //当前日期
    var nowYear = now.getYear(); //当前年
    var monthStartDate = new Date(nowYear, myMonth, 1);
    var monthEndDate = new Date(nowYear, myMonth + 1, 1);
    var days = (monthEndDate - monthStartDate) / (1000 * 60 * 60 * 24);
    return days;
}
//当前日期前一天
function preDay() {
    var date = new Date();
    var day = date.getDate() - 1 > 9 ? date.getDate() - 1 : "0" + date.getDate() - 1;
    var month = (date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : "0" + (date.getMonth() + 1);
    var hor = date.getHours();
    var min = date.getMinutes();
    var sec = date.getSeconds();
    return date.getFullYear() + '-' + month + '-' + day + " " + hor + ":" + min + ":" + sec;
};

//----------------------------数据格式转换(返回数组value)-------------------------------------------------------------------

/*
@obj:数组对象
@key:查找key
@返回对于value
*/
function formatterDicMap(obj, key) {
    var _val = '';
    $.each(obj, function (i, item) {
        if (item.ID == key) {
            _val = item.NAME;
            return;
        }
    })
    return _val;
}


//----------------------------导出、下载-------------------------------------------------------------------

//导出Excel
function ExportExcelFile(actionUrl, formID) {

    if (formID && formID != undefined) {
        formID = '#' + formID;
    } else {
        formID = 'form:first';
    }
    var formdataString = $(formID).serialize();
    downloadFile(actionUrl + '?edata=&' + formdataString);

}
//下载文件(urlFile：文件地址)
function downloadFile(urlFile) {
    if (!document.getElementById('_SAVEASFILE_TEMP_FRAME')) {
        $('<iframe id="_SAVEASFILE_TEMP_FRAME" name="_SAVEASFILE_TEMP_FRAME" onload="_doSaveAsFile();" style="display:none;" width="0" height="0" src="about:blank"></iframe>').appendTo('body');
    }
    if (document.getElementById('_SAVEASFILE_TEMP_FRAME').src != urlFile) {
        document.getElementById('_SAVEASFILE_TEMP_FRAME').src = urlFile;
    } else {
        _doSaveAsFile();
    }
}
//打开另存为对话框
function _doSaveAsFile() {
    if (document.getElementById('_SAVEASFILE_TEMP_FRAME').src != 'about:blank') {
        debugger
        document.getElementById('_SAVEASFILE_TEMP_FRAME').document.execCommand('SaveAs', 'true');
    }
}


//--------------------------cookie管理----------------------------------------------------------------------

//存放cookie
function setCookie(name, value) {
    var Days = 30;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString() + ";path=/";
}
//获取cookie
function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}

//存放LocalStorage
function setLocalStorage(name, value) {
    localStorage.setItem(name, value);
}

//获取LocalStorage
function getLocalStorage(name) {
    return localStorage.getItem(name);
}

//----------------------------定时器管理---------------------------------------------------------------------
//启动选项卡内的定时器
//title：选项卡页title
function startTimer(title) {
    var iframeID = getLocalStorage(title);
    iframeID = "tabs_iframe_" + iframeID;
    if (window.frames[iframeID]) {
        var win = document.getElementById(iframeID).contentWindow;
        if (win) {
            try {
                win.startInterval();
            } catch (err) {
            }
        }
    }
}
//停止选项卡内的定时器
//title：选项卡页title
function stopTimer(title) {
    var iframeID = getLocalStorage(title);
    iframeID = "tabs_iframe_" + iframeID;
    if (window.frames[iframeID]) {
        var win = document.getElementById(iframeID).contentWindow;
        if (win) {
            try {
                win.stopInterval();
            } catch (err) {
                console.info(err);
            }
        }
    }

}
//页面中启动定时器方法
function startInterval() {
    //具体页面重写此方法
}
//页面中停止定时器方法
function stopInterval() {
    //具体页面重写次方法
}

//----------------------------报警声音管理-------------------------------------------------------------------
//注：页面内使用的audio标签默认ID为audioSoundAlarm，下面函数才能生效
//开始报警
function BeginSoundAlarm() {
    var _objSoundAlarm = $('#audioSoundAlarm');
    if (_objSoundAlarm) {
        _objSoundAlarm[0].play();
    }
}
//停止报警
function EndSoundAlarm() {
    var _objSoundAlarm = $('#audioSoundAlarm');
    if (_objSoundAlarm) {
        _objSoundAlarm[0].pause();
    }
}

function BeginSensorSoundAlarm(soundId) {
    var _objSoundAlarm = $('#' + soundId);
    if (_objSoundAlarm) {
        _objSoundAlarm[0].play();
    }
}
//停止报警
function EndSensorSoundAlarm(soundId) {
    var _objSoundAlarm = $('#' + soundId);
    if (_objSoundAlarm) {
        _objSoundAlarm[0].pause();
    }
}
//-----------------------------------ajax loading animation------------------------------------------------------------------------
function ajaxLoading(text) {
    $("<div class=\"datagrid-mask\"></div>").css({ display: "block", width: "100%", height: $(window).height() }).appendTo("body");
    if (text) {
        $("<div class=\"datagrid-mask-msg\"></div>").html(text).appendTo("body").css({ display: "block", left: ($(document.body).outerWidth(true) - 190) / 2, top: ($(window).height() - 45) / 2 });
    } else {
        $("<div class=\"datagrid-mask-msg\"></div>").html("正在处理，请稍候。。。").appendTo("body").css({ display: "block", left: ($(document.body).outerWidth(true) - 190) / 2, top: ($(window).height() - 45) / 2 });
    }
}
function ajaxLoadEnd() {
    $(".datagrid-mask").remove();
    $(".datagrid-mask-msg").remove();
}

//-----------------------------------ip 网关 子网掩码 验证------------------------------------------------------------------------
//验证IP
function checkIP(ip) {
    obj = ip;
    var exp = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
    var reg = obj.match(exp);
    if (reg == null) {
        return false;//不合法
    }
    else {
        return true; //合法
    }
}
//验证子网掩码
function checkMask(mask) {
    obj = mask;
    var exp = /^(254|252|248|240|224|192|128|0)\.0\.0\.0|255\.(254|252|248|240|224|192|128|0)\.0\.0|255\.255\.(254|252|248|240|224|192|128|0)\.0|255\.255\.255\.(254|252|248|240|224|192|128|0)$/;
    var reg = obj.match(exp);
    if (reg == null) {
        return false; //"非法"
    }
    else {
        return true; //"合法"
    }
}

//校验ip、子网掩码、网关的合法性
function checkNet(ip, mask, gw) {
    if (ip == mask || mask == gw || mask == gw) {
        return "IP地址与子网掩码、网关地址不能相同"; //3个地址不能相同
    }
    var static_ip_arr = new Array;
    var static_mask_arr = new Array;
    var static_gw_arr = new Array;

    static_ip_arr = ip.split(".");
    static_mask_arr = mask.split(".");
    static_gw_arr = gw.split(".");

    var res0 = parseInt(static_ip_arr[0]) & parseInt(static_mask_arr[0]);
    var res1 = parseInt(static_ip_arr[1]) & parseInt(static_mask_arr[1]);
    var res2 = parseInt(static_ip_arr[2]) & parseInt(static_mask_arr[2]);
    var res3 = parseInt(static_ip_arr[3]) & parseInt(static_mask_arr[3]);

    var res0_gw = parseInt(static_gw_arr[0]) & parseInt(static_mask_arr[0]);
    var res1_gw = parseInt(static_gw_arr[1]) & parseInt(static_mask_arr[1]);
    var res2_gw = parseInt(static_gw_arr[2]) & parseInt(static_mask_arr[2]);
    var res3_gw = parseInt(static_gw_arr[3]) & parseInt(static_mask_arr[3]);

    if (res0 == res0_gw && res1 == res1_gw && res2 == res2_gw && res3 == res3_gw) {
        return true;
    } else {
        return false;
    }
}

function CurrentUser() {
    if (localStorage.User) {
        return JSON.parse(localStorage.User);
    } else {
        top.window.location.href = "/Home/Login";
    }
}

// 判断是否有权限 add by zy 20180906 图表点击权限判断
function checkAuth(item) {
    if (sessionStorage.MenuList) {
        var list = JSON.parse(sessionStorage.MenuList);
        for (var i = 0; i < list.length; i++) {
            if (list[i].hasOwnProperty('Url')) {
                if (list[i]['Url'] == item) {
                    return true;
                }
            } else {
                if (list[i].hasOwnProperty('Children')) {
                    for (var j = 0; j < list[i]['Children'].length; j++) {
                        if (list[i]['Children'][j]['Url'] == item) {
                            return true;
                        }
                    }
                }
            }
        }
    }
    return false;
}