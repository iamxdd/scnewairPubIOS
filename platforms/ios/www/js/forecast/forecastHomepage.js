var forecastHomepage= {
    createCityForecastTable: function (dataType) {
        dataType=parseInt(dataType);
        var data=$("#ForecastTable").data("forecastData");
        $("#ForecastTable").html("");
        console.log(data);
        $.each(data, function (i, item) {
            var name = item.CITYNAME;
            //console.log(item.PM2_5);

            item.PM2_5 = item.PM2_5 == null ? "—" : item.PM2_5;
            item.AQI = item.AQI == null ? "—" : item.AQI;
            item.QUALITY = item.QUALITY == null ? "—" : item.QUALITY;
            item.PRIMARYPOLLUTANT = item.PRIMARYPOLLUTANT == null ? "—" : item.PRIMARYPOLLUTANT;

            var PM2_5 = item.PM2_5_REAL.split("|")[dataType];
            var AQI = item.AQI.split("|")[dataType];
            var QUALITY = item.QUALITY.split("|")[dataType];
            var PRIMARYPOLLUTANT = item.PRIMARYPOLLUTANT.split("|")[dataType];
            //console.log(PRIMARYPOLLUTANT);
            QUALITY = QUALITY.replace(/优/g, "<span style='color:rgb(0,228,0)'>优</span>").replace(/良/g, "<span style='color:rgb(255,255,0)'>良</span>")
                .replace(/轻度污染/g, "<span style='color:rgb(255,126,0)'>轻度污染</span>").replace(/中度污染/g, "<span style='color:rgb(255,0,0)'>中度污染</span>")
                .replace(/重度污染/g, "<span style='color:rgb(153,0,76)'>重度污染</span>").replace(/严重污染/g, "<span style='color:rgb(126,0,35)'>严重污染</span>");

            PRIMARYPOLLUTANT = PRIMARYPOLLUTANT.replace(/细颗粒物\(PM2.5\)/g, "<span style='color:rgb(255,127,80)'>细颗粒物(PM2.5)</span>").replace(/臭氧8小时/g, "<span style='color:rgb(0,191,255)'>臭氧8小时</span>")
                .replace(/二氧化硫/g, "<span style='color:rgb(255,255,0)'>二氧化硫</span>").replace(/二氧化氮/g, "<span style='color:rgb(65,105,225)'>二氧化氮</span>")
                .replace(/颗粒物\(PM10\)/g, "<span style='color:rgb(178,34,34)'>颗粒物(PM10)</span>")
                .replace(/一氧化碳/g, "<span style='color:rgb(218,112,214)'>一氧化碳</span>").replace(/无/g, "<span style='color:rgb(128,128,128)'>无</span>");
            var tr = $("<tr></tr>");
            var td1 = $("<td >" + name + "</td>");
            var td3 = $("<td  >" + AQI + "</td>");
            var td4 = $("<td style='text-shadow:1px 1px 1px gray!important'>" + QUALITY + "</td>");
            var td5 = $("<td style='text-shadow:1px 1px 1px gray!important'>" + PRIMARYPOLLUTANT + "</td>");

            tr.append(td1);
            tr.append(td3);
            tr.append(td4);
            tr.append(td5);
            $("#ForecastTable").append(tr);
        });
    },
//    城市预报制图
    createForecastGraph:function(gas){
        $("#ajaxPleaseWait").show();
        var time1=new Date($("#forecastCityPageTime1").val());
        var time2=new Date($("#forecastCityPageTime2").val());
        $.ajax({
            type:"post",
            url:provinceAjax+"/smartadmin/forecast/getPersonalChart",
            dataType:'json',
            async:true,
            data:{"cityCode":$("#forecastCityPageChooseCity").attr("citycode"),"startDate":time1.getTime(),"endDate":time2.getTime()},
            error:function(){
                tool.warningAlert("warAFailed","获取预报信息失败");
            },
            complete:function(XMLHttpRequest){
                $("#ajaxPleaseWait").hide();
                var data=eval("("+XMLHttpRequest.responseText+")");
                data=data.data.data;
                var graphTitle="";
                var seriesdata=new Array();
                var seriesdataReal=new Array();
                var seriesdataArr="[";
                var dw="";
                switch(gas){
                    case "O3|model":
                        graphTitle="臭氧(O3)";
                        seriesdata=data.o3_8h;
                        seriesdataReal=data.r_o3;
                        dw="μm/m³";
                        break;
                    case "AQI|model":
                        graphTitle="空气质量指数(AQI)";
                        seriesdata=data.m_aqi;
                        seriesdataReal=data.r_aqi;
                        break;
                    case "PM2_5|model":
                        graphTitle="细颗粒物(PM2.5)";
                        seriesdata=data.m_pm2_5;
                        seriesdataReal=data.r_pm2_5;
                        dw="μm/m³";
                        break;
                    case "AQI|personal":
                        graphTitle="空气质量指数(AQI)";
                        seriesdata=data.aqi;
                        seriesdataReal=data.r_aqi;
                        break;
                    case "PM2_5|personal":
                        graphTitle="细颗粒物(PM2.5)";
                        seriesdata=data.pm2_5;
                        seriesdataReal=data.r_pm2_5;
                        dw="μm/m³";
                        break;
                }
                dw="";
                var labelx=new Array();
                for(var j=0;j<data.days;j++){
                    var dayname=new Date(data.startTimePoint+86400000*j);
                    labelx.push(dayname.getMonth()+"月"+dayname.getDate()+"日");
                }
                var newReal="";
                for(var j=0;j<seriesdataReal.length;j++){
                    var realEach="[";
                    realEach+="'"+labelx[j]+"',";
                    realEach+=seriesdataReal[j];
                    realEach+="]";
                    newReal+=realEach+",";
                }
                newReal=newReal.substring(0,newReal.length-1);
                seriesdataArr+="{name:'实测',type:'scatter',symbol:'diamond',symbolSize:5,itemStyle:{normal:{color:'#000000'}},data:["+newReal+"]}";
                seriesdataArr+=",{name:'24小时预测',type:'line',symbol:'diamond',symbolSize:1,itemStyle:{normal:{color:'#ff0000'}},data:["+seriesdata[0]+"]}";
                seriesdataArr+=",{name:'48小时预测',type:'line',symbol:'diamond',symbolSize:1,itemStyle:{normal:{color:'#00ff00'}},data:["+seriesdata[1]+"]}";
                seriesdataArr+=",{name:'72小时预测',type:'line',symbol:'diamond',symbolSize:1,itemStyle:{normal:{color:'#0000ff'}},data:["+seriesdata[2]+"]}";
                var legend=['实测','24小时预测','48小时预测','72小时预测'];
                if(gas.split("|")[1]=="model"){
                    legend=['实测','24小时预测','48小时预测','72小时预测','96小时预测'];
                    seriesdataArr+=",{name:'96小时预测',type:'line',symbol:'diamond',symbolSize:1,itemStyle:{normal:{color:'#ffff00'}},data:["+seriesdata[3]+"]}";
                }
                seriesdataArr+="]";
                seriesdataArr=seriesdataArr.replace(/-/g,"'-'");
                seriesdataArr=eval(seriesdataArr);
                var myChart = echarts.init(document.getElementById('forecastCityPage_Content2Graph'));
                myChart.setOption({
                    tooltip : {
                        trigger: 'axis'
                    },
                    title : {
                        text: '',
                        x:'left',
                        show:false,
                        textStyle:{
                            fontSize:13
                        }
                    },
                    toolbox: {
                        show : false,
                        feature : {
                            magicType : {show: true, type: ['line', 'bar']},
                            restore : {show: true},
                            saveAsImage : {show: true}
                        }
                    },
                    grid: {
                        x: 30,
                        y:50,
                        x2:20,
                        y2:20
                    },
                    legend: {
                        data:legend,
                        y:10,
                        itemGap:10,
                        itemWidth:10,
                        itemHeight:7,
                        padding:10
                    },
                    calculable : false,
                    xAxis : [
                        {
                            type : 'category',
                            data : labelx,
                            axisTick:{
                                interval:0
                            }
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value',
                            min:0,
                            boundaryGap:[0,0.1],
                            scale:true,
                            axisLabel : {
                                formatter: '{value}'+dw
                            },
                            splitArea : {
                                show : true,
                                areaStyle:{color:'rgba(0,0,0,0)'}
                            }
                        }
                    ],
                    series : seriesdataArr
                });
            }
        });
    },
//    城市预报表格填充
    filterTheForecastTable:function(citycode){
        $("#ajaxPleaseWait").show();
        $.ajax({
            type:"GET",
            url:localStorage.loginUrl+"/smartadmin/forecast/getForecast",
            dataType:'json',
            async:true,
            data:{"cityCode":citycode,"userName":localStorage.userName,"cityType":0},
            error:function(){
                tool.warningAlert("warAFailed","获取预报信息失败");
            },
            complete:function(XMLHttpRequest){
                $("#ajaxPleaseWait").hide();
                var data=eval("("+XMLHttpRequest.responseText+")");
                // if(!data.result){
                //     forecastRange={"other":["15","20","30","15","15","15","15",""],"pm2_5":["15","15","15","15","15","15","15",""]};
                // }
                data=data.data;
                forecastRange=data.range;
//                data=forecastCityTable[0].data;

                var flag16=false;
                var time16=(new Date()).getHours();
                if(time16>=16){
                    flag16=true;
                }
                if (data.isAudit || flag16) {
                    $("#cityForecastStat").html('（今日数据已审核！）');
                    $("#cityForecastSubmit").attr("disabled","disabled");
                    $(".cityForecastMustInput").attr("readonly","readonly");
                    $(".cityForecastMustSelect").attr("disabled","disabled");
                }else{
                    $(".cityForecastMustInput").removeAttr("readonly");
                    $("#cityForecastStat").html('（今日数据暂未审核！）');
                    $("#cityForecastSubmit").removeAttr("disabled");
                    $(".cityForecastMustSelect").removeAttr("disabled");
                }
                var date=new Date();
                $("#forecastCityTableCityDate").text(date.getFullYear()+"年"+(date.getMonth()+1)+"月"+date.getDate()+"日");
                var date1=new Date((new Date()).setDate((new Date()).getDate()+1));
                var date2=new Date((new Date()).setDate((new Date()).getDate()+2));
                var date3=new Date((new Date()).setDate((new Date()).getDate()+3));
                $("#forecastCityTableCityDate1").text((date1.getMonth()+1)+"月"+date1.getDate()+"日");
                $("#forecastCityTableCityDate2").text((date2.getMonth()+1)+"月"+date2.getDate()+"日");
                $("#forecastCityTableCityDate3").text((date3.getMonth()+1)+"月"+date3.getDate()+"日");
                $("#forecastCityM_PM2_5_1").children("td").eq(0).text((data.m_pm2_5[0][0]=="-" || data.m_pm2_5[0][0]=="")?"-":parseInt(data.m_pm2_5[0][0]));
                $("#forecastCityM_PM2_5_1").children("td").eq(1).text((data.m_pm2_5[0][1]=="-" || data.m_pm2_5[0][1]=="")?"-":parseInt(data.m_pm2_5[0][1]));
                $("#forecastCityM_PM2_5_1").children("td").eq(2).text((data.m_pm2_5[0][2]=="-" || data.m_pm2_5[0][2]=="")?"-":parseInt(data.m_pm2_5[0][2]));

                $("#forecastCityM_PM2_5_2").children("td").eq(0).text((data.m_pm2_5[1][0]=="-" || data.m_pm2_5[1][0]=="")?"-":parseInt(data.m_pm2_5[1][0]));
                $("#forecastCityM_PM2_5_2").children("td").eq(1).text((data.m_pm2_5[1][1]=="-" || data.m_pm2_5[1][1]=="")?"-":parseInt(data.m_pm2_5[1][1]));
                $("#forecastCityM_PM2_5_2").children("td").eq(2).text((data.m_pm2_5[1][2]=="-" || data.m_pm2_5[1][2]=="")?"-":parseInt(data.m_pm2_5[1][2]));

                $("#forecastCityM_PM2_5_3").children("td").eq(0).text((data.m_pm2_5[2][0]=="-" || data.m_pm2_5[2][0]=="")?"-":parseInt(data.m_pm2_5[2][0]));
                $("#forecastCityM_PM2_5_3").children("td").eq(1).text((data.m_pm2_5[2][1]=="-" || data.m_pm2_5[2][1]=="")?"-":parseInt(data.m_pm2_5[2][1]));
                $("#forecastCityM_PM2_5_3").children("td").eq(2).text((data.m_pm2_5[2][2]=="-" || data.m_pm2_5[2][2]=="")?"-":parseInt(data.m_pm2_5[2][2]));

                $("#forecastCityTJ_PM2_5_1").children("td").eq(1).text((data.tj_pm2_5[0][0]=="-" || data.tj_pm2_5[0][0]=="")?"-":parseInt(data.tj_pm2_5[0][0]));
                $("#forecastCityTJ_PM2_5_1").children("td").eq(2).text((data.tj_pm2_5[0][1]=="-" || data.tj_pm2_5[0][1]=="")?"-":parseInt(data.tj_pm2_5[0][1]));
                $("#forecastCityTJ_PM2_5_1").children("td").eq(3).text((data.tj_pm2_5[0][2]=="-" || data.tj_pm2_5[0][2]=="")?"-":parseInt(data.tj_pm2_5[0][2]));

                $("#forecastCityTJ_PM2_5_2").children("td").eq(1).text((data.tj_pm2_5[1][0]=="-" || data.tj_pm2_5[1][0]=="")?"-":parseInt(data.tj_pm2_5[1][0]));
                $("#forecastCityTJ_PM2_5_2").children("td").eq(2).text((data.tj_pm2_5[1][1]=="-" || data.tj_pm2_5[1][1]=="")?"-":parseInt(data.tj_pm2_5[1][1]));
                $("#forecastCityTJ_PM2_5_2").children("td").eq(3).text((data.tj_pm2_5[1][2]=="-" || data.tj_pm2_5[1][2]=="")?"-":parseInt(data.tj_pm2_5[1][2]));

                $("#forecastCityTJ_PM2_5_3").children("td").eq(1).text((data.tj_pm2_5[2][0]=="-" || data.tj_pm2_5[2][0]=="")?"-":parseInt(data.tj_pm2_5[2][0]));
                $("#forecastCityTJ_PM2_5_3").children("td").eq(2).text((data.tj_pm2_5[2][1]=="-" || data.tj_pm2_5[2][1]=="")?"-":parseInt(data.tj_pm2_5[2][1]));
                $("#forecastCityTJ_PM2_5_3").children("td").eq(3).text((data.tj_pm2_5[2][2]=="-" || data.tj_pm2_5[2][2]=="")?"-":parseInt(data.tj_pm2_5[2][2]));

                $("#forecastCityM_PP_1").children("td").eq(0).text(data.m_pp[0][0]);
                $("#forecastCityM_PP_1").children("td").eq(1).text(data.m_pp[0][1]);
                $("#forecastCityM_PP_1").children("td").eq(2).text(data.m_pp[0][2]);

                $("#forecastCityM_PP_2").children("td").eq(0).text(data.m_pp[1][0]);
                $("#forecastCityM_PP_2").children("td").eq(1).text(data.m_pp[1][1]);
                $("#forecastCityM_PP_2").children("td").eq(2).text(data.m_pp[1][2]);

                $("#forecastCityM_PP_3").children("td").eq(0).text(data.m_pp[2][0]);
                $("#forecastCityM_PP_3").children("td").eq(1).text(data.m_pp[2][1]);
                $("#forecastCityM_PP_3").children("td").eq(2).text(data.m_pp[2][2]);

                $("#forecastCityTJ_PP_1").children("td").eq(1).text(data.tj_pp[0][0]);
                $("#forecastCityTJ_PP_1").children("td").eq(2).text(data.tj_pp[0][1]);
                $("#forecastCityTJ_PP_1").children("td").eq(3).text(data.tj_pp[0][2]);

                $("#forecastCityTJ_PP_2").children("td").eq(1).text(data.tj_pp[1][0]);
                $("#forecastCityTJ_PP_2").children("td").eq(2).text(data.tj_pp[1][1]);
                $("#forecastCityTJ_PP_2").children("td").eq(3).text(data.tj_pp[1][2]);

                $("#forecastCityTJ_PP_3").children("td").eq(1).text(data.tj_pp[2][0]);
                $("#forecastCityTJ_PP_3").children("td").eq(2).text(data.tj_pp[2][1]);
                $("#forecastCityTJ_PP_3").children("td").eq(3).text(data.tj_pp[2][2]);

                if(data.isDone){
                    var foredata=data.forecast;
                    $("#pm2_5ConcRange1").text(foredata.PM2_5_DR[0]);
                    $("#pm2_5ConcRange2").text(foredata.PM2_5_DR[1]);
                    $("#pm2_5ConcRange3").text(foredata.PM2_5_DR[2]);

                    $("#pm2_5iRange1").text(foredata.PM2_5_IR[0]);
                    $("#pm2_5iRange2").text(foredata.PM2_5_IR[1]);
                    $("#pm2_5iRange3").text(foredata.PM2_5_IR[2]);

                    $("#pm2_5quality1").text(foredata.QUALITY[0]);
                    $("#pm2_5quality2").text(foredata.QUALITY[1]);
                    $("#pm2_5quality3").text(foredata.QUALITY[2]);

                    $("#pm2_5Conc1").val(foredata.PM2_5[0]);
                    $("#pm2_5Conc2").val(foredata.PM2_5[1]);
                    $("#pm2_5Conc3").val(foredata.PM2_5[2]);

                    $("#AQImiddleValue1").val(foredata.AQI_NPO[0]);
                    $("#AQImiddleValue2").val(foredata.AQI_NPO[1]);
                    $("#AQImiddleValue3").val(foredata.AQI_NPO[2]);

                    $("#AQIrange1_1").val(foredata.AQI[0].split("~")[0]);
                    $("#AQIrange1_2").val(foredata.AQI[0].split("~")[1]);
                    $("#AQIrange2_1").val(foredata.AQI[1].split("~")[0]);
                    $("#AQIrange2_2").val(foredata.AQI[1].split("~")[1]);
                    $("#AQIrange3_1").val(foredata.AQI[2].split("~")[0]);
                    $("#AQIrange3_2").val(foredata.AQI[2].split("~")[1]);

                    $("tr[type='aqi_primaryPollutant']").eq(0).children(".data").text(foredata.PRIMARYPOLLUTANT[0]);
                    $("tr[type='aqi_primaryPollutant']").eq(1).children(".data").text(foredata.PRIMARYPOLLUTANT[1]);
                    $("tr[type='aqi_primaryPollutant']").eq(2).children(".data").text(foredata.PRIMARYPOLLUTANT[2]);

                    $("#PPselect1").val(foredata.PRIMARYPOLLUTANT[0]);
                    $("#PPselect2").val(foredata.PRIMARYPOLLUTANT[1]);
                    $("#PPselect3").val(foredata.PRIMARYPOLLUTANT[2]);
                }
            }
        });
    },
    getMessagezh:function(dkpllcd,dkplldy,dkpllmy,dkpllls,dkpllms,dkpllya,dkpllzy,dkpllzg,dkplllz,dkpllnj,dkpllyb,dkpllgy,dkpllsn,dkpllnc,dkpllga,dkplldz,dkpllbz,dkpllpzh,dkpllxc,dkpllmek,dkpllkd,timeid,textid){
        var timePoint= (new Date($("#"+timeid).val().replace(/年/,"-").replace(/月/,"-").replace(/日/,""))).getTime();
        var ss=new Date(timePoint);
        ss.setDate(ss.getDate()+1);
        var newdata = (ss.getMonth()+1)+"月"+ss.getDate()+"日";
        ss.setDate(ss.getDate()+1);
        var newdata1 = (ss.getMonth()+1)+"月"+ss.getDate()+"日";
        ss.setDate(ss.getDate()+1);
        var newdata2 = (ss.getMonth()+1)+"月"+ss.getDate()+"日";

        $("#areazh").html("");
        var message="";
        var message1="";
        var t1="";
        var t2="";
        var t3="";
        var cxm="";
        var cnm="";
        var cdbm="";
        var data1p="";
        var data2p="";
        var data3p="";
        cxm=$("input[name='sideRadio1']:checked").next().next().val();
        cnm=$("input[name='sideRadio2']:checked").next().next().val();
        cdbm=$("input[name='sideRadio3']:checked").next().next().val()


        var data1 = cxm.split("；");
        var data2 = cnm.split("；");
        var data3 = cdbm.split("；");

        var data111 = dkpllcd.split("|");
        var data22 = dkplldy.split("|");
        var data33 = dkpllmy.split("|");
        var data4 = dkpllls.split("|");
        var data5 = dkpllms.split("|");
        var data6 = dkpllya.split("|");
        var data7 = dkpllzy.split("|");
        var data8 = dkpllzg.split("|");
        var data9 = dkplllz.split("|");
        var data10 = dkpllnj.split("|");
        var data11 = dkpllyb.split("|");
        var data12 = dkpllgy.split("|");
        var data13 = dkpllsn.split("|");
        var data14 = dkpllnc.split("|");
        var data15 = dkpllga.split("|");
        var data16 = dkplldz.split("|");
        var data17 = dkpllbz.split("|");
        var data18 = dkpllpzh.split("|");
        var data19 = dkpllxc.split("|");
        var data20 = dkpllmek.split("|");
        var data21 = dkpllkd.split("|");

        data1p=data111[1]+data22[1]+data33[1]+data4[1]+data5[1]+data6[1]+data7[1]+data8[1]+data9[1]+data10[1]+data11[1]+data12[1]+data13[1]+data14[1]+data15[1]+data16[1]+data17[1]+data18[1]+data19[1]+data20[1]+data21[1];
        data2p=data111[2]+data22[2]+data33[2]+data4[2]+data5[2]+data6[2]+data7[2]+data8[2]+data9[2]+data10[2]+data11[2]+data12[2]+data13[2]+data14[2]+data15[2]+data16[2]+data17[2]+data18[2]+data19[2]+data20[2]+data21[2];
        data3p=data111[3]+data22[3]+data33[3]+data4[3]+data5[3]+data6[3]+data7[3]+data8[3]+data9[3]+data10[3]+data11[3]+data12[3]+data13[3]+data14[3]+data15[3]+data16[3]+data17[3]+data18[3]+data19[3]+data20[3]+data21[3];

        var len1pwu ; //正则表达式
        var len1p25 ; //正则表达式
        var len1p10 ; //正则表达式
        var len1pno2 ; //正则表达式
        var len1pco ; //正则表达式
        var len1pso2 ; //正则表达式
        var len1po3 ; //正则表达式

        var len2pwu ; //正则表达式
        var len2p25; //正则表达式
        var len2p10 ; //正则表达式
        var len2pno2 ; //正则表达式
        var len2pco ; //正则表达式
        var len2pso2 ; //正则表达式
        var len2po3; //正则表达式

        var len3pwu ; //正则表达式
        var len3p25 ; //正则表达式
        var len3p10 ; //正则表达式
        var len3pno2; //正则表达式
        var len3pco; //正则表达式
        var len3pso2; //正则表达式
        var len3po3; //正则表达式

        len1pwu = data1p.match(/无/g); //正则表达式
        len1p25 = data1p.match(/PM2.5/g); //正则表达式
        len1p10 = data1p.match(/PM10/g); //正则表达式
        len1pno2 = data1p.match(/二氧化氮/g); //正则表达式
        len1pco = data1p.match(/一氧化碳/g); //正则表达式
        len1pso2 = data1p.match(/二氧化硫/g); //正则表达式
        len1po3 = data1p.match(/臭氧/g); //正则表达式

        len2pwu = data2p.match(/无/g); //正则表达式
        len2p25 = data2p.match(/PM2.5/g); //正则表达式
        len2p10 = data2p.match(/PM10/g); //正则表达式
        len2pno2 = data2p.match(/二氧化氮/g); //正则表达式
        len2pco = data2p.match(/一氧化碳/g); //正则表达式
        len2pso2 = data2p.match(/二氧化硫/g); //正则表达式
        len2po3 = data2p.match(/臭氧/g); //正则表达式

        len3pwu = data3p.match(/无/g); //正则表达式
        len3p25 = data3p.match(/PM2.5/g); //正则表达式
        len3p10 = data3p.match(/PM10/g); //正则表达式
        len3pno2 = data3p.match(/二氧化氮/g); //正则表达式
        len3pco = data3p.match(/一氧化碳/g); //正则表达式
        len3pso2 = data3p.match(/二氧化硫/g); //正则表达式
        len3po3 = data3p.match(/臭氧/g); //正则表达式


        t1=data1[0]+data2[0]+data3[0];
        t2=data1[1]+data2[1]+data3[1];
        t3=data1[2]+data2[2]+data3[2];

        var regy= new RegExp('优');
        var regl= new RegExp('良');
        var regq= new RegExp('轻');
        var regz= new RegExp('中');
        var regzd= new RegExp('重');
        var regyz= new RegExp('严');

        var f1="";
        var sss="";
        if((len1p25==null?[""]:len1p25).length>(len1p10==null?[""]:len1p10).length&&(len1p25==null?[""]:len1p25).length>(len1pno2==null?[""]:len1pno2).length&&(len1p25==null?[""]:len1p25).length>(len1pco==null?[""]:len1pco).length&&(len1p25==null?[""]:len1p25).length>(len1pso2==null?[""]:len1pso2).length&&(len1p25==null?[""]:len1p25).length>(len1po3==null?[""]:len1po3).length){
            f1='PM2.5';

        }else if((len1pno2==null?[""]:len1pno2).length>(len1p10==null?[""]:len1p10).length&&(len1pno2==null?[""]:len1pno2).length>(len1p25==null?[""]:len1p25).length&&(len1pno2==null?[""]:len1pno2).length>(len1pco==null?[""]:len1pco).length&&(len1pno2==null?[""]:len1pno2).length>(len1pso2==null?[""]:len1pso2).length&&(len1pno2==null?[""]:len1pno2).length>(len1po3==null?[""]:len1po3).length){
            f1='二氧化氮';

        }else if((len1po3==null?[""]:len1po3).length>(len1p10==null?[""]:len1p10).length&&(len1po3==null?[""]:len1po3).length>(len1pno2==null?[""]:len1pno2).length&&(len1po3==null?[""]:len1po3).length>(len1pco==null?[""]:len1pco).length&&(len1po3==null?[""]:len1po3).length>(len1pso2==null?[""]:len1pso2).length&&(len1po3==null?[""]:len1po3).length>(len1p25==null?[""]:len1p25).length){
            f1='臭氧8小时';
        }else if((len1pso2==null?[""]:len1pso2).length>(len1p10==null?[""]:len1p10).length&&(len1pso2==null?[""]:len1pso2).length>(len1pno2==null?[""]:len1pno2).length&&(len1pso2==null?[""]:len1pso2).length>(len1pco==null?[""]:len1pco).length&&(len1pso2==null?[""]:len1pso2).length>(len1p25==null?[""]:len1p25).length&&(len1so2==null?[""]:len1so2).length>(len1po3==null?[""]:len1po3).length){
            f1='二氧化硫';
        }else if((len1pco==null?[""]:len1pco).length>(len1p10==null?[""]:len1p10).length&&(len1pco==null?[""]:len1pco).length>(len1pno2==null?[""]:len1pno2).length&&(len1pco==null?[""]:len1pco).length>(len1p25==null?[""]:len1p25).length&&(len1pco==null?[""]:len1pco).length>(len1pso2==null?[""]:len1pso2).length&&(len1pco==null?[""]:len1pco).length>(len1po3==null?[""]:len1po3).length){
            f1='一氧化碳';
        }else if((len1p10==null?[""]:len1p10).length>(len1p25==null?[""]:len1p25).length&&(len1p10==null?[""]:len1p10).length>(len1pno2==null?[""]:len1pno2).length&&(len1p10==null?[""]:len1p10).length>(len1pco==null?[""]:len1pco).length&&(len1p10==null?[""]:len1p10).length>(len1so2==null?[""]:len1so2).length&&(len1p10==null?[""]:len1p10).length>(len1po3==null?[""]:len1po3).length){
            f1='PM10';
        }else{
            f1='PM2.5';
        }
//T，盆西
        if(!data1[0]){
            data1[0]="";
        }
        if(!(data1[0].search(regq)>-1||data1[0].search(regz)>-1||data1[0].search(regzd)>-1||data1[0].search(regyz)>-1)){
            message1+="";
        }else{
            message1+=newdata+"："+"\r\n"+"盆地西部局部城市";
        }

        if(data1[0].search(regyz)>-1){
            message1+="为严重污染，";
        }else{
            message1+="";
        }

        if((data1[0].search(regyz)>-1)){
            if(data1[0].search(regzd)>-1){
                message1+="或重度污染，";
            }else{
                message1+="";
            }
        }else{
            if(data1[0].search(regzd)>-1){
                message1+="为重度污染，";
            }else{
                message1+="";
            }
        }

        if((data1[0].search(regzd)>-1)||(data1[0].search(regyz)>-1)){
            if(data1[0].search(regz)>-1){
                message1+="或中度污染，";
            }else{
                message1+="";
            }
        }else{
            if(data1[0].search(regz)>-1){
                message1+="为中度污染，";
            }else{
                message1+="";
            }
        }

        if((data1[0].search(regz)>-1)||(data1[0].search(regzd)>-1)||(data1[0].search(regyz)>-1)){//找到任意一个比当前严重的污染
            if(data1[0].search(regq)>-1){
                message1+="或轻度污染；";
                message1+="\r\n";
            }else{
                message1+="";
            }
        }else{
            if(data1[0].search(regq)>-1){
                message1+="为轻度污染；";
                message1+="\r\n";
            }else{
                message1+="";
            }
        }
//T，盆南
        if(!data2[0]){
            data2[0]="";
        }
        if((data2[0].search(regq)>-1)||(data2[0].search(regz)>-1)||(data2[0].search(regzd)>-1)||(data2[0].search(regyz)>-1)){
            if((data1[0].search(regq)>-1)||(data1[0].search(regz)>-1)||(data1[0].search(regzd)>-1)||(data1[0].search(regyz)>-1)){
                message1+="盆地南部局部城市";
            }else{
                message1+=newdata+"："+"\r\n"+"盆地南部局部城市";
            }

            if(data2[0].search(regyz)>-1){
                message1+="为严重污染，";
            }else{
                message1+="";
            }
            if((data2[0].search(regyz)>-1)){
                if(data2[0].search(regzd)>-1){
                    message1+="或重度污染，";
                }else{
                    message1+="";
                }
            }else{
                if(data2[0].search(regzd)>-1){
                    message1+="为重度污染，";
                }else{
                    message1+="";
                }
            }
            if((data2[0].search(regzd)>-1)||(data2[0].search(regyz)>-1)){
                if(data2[0].search(regz)>-1){
                    message1+="或中度污染，";
                }else{
                    message1+="";
                }
            }else{
                if(data2[0].search(regz)>-1){
                    message1+="为中度污染，";
                }else{
                    message1+="";
                }
            }
            if((data1[0].search(regz)>-1)||(data1[0].search(regzd)>-1)||(data1[0].search(regyz)>-1)){//找到任意一个比当前严重的污染
                if(data1[0].search(regq)>-1){
                    message1+="或轻度污染；";
                    message1+="\r\n";
                }else{
                    message1+="";
                }
            }else{
                if(data1[0].search(regq)>-1){
                    message1+="为轻度污染；";
                    message1+="\r\n";
                }else{
                    message1+="";
                }
            }

        }

//T，盆东北
        if(!data3[0]){
            data3[0]="";
        }
        if((data3[0].search(regq)>-1)||(data3[0].search(regz)>-1)||(data3[0].search(regzd)>-1)||(data3[0].search(regyz)>-1)){
            if((data1[0].search(regq)>-1)||(data1[0].search(regz)>-1)||(data1[0].search(regzd)>-1)||(data1[0].search(regyz)>-1)||(data2[0].search(regq)>-1)||(data2[0].search(regz)>-1)||(data2[0].search(regzd)>-1)||(data2[0].search(regyz)>-1)){
                message1+="盆地东北部局部城市";
            }else{
                message1+=newdata+"："+"\r\n"+"盆地东北部局部城市";
            }

            if(data3[0].search(regyz)>-1){
                message1+="为严重污染，";
            }else{
                message1+="";
            }
            if((data3[0].search(regyz)>-1)){
                if(data3[0].search(regzd)>-1){
                    message1+="或重度污染，";
                }else{
                    message1+="";
                }
            }else{
                if(data3[0].search(regzd)>-1){
                    message1+="为重度污染，";
                }else{
                    message1+="";
                }
            }
            if((data3[0].search(regzd)>-1)||(data3[0].search(regyz)>-1)){
                if(data3[0].search(regz)>-1){
                    message1+="或中度污染，";
                }else{
                    message1+="";
                }
            }else{
                if(data3[0].search(regz)>-1){
                    message1+="为中度污染，";
                }else{
                    message1+="";
                }
            }
            if((data3[0].search(regz)>-1)||(data3[0].search(regzd)>-1)||(data3[0].search(regyz)>-1)){//找到任意一个比当前严重的污染
                if(data3[0].search(regq)>-1){
                    message1+="或轻度污染；";
                    message1+="\r\n";
                }else{
                    message1+="";
                }
            }else{
                if(data3[0].search(regq)>-1){
                    message1+="为轻度污染；";
                    message1+="\r\n";
                }else{
                    message1+="";
                }
            }

        }

        if(!(data1[0].search(regq)>-1||data2[0].search(regq)>-1||data3[0].search(regq)>-1)){
            message1+=newdata+"：";
            message1+="\r\n";
            message1+="盆地地区为优或良；";
            message1+="\r\n";
            message1+="攀西地区和川西高原大部城市为优或良。";
            message1+="\r\n";
            message1+="全省首要污染物以"+f1+"为主。"
            message1+="\r\n";
        }else{
            message1+="盆地其余城市为优或良；"
            message1+="\r\n";
            message1+="攀西地区和川西高原大部城市为优或良。"
            message1+="\r\n";
            message1+="全省首要污染物以"+f1+"为主。";
            message1+="\r\n";
        }


        var f2="";
        var sss2="";

        if((len2p25==null?[""]:len2p25).length>(len2p10==null?[""]:len2p10).length&&(len2p25==null?[""]:len2p25).length>(len2pno2==null?[""]:len2pno2).length&&(len2p25==null?[""]:len2p25).length>(len2pco==null?[""]:len2pco).length&&(len2p25==null?[""]:len2p25).length>(len2pso2==null?[""]:len2pso2).length&&(len2p25==null?[""]:len2p25).length>(len2po3==null?[""]:len2po3).length){
            f2='PM2.5';

        }else if((len2pno2==null?[""]:len2pno2).length>(len2p10==null?[""]:len2p10).length&&(len2pno2==null?[""]:len2pno2).length>(len2p25==null?[""]:len2p25).length&&(len2pno2==null?[""]:len2pno2).length>(len2pco==null?[""]:len2pco).length&&(len2pno2==null?[""]:len2pno2).length>(len2pso2==null?[""]:len2pso2).length&&(len2pno2==null?[""]:len2pno2).length>(len2po3==null?[""]:len2po3).length){
            f2='二氧化氮';

        }else if((len2po3==null?[""]:len2po3).length>(len2p10==null?[""]:len2p10).length&&(len2po3==null?[""]:len2po3).length>(len2pno2==null?[""]:len2pno2).length&&(len2po3==null?[""]:len2po3).length>(len2pco==null?[""]:len2pco).length&&(len2po3==null?[""]:len2po3).length>(len2pso2==null?[""]:len2pso2).length&&(len2po3==null?[""]:len2po3).length>(len2p25==null?[""]:len2p25).length){
            f2='臭氧8小时';
        }else if((len2pso2==null?[""]:len2pso2).length>(len2p10==null?[""]:len2p10).length&&(len2pso2==null?[""]:len2pso2).length>(len2pno2==null?[""]:len2pno2).length&&(len2pso2==null?[""]:len2pso2).length>(len2pco==null?[""]:len2pco).length&&(len2pso2==null?[""]:len2pso2).length>(len2p25==null?[""]:len2p25).length&&(len2so2==null?[""]:len2so2).length>(len2po3==null?[""]:len2po3).length){
            f2='二氧化硫';
        }else if((len2pco==null?[""]:len2pco).length>(len2p10==null?[""]:len2p10).length&&(len2pco==null?[""]:len2pco).length>(len2pno2==null?[""]:len2pno2).length&&(len2pco==null?[""]:len2pco).length>(len2p25==null?[""]:len2p25).length&&(len2pco==null?[""]:len2pco).length>(len2pso2==null?[""]:len2pso2).length&&(len2pco==null?[""]:len2pco).length>(len2po3==null?[""]:len2po3).length){
            f2='一氧化碳';
        }else if((len2p10==null?[""]:len2p10).length>(len2p25==null?[""]:len2p25).length&&(len2p10==null?[""]:len2p10).length>(len2pno2==null?[""]:len2pno2).length&&(len2p10==null?[""]:len2p10).length>(len2pco==null?[""]:len2pco).length&&(len2p10==null?[""]:len2p10).length>(len2so2==null?[""]:len2so2).length&&(len2p10==null?[""]:len2p10).length>(len2po3==null?[""]:len2po3).length){
            f2='PM10';
        }else{
            f2='PM2.5';
        }

//T+1，盆西

        if(!data1[1]){
            data1[1]="";
        }
        if(!data2[1]){
            data2[1]="";
        }
        if(!data3[1]){
            data3[1]="";
        }

        if(!(data1[1].search(regq)>-1||data1[1].search(regz)>-1||data1[1].search(regyz)>-1||data1[1].search(regzd)>-1)){
            message1+="";
        }else{
            message1+=newdata1+"："+"\r\n"+"盆地西部局部城市";
        }

        if(data1[1].search(regyz)>-1){
            message1+="为严重污染，";
        }else{
            message1+="";
        }

        if((data1[1].search(regyz)>-1)){
            if(data1[1].search(regzd)>-1){
                message1+="或重度污染，";
            }else{
                message1+="";
            }
        }else{
            if(data1[1].search(regzd)>-1){
                message1+="为重度污染，";
            }else{
                message1+="";
            }
        }

        if((data1[1].search(regzd)>-1)||(data1[1].search(regyz)>-1)){
            if(data1[1].search(regz)>-1){
                message1+="或中度污染，";
            }else{
                message1+="";
            }
        }else{
            if(data1[1].search(regz)>-1){
                message1+="为中度污染，";
            }else{
                message1+="";
            }
        }

        if((data1[1].search(regz)>-1)||(data1[1].search(regzd)>-1)||(data1[1].search(regyz)>-1)){//找到任意一个比当前严重的污染
            if(data1[1].search(regq)>-1){
                message1+="或轻度污染；";
                message1+="\r\n";
            }else{
                message1+="";
            }
        }else{
            if(data1[1].search(regq)>-1){
                message1+="为轻度污染；";
                message1+="\r\n";
            }else{
                message1+="";
            }
        }
//T+1，盆南
        if((data2[1].search(regq)>-1)||(data2[1].search(regz)>-1)||(data2[1].search(regzd)>-1)||(data2[1].search(regyz)>-1)){
            if((data1[1].search(regq)>-1)||(data1[1].search(regz)>-1)||(data1[1].search(regzd)>-1)||(data1[1].search(regyz)>-1)){
                message1+="盆地南部局部城市";
            }else{
                message1+=newdata1+"："+"\r\n"+"盆地南部局部城市"
            }

            if(data2[1].search(regyz)>-1){
                message1+="为严重污染，";
            }else{
                message1+="";
            }
            if((data2[1].search(regyz)>-1)){
                if(data2[1].search(regzd)>-1){
                    message1+="或重度污染，";
                }else{
                    message1+="";
                }
            }else{
                if(data2[1].search(regzd)>-1){
                    message1+="为重度污染，";
                }else{
                    message1+="";
                }
            }
            if((data2[1].search(regzd)>-1)||(data2[1].search(regyz)>-1)){
                if(data2[1].search(regz)>-1){
                    message1+="或中度污染，";
                }else{
                    message1+="";
                }
            }else{
                if(data2[1].search(regz)>-1){
                    message1+="为中度污染，";
                }else{
                    message1+="";
                }
            }
            if((data1[1].search(regz)>-1)||(data1[1].search(regzd)>-1)||(data1[1].search(regyz)>-1)){//找到任意一个比当前严重的污染
                if(data1[1].search(regq)>-1){
                    message1+="或轻度污染；";
                    message1+="\r\n";
                }else{
                    message1+="";
                }
            }else{
                if(data1[1].search(regq)>-1){
                    message1+="为轻度污染；";
                    message1+="\r\n";
                }else{
                    message1+="";
                }
            }

        }

//T+1，盆东北

        if((data3[1].search(regq)>-1)||(data3[1].search(regz)>-1)||(data3[1].search(regzd)>-1)||(data3[1].search(regyz)>-1)){
            if((data1[1].search(regq)>-1)||(data1[1].search(regz)>-1)||(data1[1].search(regzd)>-1)||(data1[1].search(regyz)>-1)||(data2[1].search(regq)>-1)||(data2[1].search(regz)>-1)||(data2[1].search(regzd)>-1)||(data2[1].search(regyz)>-1)){
                message1+="盆地东北部局部城市";
            }else{
                message1+=newdata1+"："+"\r\n"+"盆地东北部局部城市"
            }


            if(data3[1].search(regyz)>-1){
                message1+="为严重污染，";
            }else{
                message1+="";
            }
            if((data3[1].search(regyz)>-1)){
                if(data3[1].search(regzd)>-1){
                    message1+="或重度污染，";
                }else{
                    message1+="";
                }
            }else{
                if(data3[1].search(regzd)>-1){
                    message1+="为重度污染，";
                }else{
                    message1+="";
                }
            }
            if((data3[1].search(regzd)>-1)||(data3[1].search(regyz)>-1)){
                if(data3[1].search(regz)>-1){
                    message1+="或中度污染，";
                }else{
                    message1+="";
                }
            }else{
                if(data3[1].search(regz)>-1){
                    message1+="为中度污染，";
                }else{
                    message1+="";
                }
            }
            if((data3[1].search(regz)>-1)||(data3[1].search(regzd)>-1)||(data3[1].search(regyz)>-1)){//找到任意一个比当前严重的污染
                if(data3[1].search(regq)>-1){
                    message1+="或轻度污染；";
                    message1+="\r\n";
                }else{
                    message1+="";
                }
            }else{
                if(data3[1].search(regq)>-1){
                    message1+="为轻度污染；";
                    message1+="\r\n";
                }else{
                    message1+="";
                }
            }


        }
        if(!(data1[1].search(regq)>-1||data2[1].search(regq)>-1||data3[1].search(regq)>-1)){
            message1+=newdata1+"：";
            message1+="\r\n";
            message1+="盆地地区为优或良；";
            message1+="\r\n";
            message1+="攀西地区和川西高原大部城市为优或良。";
            message1+="\r\n";
            message1+="全省首要污染物以"+f2+"为主。"
            message1+="\r\n";
        }else{
            message1+="盆地其余城市为优或良；"
            message1+="\r\n";
            message1+="攀西地区和川西高原大部城市为优或良。"
            message1+="\r\n";
            message1+="全省首要污染物以"+f2+"为主。";
            message1+="\r\n";
        }



        var f3="";
        if((len3p25==null?[""]:len3p25).length>(len3p10==null?[""]:len3p10).length&&(len3p25==null?[""]:len3p25).length>(len3pno2==null?[""]:len3pno2).length&&(len3p25==null?[""]:len3p25).length>(len3pco==null?[""]:len3pco).length&&(len3p25==null?[""]:len3p25).length>(len3pso2==null?[""]:len3pso2).length&&(len3p25==null?[""]:len3p25).length>(len3po3==null?[""]:len3po3).length){
            f3='PM2.5';

        }else if((len3pno2==null?[""]:len3pno2).length>(len3p10==null?[""]:len3p10).length&&(len3pno2==null?[""]:len3pno2).length>(len3p25==null?[""]:len3p25).length&&(len3pno2==null?[""]:len3pno2).length>(len3pco==null?[""]:len3pco).length&&(len3pno2==null?[""]:len3pno2).length>(len3pso2==null?[""]:len3pso2).length&&(len3pno2==null?[""]:len3pno2).length>(len3po3==null?[""]:len3po3).length){
            f3='二氧化氮';

        }else if((len3po3==null?[""]:len3po3).length>(len3p10==null?[""]:len3p10).length&&(len3po3==null?[""]:len3po3).length>(len3pno2==null?[""]:len3pno2).length&&(len3po3==null?[""]:len3po3).length>(len3pco==null?[""]:len3pco).length&&(len3po3==null?[""]:len3po3).length>(len3pso2==null?[""]:len3pso2).length&&(len3po3==null?[""]:len3po3).length>(len3p25==null?[""]:len3p25).length){
            f3='臭氧8小时';
        }else if((len3pso2==null?[""]:len3pso2).length>(len3p10==null?[""]:len3p10).length&&(len3pso2==null?[""]:len3pso2).length>(len3pno2==null?[""]:len3pno2).length&&(len3pso2==null?[""]:len3pso2).length>(len3pco==null?[""]:len3pco).length&&(len3pso2==null?[""]:len3pso2).length>(len3p25==null?[""]:len3p25).length&&(len3so2==null?[""]:len3so2).length>(len3po3==null?[""]:len3po3).length){
            f3='二氧化硫';
        }else if((len3pco==null?[""]:len3pco).length>(len3p10==null?[""]:len3p10).length&&(len3pco==null?[""]:len3pco).length>(len3pno2==null?[""]:len3pno2).length&&(len3pco==null?[""]:len3pco).length>(len3p25==null?[""]:len3p25).length&&(len3pco==null?[""]:len3pco).length>(len3pso2==null?[""]:len3pso2).length&&(len3pco==null?[""]:len3pco).length>(len3po3==null?[""]:len3po3).length){
            f3='一氧化碳';
        }else if((len3p10==null?[""]:len3p10).length>(len3p25==null?[""]:len3p25).length&&(len3p10==null?[""]:len3p10).length>(len3pno2==null?[""]:len3pno2).length&&(len3p10==null?[""]:len3p10).length>(len3pco==null?[""]:len3pco).length&&(len3p10==null?[""]:len3p10).length>(len3so2==null?[""]:len3so2).length&&(len3p10==null?[""]:len3p10).length>(len3po3==null?[""]:len3po3).length){
            f3='PM10';
        }else{
            f3='PM2.5';
        }
//T+2，盆西
        if(!data1[2]){
            data1[2]="";
        }
        if(!data2[2]){
            data2[2]="";
        }
        if(!data3[2]){
            data3[2]="";
        }
        if(!(data1[2].search(regq)>-1||data1[2].search(regz)>-1||data1[2].search(regyz)>-1||data1[2].search(regzd)>-1)){
            message1+="";
        }else{
            message1+=newdata2+"："+"\r\n"+"盆地西部局部城市";
        }

        if(data1[2].search(regyz)>-1){
            message1+="为严重污染，";
        }else{
            message1+="";
        }

        if((data1[2].search(regyz)>-1)){
            if(data1[2].search(regzd)>-1){
                message1+="或重度污染，";
            }else{
                message1+="";
            }
        }else{
            if(data1[2].search(regzd)>-1){
                message1+="为重度污染，";
            }else{
                message1+="";
            }
        }

        if((data1[2].search(regzd)>-1)||(data1[2].search(regyz)>-1)){
            if(data1[2].search(regz)>-1){
                message1+="或中度污染，";
            }else{
                message1+="";
            }
        }else{
            if(data1[2].search(regz)>-1){
                message1+="为中度污染，";
            }else{
                message1+="";
            }
        }

        if((data1[2].search(regz)>-1)||(data1[2].search(regzd)>-1)||(data1[2].search(regyz)>-1)){//找到任意一个比当前严重的污染
            if(data1[2].search(regq)>-1){
                message1+="或轻度污染；";
                message1+="\r\n";
            }else{
                message1+="";
            }
        }else{
            if(data1[2].search(regq)>-1){
                message1+="为轻度污染；";
                message1+="\r\n";
            }else{
                message1+="";
            }
        }
//T+2，盆南
        if((data2[2].search(regq)>-1)||(data2[2].search(regz)>-1)||(data2[2].search(regzd)>-1)||(data2[2].search(regyz)>-1)){
            if((data1[2].search(regq)>-1)||(data1[2].search(regz)>-1)||(data1[2].search(regzd)>-1)||(data1[2].search(regyz)>-1)){
                message1+="盆地南部局部城市";
            }else{
                message1+=newdata2+"："+"\r\n"+"盆地南部局部城市";
            }


            if(data2[2].search(regyz)>-1){
                message1+="为严重污染，";
            }else{
                message1+="";
            }
            if((data2[2].search(regyz)>-1)){
                if(data2[2].search(regzd)>-1){
                    message1+="或重度污染，";
                }else{
                    message1+="";
                }
            }else{
                if(data2[2].search(regzd)>-1){
                    message1+="为重度污染，";
                }else{
                    message1+="";
                }
            }
            if((data2[2].search(regzd)>-1)||(data2[2].search(regyz)>-1)){
                if(data2[2].search(regz)>-1){
                    message1+="或中度污染，";
                }else{
                    message1+="";
                }
            }else{
                if(data2[2].search(regz)>-1){
                    message1+="为中度污染，";
                }else{
                    message1+="";
                }
            }
            if((data1[2].search(regz)>-1)||(data1[2].search(regzd)>-1)||(data1[2].search(regyz)>-1)){//找到任意一个比当前严重的污染
                if(data1[2].search(regq)>-1){
                    message1+="或轻度污染；";
                    message1+="\r\n";
                }else{
                    message1+="";
                }
            }else{
                if(data1[2].search(regq)>-1){
                    message1+="为轻度污染；";
                    message1+="\r\n";
                }else{
                    message1+="";
                }
            }

        }

//T+3，盆东北
        if((data3[2].search(regq)>-1)||(data3[2].search(regz)>-1)||(data3[2].search(regzd)>-1)||(data3[2].search(regyz)>-1)){
            if((data1[2].search(regq)>-1)||(data1[2].search(regz)>-1)||(data1[2].search(regzd)>-1)||(data1[2].search(regyz)>-1)||(data2[2].search(regq)>-1)||(data2[2].search(regz)>-1)||(data2[2].search(regzd)>-1)||(data2[2].search(regyz)>-1)){
                message1+="盆地东北部局部城市";
            }else{
                message1+=newdata2+"："+"\r\n"+"盆地东北部局部城市";
            }


            if(data3[2].search(regyz)>-1){
                message1+="为严重污染，";
            }else{
                message1+="";
            }
            if((data3[2].search(regyz)>-1)){
                if(data3[2].search(regzd)>-1){
                    message1+="或重度污染，";
                }else{
                    message1+="";
                }
            }else{
                if(data3[2].search(regzd)>-1){
                    message1+="为重度污染，";
                }else{
                    message1+="";
                }
            }
            if((data3[2].search(regzd)>-1)||(data3[2].search(regyz)>-1)){
                if(data3[2].search(regz)>-1){
                    message1+="或中度污染，";
                }else{
                    message1+="";
                }
            }else{
                if(data3[2].search(regz)>-1){
                    message1+="为中度污染，";
                }else{
                    message1+="";
                }
            }
            if((data3[2].search(regz)>-1)||(data3[2].search(regzd)>-1)||(data3[2].search(regyz)>-1)){//找到任意一个比当前严重的污染
                if(data3[2].search(regq)>-1){
                    message1+="或轻度污染；";
                    message1+="\r\n";
                }else{
                    message1+="";
                }
            }else{
                if(data3[2].search(regq)>-1){
                    message1+="为轻度污染；";
                    message1+="\r\n";
                }else{
                    message1+="";
                }
            }

        }

        if(!(data1[2].search(regq)>-1||data2[2].search(regq)>-1||data3[2].search(regq)>-1)){
            message1+=newdata1+"：";
            message1+="\r\n";
            message1+="盆地地区为优或良；";
            message1+="\r\n";
            message1+="攀西地区和川西高原大部城市为优或良。";
            message1+="\r\n";
            message1+="全省首要污染物以"+f3+"为主。"
            message1+="\r\n";
        }else{
            message1+="盆地其余城市为优或良；"
            message1+="\r\n";
            message1+="攀西地区和川西高原大部城市为优或良。"
            message1+="\r\n";
            message1+="全省首要污染物以"+f3+"为主。";
            message1+="\r\n";
        }

        $("#"+textid).html(message1);
    }
}