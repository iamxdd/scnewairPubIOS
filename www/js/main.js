// var provinceAjax="http://xsscd.xicp.net:5100";
// var cityAjax="http://xsscd.xicp.net:";
var bottomFooterHeight=58;
var provinceAjax="http://www.scnewair.cn:3389";
//var provinceAjax="http://10.190.1.11:5132";
//var cityAjax="http://www.scnewair.cn:";

var  myURL = "http://www.scnewair.cn:3393/rx_data";
var testUrl = "http://www.scnewair.cn:3393/rx_data/station/findAll";



// var  myURL = "http://10.190.1.110:8080/rx_data";
// var testUrl = "http://10.190.1.110:8080/rx_data/station/findAll";

var waterUrl = "http://221.237.179.75:9090/scszjcsj/szjc_sj";
var config1 = {
    http:function (url,method,params,fn) {

        var needurl = testUrl+url;
        $.ajax({
            url:needurl,
            type:method,
            data:params,
            dataType:'json',
            async:true,
            success:function (data) {
                var newary=data.slice(0, 50)
                console.log(data)
                console.log(newary)
                fn(data)
            },
            error:function (err) {
                //alert("连接失败,请检查网络后重启此程序");
                tool.warningAlert("warAFailed","获取地图信息失败");
            },

        })
    },
    http1:function (url,method,params,fn) {
        var needurl = provinceAjax+url;
        $.ajax({
            url:needurl,
            type:method,
            data:params,
            dataType:'json',
            async:true,
            success:function (data) {
                fn(data)
            },
            error:function (err) {
                //alert("连接失败,请检查网络后重启此程序");
                tool.warningAlert("warAFailed","获取地图信息失败");
            },
        })
    }
}
var config={
    //用户登录
    // Login:'http://10.190.3.3:3390/rx_data/alarm/login',
    logIn:'/alarm/login',
    //城市列表查询
    cityList:'http://www.scnewair.cn:3389/dataShare/getCity',
    findCity:'/city/findcity',
    //关注列表查询
    followingCity:'/attention/findcity',
    //关注城市保存
    saveCity:'/attention/save',
    //删除关注城市
    deleteCity:'/attention/delete',
    //根据角色查询所有异常消息
    findAlarm:'/alarm/find',
    //根据角色按区域时间查询
    findByAreaTimeAlarm:'/alarm/findByAreaTime',
    //根据某一天某一地具体查询异常消息
    findByAreaDetailAlarm:'/alarm/findByAreaDetail',
    //根据城市ID查找异常信息
    findByIdAlarm:'/alarm/findById',
    //提交异常信息进程
    updateAlarm:'/alarm/update',
    //阀值保存
    SaveThreshold:'/threshold/save',
    //阀值查询
    Findthreshold:'/threshold/find',
    //水站测管协同数量查询
    waterAbnormalCount:'/findAlarmDataCount',
    //市州异常数量查询
    waterAbnormal:'/findAlarmDataCountOfArea',
    //根据地区、流域查询
    findbyBasinArea:'/findAlarmDataByTime',
    //水质地区详情
    findbyTimeArea:'/findAlarmDataByCity',
    //水质流域详情
    findbyTimeBasin:'/findAlarmDataByArea',
    //水质站点详情
    findbyID:'/findAlarmDataByStation',
    //水质测管协同按类型查询
    findbyAbnormalType:'/findAlarmDataByType',
    //水质测管协同详情
    findAbnormalDetail:'/findAlarmDataByTimeAndCode',
    //查找关注模块
    findmodule:'/module/findmodule',
    //查找水质关注模块
    findwatermodule:'/module/water/findmodule',
    //增加关注模块
    addmodule:'/module/add',
    //增加水质关注模块
    addwatermodule:'/module/water/add',
    //删除关注模块
    deletemodule:'/module/delete',
    //删除水质关注模块
    deletewatermodule:'/module/water/delete',
    //未读消息状态保存
    savemsgStatus:'/cache/save',
    //未读消息整体保存
    saveCache:'/cache/saveBatch',
    //测管协同无数据等按照时间查询
    findAbnormalbytime:'/alarm/findByTypeAndTime',
    //测管协同无数据等按照具体时间点查询
    findAbnormalbyday:'/alarm/findcount',
    //水质地图
    waterMapHourData:'/findPublishHourData',
    //水质地图站点详情
    waterStationDetail:'/findRealTimeDataById',
    //水质历史日数据
    waterPastDayData:'/getPastDayData',
    //水质历史小时数据
    waterPasHourData:'/water/findByMonth',
    //水质未读消息保存
    waterSaveCache:'/deleteReadFlag',
    //区县站点实时数据
    siteCountryData:'/station/stationReal',
    //区县站小时历史数据
    stationHourHis:'/station/stationHourHis',
    //区县站日历史数据
    stationDayHis:'/station/stationDayHis',
    //大气测管协同统计
    findAirCount:'/statistic/countAlarm',
    //大气测管协同统计详情
    findAirCountDetail:'/statistic/findAlarmByCity'
}
// http://10.190.1.4:20017/rx_data/alarm/find?role=1&UserId=145
localStorage.code="5100";
localStorage.loginUrl=provinceAjax;
var forecastRange;
var app = {
    initialize: function() {
        this.bindEvents();
    },
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    onDeviceReady: function() {
        tool.onDeviceReady();
    }
};

app.initialize();
//路由设置
var router=new $.mobile.Router(
    {
        "#login": {handler: "login", events: "bc,c,i,bs,s,bh,h" },
        "#indexPage": {handler: "indexPage", events: "bc,c,i,bs,s,bh,h" },
        "#cityPage": {handler: "cityPage", events: "bc,c,i,bs,s,bh,h" },
        "#waterPage": {handler: "waterPage", events: "bc,c,i,bs,s,bh,h" },
        "#dataAuditPage": {handler: "dataAuditPage", events: "bc,c,i,bs,s,bh,h" },
        "auditStationDetail": {handler: "auditStationDetail", events: "bc,c,i,bs,s,bh,h" },
        "#auditStationAuditListDetail": {handler: "auditStationAuditListDetail", events: "bc,c,i,bs,s,bh,h" },
        "#auditPage": {handler: "auditPage", events: "bc,c,i,bs,s,bh,h" },
        "#abnormalPage": {handler: "abnormalPage", events: "bc,c,i,bs,s,bh,h" },
        "#citylistPage":{handler: "citylistPage", events: "bc,c,i,bs,s,bh,h"},
        "#sitelistPage":{handler: "sitelistPage", events: "bc,c,i,bs,s,bh,h"},
        "#siteDetailPage":{handler: "siteDetailPage", events: "bc,c,i,bs,s,bh,h"},
        "#abnormalSubPage":{handler: "abnormalSubPage", events: "bc,c,i,bs,s,bh,h"},
        "#cityRankPage": {handler: "cityRankPage", events: "bc,c,i,bs,s,bh,h" },
        "#dataStatisticsDetailPage": {handler: "dataStatisticsDetailPage", events: "bc,c,i,bs,s,bh,h" },
        "#abnarmalCountDetailPage": {handler: "abnarmalCountDetailPage", events: "bc,c,i,bs,s,bh,h" },
        "#forePubPage": {handler: "forePubPage", events: "bc,c,i,bs,s,bh,h" },
        "#settingPage": {handler: "settingPage", events: "bc,c,i,bs,s,bh,h" },
        "#followingPage":{handler: "followingPage", events: "bc,c,i,bs,s,bh,h"},
        "#AbnromalfollowingPage":{handler: "AbnromalfollowingPage", events: "bc,c,i,bs,s,bh,h"},
        "#thresholdSetPage":{handler: "thresholdSetPage", events: "bc,c,i,bs,s,bh,h"},
        "#infomationPage": {handler: "infomationPage", events: "bc,c,i,bs,s,bh,h" }
    },{
        login: function(type,match,ui){
            if(type=="pageshow"){
                menuFunction.login_init();
            }
        },
        indexPage: function(type,match,ui){
            if(type=="pagebeforeshow"){
                tool.footerMenuInit("indexPage","indexPage");
            }
            if(type=="pageshow"){
                tool.topRightMenu("indexPage");
                menuFunction.indexmap_init();
                // navigator.splashscreen.hide();
            }
        },
        dataAuditPage:function(type,match,ui){
            if(type=="pagebeforeshow"){
                tool.footerMenuInit("dataAuditPage","dataAuditPage");
            }
            if(type=="pageshow"){
                tool.topRightMenu("dataAuditPage");
                menuFunction.dataAuditPage_init();
            }
        },
        // auditStationDetail: function(type,match,ui){
        //     if(type=="pagebeforeshow"){
        //         tool.footerMenuInit("auditStationDetail","auditPage");
        //     }
        //     if(type=="pageshow"){
        //         var citycode;
        //         var arr=match[1];
        //         citycode=arr.replace(/citycode=/,"");
        //         tool.topRightMenu("dataAuditPage");
        //         menuFunction.auditStationDetail_init(citycode);
        //     }
        // },
        auditStationDetail: function(type,match,ui){
            if(type=="pagebeforeshow"){
                tool.footerMenuInit("dataAuditPage","dataAuditPage");
            }
            if(type=="pageshow"){
                tool.topRightMenu("dataAuditPage");
                menuFunction.auditStationDetail_init();
            }
        },
        cityPage: function(type,match,ui){
            if(type=="pageshow"){
                outerWidthForAll=$("#login").outerWidth();
                var citycode;
                if(match[1]){
                    var arr=match[1];
                    citycode=arr.replace(/citycode=/,"");
                    if(citycode==""){
                        citycode=tool.localCityWorkForSichuan();
                    }
                    if(citycode=="5100"){
                        citycode=5101
                    }
                    tool.topRightMenu("cityPage");
                    menuFunction.cityPage_init(citycode);
                }else{
                    // var myCity = new BMap.LocalCity();
                    // myCity.get(tool.getCityByIP);
                    // citycode=tool.localCityWorkForSichuan();
                    navigator.geolocation.getCurrentPosition(function(position){
                        //onSuccees
                        // alert(position.coords.latitude + "<br>" + position.coords.longitude);
                        var localmap = new BMap.Map("allmap");
                        var point = new BMap.Point(position.coords.longitude,position.coords.latitude);
                        var geoc = new BMap.Geocoder();
                        geoc.getLocation(point, function(rs){
                            var addComp = rs.addressComponents;
                            citycode=tool.localCityWorkForSichuan(addComp.city);
                            if(citycode=="5100"){
                                citycode=5101
                            }
                            tool.topRightMenu("cityPage");
                            menuFunction.cityPage_init(citycode);
                        });
                    } ,function(){
                        //onError
                    } ,{ maximumAge: 3000, timeout: 5000, enableHighAccuracy: true });
                }
            }
        },
        waterPage: function(type,match,ui){
            if(type=="pagebeforeshow"){
                tool.footerMenuInit("auditPage","auditPage");
            }
            if(type=="pageshow"){
                tool.topRightMenu("auditPage");
                menuFunction.waterDetailPage_init();
            }
        },
        auditPage: function(type,match,ui){
            console.log("---->")
            console.log(type)
            console.log(match)
            console.log(ui)
            if(type=="pagebeforeshow"){
                tool.footerMenuInit("auditPage","auditPage");
            }
            if(type=="pageshow"){
                tool.topRightMenu("auditPage");
                menuFunction.auditPage_init();
            }
        },
        abnormalPage:function(type,match,ui){
            if(type=="pagebeforeshow"){
                tool.footerMenuInit("auditPage","auditPage");
            }
            if(type=="pageshow"){
                tool.topRightMenu("abnormalPage");
                menuFunction.abnormalPage_init();
            }
        },
        citylistPage: function(type,match,ui){
            if(type=="pagebeforeshow"){
                tool.footerMenuInit("auditPage","auditPage");
            }
            if(type=="pageshow"){
                tool.topRightMenu("citylistPage");
                menuFunction.citylistPage_init();
            }
        },
        sitelistPage: function(type,match,ui){
            if(type=="pagebeforeshow"){
                tool.footerMenuInit("auditPage","auditPage");
            }
            if(type=="pageshow"){
                tool.topRightMenu("sitelistPage");
                menuFunction.sitelistPage_init();
            }
        },
        siteDetailPage: function(type,match,ui){
            if(type=="pagebeforeshow"){
                tool.footerMenuInit("auditPage","auditPage");
            }
            if(type=="pageshow"){
                tool.topRightMenu("siteDetailPage");
                menuFunction.siteDetailPage_init();
            }
        },
        abnormalSubPage: function(type,match,ui){
            if(type=="pagebeforeshow"){
                tool.footerMenuInit("auditPage","auditPage");
            }
            if(type=="pageshow"){
                tool.topRightMenu("abnormalSubPage");
                menuFunction.dataAbnormalSubPage_init();
            }
        },
        dataStatisticsDetailPage: function(type,match,ui){
            if(type=="pageshow"){
                tool.topRightMenu("dataStatisticsDetailPage");
                menuFunction.dataStatisticsDetailPage_init();
            }
        },
        abnarmalCountDetailPage: function(type,match,ui){
            if(type=="pageshow"){
                tool.topRightMenu("abnarmalCountDetailPage");
                menuFunction.abnarmalCountDetailPage_init();
            }
        },
        auditStationAuditListDetail: function(type,match,ui){
            if(type=="pagebeforeshow"){
                tool.footerMenuInit("auditStationAuditListDetail","auditPage");
            }
            if(type=="pageshow"){
                var stationcode;
                var citycode;
                var arr=match[1].split("&");
                citycode=arr[0].replace(/citycode=/,"");
                stationcode=arr[1].replace(/stationcode=/,"");
                menuFunction.auditStationAuditListDetail_init(citycode,stationcode);
            }
        },
        cityRankPage: function(type,match,ui){
            if(type=="pagebeforeshow"){
                tool.footerMenuInit("cityRankPage","cityRankPage");
            }
            if(type=="pageshow"){
                tool.topRightMenu("cityRankPage");
                menuFunction.cityRankPage_init();
            }
        },
        forePubPage:function(type,match,ui){
            if(type=="pagebeforeshow"){
                tool.footerMenuInit("forePubPage","forePubPage");
            }
            if(type=="pageshow"){
                tool.topRightMenu("forePubPage");
                menuFunction.forePubPage_init();
            }
        },
        settingPage:function(type,match,ui){
            if(type=="pageshow"){
                menuFunction.settingPage_init();
            }
        },
        followingPage: function(type,match,ui){
            if(type=="pagebeforeshow"){
                tool.footerMenuInit("auditPage","auditPage");
            }
            if(type=="pageshow"){
                tool.topRightMenu("followingPage");
                menuFunction.followingPage_init();
            }
        },
        AbnromalfollowingPage: function(type,match,ui){
            if(type=="pageshow"){
                tool.topRightMenu("AbnromalfollowingPage");
                menuFunction.AbnromalfollowingPage_init();
            }
        },
        thresholdSetPage: function(type,match,ui){
            if(type=="pagebeforeshow"){
                tool.footerMenuInit("auditPage","auditPage");
            }
            if(type=="pageshow"){
                tool.topRightMenu("thresholdSetPage");
                menuFunction.thresholdSetPage_init();
            }
        },
        infomationPage:function(type,match,ui){
            if(type=="pageshow"){
                console.log("-------->")
                $("#airShow").addClass("spanShow");
                $("#water").hide();
                $("#air").show();
                tool.instructionsMenu("infomationPage");
                menuFunction.infomationPage_init();
                menuFunction.infomationPage_init2();
            }
        }
    }, {
        defaultHandler: function(type, ui, page) {
        },
        defaultHandlerEvents: "s",
        defaultArgsRe: true
    }
);
