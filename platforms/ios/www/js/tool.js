var scollId="";
var myscroll;
var localCityName="";
var outerWidthForAll;
var isMobile = {
    Android: function() { return navigator.userAgent.match(/Android/i); },
    BlackBerry: function() { return navigator.userAgent.match(/BlackBerry/i); },
    iOS: function() { return navigator.userAgent.match(/iPhone|iPad|iPod/i); },
    Opera: function() { return navigator.userAgent.match(/Opera Mini/i); },
    Windows: function() { return navigator.userAgent.match(/IEMobile/i); },
    any: function() { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); }
};
var tool={
    onDeviceReady:function(){
        // StatusBar.show();
        // StatusBar.overlaysWebView(false);
        // StatusBar.backgroundColorByHexString("#2BC8C6");
    },
    warningAlert:function(addclass,tips){
        $("#warningAlert").removeAttr("class");
        $("#warningAlert").attr("class","warningAlertDiv "+addclass);
        $("#warningAlert").children("span").text(tips);
        $("#warningAlert").show();
        setTimeout(function(){
            $("#warningAlert").animate({"opacity":"0"},1000,function(){
                $("#warningAlert").hide();
                $("#warningAlert").css("opacity","100");
            });
        },3000);
    },
    footerMenuInit:function(id,activeId){
        var div=$("#"+id).find(".footerMenuUl");
        var abnormalCountWarning = parseInt(localStorage.abnormalAirCountWarning) + parseInt(localStorage.abnormalWaterCountWarning);
        div.html("");
        var liwidth=(100/footerMenuData.length).toFixed(2);
        $.each(footerMenuData,function(i,item){
            var ifactive="";
            var activename="";
            if(item.url==activeId){
                ifactive="footerMenuLiActive";
                activename="_select";
            }
            var li=$("<li class='footerMenuLi "+ifactive+"' style='width:"+liwidth+"%' hrefUrl='"+item.url+"'>" +
                "<label class='footerMenuLiLabelImg "+item.url+"_menuIcon"+activename+"'></label>" +
                "<label class='footerMenuLiLabel2'>"+item.name+"</label></li>");
            var showorhide = localStorage.getItem("footerwarning")
            if(item.name=='测管协同'&&abnormalCountWarning>0){
                if(abnormalCountWarning>=100){
                    abnormalCountWarning='99+'
                }
                if(showorhide == '1'){
                    localStorage.setItem("footerwarning",'-1')
                    li=$("<li class='footerMenuLi "+ifactive+"' style='width:"+liwidth+"%' hrefUrl='"+item.url+"'>" +
                        "<label class='footerMenuLiLabelImg "+item.url+"_menuIcon"+activename+"'></label>"+"<div class='footwarningNmb'>"+abnormalCountWarning+"</div>" +
                        "<label class='footerMenuLiLabel2'>"+item.name+"</label></li>");
                }
            }
            div.append(li);
        });
        $(".footerMenuLi").unbind().click(function(){
            var url=$(this).attr("hrefUrl");
            $.mobile.changePage("#"+url);
        });
    },
    loadIscroll:function(){
        if($(scollId).hasClass("alreadyIscroll")){
            try{
                $(scollId).refresh();
            }catch (e){

            }
        }else{
            setTimeout(function () {
                $(scollId).addClass("alreadyIscroll");
                myscroll = new IScroll(scollId,
                    {
                        preventDefault:false,
                        scrollbars: false
                    }
                );
            }, 1000);
        }
    },
    showTheAskDiv:function(content,confirm){
        $("#askContent").children("label").text(content);
        $("#askDivCancelButton").unbind().click(function(){
            $("#askDiv").hide();
        });
        $("#askDivConfirmButton").unbind().click(function(){
            eval(confirm);
            $("#askDiv").hide();
        });
        $("#askDiv").show();
    },
    mapAddStyle:function (element) {
        var styleJson = [
            {
                "featureType": "highway",
                "elementType": "all",
                "stylers": {
                    "color": "#ffffff",
                    "hue": "#ffffff",
                    "weight": "0.1",
                    "lightness": -97,
                    "saturation": -100,
                    "visibility": "off"
                }
            },
            {
                "featureType": "district",
                "elementType": "all",
                "stylers": {
                    "color":"#fff",
                    "backgroundColor":"#5496D1"
                }
            },
            {
                "featureType": "road",
                "elementType": "all",
                "stylers": {
                    //"color": "#ffffff",
                    "visibility": "off"
                }
            }
        ];
        element.setMapStyle({styleJson:styleJson});
    },
    mapSetFreshZoom:function (map,obj,zoomIndex) {
        var defaultData = {
            six:{lngmax:114,lngmin:90,latmax:44,latmin:15},
            seven:{lngmax:114,lngmin:90,latmax:44,latmin:16}
        };
        var sixData = defaultData.six;
        var sevenData = defaultData.seven;
        if (zoomIndex<=6){
            if(obj.lngmax>sixData.lngmax || obj.lngmin<sixData.lngmin || obj.latmax>sixData.latmax || obj.latmin<sixData.latmin){
                var pointIndex = new BMap.Point(102.5,30);
                map.centerAndZoom(pointIndex,6)
            }
        }else {
            if(obj.lngmax>sevenData.lngmax || obj.lngmin<sevenData.lngmin || obj.latmax>sevenData.latmax || obj.latmin<sevenData.latmin){
                var pointIndex = new BMap.Point(102.46,30.84);
                map.centerAndZoom(pointIndex,zoomIndex)
            }
        }
    },
    mapAddMark:function(map,markDetail,functionName,type,station,index){
        var p0 = markDetail.POINT.split("|")[0];
        var p1 = markDetail.POINT.split("|")[1];
        var point = new BMap.Point(p0,p1);
        var iconImg=new BMap.Icon("img/icon/blanknew.png", new BMap.Size(1,1));
        var opacitys = 1;
        var marker = new BMap.Marker(point,{icon:iconImg}),
            name = "",
            widths = "8px",
            heights = "8px",
            position = "absolute",
            borderRadius = "4px",
            top = 0;
            line_height="16px";
        if(index>=7){
            $("#indexGasChangeBar").fadeIn(800)
            name = markDetail.VALUE?markDetail.VALUE:"—";
            position = "relative";
            widths = "30px";
            heights = "16px";
            top = "-28px";
        }
        // console.log(markDetail)

        // console.log(markDetail.COLOR)
        if(station=='city'){
            var background = station=="village"?"url('img/bgicon/"+markDetail.COLOR.bg+".png') no-repeat":markDetail.COLOR.color;
            var borderColor = station=="village"?"transparent":"#fff";
        }else if(station=='country'){
            var counryorcity = markDetail.CITYCODE.split("")[4];
            counryorcity!=='A'? background = "url('img/bgicon/"+markDetail.COLOR.bg+".png') no-repeat":markDetail.COLOR.color;
            counryorcity!=='A'? borderColor="transparent": borderColor="#fff";
            if(markDetail.type=='country'){
                background=markDetail.COLOR.color;
                borderColor="#fff";
            }else if(markDetail.type=='province'){
                background=markDetail.COLOR.color;
                borderColor="#fff";
                borderRadius="18px";
                widths="32px";
            }else if(markDetail.type=='village'){
                background="url('img/bgicon/"+markDetail.COLOR.bg+".png') no-repeat";
                borderColor="transparent";
                widths = "40px";
                heights = "18px";
                line_height="18px";
            }

            // if(counryorcity!=='A') {
            //     widths = "40px";
            //     heights = "18px";
            //     line_height="18px";
            // }
        }
        if(station=="management"){
            opacitys = 0;
            widths = "0px";
            heights = "0px";
        }
        if(index<7){
            $("#indexGasChangeBar").fadeOut(800)
            name="";
            widths = "8px";
            heights = "8px";
            borderRadius = "8px";
        }
        var label = new BMap.Label(name,{"offset":new BMap.Size(0.0)});
        marker.setLabel(label);
        map.addOverlay(marker);
        label.setStyle({
            opacity:opacitys,
            borderColor:borderColor,
            display:"block",
            width:widths,
            height:heights,
            color:"#fff",
            background:background,
            cursor:"pointer",
            borderRadius:borderRadius,
            fontWeight:"normal",
            fontSize:"12px",
            lineHeight:line_height,
            textAlign:"center",
            position:position,
            backgroundSize:"100% 100%",
            top:top
        });
        (function(){
            var _iw = tool.createInfoWindow(markDetail,functionName,station,index);
            if(index<=6){
                return
            }
            var _marker = marker;
            _marker.addEventListener("click",function(){
                this.openInfoWindow(_iw);
            });
            label.addEventListener("click",function(){
                _marker.openInfoWindow(_iw);
            });
        })()
    },
    watermapAddMark:function(map,markDetail,functionName,site,index){
        var type =  localStorage.getItem("watertypeChoose")
        var p0 = markDetail.POINT.split("|")[0];
        var p1 = markDetail.POINT.split("|")[1];
        var point = new BMap.Point(p0,p1);
        var background = markDetail.COLOR;
        var borderColor = "#fff";
        var iconImg=new BMap.Icon("img/icon/blanknew.png", new BMap.Size(1,1));
        var opacitys = 1;
        var marker = new BMap.Marker(point,{icon:iconImg}),
            name = "",
            widths = "4px",
            heights = "4px",
            position = "absolute",
            borderRadius = "50%",
            lineheight = '4px',
            left=0,
            top = 0;
        if(index>=7){
            position = "relative";
            widths = "7px";
            heights = "7px";
            // top = "-28px";
        }

        if(markDetail.waterdetail){
            widths="15px";
            heights = "15px"
        }

        widths = "36px";
        heights = "18px";
        borderRadius = "14px";
        lineheight = "18px";
        left="-14px";
        if(type=='type'){
            (markDetail.WQI_INDEX==null||markDetail.WQI_INDEX==undefined)?name='一':name=markDetail.WQI_INDEX;
        }else{
            (markDetail.Value==null||markDetail.Value==undefined||markDetail.Value=='NA')?name='一':name=markDetail.Value;
        }
        if(markDetail.WATERSTATION!=='Y'){
            widths = "40px";
            heights = "20px";
            lineheight = "20px";
            background = tool.otherwaterStationBg(markDetail.COLOR)
            borderColor = "transparent";
        }

        var label = new BMap.Label(name,{"offset":new BMap.Size(0.0)});
        marker.setLabel(label);
        map.addOverlay(marker);
        label.setStyle({
            opacity:opacitys,
            borderColor:borderColor,
            display:"block",
            width:widths,
            height:heights,
            color:"#fff",
            background:background,
            cursor:"pointer",
            borderRadius:borderRadius,
            fontWeight:"normal",
            fontSize:"12px",
            lineHeight:lineheight,
            textAlign:"center",
            position:position,
            backgroundSize:"100% 100%",
            padding:'1px',
            left:left,
            top:top
        });
        (function(){
            var _iw = tool.createInfoWindow(markDetail,functionName,"",index);
            if(index<=6){
                return
            }
            var _marker = marker;
            _marker.addEventListener("click",function(){
                this.openInfoWindow(_iw);
            });
            label.addEventListener("click",function(){
                _marker.openInfoWindow(_iw);
            });
        })()
    },
    createInfoWindow:function (item,functionName,type){
        var maptype = localStorage.getItem("maptype");
        if(maptype=='air'){
            var city = item.CITY;
            // console.log(city)
            // console.log(item)
            // console.log(type)
            if(item.CITY == null || item.CITY == undefined){
                city = '';
            }
            if(type=="city"){
                // console.log(type)
                if(item.CITYNAME.length>2){
                    var iw = new BMap.InfoWindow("<div class='iw_poi_titlecity2' title='"+item.CITYNAME+"' onclick='"+functionName+"'>"+city+item.CITYNAME+"</div><div class='iw_poi_contentcity1' onclick='"+functionName+"'><i class='iconApp-Warning'></i></div>")
                }else{
                    var iw = new BMap.InfoWindow("<div class='iw_poi_titlecity1' title='"+item.CITYNAME+"' onclick='"+functionName+"'>"+city+item.CITYNAME+"</div><div class='iw_poi_contentcity1' onclick='"+functionName+"'><i class='iconApp-Warning'></i></div>")
                }
            }else{
                var name = item.CITYNAME //CITY为所在市州的市州名  CITYNAME为站点名 COUNTYNAME为省控农村站名
                // if(item.COUNTYNAME){
                //     var  name = item.COUNTYNAME;
                // }else{
                //     // var name = item.CITY      CITY为所在市州的市州名  CITYNAME为站点名 COUNTYNAME为省控农村站名
                //     var name = item.CITYNAME
                // }
                // console.log(name)
                // console.log(item.CITYNAME)
                var iw = new BMap.InfoWindow("<b class='iw_poi_titlecity3' title='"+item.CITYNAME+"' onclick='"+functionName+"'>"+city+item.CITYNAME+"</b><div class='iw_poi_content' onclick='"+functionName+"'><i class='iconApp-Warning'></i></div>");
                if(item.CITYNAME.length<=3){
                    var iw = new BMap.InfoWindow("<div class='iw_poi_titlecity5' title='"+item.CITYNAME+"' onclick='"+functionName+"'>"+name+"</div><div class='iw_poi_contentcity1' onclick='"+functionName+"'><i class='iconApp-Warning'></i></div>");
                }
                else if(item.CITYNAME.length==4){
                    var iw = new BMap.InfoWindow("<div class='iw_poi_titlecity4' title='"+item.CITYNAME+"' onclick='"+functionName+"'>"+name+"</div><div class='iw_poi_contentcity1' onclick='"+functionName+"'><i class='iconApp-Warning'></i></div>");
                }else if(item.CITYNAME.length>=5){
                    var iw = new BMap.InfoWindow("<b class='iw_poi_titlecity3' title='"+item.CITYNAME+"' onclick='"+functionName+"'>"+name+"</b><div class='iw_poi_content' onclick='"+functionName+"'><i class='iconApp-Warning'></i></div>");
                }
                // var iw = new BMap.InfoWindow("<div class='iw_poi_titlecity4' title='"+item.CITYNAME+"' onclick='"+functionName+"'>"+name+"</div><div class='iw_poi_contentcity1' onclick='"+functionName+"'><i class='iconApp-Warning'></i></div>");
            }
        }else if(maptype=='water'){
            var iw = new BMap.InfoWindow("<b class='iw_poi_title' title='"+item.CITY+"' onclick='"+functionName+"'>"+item.CITY+"</b><div class='iw_poi_content' onclick='"+functionName+"'><i class='iconApp-Warning'></i></div>");
        }else{

        }
        return iw;
    },
    mapForePubAddMark:function(map,markDetail){
        var p0 = markDetail.POINT.split("|")[0];
        var p1 = markDetail.POINT.split("|")[1];
        var point = new BMap.Point(p0,p1);
        var iconImg=new BMap.Icon("img/icon/blank.png", new BMap.Size(1,1));
        var marker = new BMap.Marker(point,{icon:iconImg});
        var label = new BMap.Label("",{"offset":new BMap.Size(0.0)});
        marker.setLabel(label);
        map.addOverlay(marker);
        label.setStyle({
            border:"0px",
            color:"#fff",
            background:"-webkit-gradient(linear, 0% 50%, 100% 50%, from("+markDetail.COLOR1+"), color-stop(0.49, "+markDetail.COLOR1+"), color-stop(0.51, "+markDetail.COLOR2+"), to("+markDetail.COLOR2+"))",
            cursor:"pointer",
            borderRadius:"50%",
            width:"15px",
            height:"15px"
        });
    },
    levelReturn:function(type,value){
        if(value=="—" || value=="-" || value==null || value==""){
            return "0";
        }else{
            value=parseFloat(value);
            switch(type){
                case "AQI":
                    if(value>=0 && value<=50){
                        return "1";
                    }else if(value>50 && value<=100){
                        return "2";
                    }else if(value>100 && value<=150){
                        return "3";
                    }else if(value>150 && value<=200){
                        return "4";
                    }else if(value>200 && value<=300){
                        return "5";
                    }else if(value>300){
                        return "6";
                    }
                    break;
                case "SO2":
                    if(value>=0 && value<=50){
                        return "1";
                    }else if(value>50 && value<=150){
                        return "2";
                    }else if(value>150 && value<=475){
                        return "3";
                    }else if(value>475 && value<=800){
                        return "4";
                    }else if(value>800 && value<=1600){
                        return "5";
                    }else if(value>1600){
                        return "6";
                    }
                    break;
                case "NO2":
                    if(value>=0 && value<=40){
                        return "1";
                    }else if(value>40 && value<=80){
                        return "2";
                    }else if(value>80 && value<=180){
                        return "3";
                    }else if(value>180 && value<=280){
                        return "4";
                    }else if(value>280 && value<=565){
                        return "5";
                    }else if(value>565){
                        return "6";
                    }
                    break;
                case "CO":
                    if(value>=0 && value<=2){
                        return "1";
                    }else if(value>2 && value<=4){
                        return "2";
                    }else if(value>4 && value<=14){
                        return "3";
                    }else if(value>14 && value<=24){
                        return "4";
                    }else if(value>24 && value<=36){
                        return "5";
                    }else if(value>36){
                        return "6";
                    }
                    break;
                case "O3":
                    if(value>=0 && value<=100){
                        return "1";
                    }else if(value>100 && value<=160){
                        return "2";
                    }else if(value>160 && value<=215){
                        return "3";
                    }else if(value>215 && value<=265){
                        return "4";
                    }else if(value>265 && value<=800){
                        return "5";
                    }else if(value>800){
                        return "6";
                    }
                    break;
                case "PM10":
                    if(value>=0 && value<=50){
                        return "1";
                    }else if(value>50 && value<=150){
                        return "2";
                    }else if(value>150 && value<=250){
                        return "3";
                    }else if(value>250 && value<=350){
                        return "4";
                    }else if(value>350 && value<=420){
                        return "5";
                    }else if(value>420){
                        return "6";
                    }
                    break;
                case "PM2_5":
                    if(value>=0 && value<=35){
                        return "1";
                    }else if(value>35 && value<=75){
                        return "2";
                    }else if(value>75 && value<=115){
                        return "3";
                    }else if(value>115 && value<=150){
                        return "4";
                    }else if(value>150 && value<=250){
                        return "5";
                    }else if(value>250){
                        return "6";
                    }
                    break;
            }
        }
    },
    levelColor:function(level){
        switch(level){
            case "0":
                return {color:"#bec2c9",bg:"0"};
                break;
            case "1":
                return {color:"#54db7d",bg:"1"};
                break;
            case "2":
                return {color:"#f1ca30",bg:"2"};
                break;
            case "3":
                return {color:"#ff952e",bg:"3"};
                break;
            case "4":
                return {color:"#e22935",bg:"4"};
                break;
            case "5":
                return {color:"#9d2f5e",bg:"5"};
                break;
            case "6":
                return {color:"#5c251e",bg:"6"};
                break;
        }
    },
    waterlevelColor:function(level){
        switch(level){
            case "I类":
                return "#5FBEFF";
                break;
            case "II类":
                return "#54db7d";
                break;
            case "III类":
                return "#f1ca30";
                break;
            case "IV类":
                return "#ff952e";
                break;
            case "V类":
                return "#e22935";
                break;
            case "劣V类":
                return "#5c251e";
                break;
            default:
                return "#bec2c9";
                break;
        }
    },
    waterlevelReturn:function(level){
        switch(level){
            case "I类":
                return "rgba(99,191,255,0.2)";
                break;
            case "II类":
                return "rgba(84,219,125,0.2)";
                break;
            case "III类":
                return "rgba(241,202,48,0.2)";
                break;
            case "IV类":
                return "rgba(255,149,46,0.2)";
                break;
            case "V类":
                return "rgba(226,41,53,0.2)";
                break;
            case "劣V类":
                return "rgba(92,37,30,0.2)";
                break;
            default:
                return "rgba(190,194,201,0.2)";
                break;
        }
    },
    otherwaterStationBg:function(color){
        switch(color){
            case "#5FBEFF":
                return "url('img/bgicon/I.png') no-repeat";
                break;
            case "#54db7d":
                return "url('img/bgicon/II.png') no-repeat";
                break;
            case "#f1ca30":
                return "url('img/bgicon/III.png') no-repeat";
                break;
            case "#ff952e":
                return "url('img/bgicon/IV.png') no-repeat";
                break;
            case "#e22935":
                return "url('img/bgicon/V.png') no-repeat";
                break;
            case "#5c251e":
                return "url('img/bgicon/lieV.png') no-repeat";
                break;
            default:
                return "url('img/bgicon/NOE.png') no-repeat";
                break;
        }
    },
    levelColorBackCity:function(level){
        switch(level){
            case "0":
                return "rgba(167,167,167,0.2)";
                break;
            case "1":
                return "rgba(111,197,71,0.2)";
                break;
            case "2":
                return "rgba(253,198,30,0.2)";
                break;
            case "3":
                return "rgba(255,126,0,0.2)";
                break;
            case "4":
                return "rgba(255,0,0,0.2)";
                break;
            case "5":
                return "rgba(153,0,76,0.2)";
                break;
            case "6":
                return "rgba(126,0,35,0.2)";
                break;
        }
    },
    hideTheProvinceOnly:function(){
        if(localStorage.code!="5100"){
            $(".provinceOnly").hide();
        }else{
            $(".provinceOnly").show();
        }
    },
    changeIframeAllScreen:function(){
        var outerHeight=$("#login").outerHeight();
        return (outerHeight-40);
    },
    levelColorBack:function(level){
        switch(level){
            case "离线":
                return "color:rgb(167,167,167)";
                break;
            case "优":
                return "color:#6FC547";
                break;
            case "良":
                return "color:#fdc61e";
                break;
            case "轻度污染":
                return "color:#FF7E00";
                break;
            case "中度污染":
                return "color:#FF0000";
                break;
            case "重度污染":
                return "color:#99004C";
                break;
            case "严重污染":
                return "color:#7E0023";
                break;
        }
    },
    toFixed: function(number,fractionDigits){
        var times = Math.pow(10, fractionDigits);
        var roundNum = Math.round(number * times) / times;
        return roundNum.toFixed(fractionDigits);
    },
    auditTdMark:function(td,mark){
        if(mark!=""){
            td.attr("style","background-color:#93dd69");
            var markArr=mark.split(",");
            for(var i=0;i<markArr.length;i++){
                if(markArr[i]=="H" || markArr[i]=="RM"){
                    td.attr("style","background-color:#ffaaaa");
                }
            }
        }
    },
    showTheAuditAskDiv:function(title,content,confirm,confirmname){
        $("#auditAskContentTitle").text(title);
        $("#auditAskDivConfirmButton").text(confirmname);
        $("#auditAskContentBody").html("");
        $("#auditAskContentBody").append(content);
        $("#auditAskDivCancelButton").unbind().click(function(){
            $("#auditAskDiv").hide();
        });
        $("#auditAskDivConfirmButton").unbind().click(function(){
            eval(confirm);
        });
        $("#auditAskDiv").show();
    },
    showTheAuditWorkAskDiv:function(title,content,confirm){
        $("#auditWorkAskContentTitle").text(title);
        $("#auditWorkAskContentBody").html("");
        $("#auditWorkAskContentBody").append(content);
        $("#auditWorkAskDivCancelButton").unbind().click(function(){
            $("#auditWorkAskDiv").hide();
        });
        $("#auditWorkAskDivConfirmButton").unbind().click(function(){
            menuFunction.confirmAudit();
            $("#auditWorkAskDiv").hide();
        });
        $("#auditWorkAskDiv").show();
    },
    /*分指数计算*/
    IAQICal:function(gasType,data){
        if(data=="" || data==null){
            return "";
        }
        data=parseFloat(data);
        var High=0;
        var Low=0;
        var HighAQI=0;
        var LowAQI=0;
        if(gasType=="so2"){
            if(data>=0 && data<=50){
                High=50;
                Low=0;
                HighAQI=50;
                LowAQI=0;
            }else if(data>50 && data<=150){
                High=150;
                Low=50;
                HighAQI=100;
                LowAQI=50;
            }else if(data>150 && data<=475){
                High=475;
                Low=150;
                HighAQI=150;
                LowAQI=100;
            }else if(data>475 && data<=800){
                High=800;
                Low=475;
                HighAQI=200;
                LowAQI=150;
            }else if(data>800 && data<=1600){
                High=1600;
                Low=800;
                HighAQI=300;
                LowAQI=200;
            }else if(data>1600 && data<=2100){
                High=2100;
                Low=1600;
                HighAQI=400;
                LowAQI=300;
            }else if(data>2100 && data<=2620){
                High=2620;
                Low=2100;
                HighAQI=500;
                LowAQI=400;
            }else if(data>2620){
                return "-";
            }else{
                return "-";
            }
        }else if(gasType=="no2"){
            if(data>=0 && data<=40){
                High=40;
                Low=0;
                HighAQI=50;
                LowAQI=0;
            }else if(data>40 && data<=80){
                High=80;
                Low=40;
                HighAQI=100;
                LowAQI=50;
            }else if(data>80 && data<=180){
                High=180;
                Low=80;
                HighAQI=150;
                LowAQI=100;
            }else if(data>180 && data<=280){
                High=280;
                Low=180;
                HighAQI=200;
                LowAQI=150;
            }else if(data>280 && data<=565){
                High=565;
                Low=280;
                HighAQI=300;
                LowAQI=200;
            }else if(data>565 && data<=750){
                High=750;
                Low=565;
                HighAQI=400;
                LowAQI=300;
            }else if(data>750 && data<=940){
                High=940;
                Low=750;
                HighAQI=500;
                LowAQI=400;
            }else if(data>940){
                return "-";
            }else{
                return "-";
            }
        }else if(gasType=="pm10"){
            if(data>=0 && data<=50){
                High=50;
                Low=0;
                HighAQI=50;
                LowAQI=0;
            }else if(data>50 && data<=150){
                High=150;
                Low=50;
                HighAQI=100;
                LowAQI=50;
            }else if(data>150 && data<=250){
                High=250;
                Low=150;
                HighAQI=150;
                LowAQI=100;
            }else if(data>250 && data<=350){
                High=350;
                Low=250;
                HighAQI=200;
                LowAQI=150;
            }else if(data>350 && data<=420){
                High=420;
                Low=350;
                HighAQI=300;
                LowAQI=200;
            }else if(data>420 && data<=500){
                High=500;
                Low=420;
                HighAQI=400;
                LowAQI=300;
            }else if(data>500 && data<=600){
                High=600;
                Low=500;
                HighAQI=500;
                LowAQI=400;
            }else if(data>600){
                return "-";
            }else{
                return "-";
            }
        }else if(gasType=="co"){
            if(data>=0 && data<=2){
                High=2;
                Low=0;
                HighAQI=50;
                LowAQI=0;
            }else if(data>2 && data<=4){
                High=4;
                Low=2;
                HighAQI=100;
                LowAQI=50;
            }else if(data>4 && data<=14){
                High=14;
                Low=4;
                HighAQI=150;
                LowAQI=100;
            }else if(data>14 && data<=24){
                High=24;
                Low=14;
                HighAQI=200;
                LowAQI=150;
            }else if(data>24 && data<=36){
                High=36;
                Low=24;
                HighAQI=300;
                LowAQI=200;
            }else if(data>36 && data<=48){
                High=48;
                Low=36;
                HighAQI=400;
                LowAQI=300;
            }else if(data>48 && data<=60){
                High=60;
                Low=48;
                HighAQI=500;
                LowAQI=400;
            }else if(data>60){
                return "-";
            }else{
                return "-";
            }
        }else if(gasType=="o3"){
            if(data>=0 && data<=100){
                High=100;
                Low=0;
                HighAQI=50;
                LowAQI=0;
            }else if(data>100 && data<=160){
                High=160;
                Low=100;
                HighAQI=100;
                LowAQI=50;
            }else if(data>160 && data<=215){
                High=215;
                Low=160;
                HighAQI=150;
                LowAQI=100;
            }else if(data>215 && data<=265){
                High=265;
                Low=215;
                HighAQI=200;
                LowAQI=150;
            }else if(data>265 && data<=800){
                High=800;
                Low=265;
                HighAQI=300;
                LowAQI=200;
            }else if(data>800){
                return "-";
            }else{
                return "-";
            }
        }else if(gasType=="pm2_5"){
            if(data>=0 && data<=35){
                High=35;
                Low=0;
                HighAQI=50;
                LowAQI=0;
            }else if(data>35 && data<=75){
                High=75;
                Low=35;
                HighAQI=100;
                LowAQI=50;
            }else if(data>75 && data<=115){
                High=115;
                Low=75;
                HighAQI=150;
                LowAQI=100;
            }else if(data>115 && data<=150){
                High=150;
                Low=115;
                HighAQI=200;
                LowAQI=150;
            }else if(data>150 && data<=250){
                High=250;
                Low=150;
                HighAQI=300;
                LowAQI=200;
            }else if(data>250 && data<=350){
                High=350;
                Low=250;
                HighAQI=400;
                LowAQI=300;
            }else if(data>350 && data<=500){
                High=500;
                Low=350;
                HighAQI=500;
                LowAQI=400;
            }else if(data>500){
                return "-";
            }else{
                return "-";
            }
        }
        data=(HighAQI-LowAQI)*(data-Low)/(High-Low)+LowAQI;
        return Math.ceil(data);
    },
    /*小时分指数计算*/
    IAQIHourCal:function(gasType,data){
        if(data=="" || data==null){
            return "";
        }
        data=parseFloat(data);
        var High=0;
        var Low=0;
        var HighAQI=0;
        var LowAQI=0;
        if(gasType=="so2"){
            if(data>=0 && data<=150){
                High=150;
                Low=0;
                HighAQI=150;
                LowAQI=0;
            }else if(data>150 && data<=500){
                High=500;
                Low=150;
                HighAQI=100;
                LowAQI=50;
            }else if(data>500 && data<=650){
                High=650;
                Low=500;
                HighAQI=150;
                LowAQI=100;
            }else if(data>650 && data<=800){
                High=800;
                Low=650;
                HighAQI=200;
                LowAQI=150;
            }else if(data>800 && data<=1600){
                High=1600;
                Low=800;
                HighAQI=300;
                LowAQI=200;
            }else if(data>1600 && data<=2100){
                High=2100;
                Low=1600;
                HighAQI=400;
                LowAQI=300;
            }else if(data>2100 && data<=2620){
                High=2620;
                Low=2100;
                HighAQI=500;
                LowAQI=400;
            }else if(data>2620){
                return "-";
            }else{
                return "-";
            }
        }else if(gasType=="no2"){
            if(data>=0 && data<=100){
                High=100;
                Low=0;
                HighAQI=50;
                LowAQI=0;
            }else if(data>100 && data<=200){
                High=200;
                Low=100;
                HighAQI=100;
                LowAQI=50;
            }else if(data>200 && data<=700){
                High=700;
                Low=200;
                HighAQI=150;
                LowAQI=100;
            }else if(data>700 && data<=1200){
                High=1200;
                Low=700;
                HighAQI=200;
                LowAQI=150;
            }else if(data>1200 && data<=2340){
                High=2340;
                Low=1200;
                HighAQI=300;
                LowAQI=200;
            }else if(data>2340 && data<=3090){
                High=3090;
                Low=2340;
                HighAQI=400;
                LowAQI=300;
            }else if(data>3090 && data<=3840){
                High=3840;
                Low=3090;
                HighAQI=500;
                LowAQI=400;
            }else if(data>3840){
                return "-";
            }else{
                return "-";
            }
        }else if(gasType=="pm10"){
            if(data>=0 && data<=50){
                High=50;
                Low=0;
                HighAQI=50;
                LowAQI=0;
            }else if(data>50 && data<=150){
                High=150;
                Low=50;
                HighAQI=100;
                LowAQI=50;
            }else if(data>150 && data<=250){
                High=250;
                Low=150;
                HighAQI=150;
                LowAQI=100;
            }else if(data>250 && data<=350){
                High=350;
                Low=250;
                HighAQI=200;
                LowAQI=150;
            }else if(data>350 && data<=420){
                High=420;
                Low=350;
                HighAQI=300;
                LowAQI=200;
            }else if(data>420 && data<=500){
                High=500;
                Low=420;
                HighAQI=400;
                LowAQI=300;
            }else if(data>500 && data<=600){
                High=600;
                Low=500;
                HighAQI=500;
                LowAQI=400;
            }else if(data>600){
                return "-";
            }else{
                return "-";
            }
        }else if(gasType=="co"){
            if(data>=0 && data<=5){
                High=5;
                Low=0;
                HighAQI=50;
                LowAQI=0;
            }else if(data>5 && data<=10){
                High=10;
                Low=5;
                HighAQI=100;
                LowAQI=50;
            }else if(data>10 && data<=35){
                High=35;
                Low=10;
                HighAQI=150;
                LowAQI=100;
            }else if(data>35 && data<=60){
                High=60;
                Low=35;
                HighAQI=200;
                LowAQI=150;
            }else if(data>60 && data<=90){
                High=90;
                Low=60;
                HighAQI=300;
                LowAQI=200;
            }else if(data>90 && data<=120){
                High=120;
                Low=90;
                HighAQI=400;
                LowAQI=300;
            }else if(data>120 && data<=150){
                High=150;
                Low=120;
                HighAQI=500;
                LowAQI=400;
            }else if(data>150){
                return "-";
            }else{
                return "-";
            }
        }else if(gasType=="o3"){
            if(data>=0 && data<=160){
                High=160;
                Low=0;
                HighAQI=50;
                LowAQI=0;
            }else if(data>160 && data<=200){
                High=200;
                Low=160;
                HighAQI=100;
                LowAQI=50;
            }else if(data>200 && data<=300){
                High=300;
                Low=200;
                HighAQI=150;
                LowAQI=100;
            }else if(data>300 && data<=400){
                High=400;
                Low=300;
                HighAQI=200;
                LowAQI=150;
            }else if(data>400 && data<=800){
                High=800;
                Low=400;
                HighAQI=300;
                LowAQI=200;
            }else if(data>800 && data<=1000){
                High=1000;
                Low=800;
                HighAQI=400;
                LowAQI=300;
            }else if(data>1000 && data<=1200){
                High=1200;
                Low=1000;
                HighAQI=500;
                LowAQI=400;
            }else if(data>1200){
                return "-";
            }else{
                return "-";
            }
        }else if(gasType=="pm2_5"){
            if(data>=0 && data<=35){
                High=35;
                Low=0;
                HighAQI=50;
                LowAQI=0;
            }else if(data>35 && data<=75){
                High=75;
                Low=35;
                HighAQI=100;
                LowAQI=50;
            }else if(data>75 && data<=115){
                High=115;
                Low=75;
                HighAQI=150;
                LowAQI=100;
            }else if(data>115 && data<=150){
                High=150;
                Low=115;
                HighAQI=200;
                LowAQI=150;
            }else if(data>150 && data<=250){
                High=250;
                Low=150;
                HighAQI=300;
                LowAQI=200;
            }else if(data>250 && data<=350){
                High=350;
                Low=250;
                HighAQI=400;
                LowAQI=300;
            }else if(data>350 && data<=500){
                High=500;
                Low=350;
                HighAQI=500;
                LowAQI=400;
            }else if(data>500){
                return "-";
            }else{
                return "-";
            }
        }
        data=(HighAQI-LowAQI)*(data-Low)/(High-Low)+LowAQI;
        return Math.ceil(data);
    },
    calAQIRange_New:function(iaqi){
        if (isNaN(iaqi)) {
            return["",""]};
        iaqi=parseInt(iaqi);
        var level=tool.getAQILevel(iaqi);
        var factor=parseInt(eval("forecastRange.other[level]"));

        var aqiLow=iaqi-factor;
        var aqiHigh=iaqi+factor;
        if (aqiLow<=0) {
            aqiLow=1;
        };
        return [aqiLow,aqiHigh];
    },
    getAQILevel:function(data){
        if (data>0&&data<=50) {
            return 0;
        }else if (data<=100) {
            return 1;
        }else if (data<=150) {
            return 2;
        }else if (data<=200) {
            return 3;
        }else if (data<=300) {
            return 4;
        }else if (data<=400) {
            return 5;
        }else if (data<=500) {
            return 6;
        }else {
            return 7;
        }
    },
    genqualityTD:function(val1,val2,$td){
        var num=$td.attr("num");
        if (val1==""||val2=="") {
            $td.text("");
        }else{
            var level1=tool.getAQILevel(val1);
            var level2=tool.getAQILevel(val2);
            if (level1>level2) {
                $td.text("");
            }else{
                var qua1=forecastPersonal.getquality(level1);
                var qua2=forecastPersonal.getquality(level2);
                if (qua1==qua2) {
                    $td.text(qua1);
                }else{
                    if(qua1.indexOf("优",0)>-1){
                        $td.text(qua1+"或"+qua2);
                    }else{
                        $td.text(qua1+"至"+qua2);
                    }
                }
            }
        }
    },
    PM2_5Calc:function(data){
        if(data=="" || data==null){
            return "";
        }
        data=parseFloat(data);
        var High=0;
        var Low=0;
        var HighAQI=0;
        var LowAQI=0;
        if(data>=0 && data<=50){
            High=35;
            Low=0;
            HighAQI=50;
            LowAQI=0;
        }else if(data>50 && data<=100){
            High=75;
            Low=35;
            HighAQI=100;
            LowAQI=50;
        }else if(data>100 && data<=150){
            High=115;
            Low=75;
            HighAQI=150;
            LowAQI=100;
        }else if(data>150 && data<=200){
            High=150;
            Low=115;
            HighAQI=200;
            LowAQI=150;
        }else if(data>200 && data<=300){
            High=250;
            Low=150;
            HighAQI=300;
            LowAQI=200;
        }else if(data>300 && data<=400){
            High=350;
            Low=250;
            HighAQI=400;
            LowAQI=300;
        }else if(data>400 && data<=500){
            High=500;
            Low=350;
            HighAQI=500;
            LowAQI=400;
        }else if(data>500){
            return "-";
        }

        data=(data-LowAQI)*(High-Low)/(HighAQI-LowAQI)+Low;
        return Math.round(data);
    },
    genPM2_5:function(val1,val2,num){
        var val=(parseInt(val1)+parseInt(val2))/2;
        var valc=Math.ceil(parseInt(val));

        val=tool.PM2_5Calc(val);

        $("#table_personal").find("tr[type='aqi_pm2_5']").eq(num-1).children("td[num='"+num+"']").text(val);
        $("#pm2_5Conc"+num).val(val);
    },
    isToday:function(date){
        var today=new Date();
        return today.getFullYear()==date.getFullYear()&&today.getMonth()==date.getMonth()&&today.getDate()==date.getDate();
    },
    publishNotAuditTime:function(indexTime){
        var timeMonth="";
        if(indexTime.getMonth()<9){
            timeMonth="0"+(indexTime.getMonth()+1);
        }else{
            timeMonth=(indexTime.getMonth()+1);
        }
        var timeDay="";
        if(indexTime.getDate()<10){
            timeDay="0"+indexTime.getDate();
        }else{
            timeDay=indexTime.getDate();
        }
        var timeHour="";
        if(indexTime.getHours()<9){
            timeHour="0"+indexTime.getHours();
        }else{
            timeHour=indexTime.getHours();
        }
        var timeMinute="";
        if(indexTime.getMinutes()<9){
            timeMinute="0"+indexTime.getMinutes();
        }else{
            timeMinute=indexTime.getMinutes();
        }

        return indexTime.getFullYear()+"-"+timeMonth+"-"+timeDay+" "+timeHour+":"+timeMinute;
    },
    topRightMenu:function(pageid){
        $("#"+pageid).find(".sharePop_shareThisPage").unbind().click(function(){
            $(this).parent().popup("close");
            $("#shareFancyDivContent").stop().animate({"bottom":"0px"},300);
            $("#shareFancyDiv").show();
            $("#shareFancyDivBack").unbind().click(function(){
                $("#shareFancyDivContent").stop().animate({"bottom":"-310px"},300);
                $("#shareFancyDiv").hide();
            });
            $("#cancelTheShareDiv").unbind().click(function(){
                $("#shareFancyDivContent").stop().animate({"bottom":"-310px"},300);
                $("#shareFancyDiv").hide();
            });
        });
        $("#"+pageid).find(".sharePop_settingThisPage").unbind().click(function(){
            $.mobile.changePage("#settingPage");
        });
        $("#"+pageid).find(".sharePop_messageThisPage").unbind().click(function(){
            $.mobile.changePage("#infomationPage");
        });
    },
    infomationFancyDiv:function(title,body){
        $("#infomationFancyDivContentHeadTitle").html(title);
        $("#infomationFancyDivContentBody").html("");
        $("#infomationFancyDivContentBody").append(body);
        $("#infomationFancyDiv").show();
        var marginTop=($("#login").outerHeight()-$("#infomationFancyDivContent").outerHeight())/2;
        $("#infomationFancyDivContent").css("margin-top",marginTop);
        $("#infomationFancyDivBack").unbind().click(function(){
            $("#infomationFancyDiv").hide();
        });
        $("#infomationFancyDivContentHeadCloseButton").unbind().click(function(){
            $("#infomationFancyDiv").hide();
        });
    },
    getCityByIP:function(rs) {
        var cityName = rs.name;
        localCityName=cityName;
    },
    getCityGeolocation:function(){
    },
    localCityWorkForSichuan:function(localCityName){
        var flag=false;
        var code="";
        $.each(cityMapDetail,function(i,item){
            if(localCityName.search(item.cityName)!=-1){
                flag=true;
                code=item.cityCode;
            }
        });
        if(flag){
            return code;
        }else{
            return "5100";
        }
    },
    ifSameDay:function(f1,f2){
        var time1=new Date(f1);
        var time2=new Date(f2);
        if(time1.getDate()==time2.getDate() && time1.getMonth()==time2.getMonth() && time1.getFullYear()==time2.getFullYear()){
            return true;
        }else{
            return false;
        }
    },
    ifSameMonth:function(f1,f2){
        var time1=new Date(f1);
        var time2=new Date(f2);
        if(time1.getMonth()==time2.getMonth() && time1.getFullYear()==time2.getFullYear()){
            return true;
        }else{
            return false;
        }
    },
    deviceCheck:function(){
        var deviceinfo=navigator.userAgent.toLowerCase();
        if(deviceinfo.match(/ipad/i)=="ipad"){
            return "ios";
        }else if(deviceinfo.match(/iphone/i)=="iphone"){
            return "ios";
        }else if(deviceinfo.match(/android/i)=="android"){
            return "android";
        }
    },
    cityGraphTooltipTime:function(f){
        var year= f.getFullYear();
        var month= f.getMonth()+1;
        var day= f.getDate();
        var hour= f.getHours();
        if(month<10){
            month="0"+month;
        }
        if(day<10){
            day="0"+day;
        }
        if(hour<10){
            hour="0"+hour;
        }
        return year+"-"+month+"-"+day+" "+hour+":00";
    },
    cityGraphTooltipTime2:function(f){
        var year= f.getFullYear();
        var month= f.getMonth()+1;
        var day= f.getDate();
        if(month<10){
            month="0"+month;
        }
        if(day<10){
            day="0"+day;
        }
        return year+"-"+month+"-"+day;
    },
    PreFixInterge:function(num,n){
        return(Array(n).join(0)+num).slice(-n);
    },
    levelReturnBL:function(type,value){
        if(value=="—" || value=="-" || value==null){
            return "0";
        }else{
            value=parseFloat(value);
            switch(type){
                case "AQI":
                    if(value>=0 && value<=50){
                        return parseFloat(value/50).toFixed(2);
                    }else if(value>50 && value<=100){
                        return parseFloat(value/100).toFixed(2);
                    }else if(value>100 && value<=150){
                        return parseFloat(value/150).toFixed(2);
                    }else if(value>150 && value<=200){
                        return parseFloat(value/200).toFixed(2);
                    }else if(value>200 && value<=300){
                        return parseFloat(value/300).toFixed(2);
                    }else if(value>300){
                        return 1;
                    }
                    break;
                case "SO2":
                    if(value>=0 && value<=50){
                        return parseFloat(value/50).toFixed(2);
                    }else if(value>50 && value<=150){
                        return parseFloat(value/150).toFixed(2);
                    }else if(value>150 && value<=475){
                        return parseFloat(value/475).toFixed(2);
                    }else if(value>475 && value<=800){
                        return parseFloat(value/800).toFixed(2);
                    }else if(value>800 && value<=1600){
                        return parseFloat(value/1600).toFixed(2);
                    }else if(value>1600){
                        return 1;
                    }
                    break;
                case "NO2":
                    if(value>=0 && value<=40){
                        return parseFloat(value/40).toFixed(2);
                    }else if(value>40 && value<=80){
                        return parseFloat(value/80).toFixed(2);
                    }else if(value>80 && value<=180){
                        return parseFloat(value/180).toFixed(2);
                    }else if(value>180 && value<=280){
                        return parseFloat(value/280).toFixed(2);
                    }else if(value>280 && value<=565){
                        return parseFloat(value/565).toFixed(2);
                    }else if(value>565){
                        return 1;
                    }
                    break;
                case "CO":
                    if(value>=0 && value<=2){
                        return parseFloat(value/2).toFixed(2);
                    }else if(value>2 && value<=4){
                        return parseFloat(value/4).toFixed(2);
                    }else if(value>4 && value<=14){
                        return parseFloat(value/14).toFixed(2);
                    }else if(value>14 && value<=24){
                        return parseFloat(value/24).toFixed(2);
                    }else if(value>24 && value<=36){
                        return parseFloat(value/36).toFixed(2);
                    }else if(value>36){
                        return 1;
                    }
                    break;
                case "O3":
                    if(value>=0 && value<=100){
                        return parseFloat(value/100).toFixed(2);
                    }else if(value>100 && value<=160){
                        return parseFloat(value/160).toFixed(2);
                    }else if(value>160 && value<=215){
                        return parseFloat(value/215).toFixed(2);
                    }else if(value>215 && value<=265){
                        return parseFloat(value/265).toFixed(2);
                    }else if(value>265 && value<=800){
                        return parseFloat(value/800).toFixed(2);
                    }else if(value>800){
                        return 1;
                    }
                    break;
                case "PM10":
                    if(value>=0 && value<=50){
                        return parseFloat(value/50).toFixed(2);
                    }else if(value>50 && value<=150){
                        return parseFloat(value/150).toFixed(2);
                    }else if(value>150 && value<=250){
                        return parseFloat(value/250).toFixed(2);
                    }else if(value>250 && value<=350){
                        return parseFloat(value/350).toFixed(2);
                    }else if(value>350 && value<=420){
                        return parseFloat(value/420).toFixed(2);
                    }else if(value>420){
                        return 1;
                    }
                    break;
                case "PM2_5":
                    if(value>=0 && value<=35){
                        return parseFloat(value/35).toFixed(2);
                    }else if(value>35 && value<=75){
                        return parseFloat(value/75).toFixed(2);
                    }else if(value>75 && value<=115){
                        return parseFloat(value/115).toFixed(2);
                    }else if(value>115 && value<=150){
                        return parseFloat(value/150).toFixed(2);
                    }else if(value>150 && value<=250){
                        return parseFloat(value/250).toFixed(2);
                    }else if(value>250){
                        return 1;
                    }
                    break;
            }
        }
    },
    levelReturnWaterBL:function(type,value){
        if(value=="—" || value=="-" || value==null || value=='NA'){
            return "0";
        }else{
            value=parseFloat(value);
            switch(type){
                case "总磷":
                    if(value>=0 && value<=0.02){
                        return parseFloat(value/0.02).toFixed(2);
                    }else if(value>0.02 && value<=0.1){
                        return parseFloat(value/0.1).toFixed(2);
                    }else if(value>0.1 && value<=0.2){
                        return parseFloat(value/0.2).toFixed(2);
                    }else if(value>0.2 && value<=0.3){
                        return parseFloat(value/0.3).toFixed(2);
                    }else if(value>0.3 && value<=0.4){
                        return parseFloat(value/0.4).toFixed(2);
                    }else if(value>0.4){
                        return 1;
                    }
                    break;
                case "溶解氧":
                    if(value>=0 && value<=2){
                        return parseFloat(value/2).toFixed(2);
                    }else if(value>2 && value<=3){
                        return parseFloat(value/3).toFixed(2);
                    }else if(value>3 && value<=5){
                        return parseFloat(value/5).toFixed(2);
                    }else if(value>5 && value<=6){
                        return parseFloat(value/6).toFixed(2);
                    }else if(value>6 && value<=7.5){
                        return parseFloat(value/7.5).toFixed(2);
                    }else if(value>7.5){
                        return 1;
                    }
                    break;
                case "氨氮":
                    if(value>=0 && value<=0.15){
                        return parseFloat(value/0.15).toFixed(2);
                    }else if(value>0.15 && value<=0.5){
                        return parseFloat(value/0.5).toFixed(2);
                    }else if(value>0.5 && value<=1){
                        return parseFloat(value/1).toFixed(2);
                    }else if(value>1 && value<=1.5){
                        return parseFloat(value/1.5).toFixed(2);
                    }else if(value>1.5 && value<=2){
                        return parseFloat(value/2).toFixed(2);
                    }else if(value>2){
                        return 1;
                    }
                    break;
                case "高锰酸盐指数":
                    if(value>=0 && value<=2){
                        return parseFloat(value/2).toFixed(2);
                    }else if(value>2 && value<=4){
                        return parseFloat(value/4).toFixed(2);
                    }else if(value>4 && value<=6){
                        return parseFloat(value/6).toFixed(2);
                    }else if(value>6 && value<=10){
                        return parseFloat(value/10).toFixed(2);
                    }else if(value>10 && value<=15){
                        return parseFloat(value/15).toFixed(2);
                    }else if(value>15){
                        return 1;
                    }
                    break;
            }
        }
    },
    setCookie:function(key, value, iDay) {
        var oDate = new Date();
        oDate.setDate(oDate.getDate() + iDay);
        document.cookie = key + '=' + value + ';expires=' + oDate;
    },
    removeCookie:function(key) {
        tool.setCookie(key, '', -1);//这里只需要把Cookie保质期退回一天便可以删除
    },
    getCookie:function(key) {
        var cookieArr = document.cookie.split('; ');
        for(var i = 0; i < cookieArr.length; i++) {
            var arr = cookieArr[i].split('=');
            if(arr[0] === key) {
                return arr[1];
            }
        }
        return false;
    },
    compareTime:function(t1,t2){
        if(t1){
            var time1 = Date.parse(t1 + ":00:00")
        }
        var time2 = Date.parse(t2 + ":00:00")
        if(t1){
            return time1>time2?new Date(time1):new Date(time2);
        }
    },
    subDispose:function(value){
        var sub=[];
        if(value == null ||value == undefined)
        {
            sub = "一";
            return sub;
        }else{
            var arr = value.split(",");
            if(arr.length>1){
                for (var i=0; i<arr.length; i++){
                    if(arr[i]=='PM2.5'){
                        sub[i]='PM<sub>2.5</sub>'
                    }else if(arr[i]=='PM10'){
                        sub[i]='PM<sub>10</sub>'
                    }else if(arr[i]=='NO2'){
                        sub[i]='NO<sub>2</sub>'
                    }else if(arr[i]=='O3_8'){
                        sub[i]='O<sub>3</sub>'
                    }else if(arr[i]=='SO2'){
                        sub[i]='SO<sub>2</sub>'
                    }else{
                        sub[i]=arr[i]
                    }
                }
                return sub.join(",");
            }else{
                if(arr=='PM2.5'){
                    sub='PM<sub>2.5</sub>'
                }else if(arr=='PM10'){
                    sub='PM<sub>10</sub>'
                }else if(arr=='NO2'){
                    sub='NO<sub>2</sub>'
                }else if(arr=='O3_8'){
                    sub='O<sub>3</sub>'
                }else if(arr=='SO2'){
                    sub='SO<sub>2</sub>'
                }else{
                    sub=arr
                }
                return sub;
            }
        }
    }
}
$.extend($.expr[':'],
    {
        left: function(el, i, m)
        {
            if(!m[3]||!(/^(<|>)\d+$/).test(m[3])) {return false;}
            return m[3].substr(0,1) === '>' ?
                (outerWidthForAll-$(el).position().left) > m[3].substr(1) : (outerWidthForAll-$(el).position().left) < m[3].substr(1);
        }
    });

// (function($, undefined) {
//     $.fn.subpage = function(options) {
//         $(document).bind("pagechange",
//             function() {
//                 var forword = $.mobile.urlHistory.getNext();
//                 if (forword) {
//                     var dataUrl = forword.url;
//                     var forwordPage = $.mobile.pageContainer.children(":jqmData(url='" + dataUrl + "')");
//                     if (forwordPage) {
//                         forwordPage.remove();
//                     }
//                 }
//                 $.mobile.urlHistory.clearForward();
//             });
//     };
//     $(document).bind("pagecreate create",
//         function(e) {
//             $(":jqmData(role='page')", e.target).subpage();
//         });
// })(jQuery);
