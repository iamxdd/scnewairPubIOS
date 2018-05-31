var mapIndex;
var mapCity;
var scorll;
var mapForecast;
var mapZoomindex7=0;
var mapZoomindex8=0;
var menuFunction={
    login_init:function(){
        $("#loginPage_Content").html("");
        var loginDiv = $("<div class='loginItem'></div>");
        var logoDiv = $("<div id='logo'></div>")
        var title = $("<p id='loginTitle'>测管协同</p>")
        var inputGroup = $("<div class='inputGroup'><div class='nameInput'><input data-role='none' type='text' name='username' id='username'/></div>" +
            "<div class='pswInput'><input data-role='none' type='password' name='password' id='password'/></div></div>")
        var CityList = [{CITYNAME:'省级',CITYCODE:5100},{CITYNAME:'成都市',CITYCODE:5101},
            {CITYNAME:'自贡市',CITYCODE:5103},{CITYNAME:'攀枝花市',CITYCODE:5104},{CITYNAME:'泸州市',CITYCODE:5105},
            {CITYNAME:'德阳市',CITYCODE:5106},{CITYNAME:'绵阳市',CITYCODE:5107},{CITYNAME:'广元市',CITYCODE:5108},
            {CITYNAME:'遂宁市',CITYCODE:5109},{CITYNAME:'内江市',CITYCODE:5110},{CITYNAME:'乐山市',CITYCODE:5111},
            {CITYNAME:'南充市',CITYCODE:5113},{CITYNAME:'眉山市',CITYCODE:5114},{CITYNAME:'宜宾市',CITYCODE:5115},
            {CITYNAME:'广安市',CITYCODE:5116},{CITYNAME:'达州市',CITYCODE:5117},{CITYNAME:'雅安市',CITYCODE:5118},
            {CITYNAME:'巴中市',CITYCODE:5119},{CITYNAME:'资阳市',CITYCODE:5120},{CITYNAME:'阿坝州',CITYCODE:5132},
            {CITYNAME:'甘孜州',CITYCODE:5133},{CITYNAME:'凉山州',CITYCODE:5134}];
        var select = $("<select data-role='none' id='citySelector'></select>")
        var button = $("<button data-role='none' id='loginSubmit'>登&emsp;录</button>")
        var saveButton = $("<div data-role='none' id='saveButton'><label id='savetext'>记住账号</label><input type='checkbox' id='saveAccount'></div>")
        $.each(CityList,function(k,v){
            var option = $("<option value='"+v.CITYCODE+"'>"+v.CITYNAME+"</option>");
            select.append(option)
        })
        loginDiv.append(logoDiv)
        loginDiv.append(title)
        loginDiv.append(inputGroup)
        loginDiv.append(saveButton)
        loginDiv.append(select)
        loginDiv.append(button)
        $("#loginPage_Content").append(loginDiv)
        /*$('.inputGroup input').on('focus',function(event){
            var target = this;
            console.log("----target>")
            console.log(target)
            setTimeout(function(){
                target.scrollIntoviewIfNeeded();
            },10);
        });*/
        var cookieName=localStorage.userName;
        var cookiePsw=localStorage.passWord;
        var cookiecode=localStorage.citycode;
        if(cookieName&&cookiePsw){
            $("#username").val(cookieName);
            $("#password").val(cookiePsw);
            $("#citySelector").val(cookiecode)
            $(".loginItem input[type='checkbox']").attr("checked", true);
        }
        $("#username").change(function(){
            $(".loginItem input[type='checkbox']").attr("checked", false);
        })
        $("#password").change(function(){
            $(".loginItem input[type='checkbox']").attr("checked", false);
        })

        $("#loginSubmit").click(function(){
            var citycode = $("#citySelector").find("option:selected").val()
            var type;
            citycode!=='5100'?type=citycode:type="all"
            var userName = $("#username").val();
            var psw = $("#password").val();
            $.ajax({
                type:"GET",
                url:myURL+"/alarm/login"+"?username="+userName+"&password="+psw+"&type="+type,
                async:true,
                error:function(err){
                    tool.warningAlert("warAFailed","登录失败！请稍后重试")
                    console.log(err)
                },
                success:function(data){
                    if(data.result==true){
                        if($(".loginItem input[type='checkbox']").is(':checked')==true){
                            localStorage.userName=userName;
                            localStorage.passWord=psw;
                        }
                        var selectCityName = $("#citySelector").find("option:selected").text();
                        localStorage.loginName=userName;
                        console.log(localStorage.loginName)
                        localStorage.Name=data.userName;
                        localStorage.userid=data.userId;
                        localStorage.role=data.roles;
                        localStorage.citycode=citycode;
                        localStorage.code="5100";
                        localStorage.cityname=selectCityName;
                        sessionStorage.setItem("footerwarning","1")
                        //menuFunction.footWarningNum_init();
                        menuFunction.indexmap_init();
                        sessionStorage.setItem("mapChooseBar","0")
                        sessionStorage.setItem("maptype",'air')
                        sessionStorage.setItem("refresh","1")
                        $.mobile.changePage("#indexPage");
                    }else if(data.result==false){
                        tool.warningAlert("warAFailed","登录失败！"+data.reason)
                    }
                }
            })
        })
    },
    jpushEventListener_init:function(){
        try {
            //本地通知，测试
            window.plugins.jPushPlugin.init();
            window.plugins.jPushPlugin.getRegistrationID(function (id) {
                //将获取到的id存入服务端
                alert('id:'+id);
                // $('#customID').html(id);
            });

            //点击通知栏的回调，在这里编写特定逻辑
            window.plugins.jPushPlugin.openNotificationInAndroidCallback = function (data) {
                console.log(data);
                $('#message').html(data);
                $('#message').html(JSON.stringify(data));
            }
            //清空本地消息
            window.plugins.jPushPlugin.clearLocalNotifications();
            //发送本地消息
            // alert(device.platform);
            window.plugins.jPushPlugin.setDebugMode(true);
            window.plugins.jPushPlugin.addLocalNotification(0, '消息内容', '消息标题', 0, 1000,
                JSON.stringify({
                    "alert": "你好 , 这是灵动工大推送的一条信息",
                    "extras": {
                        "cn.jpush.android.MSG_ID": "692692481",
                        "app": "com.jiusem.jingle",
                        "cn.jpush.android.ALERT": "详细内容",
                        "cn.jpush.android.EXTRA": "{'article_id':1}", //文章id
                        "cn.jpush.android.PUSH_ID": "692692481",
                        "cn.jpush.android.NOTIFICATION_ID": 692692481,
                        "cn.jpush.android.NOTIFICATION_TYPE": "0"
                    }
                }));

            //alert(device.platform);
        } catch (e) {
            // alert(e.number);
            alert(e.message);
        }
        // window.plugins.jPushPlugin.init();
        // document.addEventListener("jpush.setTags", onTagsWithAlias, false);
        // var onTagsWithAlias = function(event){
        //     try {
        //         console.log("onTagsWithAlias");
        //         var result = "result code:" + event.resultCode + " ";
        //         result += "tags:" + event.tags + " ";
        //         result += "alias:" + event.alias + " ";
        //         $("#tagAliasResult").html(result);
        //     } catch(exception) {
        //         console.log(exception);
        //     }
        // }
    },
    footWarningNum_init:function(){
        var userid = localStorage.userid;
        var userName = localStorage.loginName;
        // var userName = "杨渊_1"
        $.ajax({
            type: "POST",
            url: myURL + "/alarmavg/findCountAvg",
            data: {
                UserId: userid,
            },
            async:false,
            error:function(err){
                console.log("error exits!"+err)
            },
            success:function(data){
                if(data){
                    var dataJson = eval('('+data+')')
                    // localStorage.abnormalCountWarning = parseInt(dataJson['数据超过阀值'])+ parseInt(dataJson['数据离群'])+  parseInt(dataJson['数据恒定'])+ parseInt(dataJson['无数据'])+ parseInt(dataJson['测管协同I级响应'])+parseInt(dataJson['测管协同II级响应'])+parseInt(dataJson['测管协同III级响应']);
                    localStorage.abnormalAirCountWarning = parseInt(dataJson['测管协同I级响应'])+parseInt(dataJson['测管协同II级响应'])+parseInt(dataJson['测管协同III级响应']);
                }else{
                    localStorage.abnormalAirCountWarning = 0;
                }
                console.log(localStorage.abnormalAirCountWarning)
            }
        })
        $.ajax({
            type:"GET",
            dataType: "json",
            url:waterUrl+config.waterAbnormalCount,
            data: {
                name: userName
            },
            error:function(err){
                console.log("err exites!")
                console.log(err)
            },
            success: function (data) {
                console.log(data)
                if(data){
                    var jsonCount = data;
                    localStorage.abnormalWaterCountWarning = parseInt(jsonCount[4])+parseInt(jsonCount[5])+parseInt(jsonCount[6]);
                    // jsonCount[4]一级 jsonCount[5]二级 jsonCount[6]三级
                }else{
                    localStorage.abnormalWaterCountWarning=0;
                }
                console.log(localStorage.abnormalWaterCountWarning)
            }
        })
    },
    indexmap_init:function(){
        $("#indexMapChooseBar").children("div").unbind().click(function(){
            var type=$(this).attr("type");
            $(".indexMapActive").removeClass("indexMapActive");
            $(this).addClass("indexMapActive");
            if(type=="airmap"){
                $("#maping").hide();
                $("#indexWaterChangeBar").hide();
                $("#indexWaterMap").hide();
                $("#WaterMapMarkBar").hide();
                $("#WaterMapSiteBar").hide();
                $("#waterindexPageMapTime").hide();
                $("#indexGasChangeBar").show();
                $("#indexPageMap").show();
                $("#indexPageMapTime").show();
                $("#indexPageMapMarkBar").show();
                sessionStorage.setItem("mapChooseBar","0")
                sessionStorage.setItem("maptype",'air')
                menuFunction.indexPage_init();
            }else if(type=="environmentmap"){
                $("#indexGasChangeBar").hide();
                $("#indexPageMap").hide();
                $("#indexWaterMap").hide();
                $("#indexPageMapTime").hide();
                $("#waterindexPageMapTime").hide();
                $("#WaterMapMarkBar").hide();
                $("#indexWaterChangeBar").hide();
                $("#indexPageMapMarkBar").hide();
                $("#WaterMapSiteBar").hide();
                $("#maping").show();
                // $("#indexEnvMap").show();
                sessionStorage.setItem("mapChooseBar","2")
                sessionStorage.setItem("maptype",'env')
                // menuFunction.enmapindexPage_init();
            }else if(type=="watermap"){
                $("#indexGasChangeBar").hide();
                $("#indexPageMap").hide();
                $("#indexPageMapTime").hide();
                $("#indexPageMapMarkBar").hide();
                $("#indexWaterMap").show();
                $("#indexWaterChangeBar").show();
                $("#WaterMapMarkBar").show();
                $("#WaterMapSiteBar").show();
                $("#waterindexPageMapTime").show();
                $("#maping").hide();
                sessionStorage.setItem("mapChooseBar","1")
                sessionStorage.setItem("maptype",'water')
                menuFunction.watermapindexPage_init();
            }
        });
        var mapChooseBarStatus = sessionStorage.getItem('mapChooseBar')
        mapChooseBarStatus ? $("#indexMapChooseBar").find("div").eq(mapChooseBarStatus).click() : $("#indexMapChooseBar").find("div").eq(2).click();
    },
    getBoundaty:function(map){
        var bdary = new BMap.Boundary();
        bdary.get("四川省", function(rs){       //获取行政区域
            //map.clearOverlays();        //清除地图覆盖物
            var count = rs.boundaries.length; //行政区域的点有多少个
            if (count === 0) {
                console.log('未能获取当前输入行政区域');
                return ;
            }
            var pointArray = [];
            for (var i = 0; i < count; i++) {
                var ply = new BMap.Polygon(rs.boundaries[i], {strokeWeight: 2, strokeColor: "#e99477",fillOpacity: 0.05, fillColor: "none"}); //建立多边形覆盖物
                map.addOverlay(ply);  //添加覆盖物
                pointArray = pointArray.concat(ply.getPath());
            }
            // map.setViewport(pointArray);    //调整视野
        });
    },
    //环境质量地图
    enmapindexPage_init:function(){
        envmap = new BMap.Map("indexEnvMap");
        var pointIndex = new BMap.Point(104.86,29.67);
        tool.mapAddStyle(envmap);
        envmap.enableScrollWheelZoom();
        envmap.enableDragging();
        envmap.addEventListener('dragend',function () {
            var obj = {};
            var bs = envmap.getBounds();   //获取可视区域
            var bssw = bs.getSouthWest();   //可视区域左下角
            var bsne = bs.getNorthEast();   //可视区域右上角
            var zoomindex = envmap.getZoom();
            obj.lngmax = bsne.lng;
            obj.lngmin = bssw.lng;
            obj.latmax = bsne.lat;
            obj.latmin = bssw.lat;
            tool.mapSetFreshZoom(envmap,obj,zoomindex)
        });
        envmap.centerAndZoom(pointIndex,7);
        menuFunction.indexPage_mapMark("AQI")
    },
    //空气地图
    indexPage_init:function(){
        sessionStorage.setItem("indexmapflag6","1")
        sessionStorage.setItem("indexmapflag7","1")
        sessionStorage.setItem("indexmapflag8","1")
        sessionStorage.setItem("allCityChange","1")
        var maptypeStatu = sessionStorage.getItem("maptype");
        var code = localStorage.code;
        var gas;





        $("#indexPageMapMarkBar").css("bottom",$("#indexPage").children(".ui-footer").outerHeight()+"px");
        if(maptypeStatu == "air"){
            map = new BMap.Map("indexPageMap",{minZoom:6,maxZoom:13});//添加地图
        }
        tool.mapAddStyle(map);
        map.enableScrollWheelZoom();//启用滚轮放大缩小，默认禁用
        map.enableDragging();//启用地图拖拽，默认启用
        map.addEventListener('dragend',function () {
            var obj = {};
            var bs = map.getBounds();   //获取可视区域
            var bssw = bs.getSouthWest();   //可视区域左下角
            var bsne = bs.getNorthEast();   //可视区域右上角
            var zoomindex = map.getZoom();
            obj.lngmax = bsne.lng;
            obj.lngmin = bssw.lng;
            obj.latmax = bsne.lat;
            obj.latmin = bssw.lat;
            tool.mapSetFreshZoom(map,obj,zoomindex)
        });

        //更具地图层级大小却换地图视觉加载数据
        map.addEventListener("zoomend", function(){
            console.log("mapzoomlistener",map.getZoom())
            var flag6 = sessionStorage.getItem("indexmapflag6");
            var flag7 = sessionStorage.getItem("indexmapflag7");
            var flag8 = sessionStorage.getItem("indexmapflag8");
            var zoomindex = this.getZoom();
            console.log(zoomindex)
            menuFunction.getBoundaty(map);
            if(zoomindex>=8){
                if(flag8==="1"){
                    menuFunction.getGas(zoomindex,map);
                    sessionStorage.setItem("indexmapflag8","0")
                    sessionStorage.setItem("indexmapflag7","1")
                    sessionStorage.setItem("indexmapflag6","1")
                }
            }else if(zoomindex==7){
                if(flag7==="1"){
                    menuFunction.getGas(zoomindex,map);
                    sessionStorage.setItem("indexmapflag8","1")
                    sessionStorage.setItem("indexmapflag7","0")
                    sessionStorage.setItem("indexmapflag6","1")
                }
            }else if(zoomindex<7){
                if(flag6==="1"){
                    menuFunction.getGas(zoomindex,map);
                    sessionStorage.setItem("indexmapflag8","1")
                    sessionStorage.setItem("indexmapflag7","1")
                    sessionStorage.setItem("indexmapflag6","0")
                }
            }
        });
       // sessionStorage.setItem("allCityChange","1")
       /* $("#subSiteChange img").attr("src","img/mapParam/every.png")
        //切换站点类型更换地图内容
        $("#subSiteChange img").unbind().click(function(){
            var changeFlag = sessionStorage.getItem("allCityChange")
            switch (changeFlag){
                case '1':
                    $("img.subSite").attr("src","img/mapParam/gk.png");
                    sessionStorage.setItem("allCityChange","2");
                    break;
                case '2':
                    $("img.subSite").attr("src","img/mapParam/prc.png");
                    sessionStorage.setItem("allCityChange","3");
                    break;
                case '3':
                    $("img.subSite").attr("src","img/mapParam/every.png");
                    sessionStorage.setItem("allCityChange","1");
                    break;
                default:
                    return 0;
            }
            mapZoomindex7=0;
            mapZoomindex8=0;
            //menuFunction.indexPage_mapMark(map)
            menuFunction.getGas(8,map);
        })  */

        sessionStorage.setItem("allCityChange","2")
        $("#subSiteChange img").attr("src","img/mapParam/gk.png")
        //切换站点类型更换地图内容
        $("#subSiteChange img").unbind().click(function(){
            var changeFlag = sessionStorage.getItem("allCityChange")
            switch (changeFlag){
                case '1':
                    $("img.subSite").attr("src","img/mapParam/gk.png");
                    sessionStorage.setItem("allCityChange","2");
                    break;
                case '2':
                    $("img.subSite").attr("src","img/mapParam/prc.png");
                    sessionStorage.setItem("allCityChange","3");
                    break;
                case '3':
                    $("img.subSite").attr("src","img/mapParam/every.png");
                    sessionStorage.setItem("allCityChange","1");
                    break;
                default:
                    return 0;
            }
            mapZoomindex7=0;
            mapZoomindex8=0;
            //menuFunction.indexPage_mapMark(map)
            var allOverlay = map.getOverlays();
            for (var i = 0; i < allOverlay.length - 1; i++) {
                if (allOverlay[i] instanceof BMap.Marker) {
                   if (allOverlay[i].getTitle() == "station") {
                       map.removeOverlay(allOverlay[i]);
                    }
                }
            }

            menuFunction.getGas(8,map);
        })

        //切换气体参数更换地图内容
        $("#indexGasChangeBar").children("div").unbind().click(function(){
            gas=$(this).attr("gas");
            var mapbarname="map"+gas+"rank.png";
            $("#indexPageMapMarkBar").css("background-image","url(img/mapParam/"+mapbarname.toLowerCase()+")");
            $(".indexGasActive").removeClass("indexGasActive");
            $(this).addClass("indexGasActive");
            sessionStorage.setItem("activeGas",gas)
            console.log("clearOverlays-->")
            console.log(map.getZoom())
            map.clearOverlays();
            mapZoomindex7=0;
            mapZoomindex8=0;
            menuFunction.getGas(map.getZoom(),map);
            //menuFunction.indexPage_mapMark(map);
        });

        if(localStorage.code=="5100"){
            $("#indexPageHeaderName").text("四川省环境质量地图");
            var pointIndex = new BMap.Point(104.86,30.27);
            map.centerAndZoom(pointIndex,7);
        }else{
            $.each(cityMapDetail,function(i,item){
                if(item.cityCode==localStorage.code){
                    $("#indexPageHeaderName").text(item.cityName);
                    $("#indexStatPageTitleName").text(item.cityName);
                    var p0=((item.point).split("|"))[0];
                    var p1=((item.point).split("|"))[1];
                    p0=parseFloat(p0);
                    p1=parseFloat(p1);
                    var pointIndex = new BMap.Point(p0,p1);
                    map.centerAndZoom(pointIndex,11);
                }
            })
        }

        $("#indexGasChangeBar").children("div").eq(0).click();

        //点击后查看城市详情
        $("#airDetail").unbind().click(function(){
            $.mobile.changePage("#cityPage?citycode="+code,{transition:"slide"});
        })

        //点击刷新图标时重新加载地图
        $("#indexPageRefresh").unbind().click(function(){
            var indexchoosebar = $(".indexMapActive").attr("type");
            if(indexchoosebar=='airmap'){
                 mapZoomindex7=0;
                 mapZoomindex8=0;
                menuFunction.indexPage_init();
            }else if(indexchoosebar=='watermap'){
                menuFunction.watermapindexPage_init();
            }
        });
    },
    //水质地图
    watermapindexPage_init:function(){
        var maptypeStatu = sessionStorage.getItem("maptype");
        $("#indexWaterChangeBar").children("div").unbind().click(function(){
            var water=$(this).attr("water");
            sessionStorage.setItem("waterpollutype",water)
            $(".indexWaterActive").removeClass("indexWaterActive");
            $(this).addClass("indexWaterActive");
            menuFunction.indexPage_waterMark(water);
            $("#subSiteChange").fadeOut();
        });
        if(maptypeStatu == 'water'){
            watermap = new BMap.Map("indexWaterMap",{minZoom:6,maxZoom:13});
        }
        tool.mapAddStyle(watermap);
        watermap.enableScrollWheelZoom();
        watermap.enableDragging();
        watermap.addEventListener('dragend',function () {
            var obj = {};
            var bs = watermap.getBounds();   //获取可视区域
            var bssw = bs.getSouthWest();   //可视区域左下角
            var bsne = bs.getNorthEast();   //可视区域右上角
            var zoomindex = watermap.getZoom();
            obj.lngmax = bsne.lng;
            obj.lngmin = bssw.lng;
            obj.latmax = bsne.lat;
            obj.latmin = bssw.lat;
            tool.mapSetFreshZoom(watermap,obj,zoomindex)
        });
        var pointIndex = new BMap.Point(104.86,30.27);
        watermap.centerAndZoom(pointIndex,7);
        $("#WaterMapMarkBar").css("background-image","url(img/mapParam/waterBar.png)");
        $("#WaterMapMarkBar").css("bottom",$("#indexPage").children(".ui-footer").outerHeight()+"px");
        $("#indexWaterChangeBar").children("div").eq(0).click();
    },
    indexPage_mapMark:function(map){
        var gas = sessionStorage.getItem("activeGas")
        if(localStorage.code=="5100") {
            var zoomindex=map.getZoom();
            config1.http1('/publish/getAllCityRealTimeAQIC', 'post', {}, function (data) {
                //menuFunction.getBoundaty(map);
                //map.clearOverlays();
                var indexTime = new Date(data.timePoint);
                var timearr = tool.publishNotAuditTime(indexTime);
                $("#indexPageMapTime").text(timearr + " (实时数据,尚未审核)");
                $.each(data.data, function (i, item) {
                    $.each(cityMapDetail, function (j, itemj) {
                        if (itemj.cityCode == item.columns.CITYCODE) {
                            var itemEach = {};
                            itemEach.CITYCODE = item.columns.CITYCODE;
                            itemEach.CITY = item.columns.CityName;
                            item.columns.CITYNAME == '西昌' ? itemEach.CITYNAME = '凉山州' : item.columns.CITYNAME == '康定' ? itemEach.CITYNAME = '甘孜州' : item.columns.CITYNAME == '马尔康' ? itemEach.CITYNAME = '阿坝州' : itemEach.CITYNAME = item.columns.CITYNAME;

                            itemEach.POINT = itemj.point;
                            itemEach.VALUE = eval("item.columns." + gas);
                            itemEach.GAS = gas;
                            if (gas == "AQI") {
                                if (!item.columns["INDEX_MARK"]) {
                                    var level = tool.levelReturn("AQI", "—");
                                    itemEach.VALUE = "—";
                                } else {
                                    var level = tool.levelReturn("AQI", item.columns[gas]);
                                }
                            } else {
                                if (!item.columns[gas + "_MARK"] || !item.columns["INDEX_MARK"]) {
                                    var level = tool.levelReturn("AQI", "—");
                                    itemEach.VALUE = "—";
                                } else {
                                    var level = tool.levelReturn("AQI", item.columns["I" + gas]);
                                }
                            }
                            var color = tool.levelColor(level);
                            itemEach.COLOR = color;
                            sessionStorage.setItem("siteDetailType", "air")
                            tool.mapAddMark(map, itemEach, "menuFunction.changeToCityPage(" + itemEach.CITYCODE + ")", "city", "city", zoomindex);
                        }
                    });
                });
            })
        }
        var maptypeStatu = sessionStorage.getItem("maptype");
        if(maptypeStatu == 'air'){
            var zoomindex=map.getZoom();
            menuFunction.getGas(zoomindex,map);
        }

    },
    getGas:function(zoomindex,map) {
        setTimeout(function() {
            var gas = sessionStorage.getItem("activeGas")
            //menuFunction.getBoundaty(map);
            //map.clearOverlays();//清除加载的地图覆盖物
            console.log(zoomindex+"---->")
            if (zoomindex >= 8 || zoomindex < 7) {//市州mapmark
                if (zoomindex >= 8) {
                    $("#subSiteChange").fadeIn()
                    $("#indexPageType").fadeIn()
                } else {
                    $("#subSiteChange").fadeOut()
                    $("#indexPageType").fadeOut()
                }
                var mysubSite = sessionStorage.getItem("allCityChange")
                var param;
                mysubSite == '1' ? param = {type: 'all'} : mysubSite == '2' ? param = {type: 'country'} : mysubSite == '3' ? param = {type: 'other'} : "";

                if(mapZoomindex7==0){
                   config1.http('', 'post', param, function (data) {
                       //var timenew=new Date(data[0]["TimePoint"]);
                       var consoletime=tool.cityGraphTooltipTime(new Date(data[0]["TimePoint"]));
                       $("#indexPageMapTime").text(consoletime + " (实时数据,尚未审核)");
                       $.each(data, function (i, item) {
                           /*console.log("i-->")
                            console.log(i)*/
                           var itemEach = {};
                           itemEach.COUNTYNAME = item.CountyName;
                           itemEach.CITYCODE = item.StationCode;
                           itemEach.CITYNAME = item.StationName;
                           itemEach.CITY = item.CityName;
                           itemEach.POINT = item.Longitude + "|" + item.Latitude;
                           itemEach.VALUE = eval("item." + gas);
                           itemEach.GAS = gas;
                           itemEach.STATIONCODE = item.StationCode.replace(/A/g, "1").replace(/E/g, "2").replace(/B/g, "3").replace(/C/g, "4");
                           itemEach.type = item.type;
                           if (gas == "AQI") {
                               var level = tool.levelReturn("AQI", item[gas]);
                           } else {
                               var level = tool.levelReturn("AQI", item["I" + gas]);
                           }
                           var color = tool.levelColor(level);
                           itemEach.COLOR = color;

                           sessionStorage.setItem("siteDetailType", "airSiteCountries")
                           tool.mapAddMark(map, itemEach, "menuFunction.changeToCityPage(" + itemEach.STATIONCODE + ")", "city", "country", zoomindex);
                       })
                   })
                   mapZoomindex7=1;
               }
               console.log("marke---->")
                var allOverlay = map.getOverlays();
                for (var i = 0; i < allOverlay.length - 1; i++) {
                    //注意：在使用allOverlay[i]要进行是否是Marker的判断，因为getOverlays()后会得到类型不同的对象
                    //只有Marker图像标注类才有getLabel()方法，否则会出现错误：对象不支持“getLabel”属性或方法
                    if (allOverlay[i] instanceof BMap.Marker) {
                        console.log(allOverlay[i].getLabel())
                        console.log(allOverlay[i].getLabel().content)
                        console.log(allOverlay[i].getTitle())
                        if(zoomindex >= 8){
                            if (allOverlay[i].getTitle() == "station") {
                                allOverlay[i].show();
                            }if (allOverlay[i].getTitle() == "city") {
                                allOverlay[i].hide();
                            }
                        }else if(zoomindex< 7 ){
                            if (allOverlay[i].getTitle() == "station") {
                                allOverlay[i].hide();
                            }if (allOverlay[i].getTitle() == "city") {
                                allOverlay[i].hide();
                            }
                        }

                    }
                }

                }else if (zoomindex >= 7 && zoomindex < 8) {//首页21城市mapmark
                $("#subSiteChange").fadeOut();
                $("#indexPageType").fadeOut();
                if(mapZoomindex8==0){
                    if (localStorage.code == "5100") {
                        config1.http1('/publish/getAllCityRealTimeAQIC', 'post', {}, function (data) {
                            var indexTime = new Date(data.timePoint);
                            var timearr = tool.publishNotAuditTime(indexTime);
                            $("#indexPageMapTime").text(timearr + " (实时数据,尚未审核)");
                            $.each(data.data, function (i, item) {
                                $.each(cityMapDetail, function (j, itemj) {
                                    if (itemj.cityCode == item.columns.CITYCODE) {
                                        var itemEach = {};
                                        itemEach.CITYCODE = item.columns.CITYCODE;
                                        itemEach.CITY = item.columns.CityName;
                                        item.columns.CITYNAME == '西昌' ? itemEach.CITYNAME = '凉山州' : item.columns.CITYNAME == '康定' ? itemEach.CITYNAME = '甘孜州' : item.columns.CITYNAME == '马尔康' ? itemEach.CITYNAME = '阿坝州' : itemEach.CITYNAME = item.columns.CITYNAME;

                                        itemEach.POINT = itemj.point;
                                        itemEach.VALUE = eval("item.columns." + gas);
                                        itemEach.GAS = gas;
                                        if (gas == "AQI") {
                                            if (!item.columns["INDEX_MARK"]) {
                                                var level = tool.levelReturn("AQI", "—");
                                                itemEach.VALUE = "—";
                                            } else {
                                                var level = tool.levelReturn("AQI", item.columns[gas]);
                                            }
                                        } else {
                                            if (!item.columns[gas + "_MARK"] || !item.columns["INDEX_MARK"]) {
                                                var level = tool.levelReturn("AQI", "—");
                                                itemEach.VALUE = "—";
                                            } else {
                                                var level = tool.levelReturn("AQI", item.columns["I" + gas]);
                                            }
                                        }
                                        var color = tool.levelColor(level);
                                        itemEach.COLOR = color;
                                        sessionStorage.setItem("siteDetailType", "air")
                                        tool.mapAddMark(map, itemEach, "menuFunction.changeToCityPage(" + itemEach.CITYCODE + ")", "city", "city", zoomindex);
                                    }
                                });
                            });
                        })
                    } else {
                        var data = {"cityCode": localStorage.code};
                        config1.http1('/publish/getCityInfoCForApp', 'post', data, function (XMLHttpRequest) {
                            var data = eval("(" + XMLHttpRequest.responseText + ")");
                            var mapdata = data.columns.STATIONREALTIMEAQI.data;
                            $.each(mapdata, function (i, item) {
                                var itemEach = {};
                                itemEach.CITYCODE = item.columns.STATIONCODE;
                                itemEach.CITYNAME = item.columns.STATIONNAME;
                                itemEach.POINT = item.columns.LNG + "|" + item.columns.LAT;
                                itemEach.VALUE = eval("item.columns." + gas);
                                itemEach.GAS = gas;
                                itemEach.CITY = item.columns.CityName;
                                if (gas == "AQI") {
                                    var level = tool.levelReturn("AQI", item.columns[gas]);
                                } else {
                                    var level = tool.levelReturn("AQI", item.columns["I" + gas]);
                                }
                                var color = tool.levelColor(level);
                                itemEach.COLOR = color;
                                tool.mapAddMark(map, itemEach, "", "station", "", zoomindex);
                            });
                        })
                    }
                    mapZoomindex8=1;
                }
                var allOverlay = map.getOverlays();
                for (var i = 0; i < allOverlay.length - 1; i++) {
                    //注意：在使用allOverlay[i]要进行是否是Marker的判断，因为getOverlays()后会得到类型不同的对象
                    //只有Marker图像标注类才有getLabel()方法，否则会出现错误：对象不支持“getLabel”属性或方法
                    if (allOverlay[i] instanceof BMap.Marker) {
                        console.log(allOverlay[i].getLabel())
                        console.log(allOverlay[i].getLabel().content)
                        console.log(allOverlay[i].getTitle())
                        if (allOverlay[i].getTitle() == "city") {
                            allOverlay[i].show();
                        }if (allOverlay[i].getTitle() == "station") {
                            allOverlay[i].hide();
                        }
                    }
                }

            }
        },0.0000000005)
    },
    indexPage_waterMark:function(water){
        watermap.addEventListener("zoomend", function(){
            var zoomindex = this.getZoom();
        });
        watermap.clearOverlays();
        menuFunction.getBoundaty(watermap);
        $.ajax({
            type:'POST',
            url:waterUrl+config.waterMapHourData,
            dataType:'json',
            error:function(err){
                console.log(err);
                tool.warningAlert("获取地图信息失败，请重试")
            },
            success:function(data){
                var nearestTimePoint=0;
                var time;
                $.map(data,function(item,key){
                    var timepoint = item.TIMEPOINT;
                    if(timepoint!==undefined){
                        var time1 = Date.parse(timepoint+":00:00")
                        nearestTimePoint = ((time1>nearestTimePoint)?time1:nearestTimePoint);
                    }
                    var itemEach={};
                    var ammonia=item.AMMONIA.CWQI_LEVEL,
                        phosphorus=item.PHOSPHORUS.CWQI_LEVEL,
                        potassiumrate=item.POTASSIUM.CWQI_LEVEL,
                        dissolved=item.DISSOLVED.CWQI_LEVEL;
                    item.WATERSTATION?itemEach.WATERSTATION=item.WATERSTATION:itemEach.WATERSTATION="";
                    itemEach.CITYCODE=item.STATIONCODE;
                    itemEach.CITY=item.STATIONNAME;
                    itemEach.RIVERNAME=item.RIVERNAME;
                    itemEach.STATIONNAME=item.STATIONNAME;
                    itemEach.CWQI=item.TARGETWATER;
                    itemEach.CITYNAME=item.CITY;
                    itemEach.WQI={
                        "ammonia":ammonia,
                        "phosphorus":phosphorus,
                        "potassiumrate":potassiumrate,
                        "dissolved":dissolved,
                    }
                    var itemtype;
                    switch (water){
                        case "总磷":
                            itemtype="PHOSPHORUS";
                            break;
                        case "氨氮":
                            itemtype="AMMONIA";
                            break;
                        case "高锰酸盐指数":
                            itemtype="POTASSIUM";
                            break;
                        case "溶解氧":
                            itemtype="DISSOLVED";
                            break;
                    }
                    if(water == "type"){
                        itemEach.Value=item.WQI
                    }else{
                        itemEach.Value=item[itemtype].CWQI;
                    }

                    itemEach.WQI_INDEX=item.WQI;
                    itemEach.WATER=water;
                    itemEach.POINT=item.LONGITUDE+"|"+item.LATITUDE;
                    var color;
                    switch (water){
                        case "type":
                            color=tool.waterlevelColor(itemEach.CWQI);
                            break;
                        case "氨氮":
                            color=tool.waterlevelColor(itemEach.WQI.ammonia);
                            break;
                        case "总磷":
                            color=tool.waterlevelColor(itemEach.WQI.phosphorus);
                            break;
                        case "高锰酸盐指数":
                            color=tool.waterlevelColor(itemEach.WQI.potassiumrate);
                            break;
                        case "溶解氧":
                            color=tool.waterlevelColor(itemEach.WQI.dissolved);
                            break;
                    }
                    itemEach.COLOR=color;
                    var data = parseInt(itemEach.CITYCODE)
                    sessionStorage.setItem("siteDetailType","water")
                    sessionStorage.setItem("watertypeChoose",water)
                    if(water == 'type'){
                        tool.watermapAddMark(watermap,itemEach,"menuFunction.changeToCityPage("+data+")","water",7);
                    }else if(water == '氨氮'){
                        if(item.AMMONIA.CWQI!=='--'){
                            tool.watermapAddMark(watermap,itemEach,"menuFunction.changeToCityPage("+data+")","water",7);
                        }
                    }else if(water == '总磷'){
                        if(item.PHOSPHORUS.CWQI!=='--'){
                            tool.watermapAddMark(watermap,itemEach,"menuFunction.changeToCityPage("+data+")","water",7);
                        }
                    }else if(water == '高锰酸盐指数'){
                        if(item.POTASSIUM.CWQI!=='--'){
                            tool.watermapAddMark(watermap,itemEach,"menuFunction.changeToCityPage("+data+")","water",7);
                        }
                    }else if(water == '溶解氧'){
                        if(item.DISSOLVED.CWQI!=='--'){
                            tool.watermapAddMark(watermap,itemEach,"menuFunction.changeToCityPage("+data+")","water",7);
                        }
                    }
                })
                nearestTimePoint = new Date(nearestTimePoint);
                if(nearestTimePoint.getHours()<10){
                    time = nearestTimePoint.getFullYear()+"-"+(nearestTimePoint.getMonth()+1)+"-"
                        + nearestTimePoint.getDate()+" "+"0"+ nearestTimePoint.getHours()+"时"
                }else{
                    time = nearestTimePoint.getFullYear()+"-"+(nearestTimePoint.getMonth()+1)+"-"
                        + nearestTimePoint.getDate()+" "+ nearestTimePoint.getHours()+"时"
                }
                $("#waterindexPageMapTime").html(time+"   (实时数据,尚未审核)")
            }
        })
    },
    changeToCityPage:function(citycode){
        console.log("点击---》")
        console.log(citycode)
        $.mobile.changePage("#cityPage?citycode="+citycode,{transition:"slide"});
    },
    // AllProvinceAQIDistri:function(){
    //     var cutHeight=$("#indexStatPage").children(".ui-header").outerHeight()+$("#indexStatPage").children(".ui-footer").outerHeight()+$("#indexStatMenuBar").outerHeight()+$("#aqiDistriGraph").outerHeight()+$("#aqiDistriTable").children(".aqiDistriTableTitle").outerHeight();
    //     var tableDivHeight=$("#login").outerHeight();
    //     $("#aqiDistriTableContent").css("height",(tableDivHeight-cutHeight)+"px");
    //     var contentDiv=$("#aqiDistriTableContent");
    //     contentDiv.html("");
    //     $("#ajaxPleaseWait").show();
    //     $.ajax({
    //         type:"post",
    //         url:provinceAjax+"/publish/getAllCityRealTimeAQIC",
    //         dataType:'json',
    //         async:true,
    //         data:{},
    //         error:function(){$("#ajaxPleaseWait").hide();
    //             tool.warningAlert("warAFailed","获取列表信息失败");
    //         },
    //         complete:function(XMLHttpRequest){
    //             $("#ajaxPleaseWait").hide();
    //             var data=eval("("+XMLHttpRequest.responseText+")");
    //             var level0=0;
    //             var level1=0;
    //             var level2=0;
    //             var level3=0;
    //             var level4=0;
    //             var level5=0;
    //             var level6=0;
    //             $.each(data.data,function(i,item){
    //                 var divEach=$("<div class='tableContentItem' onselectstart='return false;'></div>");
    //                 var div1=$("<div>"+item.columns.CITYNAME+"</div>");
    //                 var div2=$("<div>"+item.columns.AQI+"</div>");
    //                 var pullu="无";
    //                 if(item.columns.AQI>50){
    //                     pullu=item.columns.PRIMARYPOLLUTANT;
    //                 }
    //                 var div3=$("<div>"+pullu+"</div>");
    //                 divEach.append(div1);
    //                 divEach.append(div2);
    //                 divEach.append(div3);
    //                 contentDiv.append(divEach);
    //
    //                 var level=tool.levelReturn("AQI",item.columns.AQI);
    //                 eval("level"+level+"++");
    //             });
    //
    //             var scorll=setInterval(function(){
    //                 $(".tableContentItem").eq(0).stop().animate(
    //                     {
    //                         "height" : "0",
    //                         "opacity" : "0"
    //                     },"slow",function(){
    //                         $(this).appendTo(contentDiv);
    //                         $(this).removeAttr("style");
    //                     }
    //                 );
    //             },1300);
    //
    //             contentDiv.bind("touchstart",function(){
    //                 clearInterval(scorll);
    //             });
    //             contentDiv.bind("touchend",function(){
    //                 scorll=setInterval(function(){
    //                     $(".tableContentItem").eq(0).stop().animate(
    //                         {
    //                             "height" : "0",
    //                             "opacity" : "0"
    //                         },"slow",function(){
    //                             $(this).appendTo(contentDiv);
    //                             $(this).removeAttr("style");
    //                         }
    //                     );
    //                 },1300);
    //             });
    //             var AQIDetail="[{\"type\":\"优\",\"value\":"+level1+",\"color\":\"#00E400\"}," +
    //                 "{\"type\":\"良\",\"value\":"+level2+",\"color\":\"#FFFF00\"}," +
    //                 "{\"type\":\"轻度\",\"value\":"+level3+",\"color\":\"#FF7E00\"}," +
    //                 "{\"type\":\"中度\",\"value\":"+level4+",\"color\":\"#FF0000\"}," +
    //                 "{\"type\":\"重度\",\"value\":"+level5+",\"color\":\"#99004C\"}," +
    //                 "{\"type\":\"严重\",\"value\":"+level6+",\"color\":\"#7E0023\"}," +
    //                 "{\"type\":\"离线\",\"value\":"+level0+",\"color\":\"#7B7B7B\"}]";
    //             AQIDetail=eval(AQIDetail);
    //             var splitData=new Array();
    //             var legendarr=new Array();
    //             $.each(AQIDetail,function(i,item){
    //                 var itemeach="{value:"+item.value+",name:\""+item.type+item.value+"个\",itemStyle:{normal:{color:\""+item.color+"\"}}}";
    //                 legendarr.push(item.type+item.value+"个");
    //                 splitData.push(eval("("+itemeach+")"));
    //             });
    //
    //             var myChart = echarts.init(document.getElementById('aqiDistriGraph'));
    //             myChart.setOption({
    //                 backgroundColor:"#fff",
    //                 title:{
    //                     text:"    全省城市\n空气质量等级",
    //                     x:115,
    //                     y:77,
    //                     textStyle:{
    //                         fontSize:"14px"
    //                     }
    //                 },
    //                 tooltip : {
    //                     show:false,
    //                     trigger:'axis'
    //                 },
    //                 toolbox: {
    //                     show : false
    //                 },
    //                 calculable : false,
    //                 legend: {
    //                     orient : 'vertical',
    //                     x:'right',
    //                     y:'center',
    //                     data:legendarr
    //                 },
    //                 series :[
    //                     {
    //                         name:'全省AQI',
    //                         type:'pie',
    //                         radius : ['70%', '80%'],
    //                         center : ['150'],
    //                         itemStyle : {
    //                             normal : {
    //                                 label : {
    //                                     show : false
    //                                 },
    //                                 labelLine : {
    //                                     show : false
    //                                 }
    //                             },
    //                             emphasis : {
    //                                 label : {
    //                                     show : false,
    //                                     position : 'center',
    //                                     textStyle : {
    //                                         fontSize : '30',
    //                                         fontWeight : 'bold'
    //                                     }
    //                                 }
    //                             }
    //                         },
    //                         data:splitData
    //                     }
    //                 ]
    //             });
    //         }
    //     });
    // },
    cityPage_init:function(citycode){
        if(citycode=="5100"){
            citcode="5101";
        }
        $("#refreshCityPage").unbind().click(function(){
            $(".cityActive").click();
        });
        menuFunction.cityPage_createPage(citycode);
        // $("#cityPage_Content6").attr("style","margin-bottom:52px");
    },
    cityPage_createPage:function(citycode){
        var siteDetailType =  sessionStorage.getItem("siteDetailType")
        $("#cityPage_cityName").attr("citycode",citycode);
        var timelabel="";
        var today=new Date();
        var weekToday=weekday[today.getDay()];
        if(today.getHours()<10){
            timelabel+="0"+today.getHours();
        }else{
            timelabel+=today.getHours();
        }
        timelabel+=":";
        if(today.getMinutes()<10){
            timelabel+="0"+today.getMinutes();
        }else{
            timelabel+=today.getMinutes();
        }
        timelabel+="  "+weekToday;
        var timeindex=new Date();
        var timearr=tool.publishNotAuditTime(timeindex);

        if(siteDetailType == "air"){
            $("#ajaxPleaseWait").show();
            $("#cityPage_Content1").show();
            $("#cityPage_Content2").show();
            $("#cityPage_Content3").show();
            $("#cityPage_Content4").show();
            $("#cityPage_Content5").hide();
            $("#cityPage_Content6").hide();
            $("#cityGasTable").show();
            $("#cityGasTableChangeBar").show();
            $("#cityGraphDateLabelTooltip").show();
            $(".cityGraphDateLabelTooltipArrow").show();
            $("#waterPage_Content1").hide();
            $("#waterPage_Content2").hide();
            $("#waterPage_Content4").hide();
            $("#waterPage_Content5").hide();
            $("#waterPage_Content6").hide();
            $("#waterGraphDateLabelTooltip").hide();
            $(".waterGraphDateLabelTooltipArrow").hide();
            $.ajax({
                type:"GET",
                url:provinceAjax+"/publish/getAllCityRealTimeAQIC",
                dataType:'json',
                async:true,
                data:{},
                error:function(){
                    $("#ajaxPleaseWait").hide();
                    tool.warningAlert("warAFailed","获取信息失败");
                },
                complete:function(XMLHttpRequest){
                    $("#ajaxPleaseWait").hide();
                    var data=eval("("+XMLHttpRequest.responseText+")");
                    $.each(data.data,function(i,item){
                        if(item.columns.CITYCODE==citycode){
                            var eachdata=item.columns;
                            var consoletime=tool.cityGraphTooltipTime(new Date(eachdata.TIMEPOINT));
                            $("#citypage_Content1Time").text(consoletime+" (实时数据,尚未审核)");
                            var cityname=item.columns.CITYNAME;
                            item.columns.CITYNAME=='西昌'?cityname='凉山州':item.columns.CITYNAME=='康定'?cityname='甘孜州':item.columns.CITYNAME=='马尔康'?cityname='阿坝州': cityname=item.columns.CITYNAME;
                            $("#cityPage_cityName").text(cityname);
                            if(!eachdata.INDEX_MARK){
                                eachdata.AQI="—";
                            }
                            $("#citypage_Content1AQI").text(eachdata.AQI);
                            var levelname="";
                            switch(tool.levelReturn("AQI",eachdata.AQI)){
                                case "0":
                                    levelname="离线";
                                    break;
                                case "1":
                                    levelname="优";
                                    break;
                                case "2":
                                    levelname="良";
                                    break;
                                case "3":
                                    levelname="轻度污染";
                                    break;
                                case "4":
                                    levelname="中度污染";
                                    break;
                                case "5":
                                    levelname="重度污染";
                                    break;
                                case "6":
                                    levelname="严重污染";
                                    break;
                            }
                            if(!eachdata.SO2_MARK || !eachdata.INDEX_MARK){
                                eachdata.ISO2="—";
                                eachdata.SO2="—";
                            }
                            if(!eachdata.NO2_MARK || !eachdata.INDEX_MARK){
                                eachdata.INO2="—";
                                eachdata.NO2="—";
                            }
                            if(!eachdata.CO_MARK || !eachdata.INDEX_MARK){
                                eachdata.ICO="—";
                                eachdata.CO="—";
                            }
                            if(!eachdata.O3_MARK || !eachdata.INDEX_MARK){
                                eachdata.IO3="—";
                                eachdata.O3="—";
                            }
                            if(!eachdata.PM2_5_MARK || !eachdata.INDEX_MARK){
                                eachdata.IPM2_5="—";
                                eachdata.PM2_5="—";
                            }
                            if(!eachdata.PM10_MARK || !eachdata.INDEX_MARK){
                                eachdata.IPM10="—";
                                eachdata.PM10="—";
                            }
                            $("#cityPage_Content2ItemSO2").text(eachdata.SO2);
                            $("#cityPage_Content2ItemNO2").text(eachdata.NO2);
                            $("#cityPage_Content2ItemCO").text(eachdata.CO);
                            $("#cityPage_Content2ItemO3").text(eachdata.O3);
                            $("#cityPage_Content2ItemPM2_5").text(eachdata.PM2_5);
                            $("#cityPage_Content2ItemPM10").text(eachdata.PM10);
                            $("#citypage_Content1AQILevel").children("div").text(levelname);
                            $("#citypage_Content1AQILevel").children("div").css("background-color",tool.levelColor(tool.levelReturn("AQI",eachdata.AQI))).color;
                            if(eachdata.AQI<=50){
                                $("#citypage_Content1AQIPull").text("首要污染物:无");
                            }else{
                                if(!eachdata.INDEX_MARK){
                                    $("#citypage_Content1AQIPull").html("首要污染物:-");
                                }else{
                                    $("#citypage_Content1AQIPull").html("首要污染物:"+eachdata.PRIMARYPOLLUTANT.replace(/SO2/,"SO<sub>2</sub>").replace(/NO2/,"NO<sub>2</sub>").replace(/O3/,"O<sub>3</sub>").replace(/PM10/,"PM<sub>10</sub>").replace(/PM2.5/,"PM<sub>2.5</sub>"));
                                }
                            }

                            var backColor=tool.levelColorBackCity(tool.levelReturn("AQI",eachdata.ISO2));
                            var color=tool.levelColor(tool.levelReturn("AQI",eachdata.ISO2)).color;
                            $("#cityPage_Content2ItemSO2BarBack").css("background-color",backColor);
                            $("#cityPage_Content2ItemSO2Bar").css("background-color",color);
                            $("#cityPage_Content2ItemSO2").css("color",color);
                            var valueBL=tool.levelReturnBL("AQI",eachdata.ISO2);
                            $("#cityPage_Content2ItemSO2Bar").css("width",parseFloat(valueBL)*100+"%");

                            var backColor=tool.levelColorBackCity(tool.levelReturn("AQI",eachdata.INO2));
                            var color=tool.levelColor(tool.levelReturn("AQI",eachdata.INO2)).color;
                            $("#cityPage_Content2ItemNO2BarBack").css("background-color",backColor);
                            $("#cityPage_Content2ItemNO2Bar").css("background-color",color);
                            $("#cityPage_Content2ItemNO2").css("color",color);
                            var valueBL=tool.levelReturnBL("AQI",eachdata.INO2);
                            $("#cityPage_Content2ItemNO2Bar").css("width",parseFloat(valueBL)*100+"%");

                            var backColor=tool.levelColorBackCity(tool.levelReturn("AQI",eachdata.ICO));
                            var color=tool.levelColor(tool.levelReturn("AQI",eachdata.ICO)).color;
                            $("#cityPage_Content2ItemCOBarBack").css("background-color",backColor);
                            $("#cityPage_Content2ItemCOBar").css("background-color",color);
                            $("#cityPage_Content2ItemCO").css("color",color);
                            var valueBL=tool.levelReturnBL("AQI",eachdata.ICO);
                            $("#cityPage_Content2ItemCOBar").css("width",parseFloat(valueBL)*100+"%");

                            var backColor=tool.levelColorBackCity(tool.levelReturn("AQI",eachdata.IO3));
                            var color=tool.levelColor(tool.levelReturn("AQI",eachdata.IO3)).color;
                            $("#cityPage_Content2ItemO3BarBack").css("background-color",backColor);
                            $("#cityPage_Content2ItemO3Bar").css("background-color",color);
                            $("#cityPage_Content2ItemO3").css("color",color);
                            var valueBL=tool.levelReturnBL("AQI",eachdata.IO3);
                            $("#cityPage_Content2ItemO3Bar").css("width",parseFloat(valueBL)*100+"%");

                            var backColor=tool.levelColorBackCity(tool.levelReturn("AQI",eachdata.IPM2_5));
                            var color=tool.levelColor(tool.levelReturn("AQI",eachdata.IPM2_5)).color;
                            $("#cityPage_Content2ItemPM2_5BarBack").css("background-color",backColor);
                            $("#cityPage_Content2ItemPM2_5Bar").css("background-color",color);
                            $("#cityPage_Content2ItemPM2_5").css("color",color);
                            var valueBL=tool.levelReturnBL("AQI",eachdata.IPM2_5);
                            $("#cityPage_Content2ItemPM2_5Bar").css("width",parseFloat(valueBL)*100+"%");

                            var backColor=tool.levelColorBackCity(tool.levelReturn("AQI",eachdata.IPM10));
                            var color=tool.levelColor(tool.levelReturn("AQI",eachdata.IPM10)).color;
                            $("#cityPage_Content2ItemPM10BarBack").css("background-color",backColor);
                            $("#cityPage_Content2ItemPM10Bar").css("background-color",color);
                            $("#cityPage_Content2ItemPM10").css("color",color);
                            var valueBL=tool.levelReturnBL("AQI",eachdata.IPM10);
                            $("#cityPage_Content2ItemPM10Bar").css("width",parseFloat(valueBL)*100+"%");

                            var aqilevel=tool.levelReturn("AQI",eachdata.AQI);
                            $.each(littleTips,function(i,item){
                                if(item.level==aqilevel){
                                    $("#cityPage_Content3Tips").text(item.content);
                                }
                            });
                            $(".cityPage_Content4Button").unbind().click(function(){
                                $(".cityPage_Content4ButtonActive").removeClass("cityPage_Content4ButtonActive");
                                $(this).addClass("cityPage_Content4ButtonActive");
                                var gas=$(".cityGasActive").attr("gas");
                                var type=$(this).attr("datatype");
                                if(type=="hour"){
                                    $("#ajaxPleaseWait").show();
                                    $.ajax({
                                        type:"GET",
                                        url:provinceAjax+"/publish/getCity24HRealTimeAQIC",
                                        dataType:'json',
                                        async:true,
                                        data:{"cityCode":citycode},
                                        error:function(){$("#ajaxPleaseWait").hide();
                                            tool.warningAlert("warAFailed","获取信息失败");
                                        },
                                        complete:function(XMLHttpRequest){
                                            $("#ajaxPleaseWait").hide();
                                            var data=eval("("+XMLHttpRequest.responseText+")");
                                            menuFunction.createCityHourAndDayGraph(gas,type,data);
                                        }
                                    });
                                }else if(type=="day"){
                                    $("#ajaxPleaseWait").show();
                                    $.ajax({
                                        type:"GET",
                                        url:provinceAjax+"/publish/getCity365DayAQI",
                                        dataType:'json',
                                        async:true,
                                        data:{"cityCode":citycode},
                                        error:function(){$("#ajaxPleaseWait").hide();
                                            tool.warningAlert("warAFailed","获取信息失败");
                                        },
                                        complete:function(XMLHttpRequest){
                                            $("#ajaxPleaseWait").hide();
                                            var data=eval("("+XMLHttpRequest.responseText+")");
                                            menuFunction.createCityHourAndDayGraph(gas,type,data);
                                        }
                                    });
                                }
                            });
                            $(".cityPage_Content4Button").eq(0).click();
                            mapCity = new BMap.Map("cityPageMap");
                            var p0="";
                            var p1="";
                            var cityzoom=13;

                            $.each(cityMapDetail,function(i,item){
                                if(item.cityCode==citycode){
                                    var cityPoint=item.cityPoint;
                                    cityzoom=item.zoom;
                                    cityPoint=cityPoint.split("|");
                                    p0=parseFloat(cityPoint[0]);
                                    p1=parseFloat(cityPoint[1]);
                                }
                            });
                            var pointIndex = new BMap.Point(p0,p1);
                            mapCity.centerAndZoom(pointIndex,cityzoom);
                            mapCity.disableDragging();
                            mapCity.disablePinchToZoom();
                            mapCity.disableDoubleClickZoom();

                            $("#cityGasChangeBar").children("div").unbind().click(function(){
                                var gas=$(this).attr("gas");
                                $(".cityGasActive").removeClass("cityGasActive");
                                $(this).addClass("cityGasActive");
                                $(".cityPage_Content4ButtonActive").click();
                            });
                            $("#cityGasChangeBar").children("div").eq(0).click();

                            $("#cityGasTableChangeBar").children("div").unbind().click(function(){
                                var gas=$(this).attr("gas");
                                $(".cityGasTableActive").removeClass("cityGasTableActive");
                                $(this).addClass("cityGasTableActive");
                                menuFunction.cityPage_gasTable(gas,citycode);
                                menuFunction.cityPage_mapMark(gas,citycode);
                            });
                            $("#cityGasTableChangeBar").children("div").eq(0).click();
                            $("#cityPage_Content6").removeAttr("style");
                        }
                    });
                }
            });
        }else if(siteDetailType == "airSiteCountries"){
            $("#ajaxPleaseWait").show();
            $("#cityPage_Content1").show();
            $("#cityPage_Content2").show();
            $("#cityPage_Content3").show();
            $("#cityPage_Content4").show();
            $("#cityPage_Content5").hide();
            $("#cityPage_Content6").hide();
            $("#cityGasTable").hide();
            $("#cityGasTableChangeBar").show();
            $("#cityGasChangeBar").show();
            $("#cityGraphDateLabelTooltip").show();
            $(".cityGraphDateLabelTooltipArrow").show();
            $("#waterPage_Content1").hide();
            $("#waterPage_Content2").hide();
            $("#waterPage_Content4").hide();
            $("#waterPage_Content5").hide();
            $("#waterPage_Content6").hide();
            $("#waterGraphDateLabelTooltip").hide();
            $(".waterGraphDateLabelTooltipArrow").hide();
            var stationcode;
            var review = citycode.substring(4,5);
            var codePart = citycode.substring(0,4);
            review == "1" ? stationcode=codePart+"A" : review=="2" ? stationcode=codePart+"E" : review=="3" ? stationcode=codePart+"B" : review=="4" ? stationcode=codePart+"C" : "";
            $.ajax({
                type:"POST",
                url:myURL+config.siteCountryData,
                dataType:'json',
                async:true,
                data:{
                    stationCode:stationcode
                },
                error:function(){
                    $("#ajaxPleaseWait").hide();
                    tool.warningAlert("warAFailed","获取信息失败");
                },
                complete:function(XMLHttpRequest){
                    $("#ajaxPleaseWait").hide();
                    var data=eval("("+XMLHttpRequest.responseText+")");
                    var consoletime=tool.cityGraphTooltipTime(new Date(data.TimePoint));
                    $("#citypage_Content1Time").text(consoletime+" (实时数据,尚未审核)");
                    if(data.CountyName){
                        if(data.CountyName=="市区"){
                            if(data.StationName.indexOf(data.CityName)!="-1"){
                                $("#cityPage_cityName").text(data.StationName);
                            }else{
                                $("#cityPage_cityName").text(data.CityName+data.StationName);
                            }
                        }else{
                            if(data.StationName.indexOf(data.CountyName)!="-1"){
                                $("#cityPage_cityName").text(data.StationName);
                            }else{
                                $("#cityPage_cityName").text(data.CountyName+data.StationName);
                            }
                        }
                    }else{
                        if(data.StationName.indexOf(data.CityName)=="-1"){
                            $("#cityPage_cityName").text(data.StationName);
                        }else{
                            $("#cityPage_cityName").text(data.CityName+data.StationName);
                        }
                    }
                    var cityname=data.CityName;
                    $("#citypage_Content1AQI").text(data.AQI);
                    var levelname="";
                    switch(tool.levelReturn("AQI",data.AQI)){
                        case "0":
                            levelname="离线";
                            break;
                        case "1":
                            levelname="优";
                            break;
                        case "2":
                            levelname="良";
                            break;
                        case "3":
                            levelname="轻度污染";
                            break;
                        case "4":
                            levelname="中度污染";
                            break;
                        case "5":
                            levelname="重度污染";
                            break;
                        case "6":
                            levelname="严重污染";
                            break;
                    }
                    $("#cityPage_Content2ItemSO2").text(data.SO2);
                    $("#cityPage_Content2ItemNO2").text(data.NO2);
                    $("#cityPage_Content2ItemCO").text(data.CO);
                    $("#cityPage_Content2ItemO3").text(data.O3);
                    $("#cityPage_Content2ItemPM2_5").text(data.PM2_5);
                    $("#cityPage_Content2ItemPM10").text(data.PM10);
                    $("#citypage_Content1AQILevel").children("div").text(levelname);
                    $("#citypage_Content1AQILevel").children("div").css("background-color",tool.levelColor(tool.levelReturn("AQI",data.AQI))).color;
                    if(data.AQI<=50){
                        $("#citypage_Content1AQIPull").text("首要污染物:无");
                    }else{
                        if(data.PrimaryPollutant==""){
                            $("#citypage_Content1AQIPull").html("首要污染物:-");
                        }else{
                            $("#citypage_Content1AQIPull").html("首要污染物:"+data.PrimaryPollutant.replace(/SO2/,"SO<sub>2</sub>").replace(/NO2/,"NO<sub>2</sub>").replace(/O3/,"O<sub>3</sub>").replace(/PM10/,"PM<sub>10</sub>").replace(/PM2.5/,"PM<sub>2.5</sub>"));
                        }
                    }

                    var backColor=tool.levelColorBackCity(tool.levelReturn("AQI",data.ISO2));
                    var color=tool.levelColor(tool.levelReturn("AQI",data.ISO2)).color;
                    $("#cityPage_Content2ItemSO2BarBack").css("background-color",backColor);
                    $("#cityPage_Content2ItemSO2Bar").css("background-color",color);
                    $("#cityPage_Content2ItemSO2").css("color",color);
                    var valueBL=tool.levelReturnBL("AQI",data.ISO2);
                    $("#cityPage_Content2ItemSO2Bar").css("width",parseFloat(valueBL)*100+"%");

                    var backColor=tool.levelColorBackCity(tool.levelReturn("AQI",data.INO2));
                    var color=tool.levelColor(tool.levelReturn("AQI",data.INO2)).color;
                    $("#cityPage_Content2ItemNO2BarBack").css("background-color",backColor);
                    $("#cityPage_Content2ItemNO2Bar").css("background-color",color);
                    $("#cityPage_Content2ItemNO2").css("color",color);
                    var valueBL=tool.levelReturnBL("AQI",data.INO2);
                    $("#cityPage_Content2ItemNO2Bar").css("width",parseFloat(valueBL)*100+"%");

                    var backColor=tool.levelColorBackCity(tool.levelReturn("AQI",data.ICO));
                    var color=tool.levelColor(tool.levelReturn("AQI",data.ICO)).color;
                    $("#cityPage_Content2ItemCOBarBack").css("background-color",backColor);
                    $("#cityPage_Content2ItemCOBar").css("background-color",color);
                    $("#cityPage_Content2ItemCO").css("color",color);
                    var valueBL=tool.levelReturnBL("AQI",data.ICO);
                    $("#cityPage_Content2ItemCOBar").css("width",parseFloat(valueBL)*100+"%");

                    var backColor=tool.levelColorBackCity(tool.levelReturn("AQI",data.IO3));
                    var color=tool.levelColor(tool.levelReturn("AQI",data.IO3)).color;
                    $("#cityPage_Content2ItemO3BarBack").css("background-color",backColor);
                    $("#cityPage_Content2ItemO3Bar").css("background-color",color);
                    $("#cityPage_Content2ItemO3").css("color",color);
                    var valueBL=tool.levelReturnBL("AQI",data.IO3);
                    $("#cityPage_Content2ItemO3Bar").css("width",parseFloat(valueBL)*100+"%");

                    var backColor=tool.levelColorBackCity(tool.levelReturn("AQI",data.IPM2_5));
                    var color=tool.levelColor(tool.levelReturn("AQI",data.IPM2_5)).color;
                    $("#cityPage_Content2ItemPM2_5BarBack").css("background-color",backColor);
                    $("#cityPage_Content2ItemPM2_5Bar").css("background-color",color);
                    $("#cityPage_Content2ItemPM2_5").css("color",color);
                    var valueBL=tool.levelReturnBL("AQI",data.IPM2_5);
                    $("#cityPage_Content2ItemPM2_5Bar").css("width",parseFloat(valueBL)*100+"%");

                    var backColor=tool.levelColorBackCity(tool.levelReturn("AQI",data.IPM10));
                    var color=tool.levelColor(tool.levelReturn("AQI",data.IPM10)).color;
                    $("#cityPage_Content2ItemPM10BarBack").css("background-color",backColor);
                    $("#cityPage_Content2ItemPM10Bar").css("background-color",color);
                    $("#cityPage_Content2ItemPM10").css("color",color);
                    var valueBL=tool.levelReturnBL("AQI",data.IPM10);
                    $("#cityPage_Content2ItemPM10Bar").css("width",parseFloat(valueBL)*100+"%");

                    var aqilevel=tool.levelReturn("AQI",data.AQI);
                    $.each(littleTips,function(i,item){
                        if(item.level==aqilevel){
                            $("#cityPage_Content3Tips").text(item.content);
                        }
                    });
                    $(".cityPage_Content4Button").unbind().click(function(){
                        $(".cityPage_Content4ButtonActive").removeClass("cityPage_Content4ButtonActive");
                        $(this).addClass("cityPage_Content4ButtonActive");
                        var gas=$(".cityGasActive").attr("gas");
                        var type=$(this).attr("datatype");
                        if(type=="hour"){
                            $("#ajaxPleaseWait").show();
                            $.ajax({
                                type:"POST",
                                url:myURL+config.stationHourHis,
                                dataType:'json',
                                async:true,
                                data:{
                                    stationCode:stationcode
                                },
                                error:function(){
                                    $("#ajaxPleaseWait").hide();
                                    tool.warningAlert("warAFailed","获取信息失败");
                                },
                                complete:function(XMLHttpRequest){
                                    $("#ajaxPleaseWait").hide();
                                    var data=eval("("+XMLHttpRequest.responseText+")");
                                    menuFunction.createCityHourAndDayGraph(gas,type,data);
                                }
                            });
                        }
                        else if(type=="day"){
                            $("#ajaxPleaseWait").show();
                            $.ajax({
                                type:"POST",
                                url:myURL+config.stationDayHis,
                                dataType:'json',
                                async:true,
                                data:{
                                    stationCode:stationcode
                                },
                                error:function(){
                                    $("#ajaxPleaseWait").hide();
                                    tool.warningAlert("warAFailed","获取信息失败");
                                },
                                complete:function(XMLHttpRequest){
                                    $("#ajaxPleaseWait").hide();
                                    var data=eval("("+XMLHttpRequest.responseText+")");
                                    menuFunction.createCityHourAndDayGraph(gas,type,data);
                                }
                            });
                        }
                    });
                    $(".cityPage_Content4Button").eq(0).click();
                    mapCity = new BMap.Map("cityPageMap");
                    var p0=data.Longitude;
                    var p1=data.Latitude;
                    var cityzoom=13;

                    var pointIndex = new BMap.Point(p0,p1);
                    mapCity.centerAndZoom(pointIndex,cityzoom);
                    mapCity.disableDragging();
                    mapCity.disablePinchToZoom();
                    mapCity.disableDoubleClickZoom();

                    $("#cityGasChangeBar").children("div").unbind().click(function(){
                        var gas=$(this).attr("gas");
                        $(".cityGasActive").removeClass("cityGasActive");
                        $(this).addClass("cityGasActive");
                        $(".cityPage_Content4ButtonActive").click();
                    });
                    $("#cityGasChangeBar").children("div").eq(0).click();

                    $("#cityGasTableChangeBar").children("div").unbind().click(function(){
                        var gas=$(this).attr("gas");
                        $(".cityGasTableActive").removeClass("cityGasTableActive");
                        $(this).addClass("cityGasTableActive");
                        var itemEach={};
                        itemEach.CITYCODE=data.StationCode;
                        itemEach.CITYNAME=data.StationName;
                        itemEach.POINT=data.Longitude+"|"+data.Latitude;
                        itemEach.VALUE=data[gas];
                        itemEach.GAS=gas;
                        if(gas=="AQI"){
                            var level=tool.levelReturn("AQI",itemEach.VALUE);
                            var color=tool.levelColor(level);
                        }else{
                            var valuegas=tool.IAQIHourCal(gas.toLowerCase(),itemEach.VALUE);
                            var level=tool.levelReturn("AQI",valuegas);
                            var color=tool.levelColor(level);
                        }
                        itemEach.COLOR=color;
                        tool.mapAddMark(mapCity,itemEach,"","station","city","13");
                    });
                    $("#cityGasTableChangeBar").children("div").eq(0).click();
                    $("#cityPage_Content6").removeAttr("style");
                }
            });
        }else if(siteDetailType == "water"){
        	$("#cityGasChangeBar").hide();
            $("#cityPage_Content1").hide();
            $("#cityPage_Content2").hide();
            $("#cityPage_Content3").hide();
            $("#cityPage_Content4").hide();
            $("#cityPage_Content5").hide();
            $("#cityPage_Content6").hide();
            $("#cityPage_Content6").css("margin-bottom","0px");
            $("#cityGasTable").hide();
            $("#cityGasTableChangeBar").hide();
            $("#cityGraphDateLabelTooltip").hide();
            $(".cityGraphDateLabelTooltipArrow").hide();
            $("#waterPage_Content1").show();
            $("#waterPage_Content2").show();
            $("#waterPage_Content4").show();
            $("#waterPage_Content5").show();
            $("#waterGasTableChangeBar").hide();
            $("#waterGraphDateLabelTooltip").show();
            $(".waterGraphDateLabelTooltipArrow").show();
            $("#waterPage_Content6").hide();
            var code = tool.PreFixInterge(citycode,5)
            var waterpollutype = sessionStorage.getItem("waterpollutype")
            $.ajax({
                type:'POST',
                url:waterUrl+config.waterMapHourData,
                dataType:'json',
                error:function(err){
                    console.log(err);
                    tool.warningAlert("获取地图信息失败，请重试")
                },
                success:function(datajson){
                    $.map(datajson,function(data,index){
                        if(data.STATIONCODE == code){
                            var stationStatus;
                            var waterStatusUrl={
                                "one":"img/one.png",
                                "two":"img/two.png",
                                "three":"img/tree.png",
                                "four":"img/four.png",
                                "five":"img/five.png",
                                "badfive":"img/badfive.png",
                                "nodata":'img/nodata.png'
                            }
                            $("#cityPage_cityName").text(data.STATIONNAME)
                            var timepoint;
                            data.TIMEPOINT!==undefined?timepoint=data.TIMEPOINT+'时':timepoint='一 一'
                            $("#waterPage_Content1Time").text(timepoint+" (实时数据，尚未审核)");
                            data.STATIONSTATE=="1"?stationStatus='正常':data.STATIONSTATE=="2"?stationStatus='调试':data.STATIONSTATE=="3"?stationStatus='停运':"";

                            $("#phosphorusValue").text(data.PHOSPHORUS.CWQI);
                            $("#potassiumRateValue").text(data.POTASSIUM.CWQI);
                            $("#dissolvedValue").text(data.DISSOLVED.CWQI);
                            $("#ammoniaValue").text(data.AMMONIA.CWQI);
                            var watertype="";
                            var value;
                            var WQI_Index;
                            if(waterpollutype=='type'){
                                WQI_Index = data.WQI;
                                watertype = data.TARGETWATER;
                            }else if(waterpollutype=='总磷'){
                                value=data.PHOSPHORUS.CWQI;
                                watertype = data.PHOSPHORUS.CWQI_LEVEL;
                            }else if(waterpollutype=='氨氮'){
                                value=data.AMMONIA.CWQI;
                                watertype = data.AMMONIA.CWQI_LEVEL;
                            }else if(waterpollutype=='高锰酸盐指数'){
                                value=data.POTASSIUM.CWQI;
                                watertype = data.POTASSIUM.CWQI_LEVEL;
                            }else if(waterpollutype=='溶解氧'){
                                value=data.DISSOLVED.CWQI;
                                watertype = data.DISSOLVED.CWQI_LEVEL;
                            }

                            var backColor = tool.waterlevelReturn(data.PHOSPHORUS.CWQI_LEVEL)
                            var color=tool.waterlevelColor(data.PHOSPHORUS.CWQI_LEVEL);
                            $("#waterPage_Content2PhosphorusItemBarBack").css("background-color",backColor);
                            $("#waterPage_Content2ItemPhosphorusBar").css("background-color",color);
                            $("#phosphorusValue").css("color",color);
                            var valueBL=tool.levelReturnWaterBL("总磷",data.PHOSPHORUS.CWQI);
                            $("#waterPage_Content2ItemPhosphorusBar").css("width",parseFloat(valueBL)*100+"%");

                            var backColor = tool.waterlevelReturn(data.AMMONIA.CWQI_LEVEL)
                            var color=tool.waterlevelColor(data.AMMONIA.CWQI_LEVEL);
                            $("#waterPage_Content2ItemAmmoniaBarBack").css("background-color",backColor);
                            $("#waterPage_Content2ItemAmmoniaBar").css("background-color",color);
                            $("#ammoniaValue").css("color",color);
                            var valueBL=tool.levelReturnWaterBL("氨氮",data.AMMONIA.CWQI);
                            $("#waterPage_Content2ItemAmmoniaBar").css("width",parseFloat(valueBL)*100+"%");

                            var backColor = tool.waterlevelReturn(data.DISSOLVED.CWQI_LEVEL)
                            var color=tool.waterlevelColor(data.DISSOLVED.CWQI_LEVEL);
                            $("#waterPage_Content2ItemDissolvedBarBack").css("background-color",backColor);
                            $("#waterPage_Content2ItemDissolvedBar").css("background-color",color);
                            $("#dissolvedValue").css("color",color);
                            var valueBL=tool.levelReturnWaterBL("溶解氧",data.DISSOLVED.CWQI);
                            $("#waterPage_Content2ItemDissolvedBar").css("width",parseFloat(valueBL)*100+"%");

                            var backColor = tool.waterlevelReturn(data.POTASSIUM.CWQI_LEVEL)
                            var color=tool.waterlevelColor(data.POTASSIUM.CWQI_LEVEL);
                            $("#waterPage_Content2ItemPotassiumRateBarBack").css("background-color",backColor);
                            $("#waterPage_Content2ItemPotassiumRateBar").css("background-color",color);
                            $("#potassiumRateValue").css("color",color);
                            var valueBL=tool.levelReturnWaterBL("高锰酸盐指数",data.POTASSIUM.CWQI);
                            $("#waterPage_Content2ItemPotassiumRateBar").css("width",parseFloat(valueBL)*100+"%");

                            if(watertype=='I类'){
                                $("#waterlevelImg").attr('src',waterStatusUrl.one)
                            }else if(watertype=='II类'){
                                $("#waterlevelImg").attr('src',waterStatusUrl.two)
                            }else if(watertype=='III类'){
                                $("#waterlevelImg").attr('src',waterStatusUrl.three)
                            }else if(watertype=='IV类'){
                                $("#waterlevelImg").attr('src',waterStatusUrl.four)
                            }else if(watertype=='V类'){
                                $("#waterlevelImg").attr('src',waterStatusUrl.five)
                            }else if(watertype=='劣V类'){
                                $("#waterlevelImg").attr('src',waterStatusUrl.badfive)
                            }else{
                                $("#waterlevelImg").attr('src',waterStatusUrl.nodata)
                                stationStatus = "离线";
                            }
                            $("#waterPage_stationStatu span:nth-child(1)").text(stationStatus)
                            mapRiver = new BMap.Map("waterDetailPageMap");

                            var type="hour";
                            $("#waterChangeBar").children("div").unbind().click(function(){
                                var water=$(this).attr("water");
                                sessionStorage.setItem("watertypeChoose",water)
                                $(".cityGasActive").removeClass("cityGasActive");
                                $(this).addClass("cityGasActive");
                                $(".cityPage_Content4ButtonActive").click();
                                waterpollutype = water;
                                if(type=="hour"){
                                    $.ajax({
                                        type:'POST',
                                        url:myURL+config.waterPasHourData,
                                        data:{
                                            "STATIONCODE":code
                                        },
                                        error:function(err){
                                            console.log(err)
                                        },
                                        success:function(data){
                                            $("#ajaxPleaseWait").hide();
                                            menuFunction.createWaterStationHourGraph(data,waterpollutype)
                                        }
                                    })
                                }else if(type=="day"){
                                    //日数据柱状图ajax
                                    var endDate = new Date().getFullYear()+'-'+ (new Date().getMonth()+1) + '-' + (new Date().getDate()-1);
                                    var startDate = (new Date().getFullYear()-1)+'-'+ (new Date().getMonth()+1) + '-' + new Date().getDate();
                                    $.ajax({
                                        type:'POST',
                                        url:waterUrl+config.waterPastDayData,
                                        data:{
                                            "stationCode":code,
                                            "startTime":startDate,
                                            "endTime":endDate
                                        },
                                        error:function(err){
                                            console.log(err)
                                        },
                                        success:function(data){
                                            $("#ajaxPleaseWait").hide();
                                            var dataobj = eval("("+data+")");
                                            menuFunction.createWaterStationDayGraph(dataobj,waterpollutype)
                                        }
                                    })
                                }
                            });
                            $("#waterChangeBar").children("div").eq(0).click();
                            $(".waterPage_Content4Button").unbind().click(function(){
                                $(".waterPage_Content4ButtonActive").removeClass("waterPage_Content4ButtonActive");
                                $(this).addClass("waterPage_Content4ButtonActive");
                                type=$(this).attr("datatype");
                                if(type=="hour"){
                                    $.ajax({
                                        type:'POST',
                                        url:myURL+config.waterPasHourData,
                                        data:{
                                            "STATIONCODE":code
                                        },
                                        error:function(err){
                                            console.log(err)
                                        },
                                        success:function(data){
                                            $("#ajaxPleaseWait").hide();
                                            console.log(data)
                                            menuFunction.createWaterStationHourGraph(data,waterpollutype)
                                        }
                                    })
                                }else if(type=="day"){
                                    //日数据柱状图ajax
                                    var startDate = new Date().getFullYear()+'-1-1'
                                    var endDate = new Date().getFullYear()+'-'+ (new Date().getMonth()+1) + '-' + (new Date().getDate()-1);
                                    $.ajax({
                                        type:'POST',
                                        url:waterUrl+config.waterPastDayData,
                                        data:{
                                            "stationCode":code,
                                            "startTime":startDate,
                                            "endTime":endDate
                                        },
                                        error:function(err){
                                            console.log(err)
                                        },
                                        success:function(data){
                                            $("#ajaxPleaseWait").hide();
                                            var dataobj = eval("("+data+")");
                                            menuFunction.createWaterStationDayGraph(dataobj,waterpollutype)
                                        }
                                    })
                                }
                            });
                            $(".waterPage_Content4Button").eq(0).click();

                            var p0=data.LONGITUDE;
                            var p1=data.LATITUDE;
                            var riverzoom=13;
                            var pointIndex = new BMap.Point(p0,p1);
                            var detailcolor = tool.waterlevelColor(watertype)
                            mapRiver.centerAndZoom(pointIndex,riverzoom);
                            mapRiver.disableDragging();
                            mapRiver.disablePinchToZoom();
                            mapRiver.disableDoubleClickZoom();
                            var itemEach = {
                                "CITY":data.CITY,
                                "COLOR":detailcolor,
                                "POINT":p0+'|'+p1,
                                "waterdetail":"1",
                                "WQI_INDEX": WQI_Index,
                                "Value":value,
                                "CWQI":watertype,
                                "WATERSTATION":data.WATERSTATION
                            }
                            tool.watermapAddMark(mapRiver,itemEach,"","stationdetail","");
                        }
                    })
                }
            })
        }
    },
    createWaterStationHourGraph:function(data,pollution){
        var pollutionType;
        pollution=="总磷"?pollutionType="PHOSPHORUS":pollution=="高锰酸盐指数"?pollutionType="POTASSIUM":pollution=="氨氮"?pollutionType="AMMONIA":pollution=="溶解氧"?pollutionType="DISSOLVED":pollution=="type"?pollutionType="WQI":"";
        var pollutions;
        pollution=='type'?pollutions='WQI':pollutions=pollution;
        $("#waterPage_Content4_GraphHour").html("");
        $("#waterPage_Content4_GraphDay").html("");
        $("#waterPage_Content4_GraphOuterDivDay").hide();
        $("#waterPage_Content4_GraphOuterDivHour").show();
        id="waterPage_Content4_GraphHour";
        var yestoday="";
        var divEachDay;
        var loginwidth=$("#login").outerWidth();
        var highlest=0;
        if(pollution=='type'){
            $.each(data,function(i,item){
                var oldData=item;
                if(oldData.wqi!="--" && oldData.wqi!="NA"){
                    if(parseFloat(oldData.wqi)>highlest){
                        highlest=parseFloat(oldData.wqi);
                    }
                }
            });
        }else{
            $.each(data,function(i,item){
                var oldData=item;
                if(oldData[pollutionType.toLowerCase()+"_cwqi"]!="--" && oldData[pollutionType.toLowerCase()+"_cwqi"]!="NA"){
                    if(parseFloat(oldData[pollutionType.toLowerCase()+"_cwqi"])>highlest){
                        highlest=parseFloat(oldData[pollutionType.toLowerCase()+"_cwqi"]);
                    }
                }
            });
        }
        var perpx=parseFloat((parseFloat(103/highlest))).toFixed(3);
        $.each(data,function(i,item){
            var oldData=item;
            var time=oldData.timepoint+":00:00";
            time = Date.parse(time);
            var timenew=new Date(time);
            if(yestoday==""){
                yestoday=time;
                divEachDay=$("<div class='cityGraphDayDiv' name='"+i+"'><label class='cityGraphDayDivTime'>"+timenew.getFullYear()+"-"+(timenew.getMonth()+1)+"-"+timenew.getDate()+"</label><div class='cityGraphDayDivButtom'><div class='cityGraphDayDataDivBlank'></div></div></div>");
                if(timenew.getHours()<10){
                    divEachDay.children(".cityGraphDayDivTime").css("color","#000");
                }else{
                    divEachDay.children(".cityGraphDayDivTime").css("color","rgba(0,0,0,0)");
                    divEachDay.children(".cityGraphDayDivTime").css("width","10px");
                }
            }
            var color;
            if(pollution=="type"){
                color=tool.waterlevelColor(oldData.targetwater);
                // console.log(color)
                // console.log(oldData.targetwater)
            }else{
                color=tool.waterlevelColor(oldData[pollutionType.toLowerCase()+"_cwqi_level"]);
            }
            var divheight=0;
            if(pollution=='type'){
                if(oldData.wqi=="--" || oldData.wqi=="NA"){
                    divheight="0";
                }else{
                    divheight=oldData.wqi*perpx;
                }
                var waterdata="--";
                if(oldData.wqi){
                    waterdata=oldData.wqi;
                }
            }else{
                if(oldData[pollutionType.toLowerCase()+"_cwqi"]=="--" || oldData[pollutionType.toLowerCase()+"_cwqi"]=="NA"){
                    divheight="0";
                }else{
                    divheight=oldData[pollutionType.toLowerCase()+"_cwqi"]*perpx;
                }
                var waterdata="—";
                if(oldData[pollutionType.toLowerCase()+"_cwqi"]){
                    waterdata=oldData[pollutionType.toLowerCase()+"_cwqi"];
                }
            }
            if(!tool.ifSameDay(yestoday,time)){
                $("#"+id).prepend(divEachDay);
                divEachDay=$("<div class='cityGraphDayDiv'><label class='cityGraphDayDivTime'>"+timenew.getFullYear()+"-"+(timenew.getMonth()+1)+"-"+timenew.getDate()+"</label><div class='cityGraphDayDivButtom'><div class='cityGraphDayDataDivBlank'></div></div></div>");
                divEachDay.children(".cityGraphDayDivButtom").prepend($("<div class='cityGraphDayDataDiv' id='graphBarZZ"+i+"' graphBarCount='"+i+"' style='background-color:"+color+";width:10px;height:"+divheight+"px' watervalue='"+waterdata+"' watertype='"+pollutions+"' watertime='"+tool.cityGraphTooltipTime(timenew)+"'></div>"));
                yestoday=time;
            }else{
                divEachDay.children(".cityGraphDayDivButtom").prepend($("<div class='cityGraphDayDataDiv' id='graphBarZZ"+i+"' graphBarCount='"+i+"' style='background-color:"+color+";width:10px;height:"+divheight+"px' watervalue='"+waterdata+"' watertype='"+pollutions+"' watertime='"+tool.cityGraphTooltipTime(timenew)+"'></div>"));
                yestoday=time;
            }
        });

        $("#"+id).prepend(divEachDay);
        $(".cityGraphDayDivButtom").eq(-1).append($("<div style='background-color:#fff;width:8px;display: inline-block;vertical-align: bottom;margin-left:1px;margin-right:1px;'></div>"));

        $("#waterPage_Content4_GraphOuterDivHour").scrollLeft(10000);
        $(".cityGraphDayDataDivActive").removeClass("cityGraphDayDataDivActive");
        $(".cityGraphDayDataDiv").eq(-1).addClass("cityGraphDayDataDivActive");
        var time=$(".cityGraphDayDataDiv").eq(-1).attr("watertime");
        var type=$(".cityGraphDayDataDiv").eq(-1).attr("watertype");
        var value=$(".cityGraphDayDataDiv").eq(-1).attr("watervalue");
        $("#cityGraphDateLabelTooltip").children("span").text(time+" "+type+"="+value);

        var outerWidth=$("#login").outerWidth();
        var before = $("#waterPage_Content4_GraphOuterDivHour").scrollLeft();
        var barcount=$(".cityGraphDayDataDiv").length;
        $("#waterPage_Content4_GraphOuterDivHour").bind("scroll",function(){
            var after = $("#waterPage_Content4_GraphOuterDivHour").scrollLeft();
            var cha=Math.abs(before-after);
            if(cha>11){
                if (before<after) {
                    var now=parseInt($(".cityGraphDayDataDivActive").attr("graphBarCount"));
                    if(now!=(barcount-1)){
                        $(".cityGraphDayDataDivActive").removeClass("cityGraphDayDataDivActive");
                        var mustbeselected=$("#graphBarZZ"+(now+1));
                        mustbeselected.addClass("cityGraphDayDataDivActive");
                        var time=mustbeselected.attr("watertime");
                        var type=mustbeselected.attr("watertype");
                        var value=mustbeselected.attr("watervalue");
                        $("#waterGraphDateLabelTooltip").children("span").text(time+" "+type+"="+value);
                    }
                    before = after;
                };
                if (before>after) {
                    var now=parseInt($(".cityGraphDayDataDivActive").attr("graphBarCount"));
                    if(now!=0){
                        $(".cityGraphDayDataDivActive").removeClass("cityGraphDayDataDivActive");
                        var mustbeselected=$("#graphBarZZ"+(now-1));
                        mustbeselected.addClass("cityGraphDayDataDivActive");
                        var time=mustbeselected.attr("watertime");
                        var type=mustbeselected.attr("watertype");
                        var value=mustbeselected.attr("watervalue");
                        $("#waterGraphDateLabelTooltip").children("span").text(time+" "+type+"="+value);
                    }
                    before = after;
                };
            }
        });
        $("#waterPage_Content4_GraphOuterDivHour").on("scrollstop",function(){
            var mustbeselected=$("#waterPage_Content4_GraphHour .cityGraphDayDataDiv:left(>17):left(<26)");
            if(mustbeselected.attr("class")=="cityGraphDayDataDiv"){
                $(".cityGraphDayDataDivActive").removeClass("cityGraphDayDataDivActive");
                mustbeselected.addClass("cityGraphDayDataDivActive");
                var time=mustbeselected.attr("watertime");
                var type=mustbeselected.attr("watertype");
                var value=mustbeselected.attr("watervalue");
                $("#waterGraphDateLabelTooltip").children("span").text(time+" "+type+"="+value);
            }
        });
        $("#"+id).prepend($("<div style='display:inline-block;height:118px;border-top:1px solid #a7a7a7;border-bottom:1px solid #a7a7a7;width:"+(loginwidth-22)+"px'></div>"));
        $("#waterPage_Content4_GraphOuterDivHour").scrollLeft(10000);
        if(pollution=='type'){
            if(data[0].wqi=="--"){
                $("#waterGraphDateLabelTooltip").children("span").text("该站点未配备此因子仪器设备！");
                $("#waterGraphDateLabelTooltip").children("span").css({"margin-right":"20%","font-size":"16px"})
                $("#waterGraphDateLabelTooltip").css({"margin-top":"40px","margin-bottom":"40px"})
                $("#waterPage_Content4_GraphOuterDivDay").hide();
                $("#waterGraphDateLabelTooltipArrow").hide();
            }else{
                $("#waterGraphDateLabelTooltip").children("span").css({"margin-right":"0","font-size":"12px"})
                $("#waterGraphDateLabelTooltip").css({"margin-top":"-13px","margin-bottom":"0px"})
                $("#waterPage_Content4_GraphOuterDivHour").show();
                $(".waterGraphDateLabelTooltipArrow").show();
            }
        }else{
            console.log(data[0][pollutionType.toLowerCase()+"_cwqi"])
            if(data[0][pollutionType.toLowerCase()+"_cwqi"]=="--"){
                $("#waterGraphDateLabelTooltip").children("span").text("该站点未配备此因子仪器设备！");
                $("#waterGraphDateLabelTooltip").children("span").css({"margin-right":"20%","font-size":"16px"})
                $("#waterGraphDateLabelTooltip").css({"margin-top":"40px","margin-bottom":"40px"})
                $("#waterPage_Content4_GraphOuterDivHour").hide();
                $(".waterGraphDateLabelTooltipArrow").hide();
            }else{
                $("#waterGraphDateLabelTooltip").children("span").css({"margin-right":"0","font-size":"12px"})
                $("#waterGraphDateLabelTooltip").css({"margin-top":"-13px","margin-bottom":"0px"})
                $("#waterPage_Content4_GraphOuterDivHour").show();
                $(".waterGraphDateLabelTooltipArrow").show();
            }
        }
    },
    createWaterStationDayGraph:function(data,pollution){
        var pollutionType;
        pollution=="总磷"?pollutionType="PHOSPHORUS":pollution=="高锰酸盐指数"?pollutionType="POTASSIUM":pollution=="氨氮"?pollutionType="AMMONIA":pollution=="溶解氧"?pollutionType="DISSOLVED":pollution=="type"?pollutionType="WQI":"";
        var pollutions;
        pollution=='type'?pollutions='WQI':pollutions=pollution;
        $("#waterPage_Content4_GraphHour").html("");
        $("#waterPage_Content4_GraphDay").html("");
        $("#waterPage_Content4_GraphOuterDivDay").show();
        $("#waterPage_Content4_GraphOuterDivHour").hide();
        var id="waterPage_Content4_GraphDay";
        var yestoday="";
        var divEachDay;
        var loginwidth=$("#login").outerWidth();
        var highlest=0;
        if(pollution=='type'){
            $.each(data,function(i,item){
                var oldData=item;
                if(oldData.WQI!="--" && oldData.WQI!="NA"){
                    if(parseFloat(oldData.WQI)>highlest){
                        highlest=parseFloat(oldData.WQI);
                    }
                }
            });
        }else{
            $.each(data,function(i,item){
                var oldData=item;
                if(oldData[pollutionType].CWQI!="--" && oldData[pollutionType].CWQI!="NA"){
                    if(parseFloat(oldData[pollutionType].CWQI)>highlest){
                        highlest=parseFloat(oldData[pollutionType].CWQI);
                    }
                }
            });
        }
        var perpx=parseFloat((parseFloat(103/highlest)).toFixed(2));
        $.each(data,function(i,item){
            var oldData=item;
            var time=oldData.TIMEPOINT;
            time=time.replace(/-/g,"/");
            var timenew=new Date(time);
            if(yestoday==""){
                yestoday=oldData.TIMEPOINT;
                divEachDay=$("<div class='cityGraphDayDiv'><label class='cityGraphDayDivTime'>"+timenew.getFullYear()+"-"+(timenew.getMonth()+1)+"</label><div class='cityGraphDayDivButtom'><div class='cityGraphDayDataDivBlank'></div></div></div>");
                if(timenew.getHours()<10){
                    divEachDay.children(".cityGraphDayDivTime").css("color","#000");
                }else{
                    divEachDay.children(".cityGraphDayDivTime").css("color","rgba(0,0,0,0)");
                    divEachDay.children(".cityGraphDayDivTime").css("width","8px");
                }
            }
            var color;
            if(pollution=="type"){
                color=tool.waterlevelColor(oldData.TARGETWATER);
            }else{
                color=tool.waterlevelColor(oldData[pollutionType].CWQI_LEVEL);
            }
            var divheight=0;
            if(pollution=='type'){
                if(oldData.WQI=="--" || oldData.WQI=="NA"){
                    divheight="0";
                }else{
                    divheight=oldData.WQI*perpx;
                }
                var waterdata="--";
                if(oldData.WQI){
                    waterdata=oldData.WQI;
                }
            }else{
                if(oldData[pollutionType].CWQI=="--" || oldData[pollutionType].CWQI=="NA"){
                    divheight="0";
                }else{
                    divheight=oldData[pollutionType].CWQI*perpx;
                }
                var waterdata="—";
                if(oldData[pollutionType].CWQI){
                    waterdata=oldData[pollutionType].CWQI;
                }
            }

            if(!tool.ifSameMonth(yestoday,time)){
                $("#"+id).prepend(divEachDay);
                divEachDay=$("<div class='cityGraphDayDiv'><label class='cityGraphDayDivTime'>"+timenew.getFullYear()+"-"+(timenew.getMonth()+1)+"</label><div class='cityGraphDayDivButtom'><div class='cityGraphDayDataDivBlank'></div></div></div>");
                divEachDay.children(".cityGraphDayDivButtom").prepend($("<div class='cityGraphDayDataDiv' id='graphBarZZ"+i+"' graphBarCount='"+i+"' style='background-color:"+color+";width:8px;height:"+divheight+"px' watervalue='"+waterdata+"' watertype='"+pollutions+"' watertime='"+tool.cityGraphTooltipTime2(timenew)+"'></div>"));
                yestoday=time;
            }else{
                divEachDay.children(".cityGraphDayDivButtom").prepend($("<div class='cityGraphDayDataDiv' id='graphBarZZ"+i+"' graphBarCount='"+i+"' style='background-color:"+color+";width:8px;height:"+divheight+"px' watervalue='"+waterdata+"' watertype='"+pollutions+"' watertime='"+tool.cityGraphTooltipTime2(timenew)+"'></div>"));
                yestoday=time;
            }
        });
        $("#"+id).prepend(divEachDay);
        $(".cityGraphDayDivButtom").eq(-1).append($("<div style='background-color:#fff;width:8px;display: inline-block;vertical-align: bottom;margin-left:1px;margin-right:1px;'></div>"));

        $(".cityGraphDayDataDivActive").removeClass("cityGraphDayDataDivActive");
        $(".cityGraphDayDataDiv").eq(-1).addClass("cityGraphDayDataDivActive");
        var time=$(".cityGraphDayDataDiv").eq(-1).attr("watertime");
        var type=$(".cityGraphDayDataDiv").eq(-1).attr("watertype");
        var value=$(".cityGraphDayDataDiv").eq(-1).attr("watervalue");
        $("#cityGraphDateLabelTooltip").children("span").text(time+" "+type+"="+value);
        var outerWidth=$("#login").outerWidth();
        var before = $("#waterPage_Content4_GraphOuterDivDay").scrollLeft();
        var barcount=$(".cityGraphDayDataDiv").length;
        $("#waterPage_Content4_GraphOuterDivDay").bind("scroll",function(){
            var after = $("#waterPage_Content4_GraphOuterDivDay").scrollLeft();
            var cha=Math.abs(before-after);
            if(cha>9.5){
                if (before<after) {
                    var now=parseInt($(".cityGraphDayDataDivActive").attr("graphBarCount"));
                    if(now!=(barcount-1)){
                        $(".cityGraphDayDataDivActive").removeClass("cityGraphDayDataDivActive");
                        var mustbeselected=$("#graphBarZZ"+(now+1));
                        mustbeselected.addClass("cityGraphDayDataDivActive");
                        var time=mustbeselected.attr("watertime");
                        var type=mustbeselected.attr("watertype");
                        var value=mustbeselected.attr("watervalue");
                        $("#waterGraphDateLabelTooltip").children("span").text(time+" "+type+"="+value);
                    }
                    before = after;
                };
                if (before>after) {
                    var now=parseInt($(".cityGraphDayDataDivActive").attr("graphBarCount"));
                    if(now!=0){
                        $(".cityGraphDayDataDivActive").removeClass("cityGraphDayDataDivActive");
                        var mustbeselected=$("#graphBarZZ"+(now-1));
                        mustbeselected.addClass("cityGraphDayDataDivActive");
                        var time=mustbeselected.attr("watertime");
                        var type=mustbeselected.attr("watertype");
                        var value=mustbeselected.attr("watervalue");
                        $("#waterGraphDateLabelTooltip").children("span").text(time+" "+type+"="+value);
                    }
                    before = after;
                };
            }
        });
        $("#waterPage_Content4_GraphOuterDivDay").on("scrollstop",function(){
            var mustbeselected=$("#waterPage_Content4_GraphOuterDivDay .cityGraphDayDataDiv:left(>16):left(<27)");
            if(mustbeselected.attr("class")=="cityGraphDayDataDiv"){
                $(".cityGraphDayDataDivActive").removeClass("cityGraphDayDataDivActive");
                mustbeselected.addClass("cityGraphDayDataDivActive");
                var time=mustbeselected.attr("watertime");
                var type=mustbeselected.attr("watertype");
                var value=mustbeselected.attr("watervalue");
                $("#waterGraphDateLabelTooltip").children("span").text(time+" "+type+"="+value);
            }
        });
        $("#"+id).prepend($("<div style='display:inline-block;height:118px;border-top:1px solid #a7a7a7;border-bottom:1px solid #a7a7a7;width:"+(loginwidth-22)+"px'></div>"));
        $("#waterPage_Content4_GraphOuterDivDay").scrollLeft(10000);
        // if(pollution=='type'){
        //     if(data[0].WQI=="--"){
        //         $("#waterGraphDateLabelTooltip").children("span").text("该站点未配备此因子仪器设备！");
        //         $("#waterGraphDateLabelTooltip").children("span").css({"margin-right":"20%","font-size":"16px"})
        //         $("#waterGraphDateLabelTooltip").css({"margin-top":"20px"})
        //         $("#waterGraphDateLabelTooltip").children("span").text("该站点未配备此因子仪器设备！")
        //         $("#waterPage_Content4_GraphOuterDivDay").hide();
        //         $("#waterGraphDateLabelTooltipArrow").hide();
        //     }else{
        //         $("#waterGraphDateLabelTooltip").children("span").css({"margin-right":"0","font-size":"12px"})
        //         $("#waterGraphDateLabelTooltip").css({"margin-top":"-13px"})
        //         $("#waterPage_Content4_GraphOuterDivDay").show();
        //         $("#waterGraphDateLabelTooltipArrow").show();
        //     }
        // }else{
        if(data[0][pollutionType].CWQI=="--"){
            $("#waterGraphDateLabelTooltip").children("span").text("该站点未配备此因子仪器设备！");
            $("#waterGraphDateLabelTooltip").children("span").css({"margin-right":"20%","font-size":"16px"})
            $("#waterGraphDateLabelTooltip").css({"margin-top":"40px","margin-bottom":"40px"})
            $("#waterPage_Content4_GraphOuterDivDay").hide();
            $(".waterGraphDateLabelTooltipArrow").hide();
        }else{
            $("#waterGraphDateLabelTooltip").children("span").css({"margin-right":"0","font-size":"12px"})
            $("#waterGraphDateLabelTooltip").css({"margin-top":"-13px","margin-bottom":"0px"})
            $("#waterPage_Content4_GraphOuterDivDay").show();
            $(".waterGraphDateLabelTooltipArrow").show();
        }
        // }
    },
    cityPage_mapMark:function(gas,citycode){
        mapCity.clearOverlays();
        $.ajax({
            type:"post",
            url:provinceAjax+"/publish/getCityInfoCForApp",
            dataType:'json',
            async:true,
            data:{"cityCode":citycode},
            error:function(){
                $("#ajaxPleaseWait").hide();
                tool.warningAlert("warAFailed","获取地图信息失败");
            },
            complete:function(XMLHttpRequest){
                var data=eval("("+XMLHttpRequest.responseText+")");
                var mapdata=data.columns.STATIONREALTIMEAQI.data;
                $.each(mapdata,function(i,item){
                    var itemEach={};
                    itemEach.CITYCODE=item.columns.STATIONCODE;
                    itemEach.CITYNAME=item.columns.STATIONNAME;
                    itemEach.POINT=item.columns.LNG+"|"+item.columns.LAT;
                    itemEach.VALUE=eval("item.columns."+gas);
                    itemEach.GAS=gas;
                    if(itemEach.CITYCODE=="1008A"){
                        itemEach.POINT="103.85|30.75";
                    }
                    if(gas=="AQI"){
                        var level=tool.levelReturn("AQI",itemEach.VALUE);
                        var color=tool.levelColor(level);
                    }else{
                        var valuegas=tool.IAQIHourCal(gas.toLowerCase(),itemEach.VALUE);
                        var level=tool.levelReturn("AQI",valuegas);
                        var color=tool.levelColor(level);
                    }
                    itemEach.COLOR=color;
                    tool.mapAddMark(mapCity,itemEach,"","station","city","13");
                });
            }
        });
    },
    cityPage_gasTable:function(gas,citycode){
        var dw="μg/m³";
        if(dw=="AQI"){
            dw="";
        }else if(dw=="CO"){
            dw="mg/m³";
        }
        $.ajax({
            type:"post",
            url:provinceAjax+"/publish/getCityInfoCForApp",
            dataType:'json',
            async:true,
            data:{"cityCode":citycode},
            error:function(){$("#ajaxPleaseWait").hide();
                tool.warningAlert("warAFailed","获取浓度信息失败");
            },
            complete:function(XMLHttpRequest){
                var data=eval("("+XMLHttpRequest.responseText+")");
                var mapdata=data.columns.STATIONREALTIMEAQI.data;
                $("#cityGasTable").html("");
                $.each(mapdata,function(i,item){
                    var value=eval("item.columns."+gas);
                    if(value==null){
                        value="—";
                    }
                    if(gas=="AQI"){
                        var color=tool.levelColor(tool.levelReturn(gas,value)).color;
                    }else{
                        var valuegas=tool.IAQIHourCal(gas.toLowerCase(),value);
                        var color=tool.levelColor(tool.levelReturn("AQI",valuegas)).color;
                    }
                    var dwuse=dw;
                    if(value=="—"){
                        dwuse="";
                    }
                    var divEach=$("<div class='gasTableItem' stationcode='"+item.columns.STATIONCODE+"'>" +
                        "<div class='gasTableItemName'>"+item.columns.STATIONNAME+"</div>" +
                        "<div><div class='gasTableItemValue numberFontFamily' style='background-color:"+color+"'>"+value+"</div></div></div>");
                    $("#cityGasTable").append(divEach);
                });
            }
        });
    },
    createCityHourAndDayGraph:function(gas,type,data){
        var siteDetailType =  sessionStorage.getItem("siteDetailType")
        console.log("siteDetailType--->")
        console.log(siteDetailType)
        if(siteDetailType == "air"){
            var xlabel=new Array();
            var graphdata=new Array();
            var colorList=new Array();
            var id="";
            if(type=="hour"){
                console.log("hour小时---->")
                $("#cityPage_Content4_GraphDay").html("");
                $("#cityPage_Content4_GraphHour").html("");
                $("#cityPage_Content4_GraphOuterDivDay").hide();
                $("#cityPage_Content4_GraphOuterDivHour").show();
                id="cityPage_Content4_GraphHour";
                var yestoday="";
                var divEachDay;
                var loginwidth=$("#login").outerWidth();

                $("#"+id).append($("<div style='display:inline-block;height:118px;border-top:1px solid #a7a7a7;border-bottom:1px solid #a7a7a7;width:"+(loginwidth-22)+"px'></div>"));
                var highlest=0;
                $.each(data,function(i,item){
                    var oldData=item.data.columns;
                    if(oldData[gas]!="-" && oldData[gas]!="—" && oldData[gas]!=""){
                        if(parseFloat(oldData[gas])>highlest){
                            highlest=parseFloat(oldData[gas]);
                        }
                    }
                });
                var perpx=parseFloat((parseFloat(103/highlest)).toFixed(2));
                $.each(data,function(i,item){
                    var oldData=item.data.columns;
                    var time=oldData.TIMEPOINT;
                    var timenew=new Date(time);
                    if(yestoday==""){
                        yestoday=oldData.TIMEPOINT;
                        divEachDay=$("<div class='cityGraphDayDiv'><label class='cityGraphDayDivTime'>"+timenew.getFullYear()+"-"+(timenew.getMonth()+1)+"-"+timenew.getDate()+"</label><div class='cityGraphDayDivButtom'><div class='cityGraphDayDataDivBlank'></div></div></div>");
                        if(timenew.getHours()<10){
                            divEachDay.children(".cityGraphDayDivTime").css("color","#000");
                        }else{
                            divEachDay.children(".cityGraphDayDivTime").css("color","rgba(0,0,0,0)");
                            divEachDay.children(".cityGraphDayDivTime").css("width","8px");
                        }
                    }
                    var color;
                    if(gas=="AQI"){
                        color=tool.levelColor(tool.levelReturn(gas,oldData[gas])).color;
                    }else{
                        var valuegas=tool.IAQIHourCal(gas.toLowerCase(),oldData[gas]);
                        color=tool.levelColor(tool.levelReturn("AQI",valuegas)).color;
                    }
                    var divheight=0;
                    if(oldData[gas]=="—" || !oldData[gas]){
                        divheight="0";
                    }else{
                        divheight=oldData[gas]*perpx;
                    }
                    var gasdata="—";
                    if(oldData[gas]){
                        gasdata=oldData[gas];
                    }
                    if(!tool.ifSameDay(yestoday,time)){
                        $("#"+id).append(divEachDay);
                        divEachDay=$("<div class='cityGraphDayDiv'><label class='cityGraphDayDivTime'>"+timenew.getFullYear()+"-"+(timenew.getMonth()+1)+"-"+timenew.getDate()+"</label><div class='cityGraphDayDivButtom'><div class='cityGraphDayDataDivBlank'></div></div></div>");
                        divEachDay.children(".cityGraphDayDivButtom").append($("<div class='cityGraphDayDataDiv' id='graphBarZZ"+i+"' graphBarCount='"+i+"' style='background-color:"+color+";width:8px;height:"+divheight+"px' gasvalue='"+gasdata+"' gastype='"+gas+"' gastime='"+tool.cityGraphTooltipTime(timenew)+"'></div>"));
                        yestoday=time;
                    }else{
                        divEachDay.children(".cityGraphDayDivButtom").append($("<div class='cityGraphDayDataDiv' id='graphBarZZ"+i+"' graphBarCount='"+i+"' style='background-color:"+color+";width:8px;height:"+divheight+"px' gasvalue='"+gasdata+"' gastype='"+gas+"' gastime='"+tool.cityGraphTooltipTime(timenew)+"'></div>"));
                        yestoday=time;
                    }
                });

                $("#"+id).append(divEachDay);

                $("#cityPage_Content4_GraphOuterDivHour").scrollLeft(10000);
                $(".cityGraphDayDataDivActive").removeClass("cityGraphDayDataDivActive");
                $(".cityGraphDayDataDiv").eq(-1).addClass("cityGraphDayDataDivActive");
                var time=$(".cityGraphDayDataDiv").eq(-1).attr("gastime");
                var type=$(".cityGraphDayDataDiv").eq(-1).attr("gastype");
                var value=$(".cityGraphDayDataDiv").eq(-1).attr("gasvalue");
                $("#cityGraphDateLabelTooltip").children("span").text(time+" "+type+"="+value);

                var outerWidth=$("#login").outerWidth();
                var before = $("#cityPage_Content4_GraphOuterDivHour").scrollLeft();
                var barcount=$(".cityGraphDayDataDiv").length;
                $("#cityPage_Content4_GraphOuterDivHour").bind("scroll",function(){
                    var after = $("#cityPage_Content4_GraphOuterDivHour").scrollLeft();
                    var cha=Math.abs(before-after);
                    if(cha>9.5){
                        if (before<after) {
                            var now=parseInt($(".cityGraphDayDataDivActive").attr("graphBarCount"));
                            if(now!=(barcount-1)){
                                $(".cityGraphDayDataDivActive").removeClass("cityGraphDayDataDivActive");
                                var mustbeselected=$("#graphBarZZ"+(now+1));
                                mustbeselected.addClass("cityGraphDayDataDivActive");
                                var time=mustbeselected.attr("gastime");
                                var type=mustbeselected.attr("gastype");
                                var value=mustbeselected.attr("gasvalue");
                                $("#cityGraphDateLabelTooltip").children("span").text(time+" "+type+"="+value);
                            }
                            before = after;
                        };
                        if (before>after) {
                            var now=parseInt($(".cityGraphDayDataDivActive").attr("graphBarCount"));
                            if(now!=0){
                                $(".cityGraphDayDataDivActive").removeClass("cityGraphDayDataDivActive");
                                var mustbeselected=$("#graphBarZZ"+(now-1));
                                mustbeselected.addClass("cityGraphDayDataDivActive");
                                var time=mustbeselected.attr("gastime");
                                var type=mustbeselected.attr("gastype");
                                var value=mustbeselected.attr("gasvalue");
                                $("#cityGraphDateLabelTooltip").children("span").text(time+" "+type+"="+value);
                            }
                            before = after;
                        };
                    }
                });
                $("#cityPage_Content4_GraphOuterDivHour").on("scrollstop",function(){
                    var mustbeselected=$("#cityPage_Content4_GraphHour .cityGraphDayDataDiv:left(>16):left(<27)");
                    if(mustbeselected.attr("class")=="cityGraphDayDataDiv"){
                        $(".cityGraphDayDataDivActive").removeClass("cityGraphDayDataDivActive");
                        mustbeselected.addClass("cityGraphDayDataDivActive");
                        var time=mustbeselected.attr("gastime");
                        var type=mustbeselected.attr("gastype");
                        var value=mustbeselected.attr("gasvalue");
                        $("#cityGraphDateLabelTooltip").children("span").text(time+" "+type+"="+value);
                    }
                });
                $(".cityGraphDayDivButtom").eq(-1).append($("<div style='background-color:#fff;width:8px;display: inline-block;vertical-align: bottom;margin-left:1px;margin-right:1px;'></div>"));
            }else{
                $("#cityPage_Content4_GraphHour").html("");
                $("#cityPage_Content4_GraphDay").html("");
                $("#cityPage_Content4_GraphOuterDivDay").show();
                $("#cityPage_Content4_GraphOuterDivHour").hide();
                id="cityPage_Content4_GraphDay";
                var yestoday="";
                var divEachDay;
                var loginwidth=$("#login").outerWidth();
                $("#"+id).append($("<div style='display:inline-block;height:118px;border-top:1px solid #a7a7a7;border-bottom:1px solid #a7a7a7;width:"+(loginwidth-22)+"px'></div>"));
                var highlest=0;
                $.each(data,function(i,item){
                    var oldData=item;
                    if(oldData[gas]!="-" && oldData[gas]!="—" && oldData[gas]!=""){
                        if(parseFloat(oldData[gas])>highlest){
                            highlest=parseFloat(oldData[gas]);
                        }
                    }
                });
                var perpx=parseFloat((parseFloat(103/highlest)).toFixed(2));
                $.each(data,function(i,item){
                    var oldData=item;
                    var time=oldData.TIMEPOINT;
                    time=time.replace(/-/g,"/");
                    var timenew=new Date(time);
                    if(yestoday==""){
                        yestoday=oldData.TIMEPOINT;
                        divEachDay=$("<div class='cityGraphDayDiv'><label class='cityGraphDayDivTime'>"+timenew.getFullYear()+"-"+(timenew.getMonth()+1)+"</label><div class='cityGraphDayDivButtom'><div class='cityGraphDayDataDivBlank'></div></div></div>");
                        if(timenew.getHours()<10){
                            divEachDay.children(".cityGraphDayDivTime").css("color","#000");
                        }else{
                            divEachDay.children(".cityGraphDayDivTime").css("color","rgba(0,0,0,0)");
                            divEachDay.children(".cityGraphDayDivTime").css("width","8px");
                        }
                    }
                    var color;
                    if(gas=="AQI"){
                        color=tool.levelColor(tool.levelReturn(gas,oldData[gas])).color;
                    }else{
                        var valuegas=tool.IAQIHourCal(gas.toLowerCase(),oldData[gas]);
                        color=tool.levelColor(tool.levelReturn("AQI",valuegas)).color;
                    }
                    var divheight=0;
                    if(oldData[gas]=="—" || !oldData[gas]){
                        divheight="0";
                    }else{
                        divheight=oldData[gas]*perpx;
                    }
                    var gasdata="—";
                    if(oldData[gas]){
                        gasdata=oldData[gas];
                    }
                    if(!tool.ifSameMonth(yestoday,time)){
                        $("#"+id).append(divEachDay);
                        divEachDay=$("<div class='cityGraphDayDiv'><label class='cityGraphDayDivTime'>"+timenew.getFullYear()+"-"+(timenew.getMonth()+1)+"</label><div class='cityGraphDayDivButtom'><div class='cityGraphDayDataDivBlank'></div></div></div>");
                        divEachDay.children(".cityGraphDayDivButtom").append($("<div class='cityGraphDayDataDiv' id='graphBarZZ"+i+"' graphBarCount='"+i+"' style='background-color:"+color+";width:8px;height:"+divheight+"px' gasvalue='"+gasdata+"' gastype='"+gas+"' gastime='"+tool.cityGraphTooltipTime2(timenew)+"'></div>"));
                        yestoday=time;
                    }else{
                        divEachDay.children(".cityGraphDayDivButtom").append($("<div class='cityGraphDayDataDiv' id='graphBarZZ"+i+"' graphBarCount='"+i+"' style='background-color:"+color+";width:8px;height:"+divheight+"px' gasvalue='"+gasdata+"' gastype='"+gas+"' gastime='"+tool.cityGraphTooltipTime2(timenew)+"'></div>"));
                        yestoday=time;
                    }
                });
                $("#"+id).append(divEachDay);
                $(".cityGraphDayDivButtom").eq(-1).append($("<div style='background-color:#fff;width:8px;display: inline-block;vertical-align: bottom;margin-left:1px;margin-right:1px;'></div>"));

                $(".cityGraphDayDataDivActive").removeClass("cityGraphDayDataDivActive");
                $(".cityGraphDayDataDiv").eq(-1).addClass("cityGraphDayDataDivActive");
                var time=$(".cityGraphDayDataDiv").eq(-1).attr("gastime");
                var type=$(".cityGraphDayDataDiv").eq(-1).attr("gastype");
                var value=$(".cityGraphDayDataDiv").eq(-1).attr("gasvalue");
                $("#cityGraphDateLabelTooltip").children("span").text(time+" "+type+"="+value);
                var outerWidth=$("#login").outerWidth();
                var before = $("#cityPage_Content4_GraphOuterDivDay").scrollLeft();
                var barcount=$(".cityGraphDayDataDiv").length;
                $("#cityPage_Content4_GraphOuterDivDay").bind("scroll",function(){
                    var after = $("#cityPage_Content4_GraphOuterDivDay").scrollLeft();
                    var cha=Math.abs(before-after);
                    if(cha>9.5){
                        if (before<after) {
                            var now=parseInt($(".cityGraphDayDataDivActive").attr("graphBarCount"));
                            if(now!=(barcount-1)){
                                $(".cityGraphDayDataDivActive").removeClass("cityGraphDayDataDivActive");
                                var mustbeselected=$("#graphBarZZ"+(now+1));
                                mustbeselected.addClass("cityGraphDayDataDivActive");
                                var time=mustbeselected.attr("gastime");
                                var type=mustbeselected.attr("gastype");
                                var value=mustbeselected.attr("gasvalue");
                                $("#cityGraphDateLabelTooltip").children("span").text(time+" "+type+"="+value);
                            }
                            before = after;
                        };
                        if (before>after) {
                            var now=parseInt($(".cityGraphDayDataDivActive").attr("graphBarCount"));
                            if(now!=0){
                                $(".cityGraphDayDataDivActive").removeClass("cityGraphDayDataDivActive");
                                var mustbeselected=$("#graphBarZZ"+(now-1));
                                mustbeselected.addClass("cityGraphDayDataDivActive");
                                var time=mustbeselected.attr("gastime");
                                var type=mustbeselected.attr("gastype");
                                var value=mustbeselected.attr("gasvalue");
                                $("#cityGraphDateLabelTooltip").children("span").text(time+" "+type+"="+value);
                            }
                            before = after;
                        };
                    }
                });
                $("#cityPage_Content4_GraphOuterDivDay").on("scrollstop",function(){
                    var mustbeselected=$("#cityPage_Content4_GraphDay .cityGraphDayDataDiv:left(>16):left(<27)");
                    if(mustbeselected.attr("class")=="cityGraphDayDataDiv"){
                        $(".cityGraphDayDataDivActive").removeClass("cityGraphDayDataDivActive");
                        mustbeselected.addClass("cityGraphDayDataDivActive");
                        var time=mustbeselected.attr("gastime");
                        var type=mustbeselected.attr("gastype");
                        var value=mustbeselected.attr("gasvalue");
                        $("#cityGraphDateLabelTooltip").children("span").text(time+" "+type+"="+value);
                    }
                });
                $("#cityPage_Content4_GraphOuterDivDay").scrollLeft(10000);
            }
        }
        if(siteDetailType == "airSiteCountries"){
            var xlabel=new Array();
            var graphdata=new Array();
            var colorList=new Array();
            var id="";
            if(type=="hour"){
                console.log("hour小时---->")
                $("#cityPage_Content4_GraphDay").html("");
                $("#cityPage_Content4_GraphHour").html("");
                $("#cityPage_Content4_GraphOuterDivDay").hide();
                $("#cityPage_Content4_GraphOuterDivHour").show();
                id="cityPage_Content4_GraphHour";
                var yestoday="";
                var divEachDay;
                var loginwidth=$("#login").outerWidth();

                $("#"+id).append($("<div style='display:inline-block;height:118px;border-top:1px solid #a7a7a7;border-bottom:1px solid #a7a7a7;width:"+(loginwidth-22)+"px'></div>"));
                var highlest=0;
                $.each(data,function(i,item){
                    var oldData=item;
                    if(oldData[gas]!="-" && oldData[gas]!="—" && oldData[gas]!=""){
                        if(parseFloat(oldData[gas])>highlest){
                            highlest=parseFloat(oldData[gas]);
                        }
                    }
                });
                var perpx=parseFloat((parseFloat(103/highlest)).toFixed(2));
                $.each(data,function(i,item){
                    var oldData=item;
                    var time=oldData.TimePoint;
                    var timenew=new Date(time);
                    if(yestoday==""){
                        yestoday=oldData.TimePoint;
                        divEachDay=$("<div class='cityGraphDayDiv'><label class='cityGraphDayDivTime'>"+timenew.getFullYear()+"-"+(timenew.getMonth()+1)+"-"+timenew.getDate()+"</label><div class='cityGraphDayDivButtom'><div class='cityGraphDayDataDivBlank'></div></div></div>");
                        if(timenew.getHours()<10){
                            divEachDay.children(".cityGraphDayDivTime").css("color","#000");
                        }else{
                            divEachDay.children(".cityGraphDayDivTime").css("color","rgba(0,0,0,0)");
                            divEachDay.children(".cityGraphDayDivTime").css("width","8px");
                        }
                    }
                    var color;
                    if(gas=="AQI"){
                        color=tool.levelColor(tool.levelReturn(gas,oldData[gas])).color;
                    }else{
                        var valuegas=tool.IAQIHourCal(gas.toLowerCase(),oldData[gas]);
                        color=tool.levelColor(tool.levelReturn("AQI",valuegas)).color;
                    }
                    var divheight=0;
                    if(oldData[gas]=="—" || !oldData[gas]){
                        divheight="0";
                    }else{
                        divheight=oldData[gas]*perpx;
                    }
                    var gasdata="—";
                    if(oldData[gas]){
                        gasdata=oldData[gas];
                    }
                    if(!tool.ifSameDay(yestoday,time)){
                        $("#"+id).append(divEachDay);
                        divEachDay=$("<div class='cityGraphDayDiv'><label class='cityGraphDayDivTime'>"+timenew.getFullYear()+"-"+(timenew.getMonth()+1)+"-"+timenew.getDate()+"</label><div class='cityGraphDayDivButtom'><div class='cityGraphDayDataDivBlank'></div></div></div>");
                        divEachDay.children(".cityGraphDayDivButtom").append($("<div class='cityGraphDayDataDiv' id='graphBarZZ"+i+"' graphBarCount='"+i+"' style='background-color:"+color+";width:8px;height:"+divheight+"px' gasvalue='"+gasdata+"' gastype='"+gas+"' gastime='"+tool.cityGraphTooltipTime(timenew)+"'></div>"));
                        yestoday=time;
                    }else{
                        divEachDay.children(".cityGraphDayDivButtom").append($("<div class='cityGraphDayDataDiv' id='graphBarZZ"+i+"' graphBarCount='"+i+"' style='background-color:"+color+";width:8px;height:"+divheight+"px' gasvalue='"+gasdata+"' gastype='"+gas+"' gastime='"+tool.cityGraphTooltipTime(timenew)+"'></div>"));
                        yestoday=time;
                    }
                });

                $("#"+id).append(divEachDay);

                $("#cityPage_Content4_GraphOuterDivHour").scrollLeft(10000);
                $(".cityGraphDayDataDivActive").removeClass("cityGraphDayDataDivActive");
                $(".cityGraphDayDataDiv").eq(-1).addClass("cityGraphDayDataDivActive");
                var time=$(".cityGraphDayDataDiv").eq(-1).attr("gastime");
                var type=$(".cityGraphDayDataDiv").eq(-1).attr("gastype");
                var value=$(".cityGraphDayDataDiv").eq(-1).attr("gasvalue");
                $("#cityGraphDateLabelTooltip").children("span").text(time+" "+type+"="+value);

                var outerWidth=$("#login").outerWidth();
                var before = $("#cityPage_Content4_GraphOuterDivHour").scrollLeft();
                var barcount=$(".cityGraphDayDataDiv").length;
                $("#cityPage_Content4_GraphOuterDivHour").bind("scroll",function(){
                    var after = $("#cityPage_Content4_GraphOuterDivHour").scrollLeft();
                    var cha=Math.abs(before-after);
                    if(cha>9.5){
                        if (before<after) {
                            var now=parseInt($(".cityGraphDayDataDivActive").attr("graphBarCount"));
                            if(now!=(barcount-1)){
                                $(".cityGraphDayDataDivActive").removeClass("cityGraphDayDataDivActive");
                                var mustbeselected=$("#graphBarZZ"+(now+1));
                                mustbeselected.addClass("cityGraphDayDataDivActive");
                                var time=mustbeselected.attr("gastime");
                                var type=mustbeselected.attr("gastype");
                                var value=mustbeselected.attr("gasvalue");
                                $("#cityGraphDateLabelTooltip").children("span").text(time+" "+type+"="+value);
                            }
                            before = after;
                        };
                        if (before>after) {
                            var now=parseInt($(".cityGraphDayDataDivActive").attr("graphBarCount"));
                            if(now!=0){
                                $(".cityGraphDayDataDivActive").removeClass("cityGraphDayDataDivActive");
                                var mustbeselected=$("#graphBarZZ"+(now-1));
                                mustbeselected.addClass("cityGraphDayDataDivActive");
                                var time=mustbeselected.attr("gastime");
                                var type=mustbeselected.attr("gastype");
                                var value=mustbeselected.attr("gasvalue");
                                $("#cityGraphDateLabelTooltip").children("span").text(time+" "+type+"="+value);
                            }
                            before = after;
                        };
                    }
                });
                $("#cityPage_Content4_GraphOuterDivHour").on("scrollstop",function(){
                    var mustbeselected=$("#cityPage_Content4_GraphHour .cityGraphDayDataDiv:left(>16):left(<27)");
                    if(mustbeselected.attr("class")=="cityGraphDayDataDiv"){
                        $(".cityGraphDayDataDivActive").removeClass("cityGraphDayDataDivActive");
                        mustbeselected.addClass("cityGraphDayDataDivActive");
                        var time=mustbeselected.attr("gastime");
                        var type=mustbeselected.attr("gastype");
                        var value=mustbeselected.attr("gasvalue");
                        $("#cityGraphDateLabelTooltip").children("span").text(time+" "+type+"="+value);
                    }
                });
                $(".cityGraphDayDivButtom").eq(-1).append($("<div style='background-color:#fff;width:8px;display: inline-block;vertical-align: bottom;margin-left:1px;margin-right:1px;'></div>"));
            }else{
                $("#cityPage_Content4_GraphHour").html("");
                $("#cityPage_Content4_GraphDay").html("");
                $("#cityPage_Content4_GraphOuterDivDay").show();
                $("#cityPage_Content4_GraphOuterDivHour").hide();
                id="cityPage_Content4_GraphDay";
                var yestoday="";
                var divEachDay;
                var loginwidth=$("#login").outerWidth();
                $("#"+id).append($("<div style='display:inline-block;height:118px;border-top:1px solid #a7a7a7;border-bottom:1px solid #a7a7a7;width:"+(loginwidth-22)+"px'></div>"));
                var highlest=0;
                $.each(data,function(i,item){
                    var oldData=item;
                    if(oldData[gas]!="-" && oldData[gas]!="—" && oldData[gas]!=""){
                        if(parseFloat(oldData[gas])>highlest){
                            highlest=parseFloat(oldData[gas]);
                        }
                    }
                });
                var perpx=parseFloat((parseFloat(103/highlest)).toFixed(2));
                $.each(data,function(i,item){
                    var oldData=item;
                    var time=oldData.TimePoint;
                    //time=time.replace(/-/g,"/");
                    var timenew=new Date(time);
                    if(yestoday==""){
                        yestoday=oldData.TimePoint;
                        divEachDay=$("<div class='cityGraphDayDiv'><label class='cityGraphDayDivTime'>"+timenew.getFullYear()+"-"+(timenew.getMonth()+1)+"</label><div class='cityGraphDayDivButtom'><div class='cityGraphDayDataDivBlank'></div></div></div>");
                        if(timenew.getHours()<10){
                            divEachDay.children(".cityGraphDayDivTime").css("color","#000");
                        }else{
                            divEachDay.children(".cityGraphDayDivTime").css("color","rgba(0,0,0,0)");
                            divEachDay.children(".cityGraphDayDivTime").css("width","8px");
                        }
                    }
                    var color;
                    if(gas=="AQI"){
                        color=tool.levelColor(tool.levelReturn(gas,oldData[gas])).color;
                    }else{
                        var valuegas=tool.IAQIHourCal(gas.toLowerCase(),oldData[gas]);
                        color=tool.levelColor(tool.levelReturn("AQI",valuegas)).color;
                    }
                    var divheight=0;
                    if(oldData[gas]=="—" || !oldData[gas]){
                        divheight="0";
                    }else{
                        divheight=oldData[gas]*perpx;
                    }
                    var gasdata="—";
                    if(oldData[gas]){
                        gasdata=oldData[gas];
                    }
                    if(!tool.ifSameMonth(yestoday,time)){
                        $("#"+id).append(divEachDay);
                        divEachDay=$("<div class='cityGraphDayDiv'><label class='cityGraphDayDivTime'>"+timenew.getFullYear()+"-"+(timenew.getMonth()+1)+"</label><div class='cityGraphDayDivButtom'><div class='cityGraphDayDataDivBlank'></div></div></div>");
                        divEachDay.children(".cityGraphDayDivButtom").append($("<div class='cityGraphDayDataDiv' id='graphBarZZ"+i+"' graphBarCount='"+i+"' style='background-color:"+color+";width:8px;height:"+divheight+"px' gasvalue='"+gasdata+"' gastype='"+gas+"' gastime='"+tool.cityGraphTooltipTime2(timenew)+"'></div>"));
                        yestoday=time;
                    }else{
                        divEachDay.children(".cityGraphDayDivButtom").append($("<div class='cityGraphDayDataDiv' id='graphBarZZ"+i+"' graphBarCount='"+i+"' style='background-color:"+color+";width:8px;height:"+divheight+"px' gasvalue='"+gasdata+"' gastype='"+gas+"' gastime='"+tool.cityGraphTooltipTime2(timenew)+"'></div>"));
                        yestoday=time;
                    }
                });
                $("#"+id).append(divEachDay);
                $(".cityGraphDayDivButtom").eq(-1).append($("<div style='background-color:#fff;width:8px;display: inline-block;vertical-align: bottom;margin-left:1px;margin-right:1px;'></div>"));

                $(".cityGraphDayDataDivActive").removeClass("cityGraphDayDataDivActive");
                $(".cityGraphDayDataDiv").eq(-1).addClass("cityGraphDayDataDivActive");
                var time=$(".cityGraphDayDataDiv").eq(-1).attr("gastime");
                var type=$(".cityGraphDayDataDiv").eq(-1).attr("gastype");
                var value=$(".cityGraphDayDataDiv").eq(-1).attr("gasvalue");
                $("#cityGraphDateLabelTooltip").children("span").text(time+" "+type+"="+value);
                var outerWidth=$("#login").outerWidth();
                var before = $("#cityPage_Content4_GraphOuterDivDay").scrollLeft();
                var barcount=$(".cityGraphDayDataDiv").length;
                $("#cityPage_Content4_GraphOuterDivDay").bind("scroll",function(){
                    var after = $("#cityPage_Content4_GraphOuterDivDay").scrollLeft();
                    var cha=Math.abs(before-after);
                    if(cha>9.5){
                        if (before<after) {
                            var now=parseInt($(".cityGraphDayDataDivActive").attr("graphBarCount"));
                            if(now!=(barcount-1)){
                                $(".cityGraphDayDataDivActive").removeClass("cityGraphDayDataDivActive");
                                var mustbeselected=$("#graphBarZZ"+(now+1));
                                mustbeselected.addClass("cityGraphDayDataDivActive");
                                var time=mustbeselected.attr("gastime");
                                var type=mustbeselected.attr("gastype");
                                var value=mustbeselected.attr("gasvalue");
                                $("#cityGraphDateLabelTooltip").children("span").text(time+" "+type+"="+value);
                            }
                            before = after;
                        };
                        if (before>after) {
                            var now=parseInt($(".cityGraphDayDataDivActive").attr("graphBarCount"));
                            if(now!=0){
                                $(".cityGraphDayDataDivActive").removeClass("cityGraphDayDataDivActive");
                                var mustbeselected=$("#graphBarZZ"+(now-1));
                                mustbeselected.addClass("cityGraphDayDataDivActive");
                                var time=mustbeselected.attr("gastime");
                                var type=mustbeselected.attr("gastype");
                                var value=mustbeselected.attr("gasvalue");
                                $("#cityGraphDateLabelTooltip").children("span").text(time+" "+type+"="+value);
                            }
                            before = after;
                        };
                    }
                });
                $("#cityPage_Content4_GraphOuterDivDay").on("scrollstop",function(){
                    var mustbeselected=$("#cityPage_Content4_GraphDay .cityGraphDayDataDiv:left(>16):left(<27)");
                    if(mustbeselected.attr("class")=="cityGraphDayDataDiv"){
                        $(".cityGraphDayDataDivActive").removeClass("cityGraphDayDataDivActive");
                        mustbeselected.addClass("cityGraphDayDataDivActive");
                        var time=mustbeselected.attr("gastime");
                        var type=mustbeselected.attr("gastype");
                        var value=mustbeselected.attr("gasvalue");
                        $("#cityGraphDateLabelTooltip").children("span").text(time+" "+type+"="+value);
                    }
                });
                $("#cityPage_Content4_GraphOuterDivDay").scrollLeft(10000);
            }
        }
        /*else if(siteDetailType == "airSiteCountries"){
            var xlabel=new Array();
            var graphdata=new Array();
            var colorList=new Array();
            var id="";
            if(type=="hour"){
                $("#cityPage_Content4_GraphDay").html("");
                $("#cityPage_Content4_GraphHour").html("");
                $("#cityPage_Content4_GraphOuterDivDay").hide();
                $("#cityPage_Content4_GraphOuterDivHour").show();
                id="cityPage_Content4_GraphHour";
                var yestoday="";
                var divEachDay;
                var loginwidth=$("#login").outerWidth();
                var highlest=0;
                $.each(data,function(i,item){
                    var oldData=item;
                    if(gas='AQI'){
                        if(oldData[gas]!="-" && oldData[gas]!="—" && oldData[gas]!=""){
                            if(parseFloat(oldData[gas])>highlest){
                                highlest=parseFloat(oldData[gas]);
                            }
                        }
                    }else{
                        if(oldData[gas]!="-" && oldData[gas]!="—" && oldData[gas]!=""){
                            if(parseFloat(oldData[gas])>highlest){
                                highlest=parseFloat(oldData[gas]);
                            }
                        }
                    }
                });
                var perpx=parseFloat((parseFloat(103/highlest)).toFixed(2));
                $.each(data,function(i,item){
                    var oldData=item;
                    var time=oldData.TimePoint;
                    var timenew=new Date(time);
                    if(yestoday==""){
                        yestoday=oldData.TimePoint;
                        divEachDay=$("<div class='cityGraphDayDiv'><label class='cityGraphDayDivTime'>"+timenew.getFullYear()+"-"+(timenew.getMonth()+1)+"-"+timenew.getDate()+"</label><div class='cityGraphDayDivButtom'><div class='cityGraphDayDataDivBlank'></div></div></div>");
                        if(timenew.getHours()<10){
                            divEachDay.children(".cityGraphDayDivTime").css("color","#000");
                        }else{
                            divEachDay.children(".cityGraphDayDivTime").css("color","rgba(0,0,0,0)");
                            divEachDay.children(".cityGraphDayDivTime").css("width","8px");
                        }
                    }
                    var color;
                    if(gas=="AQI"){
                        color=tool.levelColor(tool.levelReturn(gas,oldData[gas])).color;
                    }else{
                        var valuegas=tool.IAQIHourCal(gas.toLowerCase(),oldData[gas]);
                        color=tool.levelColor(tool.levelReturn("AQI",valuegas)).color;
                    }
                    var divheight=0;
                    if(oldData[gas]=="—" || !oldData[gas]){
                        divheight="0";
                    }else{
                        divheight=oldData[gas]*perpx;
                    }
                    var gasdata="—";
                    if(oldData[gas]){
                        gasdata=oldData[gas];
                    }
                    if(!tool.ifSameDay(yestoday,time)){
                        $("#"+id).prepend(divEachDay);
                        divEachDay=$("<div class='cityGraphDayDiv'><label class='cityGraphDayDivTime'>"+timenew.getFullYear()+"-"+(timenew.getMonth()+1)+"-"+timenew.getDate()+"</label><div class='cityGraphDayDivButtom'><div class='cityGraphDayDataDivBlank'></div></div></div>");
                        divEachDay.children(".cityGraphDayDivButtom").append($("<div class='cityGraphDayDataDiv' id='graphBarZZ"+i+"' graphBarCount='"+i+"' style='background-color:"+color+";width:8px;height:"+divheight+"px' gasvalue='"+gasdata+"' gastype='"+gas+"' gastime='"+tool.cityGraphTooltipTime(timenew)+"'></div>"));
                        yestoday=time;
                    }else{
                        divEachDay.children(".cityGraphDayDivButtom").append($("<div class='cityGraphDayDataDiv' id='graphBarZZ"+i+"' graphBarCount='"+i+"' style='background-color:"+color+";width:8px;height:"+divheight+"px' gasvalue='"+gasdata+"' gastype='"+gas+"' gastime='"+tool.cityGraphTooltipTime(timenew)+"'></div>"));
                        yestoday=time;
                    }
                });

                $("#"+id).prepend(divEachDay);
                $("#"+id).prepend($("<div style='display:inline-block;height:118px;border-top:1px solid #a7a7a7;border-bottom:1px solid #a7a7a7;width:"+(loginwidth-22)+"px'></div>"));
                $("#cityPage_Content4_GraphOuterDivHour").scrollLeft(10000);
                $(".cityGraphDayDataDivActive").removeClass("cityGraphDayDataDivActive");
                $(".cityGraphDayDataDiv").eq(-1).addClass("cityGraphDayDataDivActive");
                var time=$(".cityGraphDayDataDiv").eq(-1).attr("gastime");
                var type=$(".cityGraphDayDataDiv").eq(-1).attr("gastype");
                var value=$(".cityGraphDayDataDiv").eq(-1).attr("gasvalue");
                $("#cityGraphDateLabelTooltip").children("span").text(time+" "+type+"="+value);

                var outerWidth=$("#login").outerWidth();
                var before = $("#cityPage_Content4_GraphOuterDivHour").scrollLeft();
                var barcount=$(".cityGraphDayDataDiv").length;
                $("#cityPage_Content4_GraphOuterDivHour").bind("scroll",function(){
                    var after = $("#cityPage_Content4_GraphOuterDivHour").scrollLeft();
                    var cha=Math.abs(before-after);
                    if(cha>9.5){
                        if (before<after) {
                            var now=parseInt($(".cityGraphDayDataDivActive").attr("graphBarCount"));
                            if(now!=(barcount-1)){
                                $(".cityGraphDayDataDivActive").removeClass("cityGraphDayDataDivActive");
                                var mustbeselected=$("#graphBarZZ"+(now+1));
                                mustbeselected.addClass("cityGraphDayDataDivActive");
                                var time=mustbeselected.attr("gastime");
                                var type=mustbeselected.attr("gastype");
                                var value=mustbeselected.attr("gasvalue");
                                $("#cityGraphDateLabelTooltip").children("span").text(time+" "+type+"="+value);
                            }
                            before = after;
                        };
                        if (before>after) {
                            var now=parseInt($(".cityGraphDayDataDivActive").attr("graphBarCount"));
                            if(now!=0){
                                $(".cityGraphDayDataDivActive").removeClass("cityGraphDayDataDivActive");
                                var mustbeselected=$("#graphBarZZ"+(now-1));
                                mustbeselected.addClass("cityGraphDayDataDivActive");
                                var time=mustbeselected.attr("gastime");
                                var type=mustbeselected.attr("gastype");
                                var value=mustbeselected.attr("gasvalue");
                                $("#cityGraphDateLabelTooltip").children("span").text(time+" "+type+"="+value);
                            }
                            before = after;
                        };
                    }
                });
                $("#cityPage_Content4_GraphOuterDivHour").on("scrollstop",function(){
                    var mustbeselected=$("#cityPage_Content4_GraphHour .cityGraphDayDataDiv:left(>16):left(<27)");
                    if(mustbeselected.attr("class")=="cityGraphDayDataDiv"){
                        $(".cityGraphDayDataDivActive").removeClass("cityGraphDayDataDivActive");
                        mustbeselected.addClass("cityGraphDayDataDivActive");
                        var time=mustbeselected.attr("gastime");
                        var type=mustbeselected.attr("gastype");
                        var value=mustbeselected.attr("gasvalue");
                        $("#cityGraphDateLabelTooltip").children("span").text(time+" "+type+"="+value);
                    }
                });
                $(".cityGraphDayDivButtom").eq(-1).append($("<div style='background-color:#fff;width:8px;display: inline-block;vertical-align: bottom;margin-left:1px;margin-right:1px;'></div>"));
            }else{
                $("#cityPage_Content4_GraphHour").html("");
                $("#cityPage_Content4_GraphDay").html("");
                $("#cityPage_Content4_GraphOuterDivDay").show();
                $("#cityPage_Content4_GraphOuterDivHour").hide();
                id="cityPage_Content4_GraphDay";
                var yestoday="";
                var divEachDay;
                var loginwidth=$("#login").outerWidth();
                var highlest=0;
                $.each(data,function(i,item){
                    var oldData=item;
                    if(oldData[gas]!="-" && oldData[gas]!="—" && oldData[gas]!=""){
                        if(parseFloat(oldData[gas])>highlest){
                            highlest=parseFloat(oldData[gas]);
                        }
                    }
                });
                var perpx=parseFloat((parseFloat(103/highlest)).toFixed(2));
                $.each(data,function(i,item){
                    var oldData=item;
                    var time=oldData.TimePoint;
                    var timenew=new Date(time);
                    if(yestoday==""){
                        yestoday=oldData.TimePoint;
                        divEachDay=$("<div class='cityGraphDayDiv'><label class='cityGraphDayDivTime'>"+timenew.getFullYear()+"-"+(timenew.getMonth()+1)+"</label><div class='cityGraphDayDivButtom'><div class='cityGraphDayDataDivBlank'></div></div></div>");
                        if(timenew.getHours()<10){
                            divEachDay.children(".cityGraphDayDivTime").css("color","#000");
                        }else{
                            divEachDay.children(".cityGraphDayDivTime").css("color","rgba(0,0,0,0)");
                            divEachDay.children(".cityGraphDayDivTime").css("width","8px");
                        }
                    }
                    var color;
                    if(gas=="AQI"){
                        color=tool.levelColor(tool.levelReturn(gas,oldData[gas])).color;
                    }else{
                        var valuegas=tool.IAQIHourCal(gas.toLowerCase(),oldData[gas]);
                        color=tool.levelColor(tool.levelReturn("AQI",valuegas)).color;
                    }
                    var divheight=0;
                    if(oldData[gas]=="—" || !oldData[gas]){
                        divheight="0";
                    }else{
                        divheight=oldData[gas]*perpx;
                    }
                    var gasdata="—";
                    if(oldData[gas]){
                        gasdata=oldData[gas];
                    }
                    if(!tool.ifSameMonth(yestoday,time)){
                        $("#"+id).append(divEachDay);
                        divEachDay=$("<div class='cityGraphDayDiv'><label class='cityGraphDayDivTime'>"+timenew.getFullYear()+"-"+(timenew.getMonth()+1)+"</label><div class='cityGraphDayDivButtom'><div class='cityGraphDayDataDivBlank'></div></div></div>");
                        divEachDay.children(".cityGraphDayDivButtom").append($("<div class='cityGraphDayDataDiv' id='graphBarZZ"+i+"' graphBarCount='"+i+"' style='background-color:"+color+";width:8px;height:"+divheight+"px' gasvalue='"+gasdata+"' gastype='"+gas+"' gastime='"+tool.cityGraphTooltipTime2(timenew)+"'></div>"));
                        yestoday=time;
                    }else{
                        divEachDay.children(".cityGraphDayDivButtom").append($("<div class='cityGraphDayDataDiv' id='graphBarZZ"+i+"' graphBarCount='"+i+"' style='background-color:"+color+";width:8px;height:"+divheight+"px' gasvalue='"+gasdata+"' gastype='"+gas+"' gastime='"+tool.cityGraphTooltipTime2(timenew)+"'></div>"));
                        yestoday=time;
                    }
                });
                $("#"+id).prepend(divEachDay);
                $(".cityGraphDayDivButtom").eq(-1).append($("<div style='background-color:#fff;width:8px;display: inline-block;vertical-align: bottom;margin-left:1px;margin-right:1px;'></div>"));
                $(".cityGraphDayDataDivActive").removeClass("cityGraphDayDataDivActive");
                $(".cityGraphDayDataDiv").eq(-1).addClass("cityGraphDayDataDivActive");
                var time=$(".cityGraphDayDataDiv").eq(-1).attr("gastime");
                var type=$(".cityGraphDayDataDiv").eq(-1).attr("gastype");
                var value=$(".cityGraphDayDataDiv").eq(-1).attr("gasvalue");
                $("#cityGraphDateLabelTooltip").children("span").text(time+" "+type+"="+value);
                var outerWidth=$("#login").outerWidth();
                var before = $("#cityPage_Content4_GraphOuterDivDay").scrollLeft();
                var barcount=$(".cityGraphDayDataDiv").length;
                $("#cityPage_Content4_GraphOuterDivDay").bind("scroll",function(){
                    var after = $("#cityPage_Content4_GraphOuterDivDay").scrollLeft();
                    var cha=Math.abs(before-after);
                    if(cha>9.5){
                        if (before<after) {
                            var now=parseInt($(".cityGraphDayDataDivActive").attr("graphBarCount"));
                            if(now!=(barcount-1)){
                                $(".cityGraphDayDataDivActive").removeClass("cityGraphDayDataDivActive");
                                var mustbeselected=$("#graphBarZZ"+(now+1));
                                mustbeselected.addClass("cityGraphDayDataDivActive");
                                var time=mustbeselected.attr("gastime");
                                var type=mustbeselected.attr("gastype");
                                var value=mustbeselected.attr("gasvalue");
                                $("#cityGraphDateLabelTooltip").children("span").text(time+" "+type+"="+value);
                            }
                            before = after;
                        };
                        if (before>after) {
                            var now=parseInt($(".cityGraphDayDataDivActive").attr("graphBarCount"));
                            if(now!=0){
                                $(".cityGraphDayDataDivActive").removeClass("cityGraphDayDataDivActive");
                                var mustbeselected=$("#graphBarZZ"+(now-1));
                                mustbeselected.addClass("cityGraphDayDataDivActive");
                                var time=mustbeselected.attr("gastime");
                                var type=mustbeselected.attr("gastype");
                                var value=mustbeselected.attr("gasvalue");
                                $("#cityGraphDateLabelTooltip").children("span").text(time+" "+type+"="+value);
                            }
                            before = after;
                        };
                    }
                });
                $("#cityPage_Content4_GraphOuterDivDay").on("scrollstop",function(){
                    var mustbeselected=$("#cityPage_Content4_GraphDay .cityGraphDayDataDiv:left(>16):left(<27)");
                    if(mustbeselected.attr("class")=="cityGraphDayDataDiv"){
                        $(".cityGraphDayDataDivActive").removeClass("cityGraphDayDataDivActive");
                        mustbeselected.addClass("cityGraphDayDataDivActive");
                        var time=mustbeselected.attr("gastime");
                        var type=mustbeselected.attr("gastype");
                        var value=mustbeselected.attr("gasvalue");
                        $("#cityGraphDateLabelTooltip").children("span").text(time+" "+type+"="+value);
                    }
                });
                $("#"+id).prepend($("<div style='display:inline-block;height:118px;border-top:1px solid #a7a7a7;border-bottom:1px solid #a7a7a7;width:"+(loginwidth-22)+"px'></div>"));
                $("#cityPage_Content4_GraphOuterDivDay").scrollLeft(10000);
            }
        }*/
    },
    indexCityPage_StationInit:function(citycode,stationcode){
        $("#cityPage_stationBackToCity").unbind().click(function(){
            $.mobile.changePage("#cityPage?citycode="+citycode,{transition:"slide",reverse:"true"});
        });
        $("#ajaxPleaseWait").show();
        $.ajax({
            type:"post",
            url:provinceAjax+"/publish/getCityInfoCForApp",
            dataType:'json',
            async:true,
            data:{"cityCode":citycode},
            error:function(){$("#ajaxPleaseWait").hide();
                tool.warningAlert("warAFailed","获取地图信息失败");
            },
            complete:function(XMLHttpRequest){
                $("#ajaxPleaseWait").hide();
                var data=eval("("+XMLHttpRequest.responseText+")");
                var mapdata=data.columns.STATIONREALTIMEAQI.data;
                $("#cityGasTable").html("");
                $.each(mapdata,function(i,item){
                    if(item.columns.STATIONCODE==stationcode){
                        $("#cityPage_stationTitle").text(item.columns.STATIONNAME);
                        $("#cityPageStationAQIValue").text(item.columns.AQI);
                        var level=tool.levelReturn("AQI",item.columns.AQI);
                        $.each(levelColor,function(j,itemj){
                            if(itemj.level==level){
                                $("#cityPageStationLevel").text(itemj.type);
                                $("#cityPageStationLevel").css("background-color",itemj.color)
                            }
                        });
                        $("#cityPageStation_Content2ItemSO2").text(item.columns.SO2);
                        $("#cityPageStation_Content2ItemNO2").text(item.columns.NO2);
                        $("#cityPageStation_Content2ItemCO").text(item.columns.CO);
                        $("#cityPageStation_Content2ItemO3").text(item.columns.O3);
                        $("#cityPageStation_Content2ItemPM2_5").text(item.columns.PM2_5);
                        $("#cityPageStation_Content2ItemPM10").text(item.columns.PM10);


                        var backColor=tool.levelColorBack(tool.levelReturn("AQI",item.columns.ISO2));
                        var color=tool.levelColor(tool.levelReturn("AQI",item.columns.ISO2)).color;
                        $("#cityPageStation_Content2ItemSO2BarBack").css("background-color",backColor);
                        $("#cityPageStation_Content2ItemSO2Bar").css("background-color",color);

                        var backColor=tool.levelColorBack(tool.levelReturn("AQI",item.columns.INO2));
                        var color=tool.levelColor(tool.levelReturn("AQI",item.columns.INO2)).color;
                        $("#cityPageStation_Content2ItemNO2BarBack").css("background-color",backColor);
                        $("#cityPageStation_Content2ItemNO2Bar").css("background-color",color);

                        var backColor=tool.levelColorBack(tool.levelReturn("AQI",item.columns.ICO));
                        var color=tool.levelColor(tool.levelReturn("AQI",item.columns.ICO)).color;
                        $("#cityPageStation_Content2ItemCOBarBack").css("background-color",backColor);
                        $("#cityPageStation_Content2ItemCOBar").css("background-color",color);

                        var backColor=tool.levelColorBack(tool.levelReturn("AQI",item.columns.IO3));
                        var color=tool.levelColor(tool.levelReturn("AQI",item.columns.IO3)).color;
                        $("#cityPageStation_Content2ItemO3BarBack").css("background-color",backColor);
                        $("#cityPageStation_Content2ItemO3Bar").css("background-color",color);

                        var backColor=tool.levelColorBack(tool.levelReturn("AQI",item.columns.IPM2_5));
                        var color=tool.levelColor(tool.levelReturn("AQI",item.columns.IPM2_5)).color;
                        $("#cityPageStation_Content2ItemPM2_5BarBack").css("background-color",backColor);
                        $("#cityPageStation_Content2ItemPM2_5Bar").css("background-color",color);

                        var backColor=tool.levelColorBack(tool.levelReturn("AQI",item.columns.IPM10));
                        var color=tool.levelColor(tool.levelReturn("AQI",item.columns.IPM10)).color;
                        $("#cityPageStation_Content2ItemPM10BarBack").css("background-color",backColor);
                        $("#cityPageStation_Content2ItemPM10Bar").css("background-color",color);

                        $("#cityStationGasChangeBar").children("div").unbind().click(function(){
                            var gas=$(this).attr("gas");
                            $(".cityStationGasTableActive").removeClass("cityStationGasTableActive");
                            $(this).addClass("cityStationGasTableActive");
                            var type=$(".cityStationPage_Content3ButtonActive").attr("datatype");
                            if(type=="hour"){
                                $("#ajaxPleaseWait").show();
                                $.ajax({
                                    type:"GET",
                                    url:provinceAjax+"/publish/getStationOneMonthRealTimeAQIForApp",
                                    dataType:'json',
                                    async:true,
                                    data:{"stationCode":stationcode},
                                    error:function(){$("#ajaxPleaseWait").hide();
                                        tool.warningAlert("warAFailed","获取信息失败");
                                    },
                                    complete:function(XMLHttpRequest){
                                        $("#ajaxPleaseWait").hide();
                                        var data=eval("("+XMLHttpRequest.responseText+")");
                                        menuFunction.createCityStationHourAndDayGraph(type,data,gas);
                                    }
                                });
                            }else if(type=="day"){
                                $("#ajaxPleaseWait").show();
                                $.ajax({
                                    type:"GET",
                                    url:provinceAjax+"/publish/getStation365DayAQIForApp",
                                    dataType:'json',
                                    async:true,
                                    data:{"stationCode":stationcode},
                                    error:function(){$("#ajaxPleaseWait").hide();
                                        tool.warningAlert("warAFailed","获取信息失败");
                                    },
                                    complete:function(XMLHttpRequest){
                                        $("#ajaxPleaseWait").hide();
                                        var data=eval("("+XMLHttpRequest.responseText+")");
                                        menuFunction.createCityStationHourAndDayGraph(type,data,gas);
                                    }
                                });
                            }
                        });

                        $(".cityPageStation_Content3Button").unbind().click(function(){
                            $(".cityStationPage_Content3ButtonActive").removeClass("cityStationPage_Content3ButtonActive");
                            $(this).addClass("cityStationPage_Content3ButtonActive");
                            $(".cityStationGasTableActive").click();
                        });
                        $(".cityPageStation_Content3Button").eq(0).click();

                    }
                });
            }
        });
    },
    createCityStationHourAndDayGraph:function(type,data,gas){
        var gasUp=gas.toUpperCase();
        var xlabel=new Array();
        var graphdata=new Array();
        var colorList=new Array();
        var id="";
        if(type=="hour"){
            $.each(data,function(i,item){
                var oldData=item;
                var hourtime=new Date(oldData.timePoint);
                hourtime=hourtime.getFullYear()+"/"+(hourtime.getMonth()+1)+"/"+hourtime.getDate()+" "+hourtime.getHours()+":00";
                xlabel.push(hourtime);
                var datavalue="";
                if(oldData.data.columns[gasUp]){
                    datavalue=oldData.data.columns[gasUp];
                }else{
                    datavalue="-";
                }
                graphdata.push(datavalue);
                if(gas=="aqi"){
                    var color=tool.levelColor(tool.levelReturn(gasUp,datavalue));
                    colorList.push(color);
                }else{
                    var valuegas=tool.IAQIHourCal(gas,datavalue);
                    var color=tool.levelColor(tool.levelReturn("AQI",valuegas));
                    colorList.push(color);
                }
            });
            id="cityPageStation_Content3_GraphHour";
            $("#cityPageStation_Content3_GraphOuterDivDay").hide();
            $("#cityPageStation_Content3_GraphOuterDivHour").show();
            $("#cityPageStation_Content3_GraphHour").css("width","3500px");
        }else{
            $.each(data,function(i,item){
                var oldData=item;
                var time=new Date(oldData.TIMEPOINT);
                xlabel.push(time.getFullYear()+"/"+time.getMonth()+"/"+time.getDate());
                graphdata.push(oldData.AQI);
                var color=tool.levelColor(tool.levelReturn("AQI",oldData.AQI));
                colorList.push(color);
            });
            id="cityPageStation_Content3_GraphDay";
            $("#cityPageStation_Content3_GraphOuterDivDay").show();
            $("#cityPageStation_Content3_GraphOuterDivHour").hide();
            $("#cityPageStation_Content3_GraphDay").css("width","3500px");
        }

        var myChart = echarts.init(document.getElementById(id));
        myChart.setOption({
            backgroundColor:"#fff",
            grid:{
                x:0,
                y:0,
                x2:0,
                y2:0
            },
            tooltip : {
                trigger:'axis'
            },
            toolbox: {
                show : false
            },
            calculable : false,
            legend: {
                show:false,
                data:[gasUp]
            },
            xAxis : [
                {
                    type : 'category',
                    data : xlabel
                }
            ],
            yAxis : [
                {
                    type : 'value',
                    show:false
                }
            ],
            series :[
                {
                    name:gasUp,
                    type:'bar',
                    itemStyle: {
                        normal: {
                            color: function(params) {
                                return colorList[params.dataIndex]
                            }
                        }
                    },
                    data:graphdata
                }
            ]
        });

        $("#cityPageStation_Content3_GraphOuterDivHour").scrollLeft(1000);
        $("#cityPageStation_Content3_GraphOuterDivDay").scrollLeft(1000);
    },
    //测管协同模块
    auditPage_init:function(){
        $("#auditPage .mainHeader").find("span").unbind().click(function(){
            $("#auditPage .mainHeader").find("span").removeClass("active");
            $(this).addClass("active");
            var type=$(this).attr("datatype");
            switch(type){
                case "air":
                    localStorage.Abnormal="air";
                    sessionStorage.setItem('AWChooseBarStatus', 0);
                    menuFunction.Abnormal_init();
                    break;
                case "water":
                    localStorage.Abnormal="water";
                    sessionStorage.setItem('AWChooseBarStatus', 1);
                    menuFunction.Abnormal_init();
                    break;
            }
        });
        var typeChooseBarStatus = sessionStorage.getItem('AWChooseBarStatus')
        typeChooseBarStatus ? $("#auditPage .mainHeader").find("span").eq(typeChooseBarStatus).click() : $("#auditPage .mainHeader").find("span").eq(0).click();
        $(".footerMenuLi:nth-child(2)").bind().click(function(){
            $(".footwarningNmb").hide();
        })
    },
    Abnormal_init:function(){
        var AWChooseBarStatus = sessionStorage.getItem("AWChooseBarStatus")
        ///绑定切换“异常汇总”、“市州异常情况”事件
        $("#typeChooseBar").find("div").unbind().click(function(){
            $("#typeChooseBar").find("div").removeClass("AbnormalChooseActive");
            $(this).addClass("AbnormalChooseActive");
            var type=$(this).attr("datatype");
            switch(type){
                case "AbnormalCount"://异常汇总
                    menuFunction.AbnormalCount_init();
                    sessionStorage.setItem("waterAbnormaltype","AbnormalCount")
                    sessionStorage.setItem('typeChooseBarStatus', 0);
                    break;
                case "AbnormalSituation"://市州异常情况
                    menuFunction.AbnormalSituation_init();
                    sessionStorage.setItem("waterAbnormaltype","AbnormalSituation")
                    sessionStorage.setItem('typeChooseBarStatus', 1);
                    break;
            }
        });
        var typeChooseBarStatus = sessionStorage.getItem('typeChooseBarStatus')//获取session判断当前属于：空气/水质
        if(AWChooseBarStatus=='1'){
            $("#typeChooseBar").find("div").eq(0).click();
            $("#typeChooseBar").hide()
        }else{
            $("#typeChooseBar").show()
            typeChooseBarStatus ? $("#typeChooseBar").find("div").eq(typeChooseBarStatus).click() : $("#typeChooseBar").find("div").eq(0).click();
        }
    },
    AbnormalCount_init:function(){
        var Abnormal = localStorage.Abnormal;
        var userid = localStorage.userid;
        var userName = localStorage.loginName;
        // var userName = "杨渊_1"
        if(Abnormal=="air"){
            $("#auditPage_Content").html("");
            $("#auditPage_Content").css("padding","0px");
            $.ajax({
                type:"POST",
                url:myURL+"/alarmavg/findCountAvg",
                data:{
                    UserId:userid,
                },
                error:function(err){
                    console.log("error exits!"+err)
                },
                success:function(data){
                    var div1=$("<div class='AbnormalCountTable' datatype='Lv1'>测管协同Ⅰ级响应</div>");
                    var div2=$("<div class='AbnormalCountTable' datatype='Lv2'>测管协同Ⅱ级响应</div>");
                    var div3=$("<div class='AbnormalCountTable' datatype='Lv3'>测管协同Ⅲ级响应</div>");
                    var div4=$("<div class='AbnormalCountTable' datatype='nodata' id='d4'>无数据</div>");
                    var div5=$("<div class='AbnormalCountTable' datatype='datakeep' id='d5'>数据恒定</div>");
                    var div6=$("<div class='AbnormalCountTable' datatype='dataleave' id='d6'>数据离群</div>");
                    var div7=$("<div class='AbnormalCountTable' datatype='dataexceed ' id='d7'>数据超过阀值</div>");
                    var dataJson = eval('('+data+')')
                    if(dataJson['测管协同I级响应']>0){
                        div1=$("<div class='AbnormalCountTable' datatype='Lv1'>测管协同Ⅰ级响应<div class='warningNmb'>"+dataJson["测管协同I级响应"]+"</div></div>");
                    }
                    if(dataJson['测管协同II级响应']>0){
                        div2=$("<div class='AbnormalCountTable' datatype='Lv2'>测管协同Ⅱ级响应<div class='warningNmb'>"+dataJson['测管协同II级响应']+"</div></div>");
                    }
                    if(dataJson['测管协同III级响应']>0){
                        div3=$("<div class='AbnormalCountTable' datatype='Lv3'>测管协同Ⅲ级响应<div class='warningNmb'>"+dataJson['测管协同III级响应']+"</div></div>");
                    }
                    if(dataJson['无数据']>0){
                        div4=$("<div class='AbnormalCountTable' datatype='nodata' id='d4' >无数据<div class='warningNmb'>"+dataJson['无数据']+"</div></div>");
                    }
                    if(dataJson['数据恒定']>0){
                        div5=$("<div class='AbnormalCountTable' datatype='datakeep' id='d5' >数据恒定<div class='warningNmb'>"+dataJson['数据恒定']+"</div></div>");
                    }
                    if(dataJson['数据离群']>0){
                        div6=$("<div class='AbnormalCountTable' datatype='dataleave' id='d6' >数据离群<div class='warningNmb'>"+dataJson['数据离群']+"</div></div>");
                    }
                    if(dataJson['数据超过阀值']>0){
                        div7=$("<div class='AbnormalCountTable' datatype='dataexceed' id='d7'>数据超过阀值<div class='warningNmb'>"+dataJson['数据超过阀值']+"</div></div>");
                    }
                    $("#auditPage_Content").append(div1);
                    $("#auditPage_Content").append(div2);
                    $("#auditPage_Content").append(div3);
                    $("#auditPage_Content").append(div4);
                    $("#auditPage_Content").append(div5);
                    $("#auditPage_Content").append(div6);
                    $("#auditPage_Content").append(div7);
                    $("#d4").hide();
                    $("#d5").hide();
                    $("#d6").hide();
                    $("#d7").hide();
                    $.ajax({
                        type:"POST",
                        url:myURL+config.findmodule,
                        data:{UserId:localStorage.userid},
                        error:function(err){
                            console.log(err)
                        },
                        success:function(dataobj){
                            $.map(dataobj,function(value,index){
                                $("#d"+value.ModuleType).show();
                                $("#"+value.ModuleType).attr("checked", true);
                                $("#d6").hide();
                                $("#d7").hide();
                            })
                        }
                    })
                    $(".AbnormalCountTable").unbind().click(function(){
                        var AbnormalType=$(this).attr("datatype");
                        // if(AbnormalType=='Lv1'){
                        //     $(this).children("div").hide();
                        // }else if(AbnormalType=='Lv2'){
                        //     $(this).children("div").hide();
                        // }else if(AbnormalType=='Lv3'){
                        //     $(this).children("div").hide();
                        // }else if(AbnormalType=='nodata'){
                        //     $(this).children("div").hide();
                        // }else if(AbnormalType=='datakeep'){
                        //     $(this).children("div").hide();
                        // }else if(AbnormalType=='dataleave'){
                        //     $(this).children("div").hide();
                        // }else if(AbnormalType=='dataexceed'){
                        //     $(this).children("div").hide();
                        // }
                        sessionStorage.setItem("AbnormalType",AbnormalType);
                        $.mobile.changePage("#abnormalPage",{transition:"slide"});
                    });
                    $("#auditPage_Content>.AbnormalCountTable:nth-child(1)").css("margin-top","38px")
                }
            })
        }else if(Abnormal=="water"){
            $("#auditPage_Content").html("")
            $("#auditPage_Content").css("padding","0px");
            var jsonCount;
            $.ajax({
                type:"GET",
                dataType: "json",
                url:waterUrl+config.waterAbnormalCount,
                async:false,
                data: {
                    name: userName
                },
                error:function(err){
                    console.log("err exites!")
                    console.log(err)
                },
                success: function (data) {
                    jsonCount = data;
                },
           })
            var div1=$("<div class='AbnormalCountTable' datatype='Lv1'>测管协同Ⅰ级响应</div>");
            var div2=$("<div class='AbnormalCountTable' datatype='Lv2'>测管协同Ⅱ级响应</div>");
            var div3=$("<div class='AbnormalCountTable' datatype='Lv3'>测管协同Ⅲ级响应</div>");
            var div4=$("<div class='AbnormalCountTable' id='w4' datatype='nodata'>数值为零</div>");
            var div5=$("<div class='AbnormalCountTable' id='w5' datatype='datakeep'>数值恒定</div>");
            var div6=$("<div class='AbnormalCountTable' id='w7' datatype='dataleave'>数值偏大</div>");
            var div7=$("<div class='AbnormalCountTable' id='w6' datatype='dataexceed '>数据离群</div>");
            if(jsonCount){
                if(jsonCount[4]&&jsonCount[4]!=="0"){
                    div1=$("<div class='AbnormalCountTable' datatype='Lv1'>测管协同Ⅰ级响应<div class='warningNmb'>"+jsonCount[4]+"</div></div>");
                }
                if(jsonCount[5]&&jsonCount[5]!=="0"){
                    div2=$("<div class='AbnormalCountTable' datatype='Lv2'>测管协同Ⅱ级响应<div class='warningNmb'>"+jsonCount[5]+"</div></div>");
                }
                if(jsonCount[6]&&jsonCount[6]!=="0"){
                    div3=$("<div class='AbnormalCountTable' datatype='Lv3'>测管协同Ⅲ级响应<div class='warningNmb'>"+jsonCount[6]+"</div></div>");
                }
                if(jsonCount[1]&&jsonCount[1]!=="0"){
                    div4=$("<div class='AbnormalCountTable' datatype='nodata' id='w4'>数值为零<div class='warningNmb'>"+jsonCount[1]+"</div></div>");
                }
                if(jsonCount[3]&&jsonCount[3]!=="0"){
                    div5=$("<div class='AbnormalCountTable' datatype='datakeep' id='w5'>数值恒定<div class='warningNmb'>"+jsonCount[2]+"</div></div>");
                }
                if(jsonCount[7]&&jsonCount[7]!=="0"){
                    div7=$("<div class='AbnormalCountTable' datatype='dataleave' id='w6'>数据离群<div class='warningNmb'>"+jsonCount[7]+"</div></div>");
                }
                if(jsonCount[2]&&jsonCount[2]!=="0"){
                    div6=$("<div class='AbnormalCountTable' datatype='dataexceed' id='w7'>数值偏大<div class='warningNmb'>"+jsonCount[3]+"</div></div>");
                }
            }

            $("#auditPage_Content").append(div1);
            $("#auditPage_Content").append(div2);
            $("#auditPage_Content").append(div3);
            $("#auditPage_Content").append(div4);
            $("#auditPage_Content").append(div5);
            $("#auditPage_Content").append(div6);
            $("#auditPage_Content").append(div7);
            $("#w4").hide();
            $("#w5").hide();
            $("#w6").hide();
            $("#w7").hide();
            // $.ajax({
            //     type:"POST",
            //     url:myURL+config.findwatermodule,
            //     data:{
            //         name:localStorage.loginName
            //     },
            //     error:function(err){
            //         console.log(err)
            //     },
            //     success:function(dataobj){
            //         $.map(dataobj,function(value,index){
            //             var type;
            //             switch (value.ModuleType){
            //                 case "1":
            //                     type = "4";
            //                     break;
            //                 case "2":
            //                     type = "5";
            //                     break;
            //                 case "3":
            //                     type = "7";
            //                     break;
            //                 case "7":
            //                     type = "6";
            //                     break;
            //             }
            //             console.log(type)
            //             $("#w"+type).attr("checked", true);
            //         })
            //     }
            // })
            $.ajax({
                type:"POST",
                url:myURL+config.findwatermodule,
                data:{
                    name:localStorage.loginName
                },
                error:function(err){
                    console.log(err)
                },
                success:function(dataobj){
                    $.map(dataobj,function(value,index){
                        var type;
                        switch (value.ModuleType){
                            case "1":
                                type = "4";
                                break;
                            case "2":
                                type = "5";
                                break;
                            case "3":
                                type = "7";
                                break;
                            case "7":
                                type = "6";
                                break;
                        }
                        $("#w"+type).show();
                        $("#wa"+type).attr("checked", true);
                    })
                }
            })
            $(".AbnormalCountTable").unbind().click(function(){
                var AbnormalType=$(this).attr("datatype");
                if(AbnormalType=='Lv1'){
                    sessionStorage.setItem("waterflag1",'0');
                }else if(AbnormalType=='Lv2'){
                    sessionStorage.setItem("waterflag2",'0');
                }else if(AbnormalType=='Lv3'){
                    sessionStorage.setItem("waterflag3",'0');
                }
                sessionStorage.setItem("AbnormalType",AbnormalType);
                $.mobile.changePage("#abnormalPage",{transition:"slide"});
            });
            $("#auditPage_Content>.AbnormalCountTable:nth-child(1)").css("margin-top","0px")
        }
    },
    AbnormalSituation_init:function(){
        var Abnormal = localStorage.Abnormal;
        var time=new Date((new Date()).setDate((new Date()).getDate()-1));
        time=time.getFullYear()+"-"+(time.getMonth()+1)+"-"+time.getDate();
        var userid = localStorage.userid;
        var role = localStorage.role;
        if(role.indexOf(',')>0){
            var role = role.split(',');
            for (var i in role){
                // console.log(roles[i])
                if(role[i]==1){//超级管理员
                    role='1';
                }else if(role[i]==2){//省站人员
                    role='2';
                }else if(role[i]==3){//市州人员
                    role='3';
                }else if(role[i]==3150)//运维人员
                {
                    role='3150';
                }
            }
        }else{
            role = localStorage.role;
        }
        $("#auditPage_Content").html("");
        $("#auditPage_Content").css("padding","0px");
        $("#ajaxPleaseWait").show();
        if(Abnormal == 'air'){
            $.ajax({
                type:"GET",
                url:myURL+"/alarm/find"+"?role="+role+"&UserId="+userid,
                dataType:'json',
                async:true,
                data:{},
                error:function(){
                    $("#ajaxPleaseWait").hide();
                    tool.warningAlert("warAFailed","获取信息失败");
                },
                complete:function(XMLHttpRequest){
                    $("#ajaxPleaseWait").hide();
                    var data=eval("("+XMLHttpRequest.responseText+")");
                    $.each(data,function(key,value){
                        var date = key;
                        var dataobj = value;
                        var div=$("<div class='outlierdataTable' timepoint='"+date+"'></div>");
                        var timepoint=$("<div class='timepoint'>"+date+"</div>");
                        div.append(timepoint);
                        var sites = "";
                        $.each(dataobj,function(k,v){
                            var site = k;
                            if(site == "province"){
                                site = "省控";
                            }else if(site == "country"){
                                site = "国控";
                            }
                            if(v>0){
                                sites =$("<div class='borderbox' site='"+site+"'><div class='listitem'>"+site+"</div><div class='warningNmb'>"+v+"</div></div>");
                            }else if(v==0){
                                sites =$("<div class='borderbox' site='"+site+"'><div class='listitem'>"+site+"</div></div>");
                            }
                            div.append(sites);
                            // var site = k;
                            // if(site == "country"){
                            //     site = "国控";
                            //     if(v>0){
                            //         sites =$("<div class='borderbox'><div class='listitem'>"+site+"</div><div class='warningNmb'>"+v+"</div></div>");
                            //     }else if(v==0){
                            //         sites =$("<div class='borderbox'><div class='listitem'>"+site+"</div><div class='normalNmb'>"+v+"</div></div>");
                            //     }
                            //     div.append(sites);
                            // }

                        })
                        $("#auditPage_Content").append(div);
                    })
                    $("div.borderbox").unbind().click(function(){
                        var site = $(this).attr("site");
                        site == "省控" ? sessionStorage.setItem("subBarStatus","1") : sessionStorage.setItem("subBarStatus","0");
                    })
                    $("div.outlierdataTable").unbind().click(function(){
                        var timepointpass=$(this).attr("timepoint");
                        sessionStorage.setItem("timepoint",timepointpass);
                        sessionStorage.setItem("role",role)
                        $.mobile.changePage("#citylistPage",{transition:"slide"});
                    });
                }
            });
        }
        else if(Abnormal == 'water'){
            $("#ajaxPleaseWait").hide();
            $.ajax({
                type:"POST",
                url:waterUrl+config.waterAbnormal,
                error:function(err){
                    console.log(err)
                },
                success:function(data){
                    var dataobj = eval('('+data+')')
                    $.map(dataobj,function(value,time){
                        var date = time;
                        var data1 = value.province;
                        var div=$("<div class='outlierdataTable' timepoint='"+date+"'></div>");
                        var timepoint=$("<div class='timepoint'>"+date+"</div>");
                        div.append(timepoint);
                        var site = "";
                        if(data1 > 0){
                            site = $("<div class='waterborderbox'><div class='listitem'>省控</div><div class='warningNmb'>"+data1+"</div></div>");
                        }else if (data1==0){
                            site = $("<div class='waterborderbox'><div class='listitem'>省控</div><div class='normalNmb'>"+data1+"</div></div>");
                        }
                        div.append(site);
                        $("#auditPage_Content").append(div);
                    })
                    $(".outlierdataTable").unbind().click(function(){
                        var timepointpass=$(this).attr("timepoint");
                        sessionStorage.setItem("timepoint",timepointpass);
                        sessionStorage.setItem("role",role)
                        $.mobile.changePage("#citylistPage",{transition:"slide"});
                    });
                }
            })
        }
    },
    abnormalPage_init:function(){
        var Abnormal = localStorage.Abnormal;
        var AbnormalType = sessionStorage.getItem("AbnormalType");
        if(Abnormal == "air"){
            switch (AbnormalType){
                case "Lv1":
                    sessionStorage.setItem("case","1");
                    menuFunction.LvPage_init();
                    break;
                case "Lv2":
                    sessionStorage.setItem("case","2");
                    menuFunction.LvPage_init();
                    break;
                case "Lv3":
                    sessionStorage.setItem("case","3");
                    menuFunction.LvPage_init();
                    break;
                case "nodata":
                    sessionStorage.setItem("case","4");
                    menuFunction.dataAbnormalPage_init();
                    break;
                case "datakeep":
                    sessionStorage.setItem("case","5");
                    menuFunction.dataAbnormalPage_init();
                    break;
                case "dataleave":
                    sessionStorage.setItem("case","6");
                    menuFunction.dataAbnormalPage_init();
                    break;
                default:
                    sessionStorage.setItem("case","7");
                    menuFunction.dataAbnormalPage_init();
                    break;
            }
        }else if(Abnormal=='water'){
            switch (AbnormalType){
                case "Lv1":
                    sessionStorage.setItem("case","1");
                    sessionStorage.setItem("watercase","4");
                    menuFunction.LvPage_init();
                    break;
                case "Lv2":
                    sessionStorage.setItem("case","2");
                    sessionStorage.setItem("watercase","5");
                    menuFunction.LvPage_init();
                    break;
                case "Lv3":
                    sessionStorage.setItem("case","3");
                    sessionStorage.setItem("watercase","6");
                    menuFunction.LvPage_init();
                    break;
                case "nodata":
                    sessionStorage.setItem("case","4");
                    sessionStorage.setItem("watercase","1");
                    menuFunction.dataAbnormalPage_init();
                    break;
                case "datakeep":
                    sessionStorage.setItem("case","5");
                    sessionStorage.setItem("watercase","2");
                    menuFunction.dataAbnormalPage_init();
                    break;
                case "dataleave":
                    sessionStorage.setItem("case","6");
                    sessionStorage.setItem("watercase","7");
                    menuFunction.dataAbnormalPage_init();
                    break;
                case "dataexceed":
                    sessionStorage.setItem("case","7");
                    sessionStorage.setItem("watercase","3");
                    menuFunction.dataAbnormalPage_init();
                    break;
            }
        }
    },
    //测管协同页
    LvPage_init:function(){
        $("#abnormaltypeChooseBar").html("");
        $("#abnormalPage_Content").html("");
        sessionStorage.setItem('AirtypeChooseBar',"0")
        $("#ajaxPleaseWait").show();
        var Abnormal = localStorage.Abnormal;
        var mycase = sessionStorage.getItem("case");
        var cityStateCount,countyCount;
        if(Abnormal=='air'){
            var siteChooseBar = $(" <div id='cityState' datatype='cityState'>市州( )</div>" +
                "<div id='county' datatype='county'>区县( )</div>")
            var msgTitle = $("<div class='msgTitle'><span>报警时间</span><span>城市</span><span>AQI</span></div>")
            $("#abnormaltypeChooseBar").append(siteChooseBar)
            $("#abnormaltypeChooseBar").append(msgTitle)
            $("#abnormaltypeChooseBar").find("div").unbind().click(function(){
                $("#abnormaltypeChooseBar .msgTitle").unbind();
                $("#abnormaltypeChooseBar").find("div").removeClass("abnormaltypeChooseActive");
                $(this).addClass("abnormaltypeChooseActive");
                var type=$(this).attr("datatype");
                var userid=localStorage.userid;
                var countryObj,cityObj;
                $.ajax({
                    url:myURL+'/alarmavg/findCountryAvg',
                    data:{
                        UserId:userid,
                        type:mycase,
                    },
                    async:false,
                    error:function(err){
                        console.log("error exits!"+err)
                    },
                    success:function(data){
                        countryObj = eval("("+data+")");
                        // $("#county").text("区县("+countryObj.length+")")
                        $("#county").text("区县(0)")
                    }
                })
                $.ajax({
                    url:myURL+'/alarmavg/findCityAvg',
                    data:{
                        UserId:userid,
                        type:mycase,
                    },
                    async:false,
                    error:function(err){
                        $("#ajaxPleaseWait").hide();
                        console.log("error exits!"+err)
                    },
                    success:function(data){
                        $("#ajaxPleaseWait").hide();
                        cityObj = eval("("+data+")");
                        $("#cityState").text("市州("+cityObj.length+")")
                    }
                })
                var idarr = [];
                if(type=='cityState'){
                    sessionStorage.setItem('AirtypeChooseBar','0')
                    $("#abnormalPage_Content").html("");
                    $.map(cityObj,function(data,index){
                        var timepoint = data.TimePoint.substring(0,10);
                        var areaname = data.AreaName;
                        var AQIconcentration = data.Concentration;
                        var id = data.id;
                        idarr.push(id);
                        var div=$("<div class='outlierdataTable' id='"+id+"'></div>");
                        var timepointdiv=$("<div class='timepoint'>"+timepoint+"</div>");
                        var areanamediv=$("<div class='areaname'>"+areaname+"</div>");
                        var AQIdiv=$("<div class='aqi'>"+AQIconcentration+"</div>");
                        div.append(timepointdiv)
                        div.append(areanamediv)
                        div.append(AQIdiv)
                        $("#abnormalPage_Content").append(div)
                        if(data.Status&&data.Status=='1'){
                            $("#"+id).css("background-color","#ffffff")
                        }else{
                            $("#"+id).css("background-color","#ffe9e9")
                        }
                    })
                    var idstr = idarr.join();
                    $.ajax({
                        url:myURL+config.saveCache,
                        type:"POST",
                        data:{
                            UserId:userid,
                            TroubleIds:idstr,
                            status:'1'
                        },
                        error:function(err){
                            console.log(err)
                        },
                        success:function(data){
                            console.log(data)
                        }
                    })
                    $(".outlierdataTable").unbind().click(function(){
                        var id=$(this).attr("id");
                        sessionStorage.setItem("id",id);
                        var sitetype = "";
                        sessionStorage.setItem("sitetype",sitetype);
                        $.mobile.changePage("#siteDetailPage",{transition:"slide"});
                    });
                }else if(type == 'county'){
                    sessionStorage.setItem('AirtypeChooseBar','1')
                    $("#abnormalPage_Content").html("");
                    // $.map(countryObj,function(data,index){
                    //     var timepoint = data.TimePoint.substring(0,10);
                    //     var areaname = data.CityName+data.AreaName;
                    //     var AQIconcentration = data.Concentration;
                    //     var id = data.id;
                    //     var div=$("<div class='outlierdataTable' id='"+id+"'></div>");
                    //     var timepointdiv=$("<div class='timepoint'>"+timepoint+"</div>");
                    //     var areanamediv=$("<div class='areaname'>"+areaname+"</div>");
                    //     var AQIdiv=$("<div class='aqi'>"+AQIconcentration+"</div>");
                    //     div.append(timepointdiv)
                    //     div.append(areanamediv)
                    //     div.append(AQIdiv)
                    //     $("#abnormalPage_Content").append(div)
                    // })
                    // $(".outlierdataTable").unbind().click(function(){
                    //     var id=$(this).attr("id");
                    //     sessionStorage.setItem("id",id);
                    //     var sitetype = "";
                    //     sessionStorage.setItem("sitetype",sitetype);
                    //     $.mobile.changePage("#siteDetailPage",{transition:"slide"});
                    // });
                    // if(data.Status&&data.Status=='1'){
                    //     $("#"+id).css("background-color","#ffffff")
                    // }else{
                    //     $("#"+id).css("background-color","#ffe9e9")
                    // }
                    $("#abnormalPage_Content").css("padding-top","85px")
                }
            });
            var AirtypeChooseBar = sessionStorage.getItem('AirtypeChooseBar')
            $("#county").click();
            $("#cityState").click();
            AirtypeChooseBar ? $("#abnormaltypeChooseBar").find("div").eq(AirtypeChooseBar).click() : $("#abnormaltypeChooseBar").find("div").eq(0).click();
        }
        else if(Abnormal=='water'){
            var watertype = sessionStorage.getItem("watercase");
            var userName = localStorage.loginName;
            var msgTitle = $("<div class='msgTitle'><span>报警时间</span><span>站点</span><span>水质类别</span></div>")
            $("#abnormaltypeChooseBar").append(msgTitle)
            $.ajax({
                type:"POST",
                url:waterUrl+config.findbyAbnormalType,
                data:{
                    type:watertype,
                    name:userName
                },
                error:function(err){
                    $("#ajaxPleaseWait").hide()
                    console.log(err)
                },
                success:function(data){
                    $("#ajaxPleaseWait").hide()
                    var dataobj = eval("("+data+")");
                    $.map(dataobj,function(data,index){
                        var timepoint = data.TIMEPOINT.substring(0,10);
                        var warningtime = data.WARNTIME.substring(0,10);
                        var timepointfull = data.TIMEPOINT;
                        var areaname = data.STATIONNAME;
                        var type;
                        (data.CATEGORY==null||data.CATEGORY==undefined)?type = "一" : type = data.CATEGORY;
                        var id = data.STATIONCODE;
                        // var div=$("<div class='outlierdataTable' id='"+id+"' timepoint='"+timepointfull+"'></div>");
                        var msgid = data.ID;
                        if(data.ISREAD=="否"){
                            var div=$("<div class='outlierdataTable' id='"+id+"' msgid='"+msgid+"' timepoint='"+timepointfull+"' style='background-color:rgb(255, 233, 233) '></div>");
                        }else{
                            var div=$("<div class='outlierdataTable' id='"+id+"' msgid='"+msgid+"' timepoint='"+timepointfull+"'></div>");
                        }
                        var timepointdiv=$("<div class='timepointwater'>"+warningtime+"</div>");
                        var areanamediv=$("<div class='waterstationname'>"+areaname+"</div>");
                        var typediv=$("<div class='watertype'>"+type+"</div>");
                        div.append(timepointdiv)
                        div.append(areanamediv)
                        div.append(typediv)
                        $("#abnormalPage_Content").append(div)
                    })
                    $(".outlierdataTable").unbind().click(function(){
                        var id=$(this).attr("id");
                        var timepoint=$(this).attr("timepoint");
                        var msgid=$(this).attr("msgid");
                        // $(this).css("background-color","#ffffff")
                        sessionStorage.setItem("id",id);
                        sessionStorage.setItem("watermsgid",msgid);
                        sessionStorage.setItem("watertimepoint",timepoint);
                        var sitetype = "";
                        sessionStorage.setItem("sitetype",sitetype);
                        sessionStorage.setItem("waterflag","AbnormalCount")
                        $.mobile.changePage("#siteDetailPage",{transition:"slide"});
                    });
                    $("#abnormalPage_Content").css("padding-top","40px")
                }
            })
        }

        if(mycase=='1'){
            $("#abnormalTypeName").text("测管协同Ⅰ级响应").css({
                "color": "#fff",
                "font-weight": "normal",
                "line-height": "24px"
            });
        }else if(mycase=='2'){
            $("#abnormalTypeName").text("测管协同Ⅱ级响应").css({
                "color": "#fff",
                "font-weight": "normal",
                "line-height": "24px"
            });
        }else if(mycase=='3'){
            $("#abnormalTypeName").text("测管协同Ⅲ级响应").css({
                "color": "#fff",
                "font-weight": "normal",
                "line-height": "24px"
            });
         }
    },
    //数据恒定、无数据、数据离群
    dataAbnormalPage_init:function(){
        $("#abnormaltypeChooseBar").html("");
        $("#abnormalPage_Content").html("");
        $("#ajaxPleaseWait").show();
        $("#abnormalPage_Content").css("padding-top","0px")
        var userid=localStorage.userid;
        var mycase = sessionStorage.getItem("case");
        var Abnormal = localStorage.Abnormal;

        if(Abnormal=="air"){
            if(mycase=='4'){
                $("#abnormalTypeName").text("无数据列表").css({
                    "color": "#fff",
                    "font-weight": "normal",
                    "line-height": "24px"
                });
            }else if(mycase=='5'){
                $("#abnormalTypeName").text("数据恒定列表").css({
                    "color": "#fff",
                    "font-weight": "normal",
                    "line-height": "24px"
                });
            }else if(mycase=='6'){
                $("#abnormalTypeName").text("数据离群列表").css({
                    "color": "#fff",
                    "font-weight": "normal",
                    "line-height": "24px"
                });
            }else if(mycase=='7'){
                $("#abnormalTypeName").text("数据超过阀值列表").css({
                    "color": "#fff",
                    "font-weight": "normal",
                    "line-height": "24px"
                });
            }
            $.ajax({
                type:"POST",
                url:myURL+config.findAbnormalbytime,
                data:{
                    UserId:userid,
                    module:mycase,
                },
                error:function(err){
                    $("#ajaxPleaseWait").hide();
                    console.log("error exits!")
                    console.log(err)
                },
                success:function(datastr){
                    $("#ajaxPleaseWait").hide();
                    var data = eval("("+datastr+")")
                    $.each(data,function(key,value){
                        var date = key;
                        var dataobj = value;
                        var div=$("<div class='outlierdataTable' timepoint='"+date+"'></div>");
                        var timepoint=$("<div class='timepoint'>"+date+"</div>");
                        div.append(timepoint);
                        var sites = "";
                        $.each(dataobj,function(k,v){
                            var site = k;
                            if(site == "province"){
                                site = "省控";
                            }else if(site == "country"){
                                site = "国控";
                            }
                            if(v>0){
                                sites =$("<div class='borderbox' site='"+site+"'><div class='listitem'>"+site+"</div><div class='warningNmb'>"+v+"</div></div>");
                            }else if(v==0){
                                sites =$("<div class='borderbox' site='"+site+"'><div class='listitem'>"+site+"</div></div>");
                            }
                            div.append(sites);
                        })
                        $("#abnormalPage_Content").append(div);
                    })
                    $("div.borderbox").unbind().click(function(){
                        var site = $(this).attr("site");
                        site == "省控" ? sessionStorage.setItem("subBarStatus","1") : sessionStorage.setItem("subBarStatus","0");
                    })
                    $("div.outlierdataTable").unbind().click(function(){//点击国控或省控事件
                        var timepointpass=$(this).attr("timepoint");
                        sessionStorage.setItem("timepoint",timepointpass);
                        $.mobile.changePage("#abnormalSubPage",{transition:"slide"});
                    });
                }
            })
        }else{
            if(mycase=='4'){
                $("#abnormalTypeName").text("数值为零列表").css({
                    "color": "#fff",
                    "font-weight": "normal",
                    "line-height": "24px"
                });
            }else if(mycase=='5'){
                $("#abnormalTypeName").text("数值恒定列表").css({
                    "color": "#fff",
                    "font-weight": "normal",
                    "line-height": "24px"
                });
            }else if(mycase=='6'){
                $("#abnormalTypeName").text("数据离群列表").css({
                    "color": "#fff",
                    "font-weight": "normal",
                    "line-height": "24px"
                });
            }else if(mycase=='7'){
                $("#abnormalTypeName").text("数值偏大列表").css({
                    "color": "#fff",
                    "font-weight": "normal",
                    "line-height": "24px"
                });
            }
            var watertype = sessionStorage.getItem("watercase");
            var userName = localStorage.loginName;
            // var userName = "杨渊_1"
            var dataAbnormalSpaceDiv=$("<div style='height: 27px;width:100%;overflow: hidden;font-size: 0px'></div>")
            var msgTitle = $("<div class='msgTitlewater'><span>报警时间</span><span>站点</span><span>地表水类型</span></div>")
            $("#abnormalPage_Content").append(msgTitle);
            $("#abnormalPage_Content").append(dataAbnormalSpaceDiv)
            $.ajax({
                type:"GET",
                url:waterUrl+config.findbyAbnormalType+'?type='+watertype+'&name='+userName,
                error:function(err){
                    $("#ajaxPleaseWait").hide();
                    console.log(err)
                },
                success:function(data){
                    $("#ajaxPleaseWait").hide();
                    var dataobj = eval("("+data+")");
                    $.map(dataobj,function(data,index){
                        var timepoint = data.TIMEPOINT.substring(0,10);
                        var timepointfull = data.TIMEPOINT;
                        var areaname = data.STATIONNAME;
                        var type;
                        (data.CATEGORY==null||data.CATEGORY==undefined)?type = "一" : type = data.CATEGORY;
                        var id = data.STATIONCODE;
                        var msgid = data.ID;
                        if(data.ISREAD=="否"){
                            var div=$("<div class='outlierdataTable' id='"+id+"' msgid='"+msgid+"' timepoint='"+timepointfull+"' style='background-color:rgb(255, 233, 233) '></div>");
                        }else{
                            var div=$("<div class='outlierdataTable' id='"+id+"' msgid='"+msgid+"' timepoint='"+timepointfull+"'></div>");
                        }
                        var timepointdiv=$("<div class='timepointwater'>"+timepoint+"</div>");
                        var areanamediv=$("<div class='waterstationname'>"+areaname+"</div>");
                        var typediv=$("<div class='watertype'>"+type+"</div>");
                        div.append(timepointdiv)
                        div.append(areanamediv)
                        div.append(typediv)
                        $("#abnormalPage_Content").append(div)
                    })
                    $(".outlierdataTable").unbind().click(function(){
                        var id=$(this).attr("id");
                        var msgid=$(this).attr("msgid");
                        var timepoint=$(this).attr("timepoint");
                        sessionStorage.setItem("id",id);
                        sessionStorage.setItem("watermsgid",msgid);
                        sessionStorage.setItem("watertimepoint",timepoint);
                        var sitetype = "";
                        sessionStorage.setItem("sitetype",sitetype);
                        sessionStorage.setItem("waterflag","AbnormalCount")
                        $.mobile.changePage("#siteDetailPage",{transition:"slide"});
                    });
                }
            })
        }
    },
    dataAbnormalSubPage_init: function(){
        var mycase = sessionStorage.getItem("case");
        var subBarStatus = sessionStorage.getItem("subBarStatus")
        subBarStatus == null ? subBarStatus = "0" : "";
        console.log(subBarStatus)
        $("#typeChooseBar1").find("div").unbind().click(function(){//省控国控切换点击事件
            $("#typeChooseBar1").find("div").removeClass("AbnormalChooseActive");
            $(this).addClass("AbnormalChooseActive");
            var type=$(this).attr("datatype");
            switch(type){
                case "country":
                    sessionStorage.setItem('subBarStatus', 0);
                    menuFunction.SubPage_init();
                    break;
                case "province":
                    sessionStorage.setItem('subBarStatus', 1);
                    menuFunction.SubPage_init();
                    break;
            }
        });
        subBarStatus ? $("#typeChooseBar1").find("div").eq(subBarStatus).click() : $("#typeChooseBar1").find("div").eq(0).click();
        if(mycase=='4'){
            $("#abnormalSubTitle").text("无数据列表").css({
                "color": "#fff",
                "font-weight": "normal",
                "line-height": "24px"
            });
        }else if(mycase=='5'){
            $("#abnormalSubTitle").text("数据恒定列表").css({
                "color": "#fff",
                "font-weight": "normal",
                "line-height": "24px"
            });
        }else if(mycase=='6'){
            $("#abnormalSubTitle").text("数据离群列表").css({
                "color": "#fff",
                "font-weight": "normal",
                "line-height": "24px"
            });
        }else if(mycase=='7'){
            $("#abnormalSubTitle").text("数据超过阀值列表").css({
                "color": "#fff",
                "font-weight": "normal",
                "line-height": "24px"
            });
        }
    },
    SubPage_init:function(){
        $("#ajaxPleaseWait").show();
        $("#abnormalSubPage_content").html("");
        var timepoint = sessionStorage.getItem("timepoint");
        var mycase = sessionStorage.getItem("case");
        var userid=localStorage.userid;
        var module = sessionStorage.getItem('subBarStatus');
        var citytype;
        module=='0'?citytype = "country":citytype = "province";
        $.ajax({
            url:myURL+config.findAbnormalbyday,
            data:{
                UserId:userid,
                type:mycase,
                TimePoint:timepoint,
                module:citytype
            },
            async:true,
            error:function(err){
                $("#ajaxPleaseWait").hide();
                console.log("error exits!")
                console.log(err)
            },
            success:function(data){
                $("#abnormalSubPage_content").css("padding-top","46px")
                $("#ajaxPleaseWait").hide();
                var dataAbnormalSpaceDiv=$("<div style='height: 35px;width:100%;overflow: hidden;font-size: 0px'></div>")
                var msgTitle = $("<div class='dataerrTitle'><span>报警时间</span><span>站点</span></div>")
                $("#abnormalPage_Content").append(msgTitle);
                $("#abnormalPage_Content").append(dataAbnormalSpaceDiv)
                countryObj = eval("("+data+")");

                var list = new Array();
                list=eval("("+data+")");

                var idarr = [];
                var stationCode="";
                //$.map(countryObj,function(data,index){
               for(var i=0;i<list.length;i++){
                    var timepoint = list[i].TimePoint.substring(0,10);
                    var stationname = list[i].Area+list[i].StationName;
                   var id = list[i].id;
                   idarr.push(id);
                    if(stationCode== list[i].StationCode){
                        continue;
                    }
                    stationCode =list[i].StationCode;

                    var div=$("<div class='outlierdataTable' id='"+id+"' value='"+stationCode+"|"+timepoint+"'></div>");
                    var timepointdiv=$("<div class='stationtimepoint'>"+timepoint+"</div>");
                    var stationnamediv=$("<div class='stationname' value='"+stationCode+"'>"+stationname+"</div>");
                    div.append(timepointdiv)
                    div.append(stationnamediv)
                    $("#abnormalSubPage_content").append(div)
                    if(list[i].Status&&list[i].Status=='1'){
                        $("#"+id).css("background-color","#ffffff")
                    }else{
                        $("#"+id).css("background-color","#ffe9e9")
                    }
                }
                var idstr=idarr.join()
                $.ajax({
                    url:myURL+config.saveCache,
                    type:"POST",
                    data:{
                        UserId:userid,
                        TroubleIds:idstr,
                        status:'1'
                    },
                    error:function(err){
                        console.log(err)
                    },
                    success:function(data){

                    }
                })
                $(".outlierdataTable").unbind().click(function(){
                    console.log($(this).attr("value"))
                    var id=$(this).attr("id");
                    var value=$(this).attr("value");
                    sessionStorage.setItem("id",id);
                    sessionStorage.setItem("stationValue",value);
                    var sitetype = "totlesite";
                    sessionStorage.setItem("sitetype",sitetype);
                    $.mobile.changePage("#siteDetailPage",{transition:"slide"});
                });
            }
        })
    },
    //异常数据列表页
    citylistPage_init:function(){
        $("#ajaxPleaseWait").show();
        $("#citylistPage_content").html("");
        var timepoint = sessionStorage.getItem("timepoint");
        // var role = localStorage.role;
        var UserId = localStorage.userid;
        var Abnormal = localStorage.Abnormal;
        if(Abnormal=="air"){
            $.ajax({
                type:"POST",
                url : myURL + '/alarm/findByAreaTime',
                data:{
                    // role:role,
                    UserId:UserId,
                    TimePoint:timepoint
                },
                dataType:'json',
                async:true,
                error:function(){
                    $("#ajaxPleaseWait").hide();
                    tool.warningAlert("warAFailed","获取信息失败");
                },
                complete:function(XMLHttpRequest) {
                    $("#ajaxPleaseWait").hide();
                    var data = eval("(" + XMLHttpRequest.responseText + ")");
                    var title = "<div class='citylistTitle'><span>城市列表</span><span>"+ timepoint +"</span></div>"
                    $("#citylistPage_content").append(title);
                    $.each(data,function (key,value) {
                        var timepointpass = sessionStorage.getItem("timepoint");
                        var div=$("<div class='outlierdataTable'  timepoint='"+timepointpass+"'></div>");
                        var cityName = $("<div class='cityName' cityName='"+key+"'>"+key+"</div>");
                        div.append(cityName);
                        var sites = "";
                        $.each(value,function(k,v){
                            var site = k;
                            if(site == "province"){
                                site = "省控";
                            }else if(site == "country"){
                                site = "国控";
                            }
                            if(v>0){
                                sites =$("<div class='borderbox' site='"+site+"'><div class='listitem'>"+site+"</div><div class='warningNmb'>"+v+"</div></div>");
                            }else if(v==0){
                                // sites =$("<div class='borderbox'><div class='listitem'>"+site+"</div><div class='normalNmb'>"+v+"</div></div>");
                                sites =$("<div class='borderbox' site='"+site+"'><div class='listitem'>"+site+"</div></div>");
                            }
                            div.append(sites);
                            // var site = k;
                            // if(site == "country"){
                            //     site = "国控";
                            //     if(v>0){
                            //         sites =$("<div class='borderbox'><div class='listitem'>"+site+"</div><div class='warningNmb'>"+v+"</div></div>");
                            //     }else if(v==0){
                            //         // sites =$("<div class='borderbox'><div class='listitem'>"+site+"</div><div class='normalNmb'>"+v+"</div></div>");
                            //         sites =$("<div class='borderbox'><div class='listitem'>"+site+"</div></div>");
                            //     }
                            //     div.append(sites);
                            // }
                        })
                        $("#citylistPage_content").append(div)
                    })
                    $("div.borderbox").unbind().click(function(){
                        var site = $(this).attr("site");
                        site == "省控" ? sessionStorage.setItem("subBarStatus","1") : sessionStorage.setItem("subBarStatus","0");
                    })
                    $(".outlierdataTable").unbind().click(function(){
                        var timepointpass=$(this).attr("timepoint");
                        var cityNamepass=$(this).children().eq(0).attr("cityName");
                        sessionStorage.setItem("timepoint",timepointpass);
                        sessionStorage.setItem("area",cityNamepass);
                        sessionStorage.setItem('citytypeChooseBarStatus', 0);
                        $.mobile.changePage("#sitelistPage",{transition:"slide"});
                    });
                }
            })
        }else if(Abnormal=='water'){
            $("#citylistPage_content").html("");
            var title = "<div class='waterlistTitle'><span>区域列表</span><span>"+ timepoint +"</span></div>"
            var waterChooseBar = '<div id="watersiteChooseBar"><div dataType="areaChoose">地区</div><div dataType="basinChoose">流域</div></div>'
            $("#citylistPage_content").append(title);
            $("#citylistPage_content").append(waterChooseBar);
            $("#watersiteChooseBar").find("div").unbind().click(function(){
                $("#watersiteChooseBar").find("div").removeClass("watersiteChooseActive");
                $(this).addClass("watersiteChooseActive");
                var type=$(this).attr("datatype");
                localStorage.watersiteType = type;
                var userid=localStorage.userid;
                var listTable = $("<div class='listTable'></div>")
                if(type=='areaChoose'){
                    $(".listTable").html("");
                    sessionStorage.setItem("areabasinChooseBar","0")
                    $.ajax({
                        type:"POST",
                        url:waterUrl+config.findbyBasinArea,
                        async:true,
                        data:{
                            time:timepoint,
                            type:"city"
                        },
                        error:function(err){
                            $("#ajaxPleaseWait").hide();
                            console.log(err)
                        },
                        success:function(data){
                            $("#ajaxPleaseWait").hide();
                            var dataobj = eval('('+data+')')
                            $.map(dataobj,function(count,area){
                                var div=$("<div class='outlierdataTable' timepoint='"+timepoint+"'></div>");
                                var area=$("<div class='timepoint' cityName='"+area+"'>"+area+"</div>");
                                var mycount = "";
                                count.province > 0 ?  mycount = $("<div class='waterborderbox'><div class='listitem'>省控</div><div class='warningNmb'>"+count.province+"</div></div>") :
                                    mycount = $("<div class='waterborderbox'><div class='listitem'>省控</div><div class='normalNmb'>"+count.province+"</div></div>")
                                div.append(area);
                                div.append(mycount);
                                listTable.append(div);
                                $("#citylistPage_content").append(listTable);
                            })
                            $(".outlierdataTable").unbind().click(function(){
                                var timepointpass=$(this).attr("timepoint");
                                var cityNamepass=$(this).children().eq(0).attr("cityName");
                                sessionStorage.setItem("timepoint",timepointpass);
                                sessionStorage.setItem("area",cityNamepass);
                                sessionStorage.setItem('citytypeChooseBarStatus', 0);
                                $.mobile.changePage("#sitelistPage",{transition:"slide"});
                            });
                        }
                    })
                }else if(type == 'basinChoose'){
                    $(".listTable").html("")
                    sessionStorage.setItem("areabasinChooseBar","1")
                    $.ajax({
                        type: "POST",
                        url: waterUrl + config.findbyBasinArea,
                        async:true,
                        data: {
                            time: timepoint,
                            type: "area"
                        },
                        error: function (err) {
                            $("#ajaxPleaseWait").hide();
                            console.log(err)
                        },
                        success:function(data){
                            $("#ajaxPleaseWait").hide();
                            var dataobj = eval('('+data+')')
                            $.map(dataobj,function(count,basin){
                                var div=$("<div class='outlierdataTable' timepoint='"+timepoint+"'></div>");
                                var basin=$("<div class='timepoint'  cityName='"+basin+"'>"+basin+"</div>");
                                var mycount = "";
                                count.province > 0 ?  mycount = $("<div class='waterborderbox'><div class='listitem'>省控</div><div class='warningNmb'>"+count.province+"</div></div>") :
                                    mycount = $("<div class='waterborderbox'><div class='listitem'>省控</div><div class='normalNmb'>"+count.province+"</div></div>")
                                div.append(basin);
                                div.append(mycount);
                                listTable.append(div);
                                $("#citylistPage_content").append(listTable);
                            })
                            $(".outlierdataTable").unbind().click(function(){
                                var timepointpass=$(this).attr("timepoint");
                                var cityNamepass=$(this).children().eq(0).attr("cityName");
                                sessionStorage.setItem("timepoint",timepointpass);
                                sessionStorage.setItem("area",cityNamepass);
                                sessionStorage.setItem('citytypeChooseBarStatus', 0);
                                $.mobile.changePage("#sitelistPage",{transition:"slide"});
                            });
                        }
                    })
                }
            })
            var areabasinChooseBar = sessionStorage.getItem('areabasinChooseBar')
            areabasinChooseBar ? $("#watersiteChooseBar").find("div").eq(areabasinChooseBar).click() : $("#watersiteChooseBar").find("div").eq(0).click();
        }
    },
    // X市异常站点页
    sitelistPage_init:function(){
        $("#ajaxPleaseWait").show();
        var Abnormal = localStorage.Abnormal;
        var Area = sessionStorage.getItem("area");
        $("#sitelistPage .headerTitle").html("异常数据---"+Area);
        var module = sessionStorage.getItem('subBarStatus');
        var citytype;
        module=='0'?citytype = "country":citytype = "province";
        if(Abnormal == 'air'){
            $("#sitelistChooseBar").html("");
            $("#sitelistChooseBar").append('<div dataType="country" class="sitelistChooseActive">国控</div><div dataType="province">省控</div>')
            $("#sitelistChooseBar").children("div").unbind().click(function(){
                $("#sitelistChooseBar").children("div").removeClass("sitelistChooseActive");
                $(this).addClass("sitelistChooseActive");
                var type=$(this).attr("datatype");
                switch(type){
                    case "country":
                        sessionStorage.setItem('subBarStatus', 0);
                        // sessionStorage.setItem('citytypeChooseBarStatus', 0);
                        menuFunction.countryPage_init();
                        break;
                    case "province":
                        sessionStorage.setItem('subBarStatus', 1);
                        // sessionStorage.setItem('citytypeChooseBarStatus', 1);
                        menuFunction.provincePage_init();
                        break;
                }
            });
            var subBarStatus = sessionStorage.getItem("subBarStatus")
            subBarStatus == null ? subBarStatus = "0" : "";
            subBarStatus ? $("#sitelistChooseBar").find("div").eq(subBarStatus).click() : $("#sitelistChooseBar").find("div").eq(0).click();
            // var typeChooseBarStatus = sessionStorage.getItem('citytypeChooseBarStatus')
            // typeChooseBarStatus ? $("#sitelistChooseBar").find("div").eq(typeChooseBarStatus).click() :  $("#sitelistChooseBar").find("div").eq(0).click();
            // menuFunction.countryPage_init();
        }else if (Abnormal == 'water'){
            menuFunction.waterPage_init();
        }
    },
    waterPage_init:function(){
        var timepoint = sessionStorage.getItem("timepoint");
        var Area = sessionStorage.getItem("area");
        $("#sitelistPage_content").html("");
        var type = localStorage.watersiteType;
        if(type=='areaChoose'){
            Url = waterUrl+config.findbyTimeArea+'?time='+timepoint+'&city='+Area;
        }else if(type=='basinChoose'){
            Url = waterUrl+config.findbyTimeBasin+'?time='+timepoint+'&area='+Area;
        }
        $.ajax({
            type:"GET",
            url:Url,
            dataType:'json',
            async:true,
            error:function(err){
                $("#ajaxPleaseWait").hide();
                tool.warningAlert("warAFailed","获取信息失败");
            },
            complete:function(XMLHttpRequest){
                $("#ajaxPleaseWait").hide();
                var data = eval("(" + XMLHttpRequest.responseText + ")");
                console.log(data)
                var timepoint = sessionStorage.getItem("timepoint");
                var fixedDiv = $("<div class='waterfixedDiv'></div>")
                var spaceDiv = $("<div class='waterspaceDiv'></div>")
                if(data.rtncode == 0){
                    var msgNumDiv = $("<div class='msgNum'><p>0</p><p>条消息</p><p>"+ timepoint +"</p></div>")
                }else{
                    var msgNumDiv = $("<div class='msgNum'><p>"+ data.length +"</p><p>条消息</p><p>"+ timepoint +"</p></div>")
                }
                var msgTitle = $("<div class='sitemsgTitle'><span>报警时间</span><span>站点名称</span><span>异常说明</span></div>")
                fixedDiv.append(msgNumDiv);
                fixedDiv.append(msgTitle);
                $("#sitelistPage_content").append(fixedDiv)
                $("#sitelistPage_content").append(spaceDiv)
                $.each(data,function (key,value) {
                    var div=$("<div class='watersitelistTable' id='"+value.ID+"' sitetype='city'></div>");
                    var date = value.TIMEPOINT.split(" ")[0];
                    var hour = value.TIMEPOINT.split(" ")[1]
                    var dateDiv = "<div><p>"+ hour +"</p><p>"+ date +"</p></div>";
                    var stationDiv = "<div><p>"+value.STATIONNAME+"</p></div>";
                    var reasonDiv;
                    value.ANOMALY_REASON==""?reasonDiv = "<div><p>一</p></div>" :reasonDiv = "<div><p>"+value.ANOMALY_REASON+"</p></div>"
                    div.append(dateDiv);
                    div.append(stationDiv);
                    div.append(reasonDiv);
                    $("#sitelistPage_content").append(div)
                })
                $(".watersitelistTable").unbind().click(function(){
                    var id=$(this).attr("id");
                    var sitetype=$(this).attr("sitetype");
                    sessionStorage.setItem("id",id);
                    sessionStorage.setItem("sitetype",sitetype);
                    sessionStorage.setItem("waterflag","AbnormalSituation")
                    $.mobile.changePage("#siteDetailPage",{transition:"slide"});
                });
            }
        })
    },
    countryPage_init:function(){
        var type = "country";
        var userid = localStorage.userid;
        var timepoint = sessionStorage.getItem("timepoint");
        var Area = sessionStorage.getItem("area");
        $("#sitelistPage_content").html("");
        $("#ajaxPleaseWait").show();
        $.ajax({
            type:"POST",
            url:myURL+'/alarm/findByAreaDetail',
            data:{
                TimePoint:timepoint,
                Area:Area,
                type:type,
                UserId:userid
            },
            dataType:'json',
            async:true,
            error:function(){
                $("#ajaxPleaseWait").hide();
                tool.warningAlert("warAFailed","获取信息失败");
            },
            complete:function(XMLHttpRequest){
                $("#ajaxPleaseWait").hide();
                var data = eval("(" + XMLHttpRequest.responseText + ")");
                var timepoint = sessionStorage.getItem("timepoint");
                var fixedDiv = $("<div class='fixedDiv'></div>")
                var spaceDiv = $("<div class='spaceDiv'></div>")
                if(data.rtncode == 0){
                    var msgNumDiv = $("<div class='msgNum'><p>0</p><p>条消息</p><p>"+ timepoint +"</p></div>")
                }else{
                    var msgNumDiv = $("<div class='msgNum'><p>"+ data.length +"</p><p>条消息</p><p>"+ timepoint +"</p></div>")
                }
                var msgTitle = $("<div class='sitemsgTitle'><span>报警时间</span><span>站点名称</span><span>异常说明</span></div>")
                fixedDiv.append(msgNumDiv);
                fixedDiv.append(msgTitle);
                $("#sitelistPage_content").append(fixedDiv)
                $("#sitelistPage_content").append(spaceDiv)
                var idarr = [];
                $.each(data,function (key,value) {
                    var div=$("<div class='sitelistTable'  id='"+value.id+"' sitetype='country'></div>");
                    var date = value.TimePoint.split(" ")[0];
                    var hour = value.TimePoint.split(" ")[1].substring(0,5)
                    var dateDiv = "<div><p>"+ hour +"</p><p>"+ date +"</p></div>";
                    var stationDiv = "<div><p>"+value.StationName+"</p></div>";
                    var reasonDiv;
                    var id = value.id;
                    idarr.push(id);
                    if(value.Status&&value.Status=='1'){
                        reasonDiv = "<div><p>"+value.Anomaly_Type+"</p></div>"
                    }else{
                        reasonDiv = "<div><p>"+value.Anomaly_Type+"</p><div class='wariningCircle'></div></div>"
                    }
                    div.append(dateDiv);
                    div.append(stationDiv);
                    div.append(reasonDiv);
                    $("#sitelistPage_content").append(div)
                })
                var idstr = idarr.join();
                $.ajax({
                    url:myURL+config.saveCache,
                    type:"POST",
                    data:{
                        UserId:userid,
                        TroubleIds:idstr,
                        status:'1'
                    },
                    error:function(err){
                        console.log(err)
                    },
                    success:function(data){

                    }
                })
                // $("#sitelistPage_content .fixedDiv").css("top","45px")
                // $("#sitelistPage_content .spaceDiv").css("height","140px")
                $(".sitelistTable").unbind().click(function(){
                    var id=$(this).attr("id");
                    var sitetype=$(this).attr("sitetype");
                    sessionStorage.setItem("id",id);
                    sessionStorage.setItem("sitetype",sitetype);
                    $.mobile.changePage("#siteDetailPage",{transition:"slide"});
                });
            }
        })
    },
    provincePage_init:function(){
        var type = "province";
        var timepoint = sessionStorage.getItem("timepoint");
        var Area = sessionStorage.getItem("area");
        var userid = localStorage.userid;
        $("#sitelistPage_content").html("");
        $("#ajaxPleaseWait").show();
        $.ajax({
            type:"POST",
            url:myURL+'/alarm/findByAreaDetail',
            data:{
                TimePoint:timepoint,
                Area:Area,
                type:type,
                UserId:userid
            },
            dataType:'json',
            async:true,
            error:function(){
                $("#ajaxPleaseWait").hide();
                tool.warningAlert("warAFailed","获取信息失败");
            },
            complete:function(XMLHttpRequest){
                $("#ajaxPleaseWait").hide();
                var data = eval("(" + XMLHttpRequest.responseText + ")");
                console.log(data)
                var timepoint = sessionStorage.getItem("timepoint");
                var fixedDiv = $("<div class='fixedDiv'></div>")
                var spaceDiv = $("<div class='spaceDiv'></div>")
                if(data.rtncode == 0){
                    var msgNumDiv = $("<div class='msgNum'><p>0</p><p>条消息</p><p>"+ timepoint +"</p></div>")
                }else{
                    var msgNumDiv = $("<div class='msgNum'><p>"+ data.length +"</p><p>条消息</p><p>"+ timepoint +"</p></div>")
                }
                var msgTitle = $("<div class='sitemsgTitle'><span>报警时间</span><span>站点名称</span><span>异常说明</span></div>")
                fixedDiv.append(msgNumDiv);
                fixedDiv.append(msgTitle);
                $("#sitelistPage_content").append(fixedDiv)
                $("#sitelistPage_content").append(spaceDiv)
                var idArr = [];
                $.each(data,function (key,value) {
                    var div=$("<div class='sitelistTable'  id='"+value.id+"' sitetype='province' handletime='"+ value.HandleTime +"'></div>");
                    var date = value.TimePoint.split(" ")[0];
                    var hour = value.TimePoint.split(" ")[1].substring(0,5)
                    var dateDiv = "<div><p>"+ hour +"</p><p>"+ date +"</p></div>";
                    // var stationDiv;
                    var id = value.id;
                    idArr.push(id);
                    var progress = value.status == "1" ? "done" : "doing";
                    // if(value.Result === '已完成'){
                    // var   stationDiv = "<div><p>"+value.StationName+"</p><p class='"+progress+"'>"+value.Result+"</p></div>";
                    var   stationDiv = "<div><p>"+value.StationName+"</p></div>";
                    // }else{
                    //     stationDiv = "<div><p>"+value.StationName+"</p><p class='doing'>"+value.Result+"</p></div>";
                    // }
                    var reasonDiv;
                    // if (value.Anomaly_reason === "数据恒定" || value.Anomaly_reason === "已完成"){
                    //     reasonDiv = "<div>"+value.Anomaly_reason+ "&emsp;" +value.HandleTime+"小时</div>"
                    // }else if(value.Result === "处理中" || value.Result === "待处理") {
                    //     reasonDiv = "<div><p>" + value.Anomaly_reason + "&emsp;" + value.HandleTime + "小时</p>" +
                    //         "<div>( 运维人员 )&emsp;&emsp;<span class='wariningCircle'></span></div></div>"
                    // }
                    // if (value.Result === "已完成"){
                    //     reasonDiv = "<div>"+value.Anomaly_Type+ "&emsp;" +value.HandleTime+"小时</div>"
                    // }else if(value.Result === "处理中" || value.Result === "待处理") {
                    //     reasonDiv = "<div><p>" + value.Anomaly_Type + "&emsp;" + value.HandleTime + "小时</p>" +
                    //         "<div>( 运维人员 )&emsp;<span class='wariningCircle'></span></div></div>"
                    // }

                    if(value.Status&&value.Status=='1'){
                        reasonDiv = "<div>"+value.Anomaly_Type+ "&emsp;" +value.HandleTime+"小时</div>"
                    }else{
                        reasonDiv = "<div><p>" + value.Anomaly_Type + "&emsp;" + value.HandleTime + "小时</p>" +
                            "<div><span class='wariningCircle'></span></div></div>"
                    }
                    // else{
                    //     reasonDiv = "<div><p>" + value.Anomaly_Type + "&emsp;" + value.HandleTime + "小时</p>" +
                    //         "<div>( 运维人员 )&emsp;<span class='wariningCircle'></span></div></div>"
                    // }
                    div.append(dateDiv);
                    div.append(stationDiv);
                    div.append(reasonDiv);
                    $("#sitelistPage_content").append(div)
                })
                var idStr = idArr.join();
                $.ajax({
                    url:myURL+config.saveCache,
                    type:"POST",
                    data:{
                        UserId:userid,
                        TroubleIds:idStr,
                        status:'1'
                    },
                    error:function(err){
                        console.log(err)
                    },
                    success:function(data){

                    }
                })
                $(".sitelistTable").unbind().click(function(){
                    var id=$(this).attr("id");
                    var sitetype=$(this).attr("sitetype");
                    var handletime=$(this).attr("handletime");
                    sessionStorage.setItem("id",id);
                    sessionStorage.setItem("sitetype",sitetype);
                    sessionStorage.setItem("handletime",handletime);
                    $.mobile.changePage("#siteDetailPage",{transition:"slide"});
                });
            }
        })
    },
    siteDetailPage_init:function() {
        var id = sessionStorage.getItem("id");
        var type = sessionStorage.getItem("case");

        var msgid = sessionStorage.getItem("watermsgid");
        console.log(msgid)
        var role = sessionStorage.getItem("role");
        var sitetype = sessionStorage.getItem("sitetype");
        var userName = localStorage.loginName;
        // var userName = '杨渊_1'
        var Abnormal = localStorage.Abnormal;
        console.log("详情查询--->")
        console.log(TimePoint)
        console.log(StationCode)
        $("#ajaxPleaseWait").show();
        if(Abnormal=='air'){
            if(sitetype!==undefined && sitetype!==""&&sitetype!=="totlesite"){
                $.ajax({
                    type:"POST",
                    url:myURL + '/alarm/findById',
                    data:{
                        id:id
                    },
                    dataType:"json",
                    async:true,
                    error:function(){
                        $("#ajaxPleaseWait").hide();
                        tool.warningAlert("warAFailed","获取信息失败");
                    },
                    complete:function(XMLHttpRequest){
                        $("#ajaxPleaseWait").hide();
                        $("#siteDetailPage_content").html("");
                        var data = eval("(" + XMLHttpRequest.responseText + ")");
                        $("#siteDetailPage .headerTitle").html(data.Area+"数据异常详情")
                        var siteName = data.StationName;
                        var timepoint = data.TimePoint.split(" ")[1].substring(0,5);
                        sessionStorage.time=data.TimePoint.substring(0,19);
                        var reason = data.Anomaly_Type;
                        var anomalyIndex = data.Anomaly_index;
                        var concentration = data.Concentration;
                        var lastTime = data.Duration;
                        var concentrationdiv;
                        var anomalyIndexdiv=$("<div class='siteDetailTable'><span>异常指标</span><span>"+anomalyIndex+"</span></div>");
                        if(anomalyIndex == 'CO'){
                            concentrationdiv=$("<div class='siteDetailTable'><span>浓度值</span><span>"+concentration+"(mg/m<sup>3</sup>)</span></div>");
                        }else if(anomalyIndex=="AQI"){
                            concentrationdiv=$("<div class='siteDetailTable'><span>环境质量指数值</span><span>"+concentration+"</span></div>");
                        }else{
                            concentrationdiv=$("<div class='siteDetailTable'><span>浓度值</span><span>"+concentration+"(μg/m<sup>3</sup>)</span></div>");
                        }
                        if(anomalyIndex == 'CO'){
                            anomalyIndexdiv=$("<div class='siteDetailTable'><span>异常指标</span><span>"+anomalyIndex+"</span></div>");
                        }else if(anomalyIndex == 'O3')
                        {
                            anomalyIndex = 'O';
                            anomalyIndexdiv=$("<div class='siteDetailTable'><span>异常指标</span><span>"+anomalyIndex+"<sub>3</sub></span></div>");
                        }else if(anomalyIndex == 'SO2'){
                            anomalyIndex = 'SO';
                            anomalyIndexdiv=$("<div class='siteDetailTable'><span>异常指标</span><span>"+anomalyIndex+"<sub>2</sub></span></div>");
                        }else if(anomalyIndex == 'NO2'){
                            anomalyIndex = 'NO';
                            anomalyIndexdiv=$("<div class='siteDetailTable'><span>异常指标</span><span>"+anomalyIndex+"<sub>2</sub></span></div>");
                        }else if(anomalyIndex == 'PM2_5'){
                            anomalyIndex = 'PM';
                            anomalyIndexdiv=$("<div class='siteDetailTable'><span>异常指标</span><span>"+anomalyIndex+"<sub>2.5</sub></span></div>");
                        }else if(anomalyIndex == 'PM10'){
                            anomalyIndex = 'PM';
                            anomalyIndexdiv=$("<div class='siteDetailTable'><span>异常指标</span><span>"+anomalyIndex+"<sub>10</sub></span></div>");
                        }
                        var result = data.Result;
                        var durationdiv;
                        reason == "数据恒定" ?durationdiv=$("<div class='siteDetailTable'><span>数据恒定时长</span><span>"+lastTime+"小时</span></div>"):reason == "无数据" ?durationdiv=$("<div class='siteDetailTable'><span>无数据时长</span><span>"+lastTime+"小时</span></div>"):"";
                        var siteNamediv=$("<div class='siteDetailTable'><span>站点名称</span><span>"+siteName+"</span></div>");
                        var timePointdiv=$("<div class='siteDetailTable'><span>报警时间</span><span>"+timepoint+"</span></div>");
                        var reasondiv=$("<div class='siteDetailTable'><span>异常说明</span><span>"+reason+"</span></div>");
                        var resultdiv=$("<div class='siteDetailTable'><span>处理结果</span><span>"+result+"</span></div>");

                        if(result=='待处理'&&(role=='1'||role=='3150')){
                            var buttondiv=$("<div  class='submitbtn siteDetailTable'><input type='button' value='提 交' onclick='menuFunction.handleSubmit()'></div>")
                        }else if(result=='处理中'&&(role=='3'||role=='1')){
                            var buttondiv=$("<div  class='finishbtn siteDetailTable'><input type='button' value='确 认' onclick='menuFunction.handleFinish()'></div>")
                        }

                        var reasonSelectdiv=$("<div class='siteDetailTable'><span>故障原因</span><select  data-role='none' id='errorSelector'><option value='器械故障'>器械故障" +
                            "</option><option value='原因2'>原因2</option><option value='原因3'>原因3</option></select></div>")
                        $("#siteDetailPage_content").append(siteNamediv)
                        $("#siteDetailPage_content").append(timePointdiv)
                        $("#siteDetailPage_content").append(reasondiv)
                        $("#siteDetailPage_content").append(anomalyIndexdiv)
                        if(reason!=="无数据"){
                            $("#siteDetailPage_content").append(concentrationdiv)
                        }
                        if(reason == "数据恒定" || reason == "无数据"){
                            $("#siteDetailPage_content").append(durationdiv)
                        }
                        if(sitetype=="province"){
                            var handletime = sessionStorage.getItem("handletime");
                            var handletimediv=$("<div class='siteDetailTable'><span>处理时长</span><span>"+handletime+"小时</span></div>");
                            if(anomalyIndex !== "AQI"){
                                // $("#siteDetailPage_content").append(reasonSelectdiv)
                                $("#siteDetailPage_content").append(resultdiv)
                                $("#siteDetailPage_content").append(handletimediv)
                                $("#siteDetailPage_content").append(buttondiv)
                            }
                        }
                        $.ajax({
                            url:myURL+config.savemsgStatus,
                            data:{
                                UserId:localStorage.userid,
                                TroubleId:id,
                                status:'1',
                                TimePoint:data.TimePoint
                            },
                            error:function(err){
                                console.log(err)
                            },
                            success:function(data){

                            }
                        })
                    }
                })
            }else if(sitetype=='totlesite'){
                $("#siteDetailPage_content").html("");
                var stationValue = sessionStorage.getItem("stationValue");
                var arr=stationValue.split("|");
                var TimePoint=arr[1]
                var StationCode=arr[0]
                $.ajax({
                    url:myURL + '/alarm/findByCodeTime',
                    data:{
                        TimePoint:TimePoint,
                        StationCode:StationCode,
                        type:type
                    },
                    async:true,
                    error:function(err){
                        $("#ajaxPleaseWait").hide();
                        console.log("error exits!"+err)
                    },
                    success:function(data) {
                        var list = new Array();
                        list = eval("(" + data + ")");
                        console.log(list)
                        $("#ajaxPleaseWait").hide();
                        $("#siteDetailPage .headerTitle").html(list[0].StationName + "数据异常详情");

                        var siteName = list[0].StationName;
                        var timepoint = list[0].TimePoint.split(" ")[1].substring(0, 5);
                        var siteNamediv = $("<div class='siteDetailTable'><span>站点名称</span><span>" + siteName + "</span></div>");
                        var timePointdiv = $("<div class='siteDetailTable'><span>报警时间</span><span>" + timepoint + "</span></div>");

                        $("#siteDetailPage_content").append(siteNamediv);
                        $("#siteDetailPage_content").append(timePointdiv);

                        for(var i=0;i<list.length;i++){
                            var anomalyIndex = list[i].Anomaly_index;//参数
                            var reason=list[i].Anomaly_Type;//无数据
                            var timeValue=list[i].TimePoint.split(" ")[1].substring(0, 5);//时间
                            var durationtime = list[i].Duration+"小时";//无效时长
                            var mycase = list[i].Result;//待处理
                            var anomalyIndexdiv = $("<div class='siteDetailTable'><span>" + anomalyIndex + "</span><span>" + timeValue + "</span><span>" + reason + "</span><span>" + mycase + "</span><span>" + durationtime + "</span></div>");
                            $("#siteDetailPage_content").append(anomalyIndexdiv);

                      }

                            $.ajax({
                            url:myURL+config.savemsgStatus,
                            data:{
                                UserId:localStorage.userid,
                                TroubleId:id,
                                status:'1',
                                TimePoint:data.TimePoint
                            },
                            error:function(err){
                                console.log(err)
                            },
                            success:function(data){
                               
                            }
                        })
                    }
                })
               /* $.ajax({
                    url:myURL+"/alarm/findById",
                    data:{
                        id:id
                    },
                    async:true,
                    error:function(err){
                        $("#ajaxPleaseWait").hide();
                        console.log("error exits!"+err)
                    },
                    success:function(data){
                        $("#ajaxPleaseWait").hide();
                        $("#siteDetailPage .headerTitle").html(data.StationName+"数据异常详情");
                        var siteName = data.StationName+"平均值";
                        var timepoint = data.TimePoint.split(" ")[1].substring(0,5);
                        var concentration = data.Concentration;
                        var anomalyIndex = data.Anomaly_index;
                        var reason;
                        var durationtime = data.Duration;
                        var mycase = data.Anomaly_reason;
                        switch(mycase){
                            case "4":
                                reason = "无数据"
                                break;
                            case "5":
                                reason = "数据恒定"
                                break;
                            case "6":
                                reason = "数据离群"
                                break;
                            case "7":
                                reason = "数据超过阀值"
                                break;
                        }
                        var anomalyIndexdiv=$("<div class='siteDetailTable'><span>异常指标</span><span>"+anomalyIndex+"</span></div>");
                        var concentrationdiv=$("<div class='siteDetailTable'><span>浓度值</span><span>"+concentration+"</span></div>");
                        var siteNamediv=$("<div class='siteDetailTable'><span>站点名称</span><span>"+siteName+"</span></div>");
                        var timePointdiv=$("<div class='siteDetailTable'><span>报警时间</span><span>"+timepoint+"</span></div>");
                        var reasondiv=$("<div class='siteDetailTable'><span>异常说明</span><span>"+reason+"</span></div>");
                        var durationdiv = mycase =="4"?$("<div class='siteDetailTable'><span>无数据时长</span><span>"+durationtime+"小时</span></div>"):mycase =="5"?$("<div class='siteDetailTable'><span>数据恒定时长</span><span>"+durationtime+"小时</span></div>"):"";

                        if(anomalyIndex == 'CO'){
                            concentrationdiv=$("<div class='siteDetailTable'><span>浓度值</span><span>"+concentration+"(mg/m<sup>3</sup>)</span></div>");
                        }else if(anomalyIndex=='AQI'){
                            concentrationdiv=$("<div class='siteDetailTable'><span>环境质量指数值</span><span>"+concentration+"</span></div>");
                        }else{
                            concentrationdiv=$("<div class='siteDetailTable'><span>浓度值</span><span>"+concentration+"(μg/m<sup>3</sup>)</span></div>");
                        }

                        if(anomalyIndex == 'CO'){
                            anomalyIndexdiv=$("<div class='siteDetailTable'><span>异常指标</span><span>"+anomalyIndex+"</span></div>");
                        }else if(anomalyIndex == 'O3')
                        {
                            anomalyIndex = 'O';
                            anomalyIndexdiv=$("<div class='siteDetailTable'><span>异常指标</span><span>"+anomalyIndex+"<sub>3</sub></span></div>");
                        }else if(anomalyIndex == 'SO2'){
                            anomalyIndex = 'SO';
                            anomalyIndexdiv=$("<div class='siteDetailTable'><span>异常指标</span><span>"+anomalyIndex+"<sub>2</sub></span></div>");
                        }else if(anomalyIndex == 'NO2'){
                            anomalyIndex = 'NO';
                            anomalyIndexdiv=$("<div class='siteDetailTable'><span>异常指标</span><span>"+anomalyIndex+"<sub>2</sub></span></div>");
                        }else if(anomalyIndex == 'PM2_5'){
                            anomalyIndex = 'PM';
                            anomalyIndexdiv=$("<div class='siteDetailTable'><span>异常指标</span><span>"+anomalyIndex+"<sub>2.5</sub></span></div>");
                        }else if(anomalyIndex == 'PM10'){
                            anomalyIndex = 'PM';
                            anomalyIndexdiv=$("<div class='siteDetailTable'><span>异常指标</span><span>"+anomalyIndex+"<sub>10</sub></span></div>");
                        }
                        $("#siteDetailPage_content").append(siteNamediv);
                        $("#siteDetailPage_content").append(timePointdiv);
                        $("#siteDetailPage_content").append(reasondiv);
                        $("#siteDetailPage_content").append(anomalyIndexdiv);
                        mycase == "4"?"":$("#siteDetailPage_content").append(concentrationdiv);
                        (mycase == "4"||mycase=="5")?$("#siteDetailPage_content").append(durationdiv):"";
                            $.ajax({
                            url:myURL+config.savemsgStatus,
                            data:{
                                UserId:localStorage.userid,
                                TroubleId:id,
                                status:'1',
                                TimePoint:data.TimePoint
                            },
                            error:function(err){
                                console.log(err)
                            },
                            success:function(data){

                            }
                        })
                    }
                })*/
            }else{
                $("#siteDetailPage_content").html("");
                $.ajax({
                    url:myURL+"/alarmavg/findbyid",
                    data:{
                        id:id
                    },
                    async:true,
                    error:function(err){
                        $("#ajaxPleaseWait").hide();
                        console.log("error exits!"+err)
                    },
                    success:function(data){
                        $("#ajaxPleaseWait").hide();
                        var dataobj = eval("("+data+")");
                        console.log(dataobj)
                        $("#siteDetailPage .headerTitle").html(dataobj.AreaName+"数据异常详情");
                        var siteName = dataobj.AreaName+"平均值";
                        var timepoint = dataobj.TimePoint.split(" ")[1].substring(0,5);
                        var concentration = dataobj.Concentration;
                        var anomalyIndex = dataobj.Anomaly_index;
                        var reason;
                        var mycase = dataobj.Anomaly_reason;
                        switch(mycase){
                            case "1":
                                reason = "测管协同Ⅰ级响应"
                                break;
                            case "2":
                                reason = "测管协同Ⅱ级响应"
                                break;
                            case "3":
                                reason = "测管协同Ⅲ级响应"
                                break;
                        }
                        var anomalyIndexdiv=$("<div class='siteDetailTable'><span>异常指标</span><span>"+anomalyIndex+"</span></div>");
                        var concentrationdiv=$("<div class='siteDetailTable'><span>浓度值</span><span>"+concentration+"</span></div>");
                        if(anomalyIndex=="AQI"){
                            var concentrationdiv=$("<div class='siteDetailTable'><span>环境质量指数值</span><span>"+concentration+"</span></div>");
                        }
                        var siteNamediv=$("<div class='siteDetailTable'><span>站点名称</span><span>"+siteName+"</span></div>");
                        var timePointdiv=$("<div class='siteDetailTable'><span>报警时间</span><span>"+timepoint+"</span></div>");
                        var reasondiv=$("<div class='siteDetailTable'><span>异常说明</span><span>"+reason+"</span></div>");
                        $("#siteDetailPage_content").append(siteNamediv)
                        $("#siteDetailPage_content").append(timePointdiv)
                        $("#siteDetailPage_content").append(reasondiv)
                        $("#siteDetailPage_content").append(anomalyIndexdiv)
                        $("#siteDetailPage_content").append(concentrationdiv)
                        $.ajax({
                            url:myURL+config.savemsgStatus,
                            data:{
                                UserId:localStorage.userid,
                                TroubleId:dataobj.id,
                                status:'1',
                                TimePoint:dataobj.TimePoint
                            },
                            error:function(err){
                                console.log(err)
                            },
                            success:function(data){
                                console.log(data)
                            }
                        })
                    }
                })
            }
        }else if(Abnormal=='water'){
            $("#ajaxPleaseWait").show();
            $("#siteDetailPage_content").html("");
            var waterflag = sessionStorage.getItem("waterflag");
            if(waterflag == "AbnormalSituation"){
                $.ajax({
                    type:"POST",
                    url:waterUrl+config.findbyID,
                    data:{
                        ID:id
                    },
                    error:function(err){
                        $("#ajaxPleaseWait").hide();
                        tool.warningAlert("加载失败，请检查网络连接后重试！")
                        console.log(err)
                    },
                    success:function(data){
                        $("#ajaxPleaseWait").hide();
                        var dataobj = eval("("+data+")")
                        console.log(dataobj)
                        var type = sessionStorage.getItem("waterAbnormaltype")
                        $("#siteDetailPage .headerTitle").html(dataobj.STATIONNAME+"数据异常详情");
                        var siteName = dataobj.STATIONNAME;
                        var timepoint = dataobj.TIMEPOINT.split(" ")[1].substring(0,5);
                        var city = dataobj.CITY;
                        var basin = dataobj.BASINNAME;
                        var reason;
                        (dataobj.ANOMALY_INDEX==null||dataobj.ANOMALY_INDEX==undefined)?reason = "一":reason = dataobj.ANOMALY_INDEX
                        var siteNamediv=$("<div class='siteDetailTable'><span>站点名称</span><span>"+siteName+"</span></div>");
                        var citydiv=$("<div class='siteDetailTable'><span>报警时间</span><span>"+timepoint+"</span></div>");
                        var basindiv=$("<div class='siteDetailTable'><span>所属城市</span><span>"+city+"</span></div>");
                        var timePointdiv=$("<div class='siteDetailTable'><span>所属流域</span><span>"+basin+"</span></div>");
                        var reasondiv=$("<div class='siteDetailTable'><span>异常说明</span><span>"+reason+"</span></div>");
                        var subtitlediv;
                        type == "AbnormalSituation"?subtitlediv=$("<div class='watersubTitleSituation'><span>污染物</span><span>浓度(mg/L)</span></div>"):subtitlediv=$("<div class='watersubTitle'><span>污染物</span><span>浓度(mg/L)</span><span>污染物日均浓度环比</span></div>")
                        $("#siteDetailPage_content").append(siteNamediv)
                        $("#siteDetailPage_content").append(timePointdiv)
                        $("#siteDetailPage_content").append(citydiv)
                        $("#siteDetailPage_content").append(basindiv)
                        $("#siteDetailPage_content").append(reasondiv)
                        $("#siteDetailPage_content").append(subtitlediv)
                        if(type == "AbnormalSituation"){
                            var div=$("<div class='outlierdataTable' id='"+id+"'></div>");
                            var pollution=$("<div class='pollutionname50'>"+reason+"</div>");
                            var value;
                            (dataobj.Value==null||dataobj.Value==undefined)?value=$("<div class='pollutionvalue'>-</div>") :value=$("<div class='pollutionvalue'>"+dataobj.Value+"</div>");
                            div.append(pollution)
                            div.append(value)
                            $("#siteDetailPage_content").append(div)
                        }else{
                            $.map(dataobj.pollutant,function(data,index){
                                var div=$("<div class='outlierdataTable' id='"+id+"'></div>");
                                var name=$("<div class='timepoint'>"+data.name+"</div>");
                                var concentration=$("<div class='areaname'>"+data.concentration+"</div>");
                                var mom=$("<div class='wqi'>"+data.mom+"</div>");
                                div.append(name)
                                div.append(concentration)
                                div.append(mom)
                                $("#siteDetailPage_content").append(div)
                            })
                        }
                    }
                })
                $.ajax({
                    type:'POST',
                    url:waterUrl+config.waterSaveCache,
                    data:{
                        dataId:id,
                        name:userName
                    },
                    error:function(err){
                        console.log("error exits!");
                        console.log(err)
                    },
                    success:function(data){
                        console.log("保存未读消息成功")
                    }
                })
            }else if(waterflag == "AbnormalCount"){
                var watertype = sessionStorage.getItem("watercase");
                var diff;
                if(watertype=='4'||watertype=='5'||watertype=='6'){//水质测管协同一二三级响应
                    diff = '1';
                }else if(watertype=='1'||watertype=='2'||watertype=='3'||watertype=='7'){//无数据数据恒定数据离群超过阀值
                    diff = '0';
                }
                var timepoint = sessionStorage.getItem("watertimepoint");
                $.ajax({
                    type:"POST",
                    url:waterUrl+config.findAbnormalDetail,
                    data:{
                        stationCode:id,
                        time:timepoint,
                        type:watertype
                    },
                    error:function(err){
                        $("#ajaxPleaseWait").hide();
                        tool.warningAlert("加载失败，请检查网络连接后重试！")
                        console.log(err)
                    },
                    success:function(data){
                        $("#ajaxPleaseWait").hide();
                        var dataobj = eval("("+data+")")
                        $("#siteDetailPage .headerTitle").html(dataobj.STATIONNAME+"数据异常详情");
                        var siteName = dataobj.STATIONNAME;
                        var timepoint = dataobj.TIME;
                        var warningtime = dataobj.WARNTIME;
                        var city = dataobj.CITY;
                        var basin = dataobj.BASINNAME;
                        var reason = dataobj.anomalyreason;
                        var level = dataobj.CWQI_LEVEL;
                        var state = dataobj.APPWARNSTATE;
                        var factor;
                        dataobj.FACTOR=='COL1'?factor="总磷":dataobj.FACTOR=='COL2'?factor="氨氮":dataobj.FACTOR=='COL3'?factor="高锰酸盐指数":dataobj.FACTOR=='COL6'?factor="溶解氧":''
                        var pollution={
                            ammonia:{"name":"氨氮","value":dataobj.ammonia,"rate":dataobj.ammoniarate},
                            // dissolved:{"name":"溶解氧","value":dataobj.dissolved,"rate":dataobj.dissolvedrate},
                            phosphorus:{"name":"总磷","value":dataobj.phosphorus,"rate":dataobj.phosphorusrate},
                            potassium:{"name":"高锰酸盐","value":dataobj.potassium,"rate":dataobj.potassiumrate}
                        }
                        if(level==undefined||level==null){
                            level="一"
                        }
                        var siteNamediv=$("<div class='siteDetailTable'><span>站点名称</span><span>"+siteName+"</span></div>");
                        var citydiv=$("<div class='siteDetailTable'><span>报警时间</span><span>"+warningtime+"</span></div>");
                        var basindiv=$("<div class='siteDetailTable'><span>所属城市</span><span>"+city+"</span></div>");
                        var timePointdiv=$("<div class='siteDetailTable'><span>所属流域</span><span>"+basin+"</span></div>");
                        var reasondiv=$("<div class='siteDetailTable'><span>异常说明</span><span>"+reason+"</span></div>");
                        var abonormalSitudiv=$("<div class='siteDetailTable'><span>测管协同情况</span><span>"+state+"</span></div>");
                        var waterlvdiv=$("<div class='siteDetailTable'><span>水质类别</span><span>"+level+"</span></div>");
                        var outlierfactordiv=$("<div class='siteDetailTable'><span>异常因子</span><span>"+factor+"</span></div>");
                        if(diff=='1'){
                            var subtitlediv=$("<div class='watersubTitle'><span>因子名称</span><span>昨日均值(mg/L)</span><span>环比</span></div>");
                        }else{
                            var subtitlediv=$("<div class='watersubTitle'><span>因子名称</span><span>当前浓度(mg/L)</span><span>环比</span></div>");
                        }
                        $("#siteDetailPage_content").append(siteNamediv)
                        $("#siteDetailPage_content").append(citydiv)
                        $("#siteDetailPage_content").append(basindiv)
                        $("#siteDetailPage_content").append(timePointdiv)
                        $("#siteDetailPage_content").append(reasondiv)
                        if(diff=='1'){
                            $("#siteDetailPage_content").append(abonormalSitudiv)
                        }
                        $("#siteDetailPage_content").append(waterlvdiv)
                        $("#siteDetailPage_content").append(outlierfactordiv)
                        $("#siteDetailPage_content").append(subtitlediv)
                        $.map(pollution,function(data,index){
                            var name;
                            data.name=='高锰酸盐'?name='高锰酸盐指数':name=data.name;
                            var div=$("<div class='outlierdataTable' id='"+id+"'></div>");
                            var name=$("<div class='pollutionname31'>"+name+"</div>");
                            var value=$("<div class='areaname'>"+data.value+"</div>");
                            var rate=$("<div class='wqi'>"+data.rate+"</div>");
                            div.append(name)
                            div.append(value)
                            div.append(rate)
                            $("#siteDetailPage_content").append(div)
                        })
                    }
                })
                $.ajax({
                    type:'GET',
                    url:waterUrl+config.waterSaveCache+"?dataId="+msgid+"&name="+userName,
                    // data:{
                    //     dataId:msgid,
                    //     name:userName
                    // },
                    error:function(err){
                        console.log("error exits!");
                        console.log(err)
                    },
                    success:function(data){
                        console.log(msgid)
                        console.log(data)
                    }
                })
            }
        }
    },
    handleSubmit:function(){
        var errorSelector = $("#errorSelector").find("option:selected").val();
        var id = sessionStorage.getItem("id");
        $.ajax({
            type:"POST",
            url:myURL+'/alarm/update',
            data:{
                Result:"处理中",
                id:id,
                Trouble:errorSelector
            },
            error:function(err){
                tool.warningAlert("warAFailed","提交失败，请稍后尝试");
                console.log(err)
            },
            success:function(){
                tool.warningAlert("warAFailed","提交成功");
                $.mobile.changePage("#sitelistPage",{transition:"reverse"});
            }
        })
    },
    handleFinish:function(){
        var errorSelector = $("#errorSelector").find("option:selected").val();
        var id = sessionStorage.getItem("id");
        var timepoint = sessionStorage.getItem("time");
        console.log(errorSelector,id,timepoint)
        $.ajax({
            type:"POST",
            url:myURL+'/alarm/update',
            data:{
                Result:"已完成",
                id:id,
                Trouble:errorSelector,
                TimePoint:timepoint
            },
            error:function(err){
                console.log(err);
            },
            success:function(){
                tool.warningAlert("warAFailed","确认成功");
                $.mobile.changePage("#sitelistPage",{transition:"reverse"});
            }
        })
    },

    //数据审核页
    dataAuditPage_init:function(){
        var citycode = localStorage.code;
       // var citycode = localStorage.citycode;
        console.log("dataAuditPage_init数据审核页------->")
        console.log(localStorage.userid)
        console.log(citycode)
        console.log(localStorage.citycode)
        if(citycode=="5100"){
            var time=new Date((new Date()).setDate((new Date()).getDate()-1));
            time=time.getFullYear()+"-"+(time.getMonth()+1)+"-"+time.getDate();
            $("#dataAuditPage_Content").html("");
            $("#ajaxPleaseWait").show();
            $.ajax({
                type:"GET",
                url:provinceAjax+"/smartadmin/audit/getStationsWithStatusForApp",
                dataType:'json',
                async:true,
                data:{"timepoint":time,"stationtype":1,"userId":localStorage.userid},
                error:function(){$("#ajaxPleaseWait").hide();
                    tool.warningAlert("warAFailed","获取城市信息失败");
                },
                complete:function(XMLHttpRequest){
                    $("#ajaxPleaseWait").hide();
                    var data=eval("("+XMLHttpRequest.responseText+")");
                    var aqidata=data.resultData;
                    var statdata=data.data;
                    $.each(statdata,function(i,item){
                        var ifComp=(item.CITYNAME).split("[");
                        var cityname=ifComp[0];//市州名
                        // var compName=ifComp[1].replace(/]/,"");
                        var compName='';//市州完成情况
                        var compClass="";//完成情况分别显示的颜色
                        var compClass1="";//省控站完成颜色
                        var compName1='';//省控站完成情况
                        var compClass2='';//农村站完成情况颜色
                        var div=$("<div class='auditPageContentItem' citycode='"+item.CITYCODE+"' cityname='"+cityname.replace(/市/,"")+"'></div>");
                        var compProvince=2;//省控站完成情况初始化
                        var compCountryside=2;//农村站完成情况初始化
                        var compDirect=2;//直管站完成情况初始化
                        $.each(item.STATIONTYPES,function(j,itemj){
                           if(itemj.STATIONTYPECODE==2){
                                var stationstat=(itemj.STATIONTYPENAME).split("[")[1].replace(/]/,"");
                                if(stationstat=="已完成"){
                                    compCountryside = 1;
                                }else{
                                    compCountryside = 0;
                                }
                            }else if(itemj.STATIONTYPECODE==4){
                               var stationstat=(itemj.STATIONTYPENAME).split("[")[1].replace(/]/,"");
                               if(stationstat=="已完成"){
                                   compDirect = 1;
                               }else{
                                   compDirect = 0;
                               }
                           }else if(itemj.STATIONTYPECODE==7){
                                var stationstat=(itemj.STATIONTYPENAME).split("[")[1].replace(/]/,"");
                                if(stationstat=="已完成"){
                                    compProvince = 1;
                                }else{
                                    compProvince = 0;
                                }
                            }
                        });
                        var ifprovince = compProvince*compDirect;
                        if(ifprovince==0){
                            compName1='未完成';
                            compClass1="notyetCompleteLabel";
                        }else if(ifprovince==1){
                            compName1='已完成';
                            compClass1="alreadyCompleteLabel";
                        }else if(ifprovince==2){
                            compName1='已完成';
                            compClass1="alreadyCompleteLabel";
                        }
                        var runtime=0;
                        //判断市州完成情况，省控+农村站均完成则市州完成
                        if((compName1=='已完成' && compCountryside==1)||(compName1=='已完成'&&compCountryside==2)){
                            compClass="alreadyCompleteLabel";
                            compName='已完成'
                        }else{
                            compClass="notyetCompleteLabel";
                            compName='未完成'
                        }
                        var title=$("<div class='auditPageContentTitle'><i class='iconNew-listcity'></i><span>"+cityname.replace(/市/,"")+"</span><span class='"+compClass+"'>["+compName+"]</span></div>");
                        div.append(title);

                        $.each(item.STATIONTYPES,function(j,itemj){
                            var ifComp1=(this.STATIONTYPENAME).split("[");
                            var stationName=ifComp1[0];
                            var compName2=ifComp1[1].replace(/]/,"");
                            if(compName2=='已完成'){
                                compClass2="alreadyCompleteLabel";
                            }else{
                                compClass2="notyetCompleteLabel";
                            }
                            if(ifprovince!==4&&runtime!==1){
                                runtime=1;
                                div.append($("<div class='auditPageContentStation'><span>省控站</span>&nbsp;&nbsp;<span class='"+compClass1+"'>["+compName1+"]</span></div>"))
                            }else if(stationName=='农村站'){
                                div.append($("<div class='auditPageContentStation'><span>"+stationName+"</span>&nbsp;&nbsp;<span class='"+compClass2+"'>["+compName2+"]</span></div>"));
                            }
                        })
                        $("#dataAuditPage_Content").append(div);
                    });

                    $(".auditPageContentItem").unbind().click(function(){
                        var citycode=$(this).attr("citycode");
                        localStorage.citycode=citycode;
                        $.mobile.changePage("#auditStationDetail",{transition:"slide"});
                    });
                }
            });
        }else{
            $.mobile.changePage("#auditStationDetail");
        }
    },
    // 审核站点初始化
    auditStationDetail_init:function(){
        console.log("auditStationDetail_init审核站点初始化------>")
        var citycode = localStorage.citycode;
        if(localStorage.code=="5100"){
            $("#ajaxPleaseWait").show();
            $.ajax({
                type:"GET",
                url:provinceAjax+"/dataShare/getCity",
                dataType:'json',
                async:true,
                data:{},
                error:function(){$("#ajaxPleaseWait").hide();
                    tool.warningAlert("warAFailed","获取城市信息失败");
                },
                complete:function(XMLHttpRequest){
                    $("#ajaxPleaseWait").hide();
                    var data=eval("("+XMLHttpRequest.responseText+")");
                    $("#auditStationDetail_selectCity").html("");
                    data.data.length=21;
                    $.each(data.data,function(i,item){
                        if(i%3==0){
                            $("#auditStationDetail_selectCity").append($("<div class='forecastCityPage_citySelectRow'></div>"));
                            var divCity=$("<div class='cityPage_citySelectItemLeft auditStationDetail_citySelectItem' citycodeForCityPage='"+item.CITYCODE+"' cityJC='"+item.CITYJC+"'>"+(item.CITYNAME)+"</div>");
                            $("#auditStationDetail_selectCity").children(".forecastCityPage_citySelectRow").eq(-1).append(divCity);
                        }else if(i%3==1){
                            var divCity=$("<div class='cityPage_citySelectItemCenter auditStationDetail_citySelectItem' citycodeForCityPage='"+item.CITYCODE+"' cityJC='"+item.CITYJC+"'>"+(item.CITYNAME)+"</div>");
                            $("#auditStationDetail_selectCity").children(".forecastCityPage_citySelectRow").eq(-1).append(divCity);
                        }else if(i%3==2){
                            var divCity=$("<div class='cityPage_citySelectItemRight auditStationDetail_citySelectItem' citycodeForCityPage='"+item.CITYCODE+"' cityJC='"+item.CITYJC+"'>"+(item.CITYNAME)+"</div>");
                            $("#auditStationDetail_selectCity").children(".forecastCityPage_citySelectRow").eq(-1).append(divCity);
                        }
                    });
                    $(".auditStationDetail_citySelectItem").unbind().click(function(){
                        var citycodeEach=$(this).attr("citycodeForCityPage");
                        menuFunction.auditStationDetailPath(citycodeEach);
                        $("#auditStationDetail_selectCity").popup("close");
                    });
                    menuFunction.auditStationDetailPath(citycode);
                }
            });
        }else{
            tool.hideTheProvinceOnly();
            menuFunction.auditStationDetailPath(citycode);
        }
    },
    // //审核详情
    auditStationDetailPath:function(citycode){
        console.log("auditStationDetailPath审核详情------>")
        var time=new Date((new Date()).setDate((new Date()).getDate()-1));
        time=time.getFullYear()+"-"+(time.getMonth()+1)+"-"+time.getDate();
        $("#auditPage_Content").html("");
        $("#ajaxPleaseWait").show();
        console.log(localStorage.userid)
        console.log(citycode)
        console.log(localStorage.citycode)
        $.ajax({
            type:"GET",
            url:provinceAjax+"/smartadmin/audit/getStationsWithStatusForApp",
            dataType:'json',
            async:true,
            data:{"timepoint":time,"stationtype":1,"userId": localStorage.userid},
            error:function(){$("#ajaxPleaseWait").hide();
                tool.warningAlert("warAFailed","获取城市信息失败");
            },
            complete:function(XMLHttpRequest){
                $("#ajaxPleaseWait").hide();
                var data=eval("("+XMLHttpRequest.responseText+")");
                $.each(data.data,function(i,item){
                    //找到对应citycode的城市
                    if(item.CITYCODE==citycode){
                        $("#auditStationName").text(item.CITYNAME.split("[")[0]);
                        $("#auditStationDetail_selectStation").html("");
                        var cityStationCode="";
                        var countyStationCode="";
                        cityStationName=[];
                        countyStationName=[];
                        console.log("item----》")
                        console.log(item)
                        $.each(item.STATIONTYPES,function(j,itemj){
                            if(itemj.STATIONTYPECODE==7 || itemj.STATIONTYPECODE==2){
                                console.log("itemj----》")
                                console.log(itemj)
                                if(itemj.STATIONTYPECODE==7){
                                    $.each(itemj.COUNTYS,function(h,itemh) {
                                        $.each(itemh.STATIONS,function(z,itemz) {
                                            cityStationCode += itemz.STATIONCODE + ",";
                                            var nameeach = {};
                                            nameeach.stationname = itemz.POSITIONNAME;
                                            nameeach.stationcode = itemz.STATIONCODE;
                                            cityStationName.push(nameeach);
                                       });
                                    });
                                }else if(itemj.STATIONTYPECODE==2){
                                    $.each(itemj.STATIONS,function(h,itemh) {
                                        countyStationCode+=itemh.STATIONCODE+",";
                                        var nameeach={};
                                        nameeach.stationname=itemh.POSITIONNAME;
                                        nameeach.stationcode=itemh.STATIONCODE;
                                        countyStationName.push(nameeach);
                                    });
                                }
                               /* $.each(itemj.STATIONS,function(h,itemh){
                                    console.log("itemh----》")
                                    console.log(itemh)
                                    $("#auditStationDetail_selectStation").append($("<div class='stationDetailStationListItem' stationcode='"+itemh.STATIONCODE+"'>"+itemh.POSITIONNAME+"</div>"));
                                    if(itemj.STATIONTYPECODE==7){
                                        cityStationCode+=itemh.STATIONCODE+",";
                                        var nameeach={};
                                        nameeach.stationname=itemh.POSITIONNAME;
                                        nameeach.stationcode=itemh.STATIONCODE;
                                        cityStationName.push(nameeach);
                                    }else if(itemj.STATIONTYPECODE==2){
                                        countyStationCode+=itemh.STATIONCODE+",";
                                        var nameeach={};
                                        nameeach.stationname=itemh.POSITIONNAME;
                                        nameeach.stationcode=itemh.STATIONCODE;
                                        countyStationName.push(nameeach);
                                    }
                                });*/

                            }
                        });
                        console.log("cityStationCode----->")
                        console.log(cityStationCode)
                        cityStationCode=cityStationCode.substring(0,cityStationCode.length-1);
                        countyStationCode=countyStationCode.substring(0,countyStationCode.length-1);
                        $("#auditStationName").attr("cityStationCode",cityStationCode);
                        $("#auditStationName").attr("countyStationCode",countyStationCode);

                        var codearr1=new Array();
                        var codearr2=new Array();
                        codearr1=($("#auditStationName").attr("cityStationCode")).split(",");
                        codearr2=($("#auditStationName").attr("countyStationCode")).split(",");
                      /*  codearr1=($("#auditStationName").attr("countyStationCode")).split(",");
                        codearr2=($("#auditStationName").attr("countyStationCode")).split(",");*/
                        var stationcount1=0;
                        var stationlimit1=codearr1.length;
                        var stationcount2=0;
                        var stationlimit2=codearr2.length;
                        console.log("两组站点数据---->")
                        console.log(codearr1)
                        console.log(codearr2)
                        $("#ajaxPleaseWait").show();
                        auditGraphDataForSaveCity=[];
                        auditGraphDataForSaveCounty=[];
                        auditTableDataForSaveCity=[];
                        auditTableDataForSaveCounty=[];
                        for(var j=0;j<codearr1.length;j++){
                            $.ajax({
                                type:"GET",
                                url:provinceAjax+"/smartadmin/statAnalyse/getHourDataForApp",
                                dataType:'json',
                                async:true,
                                data:{"type":4,"gaslist":"AQI","cityCode":citycode,"userId":localStorage.userid,"area":"'"+codearr1[j]+"'"},
                                error:function(){$("#ajaxPleaseWait").hide();
                                    tool.warningAlert("warAFailed","获取信息失败");
                                },
                                complete:function(XMLHttpRequest){
                                    stationcount1++;
                                    var data=eval("("+XMLHttpRequest.responseText+")");
                                    var stationname="";
                                    var dataEach={};
                                    $.each(data.data,function(h,itemh){
                                        stationname= h.split("_")[1];
                                        dataEach.stationname=stationname;
                                        dataEach.stationcode=itemh[0].STATIONCODE;
                                        dataEach.data=itemh;
                                    });
                                    auditGraphDataForSaveCity.push(dataEach);
                                    if(stationcount1==stationlimit1){
                                        for(var k=0;k<codearr2.length;k++){
                                            $.ajax({
                                                type:"GET",
                                                url:provinceAjax+"/smartadmin/statAnalyse/getHourDataForApp",
                                                dataType:'json',
                                                async:true,
                                                data:{"type":4,"gaslist":"AQI","cityCode":citycode,"userId":localStorage.userid,"area":"'"+codearr2[k]+"'"},
                                                error:function(){$("#ajaxPleaseWait").hide();
                                                    tool.warningAlert("warAFailed","获取信息失败");
                                                },
                                                complete:function(XMLHttpRequest){
                                                    stationcount2++;
                                                    var data=eval("("+XMLHttpRequest.responseText+")");
                                                    var stationname2="";
                                                    var dataEach2={};
                                                    console.log("dataEach2----->")
                                                    console.log(data.data)
                                                    $.each(data.data,function(l,iteml){
                                                        stationname2= l.split("_")[1];
                                                        dataEach2.stationname=stationname2;
                                                        dataEach2.stationcode=iteml[0].STATIONCODE;
                                                        dataEach2.data=iteml;
                                                    })
                                                    auditGraphDataForSaveCounty.push(dataEach2);
                                                    if(stationcount2==stationlimit2){
                                                        stationcount1=0;
                                                        stationcount2=0;
                                                        for(var a=0;a<codearr1.length;a++){
                                                            $.ajax({
                                                                type:"GET",
                                                                url:provinceAjax+"/smartadmin/statAnalyse/getDayDataForApp",
                                                                dataType:'json',
                                                                async:true,
                                                                data:{"type":4,"gaslist":"AQI","cityCode":citycode,"userId":localStorage.userid,"area":"'"+codearr1[a]+"'"},
                                                                error:function(){$("#ajaxPleaseWait").hide();
                                                                    tool.warningAlert("warAFailed","获取信息失败");
                                                                },
                                                                complete:function(XMLHttpRequest){
                                                                    stationcount1++;
                                                                    var data=eval("("+XMLHttpRequest.responseText+")");
                                                                    var dataEach={};
                                                                    $.each(data.data,function(b,itemb){
                                                                        var stationcode= itemb[0].STATIONCODE;
                                                                        var stationname="";
                                                                        $.each(cityStationName,function(c,itemc){
                                                                            if(itemc.stationcode==stationcode){
                                                                                stationname=itemc.stationname;
                                                                            }
                                                                        });
                                                                        dataEach.stationname=stationname;
                                                                        dataEach.stationcode=stationcode;
                                                                        dataEach.data=itemb;
                                                                        auditTableDataForSaveCity.push(dataEach);
                                                                    });
                                                                    if(stationcount1==stationlimit1){
                                                                        for(var d=0;d<codearr2.length;d++){
                                                                            $.ajax({
                                                                                type:"GET",
                                                                                url:provinceAjax+"/smartadmin/statAnalyse/getDayDataForApp",
                                                                                dataType:'json',
                                                                                async:true,
                                                                                data:{"type":4,"gaslist":"AQI","cityCode":citycode,"userId":localStorage.userid,"area":"'"+codearr2[d]+"'"},
                                                                                error:function(){$("#ajaxPleaseWait").hide();
                                                                                    tool.warningAlert("warAFailed","获取信息失败");
                                                                                },
                                                                                complete:function(XMLHttpRequest){
                                                                                    stationcount2++;
                                                                                    var data=eval("("+XMLHttpRequest.responseText+")");
                                                                                    console.log(data)
                                                                                    var dataEach={};
                                                                                    $.each(data.data,function(b,itemb){
                                                                                        var stationcode= itemb[0].STATIONCODE;
                                                                                        var stationname="";
                                                                                        $.each(countyStationName,function(c,itemc){
                                                                                            if(itemc.stationcode==stationcode){
                                                                                                stationname=itemc.stationname;
                                                                                                console.log(stationname)
                                                                                            }
                                                                                        });
                                                                                        dataEach.stationname=stationname;
                                                                                        dataEach.stationcode=stationcode;
                                                                                        dataEach.data=itemb;
                                                                                        auditTableDataForSaveCounty.push(dataEach);
                                                                                    });
                                                                                    console.log(auditTableDataForSaveCounty)
                                                                                    if(stationcount2==stationlimit2){
                                                                                        $("#ajaxPleaseWait").hide();
                                                                                        $(".stationDetailStationListItem").unbind().click(function(){
                                                                                            var stationcode=$(this).attr("stationcode");
                                                                                            menuFunction.auditStationAuditListData(stationcode);
                                                                                        });
                                                                                        $("#auditStationGasChooseBar").children("div").unbind().click(function(){
                                                                                            $(".auditStationGasChooseBarActive").removeClass("auditStationGasChooseBarActive");
                                                                                            $(this).addClass("auditStationGasChooseBarActive");
                                                                                            var stationtype=$(".auditStationMenuBarActive").attr("type");
                                                                                            var gas=$(this).attr("gas");
                                                                                            console.log(stationtype,gas,citycode)
                                                                                            menuFunction.createAuditStationDetail(stationtype,gas,citycode);
                                                                                        });
                                                                                        $("#auditStationMenuBar").children("div").unbind().click(function(){
                                                                                            $(".auditStationMenuBarActive").removeClass("auditStationMenuBarActive");
                                                                                            $(this).addClass("auditStationMenuBarActive");
                                                                                            $(".auditStationGasChooseBarActive").click();
                                                                                        });
                                                                                        $("#auditStationMenuBar").children("div").eq(0).click();

                                                                                        $("#auditStationHourGraphMarkButton").unbind().click(function(){
                                                                                            var graphType=$(this).attr("type");
                                                                                            if(graphType=="0"){
                                                                                                $("#auditStationHourGraphMarkDiv").stop().animate({"left":"0%"},1000);
                                                                                                $(this).attr("type","1");
                                                                                            }else{
                                                                                                $("#auditStationHourGraphMarkDiv").stop().animate({"left":"-100%"},1000);
                                                                                                $(this).attr("type","0");
                                                                                            }
                                                                                        });

                                                                                        // $("#auditStationHourGraphMarkDiv").css("height",(tool.changeIframeAllScreen()-239)+"px");
                                                                                        // $("#auditStationGasTableBodyOutDiv").css("height",(tool.changeIframeAllScreen()-300)+"px");
                                                                                    }
                                                                                }
                                                                            });
                                                                        }
                                                                    }
                                                                }
                                                            });
                                                        }
                                                    }
                                                }
                                            });
                                        }
                                    }
                                }
                            });
                        }
                    }
                });
            }
        });
    },
    createAuditStationDetail:function(stationtype,gas,citycode){
        var graphdata=[];
        var tabledata=[];
        if(stationtype=="city"){
            graphdata=auditGraphDataForSaveCity;
            tabledata=auditTableDataForSaveCity
        }else{
            graphdata=auditGraphDataForSaveCounty;
            tabledata=auditTableDataForSaveCounty
        }
        var legend=new Array();
        var xlabel=new Array();
        for(var j=0;j<24;j++){
            xlabel.push(j+"时");
        }
        var dw="μg/m³";
        if(gas=="AQI"){
            dw="无量纲";
        }else if(gas=="CO"){
            dw="mg/m³"
        }
        var legendDiv=new Array();
        var seriesData="[";
        console.log("graphdata----->")
        console.log(graphdata)
        $.each(graphdata,function(i,item){
            legend.push(item.stationname);
            legendDiv.push(item.stationname+"-"+graphColor[i]);
            var dataEach="{name:\""+item.stationname+"\",type:\"line\",data:[";
            $.each(item.data,function(j,itemj){
                var value=itemj[gas];
                if(gas=="PM2_5"){
                    value=itemj["PM2.5"];
                }
                if(value=='—'){
                    value="'-'";
                }
                dataEach+=value+",";
            });
            dataEach=dataEach.substring(0,dataEach.length-1);
            dataEach+="]},";
            seriesData+=dataEach;
        });
        seriesData=seriesData.substring(0,seriesData.length-1);
        seriesData+="]";
        seriesData=eval(seriesData);
        var myChart = echarts.init(document.getElementById('auditStationHourGraph'));
        myChart.setOption({
            backgroundColor:"#fff",
            title:{
                show:false,
                text:""
            },
            grid:{
                x:30,
                y:30,
                x2:30,
                y2:30
            },
            tooltip : {
                show:false,
                trigger:'axis'
            },
            toolbox: {
                show : false
            },
            calculable : false,
            legend: {
                show:false,
                data:legend
            },
            xAxis : [
                {
                    type : 'category',
                    boundaryGap : false,
                    data : xlabel
                }
            ],
            yAxis : [
                {
                    type : 'value',
                    name:dw
                }
            ],
            series :seriesData
        });
        $("#auditStationHourGraphMarkDiv").html("");
        for(var i=0;i<legendDiv.length;i++){
            var labelname=legendDiv[i].split("-");
            var div=$("<div class='auditStationGraphMarkItem' style='background-color:"+labelname[1]+"'>"+labelname[0]+"</div>");
            if(i%3==0){
                $("#auditStationHourGraphMarkDiv").append($("<div class='auditStationGraphMarkRow'></div>"));
            }
            $("#auditStationHourGraphMarkDiv").children(".auditStationGraphMarkRow").eq(-1).append(div);
        }

        $("#auditStationGasTableBody").children("tbody").html("");
        var codeArr=new Array();
        $.each(tabledata,function(i,item){
            var stationcodeNum=(item.stationcode).replace(/A/,"").replace(/B/,"").replace(/C/,"").replace(/S/,"").replace(/D/,"");
            stationcodeNum=parseInt(stationcodeNum);
            codeArr.push(stationcodeNum);
        });
        for(var i=0;i<codeArr.length-1;i++){
            for(var j=i+1;j<codeArr.length;j++){
                if(codeArr[i]>codeArr[j]){
                    var temp=codeArr[i];
                    codeArr[i]=codeArr[j];
                    codeArr[j]=temp;
                    var temp2=tabledata[i];
                    tabledata[i]=tabledata[j];
                    tabledata[j]=temp2;
                }
            }
        }
        $.each(tabledata,function(i,item){
            var tr=$("<tr class='auditStationTableTr' stationcode='"+item.stationcode+"'></tr>");
            var stationnameArr=item.stationname;
            stationnameArr=stationnameArr.split("[");
            stationnameArr=stationnameArr[0]+"<br/>["+stationnameArr[1];
            var td1=$("<td>"+item.data[0]["STATIONNAME"]+"</td>");
            var td2=$("<td class='auditStationTableGasTd'><label style='background-color:"+tool.levelColor(tool.levelReturn(gas,item.data[0][gas]))+"'>"+item.data[0][gas]+"</label></td>");
            var td3=$("<td>"+item.data[0]["MAX"+gas]+"</td>");
            var td4=$("<td>"+item.data[0]["MIN"+gas]+"&nbsp;&nbsp;&nbsp;></td>");
            tr.append(td1);
            tr.append(td2);
            tr.append(td3);
            tr.append(td4);
            $("#auditStationGasTableBody").append(tr);
        });
        $(".auditStationTableTr").unbind().click(function(){
            var stationcode=$(this).attr("stationcode");
            $.mobile.changePage("#auditStationAuditListDetail?citycode="+citycode+"&stationcode="+stationcode,{transition:"slide"});
        });
    },
    auditStationAuditListDetail_init:function(citycode,stationcode){
        if(localStorage.code=="5100"){
            $("#auditStationAuditSendDown").html("<i class='icon-circle-arrow-down'></i>下发");
            $("#auditStationAuditSendDown").unbind().click(function(){
                if($("#auditStationListTitleName").text().search("已下发")!=-1){
                    tool.warningAlert("warAFailed","该站点已审核,不能进行下发");
                }else{
                    $("#auditStationDetail_topList").popup("close");
                    var newtime=new Date();
                    newtime=new Date(newtime.setDate(newtime.getDate()-1));
                    var timeArr=newtime.getFullYear()+"-"+(newtime.getMonth()+1)+"-"+newtime.getDate()+" 00:00:00";
                    $("#ajaxPleaseWait").show();
                    $.ajax({
                        type:"GET",
                        url:localStorage.loginUrl+"/dataShare/sendDownForApp",
                        dataType:'json',
                        async:true,
                        data:{"citycode": citycode,"stationcode":stationcode,"status":1,"timepoint":timeArr,"userName":localStorage.Name},
                        error:function(){$("#ajaxPleaseWait").hide();
                            tool.warningAlert("warAFailed","获取审核信息失败");
                        },
                        complete:function(XMLHttpRequest){
                            $("#ajaxPleaseWait").hide();
                            var data=eval("("+XMLHttpRequest.responseText+")");
                            tool.warningAlert("warAFailed","下发成功!");
                            $.mobile.changePage("#auditStationDetail?citycode="+citycode,{transition:"slide",reverse:"true"});

                        }
                    });
                }
            });
        }else{
            $("#auditStationAuditSendDown").html("<i class='icon-circle-arrow-down'></i>上传");
            $("#auditStationAuditSendDown").unbind().click(function(){
                if($("#auditStationListTitleName").text().search("已审核")!=-1){
                    tool.warningAlert("warAFailed","该站点已审核,不能进行上传");
                }else if($("#auditStationListTitleName").text().search("未下发")!=-1){
                    tool.warningAlert("warAFailed","该站点未下发,不能进行上传");
                }else {
                    $("#auditStationDetail_topList").popup("close");
                    var newtime = new Date();
                    newtime = new Date(newtime.setDate(newtime.getDate() - 1));
                    var timeArr = newtime.getFullYear() + "-" + (newtime.getMonth() + 1) + "-" + newtime.getDate() + " 00:00:00";
                    $("#ajaxPleaseWait").show();
                    $.ajax({
                        type: "GET",
                        url: localStorage.loginUrl + "/smartadmin/audit/sendDownForApp",
                        dataType: 'json',
                        async: true,
                        data: {
                            "citycode": citycode,
                            "stationcode": stationcode,
                            "status": 2,
                            "timepoint": timeArr,
                            "userName": localStorage.Name
                        },
                        error: function () {
                            tool.warningAlert("warAFailed", "获取审核信息失败");
                        },
                        complete: function (XMLHttpRequest) {
                            $("#ajaxPleaseWait").hide();
                            var data = eval("(" + XMLHttpRequest.responseText + ")");
                            tool.warningAlert("warAFailed","上传成功!");
                            $.mobile.changePage("#auditStationDetail?citycode="+citycode,{transition:"slide",reverse:"true"});
                        }
                    });
                }
            });
        }
        menuFunction.auditStationAuditListData(stationcode);
    },
    auditStationAuditListData:function(stationcode){
        $("#auditStationDetail_selectStation").popup("close");
        $("#auditStationListTitleName").attr("stationcode",stationcode);
        $(".stationDetailStationListItem").each(function(){
            if($(this).attr("stationcode")==stationcode){
                $("#auditStationListTitleName").text($(this).text());
            }
        });
        var d=new Date();
        d.setDate(d.getDate()-1);
        d= d.getFullYear()+"-"+ (d.getMonth()+1+"-")+ d.getDate();
        $("#ajaxPleaseWait").show();
        $.ajax({
            type:"GET",
            url:localStorage.loginUrl+"/smartadmin/audit/getStationData",
            dataType:'json',
            async:true,
            data:{"timepoint": d,"stationcode":stationcode},
            error:function(){$("#ajaxPleaseWait").hide();
                tool.warningAlert("warAFailed","获取审核信息失败");
            },
            complete:function(XMLHttpRequest){
                $("#ajaxPleaseWait").hide();
                var data=eval("("+XMLHttpRequest.responseText+")");
                var tbody=$("#auditStationAuditTable").children("tbody");
                tbody.html("");
                $("#auditStationAuditTable").attr("so2flag","0");
                $("#auditStationAuditTable").attr("no2flag","0");
                $("#auditStationAuditTable").attr("coflag","0");
                $("#auditStationAuditTable").attr("o3flag","0");
                $("#auditStationAuditTable").attr("pm10flag","0");
                $("#auditStationAuditTable").attr("pm2_5flag","0");
                $.each(data.data,function(i,item){
                    var time=((item.timepoint).split(" ")[1]).split(":")[0];
                    if(time=="00"){
                        time="24";
                    }
                    var tr=$("<tr></tr>");
                    var td1=$("<td class='tableTIME'>"+time+"时</td>");
                    var td2=$("<td class='tableSO2 gastd' time='"+item.timepoint+"' gas='SO2' value='"+item.so2+"' mark='"+item.so2_mark+"'>"+item.so2+"</td>");
                    var td3=$("<td class='tableNO2 gastd' time='"+item.timepoint+"' gas='NO2' value='"+item.no2+"' mark='"+item.no2_mark+"'>"+item.no2+"</td>");
                    var td4=$("<td class='tableCO gastd' time='"+item.timepoint+"' gas='CO' value='"+item.co+"' mark='"+item.co_mark+"'>"+item.co+"</td>");
                    var td5=$("<td class='tableO3 gastd' time='"+item.timepoint+"' gas='O3' value='"+item.o3+"' mark='"+item.o3_mark+"'>"+item.o3+"</td>");
                    var td6=$("<td class='tablePM10 gastd' time='"+item.timepoint+"' gas='PM10' value='"+item.pm10+"' mark='"+item.pm10_mark+"'>"+item.pm10+"</td>");
                    var td7=$("<td class='tablePM2_5 gastd' time='"+item.timepoint+"' gas='PM2.5' value='"+item.pm2_5+"' mark='"+item.pm2_5_mark+"'>"+item.pm2_5+"</td>");
                    tr.append(td1);
                    tr.append(td2);
                    tr.append(td3);
                    tr.append(td4);
                    tr.append(td5);
                    tr.append(td6);
                    tr.append(td7);

                    if(item.so2_mark!=""){
                        tool.auditTdMark(td2,item.so2_mark);
                        tr.addClass("problemTr");
                        $("#auditStationAuditTable").attr("so2flag","1");
                    }
                    if(item.no2_mark!=""){
                        tool.auditTdMark(td3,item.no2_mark);
                        tr.addClass("problemTr");
                        $("#auditStationAuditTable").attr("no2flag","1");
                    }
                    if(item.co_mark!=""){
                        tool.auditTdMark(td4,item.co_mark);
                        tr.addClass("problemTr");
                        $("#auditStationAuditTable").attr("coflag","1");
                    }
                    if(item.o3_mark!=""){
                        tool.auditTdMark(td5,item.o3_mark);
                        tr.addClass("problemTr");
                        $("#auditStationAuditTable").attr("o3flag","1");
                    }
                    if(item.pm10_mark!=""){
                        tool.auditTdMark(td6,item.pm10_mark);
                        tr.addClass("problemTr");
                        $("#auditStationAuditTable").attr("pm10flag","1");
                    }
                    if(item.pm2_5_mark!=""){
                        tool.auditTdMark(td7,item.pm2_5_mark);
                        tr.addClass("problemTr");
                        $("#auditStationAuditTable").attr("pm2_5flag","1");
                    }
                    tbody.append(tr);
                });
                $("#auditStationAuditMenuBar").children("div").unbind().click(function(){
                    $(".auditStationAuditMenuBarActive").removeClass("auditStationAuditMenuBarActive");
                    $(this).addClass("auditStationAuditMenuBarActive");
                    var type=$(this).attr("type");
                    if(type=="all"){
                        $("#auditStationAuditTable").find("tr").show();
                        $("#auditStationAuditTable").find("td").show();
                        $("#auditStationAuditTable").find("th").show();
                    }else{
                        $("#auditStationAuditTable").children("tbody").find("tr").hide();
                        $("#auditStationAuditTable").children("tbody").find("td").hide();
                        $("#auditStationAuditTable").find("th").hide();
                        $(".tableTIME").show();
                        $(".problemTr").show();
                        if($("#auditStationAuditTable").attr("so2flag")=="1"){
                            $(".tableSO2").show();
                        }
                        if($("#auditStationAuditTable").attr("no2flag")=="1"){
                            $(".tableNO2").show();
                        }
                        if($("#auditStationAuditTable").attr("coflag")=="1"){
                            $(".tableCO").show();
                        }
                        if($("#auditStationAuditTable").attr("o3flag")=="1"){
                            $(".tableO3").show();
                        }
                        if($("#auditStationAuditTable").attr("pm10flag")=="1"){
                            $(".tablePM10").show();
                        }
                        if($("#auditStationAuditTable").attr("pm2_5flag")=="1"){
                            $(".tablePM2_5").show();
                        }
                    }
                });
                $("#auditStationAuditMenuBar").children("div").eq(0).click();

                $("#auditStationAuditFilter").unbind().click(function(){
                    $("#auditStationDetail_topList").popup("close");
                    var body=$("<div id='filterContent'></div>");
                    var label1=$("<label><input data-role='none' type='checkbox' gas='SO2'>SO<sub>2</sub></label>");
                    var label2=$("<label><input data-role='none' type='checkbox' gas='NO2'>NO<sub>2</sub></label>");
                    var label3=$("<label><input data-role='none' type='checkbox' gas='CO'>CO</label>");
                    var label4=$("<label><input data-role='none' type='checkbox' gas='O3'>O<sub>3</sub></label>");
                    var label5=$("<label><input data-role='none' type='checkbox' gas='PM10'>PM<sub>10</sub></label>");
                    var label6=$("<label><input data-role='none' type='checkbox' gas='PM2_5'>PM<sub>2.5</sub></label>");
                    body.append(label1);
                    body.append(label2);
                    body.append(label3);
                    body.append(label4);
                    body.append(label5);
                    body.append(label6);
                    tool.showTheAuditAskDiv("请选择类型",body,"menuFunction.filterAuditTable()","确定");
                });

                $("#auditStationAuditTable").find(".gastd").unbind().click(function(){
                    $("#auditPopDivBack").hide();
                    $("#auditPopDiv").remove();
                    var value=$(this).attr("value");
                    var gas=$(this).attr("gas");
                    var mark=$(this).attr("mark");
                    var time=$(this).attr("time");
                    var popDiv=$("<div id='auditPopDiv'><div id='auditEachDataDetail' time='"+time+"' value='"+value+"' gas='"+gas+"' mark='"+mark+"'>数据详情</div><div id='auditEachDataWork' time='"+time+"' value='"+value+"' gas='"+gas+"' mark='"+mark+"'>数据审核</div></div>");
                    var left=parseFloat($(this).outerWidth()/2).toFixed(5);
                    left=parseFloat(left)-33;
                    $(this).append(popDiv);
                    $("#auditPopDiv").css("margin-left",left+"px");
                    $("#auditPopDivBack").show();
                    $("#auditPopDivBack").unbind().click(function(){
                        $(this).hide();
                        $("#auditPopDiv").remove();
                    });
                    $("#auditEachDataDetail").unbind().click(function(){
                        menuFunction.auditEachDataDetail();
                    });
                    $("#auditEachDataWork").unbind().click(function(){
                        menuFunction.auditEachDataWork();
                    });
                });
            }
        });
    },
    auditEachDataDetail:function(){
        var markname="";
        var mark=$("#auditEachDataDetail").attr("mark");
        if(mark!=""){
            $.getJSON("data/reason.json",{},function(data){
                var markArr=mark.split(",");
                for(var i=0;i<markArr.length;i++){
                    if(data[0][markArr[i]]){
                        markname+=data[0][markArr[i]].information+",";
                    }else{
                        markname+=markArr[i]+",";
                    }
                }
                markname=markname.substring(0,markname.length-1);
                var body=$("<div id='auditEachDataContent'></div>");
                var label1=$("<label>站点："+$("#auditStationListTitleName").text()+"</label>");
                var label2=$("<label>时间："+$("#auditEachDataDetail").attr("time")+"</label>");
                var label3=$("<label>类型："+$("#auditEachDataDetail").attr("gas")+"</label>");
                var label4=$("<label>数值："+$("#auditEachDataDetail").attr("value")+"</label>");
                var label5=$("<label>说明："+markname+"</label>");
                body.append(label1);
                body.append(label2);
                body.append(label3);
                body.append(label4);
                body.append(label5);
                tool.showTheAuditAskDiv("数据详情",body,"menuFunction.auditEachDataWork()","审核");
            });
        }else{
            var body=$("<div id='auditEachDataContent'></div>");
            var label1=$("<label>站点："+$("#auditStationListTitleName").text()+"</label>");
            var label2=$("<label>时间："+$("#auditEachDataDetail").attr("time")+"</label>");
            var label3=$("<label>类型："+$("#auditEachDataDetail").attr("gas")+"</label>");
            var label4=$("<label>数值："+$("#auditEachDataDetail").attr("value")+"</label>");
            var label5=$("<label>说明:</label>");
            body.append(label1);
            body.append(label2);
            body.append(label3);
            body.append(label4);
            body.append(label5);
            tool.showTheAuditAskDiv("数据详情",body,"menuFunction.auditEachDataWork()","审核");
        }
    },
    auditEachDataWork:function(){
        if(localStorage.code=="5100" && $("#auditStationListTitleName").text().search("已下发")!=-1){
            tool.warningAlert("warAFailed","该站点已下发,不能审核");
        }else if(localStorage.code!="5100" && $("#auditStationListTitleName").text().search("未下发")!=-1){
            tool.warningAlert("warAFailed","该站点未下发,不能审核");
        }else if(localStorage.code!="5100" && $("#auditStationListTitleName").text().search("已审核")!=-1){
            tool.warningAlert("warAFailed","该站点已审核");
        }else {
            $("#auditAskDiv").hide();
            var body=$("<div id='auditEachWorkDataContent' timepoint='"+$("#auditEachDataWork").attr("time")+"' oldvalue='"+$("#auditEachDataWork").attr("value")+"' oldmark='"+$("#auditEachDataWork").attr("mark")+"' gas='"+$("#auditEachDataWork").attr("gas")+"'></div>");
            var title=$("#auditEachDataWork").attr("time").split(" ")[1]+" "+$("#auditEachDataWork").attr("gas")+"="+$("#auditEachDataWork").attr("value");
            var label1=$("<label>修改数据<input data-role='none' placeholder='"+$("#auditEachDataWork").attr("value")+"' id='auditNewValue'></label>");
            var label2=$("<label style='width:100%'>" +
                "<label><input data-role='none' name='auditRadio' type='radio' onclick='menuFunction.divinvaliadata()' mark='ZK'>质量控制</label>" +
                "<label><input data-role='none' name='auditRadio' type='radio' onclick='menuFunction.divinvaliadata()' mark='CZ'>零点校准</label>" +
                "</label>");
            var label3=$("<label style='width:100%'>" +
                "<label><input data-role='none' name='auditRadio' type='radio' onclick='menuFunction.divinvaliadata()' mark='CS'>跨度校准</label>" +
                "<label><input data-role='none' name='auditRadio' type='radio' onclick='menuFunction.divinvaliadata()' mark='FC'>浮尘天气</label>" +
                "</label>");
            var label4=$("<label style='width:100%'>" +
                "<label><input data-role='none' name='auditRadio' type='radio' onclick='menuFunction.divinvaliadata()' mark='JG'>秸秆燃烧</label>" +
                "<label><input data-role='none' name='auditRadio' type='radio' onclick='menuFunction.divinvaliadata()' mark='ZWR'>重污染天气</label>" +
                "</label>");
            var label5=$("<label style='width:100%' id='diyvaliadataLabel'>" +
                "<label><input data-role='none' name='auditRadio' type='radio' onclick='menuFunction.checkDiyvaliadata()' mark='DIY'>自定义有效说明</label>" +
                "<label><input data-role='none' name='auditCheckBox' type='checkbox' id='diyvaliadataZKcheck'>[质控数据]</label>" +
                "<input style='width:100%' placeholder='为空则不修改' id='diyvaliadataInput'>" +
                "</label>");
            var label6=$("<label style='width:100%' id='diyinvaliadataLabel'>" +
                "<label><input data-role='none' name='auditRadio' type='radio' onclick='menuFunction.checkDiyinvaliadata()' mark='DIYNOT'>自定义无效说明</label>" +
                "<label><input data-role='none' name='auditCheckBox' type='checkbox' id='diyinvaliadataZKcheck'>[质控数据]</label>" +
                "<input style='width:100%' placeholder='为空则不修改' id='diyinvaliadataInput'>" +
                "</label>");
            body.append(label1);
            body.append(label2);
            body.append(label3);
            body.append(label4);
            body.append(label5);
            body.append(label6);
            tool.showTheAuditWorkAskDiv(title,body);
            menuFunction.divinvaliadata();
        }
    },
    confirmAudit:function(){
        var oldvalue=$("#auditEachWorkDataContent").attr("oldvalue");
        var oldmark=$("#auditEachWorkDataContent").attr("oldmark");
        var time=$("#auditEachWorkDataContent").attr("timepoint");
        var gas=$("#auditEachWorkDataContent").attr("gas");
        var newvalue=$("#auditNewValue").val();
        var isvaliabled=false;
        var newmark="";
        if(newvalue==""){
            newvalue=oldvalue;
        }
        if($("input[name='auditRadio']:checked").length!=0){
            if($("input[name='auditRadio']:checked").attr("mark")!="DIY" && $("input[name='auditRadio']:checked").attr("mark")!="DIYNOT"){
                newmark=$("input[name='auditRadio']:checked").attr("mark")+",RM";
            }else{
                if($("input[name='auditRadio']:checked").attr("mark")=="DIY"){
                    isvaliabled=true;
                    if($("#diyvaliadataInput").val()==""){
                        newmark=oldmark;
                        newvalue=oldvalue;
                    }else{
                        newmark=$("#diyvaliadataInput").val();
                        if($("#diyvaliadataZKcheck").prop("checked")){
                            newmark="【质控数据】"+newmark;
                        }
                    }
                }else{
                    isvaliabled=false;
                    if($("#diyinvaliadataInput").val()==""){
                        newmark=oldmark;
                        newvalue=oldvalue;
                    }else{
                        newmark=$("#diyinvaliadataInput").val()+",RM";
                        if($("#diyinvaliadataZKcheck").prop("checked")){
                            newmark="【质控数据】"+newmark;
                        }
                    }
                }
            }
        }else{
            newmark=oldmark;
        }
        var markarr=newmark.split(",");
        for(var i=0;i<markarr.length;i++){
            if(markarr[i]=="H" || markarr[i]=="RM"){
                isvaliabled=false;
            }
        }
        var postdata=[];
        var dataarr={};
        dataarr.stationcode=$("#auditStationListTitleName").attr("stationcode");
        dataarr.timepoint=time;
        dataarr.OldValue=oldvalue;
        dataarr.OldMark=oldmark;
        dataarr.GasType=gas;
        dataarr.NewValue=newvalue;
        dataarr.NewMark=newmark;
        dataarr.IsValidation=isvaliabled;
        postdata.push(dataarr);
        $("#ajaxPleaseWait").show();
        $.ajax({
            type:"post",
            url:localStorage.loginUrl+"/smartadmin/audit/update",
            dataType:'json',
            async:true,
            data:{"update": JSON.stringify(postdata)},
            error:function(){$("#ajaxPleaseWait").hide();
                tool.warningAlert("warAFailed","审核失败");
            },
            complete:function(XMLHttpRequest){
                $("#ajaxPleaseWait").hide();
                tool.warningAlert("warAFailed","审核成功");
                menuFunction.auditStationAuditListData($("#auditStationListTitleName").attr("stationcode"));
            }
        });
    },
    checkDiyvaliadata:function(){
        $("#diyinvaliadataLabel").find("label").addClass("disableInputAndLabel");
        $("#diyinvaliadataLabel").find("input[type='checkbox']").attr("disabled","disabled");
        $("#diyvaliadataLabel").find("label").removeClass("disableInputAndLabel");
        $("#diyvaliadataLabel").find("input[type='checkbox']").removeAttr("disabled","disabled");
    },
    checkDiyinvaliadata:function(){
        $("#diyvaliadataLabel").find("label").addClass("disableInputAndLabel");
        $("#diyvaliadataLabel").find("input[type='checkbox']").attr("disabled","disabled");
        $("#diyinvaliadataLabel").find("label").removeClass("disableInputAndLabel");
        $("#diyinvaliadataLabel").find("input[type='checkbox']").removeAttr("disabled","disabled");

    },
    divinvaliadata:function(){
        $("#diyvaliadataLabel").find("label").addClass("disableInputAndLabel");
        $("#diyvaliadataLabel").find("input[type='checkbox']").attr("disabled","disabled");
        $("#diyinvaliadataLabel").find("label").addClass("disableInputAndLabel");
        $("#diyinvaliadataLabel").find("input[type='checkbox']").attr("disabled","disabled");
    },
    filterAuditTable:function(){
        var allUnCheck=true;
        var gasArr=new Array();
        $("#filterContent").children("label").each(function(){
            if($(this).children("input[type='checkbox']").prop("checked")){
                allUnCheck=false;
                var gas=$(this).children("input[type='checkbox']").attr("gas");
                gasArr.push(gas);
            }
        });
        if(allUnCheck){
        }else{
            $(".tableSO2").hide();
            $(".tableNO2").hide();
            $(".tableCO").hide();
            $(".tableO3").hide();
            $(".tablePM10").hide();
            $(".tablePM2_5").hide();
            for(var i=0;i<gasArr.length;i++){
                $(".table"+gasArr[i]).show();
            }
        }
        $("#auditAskDiv").hide();
    },
    //预测预报页
    forePubPage_init:function(){
        var d = new Date();

        if (d.getHours() <= 16) {
            d.setDate(d.getDate() - 1);
            var today=new Date();
            var tomorrow=new Date((new Date()).setDate((new Date()).getDate()+1));
            var aftTomorrow=new Date((new Date()).setDate((new Date()).getDate()+2));
            
             var time1=new Date((new Date()).setDate((new Date()).getDate()+3));
             var time2=new Date((new Date()).setDate((new Date()).getDate()+4));
             var time3=new Date((new Date()).setDate((new Date()).getDate()+5));
             var time4=new Date((new Date()).setDate((new Date()).getDate()+6));
        }else{
            var today=new Date((new Date()).setDate((new Date()).getDate()+1));
            var tomorrow=new Date((new Date()).setDate((new Date()).getDate()+2));
            var aftTomorrow=new Date((new Date()).setDate((new Date()).getDate()+3));
            
            var time1=new Date((new Date()).setDate((new Date()).getDate()+4));
            var time2=new Date((new Date()).setDate((new Date()).getDate()+5));
            var time3=new Date((new Date()).setDate((new Date()).getDate()+6));
            var time4=new Date((new Date()).setDate((new Date()).getDate()+7));
        }

        var todayDate=(today.getMonth()+1)+"."+today.getDate();
        var tomororrowDate=(tomorrow.getMonth()+1)+"."+tomorrow.getDate();
        var aftTomorrowDate=(aftTomorrow.getMonth()+1)+"."+aftTomorrow.getDate();
        
        //加4天
        var day4=(time1.getMonth()+1)+"."+time1.getDate();
        var day5=(time2.getMonth()+1)+"."+time2.getDate();
        var day6=(time3.getMonth()+1)+"."+time3.getDate();
        var day7=(time4.getMonth()+1)+"."+time4.getDate();

        d.setHours(0);
        d.setMinutes(0);
        d.setSeconds(0);
        d.setMilliseconds(0);

        $("#forePubTimeChooseBar").children("div").eq(0).text(todayDate);
        $("#forePubTimeChooseBar").children("div").eq(1).text(tomororrowDate);
        $("#forePubTimeChooseBar").children("div").eq(2).text(aftTomorrowDate);
        //新加4天
        $("#forePubTimeChooseBar").children("div").eq(3).text(day4);
        $("#forePubTimeChooseBar").children("div").eq(4).text(day5);
        $("#forePubTimeChooseBar").children("div").eq(5).text(day6);
        $("#forePubTimeChooseBar").children("div").eq(6).text(day7);

        mapForecast = new BMap.Map("forePubPageMap");
        var pointIndex = new BMap.Point(104.46,29.84);
        mapForecast.centerAndZoom(pointIndex,7);
        mapForecast.disableDragging();
        mapForecast.disablePinchToZoom();
        mapForecast.disableDoubleClickZoom();
        var tablebodyheight=$("#login").outerHeight()-$("#forePubPage").children("div[data-role='header']").outerHeight()-300-$("#forePubTimeChooseBar").outerHeight()-$("#forePubPage").find(".footerMenuUl").outerHeight()-$("#forePubPageTableHead").outerHeight();
        $("#forePubPageTableBody").css("height",tablebodyheight+"px");
        console.log("tablebodyheight--->")
        console.log(tablebodyheight)
        $.ajax({
            type:"GET",
            url:provinceAjax+"/smartadmin/forecast/getCityAuditResult",
            dataType:'json',
            async:true,
            data:{"timePoint": d.getTime()},
            error:function(){$("#ajaxPleaseWait").hide();
                tool.warningAlert("warAFailed","获取城市信息失败");
            },
            complete:function(XMLHttpRequest){
                var data=eval("("+XMLHttpRequest.responseText+")");
                console.log(data)
                $("#forePubPageTableBody").data("forecastData",data.data.forecast);

                $("#forePubTimeChooseBar").children("div").unbind().click(function(){
                	//console.log("切换----<")
                    $(".forePubTimeChooseActive").removeClass("forePubTimeChooseActive");
                    $(this).addClass("forePubTimeChooseActive");
                    menuFunction.createCityForecastPubTable($(this).attr("dataType"));
                    menuFunction.forecastPubMapPoint($(this).attr("dataType"));
                });
                $("#forePubTimeChooseBar").children("div").eq(0).click();

                var timeArea=new Date();
                timeArea.setDate(timeArea.getDate()-1);
                timeArea.setHours(0);
                timeArea.setMinutes(0);
                timeArea.setSeconds(0);
                timeArea.setMilliseconds(0);
                timeArea=timeArea.getTime();
                $.getJSON("http://www.scnewair.cn:3389/smartadmin/forecast/showData2",{"timePoint":timeArea},function(data){
                    // $("#ajaxPleaseWait").hide();
                    if(data){
                        if(null!==data.data){
                            var content=(data.data.FORECASTRESULT).replace(/\n/g,"<br/>");
                            $("#forecastPubAreaDivContentBody").html(content);
                        }else{
                            $("#forecastPubAreaDivContentBody").html("本日暂无预报");
                        }
                    }
                    $("#forecastPageAreaButton").unbind().click(function(){
                        $("#forecastPubAreaDiv").show();
                        var marginTop=($("#login").outerHeight()-$("#forecastPubAreaDivContent").outerHeight())/2;
                        $("#forecastPubAreaDivContent").css("margin-top",marginTop);
                        $("#forecastPubAreaDivBack").unbind().click(function(){
                            $("#forecastPubAreaDiv").hide();
                        });
                        $("#forecastPubAreaDivContentHeadCloseButton").unbind().click(function(){
                            $("#forecastPubAreaDiv").hide();
                        });
                    });
                });
            }
        });
    },
    createCityForecastPubTable: function (dataType) {
        dataType=parseInt(dataType);
        var data=$("#forePubPageTableBody").data("forecastData");
        $("#forePubPageTableBody").html("");
        $.each(data, function (i, item) {
            var name = item.CITYNAME;
            item.PM2_5 = item.PM2_5 == null ? "—" : item.PM2_5;
            item.AQI = item.AQI == null ? "—" : item.AQI;
            item.QUALITY = item.QUALITY == null ? "—" : item.QUALITY;
            item.PRIMARYPOLLUTANT = item.PRIMARYPOLLUTANT == null ? "—" : item.PRIMARYPOLLUTANT;

            var PM2_5 = item.PM2_5_REAL.split("|")[dataType];
            var AQI = item.AQI.split("|")[dataType];
            var QUALITY = item.QUALITY.split("|")[dataType];
            var PRIMARYPOLLUTANT = item.PRIMARYPOLLUTANT.split("|")[dataType];
            QUALITY = QUALITY.replace(/优/g, "<span style='color:#6FC547'>优</span>").replace(/良/g, "<span style='color:#fdc61e'>良</span>")
                .replace(/轻度污染/g, "<span style='color:#FF7E00'>轻度污染</span>").replace(/中度污染/g, "<span style='color:#FF0000'>中度污染</span>")
                .replace(/重度污染/g, "<span style='color:#99004C'>重度污染</span>").replace(/严重污染/g, "<span style='color:#7E0023'>严重污染</span>");

            PRIMARYPOLLUTANT = PRIMARYPOLLUTANT.replace(/细颗粒物\(PM2.5\)/g, "<span style='color:#545454'>细颗粒物(PM<sub>2.5</sub>)</span>").replace(/臭氧8小时/g, "<span style='color:#545454'>臭氧8小时</span>")
                .replace(/二氧化硫/g, "<span style='color:#545454'>二氧化硫</span>").replace(/二氧化氮/g, "<span style='color:#545454'>二氧化氮</span>")
                .replace(/颗粒物\(PM10\)/g, "<span style='color:#545454'>颗粒物(PM<sub>10</sub>)</span>")
                .replace(/一氧化碳/g, "<span style='color:#545454'>一氧化碳</span>").replace(/无/g, "<span style='color:#545454'>无</span>");
            var divEach = $("<li class='forePubTableBodyTr'></li>");
            var td1 = $("<div>" + name.replace(/市/,"") + "</div>");
            var td3 = $("<div>" + AQI + "</div>");
            var td4 = $("<div>" + QUALITY + "</div>");
            var td5 = $("<div>" + PRIMARYPOLLUTANT + "</div>");
            divEach.append(td1);
            divEach.append(td3);
            divEach.append(td4);
            divEach.append(td5);
            $("#forePubPageTableBody").append(divEach);
        });
        var contentDiv=$("#forePubPageTableBody");
        clearInterval(scorll);
         scorll=setInterval(function(){
            $(".forePubTableBodyTr").eq(0).stop().animate(
                {
                    height : "0px",
                    opacity:"0"
                },"slow",function(){
                    console.log(scorll)
                    console.log(contentDiv)
                    $(this).appendTo(contentDiv);
                    $(this).removeAttr("style");
                }
            );
        },1300);

        console.log("scorll---")
        console.log(scorll)
       /* contentDiv.bind("touchend",function(){
            scorll=setInterval(function(){
                $(".tableContentItem").eq(0).stop().animate(
                    {
                        "padding":"0",
                        "height" : "0",
                        "opacity" : "0"
                    },"slow",function(){
                        $(this).appendTo(contentDiv);
                        $(this).removeAttr("style");
                    }
                );
            },1300);
        });*/
    },
    forecastPubMapPoint:function(dataType){
        mapForecast.clearOverlays();
        dataType=parseInt(dataType);
        var data=$("#forePubPageTableBody").data("forecastData");
        $.each(data,function(i,item){
            $.each(cityMapDetail,function(j,itemj){
                if(itemj.cityCode==item.CITYCODE){
                    var itemEach={};
                    itemEach.CITYCODE=item.CITYCODE;
                    itemEach.CITYNAME=item.CITYNAME;
                    itemEach.POINT=itemj.point;
                    var quality=item.QUALITY.split("|")[dataType];
                    if(quality.search("至")!=-1){
                        quality=quality.split("至");
                        itemEach.COLOR1=(tool.levelColorBack(quality[0])).replace(/color:/,"");
                        itemEach.COLOR2=(tool.levelColorBack(quality[1])).replace(/color:/,"");
                    }else if(quality.search("或")!=-1){
                        quality=quality.split("或");
                        itemEach.COLOR1=(tool.levelColorBack(quality[0])).replace(/color:/,"");
                        itemEach.COLOR2=(tool.levelColorBack(quality[1])).replace(/color:/,"");
                    }else{
                        itemEach.COLOR1=(tool.levelColorBack(quality)).replace(/color:/,"");
                        itemEach.COLOR2=(tool.levelColorBack(quality)).replace(/color:/,"");
                    }
                    // console.log(itemEach)
                    tool.mapForePubAddMark(mapForecast,itemEach);
                }
            });
        });
    },

    //数据统计页
    cityRankPage_init:function(){
        $("#cityRankPage .mainHeader").find("span").unbind().click(function(){
            $("#cityRankPage .mainHeader").find("span").removeClass("active");
            $(this).addClass("active");
            var type=$(this).attr("datatype");
            switch(type){
                case "air":
                    localStorage.ranktype="air";
                    sessionStorage.setItem('ranktype', 0);
                    menuFunction.airRank_init();
                    break;
                case "water":
                    localStorage.ranktype="water";
                    sessionStorage.setItem('ranktype', 1);
                    menuFunction.waterRank_init();
                    break;
            }
        });
        var typeChooseBarStatus = sessionStorage.getItem('ranktype')
        typeChooseBarStatus ? $("#cityRankPage .mainHeader").find("span").eq(typeChooseBarStatus).click() : $("#cityRankPage .mainHeader").find("span").eq(0).click();
    },
    airRank_init:function(){
        // $("#coding").show();
        // $("#dataStatistics_Content").hide();
        sessionStorage.setItem("href",window.location.href)
        $("#coding").hide();
        $("#dataStatistics_Content").show();
        $("#cityRankPage .outlierdataTable").unbind().click(function(){
            localStorage.ranktype=$(this).attr("type");
            $.mobile.changePage("#dataStatisticsDetailPage",{transition:"slide"});
        })
    },
    waterRank_init:function(){
        var a = undefined;
        $("#coding").show();
        $("#dataStatistics_Content").hide();
    },
    cityRankRealTable:function(){
        $("#ajaxPleaseWait").show();
        $.ajax({
            type: "GET",
            url: provinceAjax + "/publish/getAllCityRealTimeAQIASC",
            dataType: 'json',
            async: true,
            data: {},
            error: function () {
                $("#ajaxPleaseWait").hide();
                tool.warningAlert("warAFailed", "获取城市信息失败");
            },
            complete: function (XMLHttpRequest) {
                $("#ajaxPleaseWait").hide();
                var data = eval("(" + XMLHttpRequest.responseText + ")");
                $("#cityRank_ContentTime").html("<i class='iconNew-alertMessage' style='margin-right: 3px;'></i>"+tool.publishNotAuditTime(new Date(data.timePoint))+"(实时数据,尚未审核)");
                $("#cityRank_ContentTable").html("");
                $.each(data.data,function(i,item){
                    var dataeach=item.columns;
                    var div=$("<div class='cityRankTableTr' citycode='"+dataeach.CITYCODE+"'></div>");
                    if(i+1>=10){
                        var td1=$("<div class='cityRankTableTrNo numberFontFamily' style='padding-left:6px!important'>"+(i+1)+"</div>");
                        var td2=$("<div class='cityRankTableTrName' style='float:right;margin-right:4px'>"+dataeach.CITYNAME+"</div>");
                    }else{
                        var td1=$("<div class='cityRankTableTrNo numberFontFamily'>"+(i+1)+"</div>");
                        var td2=$("<div class='cityRankTableTrName' style='float:right'>"+dataeach.CITYNAME+"</div>");
                    }
                    var level=tool.levelReturn("AQI",dataeach.AQI);
                    var color=tool.levelColor(level);
                    var td3=$("<div class='cityRankTableTrValue numberFontFamily' style='float:right;color:"+color+"'>"+dataeach.AQI+"</div>");
                    var levelname="离线";
                    switch(level){
                        case "1":
                            levelname="优";
                            break;
                        case "2":
                            levelname="良";
                            break;
                        case "3":
                            levelname="轻度污染";
                            break;
                        case "4":
                            levelname="中度污染";
                            break;
                        case "5":
                            levelname="重度污染";
                            break;
                        case "6":
                            levelname="严重污染";
                            break;
                    }
                    var td4=$("<div class='cityRankTableTrLevel' style='float:right'><label style='background-color:"+color+"'>"+levelname+"</label></div>");
                    var td5=$("<div class='cityRankTableTrDetail' style='float:right'>详情></div>");
                    div.append(td1);
                    div.append(td5);
                    div.append(td4);
                    div.append(td3);
                    div.append(td2);
                    $("#cityRank_ContentTable").append(div);
                });
                $(".cityRankTableTr").unbind().click(function(){
                    var citycode=$(this).attr("citycode");
                    $.mobile.changePage("#cityPage?citycode="+citycode,{transition:"slide"});
                });
            }
        });
    },
    cityRankDayTable:function(){
        $("#ajaxPleaseWait").show();
        $.ajax({
            type: "GET",
            url: provinceAjax + "/publish/getAllCity24HoursAQIAVG",
            dataType: 'json',
            async: true,
            data: {},
            error: function () {
                $("#ajaxPleaseWait").hide();
                tool.warningAlert("warAFailed", "获取城市信息失败");
            },
            complete: function (XMLHttpRequest) {
                $("#ajaxPleaseWait").hide();
                var data = eval("(" + XMLHttpRequest.responseText + ")");
                $("#cityRank_ContentTime").html("<i class='iconNew-alertMessage' style='margin-right: 3px;'></i>数据更新时间:"+data[0].TIMEPOINT+"(实时数据,尚未审核)");
                $("#cityRank_ContentTable").html("");
                $.each(data,function(i,item){
                    var dataeach=item;
                    var div=$("<div class='cityRankTableTr' citycode='"+dataeach.CITYCODE+"'></div>");
                    var td1=$("<div class='cityRankTableTrNo numberFontFamily'>"+(i+1)+"</div>");
                    var td2=$("<div class='cityRankTableTrName' style='float:right'>"+dataeach.CITYNAME.replace(/市/,"")+"</div>");
                    var level=tool.levelReturn("AQI",dataeach.AQI_AVG);
                    var color=tool.levelColor(level);
                    var td3=$("<div class='cityRankTableTrValue numberFontFamily' style='float:right;color:"+color+"'>"+dataeach.AQI_AVG+"</div>");
                    var levelname="离线";
                    switch(level){
                        case "1":
                            levelname="优";
                            break;
                        case "2":
                            levelname="良";
                            break;
                        case "3":
                            levelname="轻度污染";
                            break;
                        case "4":
                            levelname="中度污染";
                            break;
                        case "5":
                            levelname="重度污染";
                            break;
                        case "6":
                            levelname="严重污染";
                            break;
                    }

                    var td4=$("<div class='cityRankTableTrLevel' style='float:right'><label style='background-color:"+color+"'>"+levelname+"</label></div>");
                    var td5=$("<div class='cityRankTableTrDetail' style='float:right'>详情></div>");
                    div.append(td1);
                    div.append(td5);
                    div.append(td4);
                    div.append(td3);
                    div.append(td2);
                    $("#cityRank_ContentTable").append(div);
                });
                $(".cityRankTableTr").unbind().click(function(){
                    var citycode=$(this).attr("citycode");
                    $.mobile.changePage("#cityPage?citycode="+citycode,{transition:"slide"});
                });
            }
        });
    },
    cityRankMonthTable:function(){
        $("#ajaxPleaseWait").show();
        $.ajax({
            type: "GET",
            url: provinceAjax + "/publish/getAllCity30DaysAQIAVG",
            dataType: 'json',
            async: true,
            data: {},
            error: function () {
                $("#ajaxPleaseWait").hide();
                tool.warningAlert("warAFailed", "获取城市信息失败");
            },
            complete: function (XMLHttpRequest) {
                $("#ajaxPleaseWait").hide();
                var data = eval("(" + XMLHttpRequest.responseText + ")");
                $("#cityRank_ContentTime").html("<i class='iconNew-alertMessage' style='margin-right: 3px;'></i>时间:"+data[0].TIMEPOINT+"(城市环境空气综合指数)");
                $("#cityRank_ContentTable").html("");
                $.each(data,function(i,item){
                    var dataeach=item;
                    var div=$("<div class='cityRankTableTr' citycode='"+dataeach.CITYCODE+"'></div>");
                    var td1=$("<div class='cityRankTableTrNo numberFontFamily'>"+(i+1)+"</div>");
                    var td2=$("<div class='cityRankTableTrName' style='float:right'>"+dataeach.CITYNAME+"</div>");
                    var color="";
                    var rank=dataeach.RANK;
                    var rankdetail="";
                    var arrow="";
                    if(rank==0){
                        color="#529DFA";
                        rankdetail="较上月持平";
                        arrow="iconNew-ping";
                    }else if(rank<0){
                        color="#E30000";
                        rankdetail="较上月降"+rank*(-1)+"名";
                        arrow="iconNew-down";
                    }else if(rank>0){
                        color="#6FC547";
                        rankdetail="较上月升"+rank+"名";
                        arrow="iconNew-up";
                    }
                    var td3=$("<div class='cityRankTableTrValue3' style='float:right;color:"+color+"'>"+dataeach.AQI_AVG+"</div>");
                    var td4=$("<div class='cityRankTableTrDetail3 numberFontFamily' style='float:right;color:"+color+"'><i class='"+arrow+"'></i></div>");
                    var td5=$("<div class='cityRankTableTrLevel3' style='float:right'><label style='background-color:"+color+"'>"+rankdetail+"</label></div>");
                    div.append(td1);
                    div.append(td5);
                    div.append(td4);
                    div.append(td3);
                    div.append(td2);
                    $("#cityRank_ContentTable").append(div);
                });
            }
        });
    },
    rankBar_Init:function(){
        $("#dataStatisticsDetailPage_content").css("margin-top","103px")
        $("#YMDChangeBar").children("div").unbind().click(function(){
            var type=$(this).attr("type");
            localStorage.rankYMD = type;
            $(".YMDActive").removeClass("YMDActive");
            $(this).addClass("YMDActive");
            switch(localStorage.rankYMD){
                case "day":
                    menuFunction.dayInput_init();
                    break;
                case "month":
                    menuFunction.monthInput_init();
                    break;
                case "year":
                    menuFunction.yearInput_init();
                    break;
                case "accumulate":
                    menuFunction.accumulateInput_init();
                    break;
            };
        });
        $("#YMDChangeBar").children("div").eq(0).click();
    },
    dataStatisticsDetailPage_init:function(){
       var ranktype = localStorage.ranktype;
       var title = "";
       // sessionStorage.setItem("isScrrenCross","0")//0默认不横屏 1横屏
       switch (ranktype){
           case "74citysRank":
               title="74城市排名";
               $("#YMDChangeBar").css("display","block");
               $("#AQIChangeBar").css("display","none");
               // sessionStorage.setItem("isScrrenCross","0")
               menuFunction.rankBar_Init();
               break;
           case "21citysRank":
               title="338城市排名";
               $("#YMDChangeBar").css("display","block");
               $("#AQIChangeBar").css("display","none");
               // sessionStorage.setItem("isScrrenCross","0")
               menuFunction.rankBar_Init();
               break;
           case "provinceRank":
               title="31省会城市排名";
               $("#YMDChangeBar").css("display","block");
               $("#AQIChangeBar").css("display","none");
               // sessionStorage.setItem("isScrrenCross","0")
               menuFunction.rankBar_Init();
               break;
           // case "west12Rank":
           //     title="四川在西部12省排名";
           //     break;
           case "concentrationRank":
               title="全省21市州排名";
               $("#YMDChangeBar").css("display","block");
               $("#AQIChangeBar").css("display","none");
               // sessionStorage.setItem("isScrrenCross","1")
               menuFunction.rankBar_Init();
               break;
           case "concentrationYoYRank":
               title="市州同比";
               // sessionStorage.setItem("isScrrenCross","0")
               menuFunction.MoM_init();
               break;
           case "airAbnormalCount":
               title="大气测管协同统计";
               // sessionStorage.setItem("isScrrenCross","0")
               menuFunction.airAbnormalCount_init();
               break;
       }
       $("#dataStatisticsDetailPage .headerTitle").html(title);
    },
    dayInput_init:function(){
        $("#dataStatisticsDetailPage_content").show();
        $("#abnormalCountPage_content").hide();
        $("#ajaxPleaseWait").show();
        $("#dataStatisticsDetailPage_content").html("");
        $("#dataStatisticsDetailPage_title").html("");
        var initPlaceholder = new Date().getFullYear()+'-'+ (new Date().getMonth()+1) + '-' + (new Date().getDate()-1);
        if(new Date().getDate()==1){
            var totalmonth = (new Date().getMonth()+1);
            var lastmonth = totalmonth - 1;
            if (lastmonth == 0){
                lastmonth=12;
            }
            switch (lastmonth)
            {
                case 1:
                    initPlaceholder = new Date().getFullYear() +'-'+ new Date().getMonth() + '-31'
                    console.log("大月");
                    break;
                case 3:
                    initPlaceholder = new Date().getFullYear() +'-'+ new Date().getMonth() + '-31'
                    console.log("大月");
                    break;
                case 5:
                    initPlaceholder = new Date().getFullYear() +'-'+ new Date().getMonth() + '-31'
                    console.log("大月");
                    break;
                case 7:
                    initPlaceholder = new Date().getFullYear() +'-'+ new Date().getMonth() + '-31'
                    console.log("大月");
                    break;
                case 8:
                    initPlaceholder = new Date().getFullYear() +'-'+ new Date().getMonth() + '-31'
                    console.log("大月");
                    break;
                case 10:
                    initPlaceholder = new Date().getFullYear() +'-'+ new Date().getMonth() + '-31'
                    console.log("大月");
                    break;
                case 12:
                    initPlaceholder = new Date().getFullYear() +'-'+ new Date().getMonth() + '-31'
                    console.log("大月");
                    break;
                case 4:
                    initPlaceholder = new Date().getFullYear() +'-'+ new Date().getMonth() + '-30'
                    console.log("小月");
                    break;
                case 6:
                    initPlaceholder = new Date().getFullYear() +'-'+ new Date().getMonth() + '-30'
                    console.log("小月");
                    break;
                case 9:
                    initPlaceholder = new Date().getFullYear() +'-'+ new Date().getMonth() + '-30'
                    console.log("小月");
                    break;
                case 11:
                    initPlaceholder = new Date().getFullYear() +'-'+ new Date().getMonth() + '-30'
                    console.log("小月");
                    break;
                case 2:
                    initPlaceholder = new Date().getFullYear() +'-'+ new Date().getMonth() + '-28'
                    console.log("二月")
                    break;
                default:
                    console.log("没有进入case");
                    break;
            }
        }
        // console.log("initPlaceholder",initPlaceholder)
        localStorage.order = "order";
        localStorage.day = initPlaceholder;
        var datediv = $("<input type='text' id='dateInput' name='dateInput' placeholder='"+initPlaceholder+"'/>")
        var promptdiv=$("<div style='margin-top: 34px'><span class='promptRight'>点击选择日期</span></div>")
        var rankTitle=$("<ul class='ranktitle'><li>排名</li><li>省份</li><li>城市</li><li id='avgRank'>综合指数<i class='icon-sort-up'></i></li><li>首要污染物</li></ul>")
        var ranktype = localStorage.ranktype;

        if(ranktype == 'concentrationRank'){
            rankTitle=$("<ul class='ranktitle21'><li>排名</li><li>城市</li><li>SO<sub>2</sub></li><li>NO<sub>2</sub></li><li>CO</li><li>O<sub>3</sub></li><li>PM<sub>10</sub></li><li>PM<sub>2.5</sub></li><li>优良率</li><li id='avgRank'>综合指数<i class='icon-sort-up'></i></li></ul>")
        }
        var ranktttt = $("<ul class='ranktitle'><li>AA</li><li>BB</li><li>CC</li></ul>")
        $("#dataStatisticsDetailPage_title").append(datediv)
        $("#dataStatisticsDetailPage_title").append(promptdiv)
        $("#dataStatisticsDetailPage_title").append(rankTitle)
        $("span.promptRight").css({"background":"#F4F4F4","border-top":"none","top":"81px"})
        var chooseday;
        var opt = {
            theme: "android-ics light",
            display: 'modal', //显示方式
            lang: "zh",
            cancelText: "取消",
            setText: '确定', //确认按钮名称
            dateFormat: 'yyyy-mm-dd', //返回结果格式化为年月格式
            dateOrder: 'yyyymmdd', //面板中日期排列格式
            minDate: new Date(2011,0,1),
            maxDate: new Date(),
            onBeforeShow: function (inst) {
                //  console.info( inst.settings.wheels);
            },
            headerText: function (valueText) { //自定义弹出框头部格式
                array = valueText.split('-');
                chooseday=valueText;
                return array[0] + "年" + array[1] + "月" + array[2] + "日";
            }
        };
        $("#avgRank").unbind().bind("click",function(){
            if(localStorage.order=='order'){
                localStorage.order='reverse'
                $(".icon-sort-up").removeClass("icon-sort-up").addClass("icon-sort-down")
            }else{
                localStorage.order='order'
                $(".icon-sort-down").removeClass("icon-sort-down").addClass("icon-sort-up")
            }
            menuFunction.dayRankDataAjax(chooseday);
        })
        $("#dateInput").mobiscroll().date(opt);
        menuFunction.dayRankDataAjax();
    },
    monthInput_init:function(){
        $("#ajaxPleaseWait").show();
        $("#dataStatisticsDetailPage_content").show();
        $("#abnormalCountPage_content").hide();
        $("#dataStatisticsDetailPage_content").html("");
        $("#dataStatisticsDetailPage_title").html("");

        var totalmonth = parseInt(new Date().getMonth());
        var initPlaceholder = new Date().getFullYear()+'-'+ (new Date().getMonth()+1);
        // if(totalmonth=='0'){
        //     var initPlaceholder = new Date().getFullYear() - 1 + '-12';
        // }else{
        //     var initPlaceholder = new Date().getFullYear()+'-'+ (new Date().getMonth()+1);
        // }

        localStorage.initmonth = initPlaceholder;
        localStorage.order = "order";
        localStorage.month = initPlaceholder.split("-")[0]+"-"+(parseInt(initPlaceholder.split("-")[1])+1)
        // if(initPlaceholder.split("-")[1]=="12"){
        //     localStorage.month = new Date().getFullYear() +'-01';
        // }

        var lastmonth;
        console.log(totalmonth)
        // totalmonth="0"?lastmonth="12":lastmonth=totalmonth;
        switch (totalmonth)
        {
            case 0:
                localStorage.month = new Date().getFullYear() +'-01-31'
                break;
            case 1:
                localStorage.month = new Date().getFullYear() +'-02-28'
                break;
            case 2:
                localStorage.month = new Date().getFullYear() +'-03-31'
                break;
            case 3:
                localStorage.month = new Date().getFullYear() +'-04-30'
                break;
            case 4:
                localStorage.month = new Date().getFullYear() +'-05-31'
                break;
            case 5:
                localStorage.month = new Date().getFullYear() +'-06-30'
                break;
            case 6:
                localStorage.month = new Date().getFullYear() +'-07-31'
                break;
            case 7:
                localStorage.month = new Date().getFullYear() +'-08-31'
                break;
            case 8:
                localStorage.month = new Date().getFullYear() +'-09-30'
                break;
            case 9:
                localStorage.month = new Date().getFullYear() +'-10-31'
                break;
            case 10:
                localStorage.month = new Date().getFullYear() +'-11-30'
                break;
            case 11:
                localStorage.month = new Date().getFullYear() +'-12-31'
                break;
            default:
                console.log("没有进入case");
                break;
        }
        var datediv = $("<input type='text' id='dateInput' name='dateInput' placeholder='"+initPlaceholder+"'/>")
        var promptdiv=$("<div style='margin-top: 34px'><span class='promptRight'>点击选择日期  </span></div>")
        var rankTitle=$("<ul class='ranktitle'><li>排名</li><li>省份</li><li>城市</li><li id='avgRank'>综合指数<i class='icon-sort-up'></i></li><li>首要污染物</li></ul>")
        var ranktype = localStorage.ranktype;
        if(ranktype == 'concentrationRank'){
            rankTitle=$("<ul class='ranktitle21'><li>排名</li><li>城市</li><li>SO<sub>2</sub></li><li>NO<sub>2</sub></li><li>CO</li><li>O<sub>3</sub></li><li>PM<sub>10</sub></li><li>PM<sub>2.5</sub></li><li>优良率</li><li id='avgRank'>综合指数<i class='icon-sort-up'></i></li></ul>")
        }
        $("#dataStatisticsDetailPage_title").append(datediv)
        $("#dataStatisticsDetailPage_title").append(promptdiv)
        $("#dataStatisticsDetailPage_title").append(rankTitle)
        $("span.promptRight").css({"background":"#F4F4F4","border-top":"none","top":"81px"})
        var choosemonth;
        var opt = {
            theme: "android-ics light",
            display: 'modal', //显示方式
            lang: "zh",
            cancelText: "取消",
            setText: '确定', //确认按钮名称
            dateFormat: 'yyyy-mm', //返回结果格式化为年月格式
            dateOrder: 'yyyymm', //面板中日期排列格式
            minDate: new Date(2011,0),
            maxDate: new Date(),
            onBeforeShow: function (inst) {
                //  console.info( inst.settings.wheels);
            },
            headerText: function (valueText) { //自定义弹出框头部格式
                array = valueText.split('-');
                choosemonth=valueText;
                return array[0] + "年" + array[1] + "月";
            }
        };
        $("#avgRank").unbind().bind("click",function(){
            if(localStorage.order=='order'){
                localStorage.order='reverse'
                $(".icon-sort-up").removeClass("icon-sort-up").addClass("icon-sort-down")
            }else{
                localStorage.order='order'
                $(".icon-sort-down").removeClass("icon-sort-down").addClass("icon-sort-up")
            }
            menuFunction.monthRankDataAjax(choosemonth);
        })
        $("#dateInput").mobiscroll().date(opt);
        menuFunction.monthRankDataAjax();
    },
    yearInput_init:function(){
        $("#ajaxPleaseWait").show();
        $("#dataStatisticsDetailPage_content").show();
        $("#abnormalCountPage_content").hide();
        $("#dataStatisticsDetailPage_content").html("");
        $("#dataStatisticsDetailPage_title").html("");
        var initPlaceholder = new Date().getFullYear()-1;
        localStorage.year = initPlaceholder;
        localStorage.order = "order";
        var datediv = $("<input type='text' id='dateInput' name='dateInput' placeholder='"+initPlaceholder+"'/>")
        var promptdiv=$("<div style='margin-top: 34px'><span class='promptRight'>点击选择年份  </span></div>")
        var rankTitle=$("<ul class='ranktitle'><li>排名</li><li>省份</li><li>城市</li><li id='avgRank'>综合指数<i class='icon-sort-up'></i></li><li>首要污染物</li></ul>")
        var ranktype = localStorage.ranktype;
        if(ranktype == 'concentrationRank'){
            rankTitle=$("<ul class='ranktitle21'><li>排名</li><li>城市</li><li>SO<sub>2</sub></li><li>NO<sub>2</sub></li><li>CO</li><li>O<sub>3</sub></li><li>PM<sub>10</sub></li><li>PM<sub>2.5</sub></li><li>优良率</li><li id='avgRank'>综合指数<i class='icon-sort-up'></i></li></ul>")
        }
        $("#dataStatisticsDetailPage_title").append(datediv)
        $("#dataStatisticsDetailPage_title").append(promptdiv)
        $("#dataStatisticsDetailPage_title").append(rankTitle)
        $("span.promptRight").css({"background":"#F4F4F4","border-top":"none","top":"81px"})
        var chooseyear;
        var opt = {
            theme: "android-ics light",
            display: 'modal', //显示方式
            lang: "zh",
            cancelText: "取消",
            setText: '确定', //确认按钮名称
            dateFormat: 'yyyy', //返回结果格式化为年月格式
            dateOrder: 'yyyy', //面板中日期排列格式
            startYear: new Date().getFullYear() - 10,
            endYear: new Date().getFullYear()-1,
            onBeforeShow: function (inst) {
                //  console.info( inst.settings.wheels);
            },
            headerText: function (valueText) { //自定义弹出框头部格式
                //  console.info(valueText);
                array = valueText.split('-');
                chooseyear=valueText;
                return array[0] + "年";
            }
        };
        $("#avgRank").unbind().bind("click",function(){
            if(localStorage.order=='order'){
                localStorage.order='reverse'
                $(".icon-sort-up").removeClass("icon-sort-up").addClass("icon-sort-down")
            }else{
                localStorage.order='order'
                $(".icon-sort-down").removeClass("icon-sort-down").addClass("icon-sort-up")
            }
            menuFunction.yearRankDataAjax(chooseyear);
        })
        $("#dateInput").mobiscroll().date(opt);
        menuFunction.yearRankDataAjax();
    },
    accumulateInput_init:function(){
        $("#ajaxPleaseWait").show();
        $("#dataStatisticsDetailPage_content").show();
        $("#abnormalCountPage_content").hide();
        $("#dataStatisticsDetailPage_content").html("");
        $("#dataStatisticsDetailPage_title").html("");
        var initPlaceholder = new Date().getFullYear()+'-'+ (new Date().getMonth()+1) + '-' + (new Date().getDate()-1);
        if(new Date().getDate()==1){
            var totalmonth = (new Date().getMonth()+1);
            var lastmonth = totalmonth - 1;
            if (lastmonth == 0){
                lastmonth=12;
            }
            switch (lastmonth)
            {
                case 1:
                    initPlaceholder = new Date().getFullYear() +'-'+ new Date().getMonth() + '-31'
                    break;
                case 3:
                    initPlaceholder = new Date().getFullYear() +'-'+ new Date().getMonth() + '-31'
                    break;
                case 5:
                    initPlaceholder = new Date().getFullYear() +'-'+ new Date().getMonth() + '-31'
                    break;
                case 7:
                    initPlaceholder = new Date().getFullYear() +'-'+ new Date().getMonth() + '-31'
                    break;
                case 8:
                    initPlaceholder = new Date().getFullYear() +'-'+ new Date().getMonth() + '-31'
                    break;
                case 10:
                    initPlaceholder = new Date().getFullYear() +'-'+ new Date().getMonth() + '-31'
                    break;
                case 12:
                    initPlaceholder = new Date().getFullYear() +'-'+ new Date().getMonth() + '-31'
                    break;
                case 4:
                    initPlaceholder = new Date().getFullYear() +'-'+ new Date().getMonth() + '-30'
                    break;
                case 6:
                    initPlaceholder = new Date().getFullYear() +'-'+ new Date().getMonth() + '-30'
                    break;
                case 9:
                    initPlaceholder = new Date().getFullYear() +'-'+ new Date().getMonth() + '-30'
                    break;
                case 11:
                    initPlaceholder = new Date().getFullYear() +'-'+ new Date().getMonth() + '-30'
                    break;
                case 2:
                    initPlaceholder = new Date().getFullYear() +'-'+ new Date().getMonth() + '-28'
                    break;
                default:
                    console.log("没有进入case");
                    break;
            }
        }
        localStorage.order = "order";
        localStorage.accumulate = initPlaceholder;
        var datePlaceholder =  new Date().getFullYear()+'-01-01';
        var datediv = $("<input type='text' id='dateInput' name='dateInput' placeholder='"+datePlaceholder+"'/>")
        var promptdiv=$("<div style='margin-top: 34px'><span class='promptRight'>点击选择日期  </span></div>")
        var rankTitle=$("<ul class='ranktitle'><li>排名</li><li>省份</li><li>城市</li><li id='avgRank'>综合指数<i class='icon-sort-up'></i></li><li>首要污染物</li></ul>")
        var ranktype = localStorage.ranktype;
        if(ranktype == 'concentrationRank'){
            rankTitle=$("<ul class='ranktitle21'><li>排名</li><li>城市</li><li>SO<sub>2</sub></li><li>NO<sub>2</sub></li><li>CO</li><li>O<sub>3</sub></li><li>PM<sub>10</sub></li><li>PM<sub>2.5</sub></li><li>优良率</li><li id='avgRank'>综合指数<i class='icon-sort-up'></i></li></ul>")
        }
        $("#dataStatisticsDetailPage_title").append(datediv)
        $("#dataStatisticsDetailPage_title").append(promptdiv)
        $("#dataStatisticsDetailPage_title").append(rankTitle)
        $("span.promptRight").css({"background":"#F4F4F4","border-top":"none","top":"81px"})
        var opt = {
            theme: "android-ics light",
            display: 'modal', //显示方式
            lang: "zh",
            cancelText: "取消",
            setText: '确定', //确认按钮名称
            dateFormat: 'yyyy-mm-dd', //返回结果格式化为年月格式
            dateOrder: 'yyyymmdd', //面板中日期排列格式
            minDate: new Date(2011,0,1),
            maxDate: new Date(),
            onBeforeShow: function (inst) {
                //  console.info( inst.settings.wheels);
            },
            headerText: function (valueText) { //自定义弹出框头部格式
                array = valueText.split('-');
                return array[0] + "年" + array[1] + "月" + array[2] + "日";
            }
        };
        $("#avgRank").unbind().bind("click",function(){
            if(localStorage.order=='order'){
                localStorage.order='reverse'
                $(".icon-sort-up").removeClass("icon-sort-up").addClass("icon-sort-down")
            }else{
                localStorage.order='order'
                $(".icon-sort-down").removeClass("icon-sort-down").addClass("icon-sort-up")
            }
            menuFunction.accumulateRankDataAjax();
        })
        $("#dateInput").mobiscroll().date(opt);
        menuFunction.accumulateRankDataAjax();
    },
    MoM_init:function(){
        $("#YMDChangeBar").css("display","none");
        $("#AQIChangeBar").css("display","block");
        $("#dataStatisticsDetailPage_content").show();
        $("#abnormalCountPage_content").hide();
        $("#dataStatisticsDetailPage_content").html("");
        $("#dataStatisticsDetailPage_title").html("");
        $("#dataStatisticsDetailPage_content").css("margin-top","139px")
        var initPlaceholder = new Date().getFullYear();
        var year = new Date().getFullYear();
        var day = (new Date().getDate()-1)<10?'.0'+(new Date().getDate()-1):"."+(new Date().getDate()-1);
        var month = (new Date().getMonth()+1)<10?'.0'+(new Date().getMonth()+1):"."+(new Date().getMonth()+1);
        var yesterday = year+month+day;
        if(day=="00"){
            var totalmonth = (new Date().getMonth()+1);
            var lastmonth = totalmonth - 1;
            if (lastmonth == 0){
                lastmonth=12;
            }
            switch (lastmonth)
            {
                case 1:
                    yesterday = new Date().getFullYear() +'.0'+ new Date().getMonth() + '.31'
                    break;
                case 3:
                    yesterday = new Date().getFullYear() +'.0'+ new Date().getMonth() + '.31'
                    break;
                case 5:
                    yesterday = new Date().getFullYear() +'.0'+ new Date().getMonth() + '.31'
                    break;
                case 7:
                    yesterday = new Date().getFullYear() +'.0'+ new Date().getMonth() + '.31'
                    break;
                case 8:
                    yesterday = new Date().getFullYear() +'.0'+ new Date().getMonth() + '.31'
                    break;
                case 10:
                    yesterday = new Date().getFullYear() +'.'+ new Date().getMonth() + '.31'
                    break;
                case 12:
                    yesterday = year + '.01.01';
                    break;
                case 4:
                    yesterday = new Date().getFullYear() +'.0'+ new Date().getMonth() + '.30'
                    break;
                case 6:
                    yesterday = new Date().getFullYear() +'.0'+ new Date().getMonth() + '.30'
                    break;
                case 9:
                    yesterday = new Date().getFullYear() +'.0'+ new Date().getMonth() + '.30'
                    break;
                case 11:
                    yesterday = new Date().getFullYear() +'.'+ new Date().getMonth() + '.30'
                    break;
                case 2:
                    yesterday = new Date().getFullYear() +'.0'+ new Date().getMonth() + '.28'
                    break;
                default:
                    console.log("没有进入case");
                    break;
            }
        }
        var initLastYear = parseInt(initPlaceholder)-1;
        var initBaseYear = parseInt(initPlaceholder)-2;
        localStorage.baseyear = initBaseYear;
        var datediv = $("<input type='text' id='dateInput1' name='dateInput' placeholder='"+initBaseYear+"'/>")
        var promptdiv=$("<div style='margin-top: 34px;background-color: #ffffff;'><span class='promptLeft'>基数年:</span><span class='promptRight'>&nbsp;</span></div>")
        var timeRemaindiv=$("<div class='timeRemain'>&nbsp;&nbsp;提示:当前时间段为"+initPlaceholder+".01.01----"+yesterday+"</div>")
        var rankTitle=$("<ul class='MoMranktitle'><li>城市</li><li>浓度</li><li>同比"+initLastYear+"</li><li id='baseyear'>同比"+localStorage.baseyear+"</li></ul>");
        $("#dataStatisticsDetailPage_title").append(datediv)
        $("#dataStatisticsDetailPage_title").append(promptdiv)
        $("#dataStatisticsDetailPage_title").append(timeRemaindiv)
        $("#dataStatisticsDetailPage_title").append(rankTitle)
        $("span.promptRight").css({"background-color":"#ffffff","border-top":"1px solid #B6B0B6!importanta","top":"81px"})
        var opt = {
            theme: "android-ics light",
            display: 'modal', //显示方式
            lang: "zh",
            cancelText: "取消",
            setText: '确定', //确认按钮名称
            dateFormat: 'yyyy', //返回结果格式化为年月格式
            dateOrder: 'yyyy', //面板中日期排列格式
            startYear: new Date().getFullYear() - 10,
            endYear: new Date().getFullYear(),
            onBeforeShow: function (inst) {
                //  console.info( inst.settings.wheels);
            },
            headerText: function (valueText) { //自定义弹出框头部格式
                array = valueText.split('-');
                localStorage.baseyear = valueText;
                return array[0] + "年";
            }
        };
        $("#dateInput1").mobiscroll().date(opt);

        $("#AQIChangeBar").children("div").unbind().click(function(){
            var type = $(this).attr("type");
            sessionStorage.setItem("rankAQI",type);
            $(".AQIActive").removeClass("AQIActive");
            $(this).addClass("AQIActive");
            var initBaseYear1 = parseInt(initPlaceholder)-2;
            $("#dateInput1").val(initBaseYear1);
            $("#baseyear").html("同比"+initBaseYear1)
            if(type=='fine'){
                $(".MoMranktitle li:nth-child(2)").html("优良率");
            }else{
                $(".MoMranktitle li:nth-child(2)").html("浓度");
            }
            menuFunction.MoMRankDataAjax();
        });
        $("#AQIChangeBar").children("div").eq(0).click();

        $("#dateInput1").bind("change",function(){
            $("#ajaxPleaseWait").show();
            var type = sessionStorage.getItem("rankAQI")
            var dateChoose = $(this).val();
            $("#dataStatisticsDetailPage_content").html("");
            $("#baseyear").html("同比"+dateChoose)
            $.ajax({
                url:myURL+'/statistic/beforeCompare',
                type:"POST",
                data:{
                    type:type,
                    baseTime:localStorage.baseyear,
                },
                async:true,
                error:function(err){
                    $("#dataStatisticsDetailPage").css("padding-top","47px");
                    $("#dataStatisticsDetailPage .ui-fixed-hidden").removeClass("ui-fixed-hidden")
                    $("#ajaxPleaseWait").hide();
                    console.log(err)
                },
                success:function(data){
                    $("#dataStatisticsDetailPage").css("padding-top","47px");
                    $("#dataStatisticsDetailPage .ui-fixed-hidden").removeClass("ui-fixed-hidden")
                    $("#ajaxPleaseWait").hide();
                    $("#dataStatisticsDetailPage_content").html("");
                    if(data==''){
                        var warningdiv = $("<div>"+localStorage.baseyear+"没有同比数据，请重新选择基数年加载数据</div>")
                        $("#dataStatisticsDetailPage_content").append(warningdiv);
                    }else{
                        if(type=='fine'){//市州同比优良率选项卡
                            $.map(data,function(v,k){
                                if(v.name == '全省'){
                                    var ranktablediv = $("<div class='MoMtable'><div>"+v.name+"</div>" +
                                        "<div>"+tool.toFixed(parseFloat(v.type)*100,1)+"%</div><div>"+tool.toFixed(parseFloat(v.same),1)+"%</div><div>"+tool.toFixed(parseFloat(v.base),1)+"%</div></div>")
                                    $("#dataStatisticsDetailPage_content").append(ranktablediv);
                                }
                            })
                            $.map(data,function(v,k){
                                if(v.name == '成都'){
                                    var ranktablediv = $("<div class='MoMtable'><div>"+v.name+"</div>" +
                                        "<div>"+tool.toFixed(parseFloat(v.type)*100,1)+"%</div><div>"+tool.toFixed(parseFloat(v.same),1)+"%</div><div>"+tool.toFixed(parseFloat(v.base),1)+"%</div></div>")
                                    $("#dataStatisticsDetailPage_content").append(ranktablediv);
                                }
                            })
                            $.map(data,function(v,k){
                                if(v.name !== '未达标城市' && v.name !== '全省' && v.name !== '成都' ){
                                    var ranktablediv = $("<div class='MoMtable'><div>"+v.name+"</div>" +
                                        "<div>"+tool.toFixed(parseFloat(v.type)*100,1)+"%</div><div>"+tool.toFixed(parseFloat(v.same),1)+"%</div><div>"+tool.toFixed(parseFloat(v.base),1)+"%</div></div>")
                                    $("#dataStatisticsDetailPage_content").append(ranktablediv);
                                }
                            })
                        }else{
                            $.map(data,function(v,k){
                                if(v.name == '全省'){
                                    var ranktablediv = $("<div class='MoMtable'><div>"+v.name+"</div>" +
                                        "<div>"+tool.toFixed(parseFloat(v.type),1)+"</div><div>"+tool.toFixed(parseFloat(v.same),1)+"%</div><div>"+tool.toFixed(parseFloat(v.base),1)+"%</div></div>")
                                    $("#dataStatisticsDetailPage_content").append(ranktablediv);
                                }
                            })
                            $.map(data,function(v,k){
                                if(v.name == '成都'){
                                    var ranktablediv = $("<div class='MoMtable'><div>"+v.name+"</div>" +
                                        "<div>"+tool.toFixed(parseFloat(v.type),1)+"</div><div>"+tool.toFixed(parseFloat(v.same),1)+"%</div><div>"+tool.toFixed(parseFloat(v.base),1)+"%</div></div>")
                                    $("#dataStatisticsDetailPage_content").append(ranktablediv);
                                }
                            })
                            $.map(data,function(v,k){
                                if(v.name !== '未达标城市' && v.name !== '全省' && v.name !== '成都' ){
                                    var ranktablediv = $("<div class='MoMtable'><div>"+v.name+"</div>" +
                                        "<div>"+tool.toFixed(parseFloat(v.type),1)+"</div><div>"+tool.toFixed(parseFloat(v.same),1)+"%</div><div>"+tool.toFixed(parseFloat(v.base),1)+"%</div></div>")
                                    $("#dataStatisticsDetailPage_content").append(ranktablediv);
                                }
                            })
                        }
                    }
                }
            })
        });
    },
    airAbnormalCount_init:function(){
        $("#YMDChangeBar").hide();
        $("#AQIChangeBar").hide();
        $("#dataStatisticsDetailPage_content").hide();
        $("#abnormalCountPage_content").show();
        $("#abnormalCountPage_content").html("");
        $("#dataStatisticsDetailPage_title").html("");
        var citylist=new Array();
        $.ajax({
            url:myURL+config.findCity,
            Type:'POST',
            data:{},
            async:false,
            error:function(err){
                console.log(err)
            },
            success:function(data){
                $.map(data,function(value,index){
                    citylist.push(value.CityName)
                })
            }
        })
        citylist.unshift("四川省")
        var areaBox = $("<ul id='areatree'style='display:none'></ul>")
        for (var i in citylist){
            areaBox.append("<li area='"+citylist[i].replace(/市/g,"")+"'>"+citylist[i]+"</li>")
        }
        var datediv = $("<input type='text' id='dateInput2' name='dateInput2' placeholder='时间起点'/><span>&nbsp;一&nbsp;&nbsp;</span>")
        var datediv2 = $("<input type='text' id='dateInput3' name='dateInput3' placeholder='时间终点'/>")
        var box1 = $("<div class='airtimeTitle'></div>")
        var box2 = $("<div class='areaSearch'></div>")
        var box3 = $("<div class='blueButton'><div>查询</div></div>")
        var rankTitle=$("<ul class='airAbnormalCountTitle' style='position:static'><li>城市</li><li>I级</li><li>II级</li><li>III级</li></ul>");
        var areaTitle=$("<div style='background-color: #ffffff; color:#B0B0B0; display: inline-block; padding: 5%;'><span>城市:</span></div>");
        var timeTitle=$("<div style=' display: inline-block;padding-right:5%'><span>时间:</span></div>")
        box1.append(timeTitle)
        box1.append(datediv)
        box1.append(datediv2)
        box2.append(areaTitle)
        box2.append(areaBox)
        $("#dataStatisticsDetailPage_title").append(box1)
        $("#dataStatisticsDetailPage_title").append(box2)
        $("#dataStatisticsDetailPage_title").append(box3)
        $("#dataStatisticsDetailPage_title").append(rankTitle)
        $("div.blueButton div").bind("click",function(){
            var startTime = $("#dateInput2").val()+" 00:00:00";
            var endTime = $("#dateInput3").val()+" 23:59:59";
            var area = $("#areatree_dummy").val().replace(/市/g,"");
            sessionStorage.setItem("area",$("#areatree_dummy").val())
            console.log("areaset",area)
            if(area=="四川省"){
                area = "all";
            }
            $.ajax({
                type:'POST',
                url:myURL+config.findAirCount,
                data:{
                    "startTime":startTime,
                    "endTime":endTime,
                    "city":area
                },
                error:function(err){
                    console.log(err)
                },
                success:function(data){
                    $("#abnormalCountPage_content").html("");
                    if(data==""){
                        var warningdiv = $("<div class='nodatawarning'>所选时间段没有数据，请重新选择日期加载统计</div>")
                        $("#abnormalCountPage_content").append(warningdiv);
                    }else{
                        $.map(data,function(v,k){
                            var ranktablediv = $("<div class='abnormalCountTable' area='"+v.AreaName+"' start='"+startTime+"' end='"+endTime+"'><div>"+v.AreaName+"</div>" +
                                "<div>"+v.I+"</div><div>"+v.II+"</div><div>"+v.III+"<span class='righticon'>>&emsp;</span></div></div>")
                            $("#abnormalCountPage_content").append(ranktablediv);
                        })
                        $("div.abnormalCountTable").unbind().bind("click",function(){
                            sessionStorage.setItem("subArea",$(this).attr("area"))
                            sessionStorage.setItem("subStart",$(this).attr("start"))
                            sessionStorage.setItem("subEnd",$(this).attr("end"))
                            menuFunction.abnarmalCountDetailPage_init();
                            $.mobile.changePage("#abnarmalCountDetailPage",{transition:"slide"})
                        })
                    }
                }
            })
        })
        var opt = {
            theme: "android-ics light",
            display: 'bottom', //显示方式
            lang: "zh",
            cancelText: "取消",
            setText: '确定', //确认按钮名称
            dateFormat: 'yyyy-mm-dd', //返回结果格式化为年月格式
            dateOrder: 'yyyymmdd', //面板中日期排列格式
            minDate: new Date(2011,0,1),
            maxDate: new Date(),
            onBeforeShow: function (inst) {
                //  console.info( inst.settings.wheels);
            },
            headerText: function (valueText) { //自定义弹出框头部格式
                array = valueText.split('-');
                return array[0] + "年" + array[1] + "月" + array[2] + "日";
            }
        };
        $("#dateInput2").mobiscroll().date(opt);
        var opt = {
            theme: "android-ics light",
            display: 'bottom', //显示方式
            lang: "zh",
            cancelText: "取消",
            setText: '确定', //确认按钮名称
            dateFormat: 'yyyy-mm-dd', //返回结果格式化为年月格式
            dateOrder: 'yyyymmdd', //面板中日期排列格式
            minDate: new Date(2011,0,1),
            maxDate: new Date(),
            onBeforeShow: function (inst) {
                //  console.info( inst.settings.wheels);
            },
            headerText: function (valueText) { //自定义弹出框头部格式
                array = valueText.split('-');
                return array[0] + "年" + array[1] + "月" + array[2] + "日";
            }
        };
        $("#dateInput3").mobiscroll().date(opt);
        var final;
        $(function(){
            $("#areatree").mobiscroll().treelist({
                theme: "android-ics light",
                lang: "zh",
                display:"bottom",
                placeholder: 'Please Select ...',
                cancelText: "取消",
                headerText: function ()
                {
                    return "选择地区";
                },
                formatResult: function (array) { //返回自定义格式结果
                    return final = $("#areatree>li").eq(array[0]).html()
                }
            });
            $("#areatree_dummy").val(final)
            $("div.blueButton div").css("opacity",'1');
        })
        var subhref = sessionStorage.getItem("href")
        //.substring(subhref.length-23,subhref.length)
        subhref.substring(subhref.length-23,subhref.length)
        var href = subhref.substring(subhref.length-23,subhref.length)
        if(href=="abnarmalCountDetailPage"){
            var area = sessionStorage.getItem("area")
            var subStart = sessionStorage.getItem("subStart")
            var subEnd = sessionStorage.getItem("subEnd")
            if(area&&subStart&&subEnd){
                $("#dateInput2").val(subStart.substring(0,10))
                $("#dateInput3").val(subEnd.substring(0,10))
                $("#areatree_dummy").val(area)
                var startTime = subStart+" 00:00:00";
                var endTime = subEnd+" 23:59:59";
                var area = sessionStorage.getItem("area").replace(/市/g,"");
                if(area=="四川省"){
                    area = "all";
                }
                $.ajax({
                    type:'POST',
                    url:myURL+config.findAirCount,
                    data:{
                        "startTime":startTime,
                        "endTime":endTime,
                        "city":area
                    },
                    error:function(err){
                        console.log(err)
                    },
                    success:function(data){
                        $("#abnormalCountPage_content").html("");
                        if(data==""){
                            var warningdiv = $("<div class='nodatawarning'>所选时间段没有数据，请重新选择日期加载统计</div>")
                            $("#abnormalCountPage_content").append(warningdiv);
                        }else{
                            $.map(data,function(v,k){
                                var ranktablediv = $("<div class='abnormalCountTable' area='"+v.AreaName+"' start='"+startTime+"' end='"+endTime+"'><div>"+v.AreaName+"</div>" +
                                    "<div>"+v.I+"</div><div>"+v.II+"</div><div>"+v.III+"<span class='righticon'>>&emsp;</span></div></div>")
                                $("#abnormalCountPage_content").append(ranktablediv);
                            })
                            $("div.abnormalCountTable").unbind().bind("click",function(){
                                sessionStorage.setItem("subStart",$(this).attr("start"))
                                sessionStorage.setItem("subEnd",$(this).attr("end"))
                                menuFunction.abnarmalCountDetailPage_init();
                                $.mobile.changePage("#abnarmalCountDetailPage",{transition:"slide"})
                            })
                        }
                    }
                })
            }
        }
    },
    abnarmalCountDetailPage_init:function(){
        $("#abnarmalCountDetailPage_title").html("");
        $("#abnarmalCountDetailPage_content").html("");
        var subArea = sessionStorage.getItem("subArea")
        var subStart = sessionStorage.getItem("subStart")
        var subEnd = sessionStorage.getItem("subEnd")
        sessionStorage.setItem("href",window.location.href)
        $("#abnarmalCountDetailPage .headerTitle").text(subArea+"测管协同统计详情")
        var title = $("<div class='abCountTitle'><div>时间</div><div>级别</div></div>")
        $("#abnarmalCountDetailPage_title").append(title)
        $.ajax({
            type:'POST',
            url:myURL+config.findAirCountDetail,
            data:{
                "startTime":subStart,
                "endTime":subEnd,
                "city":subArea
            },
            error:function(err){
                console.log(err)
            },
            success:function(data){
                $.map(data,function(v,k){
                    var table = $("<div class='outlierdataTable'></div>")
                    var timepoint = $("<div class='stationtimepoint'>"+v.TimePoint.substring(0,16)+"</div>")
                    var anLev = $("<div class='stationname'>"+v.type+"</div>")
                    table.append(timepoint)
                    table.append(anLev)
                    $("#abnarmalCountDetailPage_content").append(table)
                })
            }
        })
    },
    dayRankDataAjax:function(chooseday){
        var ranktype = localStorage.ranktype;
        var order = localStorage.order;
        var url;
        var inittype;
        if(ranktype == '74citysRank'){
            url = myURL+"/statistic/citylist";
            inittype='1';
        }else if(ranktype == '21citysRank'){
            url = myURL+"/statistic/allcitylist";
            inittype='1';
        }else if(ranktype == 'provinceRank'){
            url = myURL+"/statistic/allProvincelist";
            inittype='1';
        }else if(ranktype == 'west12Rank'){
            url = myURL+"/statistic/partProvincelist";
            inittype='1';
        }else if(ranktype == 'concentrationRank'){
            url = myURL+"/statistic/findFineOrder";
            inittype='2';
        }else if(ranktype == 'concentrationYoYRank'){
            url = myURL+"/statistic/beforeCompare";
            inittype='3';
        }
        if(chooseday!==""&&chooseday!==undefined){
            localStorage.day = chooseday;
        }
        $.ajax({
            url:url,
            type:"POST",
            data:{
                type:"day",
                startAt:localStorage.day+" 00:00:00",
                endAt:localStorage.day+" 23:59:59",
                order:order
            },
            async:true,
            error:function(err){
                $("#ajaxPleaseWait").hide();
                console.log(err)
            },
            success:function(data){
                $("#ajaxPleaseWait").hide();
                $("#dataStatisticsDetailPage_content").html("");
                if(data==""){
                    var warningdiv = $("<div class='nodatawarning'>"+localStorage.day+"没有数据，请重新选择日期加载排行</div>")
                    $("#dataStatisticsDetailPage_content").append(warningdiv);
                }else{
                    if(inittype=='1'){
                        $.map(data,function(v,k){
                            if(v.ProvinceName == '四川省'){
                                var pollution = tool.subDispose(v.Chiefly_Infectant)
                                var ranktablediv = $("<div class='outlierdataTable'><div>"+v.index+"</div>" +
                                    "<div>"+v.ProvinceName.replace(/省/,'')+"</div><div>"+v.CityName.replace(/市/,'')+"</div>" +
                                    "<div>"+v.count+"</div><div>"+pollution+"</div></div>")
                                $("#dataStatisticsDetailPage_content").append(ranktablediv);
                            }
                        })
                        $.map(data,function(v,k){
                            if(v.ProvinceName !== '四川省'){
                                var pollution = tool.subDispose(v.Chiefly_Infectant)
                                var ranktablediv = $("<div class='outlierdataTable'><div>"+v.index+"</div>" +
                                    "<div>"+v.ProvinceName.replace(/省/,'').replace(/壮族自治区/,"").replace(/维吾尔自治区/,"").replace(/回族自治区/,"").replace(/自治区/,"").replace(/市/,"")+"</div><div>"+v.CityName.replace(/市/,'')+"</div>" +
                                    "<div>"+v.count+"</div><div>"+pollution+"</div></div>")
                                $("#dataStatisticsDetailPage_content").append(ranktablediv);
                            }
                        })
                    }else if(inittype=='2'){
                        $.map(data,function(v,k){
                            if(v.CityName=="全省"){
                                var ranktablediv = $("<div class='rank21dataTable'><div>"+v.index+"</div>" +
                                    "<div>全省</div><div>"+tool.toFixed(v.SO2,1)+"</div>" +
                                    "<div>"+tool.toFixed(v.NO2,1)+"</div><div>"+tool.toFixed(v.CO,1)+"</div><div>"+tool.toFixed(v.O3_8,1)+"</div><div>"+tool.toFixed(v.PM10,1)+"</div>" +
                                    "<div>"+tool.toFixed(v.PM25,1)+"</div><div>"+parseFloat(v.rate*100).toFixed(1)+"%</div><div>"+tool.toFixed(v.count,2)+"</div></div>")
                                $("#dataStatisticsDetailPage_content").append(ranktablediv);
                            }
                        })
                        $.map(data,function(v,k){
                            if(v.CityName!=="全省") {
                                var ranktablediv = $("<div class='rank21dataTable'><div>"+v.index+"</div>" +
                                    "<div>"+v.CityName+"</div><div>"+tool.toFixed(v.SO2,1)+"</div>" +
                                    "<div>"+tool.toFixed(v.NO2,1)+"</div><div>"+tool.toFixed(v.CO,1)+"</div><div>"+tool.toFixed(v.O3_8,1)+"</div><div>"+tool.toFixed(v.PM10,1)+"</div>" +
                                    "<div>"+tool.toFixed(v.PM25,1)+"</div><div>"+parseFloat(v.rate*100).toFixed(1)+"%</div><div>"+tool.toFixed(v.count,2)+"</div></div>")
                                $("#dataStatisticsDetailPage_content").append(ranktablediv);
                            }
                        })
                    }
                }
            }
        })
        $("#dateInput").bind("change",function(event){
            $("#ajaxPleaseWait").show();
            var dateChoose = $(this).val();
            $.ajax({
                url:url,
                type:"POST",
                data:{
                    type:"day",
                    startAt:dateChoose+" 00:00:00",
                    endAt:dateChoose+" 23:59:59",
                    order:order,
                },
                async:true,
                error:function(err){
                    $("#dataStatisticsDetailPage").css("padding-top","47px");
                    $("#dataStatisticsDetailPage .ui-fixed-hidden").removeClass("ui-fixed-hidden")
                    $("#ajaxPleaseWait").hide();
                    console.log(err)
                },
                success:function(data){
                    console.log("改变值")
                    console.log(dateChoose+" 00:00:00")
                    console.log(dateChoose+" 23:59:59")
                    $("#dataStatisticsDetailPage").css("padding-top","47px");
                    $("#dataStatisticsDetailPage .ui-fixed-hidden").removeClass("ui-fixed-hidden")
                    $("#ajaxPleaseWait").hide();
                    $("#dataStatisticsDetailPage_content").html("");
                    if(data==""){
                        var warningdiv = $("<div class='nodatawarning'>"+dateChoose+"没有数据，请重新选择日期加载排行</div>")
                        $("#dataStatisticsDetailPage_content").append(warningdiv);
                    }else{
                        if(inittype=='1'){
                            $.map(data,function(v,k){
                                if(v.ProvinceName == '四川省'){
                                    var pollution = tool.subDispose(v.Chiefly_Infectant)
                                    var ranktablediv = $("<div class='outlierdataTable'><div>"+v.index+"</div>" +
                                        "<div>"+v.ProvinceName.replace(/省/,'')+"</div><div>"+v.CityName.replace(/市/,'')+"</div>" +
                                        "<div>"+v.count+"</div><div>"+pollution+"</div></div>")
                                    $("#dataStatisticsDetailPage_content").append(ranktablediv);
                                }
                            })
                            $.map(data,function(v,k){
                                if(v.ProvinceName !== '四川省'){
                                    var pollution = tool.subDispose(v.Chiefly_Infectant)
                                    var ranktablediv = $("<div class='outlierdataTable'><div>"+v.index+"</div>" +
                                        "<div>"+v.ProvinceName.replace(/省/,'').replace(/壮族自治区/,"").replace(/维吾尔自治区/,"").replace(/回族自治区/,"").replace(/自治区/,"").replace(/市/,"")+"</div><div>"+v.CityName.replace(/市/,'')+"</div>" +
                                        "<div>"+v.count+"</div><div>"+pollution+"</div></div>")
                                    $("#dataStatisticsDetailPage_content").append(ranktablediv);
                                }
                            })
                        }else if(inittype=='2'){
                            $.map(data,function(v,k){
                                if(v.CityName=="全省"){
                                    var ranktablediv = $("<div class='rank21dataTable'><div>"+v.index+"</div>" +
                                        "<div>全省</div><div>"+tool.toFixed(v.SO2,1)+"</div>" +
                                        "<div>"+tool.toFixed(v.NO2,1)+"</div><div>"+tool.toFixed(v.CO,1)+"</div><div>"+tool.toFixed(v.O3_8,1)+"</div><div>"+tool.toFixed(v.PM10,1)+"</div>" +
                                        "<div>"+tool.toFixed(v.PM25,1)+"</div><div>"+parseFloat(v.rate*100).toFixed(1)+"%</div><div>"+tool.toFixed(v.count,2)+"</div></div>")
                                    $("#dataStatisticsDetailPage_content").append(ranktablediv);
                                }
                            })
                            $.map(data,function(v,k){
                                if(v.CityName!=="全省") {
                                    var ranktablediv = $("<div class='rank21dataTable'><div>"+v.index+"</div>" +
                                        "<div>"+v.CityName+"</div><div>"+tool.toFixed(v.SO2,1)+"</div>" +
                                        "<div>"+tool.toFixed(v.NO2,1)+"</div><div>"+tool.toFixed(v.CO,1)+"</div><div>"+tool.toFixed(v.O3_8,1)+"</div><div>"+tool.toFixed(v.PM10,1)+"</div>" +
                                        "<div>"+tool.toFixed(v.PM25,1)+"</div><div>"+parseFloat(v.rate*100).toFixed(1)+"%</div><div>"+tool.toFixed(v.count,2)+"</div></div>")
                                    $("#dataStatisticsDetailPage_content").append(ranktablediv);
                                }
                            })
                        }
                    }
                }
            })
        });
    },
    monthRankDataAjax:function(choosemonth){
        var ranktype = localStorage.ranktype;
        var url;
        var inittype;
        if(ranktype == '74citysRank'){
            url = myURL+"/statistic/citylist";
            inittype='1';
        }else if(ranktype == '21citysRank'){
            url = myURL+"/statistic/allcitylist";
            inittype='1';
        }else if(ranktype == 'provinceRank'){
            url = myURL+"/statistic/allProvincelist";
            inittype='1';
        }else if(ranktype == 'west12Rank'){
            url = myURL+"/statistic/partProvincelist";
            inittype='1';
        }else if(ranktype == 'concentrationRank'){
            url = myURL+"/statistic/findFineOrder";
            inittype='2';
        }else if(ranktype == 'concentrationYoYRank'){
            url = myURL+"/statistic/beforeCompare";
            inittype='3';
        }
        $.ajax({
            url:url,
            type:"POST",
            data:{
                type:"month",
                startAt:localStorage.initmonth+"-01 00:00:00",
                endAt:localStorage.month+" 23:59:59",
                order:localStorage.order,
            },
            async:true,
            error:function(err){
                $("#ajaxPleaseWait").hide();
                console.log(err)
            },
            success:function(data){
                // console.log(localStorage.initmonth+"-01 00:00:00")
                // console.log(localStorage.month+" 23:59:59")
                $("#ajaxPleaseWait").hide();
                $("#dataStatisticsDetailPage_content").html("");
                if(data==""){
                    var warningdiv = $("<div class='nodatawarning'>"+localStorage.initmonth+"月没有数据，请重新选择日期加载排行</div>")
                    $("#dataStatisticsDetailPage_content").append(warningdiv);
                }else{
                    if(inittype=='1'){
                        $.map(data,function(v,k){
                            if(v.ProvinceName == '四川省'){
                                var pollution = tool.subDispose(v.Chiefly_Infectant)
                                var ranktablediv = $("<div class='outlierdataTable'><div>"+v.index+"</div>" +
                                    "<div>"+v.ProvinceName.replace(/省/,'')+"</div><div>"+v.CityName.replace(/市/,'')+"</div>" +
                                    "<div>"+v.count+"</div><div>"+pollution+"</div></div>")
                                $("#dataStatisticsDetailPage_content").append(ranktablediv);
                            }
                        })
                        $.map(data,function(v,k){
                            if(v.ProvinceName !== '四川省'){
                                var pollution = tool.subDispose(v.Chiefly_Infectant)
                                var ranktablediv = $("<div class='outlierdataTable'><div>"+v.index+"</div>" +
                                    "<div>"+v.ProvinceName.replace(/省/,'').replace(/壮族自治区/,"").replace(/维吾尔自治区/,"").replace(/回族自治区/,"").replace(/自治区/,"").replace(/市/,"")+"</div><div>"+v.CityName.replace(/市/,'')+"</div>" +
                                    "<div>"+v.count+"</div><div>"+pollution+"</div></div>")
                                $("#dataStatisticsDetailPage_content").append(ranktablediv);
                            }
                        })
                    }else if(inittype=='2'){
                        $.map(data,function(v,k){
                            if(v.CityName=="全省"){
                                var ranktablediv = $("<div class='rank21dataTable'><div>"+v.index+"</div>" +
                                    "<div>全省</div><div>"+tool.toFixed(v.SO2,1)+"</div>" +
                                    "<div>"+tool.toFixed(v.NO2,1)+"</div><div>"+tool.toFixed(v.CO,1)+"</div><div>"+tool.toFixed(v.O3_8,1)+"</div><div>"+tool.toFixed(v.PM10,1)+"</div>" +
                                    "<div>"+tool.toFixed(v.PM25,1)+"</div><div>"+parseFloat(v.rate*100).toFixed(1)+"%</div><div>"+tool.toFixed(v.count,2)+"</div></div>")
                                $("#dataStatisticsDetailPage_content").append(ranktablediv);
                            }
                        })
                        $.map(data,function(v,k){
                            if(v.CityName!=="全省") {
                                var ranktablediv = $("<div class='rank21dataTable'><div>"+v.index+"</div>" +
                                    "<div>"+v.CityName+"</div><div>"+tool.toFixed(v.SO2,1)+"</div>" +
                                    "<div>"+tool.toFixed(v.NO2,1)+"</div><div>"+tool.toFixed(v.CO,1)+"</div><div>"+tool.toFixed(v.O3_8,1)+"</div><div>"+tool.toFixed(v.PM10,1)+"</div>" +
                                    "<div>"+tool.toFixed(v.PM25,1)+"</div><div>"+parseFloat(v.rate*100).toFixed(1)+"%</div><div>"+tool.toFixed(v.count,2)+"</div></div>")
                                $("#dataStatisticsDetailPage_content").append(ranktablediv);
                            }
                        })
                    }
                }
            }
        })
        $("#dateInput").bind("change",function(event){
            $("#ajaxPleaseWait").show();
            var dateChoose = $(this).val();
            // var enddataChoose = $(this).val().split("-")[0]+"-" + (parseInt($(this).val().split("-")[1])+1)
            var chooseyear = $(this).val().split("-")[0];
            var totalmonth = parseInt($(this).val().split("-")[1]);
            var enddataChoose;
            switch (totalmonth)
            {
                case 1:
                    enddataChoose = chooseyear +'-01-31'
                    break;
                case 3:
                    enddataChoose = chooseyear +'-03-31'
                    break;
                case 5:
                    enddataChoose = chooseyear +'-05-31'
                    break;
                case 7:
                    enddataChoose = chooseyear +'-07-31'
                    break;
                case 8:
                    enddataChoose = chooseyear +'-08-31'
                    break;
                case 10:
                    enddataChoose = chooseyear +'-10-31'
                    break;
                case 12:
                    enddataChoose = chooseyear +'-12-31'
                    break;
                case 4:
                    enddataChoose = chooseyear +'-04-30'
                    break;
                case 6:
                    enddataChoose = chooseyear +'-06-30'
                    break;
                case 9:
                    enddataChoose = chooseyear +'-09-30'
                    break;
                case 11:
                    enddataChoose = chooseyear +'-11-30'
                    break;
                case 2:
                    enddataChoose = chooseyear +'-02-28'
                    break;
                default:
                    console.log("没有进入case");
                    break;
            }
            localStorage.initmonth=dateChoose;
            // if($(this).val().split("-")[1]=="12"){
            //     enddataChoose =(parseInt($(this).val().split("-")[0])+1)+"-01"
            // }
            localStorage.month=enddataChoose;
            $.ajax({
                url:url,
                type:"POST",
                data:{
                    type:"month",
                    startAt:dateChoose+"-01 00:00:00",
                    endAt:enddataChoose+" 23:59:59",
                    order:"order",
                },
                async:true,
                error:function(err){
                    $("#dataStatisticsDetailPage").css("padding-top","47px");
                    $("#dataStatisticsDetailPage .ui-fixed-hidden").removeClass("ui-fixed-hidden")
                    $("#ajaxPleaseWait").hide();
                    console.log(err)
                },
                success:function(data){
                    console.log("改变值")
                    console.log(dateChoose+"-01 00:00:00")
                    console.log(enddataChoose+" 23:59:59")
                    $("#dataStatisticsDetailPage").css("padding-top","47px");
                    $("#dataStatisticsDetailPage .ui-fixed-hidden").removeClass("ui-fixed-hidden")
                    $("#ajaxPleaseWait").hide();
                    $("#dataStatisticsDetailPage_content").html("");
                    if(data==""){
                        var warningdiv = $("<div class='nodatawarning'>"+localStorage.initmonth+"没有数据，请重新选择日期加载排行</div>")
                        $("#dataStatisticsDetailPage_content").append(warningdiv);
                    }else{
                        if(inittype=='1'){
                            $.map(data,function(v,k){
                                if(v.ProvinceName == '四川省'){
                                    var pollution = tool.subDispose(v.Chiefly_Infectant)
                                    var ranktablediv = $("<div class='outlierdataTable'><div>"+v.index+"</div>" +
                                        "<div>"+v.ProvinceName.replace(/省/,'')+"</div><div>"+v.CityName.replace(/市/,'')+"</div>" +
                                        "<div>"+v.count+"</div><div>"+pollution+"</div></div>")
                                    $("#dataStatisticsDetailPage_content").append(ranktablediv);
                                }
                            })
                            $.map(data,function(v,k){
                                if(v.ProvinceName !== '四川省'){
                                    var pollution = tool.subDispose(v.Chiefly_Infectant)
                                    var ranktablediv = $("<div class='outlierdataTable'><div>"+v.index+"</div>" +
                                        "<div>"+v.ProvinceName.replace(/省/,'').replace(/壮族自治区/,"").replace(/维吾尔自治区/,"").replace(/回族自治区/,"").replace(/自治区/,"").replace(/市/,"")+"</div><div>"+v.CityName.replace(/市/,'')+"</div>" +
                                        "<div>"+v.count+"</div><div>"+pollution+"</div></div>")
                                    $("#dataStatisticsDetailPage_content").append(ranktablediv);
                                }
                            })
                        }else if(inittype=='2'){
                            $.map(data,function(v,k){
                                if(v.CityName=="全省"){
                                    var ranktablediv = $("<div class='rank21dataTable'><div>"+v.index+"</div>" +
                                        "<div>全省</div><div>"+tool.toFixed(v.SO2,1)+"</div>" +
                                        "<div>"+tool.toFixed(v.NO2,1)+"</div><div>"+tool.toFixed(v.CO,1)+"</div><div>"+tool.toFixed(v.O3_8,1)+"</div><div>"+tool.toFixed(v.PM10,1)+"</div>" +
                                        "<div>"+tool.toFixed(v.PM25,1)+"</div><div>"+parseFloat(v.rate*100).toFixed(1)+"%</div><div>"+tool.toFixed(v.count,2)+"</div></div>")
                                    $("#dataStatisticsDetailPage_content").append(ranktablediv);
                                }
                            })
                            $.map(data,function(v,k){
                                if(v.CityName!=="全省") {
                                    var ranktablediv = $("<div class='rank21dataTable'><div>"+v.index+"</div>" +
                                        "<div>"+v.CityName+"</div><div>"+tool.toFixed(v.SO2,1)+"</div>" +
                                        "<div>"+tool.toFixed(v.NO2,1)+"</div><div>"+tool.toFixed(v.CO,1)+"</div><div>"+tool.toFixed(v.O3_8,1)+"</div><div>"+tool.toFixed(v.PM10,1)+"</div>" +
                                        "<div>"+tool.toFixed(v.PM25,1)+"</div><div>"+parseFloat(v.rate*100).toFixed(1)+"%</div><div>"+tool.toFixed(v.count,2)+"</div></div>")
                                    $("#dataStatisticsDetailPage_content").append(ranktablediv);
                                }
                            })
                        }
                    }
                }
            })
        });
    },
    yearRankDataAjax:function(){
        var ranktype = localStorage.ranktype;
        var url;
        var inittype;
        if(ranktype == '74citysRank'){
            url = myURL+"/statistic/citylist";
            inittype='1';
        }else if(ranktype == '21citysRank'){
            url = myURL+"/statistic/allcitylist";
            inittype='1';
        }else if(ranktype == 'provinceRank'){
            url = myURL+"/statistic/allProvincelist";
            inittype='1';
        }else if(ranktype == 'west12Rank'){
            url = myURL+"/statistic/partProvincelist";
            inittype='1';
        }else if(ranktype == 'concentrationRank'){
            url = myURL+"/statistic/findFineOrder";
            inittype='2';
        }else if(ranktype == 'concentrationYoYRank'){
            url = myURL+"/statistic/beforeCompare";
            inittype='3';
        }
        $.ajax({
            url:url,
            type:"POST",
            data:{
                type:"year",
                startAt:localStorage.year+"-01-01 00:00:00",
                endAt:localStorage.year+"-12-31 23:59:59",
                order:localStorage.order,
            },
            async:true,
            error:function(err){
                $("#ajaxPleaseWait").hide();
                console.log(err)
            },
            success:function(data){
                // console.log(localStorage.year+"-01-01 00:00:00")
                // console.log(localStorage.year+"-12-31 23:59:59")
                $("#ajaxPleaseWait").hide();
                $("#dataStatisticsDetailPage_content").html("");
                if(data==""){
                    var warningdiv = $("<div class='nodatawarning'>"+localStorage.year+"年没有数据，请重新选择日期加载排行</div>")
                    $("#dataStatisticsDetailPage_content").append(warningdiv);
                }else{
                    if(inittype=='1'){
                        $.map(data,function(v,k){
                            if(v.ProvinceName == '四川省'){
                                var pollution = tool.subDispose(v.Chiefly_Infectant)
                                var ranktablediv = $("<div class='outlierdataTable'><div>"+v.index+"</div>" +
                                    "<div>"+v.ProvinceName.replace(/省/,'')+"</div><div>"+v.CityName.replace(/市/,'')+"</div>" +
                                    "<div>"+v.count+"</div><div>"+pollution+"</div></div>")
                                $("#dataStatisticsDetailPage_content").append(ranktablediv);
                            }
                        })
                        $.map(data,function(v,k){
                            if(v.ProvinceName !== '四川省'){
                                var pollution = tool.subDispose(v.Chiefly_Infectant)
                                var ranktablediv = $("<div class='outlierdataTable'><div>"+v.index+"</div>" +
                                    "<div>"+v.ProvinceName.replace(/省/,'').replace(/壮族自治区/,"").replace(/维吾尔自治区/,"").replace(/回族自治区/,"").replace(/自治区/,"").replace(/市/,"")+"</div><div>"+v.CityName.replace(/市/,'')+"</div>" +
                                    "<div>"+v.count+"</div><div>"+pollution+"</div></div>")
                                $("#dataStatisticsDetailPage_content").append(ranktablediv);
                            }
                        })
                    }else if(inittype=='2'){
                        $.map(data,function(v,k){
                            if(v.CityName=="全省"){
                                var ranktablediv = $("<div class='rank21dataTable'><div>"+v.index+"</div>" +
                                    "<div>全省</div><div>"+tool.toFixed(v.SO2,1)+"</div>" +
                                    "<div>"+tool.toFixed(v.NO2,1)+"</div><div>"+tool.toFixed(v.CO,1)+"</div><div>"+tool.toFixed(v.O3_8,1)+"</div><div>"+tool.toFixed(v.PM10,1)+"</div>" +
                                    "<div>"+tool.toFixed(v.PM25,1)+"</div><div>"+parseFloat(v.rate*100).toFixed(1)+"%</div><div>"+tool.toFixed(v.count,2)+"</div></div>")
                                $("#dataStatisticsDetailPage_content").append(ranktablediv);
                            }
                        })
                        $.map(data,function(v,k){
                            if(v.CityName!=="全省") {
                                var ranktablediv = $("<div class='rank21dataTable'><div>"+v.index+"</div>" +
                                    "<div>"+v.CityName+"</div><div>"+tool.toFixed(v.SO2,1)+"</div>" +
                                    "<div>"+tool.toFixed(v.NO2,1)+"</div><div>"+tool.toFixed(v.CO,1)+"</div><div>"+tool.toFixed(v.O3_8,1)+"</div><div>"+tool.toFixed(v.PM10,1)+"</div>" +
                                    "<div>"+tool.toFixed(v.PM25,1)+"</div><div>"+parseFloat(v.rate*100).toFixed(1)+"%</div><div>"+tool.toFixed(v.count,2)+"</div></div>")
                                $("#dataStatisticsDetailPage_content").append(ranktablediv);
                            }
                        })
                    }
                }
            }
        })
        $("#dateInput").bind("change",function(event){
            $("#ajaxPleaseWait").show();
            var dateChoose = $(this).val();
            $.ajax({
                url:url,
                type:"POST",
                data:{
                    type:"year",
                    startAt:dateChoose+"-01-01 00:00:00",
                    endAt:dateChoose+"-12-31 23:59:59",
                    order:localStorage.order,
                },
                async:true,
                error:function(err){
                    $("#dataStatisticsDetailPage").css("padding-top","47px");
                    $("#dataStatisticsDetailPage .ui-fixed-hidden").removeClass("ui-fixed-hidden")
                    $("#ajaxPleaseWait").hide();
                    console.log(err)
                },
                success:function(data){
                    $("#dataStatisticsDetailPage").css("padding-top","47px");
                    $("#dataStatisticsDetailPage .ui-fixed-hidden").removeClass("ui-fixed-hidden")
                    $("#ajaxPleaseWait").hide();
                    $("#dataStatisticsDetailPage_content").html("");
                    if(data==""){
                        var warningdiv = $("<div>"+localStorage.year+"年没有数据，请重新选择日期加载数据</div>")
                        $("#dataStatisticsDetailPage_content").append(warningdiv);
                    }else{
                        if(inittype=='1'){
                            $.map(data,function(v,k){
                                if(v.ProvinceName == '四川省'){
                                    var pollution = tool.subDispose(v.Chiefly_Infectant)
                                    var ranktablediv = $("<div class='outlierdataTable'><div>"+v.index+"</div>" +
                                        "<div>"+v.ProvinceName.replace(/省/,'')+"</div><div>"+v.CityName.replace(/市/,'')+"</div>" +
                                        "<div>"+v.count+"</div><div>"+pollution+"</div></div>")
                                    $("#dataStatisticsDetailPage_content").append(ranktablediv);
                                }
                            })
                            $.map(data,function(v,k){
                                if(v.ProvinceName !== '四川省'){
                                    var pollution = tool.subDispose(v.Chiefly_Infectant)
                                    var ranktablediv = $("<div class='outlierdataTable'><div>"+v.index+"</div>" +
                                        "<div>"+v.ProvinceName.replace(/省/,'').replace(/壮族自治区/,"").replace(/维吾尔自治区/,"").replace(/回族自治区/,"").replace(/自治区/,"").replace(/市/,"")+"</div><div>"+v.CityName.replace(/市/,'')+"</div>" +
                                        "<div>"+v.count+"</div><div>"+pollution+"</div></div>")
                                    $("#dataStatisticsDetailPage_content").append(ranktablediv);
                                }
                            })
                        }else if(inittype=='2'){
                            $.map(data,function(v,k){
                                if(v.CityName=="全省"){
                                    var ranktablediv = $("<div class='rank21dataTable'><div>"+v.index+"</div>" +
                                        "<div>全省</div><div>"+tool.toFixed(v.SO2,1)+"</div>" +
                                        "<div>"+tool.toFixed(v.NO2,1)+"</div><div>"+tool.toFixed(v.CO,1)+"</div><div>"+tool.toFixed(v.O3_8,1)+"</div><div>"+tool.toFixed(v.PM10,1)+"</div>" +
                                        "<div>"+tool.toFixed(v.PM25,1)+"</div><div>"+parseFloat(v.rate*100).toFixed(1)+"%</div><div>"+tool.toFixed(v.count,2)+"</div></div>")
                                    $("#dataStatisticsDetailPage_content").append(ranktablediv);
                                }
                            })
                            $.map(data,function(v,k){
                                if(v.CityName!=="全省") {
                                    var ranktablediv = $("<div class='rank21dataTable'><div>"+v.index+"</div>" +
                                        "<div>"+v.CityName+"</div><div>"+tool.toFixed(v.SO2,1)+"</div>" +
                                        "<div>"+tool.toFixed(v.NO2,1)+"</div><div>"+tool.toFixed(v.CO,1)+"</div><div>"+tool.toFixed(v.O3_8,1)+"</div><div>"+tool.toFixed(v.PM10,1)+"</div>" +
                                        "<div>"+tool.toFixed(v.PM25,1)+"</div><div>"+parseFloat(v.rate*100).toFixed(1)+"%</div><div>"+tool.toFixed(v.count,2)+"</div></div>")
                                    $("#dataStatisticsDetailPage_content").append(ranktablediv);
                                }
                            })
                        }
                    }
                }
            })
        });
    },
    accumulateRankDataAjax:function(){
        var ranktype = localStorage.ranktype;
        var url;
        var inittype;
        var dataChoose = $("#dateInput").val();
        if(dataChoose==""){
            dataChoose =  new Date().getFullYear()+'-01-01';
        }
        if(ranktype == '74citysRank'){
            url = myURL+"/statistic/citylist";
            inittype='1';
        }else if(ranktype == '21citysRank'){
            url = myURL+"/statistic/allcitylist";
            inittype='1';
        }else if(ranktype == 'provinceRank'){
            url = myURL+"/statistic/allProvincelist";
            inittype='1';
        }else if(ranktype == 'west12Rank'){
            url = myURL+"/statistic/partProvincelist";
            inittype='1';
        }else if(ranktype == 'concentrationRank'){
            url = myURL+"/statistic/findFineOrder";
            inittype='2';
        }else if(ranktype == 'concentrationYoYRank'){
            url = myURL+"/statistic/beforeCompare";
            inittype='3';
        }
        $.ajax({
            url:url,
            type:"POST",
            data:{
                type:"accumulate",
                startAt:dataChoose + " 00:00:00",
                endAt:localStorage.accumulate+" 23:59:59",
                order:localStorage.order,
            },
            async:true,
            error:function(err){
                $("#ajaxPleaseWait").hide();
                console.log(err)
            },
            success:function(data){
                $("#ajaxPleaseWait").hide();
                $("#dataStatisticsDetailPage_content").html("");
                if(data==""){
                    var warningdiv = $("<div class='nodatawarning'>"+dataChoose+"至"+localStorage.accumulate+"没有数据，请重新选择日期加载排行</div>")
                    $("#dataStatisticsDetailPage_content").append(warningdiv);
                }else{
                    if(inittype=='1'){
                        $.map(data,function(v,k){
                            if(v.ProvinceName == '四川省'){
                                var pollution = tool.subDispose(v.Chiefly_Infectant)
                                // (v.Chiefly_Infectant == null ||v.Chiefly_Infectant == undefined) ? pollution = "一" : pollution = v.Chiefly_Infectant;
                                var ranktablediv = $("<div class='outlierdataTable'><div>"+v.index+"</div>" +
                                    "<div>"+v.ProvinceName.replace(/省/,'')+"</div><div>"+v.CityName.replace(/市/,'')+"</div>" +
                                    "<div>"+v.count+"</div><div>"+pollution+"</div></div>")
                                $("#dataStatisticsDetailPage_content").append(ranktablediv);
                            }
                        })
                        $.map(data,function(v,k){
                            if(v.ProvinceName !== '四川省'){
                                var pollution = tool.subDispose(v.Chiefly_Infectant)
                                // (v.Chiefly_Infectant == null ||v.Chiefly_Infectant == undefined) ? pollution = "一" : pollution = v.Chiefly_Infectant;
                                var ranktablediv = $("<div class='outlierdataTable'><div>"+v.index+"</div>" +
                                    "<div>"+v.ProvinceName.replace(/省/,'').replace(/壮族自治区/,"").replace(/维吾尔自治区/,"").replace(/回族自治区/,"").replace(/自治区/,"").replace(/市/,"")+"</div><div>"+v.CityName.replace(/市/,'')+"</div>" +
                                    "<div>"+v.count+"</div><div>"+pollution+"</div></div>")
                                $("#dataStatisticsDetailPage_content").append(ranktablediv);
                            }
                        })
                    }else if(inittype=='2'){
                        $.map(data,function(v,k){
                            if(v.CityName=="全省"){
                                var ranktablediv = $("<div class='rank21dataTable'><div>"+v.index+"</div>" +
                                    "<div>全省</div><div>"+tool.toFixed(v.SO2,1)+"</div>" +
                                    "<div>"+tool.toFixed(v.NO2,1)+"</div><div>"+tool.toFixed(v.CO,1)+"</div><div>"+tool.toFixed(v.O3_8,1)+"</div><div>"+tool.toFixed(v.PM10,1)+"</div>" +
                                    "<div>"+tool.toFixed(v.PM25,1)+"</div><div>"+parseFloat(v.rate*100).toFixed(1)+"%</div><div>"+tool.toFixed(v.count,2)+"</div></div>")
                                $("#dataStatisticsDetailPage_content").append(ranktablediv);
                            }
                        })
                        $.map(data,function(v,k){
                            if(v.CityName!=="全省") {
                                var ranktablediv = $("<div class='rank21dataTable'><div>"+v.index+"</div>" +
                                    "<div>"+v.CityName+"</div><div>"+tool.toFixed(v.SO2,1)+"</div>" +
                                    "<div>"+tool.toFixed(v.NO2,1)+"</div><div>"+tool.toFixed(v.CO,1)+"</div><div>"+tool.toFixed(v.O3_8,1)+"</div><div>"+tool.toFixed(v.PM10,1)+"</div>" +
                                    "<div>"+tool.toFixed(v.PM25,1)+"</div><div>"+parseFloat(v.rate*100).toFixed(1)+"%</div><div>"+tool.toFixed(v.count,2)+"</div></div>")
                                $("#dataStatisticsDetailPage_content").append(ranktablediv);
                            }
                        })
                    }
                }
            }
        })
        $("#dateInput").bind("change",function(event){
            $("#ajaxPleaseWait").show();
            var dateChoose = $(this).val();
            var initPlaceholder = new Date().getFullYear()+'-'+ (new Date().getMonth()+1) + '-' + (new Date().getDate()-1);
            if(new Date().getDate()==1){
                var totalmonth = (new Date().getMonth()+1);
                var lastmonth = totalmonth - 1;
                if (lastmonth == 0){
                    lastmonth=12;
                }
                switch (lastmonth)
                {
                    case 1:
                        initPlaceholder = new Date().getFullYear() +'-'+ new Date().getMonth() + '-31'
                        console.log("大月");
                        break;
                    case 3:
                        initPlaceholder = new Date().getFullYear() +'-'+ new Date().getMonth() + '-31'
                        console.log("大月");
                        break;
                    case 5:
                        initPlaceholder = new Date().getFullYear() +'-'+ new Date().getMonth() + '-31'
                        console.log("大月");
                        break;
                    case 7:
                        initPlaceholder = new Date().getFullYear() +'-'+ new Date().getMonth() + '-31'
                        console.log("大月");
                        break;
                    case 8:
                        initPlaceholder = new Date().getFullYear() +'-'+ new Date().getMonth() + '-31'
                        console.log("大月");
                        break;
                    case 10:
                        initPlaceholder = new Date().getFullYear() +'-'+ new Date().getMonth() + '-31'
                        console.log("大月");
                        break;
                    case 12:
                        initPlaceholder = new Date().getFullYear() +'-'+ new Date().getMonth() + '-31'
                        console.log("大月");
                        break;
                    case 4:
                        initPlaceholder = new Date().getFullYear() +'-'+ new Date().getMonth() + '-30'
                        console.log("小月");
                        break;
                    case 6:
                        initPlaceholder = new Date().getFullYear() +'-'+ new Date().getMonth() + '-30'
                        console.log("小月");
                        break;
                    case 9:
                        initPlaceholder = new Date().getFullYear() +'-'+ new Date().getMonth() + '-30'
                        console.log("小月");
                        break;
                    case 11:
                        initPlaceholder = new Date().getFullYear() +'-'+ new Date().getMonth() + '-30'
                        console.log("小月");
                        break;
                    case 2:
                        initPlaceholder = new Date().getFullYear() +'-'+ new Date().getMonth() + '-28'
                        console.log("二月")
                        break;
                    default:
                        console.log("没有进入case");
                        break;
                }
            }
            $.ajax({
                url:url,
                type:"POST",
                data:{
                    type:"accumulate",
                    startAt:dateChoose+" 00:00:00",
                    endAt: localStorage.accumulate+" 23:59:59",
                    order:localStorage.order,
                },
                async:true,
                error:function(err){
                    $("#dataStatisticsDetailPage").css("padding-top","47px");
                    $("#dataStatisticsDetailPage .ui-fixed-hidden").removeClass("ui-fixed-hidden")
                    $("#ajaxPleaseWait").hide();
                    console.log(err)
                },
                success:function(data){
                    $("#dataStatisticsDetailPage").css("padding-top","47px");
                    $("#dataStatisticsDetailPage .ui-fixed-hidden").removeClass("ui-fixed-hidden")
                    $("#ajaxPleaseWait").hide();
                    $("#dataStatisticsDetailPage_content").html("");
                    if(data==""){
                        var warningdiv = $("<div>"+dateChoose+"至"+initPlaceholder+"没有数据，请重新选择日期加载数据</div>")
                        $("#dataStatisticsDetailPage_content").append(warningdiv);
                    }else{
                        if(inittype=='1'){
                            $.map(data,function(v,k){
                                if(v.ProvinceName == '四川省'){
                                    var pollution = tool.subDispose(v.Chiefly_Infectant)
                                    // (v.Chiefly_Infectant == null ||v.Chiefly_Infectant == undefined) ? pollution = "一" : pollution = v.Chiefly_Infectant;
                                    var ranktablediv = $("<div class='outlierdataTable'><div>"+v.index+"</div>" +
                                        "<div>"+v.ProvinceName.replace(/省/,'')+"</div><div>"+v.CityName.replace(/市/,'')+"</div>" +
                                        "<div>"+v.count+"</div><div>"+pollution+"</div></div>")
                                    $("#dataStatisticsDetailPage_content").append(ranktablediv);
                                }
                            })
                            $.map(data,function(v,k){
                                if(v.ProvinceName !== '四川省'){
                                    var pollution = tool.subDispose(v.Chiefly_Infectant)
                                    // (v.Chiefly_Infectant == null ||v.Chiefly_Infectant == undefined) ? pollution = "一" : pollution = v.Chiefly_Infectant;
                                    var ranktablediv = $("<div class='outlierdataTable'><div>"+v.index+"</div>" +
                                        "<div>"+v.ProvinceName.replace(/省/,'').replace(/壮族自治区/,"").replace(/维吾尔自治区/,"").replace(/回族自治区/,"").replace(/自治区/,"").replace(/市/,"")+"</div><div>"+v.CityName.replace(/市/,'')+"</div>" +
                                        "<div>"+v.count+"</div><div>"+pollution+"</div></div>")
                                    $("#dataStatisticsDetailPage_content").append(ranktablediv);
                                }
                            })
                        }else if(inittype=='2'){
                            $.map(data,function(v,k){
                                if(v.CityName=="全省"){
                                    var ranktablediv = $("<div class='rank21dataTable'><div>"+v.index+"</div>" +
                                        "<div>全省</div><div>"+tool.toFixed(v.SO2,1)+"</div>" +
                                        "<div>"+tool.toFixed(v.NO2,1)+"</div><div>"+tool.toFixed(v.CO,1)+"</div><div>"+tool.toFixed(v.O3_8,1)+"</div><div>"+tool.toFixed(v.PM10,1)+"</div>" +
                                        "<div>"+tool.toFixed(v.PM25,1)+"</div><div>"+parseFloat(v.rate*100).toFixed(1)+"%</div><div>"+tool.toFixed(v.count,2)+"</div></div>")
                                    $("#dataStatisticsDetailPage_content").append(ranktablediv);
                                }
                            })
                            $.map(data,function(v,k){
                                if(v.CityName!=="全省") {
                                    var ranktablediv = $("<div class='rank21dataTable'><div>"+v.index+"</div>" +
                                        "<div>"+v.CityName+"</div><div>"+tool.toFixed(v.SO2,1)+"</div>" +
                                        "<div>"+tool.toFixed(v.NO2,1)+"</div><div>"+tool.toFixed(v.CO,1)+"</div><div>"+tool.toFixed(v.O3_8,1)+"</div><div>"+tool.toFixed(v.PM10,1)+"</div>" +
                                        "<div>"+tool.toFixed(v.PM25,1)+"</div><div>"+parseFloat(v.rate*100).toFixed(1)+"%</div><div>"+tool.toFixed(v.count,2)+"</div></div>")
                                    $("#dataStatisticsDetailPage_content").append(ranktablediv);
                                }
                            })
                        }
                    }
                }
            })
        });
    },
    MoMRankDataAjax:function(){
        var type=sessionStorage.getItem("rankAQI")
        var initPlaceholder = new Date().getFullYear();
        var initBaseYear = parseInt(initPlaceholder)-2;
        $.ajax({
            url:myURL+'/statistic/beforeCompare',
            type:"POST",
            data:{
                type:type,
                baseTime:initBaseYear
            },
            async:true,
            error:function(err){
                $("#ajaxPleaseWait").hide();
                $("#dataStatisticsDetailPage").css("padding-top","47px");
                $("#dataStatisticsDetailPage .ui-fixed-hidden").removeClass("ui-fixed-hidden")
                console.log(err)
            },
            success:function(data){
                $("#ajaxPleaseWait").hide();
                $("#dataStatisticsDetailPage_content").html("");
                $("#dataStatisticsDetailPage").css("padding-top","47px");
                $("#dataStatisticsDetailPage .ui-fixed-hidden").removeClass("ui-fixed-hidden")
                if(data==''){
                    var warningdiv = $("<div>"+initBaseYear+"没有同比数据，请重新选择基数年加载数据</div>")
                    $("#dataStatisticsDetailPage_content").append(warningdiv);
                }else{
                    if(type=='fine'){
                        $.map(data,function(v,k){
                            if(v.name == '全省'){
                                var ranktablediv = $("<div class='MoMtable'><div>"+v.name+"</div>" +
                                    "<div>"+tool.toFixed(parseFloat(v.type)*100,1)+"%</div><div>"+tool.toFixed(parseFloat(v.same),1)+"%</div><div>"+tool.toFixed(parseFloat(v.base),1)+"%</div></div>")
                                $("#dataStatisticsDetailPage_content").append(ranktablediv);
                            }
                        })
                        $.map(data,function(v,k){
                            if(v.name == '成都'){
                                var ranktablediv = $("<div class='MoMtable'><div>"+v.name+"</div>" +
                                    "<div>"+tool.toFixed(parseFloat(v.type)*100,1)+"%</div><div>"+tool.toFixed(parseFloat(v.same),1)+"%</div><div>"+tool.toFixed(parseFloat(v.base),1)+"%</div></div>")
                                $("#dataStatisticsDetailPage_content").append(ranktablediv);
                            }
                        })
                        $.map(data,function(v,k){
                            if(v.name !== '未达标城市' && v.name !== '全省' && v.name !== '成都' ){
                                var ranktablediv = $("<div class='MoMtable'><div>"+v.name+"</div>" +
                                    "<div>"+tool.toFixed(parseFloat(v.type)*100,1)+"%</div><div>"+tool.toFixed(parseFloat(v.same),1)+"%</div><div>"+tool.toFixed(parseFloat(v.base),1)+"%</div></div>")
                                $("#dataStatisticsDetailPage_content").append(ranktablediv);
                            }
                        })
                    }else{
                        $.map(data,function(v,k){
                            if(v.name == '全省'){
                                var ranktablediv = $("<div class='MoMtable'><div>"+v.name+"</div>" +
                                    "<div>"+tool.toFixed(parseFloat(v.type),1)+"</div><div>"+tool.toFixed(parseFloat(v.same),1)+"%</div><div>"+tool.toFixed(parseFloat(v.base),1)+"%</div></div>")
                                $("#dataStatisticsDetailPage_content").append(ranktablediv);
                            }
                        })
                        $.map(data,function(v,k){
                            if(v.name == '成都'){
                                var ranktablediv = $("<div class='MoMtable'><div>"+v.name+"</div>" +
                                    "<div>"+tool.toFixed(parseFloat(v.type),1)+"</div><div>"+tool.toFixed(parseFloat(v.same),1)+"%</div><div>"+tool.toFixed(parseFloat(v.base),1)+"%</div></div>")
                                $("#dataStatisticsDetailPage_content").append(ranktablediv);
                            }
                        })
                        $.map(data,function(v,k){
                            if(v.name !== '未达标城市' && v.name !== '全省' && v.name !== '成都' ){
                                var ranktablediv = $("<div class='MoMtable'><div>"+v.name+"</div>" +
                                    "<div>"+tool.toFixed(parseFloat(v.type),1)+"</div><div>"+tool.toFixed(parseFloat(v.same),1)+"%</div><div>"+tool.toFixed(parseFloat(v.base),1)+"%</div></div>")
                                $("#dataStatisticsDetailPage_content").append(ranktablediv);
                            }
                        })
                    }
                }
            }
        })
    },

    //设置页
    settingPage_init:function(){
        $("#closeTheApp").unbind().click(function(){
            // navigator.app.exitApp();
            sessionStorage.clear();
            localStorage.clear();
            tool.warningAlert("warAFailed", "注销登录成功")
            $("#username").val("");
            $("#password").val("");
            $("#citySelector").val("5100")
            $("#saveAccount").attr("checked",false)
            setTimeout(function(){
                $.mobile.changePage("#loginPage","pop");
            },1000)
        });
        if(!localStorage.receivePush){
            localStorage.receivePush=1;
            $("#ifReceivePush").prop("checked",true);
        }else{
            if(localStorage.receivePush==1){
                $("#ifReceivePush").prop("checked",true);
            }else{
                $("#ifReceivePush").prop("checked",false);
            }
        }

        $("#ifReceivePush").unbind().click(function(){
            if($("#ifReceivePush").prop("checked")){
                localStorage.receivePush=1;
                //重启推送功能
                window.plugins.jPushPlugin.resumePush();
                window.plugins.jPushPlugin.clearAllNotification();
                tool.warningAlert("warAFailed", "开启推送");
            }else{
                localStorage.receivePush=0;
                //关闭推送功能
                window.plugins.jPushPlugin.stopPush();
                tool.warningAlert("warAFailed", "关闭推送");
            }
        });

        $("#clear").unbind().click(function(){
            sessionStorage.clear();
            $("#ajaxPleaseWait").show();
            tool.removeCookie("username")
            tool.removeCookie("password")
            setTimeout(function(){
                $("#ajaxPleaseWait").hide();
            },1000)
            setTimeout(function(){
                tool.warningAlert("warAFailed", "清除缓存成功！");
            },1000)
        })

        $("#following").unbind().click(function(){
            $.mobile.changePage("#followingPage",{transition:"slide"});
        });

        $("#Abnromalfollowing").unbind().click(function(){
            $.mobile.changePage("#AbnromalfollowingPage",{transition:"slide"});
        });

        $("#AQIsettings").unbind().click(function(){
            $.mobile.changePage("#thresholdSetPage",{transition:"slide"});
        });
    },
    //关注列表页
    followingPage_init:function(){
        $("#followinglistChooseBar").children("div").unbind().click(function(){
            $("#followinglistChooseBar").children("div").removeClass("followinglistChooseActive");
            $(this).addClass("followinglistChooseActive");
            var type=$(this).attr("datatype");
            switch(type){
                case "followinglist":
                    menuFunction.myfollowing_init();
                    break;
                case "citylist":
                    menuFunction.citys_init();
                    break;
            }
        });
        $("#followinglistChooseBar").children("div").eq(0).click();
    },
    myfollowing_init:function(){
        var UserId = localStorage.userid;
        $.ajax({
            type:"POST",
            url:myURL + '/attention/findcity',
            data:{
                UserId:UserId
            },
            dataType:"json",
            async:true,
            error:function(){
                tool.warningAlert("warAFailed","获取信息失败");
            },
            complete:function(XMLHttpRequest){
                $("#followingPage_content").html("");
                var data = eval("("+XMLHttpRequest.responseText+")");
                $.each(data,function (k,v) {
                    var listitemDiv= $("<div class='listitemTable'></div>");
                    var div = $("<label class='followingPageItemLeft'>"+(k+1)+'.'+v.CityName+ "</label>" +
                        "<label class='followingPageItemRight' id='"+v.id+"'><i class='icon-minus-sign'></i></label>");
                    if (v.CityName == "马尔康市"){
                        div = $("<label class='followingPageItemLeft'>"+(k+1)+".阿坝州</label>" +
                            "<label class='followingPageItemRight' id='"+v.id+"'><i class='icon-minus-sign'></i></label>");
                    }
                    if(v.CityName == "康定市"){
                        div = $("<label class='followingPageItemLeft'>"+(k+1)+ ".甘孜州</label>" +
                            "<label class='followingPageItemRight' id='"+v.id+"'><i class='icon-minus-sign'></i></label>");
                    }
                    if(v.CityName == "西昌市"){
                        div = $("<label class='followingPageItemLeft'>"+(k+1)+".凉山州</label>" +
                            "<label class='followingPageItemRight' id='"+v.id+"'><i class='icon-minus-sign'></i></label>");
                    }
                    listitemDiv.append(div);
                    $("#followingPage_content").append(listitemDiv)
                })
                $(".followingPageItemRight").unbind().click(function(){
                    var id = $(this).attr("id")
                    $.ajax({
                        type:'POST',
                        url:myURL+'/attention/delete',
                        data:{
                            id:id,
                        },
                        async:true,
                        error:function(){
                        },
                        complete:function(){
                            menuFunction.myfollowing_init();
                        },
                    })
                })
            }
        })
    },
    citys_init:function(){
        var UserId = localStorage.userid;
        $.ajax({
            type: "POST",
            url: myURL + '/city/findcity',
            data: {
                UserId: UserId
            },
            dataType: "json",
            async: true,
            error: function () {
                tool.warningAlert("warAFailed", "获取信息失败");
            },
            complete:function(XMLHttpRequest){
                $("#followingPage_content").html("");
                var data = eval("("+XMLHttpRequest.responseText+")");
                $.each(data,function (k,v) {
                    var listitemDiv= $("<div class='listitemTable'></div>");
                    var div = $("<label class='followingPageItemLeft'>"+(k+1)+'.'+v.CityName+"</label>" +
                        "<label class='followingPageItemRight' CityName='"+v.CityName+"' CityID='"+v.CityCode+"'><i class='icon-plus-sign'></i></label>");
                    if (v.CityName == "马尔康市"){
                        div = $("<label class='followingPageItemLeft'>"+(k+1)+".阿坝州</label>" +
                            "<label class='followingPageItemRight' CityName='"+v.CityName+"' CityID='"+v.CityCode+"'><i class='icon-plus-sign'></i></label>");
                    }
                    if(v.CityName == "康定市"){
                        div = $("<label class='followingPageItemLeft'>"+(k+1)+".甘孜州</label>" +
                            "<label class='followingPageItemRight' CityName='"+v.CityName+"' CityID='"+v.CityCode+"'><i class='icon-plus-sign'></i></label>");
                    }
                    if(v.CityName == "西昌市"){
                        div = $("<label class='followingPageItemLeft'>"+(k+1)+".凉山州</label>" +
                            "<label class='followingPageItemRight' CityName='"+v.CityName+"' CityID='"+v.CityCode+"'><i class='icon-plus-sign'></i></label>");
                    }

                    listitemDiv.append(div);
                    $("#followingPage_content").append(listitemDiv)
                })
                $(".followingPageItemRight").unbind().click(function(){
                    var CityID = $(this).attr("CityID")
                    var CityName = $(this).attr("CityName")
                    $.ajax({
                        type:'POST',
                        url:myURL+'/attention/save',
                        data:{
                            UserId:UserId,
                            CityName:CityName,
                            CityID:CityID
                        },
                        async:true,
                        error:function(){
                            tool.warningAlert("warAFailed","增加关注失败");
                        },
                        complete:function(){
                            tool.warningAlert("warAFailed","增加关注成功");
                        },
                    })
                })
            }
        })
    },
    //异常关注页
    AbnromalfollowingPage_init:function(){
        $("#AbnormalChooseBar").find("div").unbind().click(function(){
            $("#AbnormalChooseBar").find("div").removeClass("AbnormalActive");
            $(this).addClass("AbnormalActive");
            var type=$(this).attr("type");
            switch(type){
                case "air":
                    $("#AbnromalfollowingPage_content").show();
                    $("#AbnromalwaterfollowingPage_content").hide();
                    break;
                case "water":
                    $("#AbnromalfollowingPage_content").hide();
                    $("#AbnromalwaterfollowingPage_content").show();
                    break;
            }
        });

        $("#wa4,#wa5,#wa6,#wa7").unbind().bind("click",function(){
            $("#AbnromalfollowingPage").css("padding-top","47px");
            $("#AbnromalfollowingPage .ui-fixed-hidden").removeClass("ui-fixed-hidden")
            var id = this.id
            var type;
            switch (id){
               case "wa4":
                   type = "1";
                   break;
               case "wa5":
                   type = "2";
                   break;
               case "wa6":
                   type = "7";
                   break;
               case "wa7":
                   type = "3";
                   break;
               default:
                   break;
            }
            if($(this).prop("checked")){
                $.ajax({
                    type:"POST",
                    url:myURL+config.addwatermodule,
                    data:{
                        name:localStorage.loginName,
                        ModuleType: type
                    },
                    error:function(err){
                        // console.log(err)
                    },
                    success:function(data){
                        // console.log(localStorage.loginName)
                    }
                })
            }else{
                $.ajax({
                    type:"POST",
                    url:myURL+config.deletewatermodule,
                    data:{
                        name:localStorage.loginName,
                        ModuleType: type
                    },
                    error:function(err){
                        console.log(err)
                    },
                    success:function(){
                        // console.log(localStorage.loginName)
                    }
                })
            }
        });

        $("#4,#5,#6,#7").unbind().bind("click",function(){
            $("#AbnromalfollowingPage").css("padding-top","47px");
            $("#AbnromalfollowingPage .ui-fixed-hidden").removeClass("ui-fixed-hidden")
            var type = this.id
            if($(this).prop("checked")){
                $.ajax({
                    type:"POST",
                    url:myURL+config.addmodule,
                    data:{
                        UserId:localStorage.userid,
                        ModuleType: type
                    },
                    error:function(err){
                        // console.log(err)
                    },
                    success:function(data){

                    }
                })
            }else{
                $.ajax({
                    type:"POST",
                    url:myURL+config.deletemodule,
                    data:{
                        UserId:localStorage.userid,
                        ModuleType: type
                    },
                    error:function(err){
                        console.log(err)
                    },
                    success:function(){

                    }
                })
            }
        });
    },
    //阀值设置页
    // 阀值设置
    // thresholdSetPage_init:function(){
    //     $("#thresholdSetChooseBar").children("div").unbind().click(function(){
    //         $("#thresholdSetChooseBar").children("div").removeClass("thresholdSetChooseActive");
    //         $(this).addClass("thresholdSetChooseActive");
    //         var type=$(this).attr("datatype");
    //         switch(type){
    //             case "country":
    //                 menuFunction.countryThresholdSet_init();
    //                 break;
    //             case "province":
    //                 menuFunction.provinceThresholdSet_init();
    //                 break;
    //         }
    //     });
    //     $("#thresholdSetChooseBar").children("div").eq(0).click();
    // },
    // handleSubmitMin:function(){
    //     var Restricts = "MIN";
    //     var AQIsettings={
    //         SO2MIN:"",
    //         NO2MIN:"",
    //         COMIN:"",
    //         O3MIN:"",
    //         PM2_5MIN:"",
    //         PM10MIN:""
    //     };
    //     AQIsettings.SO2MIN= $("#SO2min").val();
    //     AQIsettings.NO2MIN= $("#NO2min").val();
    //     AQIsettings.COMIN= $("#COmin").val();
    //     AQIsettings.O3MIN= $("#O3min").val();
    //     AQIsettings.PM2_5MIN= $("#PM2_5min").val();
    //     AQIsettings.PM10MIN= $("#PM10min").val();
    //
    //     var type = localStorage.type;
    //     var TYPE;
    //     if(type=='country'){
    //         TYPE = '1';
    //     }else if(type == 'province'){
    //         TYPE = '2';
    //     }
    //
    //     var role = localStorage.role;
    //     if(role.indexOf(',')>0){
    //         var role = role.split(',');
    //         for (var i in role){
    //             // console.log(roles[i])
    //             if(role[i]==1){//超级管理员
    //                 role='1';
    //             }else if(role[i]==2){//省站人员
    //                 role='2';
    //             }else if(role[i]==3){//市州人员
    //                 role='3';
    //             }else if(role[i]==3150)//运维人员
    //             {
    //                 role='3150';
    //             }
    //         }
    //     }else{
    //         role = localStorage.role;
    //     }
    //     if(role == '3'){
    //         if(AQIsettings.SO2MIN !== '' || AQIsettings.NO2MIN !== '' || AQIsettings.COMIN !== '' ||
    //             AQIsettings.O3MIN !== '' || AQIsettings.PM2_5MIN !== '' || AQIsettings.PM10MIN !== ''){
    //             $.ajax({
    //                 url:myURL+'/threshold/save',
    //                 type:"POST",
    //                 data:{
    //                     CityCode:localStorage.code,
    //                     Restricts:Restricts,
    //                     TYPE:TYPE,
    //                     SO2:AQIsettings.SO2MIN,
    //                     NO2:AQIsettings.NO2MIN,
    //                     O3:AQIsettings.O3MIN,
    //                     PM10:AQIsettings.PM10MIN,
    //                     PM2_5:AQIsettings.PM2_5MIN,
    //                     CO:AQIsettings.COMIN
    //                 },
    //                 async:true,
    //                 error:function(){
    //                     tool.warningAlert("warAFailed","提交最小值失败，请稍后重试");
    //                 },
    //                 complete:function(){
    //                     tool.warningAlert("warAFailed","提交最小值成功！");
    //                 }
    //             })
    //         }else{
    //             tool.warningAlert('warAFailed','提交的数据不能全部为空')
    //         }
    //     }else{
    //         tool.warningAlert('warAFailed','仅市州级角色可设置对应市州阀值')
    //     }
    // },
    // handleSubmitMax:function(){
    //     var Restricts = "MAX";
    //     var AQIsettings={
    //         SO2MAX:"",
    //         NO2MAX:"",
    //         COMAX:"",
    //         O3MAX:"",
    //         PM2_5MAX:"",
    //         PM10MAX:""
    //     };
    //
    //     AQIsettings.SO2MAX= $("#SO2max").val();
    //     AQIsettings.NO2MAX= $("#NO2max").val();
    //     AQIsettings.COMAX= $("#COmax").val();
    //     AQIsettings.O3MAX= $("#O3max").val();
    //     AQIsettings.PM2_5MAX= $("#PM2_5max").val();
    //     AQIsettings.PM10MAX= $("#PM10max").val();
    //
    //     var role = localStorage.role;
    //     if(role.indexOf(',')>0){
    //         var role = role.split(',');
    //         for (var i in role){
    //             // console.log(roles[i])
    //             if(role[i]==1){//超级管理员
    //                 role='1';
    //             }else if(role[i]==2){//省站人员
    //                 role='2';
    //             }else if(role[i]==3){//市州人员
    //                 role='3';
    //             }else if(role[i]==3150)//运维人员
    //             {
    //                 role='3150';
    //             }
    //         }
    //     }else{
    //         role = localStorage.role;
    //     }
    //     var type = localStorage.type;
    //     var TYPE;
    //     if(type=='country'){
    //         TYPE = '1';
    //     }else if(type == 'province'){
    //         TYPE = '2';
    //     }
    //     if(role == '3'){
    //         if(AQIsettings.SO2MAX !== '' || AQIsettings.NO2MAX !== '' || AQIsettings.COMAX !== '' ||
    //             AQIsettings.O3MAX !== '' || AQIsettings.PM2_5MAX !== '' || AQIsettings.PM10MAX !== ''){
    //             $.ajax({
    //                 url:myURL+'/threshold/save',
    //                 type:"POST",
    //                 data:{
    //                     CityCode:CityCode,
    //                     // CityCode:localStorage.code,
    //                     Restricts:Restricts,
    //                     TYPE:TYPE,
    //                     SO2:AQIsettings.SO2MAX,
    //                     NO2:AQIsettings.NO2MAX,
    //                     O3:AQIsettings.O3MAX,
    //                     PM10:AQIsettings.PM10MAX,
    //                     PM2_5:AQIsettings.PM2_5MAX,
    //                     CO:AQIsettings.COMAX
    //                 },
    //                 async:true,
    //                 error:function(){
    //                     tool.warningAlert("warAFailed","提交最大值失败，请稍后重试");
    //                 },
    //                 complete:function(){
    //                     tool.warningAlert("warAFailed","提交最大值成功！");
    //                 }
    //             })
    //         }else{
    //             tool.warningAlert('warAFailed','提交的数据不能全部为空')
    //         }
    //     }else{
    //         tool.warningAlert('warAFailed','仅市州级角色可设置对应市州阀值')
    //     }
    // },
    // countryThresholdSet_init:function(){
    //     $("#thresholdSetPage_content").html("");
    //     var itemdiv = $("<div class='itemTable'></div>")
    //     var AQI = ["SO2","NO2","CO","O3","PM10","PM2_5"];
    //     var placeholderMax={
    //         SO2:"上限值",
    //         NO2:"上限值",
    //         CO:"上限值",
    //         O3:"上限值",
    //         PM2_5:"上限值",
    //         PM10:"上限值"
    //     }
    //     var placeholderMin={
    //         SO2:"下限值",
    //         NO2:"下限值",
    //         CO:"下限值",
    //         O3:"下限值",
    //         PM2_5:"下限值",
    //         PM10:"下限值"
    //     }
    //     var AQIDiv;
    //     var inputDiv;
    //     var CityCode=localStorage.code;
    //     $.ajax({
    //         url:myURL+"/threshold/find",
    //         data:{
    //             CityCode:CityCode,
    //             Type:'1',
    //             Restricts:'MAX'
    //         },
    //         type:"POST",
    //         async:false,
    //         error:function(err){
    //             console.log("err exits!")
    //             console.log(err)
    //         },
    //         success:function(data){
    //             if(!data.rtncode){
    //                 if(data.CO!==''&&data.CO!==undefined){
    //                     placeholderMax.CO=data.CO;
    //                 }
    //                 if(data.SO2!==''&&data.SO2!==undefined){
    //                     placeholderMax.SO2=data.SO2;
    //                 }
    //                 if(data.NO2!==''&&data.NO2!==undefined){
    //                     placeholderMax.NO2=data.NO2;
    //                 }
    //                 if(data.O3!==''&&data.O3!==undefined){
    //                     placeholderMax.O3=data.O3;
    //                 }
    //                 if(data.PM10!==''&&data.PM10!==undefined){
    //                     placeholderMax.PM10=data.PM10;
    //                 }
    //                 if(data.PM2_5!==''&&data.PM2_5!==undefined){
    //                     placeholderMax.PM2_5=data.PM2_5;
    //                 }
    //             }
    //         }
    //     })
    //     $.ajax({
    //         url:myURL+"/threshold/find",
    //         data:{
    //             CityCode:CityCode,
    //             Type:'1',
    //             Restricts:'MIN'
    //         },
    //         type:"POST",
    //         async:false,
    //         error:function(err){
    //             console.log("err exits!")
    //             console.log(err)
    //         },
    //         success:function(data){
    //             console.log(data)
    //             if(!data.rtncode){
    //                 if(data.CO!==''&&data.CO!==undefined){
    //                     placeholderMin.CO=data.CO;
    //                 }
    //                 if(data.SO2!==''&&data.SO2!==undefined){
    //                     placeholderMin.SO2=data.SO2;
    //                 }
    //                 if(data.NO2!==''&&data.NO2!==undefined){
    //                     placeholderMin.NO2=data.NO2;
    //                 }
    //                 if(data.O3!==''&&data.O3!==undefined){
    //                     placeholderMin.O3=data.O3;
    //                 }
    //                 if(data.PM10!==''&&data.PM10!==undefined){
    //                     placeholderMin.PM10=data.PM10;
    //                 }
    //                 if(data.PM2_5!==''&&data.PM2_5!==undefined){
    //                     placeholderMin.PM2_5=data.PM2_5;
    //                 }
    //             }
    //         }
    //     })
    //     for(var i in AQI){
    //         if(AQI[i]=="SO2"){
    //             AQIDiv=$("<div class='AQIItem'>SO<sub>2</sub></div>");
    //             inputDiv = $("<div class='inputDiv'><p>阀值设置:(ug/m<sup>3</sup>)</p><input type='text' id='SO2min'  placeholder='"+placeholderMin.SO2+''+"'>&nbsp;--&nbsp;<input  id='SO2max' type='text'placeholder='"+placeholderMax.SO2+"'></div>");
    //         }else if(AQI[i] == "NO2"){
    //             AQIDiv=$("<div class='AQIItem'>NO<sub>2</sub></div>");
    //             inputDiv = $("<div class='inputDiv'><p>阀值设置:(ug/m<sup>3</sup>)</p><input type='text' id='NO2min'  placeholder='"+placeholderMin.NO2+''+"'>&nbsp;--&nbsp;<input  id='NO2max' type='text'placeholder='"+placeholderMax.NO2+"'></div>");
    //         }else if(AQI[i] == "O3"){
    //             AQIDiv=$("<div class='AQIItem'>O<sub>3</sub></div>");
    //             inputDiv = $("<div class='inputDiv'><p>阀值设置:(ug/m<sup>3</sup>)</p><input type='text' id='O3min'  placeholder='"+placeholderMin.O3+''+"'>&nbsp;--&nbsp;<input  id='O3max' type='text'placeholder='"+placeholderMax.O3+"'></div>");
    //         }else if(AQI[i] == "PM2_5"){
    //             AQIDiv=$("<div class='AQIItem'>PM2.5</div>");
    //             inputDiv = $("<div class='inputDiv'><p>阀值设置:(ug/m<sup>3</sup>)</p><input type='text' id='PM2_5min'  placeholder='"+placeholderMin.PM2_5+''+"'>&nbsp;--&nbsp;<input  id='PM2_5max' type='text'placeholder='"+placeholderMax.PM2_5+"'></div>");
    //         }else if(AQI[i]=="CO"){
    //             AQIDiv=$("<div class='AQIItem'>"+ AQI[i] +"</div>");
    //             inputDiv = $("<div class='inputDiv'><p>阀值设置:(mg/m<sup>3</sup>)</p><input type='text' id='COmin'  placeholder='"+placeholderMin.CO+''+"'>&nbsp;--&nbsp;<input  id='COmax' type='text'placeholder='"+placeholderMax.CO+"'></div>");
    //         }
    //         else if(AQI[i]=="PM10"){
    //             AQIDiv=$("<div class='AQIItem'>"+ AQI[i] +"</div>");
    //             inputDiv = $("<div class='inputDiv'><p>阀值设置:(ug/m<sup>3</sup>)</p><input type='text' id='PM10min'  placeholder='"+placeholderMin.PM10+''+"'>&nbsp;--&nbsp;<input  id='PM10max' type='text'placeholder='"+placeholderMax.PM10+"'></div>");
    //         }
    //         itemdiv.append(AQIDiv);
    //         itemdiv.append(inputDiv);
    //         $("#thresholdSetPage_content").append(itemdiv);
    //         itemdiv = $("<div class='itemTable'></div>");
    //     }
    //     var submitDiv = $("<div id='SubmitItem'><button id='submitMin' onclick='menuFunction.handleSubmitMin()'>提交最小值</button><button id='submitMax'  onclick='menuFunction.handleSubmitMax()'>提交最大值</button></div>");
    //     $("#thresholdSetPage_content").append(submitDiv);
    //     $('#SubmitItem').height(document.documentElement.clientHeight-576+20);
    //     localStorage.type='country';
    //     // $("#thresholdSetPage input").bind("focus",function(){
    //     //     console.log(this)
    //     //     // $("#thresholdSetPage .ui-fixed-hidden").removeClass("ui-fixed-hidden")
    //     // })
    // },
    // provinceThresholdSet_init:function(){
    //     $("#thresholdSetPage_content").html("");
    //     var itemdiv = $("<div class='itemTable'></div>")
    //     var AQI = ["SO2","NO2","CO","O3","PM10","PM2_5"];
    //     var AQIDiv;
    //     var inputDiv;
    //     var CityCode=localStorage.code;
    //     var placeholderMax={
    //         SO2:"上限值",
    //         NO2:"上限值",
    //         CO:"上限值",
    //         O3:"上限值",
    //         PM2_5:"上限值",
    //         PM10:"上限值"
    //     }
    //     var placeholderMin={
    //         SO2:"下限值",
    //         NO2:"下限值",
    //         CO:"下限值",
    //         O3:"下限值",
    //         PM2_5:"下限值",
    //         PM10:"下限值"
    //     }
    //     $.ajax({
    //         url:myURL+"/threshold/find",
    //         data:{
    //             CityCode:CityCode,
    //             Type:'2',
    //             Restricts:'MAX'
    //         },
    //         type:"POST",
    //         async:false,
    //         error:function(err){
    //             console.log("err exits!")
    //             console.log(err)
    //         },
    //         success:function(data){
    //             if(!data.rtncode){
    //                 if(data.CO!==''&&data.CO!==undefined){
    //                     placeholderMax.CO=data.CO;
    //                 }
    //                 if(data.SO2!==''&&data.SO2!==undefined){
    //                     placeholderMax.SO2=data.SO2;
    //                 }
    //                 if(data.NO2!==''&&data.NO2!==undefined){
    //                     placeholderMax.NO2=data.NO2;
    //                 }
    //                 if(data.O3!==''&&data.O3!==undefined){
    //                     placeholderMax.O3=data.O3;
    //                 }
    //                 if(data.PM10!==''&&data.PM10!==undefined){
    //                     placeholderMax.PM10=data.PM10;
    //                 }
    //                 if(data.PM2_5!==''&&data.PM2_5!==undefined){
    //                     placeholderMax.PM2_5=data.PM2_5;
    //                 }
    //             }
    //         }
    //     })
    //     $.ajax({
    //         url:myURL+"/threshold/find",
    //         data:{
    //             CityCode:CityCode,
    //             Type:'2',
    //             Restricts:'MIN'
    //         },
    //         type:"POST",
    //         async:false,
    //         error:function(err){
    //             console.log("err exits!")
    //             console.log(err)
    //         },
    //         success:function(data){
    //             if(!data.rtncode){
    //                 if(data.CO!==''&&data.CO!==undefined){
    //                     placeholderMin.CO=data.CO;
    //                 }
    //                 if(data.SO2!==''&&data.SO2!==undefined){
    //                     placeholderMin.SO2=data.SO2;
    //                 }
    //                 if(data.NO2!==''&&data.NO2!==undefined){
    //                     placeholderMin.NO2=data.NO2;
    //                 }
    //                 if(data.O3!==''&&data.O3!==undefined){
    //                     placeholderMin.O3=data.O3;
    //                 }
    //                 if(data.PM10!==''&&data.PM10!==undefined){
    //                     placeholderMin.PM10=data.PM10;
    //                 }
    //                 if(data.PM2_5!==''&&data.PM2_5!==undefined){
    //                     placeholderMin.PM2_5=data.PM2_5;
    //                 }
    //             }
    //         }
    //     })
    //     for(var i in AQI){
    //         if(AQI[i]=="SO2"){
    //             AQIDiv=$("<div class='AQIItem'>SO<sub>2</sub></div>");
    //             inputDiv = $("<div class='inputDiv'><p>阀值设置:(ug/m<sup>3</sup>)</p><input type='text' id='SO2min'  placeholder='"+placeholderMin.SO2+''+"'>&nbsp;--&nbsp;<input  id='SO2max' type='text'placeholder='"+placeholderMax.SO2+"'></div>");
    //         }else if(AQI[i] == "NO2"){
    //             AQIDiv=$("<div class='AQIItem'>NO<sub>2</sub></div>");
    //             inputDiv = $("<div class='inputDiv'><p>阀值设置:(ug/m<sup>3</sup>)</p><input type='text' id='NO2min'  placeholder='"+placeholderMin.NO2+''+"'>&nbsp;--&nbsp;<input  id='NO2max' type='text'placeholder='"+placeholderMax.NO2+"'></div>");
    //         }else if(AQI[i] == "O3"){
    //             AQIDiv=$("<div class='AQIItem'>O<sub>3</sub></div>");
    //             inputDiv = $("<div class='inputDiv'><p>阀值设置:(ug/m<sup>3</sup>)</p><input type='text' id='O3min'  placeholder='"+placeholderMin.O3+''+"'>&nbsp;--&nbsp;<input  id='O3max' type='text'placeholder='"+placeholderMax.O3+"'></div>");
    //         }else if(AQI[i] == "PM2_5"){
    //             AQIDiv=$("<div class='AQIItem'>PM2.5</div>");
    //             inputDiv = $("<div class='inputDiv'><p>阀值设置:(ug/m<sup>3</sup>)</p><input type='text' id='PM2_5min'  placeholder='"+placeholderMin.PM2_5+''+"'>&nbsp;--&nbsp;<input  id='PM2_5max' type='text'placeholder='"+placeholderMax.PM2_5+"'></div>");
    //         }else if(AQI[i]=="CO"){
    //             AQIDiv=$("<div class='AQIItem'>"+ AQI[i] +"</div>");
    //             inputDiv = $("<div class='inputDiv'><p>阀值设置:(mg/m<sup>3</sup>)</p><input type='text' id='COmin'  placeholder='"+placeholderMin.CO+''+"'>&nbsp;--&nbsp;<input  id='COmax' type='text'placeholder='"+placeholderMax.CO+"'></div>");
    //         }
    //         else if(AQI[i]=="PM10"){
    //             AQIDiv=$("<div class='AQIItem'>"+ AQI[i] +"</div>");
    //             inputDiv = $("<div class='inputDiv'><p>阀值设置:(ug/m<sup>3</sup>)</p><input type='text' id='PM10min'  placeholder='"+placeholderMin.PM10+''+"'>&nbsp;--&nbsp;<input  id='PM10max' type='text'placeholder='"+placeholderMax.PM10+"'></div>");
    //         }
    //         itemdiv.append(AQIDiv);
    //         itemdiv.append(inputDiv);
    //         $("#thresholdSetPage_content").append(itemdiv);
    //         itemdiv = $("<div class='itemTable'></div>");
    //     }
    //     var submitDiv = $("<div id='SubmitItem'><button id='submitMin' onclick='menuFunction.handleSubmitMin()'>提交最小值</button><button id='submitMax'  onclick='menuFunction.handleSubmitMax()'>提交最大值</button></div>");
    //     $("#thresholdSetPage_content").append(submitDiv);
    //     $('#SubmitItem').height(document.documentElement.clientHeight-576+20);
    //     localStorage.type='province';
    //     // $("#thresholdSetPage input").bind("click",function(){
    //     //     console.log(this)
    //     //    $("#thresholdSetPage .ui-fixed-hidden").removeClass("ui-fixed-hidden")
    //     // })
    // },
    infomationPage_init:function(){
        $("#infomationPage_Content1FooterButton").unbind().click(function(){
            var title="空气质量指数";
            var body=$("<div class='infoFanDivContent'></div>");
            var label1=$("<label class='infoFanDivLabel'>&nbsp&nbsp空气质量指数(Air Quality Index，简称AQI)是定量描述空气质量状况的无量纲指数。</label>");
            var label2=$("<label class='infoFanDivLabel'>&nbsp&nbsp针对单项污染物的还规定了空气质量分指数。参与空气质量评价的主要污染物为细颗粒物、可吸入颗粒物、二氧化硫、二氧化氮、臭氧、一氧化碳等六项。</label>");
            var label3=$("<label class='infoFanDivTitle'>质量等级</label>");
            var table=$("<div class='infoFanDivTable'></div>");
            var tableleft1=$("<div class='infoFanDivTdLeft'>等级</div>");
            var tableright1=$("<div class='infoFanDivTdRight'>无量纲</div>");
            var tableleft2=$("<div class='infoFanDivTdLeft' style='color:#00E400'>优</div>");
            var tableright2=$("<div class='infoFanDivTdRight'>0~50</div>");
            var tableleft3=$("<div class='infoFanDivTdLeft' style='color:#fdc61e'>良</div>");
            var tableright3=$("<div class='infoFanDivTdRight'>51~100</div>");
            var tableleft4=$("<div class='infoFanDivTdLeft' style='color:#FF7E00'>轻度污染</div>");
            var tableright4=$("<div class='infoFanDivTdRight'>101~150</div>");
            var tableleft5=$("<div class='infoFanDivTdLeft' style='color:#FF0000'>中度污染</div>");
            var tableright5=$("<div class='infoFanDivTdRight'>151~200</div>");
            var tableleft6=$("<div class='infoFanDivTdLeft' style='color:#99004C'>重度污染</div>");
            var tableright6=$("<div class='infoFanDivTdRight'>201~300</div>");
            var tableleft7=$("<div class='infoFanDivTdLeft' style='color:#7E0023'>严重污染</div>");
            var tableright7=$("<div class='infoFanDivTdRight'>>300</div>");
            table.append(tableleft1);
            table.append(tableright1);
            table.append(tableleft2);
            table.append(tableright2);
            table.append(tableleft3);
            table.append(tableright3);
            table.append(tableleft4);
            table.append(tableright4);
            table.append(tableleft5);
            table.append(tableright5);
            table.append(tableleft6);
            table.append(tableright6);
            table.append(tableleft7);
            table.append(tableright7);
            body.append(label1);
            body.append(label2);
            body.append(label3);
            body.append(table);
            tool.infomationFancyDiv(title,body);
        });
        $(".infomationGasItem").unbind().click(function(){
            var gas=$(this).attr("gas");
            var data=gasDetail[gas];
            var title=data.NAME;
            var body=$("<div class='infoFanDivContent'></div>");
            var label1=$("<label class='infoFanDivTitle'>主要来源</label>");
            var label2=$("<label class='infoFanDivLabel'>&nbsp&nbsp"+data.RES+"</label>");
            var label3=$("<label class='infoFanDivTitle'>浓度限值</label>");
            var table=$("<div class='infoFanDivTable'></div>");
            var tableleft1=$("<div class='infoFanDivTdLeft'>等级</div>");
            var tableright1=$("<div class='infoFanDivTdRight'>无量纲</div>");
            var tableleft2=$("<div class='infoFanDivTdLeft' style='color:#00E400'>空气质量优</div>");
            var tableright2=$("<div class='infoFanDivTdRight'>"+data.level1+"</div>");
            var tableleft3=$("<div class='infoFanDivTdLeft' style='color:#fdc61e'>空气质量良</div>");
            var tableright3=$("<div class='infoFanDivTdRight'>"+data.level2+"</div>");
            var tableleft4=$("<div class='infoFanDivTdLeft' style='color:#FF7E00'>轻度污染</div>");
            var tableright4=$("<div class='infoFanDivTdRight'>"+data.level3+"</div>");
            var tableleft5=$("<div class='infoFanDivTdLeft' style='color:#FF0000'>中度污染</div>");
            var tableright5=$("<div class='infoFanDivTdRight'>"+data.level4+"</div>");
            var tableleft6=$("<div class='infoFanDivTdLeft' style='color:#99004C'>重度污染</div>");
            var tableright6=$("<div class='infoFanDivTdRight'>"+data.level5+"</div>");
            var tableleft7=$("<div class='infoFanDivTdLeft' style='color:#7E0023'>严重污染</div>");
            var tableright7=$("<div class='infoFanDivTdRight'>"+data.level6+"</div>");
            var label4=$("<label class='infoFanDivTitle'>对健康的影响</label>");
            var label5=$("<label class='infoFanDivLabel'>&nbsp&nbsp"+data.HEAL+"</label>");
            table.append(tableleft1);
            table.append(tableright1);
            table.append(tableleft2);
            table.append(tableright2);
            table.append(tableleft3);
            table.append(tableright3);
            table.append(tableleft4);
            table.append(tableright4);
            table.append(tableleft5);
            table.append(tableright5);
            table.append(tableleft6);
            table.append(tableright6);
            table.append(tableleft7);
            table.append(tableright7);
            body.append(label1);
            body.append(label2);
            body.append(label3);
            body.append(table);
            body.append(label4);
            body.append(label5);
            tool.infomationFancyDiv(title,body);
        });
    },
    infomationPage_init2:function(){
        $("#water_infomationPage_Content1FooterButton").unbind().click(function(){
            var title="水质质量指数";
            var body=$("<div class='infoFanDivContent'></div>");
            var label1=$("<label class='infoFanDivLabel'>&nbsp&nbsp水质质量指数（water quality index, 简称WQI）是定量描述水质质量状况的无量纲指数。</label>");
            var label2=$("<label class='infoFanDivLabel'>&nbsp&nbsp针对单项污染物规定了水质质量分指数，参与水质质量评价的主要污染物为高锰酸盐指数、总磷、氨氮、溶解氧四项。</label>");
            var label3=$("<label class='infoFanDivTitle'>水质类别</label>");
            var table=$("<div class='infoFanDivTable'></div>");
            var tableleft1=$("<div class='infoFanDivTdLeft'>类别</div>");
            var tableright1=$("<div class='infoFanDivTdRight'>WQI(无量纲)</div>");
            var tableleft2=$("<div class='infoFanDivTdLeft' style='color:#5FBEFF'>I类</div>");
            var tableright2=$("<div class='infoFanDivTdRight'>0~50</div>");
            var tableleft3=$("<div class='infoFanDivTdLeft' style='color:#49B927'>II类</div>");
            var tableright3=$("<div class='infoFanDivTdRight'>51~100</div>");
            var tableleft4=$("<div class='infoFanDivTdLeft' style='color:#E2C20B'>III类</div>");
            var tableright4=$("<div class='infoFanDivTdRight'>101~150</div>");
            var tableleft5=$("<div class='infoFanDivTdLeft' style='color:#FF7200'>IV类</div>");
            var tableright5=$("<div class='infoFanDivTdRight'>151~200</div>");
            var tableleft6=$("<div class='infoFanDivTdLeft' style='color:#CD010D'>V类</div>");
            var tableright6=$("<div class='infoFanDivTdRight'>201~300</div>");
            var tableleft7=$("<div class='infoFanDivTdLeft' style='color:#391813'>劣V类</div>");
            var tableright7=$("<div class='infoFanDivTdRight'>>300</div>");
            table.append(tableleft1);
            table.append(tableright1);
            table.append(tableleft2);
            table.append(tableright2);
            table.append(tableleft3);
            table.append(tableright3);
            table.append(tableleft4);
            table.append(tableright4);
            table.append(tableleft5);
            table.append(tableright5);
            table.append(tableleft6);
            table.append(tableright6);
            table.append(tableleft7);
            table.append(tableright7);
            body.append(label1);
            body.append(label2);
            body.append(label3);
            body.append(table);
            tool.infomationFancyDiv(title,body);
        });
        $(".infomationGasItem").unbind().click(function(){
            var gas=$(this).attr("gas");
            var data=gasDetail[gas];
            var title=data.NAME;
            var body=$("<div class='infoFanDivContent'></div>");
            var label1=$("<label class='infoFanDivTitle'>主要来源</label>");
            var label2=$("<label class='infoFanDivLabel'>&nbsp&nbsp"+data.RES+"</label>");
            var label3=$("<label class='infoFanDivTitle'>浓度限值</label>");
            var table=$("<div class='infoFanDivTable'></div>");
            var tableleft1=$("<div class='infoFanDivTdLeft'>水质质量分指数（IWQI）</div>");
            var tableright1=$("<div class='infoFanDivTdRight'>浓度限值（mg/L）</div>");
            var tableleft2=$("<div class='infoFanDivTdLeft' >0</div>");
            var tableright2=$("<div class='infoFanDivTdRight'>"+data.level1+"</div>");
            var tableleft3=$("<div class='infoFanDivTdLeft' >50</div>");
            var tableright3=$("<div class='infoFanDivTdRight'>"+data.level2+"</div>");
            var tableleft4=$("<div class='infoFanDivTdLeft' >100</div>");
            var tableright4=$("<div class='infoFanDivTdRight'>"+data.level3+"</div>");
            var tableleft5=$("<div class='infoFanDivTdLeft' >150</div>");
            var tableright5=$("<div class='infoFanDivTdRight'>"+data.level4+"</div>");
            var tableleft6=$("<div class='infoFanDivTdLeft' style='color:#99004C'>200</div>");
            var tableright6=$("<div class='infoFanDivTdRight'>"+data.level5+"</div>");
            var tableleft7=$("<div class='infoFanDivTdLeft' style='color:#7E0023'>300</div>");
            var tableright7=$("<div class='infoFanDivTdRight'>"+data.level6+"</div>");
            var tableleft8=$("<div class='infoFanDivTdLeft' style='color:#7E0023'>500</div>");
            var tableright8=$("<div class='infoFanDivTdRight'>"+data.level7+"</div>");
          /*  var label4=$("<label class='infoFanDivTitle'>对健康的影响</label>");
            var label5=$("<label class='infoFanDivLabel'>&nbsp&nbsp"+data.HEAL+"</label>");*/
            table.append(tableleft1);
            table.append(tableright1);
            table.append(tableleft2);
            table.append(tableright2);
            table.append(tableleft3);
            table.append(tableright3);
            table.append(tableleft4);
            table.append(tableright4);
            table.append(tableleft5);
            table.append(tableright5);
            table.append(tableleft6);
            table.append(tableright6);
            table.append(tableleft7);
            table.append(tableright7);
            table.append(tableleft8);
            table.append(tableright8);
            body.append(label1);
            body.append(label2);
            body.append(label3);
            body.append(table);
            // body.append(label4);
            // body.append(label5);
            tool.infomationFancyDiv(title,body);
        });
    }

}

menuFunction.login_init();
