var userName = "";
var forecastPersonalPro={
    init:function(){
        var uarr = window.location.href.split("?");
        userName = uarr[1].split("=")[1];
        $('#datepicker').datepicker({
            changeMonth: true,
            changeYear: true,
            minDate:"2015年01月01日",
            maxDate: "+0D",
            dateFormat : 'yy年mm月dd日',
            prevText : '<i class="fa fa-chevron-left"></i>',
            nextText : '<i class="fa fa-chevron-right"></i>',
            onSelect: function(selectDate){
                forecastPersonalPro.queryPersonal();
            }
        });

        //forecastPersonalPro.queryPersonal();

        $("textarea").keyup(function(){
            forecastPersonalPro.genMessage();
        }).blur(function(){
            forecastPersonalPro.genMessage();
        });

        $(".submitBtn1").bind("click",forecastPersonalPro.comfirm_tab3);
        $(".submitBtn").bind("click",forecastPersonalPro.comfirm);
        $('#datepicker_tab1').datepicker({
            changeMonth: true,
            changeYear: true,
            minDate:"2015年01月01日",
            maxDate: "+0D",
            dateFormat : 'yy年mm月dd日',
            prevText : '<i class="fa fa-chevron-left"></i>',
            nextText : '<i class="fa fa-chevron-right"></i>',
            onSelect: function(selectDate){
                forecastPersonalPro.queryAudit();
            }
        });
        $('#datepicker_tab2').val($.datepicker.formatDate('yy年mm月dd日',new Date()));
        $('#datepicker_tab2').datepicker({
            changeMonth: true,
            changeYear: true,
            minDate:"2015年01月01日",
            maxDate: "+0D",
            dateFormat : 'yy年mm月dd日',
            prevText : '<i class="fa fa-chevron-left"></i>',
            nextText : '<i class="fa fa-chevron-right"></i>',
            onSelect: function(selectDate){

                forecastPersonalPro.queryCityModelResult2();
                forecastPersonalPro.queryCityAuditResult();

                forecastPersonalPro.queryPersonal();
            }
        });

        $('#datepicker_tab3').val($.datepicker.formatDate('yy年mm月dd日',new Date()));

        $('#datepicker_tab3').datepicker({
            changeMonth: true,
            changeYear: true,
            minDate:"2015年01月01日",
            maxDate: "+0D",
            dateFormat : 'yy年mm月dd日',
            prevText : '<i class="fa fa-chevron-left"></i>',
            nextText : '<i class="fa fa-chevron-right"></i>',
            onSelect: function(selectDate){
                forecastPersonalPro.queryCityModelResult();

            }
        });
        $.ajaxSetup({
            async: false
        });
        forecastPersonalPro.queryCityModelResult2();
        forecastPersonalPro.queryCityModelResult();
        $.ajaxSetup({
            async: true
        });
        forecastPersonalPro.getMessagezh();




    },
    getNowFormatDate:function()
    {
        var day = new Date();
        var Year = 0;
        var Month = 0;
        var Day = 0;
        var CurrentDate = "";
        //初始化时间
        //Year= day.getYear();//有火狐下2008年显示108的bug
        Year= day.getFullYear();//ie火狐下都可以
        Month= day.getMonth()+1;
        Day = day.getDate();
        //Hour = day.getHours();
        // Minute = day.getMinutes();
        // Second = day.getSeconds();
        CurrentDate += Year + "";
        if (Month >= 10 )
        {
            CurrentDate += Month + "";
        }
        else
        {
            CurrentDate += "0" + Month + "";
        }
        if (Day >= 10 )
        {
            CurrentDate += Day ;
        }
        else
        {
            CurrentDate += "0" + Day ;
        }
        return CurrentDate;
        alert(CurrentDate);
    },
    liveDemo:function(liveTitle,liveContent){
        $.bigBox({
            title : liveTitle,
            content : liveContent,
            color : "#C46A69",
            icon : "fa fa-warning shake animated",
            timeout : 3000
        });
    },
    /*绿色提示框*/
    liveDemoGreen:function(liveTitle,liveContent){
        $.bigBox({
            title : liveTitle,
            content : liveContent,
            color : "#739E73",
            icon : "fa fa-check shake animated",
            timeout : 3000
        });
    },
    submit_tab3:function(){


        var data={};
        var trendforecast=[];
        var conditionforecast=[];
        var forecastpeople=[];
        var timePoint=[];
        var timePointNew=[];
        var date = $("#datepicker_tab3").datepicker("getDate");
        var timestamp=new Date().getTime();
        if (date!=null) {
            data.timePoint=date.getTime();
            data.timePointNew=timestamp;
        };

//		trendforecast.push($(".tableforecast").find("textarea[type=table1]").val());
//		console.log($(".tableforecast").find("textarea[type='table1']"));
//		conditionforecast.push($(".tableforecast").find("textarea[type=table2]").val())
        /*		pm2_5.push($table.find("tr[type='pm2_5']").children("td[num='"+(i+1)+"']").children("input").val());
         pm2_5_dr.push($table.find("tr[type='pm2_5_dr']").children("td[num='"+(i+1)+"']").text());*/
        data.trendforecast=$(".tableforecast").find("textarea[type=table1]").val();
        data.conditionforecast=$(".tableforecast").find("textarea[type=table2]").val();
        data.forecastpeople=$("#forecaster1").val();
        if(data.trendforecast=="" ||data.conditionforecas==""||data.forecastpeople==""){
            forecastPersonalPro.liveDemo("提示","请将指导信息填写完整");
            return 1;
        }



        $.ajax({
            type: "get",
            url: "/smartadmin/mobileforecast/saveForecastInf",
            data: data,

            timeout:15000,
            beforeSend:function(){
                $("#loadingText").text("正在提交数据，请稍候······");

            },
            error:function(){


                forecastPersonalPro.liveDemo("提示","请求超时，请稍后重试！！");
            },
            success: function(data){
                $("#audit_tab").show();
                forecastPersonalPro.liveDemoGreen("成功","保存成功！！");
                //forecastPersonalPro.bootStrapDialogshow("small-dialog","",$("<label>保存成功!</label>"),"","","","","");
                /*	if(data.result){
                 if (data.data.state) {
                 hasHistory=true;
                 $("#audit_tab").show();
                 $.smallBox({
                 title: data.data.message,
                 content: "<i class='fa fa-clock-o'></i> <i>系统提示...</i>",
                 color: "#296191",
                 iconSmall: "fa  fa-check-circle bounce animated",
                 timeout: 5000
                 });
                 }else{
                 $(".submitBtn").removeClass("disabled");
                 // $(".submitBtn").bind("click",forecastPersonal.comfirm);
                 $.smallBox({
                 title: data.data.message,
                 content: "<i class='fa fa-clock-o'></i> <i>系统提示...</i>",
                 color: "rgb(158, 36, 41)",
                 iconSmall: "fa  fa-times-circle bounce animated" ,
                 timeout:5000
                 });

                 }
                 }else{
                 timeoutAlert();
                 }*/
            }});
        return 1;
    },
    submit_tab2:function(){


        var data={};
        var trendforecast=[];
        var conditionforecast=[];
        var forecastpeople=[];
        var timePoint=[];
        var date2 = $("#datepicker_tab2").datepicker("getDate");
        var timestamp2=new Date().getTime();
        if (date2!=null) {
            data.timePoint=date2.getTime();
            data.timePointNew=timestamp2;
        };

//		trendforecast.push($(".tableforecast").find("textarea[type=table1]").val());
//		console.log($(".tableforecast").find("textarea[type='table1']"));
//		conditionforecast.push($(".tableforecast").find("textarea[type=table2]").val())
        /*		pm2_5.push($table.find("tr[type='pm2_5']").children("td[num='"+(i+1)+"']").children("input").val());
         pm2_5_dr.push($table.find("tr[type='pm2_5_dr']").children("td[num='"+(i+1)+"']").text());*/
        //	data.trendforecast=$(".tableforecast2").find("textarea[type=table1]").val();
        data.forecastresult=$(".tableforecast2").find("textarea[type=table2]").val();
        data.forecastpeople=$("#forecaster2").val();
        console.log(data.timePoint);
        console.log(data.timePoint);
        if(data.forecastresult==""||data.forecastpeople==""){
            forecastPersonalPro.liveDemo("提示","请将指导信息填写完整");
            return 1;
        }

        $.ajax({
            type: "get",
            url: "/smartadmin/mobileforecast/saveForecastInf2",
            data: data,

            timeout:15000,
            beforeSend:function(){
                $("#loadingText").text("正在提交数据，请稍候······");

            },
            error:function(){


                forecastPersonalPro.liveDemo("提示","请求超时，请稍后重试！！");

            },
            success: function(data){
                if(data.result){
                    forecastPersonalPro.liveDemoGreen("成功","保存成功！！");

                }else{
                    timeoutAlert();
                }
            }});
        return 1;
    },
    queryPersonal:function(){
        $("#tab2_submitBtn").find(".submitBtn").addClass("disabled");
        $("#tab2_submitBtn").find(".submitBtn").unbind( "click" );

        var date = $("#datepicker_tab2").datepicker("getDate");
        var data={};
        if (date!=null) {
            data.timePoint=date.getTime();
        };
        data.userName=userName;
        $.ajax({
            type: "GET",
            url: "/smartadmin/mobileforecast/getForecastPersonalPro",
            data: data,
            dataType: "json",
            timeout:15000,
            beforeSend:function(){
                $("#loadingText").text("正在获取数据，请稍候······");
                $("#over").attr("style","display:");
                $("#layout").attr("style","display:");
                $("html").css({overflow:"hidden"});
            },
            error:function(){
                $("#over").attr("style","display:none");
                $("#layout").attr("style","display:none");
                $("html").css({overflow:"scroll"});
            },
            success: function(data){
                $("#over").attr("style","display:none");
                $("#layout").attr("style","display:none");
                $("html").css({overflow:"scroll"});
                if(data.result){
                    var d=new Date(data.data.timePoint);
                    $('#datepicker_tab2').val($.datepicker.formatDate('yy年mm月dd日',d));

                    var isToday=forecastPersonalPro.isToday(d);

                    for (var i = 0; i < 3; i++) {
                        d.setDate(d.getDate()+1);
                        $("#tab2table1").find("tbody").children("tr").eq(i).children("td").eq(0).text($.datepicker.formatDate('mm月dd日',d));
                    };

                    $("#tab2table1").attr("type",1);
                    if (data.data.isDone&&data.data.isAudit) {
                        for (var i = 0; i < 3; i++) {
                            var td_=$("#tab2table1 tbody").children("tr").eq(i).children("td").eq(1);
                            td_.children("div").eq(0).hide();
                            td_.children("div").eq(1).show();
                            td_.children("div").eq(1).html(eval("data.data.forecast.DAY"+i));
                        };


                    }else{
                        if (!data.data.isAudit&&isToday) {
                            if (data.data.isDone) {
                                for (var i = 0; i < 3; i++) {
                                    var td_=$("#tab2table1").find("tbody").children("tr").eq(i).children("td").eq(1);
                                    td_.children("div").eq(0).show();
                                    td_.children("div").eq(1).hide();

                                    td_.find("textarea").val(eval("data.data.forecast.DAY"+i));
                                };
                            }else{
                                //自动补全
                                //forecastPersonal.fillTable_auto(data.data);
                                for (var i = 0; i < 3; i++) {
                                    var td_=$("#tab2table1").find("tbody").children("tr").eq(i).children("td").eq(1);
                                    td_.children("div").eq(0).show();
                                    td_.children("div").eq(1).hide();

                                    td_.find("textarea").val("");
                                };
                            }

                            $("#tab2_submitBtn").find(".submitBtn").removeClass("disabled");
                            $("#tab2_submitBtn").find(".submitBtn").bind("click",forecastPersonalPro.comfirm);
                            $("#tab2table1").attr("type",0);
                        }else{
                            //历史数据
                            for (var i = 0; i < 3; i++) {
                                var td_=$("#tab2table1").find("tbody").children("tr").eq(i).children("td").eq(1);
                                td_.children("div").eq(0).hide();
                                td_.children("div").eq(1).show();
                                if (data.data.isDone) {
                                    td_.children("div").eq(1).html(eval("data.data.forecast.DAY"+i));
                                }else{
                                    td_.children("div").eq(1).html("");
                                }

                            };
                        }

                    }
                    if (data.data.isAudit&&isToday) {
                        //$(".tip_audit").html('（今日数据已审核！<a style="display: inline;padding: 0px;cursor: pointer;" onclick="forecastPersonalPro.toForecastAuditPro();">点击查看</a>）');
                    };

                    forecastPersonalPro.genMessage();

                }else{
                    timeoutAlert();
                }
            }});
    },
    queryAudit:function(){
        $("#tab1").find(".submitBtn").addClass("disabled");
        $("#tab1").find(".submitBtn").unbind( "click" );

        // $("#notice").addClass("disabled");
        var date = $("#datepicker_tab1").datepicker("getDate");
        var data={};
        if (date!=null) {
            data.timePoint=date.getTime();
        };
        data.userName = userName;
        $.ajax({
            type: "GET",
            url: "/smartadmin/mobileforecast/getForecastAuditPro",
            data: data,
            dataType: "json",
            timeout:15000,
            beforeSend:function(){
                $("#loadingText").text("正在获取数据，请稍候······");
                $("#over").attr("style","display:");
                $("#layout").attr("style","display:");
                $("html").css({overflow:"hidden"});
            },
            error:function(){
                $("#over").attr("style","display:none");
                $("#layout").attr("style","display:none");
                $("html").css({overflow:"scroll"});
            },
            success: function(data){
                if(data.result){

                    forecastPersonalPro.genTable_tab1(data.data);


                    $("#over").attr("style","display:none");
                    $("#layout").attr("style","display:none");
                    $("html").css({overflow:"scroll"});



                }else{
                    timeoutAlert();
                }
            }});
    },

    submit:function(){
        $("#tab2_submitBtn").find(".submitBtn").addClass("disabled");
        $("#tab2_submitBtn").find(".submitBtn").unbind( "click" );

        var data={};
        var forecast=[];
        for (var i = 0; i < 3; i++) {
            forecast.push($("#tab2table1").find("textarea").eq(i).val());
        };

        data.forecast=forecast;
        data.userName = userName;
        $.ajax({
            type: "post",
            url: "/smartadmin/mobileforecast/saveForecastPro",
            data: data,
            // dataType: "json",
            timeout:15000,
            beforeSend:function(){
                $("#loadingText").text("正在提交数据，请稍候······");
                $("#over").attr("style","display:");
                $("#layout").attr("style","display:");
                $("html").css({overflow:"hidden"});
            },
            error:function(){
                $("#over").attr("style","display:none");
                $("#layout").attr("style","display:none");
                $("html").css({overflow:"scroll"});

                $.smallBox({
                    title: "请求超时，请稍后重试！",
                    content: "<i class='fa fa-clock-o'></i> <i>刚 刚...</i>",
                    color: "rgb(158, 36, 41)",
                    iconSmall: "fa  fa-times-circle bounce animated" ,
                    timeout:5000
                });

            },
            success: function(data){
                $("#over").attr("style","display:none");
                $("#layout").attr("style","display:none");
                $("html").css({overflow:"scroll"});
                if(data.result){
                    if (data.data.state) {
                        $.smallBox({
                            title: data.data.message,
                            content: "<i class='fa fa-clock-o'></i> <i>系统提示...</i>",
                            color: "#296191",
                            iconSmall: "fa  fa-check-circle bounce animated",
                            timeout: 5000
                        });
                    }else{
                        $("#tab2_submitBtn").find(".submitBtn").removeClass("disabled");
                        $("#tab2_submitBtn").find(".submitBtn").bind("click",forecastPersonalPro.comfirm);
                        $.smallBox({
                            title: data.data.message,
                            content: "<i class='fa fa-clock-o'></i> <i>系统提示...</i>",
                            color: "rgb(158, 36, 41)",
                            iconSmall: "fa  fa-times-circle bounce animated" ,
                            timeout:5000
                        });

                    }
                }else{
                    timeoutAlert();
                }
            }});
        return 1;
    },
    submit_tab1:function(){
        $("#tab1").find(".submitBtn").addClass("disabled");
        $("#tab1").find(".submitBtn").unbind( "click" );

        var data={};
        var forecast=[];
        for (var i = 0; i < 3; i++) {
            forecast.push($("#tab1").find("textarea").eq(i).val());
        };

        data.forecast=forecast;
        data.userName = userName;
        $.ajax({
            type: "post",
            url: "/smartadmin/mobileforecast/saveForecastAuditPro",
            data: data,
            // dataType: "json",
            timeout:15000,
            beforeSend:function(){
                $("#loadingText").text("正在提交数据，请稍候······");
                $("#over").attr("style","display:");
                $("#layout").attr("style","display:");
                $("html").css({overflow:"hidden"});
            },
            error:function(){
                $("#over").attr("style","display:none");
                $("#layout").attr("style","display:none");
                $("html").css({overflow:"scroll"});

                $.smallBox({
                    title: "请求超时，请稍后重试！",
                    content: "<i class='fa fa-clock-o'></i> <i>刚 刚...</i>",
                    color: "rgb(158, 36, 41)",
                    iconSmall: "fa  fa-times-circle bounce animated" ,
                    timeout:5000
                });

            },
            success: function(data){
                $("#over").attr("style","display:none");
                $("#layout").attr("style","display:none");
                $("html").css({overflow:"scroll"});
                if(data.result){
                    if (data.data.state) {
                        $.smallBox({
                            title: data.data.message,
                            content: "<i class='fa fa-clock-o'></i> <i>系统提示...</i>",
                            color: "#296191",
                            iconSmall: "fa  fa-check-circle bounce animated",
                            timeout: 5000
                        });
                    }else{
                        $("#tab0").find(".submitBtn").removeClass("disabled");
                        $("#tab0").find(".submitBtn").bind("click",forecastPersonalPro.comfirm);
                        $.smallBox({
                            title: data.data.message,
                            content: "<i class='fa fa-clock-o'></i> <i>系统提示...</i>",
                            color: "rgb(158, 36, 41)",
                            iconSmall: "fa  fa-times-circle bounce animated" ,
                            timeout:5000
                        });

                    }
                }else{
                    timeoutAlert();
                }
            }});
        return 1;
    },
    comfirm:function(){
        var flag=true;
        $("#tab2table1").find("textarea").each(function(){
            if ($(this).val()=="") {
                flag=false;
                $(this).parents("td").addClass("state-error");
            };
        });
        if (flag) {
            forecastPersonalPro.bootStrapDialogshow("small-dialog","提交确认",$("<label>提交完成后不可修改，是否确认提交本次预测？</label>"),"forecastPersonalPro.submit_tab2()","","取消","确认","");
        }else{
            forecastPersonalPro.liveDemo("提示","错误，必填项不可为空！！");
        }

    },
    comfirm_tab1:function(){
        var flag=true;
        $("#tab1").find("textarea").each(function(){
            if ($(this).val()=="") {
                flag=false;
                $(this).parents("td").addClass("state-error");
            };
        });
        if (flag) {
            forecastPersonalPro.bootStrapDialogshow("small-dialog","提交确认",$("<label>提交完成后不可修改，是否确认提交本次预测？</label>"),"forecastPersonalPro.submit_tab1()","","取消","确认","");
        }else{
            $.smallBox({
                title : "错误！",
                content : "必填项不可为空！",
                color : "rgb(158, 36, 41)",
                timeout: 5000,
                icon : "fa fa-bell swing animated"
            });

        }
    },
    comfirm_tab3:function(){

        var flag=true;
        $("#tab1").find("textarea").each(function(){
            if ($(this).val()=="") {
                flag=false;
                $(this).parents("td").addClass("state-error");
            };
        });
        if (flag) {
            forecastPersonalPro.bootStrapDialogshow("small-dialog","提交确认",$("<label>提交完成后不可修改，是否确认提交本次预测？</label>"),"forecastPersonalPro.submit_tab3()","","取消","确认","");
        }else{
            forecastPersonalPro.liveDemo("提示","错误，必填项不可为空！！");

        }
    },

    genMessage:function(){
        $("#message").html("");
        var message="";
        for (var i = 0; i < 3; i++) {
            message+=$("#tab2table1").find("tbody").children("tr").eq(i).children("td").eq(0).text()+"，";
            if ($("#tab2table1").attr("type")==0) {
                message+=$("#tab2table1").find("tbody").children("tr").eq(i).children("td").eq(1).find("textarea").val();
            }else{
                var m1=$("#tab2table1").find("tbody").children("tr").eq(i).children("td").eq(1).children("div").eq(1).text();
                if (m1.trim()=="") {
                    $("#message").html("<span style='font-size: 24px; text-align: center; text-shadow: black 1px 1px 1px;margin: 0 auto;display: block;'>当日没有预报</span>");
                    return;
                };
                message+=m1;
            }
            message+="<br/>";
        };
        $("#message").html(message);
        var forecastMessage=$("#message").html(message).text();
        forecastMessage = "";
        $(".tableforecast2").find("textarea[name='conditionforecast']").val("全省未来三天区域环境空气质量预报："+forecastMessage);
    },
    genForecast:function(btn,index){
        btn=$(btn);
        var textarea=btn.next().next();

        var city=$("#tab2table1").find("input[name='city"+index+"']:checked").val();
        if (city=="全部城市") {city=""};

        var area="";
        var area_checked=$("#tab2table1").find("input[name='area"+index+"']:checked");
        if (city!="其余"&&(area_checked.length==0)) {
            var b=btn.prev().prev().prev().prev().find("b");
            b.show().css({"opacity":"1"});
            setTimeout(function(){
                b.hide().css({"opacity":"0"});
            },2000);
            return;
        }else{
            area_checked.each(function(k,v){
                if (k>0) {area+="、"};
                area+=$(this).val();
            });
        }



        var quality="";
        var quality_checked=$("#tab2table1").find("input[name='quality"+index+"']:checked");
        if (quality_checked.length==0||quality_checked.length>2) {
            var b=btn.prev().prev().find("b");
            b.show().css({"opacity":"1"});
            setTimeout(function(){
                b.hide().css({"opacity":"0"});
            },2000);
            return;
        }else{
            quality_checked.each(function(k,v){
                if (k>0) {quality+="至"};
                quality+=$(this).val();
            });
        }

        var primarypollutant="";
        var primarypollutant_checked=$("#tab2table1").find("input[name='primarypollutant"+index+"']:checked");
        if (primarypollutant_checked.length==0||primarypollutant_checked.length>2) {
            var b=btn.prev().prev().find("b");
            b.show().css({"opacity":"1"});
            setTimeout(function(){
                b.hide().css({"opacity":"0"});
            },2000);
            return;
        }else{
            primarypollutant_checked.each(function(k,v){
                if (k>0) {primarypollutant+="或"};
                primarypollutant+=$(this).val();
            });
        }

        var data=textarea.val();
        if (data.substr(data.length-1,1)=="。") {data=data.substr(0,data.length-1)+"，"};
        textarea.val(data+area+city+"为"+quality+"，"+"首要污染物为"+primarypollutant+"。");

        forecastPersonalPro.genMessage();
    },
    genForecast_tab1:function(btn,index){
        btn=$(btn);
        var textarea=btn.next().next();

        var city=$("#tab1").find("input[name='city"+index+"_tab1']:checked").val();
        if (city=="全部城市") {city=""};

        var area="";
        var area_checked=$("#tab1").find("input[name='area"+index+"_tab1']:checked");
        if (city!="其余"&&(area_checked.length==0)) {
            var b=btn.prev().prev().prev().find("b");
            b.show().css({"opacity":"1"});
            setTimeout(function(){
                b.hide().css({"opacity":"0"});
            },2000);
            return;
        }else{
            area_checked.each(function(k,v){
                if (k>0) {area+="、"};
                area+=$(this).val();
            });
        }


        var quality="";
        var quality_checked=$("#tab1").find("input[name='quality"+index+"_tab1']:checked");
        if (quality_checked.length==0||quality_checked.length>2) {
            var b=btn.prev().find("b");
            b.show().css({"opacity":"1"});
            setTimeout(function(){
                b.hide().css({"opacity":"0"});
            },2000);
            return;
        }else{
            quality_checked.each(function(k,v){
                if (k>0) {quality+="至"};
                quality+=$(this).val();
            });
        }

        var data=textarea.val();
        if (data.substr(data.length-1,1)=="。") {data=data.substr(0,data.length-1)+"，"};
        textarea.val(data+area+city+"为"+quality+"。");

        forecastPersonalPro.genMessage_tab1();
    },
    clearFore:function(btn,tab){
        $(btn).next().val("");
        if (tab==0) {
            forecastPersonalPro.genMessage();
        }else{
            forecastPersonalPro.genMessage_tab1();
        }


    },
    isToday:function(date){
        var today=new Date();
        return today.getFullYear()==date.getFullYear()&&today.getMonth()==date.getMonth()&&today.getDate()==date.getDate();
    },
    bootStrapDialogshow:function(conWidth,conTitle,fancybody,functionName,RemoveId,btn2Name,btn3Name,Ifdisabled){
        var flag=0;
        BootstrapDialog.show({
            title: conTitle,
            closable: false,
            draggable: true,
            cssClass : conWidth,
            message: fancybody,
            onshow: function(dialog) {
                if(Ifdisabled!=""){
                    dialog.getButton("disablebutton").disable();
                }
            },
            buttons: [{
                label: btn2Name,
                action: function(dialog) {
                    eval(RemoveId);
                    dialog.close();
                }
            }, {
                id:"disablebutton",
                label: btn3Name,
                cssClass: 'btn-primary',
                action: function(dialog) {
                    flag=eval(functionName);
                    if(flag==1){
                        dialog.close();
                    }
                }
            }]
        });
    },
    genTable_tab1:function(data){

        $("#tab1").find("table").attr("type",1);

        var date=new Date(data.timePoint);
        var isToday=forecastPersonalPro.isToday(date);
        $('#datepicker_tab1').val($.datepicker.formatDate('yy年mm月dd日',date));


        $("#date_tab1").text($.datepicker.formatDate('yy年mm月dd日',date));
        var username="";
        if (data.isAudit) {
            username=data.audit.USERNAME;
        }else if(data.isDone&&isToday){
            username=$.cookie('username');
        }
        $(".auditUser").text(username);


        var $tbody=$("#tab1").find("tbody").empty();

        var trs=[[],[],[]];
        for (var i = 0; i < data.forecastsCount; i++) {
            for (var j = 0; j < 3; j++) {
                trs[j].push($("<tr><td>"+data.forecasts[i].USERNAME+"</td><td>"+eval("data.forecasts[i].DAY"+j)+"</td></tr>"));
            };
        };


        if (data.isAudit) {
            for (var j = 0; j < 3; j++) {
                trs[j].push($("<tr><td >主班审核</td><td class='audit'>"+eval("data.audit.DAY"+j)+"</td></tr>"));
            };

        }else if(data.isDone&&isToday){
            for (var j = 0; j < 3; j++) {
                trs[j].push($('<tr><td  >主班审核</td><td class="audit"><div><div class="col col-xs-12" style="padding-left: 0px;text-align: left;width: 650px;margin: 0 auto;float: none;">                            <label class="" style="float:left;line-height: 25px;font-size: 16px;margin-right: 15px;">区&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;域：<b class="tooltip tooltip-top-left" style="left:0px;margin-bottom: 0px;padding: 5px;border-radius: 3px;display: none;"><i class="fa fa-exclamation-circle"></i>&nbsp;&nbsp;区域至少选1项!</b></label>                            <article class="" style="margin-bottom: 6px;font-size: 15px;-webkit-user-select: none;color: black;" id="">                            <label style="margin-right: 5px;" class="ui-popover" data-html="true" data-placement="top" data-trigger="hover" data-original-title="包含城市" data-content="成都、德阳、绵阳、眉山、资阳、乐山、雅安"><input type="checkbox" class="checkbox style-0" name="area'+j+'_tab1" value="盆地西部" onclick=""><span>盆地西部</span></label>                            <label style="margin-right: 5px;" class="ui-popover" data-html="true" data-placement="top" data-trigger="hover" data-original-title="包含城市" data-content="泸州、宜宾、自贡、内江"><input type="checkbox" class="checkbox style-0" name="area'+j+'_tab1" value="盆地南部" onclick=""><span>盆地南部</span></label>                            <label style="margin-right: 5px;" class="ui-popover" data-html="true" data-placement="top" data-trigger="hover" data-original-title="包含城市" data-content="南充、达州、广安、遂宁、广元、巴中"><input type="checkbox" class="checkbox style-0" name="area'+j+'_tab1" value="盆地北部和东北部" onclick=""><span>盆地北部和东北部</span></label>                            <label style="margin-right: 5px;" class="ui-popover" data-html="true" data-placement="top" data-trigger="hover" data-original-title="包含城市" data-content="西昌、攀枝花"><input type="checkbox" class="checkbox style-0" name="area'+j+'_tab1" value="攀西高原" onclick=""><span>攀西高原</span></label>                            <label style="margin-right: 5px;" class="ui-popover" data-html="true" data-placement="top" data-trigger="hover" data-original-title="包含城市" data-content="马尔康、康定"><input type="checkbox" class="checkbox style-0" name="area'+j+'_tab1" value="川西高原" onclick=""><span>川西高原</span></label></article></div> <article class="col-xs-12" style="font-size: 15px;margin-left: 2px;text-align: left;width: 650px;margin: 0 auto;float: none;" id="">                                <div class="inline-group ">                                    <label class="" style="margin-right: 15px;float:left;line-height: 25px;font-size: 16px;">城&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;市：</label>                                    <label class="radio state-success" style="margin-right: 15px;background-color: rgba(255, 255, 255, 0) !important;color: black;"><input type="radio" name="city'+j+'_tab1" value="全部城市"   onclick=""><i></i>全部城市</label>                                     <label class="radio state-success" style="margin-right: 15px;background-color: rgba(255, 255, 255, 0) !important;color: black;"><input type="radio" name="city'+j+'_tab1" value="大部城市" checked="" ><i></i>大部城市</label>                                    <label class="radio state-success" style="margin-right: 15px;background-color: rgba(255, 255, 255, 0) !important;color: black;"><input type="radio" name="city'+j+'_tab1" value="局部城市" ><i></i>局部城市</label>                                    <label class="radio state-success" style="margin-right: 15px;background-color: rgba(255, 255, 255, 0) !important;color: black;"><input type="radio" name="city'+j+'_tab1" value="部分城市" ><i></i>部分城市</label>                                    <label class="radio state-success" style="margin-right: 15px;background-color: rgba(255, 255, 255, 0) !important;color: black;"><input type="radio" name="city'+j+'_tab1" value="其余" ><i></i>其余</label>                                </div>                            </article>  <div class="col col-xs-12" style="padding-left: 0px;text-align: left;width: 650px;  margin: 0 auto;  float: none;">                            <label class="" style="float:left;line-height: 25px;font-size: 16px;margin-right: 15px;">空气质量：<b class="tooltip tooltip-top-left" style="left:0px;margin-bottom: 0px;padding: 5px;border-radius: 3px;display: none;"><i class="fa fa-exclamation-circle"></i>&nbsp;&nbsp;空气质量需选1或2项!</b></label>                            <article class="" style="margin-bottom: 6px;font-size: 15px;-webkit-user-select: none;color: black;" id="">                            <label style="margin-right: 5px;"><input type="checkbox" class="checkbox style-0" name="quality'+j+'_tab1" value="优" ><span>优</span></label>                            <label style="margin-right: 5px;"><input type="checkbox" class="checkbox style-0" name="quality'+j+'_tab1" value="良" ><span>良</span></label>                            <label style="margin-right: 5px;"><input type="checkbox" class="checkbox style-0" name="quality'+j+'_tab1" value="轻度污染" ><span>轻度污染</span></label>                            <label style="margin-right: 5px;"><input type="checkbox" class="checkbox style-0" name="quality'+j+'_tab1" value="中度污染" ><span>中度污染</span></label>                            <label style="margin-right: 5px;"><input type="checkbox" class="checkbox style-0" name="quality'+j+'_tab1" value="重度污染" ><span>重度污染</span></label>                            <label style="margin-right: 5px;"><input type="checkbox" class="checkbox style-0" name="quality'+j+'" value="严重污染" ><span>严重污染</span></label>                            </article>                            </div>    <a class="btn btn-primary" href="javascript:void(0);" style="margin-top: 4px;padding: 6px 10px;border-radius: 19px;" onclick="forecastPersonalPro.genForecast_tab1(this,'+j+');"><i class="fa  fa-arrow-down" data-rel="bootstrap-tooltip" title="添加"></i></a><a class="btn btn-primary btn-danger" href="javascript:void(0);" style="margin-top: 4px;padding: 6px 10px;border-radius: 19px;float:right;margin-right: 2%;" onclick="forecastPersonalPro.clearFore(this,1);"><i class="fa  fa-trash-o" data-rel="bootstrap-tooltip" title="清空"></i></a>                 <textarea  style="min-height: 55px;margin-bottom: 5px;width: 92%;padding: 0px 2%;margin-top: 8px;" maxlength="350"></textarea>                          </div></td></tr>'));
            };



            $("#tab1").find("table").attr("type",0);
        }else{
            for (var j = 0; j < 3; j++) {
                trs[j].push($("<tr><td >主班审核</td><td class='audit'></td></tr>"));
            };
        }

        for (var j = 0; j < 3; j++) {
            date.setDate(date.getDate()+1);
            trs[j][0].prepend('<td class="date" rowspan="'+(data.forecastsCount+1)+'">'+$.datepicker.formatDate( "mm月dd日", date)+'</td>')
            $tbody.append(trs[j]);
        }

        $('.ui-popover').popover ({ container: 'body' });

        $("#tab1").find("textarea").keyup(function(){
            forecastPersonalPro.genMessage_tab1();
        }).blur(function(){
            forecastPersonalPro.genMessage_tab1();
        });

        forecastPersonalPro.genMessage_tab1();

        if (!data.isAudit&&data.isDone&&isToday) {
            $("#tab1").find(".submitBtn").removeClass("disabled");
            $("#tab1").find(".submitBtn").bind("click",forecastPersonalPro.comfirm_tab1);

            // $("#notice").removeClass("disabled");
        };
    },
    genMessage_tab1:function(){
        $("#message_tab1").html("");
        var message="";
        for (var i = 0; i < 3; i++) {
            message+=$(".date").eq(i).text()+"，";

            var m1;
            if ($("#tab1").find("table").attr("type")==0) {
                m1=$(".audit").eq(i).find("textarea").val();
            }else{
                m1=$(".audit").eq(i).text();
            }
            if (m1.trim()=="") {
                return;
            };
            message+=m1;
            message+="<br/>";
        };
        $("#message_tab1").html(message);
    },
    queryCityAuditResult:function(){
        var date = $("#datepicker_tab2").datepicker("getDate");
        var data={};
        if (date!=null) {
            data.timePoint=date.getTime();
        };

        $.ajax({
            type: "GET",
            url: "/smartadmin/mobileforecast/getCityAuditResult",
            data: data,
            dataType: "json",
            timeout:15000,
            beforeSend:function(){
                $("#loadingText").text("正在获取数据，请稍候······");
                $("#over").attr("style","display:");
                $("#layout").attr("style","display:");
                $("html").css({overflow:"hidden"});
            },
            error:function(){
                $("#over").attr("style","display:none");
                $("#layout").attr("style","display:none");
                $("html").css({overflow:"scroll"});
            },
            success: function(data){
                if(data.result){

                    forecastPersonalPro.genTable_tab2(data.data);



                    $("#over").attr("style","display:none");
                    $("#layout").attr("style","display:none");
                    $("html").css({overflow:"scroll"});



                }else{
                    timeoutAlert();
                }
            }});
    },

    getTime:function(){

        $.ajaxSetup({async: false});
        $.getJSON("/publish/getAllCityRealTimeAQI",function(data){
            var d=new Date(data.timePoint);
            var formatdate=d.getFullYear()+"年"+(d.getMonth()+1)+"月"+d.getDate()+"日 "+d.getHours()+"时"+d.getMinutes()+"分"+d.getSeconds()+"秒"
            var formatdate1=d.getDate()+"日 "
            console.log(d);
            $('.time').text(formatdate);
            $('#time2').text("四川省空气质量数值预报当日预报：【"+formatdate1+"10时】更新");




        });



    },

    genTable_tab2:function(data){

        var date=new Date(data.timePoint);
        var isToday=forecastPersonalPro.isToday(date);
        $('#datepicker_tab2').val($.datepicker.formatDate('yy年mm月dd日',date));
        var d=new Date(data.timePoint);
        var b=new Date();
        var timestamp=new Date().getTime();

        var formatdate=d.getFullYear()+"年"+(d.getMonth()+1)+"月"+d.getDate()+"日 "+d.getHours()+"时"
        var formatdate1=d.getFullYear()+"年"
        var firstDay = new Date(b.getFullYear(),0,1);
        //计算当前时间与本年第一天的时差(返回一串数值，代表两个日期相差的毫秒数)
        var dateDiff = d - firstDay;
        //一天的毫秒数
        var msPerDay = 1000 * 60 * 60 * 24;
        //计算天数
        var diffDays = Math.ceil(dateDiff/ msPerDay);

        //$('#timea').text(formatdate);
        $('#time2').text(formatdate1+"第"+diffDays+"期");



        $("#date_tab2").text($.datepicker.formatDate('yy年mm月dd日',date));


        var $tbody=$("#tab2table0").find("tbody").empty();


        for (var i = 0; i < 5; i++) {
            date.setDate(date.getDate()+1);
            $("#tab2").find("tr[type='date']").children("th[num='"+(i+1)+"']").text($.datepicker.formatDate( "mm月dd日", date));
        };

        var pKey=["PM2_5_DR","AQI","PRIMARYPOLLUTANT","QUALITY"];
        var pValue=["细颗粒物PM<sub>2.5</sub>(μg/m<sup>3</sup>)","AQI","首要污染物","污染等级"];

        var pKey_REAL=["PM2_5","AQI","PRIMARYPOLLUTANT","QUALITY"];


        for (var i = 0; i < 21; i++) {
            // 	var trs=[];
            // 	trs.push($("<tr><td rowspan='4'>"+data.forecast[i].CITYNAME+"</td></tr>"));
            // trs.push($("<tr></tr>"));trs.push($("<tr></tr>"));trs.push($("<tr></tr>"));

            // for (var j = 0; j < 4; j++) {
            // 	trs[j].append("<td>"+pValue[j]+"</td>");
            // 	// console.log(data.forecast[i].AQI);
            // 	var s;
            // 	var arr;
            // 	var arr_real=eval("data.forecast[i]."+pKey_REAL[j]+"_REAL").split("|");
            // 	// console.log(arr_real);
            // 	var colors=["","",""];
            // 	if ((s=eval("data.forecast[i]."+pKey[j]))==null) {
            // 		arr=["-","-","-"];
            // 	}else{
            // 		arr=s.split("|");

            // 		for (var k = 0; k < 3; k++) {
            // 			if (arr_real[k]!='-') {
            // 				if (j<=1) {
            // 					var f0=parseInt(arr[k].split("~")[0]);
            // 					var f1=parseInt(arr[k].split("~")[1]);
            // 					if (arr_real[k]>=f0&&arr_real[k]<=f1) {
            // 		                				colors[k]='green';
            // 		                			}else{
            // 		                				colors[k]='red';
            // 		                			}
            // 				}else{
            // 					if (arr[k].indexOf(arr_real[k])!=-1) {
            // 						colors[k]='green';
            // 		                			}else{
            // 		                				colors[k]='red';
            // 		                			}
            // 				}
            // 			};
            // 		};


            // 	}


            // 	trs[j].append("<td>"+arr[0]+"/<span style='color:"+colors[0]+";text-shadow:0 0 1px "+colors[0]+"'>"+arr_real[0]+"</span></td><td>"+arr[1]+"/<span style='color:"+colors[1]+";text-shadow:0 0 1px "+colors[1]+"'>"+arr_real[1]+"</span></td><td>"+arr[2]+"/<span style='color:"+colors[2]+";text-shadow:0 0 1px "+colors[2]+"'>"+arr_real[2]+"</span></td><td></td><td></td><td></td>");
            // 	$tbody.append(trs[j]);
            // };

            // for (var j = 0; j < 3; j++) {
            // var pm2_5Arr=["-","-","-"];

            var arr=[];
            var colors=[];
            var arr_real=[];
            for (var j = 0; j < 4; j++) {
                var s;
                arr_real.push(eval("data.forecast[i]."+pKey_REAL[j]+"_REAL").split("|",3));
                colors.push(["","",""]);

                if ((s=eval("data.forecast[i]."+pKey[j]))==null) {
                    arr.push(["-","-","-"]);
                }else{
                    arr.push(s.split("|",3));

                    for (var k = 0; k < 3; k++) {
                        if (arr_real[j][k]!='-') {
                            if (j<=1) {
                                var f0=parseInt(arr[j][k].split("~")[0]);
                                var f1=parseInt(arr[j][k].split("~")[1]);
                                if (arr_real[j][k]>=f0&&arr_real[j][k]<=f1) {
                                    colors[j][k]='green';
                                }else{
                                    colors[j][k]='red';
                                }
                            }else{
                                if (arr[j][k].indexOf(arr_real[j][k])!=-1) {
                                    colors[j][k]='green';
                                }else{
                                    colors[j][k]='red';
                                }
                            }
                        }
                    }
                }
            }


            var tr;
            var tr1;
            if(i<7){
                tr=$("<tr><td >"+"川西地区"+"</td><td rowspan=''>"+data.forecast[i].CITYNAME+"</td></tr>");
            }
            else if(7<=i&&i<11){
                tr=$("<tr><td >"+"川南地区"+"</td><td rowspan=''>"+data.forecast[i].CITYNAME+"</td></tr>");
            }else if(11<=i&&i<17){
                tr=$("<tr><td >"+"川东北地区"+"</td><td rowspan=''>"+data.forecast[i].CITYNAME+"</td></tr>");
            }else if(17<=i&&i<19){
                tr=$("<tr><td >"+"攀西高原"+"</td><td rowspan=''>"+data.forecast[i].CITYNAME+"</td></tr>");
            }else{
                tr=$("<tr><td >"+"川西高原"+"</td><td rowspan=''>"+data.forecast[i].CITYNAME+"</td></tr>");
            }
            for (var n = 0; n < 3;n++) {
                for (var nn = 0; nn < 4; nn++) {
                    tr.append("<td>"+arr[nn][n]+"/<span style='color:"+colors[nn][n]+";text-shadow:0 0 1px "+colors[nn][n]+"'>"+arr_real[nn][n]+"</span></td>");
                };

            };

            $tbody.append(tr);


        };


    },
    queryCityModelResult:function(){

        var date = $("#datepicker_tab3").datepicker("getDate");
        console.log($("#datepicker_tab3").val());
        console.log(date);
        var data={};
        if (date!=null) {
            data.timePoint=date.getTime();
        };
        $(".tableforecast").find("textarea[type=table1]").val('');
        $(".tableforecast").find("textarea[type=table2]").val('');
        $(".forecasthead").children(".forecastp").find("input[type=textarea]").val('');
        $("#time").text('');
        $.ajax({
            type: "GET",
            url: "/smartadmin/mobileforecast/getCityModelResult",
            data: data,
            dataType: "json",
            timeout:15000,
            beforeSend:function(){
                $("#loadingText").text("正在获取数据，请稍候······");
                $("#over").attr("style","display:");
                $("#layout").attr("style","display:");
                $("html").css({overflow:"hidden"});
            },
            error:function(){
                $("#over").attr("style","display:none");
                $("#layout").attr("style","display:none");
                $("html").css({overflow:"scroll"});
            },
            success: function(data){
                if(data.result){
                    //forecastPersonalPro.getMessagezh(data.data);
                    forecastPersonalPro.genTable_tab3(data.data);
                    var timestamp=new Date().getTime();

                    $.getJSON("/smartadmin/mobileforecast/showData",{"timePoint":data.data.timePoint},function(data){
                        console.log(data);
                        var formatdate111=data.data.TIMEPOINTNEW;
                        var d = new Date();
                        d.setTime(parseFloat(formatdate111));
                        console.log(d);
                        var formatdatenew=d.getFullYear()+"年"+(d.getMonth()+1)+"月"+d.getDate()+"日 "+d.getHours()+"时"
                        $('#time').text(formatdatenew);


                        $(".tableforecast").find("textarea[type=table1]").val(data.data.TRENDFORECAST);
                        $(".tableforecast").find("textarea[type=table2]").val(data.data.CONDITIONFORECAST);
                        $(".forecasthead").children(".forecastp").find("input[type=textarea]").val(data.data.FORECASTPEOPLE);


                    });

                    $("#over").attr("style","display:none");
                    $("#layout").attr("style","display:none");
                    $("html").css({overflow:"scroll"});

                }else{
                    timeoutAlert();
                }
            }

        });

        //forecastPersonalPro.getMessagezh();

    },
    queryCityModelResult2:function(){

        var date = $("#datepicker_tab2").datepicker("getDate");
        console.log(date);
        var data={};
        if (date!=null) {
            data.timePoint=date.getTime();
        };
        $(".tableforecast2").find("textarea[type=table2]").val("");
        $(".forecasthead2").children(".forecastp1").find("input[type=textarea]").val("");
        $("#timea").text('');
        $.ajax({
            type: "GET",
            url: "/smartadmin/mobileforecast/getCityModelResult",
            data: data,
            dataType: "json",
            timeout:15000,
            beforeSend:function(){
                $("#loadingText").text("正在获取数据，请稍候······");
                $("#over").attr("style","display:");
                $("#layout").attr("style","display:");
                $("html").css({overflow:"hidden"});
            },
            error:function(){
                $("#over").attr("style","display:none");
                $("#layout").attr("style","display:none");
                $("html").css({overflow:"scroll"});
            },
            success: function(data){
                if(data.result){
                    var timestamp=new Date().getTime();
                    $.getJSON("/smartadmin/mobileforecast/showData2",{"timePoint":data.data.timePoint},function(data){

                        var formatdate111a=data.data.TIMEPOINTNEW;
                        var da = new Date();
                        da.setTime(parseFloat(formatdate111a));
                        var formatdatenewa=da.getFullYear()+"年"+(da.getMonth()+1)+"月"+da.getDate()+"日 "+da.getHours()+"时"
                        $('#timea').text(formatdatenewa);

                        $(".tableforecast2").find("textarea[type=table2]").val(data.data.FORECASTRESULT);
                        $(".forecasthead2").children(".forecastp1").find("input[type=textarea]").val(data.data.FORECASTPEOPLE);

                    });
                    //forecastPersonalPro.genTable_tab2(data.data);

                }else{
                    timeoutAlert();
                }
            }

        });

        //forecastPersonalPro.getMessagezh();

    },
    genTable_tab3:function(data){
        console.log(data.timePoint);

        var date=new Date(data.timePoint);
        var isToday=forecastPersonalPro.isToday(date);
        var date2=new Date(data.timePoint+86400000);
        $(".submitBtn1").removeAttr("disabled");
        $(".tableforecast").find("textarea[type=table1]").removeAttr("readonly");
        $(".tableforecast").find("textarea[type=table2]").removeAttr("readonly");
        $(".forecasthead").children(".forecastp").find("input[name=fp]").removeAttr("readonly");
        if(!isToday){
            $(".submitBtn1").attr("disabled",true);
            $(".tableforecast").find("textarea[type=table1]").attr("readonly","readonly");
            $(".tableforecast").find("textarea[type=table2]").attr("readonly","readonly");
            $(".forecasthead").children(".forecastp").find("input[name=fp]").attr("readonly","readonly");

        }
        $('#datepicker_tab3').val($.datepicker.formatDate('yy年mm月dd日',date));

        var d=new Date(data.timePoint);

        timePoint=data.timePoint;
        console.log(date);
        var b=new Date();
        var timestamp=new Date().getTime();

        var formatdate=d.getFullYear()+"年"+(d.getMonth()+1)+"月"+d.getDate()+"日 "+d.getHours()+"时"
        var formatdate1=d.getFullYear()+"年"
        var formatdate2=d.getFullYear()+"年"+(d.getMonth()+1)+"月"+(d.getDate()-1)+"日 "
        var firstDay = new Date(b.getFullYear(),0,1);
        //计算当前时间与本年第一天的时差(返回一串数值，代表两个日期相差的毫秒数)
        var dateDiff = d - firstDay;
        //一天的毫秒数
        var msPerDay = 1000 * 60 * 60 * 24;
        //计算天数
        var diffDays = Math.ceil(dateDiff/ msPerDay);

        $('#time3').text(formatdate1+"第"+diffDays+"期");
        var formatdate11 =forecastPersonalPro.getNowFormatDate()-1;
        d.setDate(d.getDate()-1);
        var newdata = $.datepicker.formatDate('yymmdd',d);

        $("#areacx").text(data.areaforecast[4]);
        $("#areacx1").text(data.areaforecast[0]);
        $("#areacn").text(data.areaforecast[5]);
        $("#areacn1").text(data.areaforecast[1]);
        $("#areacdb").text(data.areaforecast[6]);
        $("#areacdb1").text(data.areaforecast[2]);
        $("#areacp").text(data.areaforecast[7]);
        $("#areacp1").text(data.areaforecast[3]);


        $(".pic_new1").attr("src","forecast/product/"+newdata+"/"+"CITY"+"_"+"ALL"+"_"+"AQI"+"_"+"1"+".png");

        $(".pic_new1a").attr("src","forecast/product/"+newdata+"/"+"CITY"+"_"+"ALL"+"_"+"PM2.5"+"_"+"1"+".png");

        $(".pic_new1b").attr("src","forecast/product/"+newdata+"/"+"CITY"+"_"+"ALL"+"_"+"O3"+"_"+"1"+".png");

        $(".pic_new2").attr("src","forecast/product/"+newdata+"/"+"CITY"+"_"+"ALL"+"_"+"AQI"+"_"+"2"+".png");

        $(".pic_new2a").attr("src","forecast/product/"+newdata+"/"+"CITY"+"_"+"ALL"+"_"+"PM2.5"+"_"+"2"+".png");

        $(".pic_new2b").attr("src","forecast/product/"+newdata+"/"+"CITY"+"_"+"ALL"+"_"+"O3"+"_"+"2"+".png");

        $(".pic_new3").attr("src","forecast/product/"+newdata+"/"+"CITY"+"_"+"ALL"+"_"+"AQI"+"_"+"3"+".png");

        $(".pic_new3a").attr("src","forecast/product/"+newdata+"/"+"CITY"+"_"+"ALL"+"_"+"PM2.5"+"_"+"3"+".png");

        $(".pic_new3b").attr("src","forecast/product/"+newdata+"/"+"CITY"+"_"+"ALL"+"_"+"O3"+"_"+"3"+".png");

        $("#date_tab3").text("数值模式起报时间："+formatdate2+"00时");

        var $tbody=$("#tab3").find("tbody").empty();

        var pKey=["PM2_5","PRIMARYPOLLUTANT","QUALITYKD","AQIKD"];
        var PMs=["数值","统计"];
        var pValue=["细颗粒物PM" +"<sub>2.5</sub>(μg/m3)","AQI","首要污染物","污染等级"];
        for (var k = 1; k < 4; k++) {
            date.setDate(date.getDate()+1);
            console.log($.datepicker.formatDate( "mm月dd日", date));
            $("#tr"+k).children("td[num='"+1+"']").text($.datepicker.formatDate( "mm月dd日", date));
            for (var i = 0; i < 21; i++) {
                var trs=[];
                if(i<7){
                    trs.push($("<tr><td rowspan='2'>"+"川西地区"+"</td><td rowspan='2'>"+data.forecast[i].CITYNAME+"</td></tr>"));trs.push($("<tr></tr>"));
                }else if(7<=i&&i<11){
                    trs.push($("<tr><td rowspan='2'>"+"川南地区"+"</td><td rowspan='2'>"+data.forecast[i].CITYNAME+"</td></tr>"));trs.push($("<tr></tr>"));
                }else if(11<=i&&i<17){
                    trs.push($("<tr><td rowspan='2'>"+"川东北地区"+"</td><td rowspan='2'>"+data.forecast[i].CITYNAME+"</td></tr>"));trs.push($("<tr></tr>"));
                }else if(17<=i&&i<19){
                    trs.push($("<tr><td rowspan='2'>"+"攀西高原"+"</td><td rowspan='2'>"+data.forecast[i].CITYNAME+"</td></tr>"));trs.push($("<tr></tr>"));
                }else{
                    trs.push($("<tr><td rowspan='2'>"+"川西高原"+"</td><td rowspan='2'>"+data.forecast[i].CITYNAME+"</td></tr>"));trs.push($("<tr></tr>"));
                }
                // var tr="<tr><td rowspan='4'>"+data.forecast[i].CITYNAME+"</td></tr>";
                for (var j = 0; j < 2; j++) {
                    trs[j].append("<td>"+PMs[j]+"</td>");
                    var s;
                    var arr;
                    for(var m = 0; m < 4; m++){
                        if ((s=eval("data.forecast[i]."+pKey[m]))==null) {
                            arr=["-","-","-","-"];
                        }else{
                            arr=s.split("|");
                        }
                        if(trs[j]!==trs[1]){
                            if(!isNaN(arr[k])){
                                if(m>=2){
                                    if(arr[k]<=50){
                                        trs[j].append("<td style='color:rgb(0,228,0) ;text-shadow: 1px 1px 0 gray;'>"+(Math.ceil(arr[k]))+"</td>");
                                    }else if((arr[k]>50)&&(arr[k]<=100)){
                                        trs[j].append("<td style='color:rgb(255,255,0) ;text-shadow: 1px 1px 0 gray;'>"+(Math.ceil(arr[k]))+"</td>");

                                    }else if((arr[k]>100)&&(arr[k]<=150)){
                                        trs[j].append("<td style='color:rgb(255,126,0) ;text-shadow: 1px 1px 0 gray;'>"+(Math.ceil(arr[k]))+"</td>");
                                    }else if((arr[k]>150)&&(arr[k]<=200)){
                                        trs[j].append("<td style='color:rgb(255,0,0)' ;text-shadow: 1px 1px 0 gray;>"+(Math.ceil(arr[k]))+"</td>");
                                    }else if((arr[k]>200)&&(arr[k]<=300)){
                                        trs[j].append("<td style='color:rgb(153,0,76) ;text-shadow: 1px 1px 0 gray;'>"+(Math.ceil(arr[k]))+"</td>");
                                    }else{
                                        trs[j].append("<td style='color:rgb(126,0,35) ;text-shadow: 1px 1px 0 gray;'>"+(Math.ceil(arr[k]))+"</td>");
                                    }
                                }else{
                                    trs[j].append("<td >"+Math.ceil(arr[k])+"</td>");
                                }

                            }else{
                                if(m>=2){
                                    switch (arr[k])
                                    {

                                        case "优~良":
                                            trs[j].append("<td style='color:rgb(0,228,0) ;text-shadow: 1px 1px 0 gray;'>"+arr[k]+"</td>");
                                            continue;
                                        case "优~优":
                                            trs[j].append("<td style='color:rgb(0,228,0) ;text-shadow: 1px 1px 0 gray;'>"+"优"+"</td>");
                                            continue;
                                        case "良~轻度污染":
                                            trs[j].append("<td style='color:rgb(255,255,0) ;text-shadow: 1px 1px 0 gray;'>"+arr[k]+"</td>");
                                            continue;
                                        case "良~良":
                                            trs[j].append("<td style='color:rgb(255,255,0) ;text-shadow: 1px 1px 0 gray;'>"+"良"+"</td>");
                                            continue;
                                        case "轻度污染~中度污染":
                                            trs[j].append("<td style='color:rgb(255,126,0) ;text-shadow: 1px 1px 0 gray;'>"+arr[k]+"</td>");
                                            continue;
                                        case "轻度污染~轻度污染":
                                            trs[j].append("<td style='color:rgb(255,126,0) ;text-shadow: 1px 1px 0 gray;'>"+"轻度污染"+"</td>");
                                            continue;
                                        case "中度污染~重度污染":
                                            trs[j].append("<td style='color:rgb(255,0,0) ;text-shadow: 1px 1px 0 gray;'>"+arr[k]+"</td>");
                                            continue;
                                        case "中度污染~中度污染":
                                            trs[j].append("<td style='color:rgb(255,0,0) ;text-shadow: 1px 1px 0 gray;'>"+"中度污染"+"</td>");
                                            continue;
                                        case "重度污染~严重污染":
                                            trs[j].append("<td style='color:rgb(153,0,76) ;text-shadow: 1px 1px 0 gray;'>"+arr[k]+"</td>");
                                            continue;
                                        case "重度污染~重度污染":
                                            trs[j].append("<td style='color:rgb(153,0,76) ;text-shadow: 1px 1px 0 gray;'>"+"重度污染"+"</td>");
                                            continue;
                                        case "严重污染":
                                            trs[j].append("<td style='color:rgb(126,0,35) ;text-shadow: 1px 1px 0 gray;'>"+arr[k]+"</td>");
                                            continue;
                                        default:
                                            trs[j].append("<td style='color:rgb(126,0,35) ;text-shadow: 1px 1px 0 gray;'>"+arr[k]+"</td>");

                                    }

                                }else{
                                    trs[j].append("<td >"+arr[k]+"</td>");
                                }

                            }

                        }
                    }
                    console.log(trs[j]);
                    $("#tbody"+k).append(trs[j]);
                }


            };


        };



    },

    export:function(e){
        var timePoint= new Date($("#forecastProvinceGuideDate").val().replace(/年/,"-").replace(/月/,"-").replace(/日/,"")).getTime();
        var para0=$("#forecastProvincePage_ContentTextArea").val();
        var para1=$("#forecastProvincePage_ContentTextPheo").val();

        var time3=$("#forecastProvinceGuideDate").val();
        var fp=$("#forecastProvinceGuidePerson").val();

        var time="";


        window.open(provinceAjax+"/smartadmin/mobileforecast/exportModelProduct?timePoint="+timePoint+"&para0="+para0+"&para1="+para1+"&time3="+time3+"&fp="+fp+"&time="+time,"_blank");
    },
    export0PDF:function(e){
        var timePoint= new Date($("#forecastProvinceGuideDate").val().replace(/年/,"-").replace(/月/,"-").replace(/日/,"")).getTime();
        var para0=$("#forecastProvincePage_ContentTextArea").val();
        var para1=$("#forecastProvincePage_ContentTextPheo").val();

        var time3=$("#forecastProvinceGuideDate").val();
        var fp=$("#forecastProvinceGuidePerson").val();

        var time="";


        window.open(provinceAjax+"/smartadmin/mobileforecast/exportModelProductPDF?timePoint="+timePoint+"&para0="+para0+"&para1="+para1+"&time3="+time3+"&fp="+fp+"&time="+time,"_blank");
    },
    export2:function(e){
        var timePoint= new Date($("#forecastProvinceCityAuditDivDate").val().replace(/年/,"-").replace(/月/,"-").replace(/日/,"")).getTime();
        var para0=$("#forecastProvincePage_ForecastResult").val();
        // var para1=$(".tableforecast").find("textarea[name='conditionforecast']").val();

        var time3=$("#forecastProvinceCityAuditVersion").val();
        var fp=$("#forecastProvinceCityAuditPerson").val();

        var time="";

        var fc=["","",""];
        var message=$("#message").text();
        if (message!=""||message!="当日没有预报") {
            fc=$("#message").html().split("<br>",3);
        };

        window.open(provinceAjax+"/smartadmin/mobileforecast/exportAuditResult_doc?timePoint="+timePoint+"&para0="+para0+"&time3="+time3+"&fp="+fp+"&time="+time+"&fc="+fc[0]+"&fc="+fc[1]+"&fc="+fc[2],"_blank");
    },
    export1PDF:function(e){
        var timePoint= new Date($("#forecastProvinceCityAuditDivDate").val().replace(/年/,"-").replace(/月/,"-").replace(/日/,"")).getTime();
        var para0=$("#forecastProvincePage_ForecastResult").val();
        // var para1=$(".tableforecast").find("textarea[name='conditionforecast']").val();

        var time3=$("#forecastProvinceCityAuditVersion").val();
        var fp=$("#forecastProvinceCityAuditPerson").val();

        var time="";

        var fc=["","",""];
        var message=$("#message").text();
        if (message!=""||message!="当日没有预报") {
            fc=$("#message").html().split("<br>",3);
        };

        window.open(provinceAjax+"/smartadmin/mobileforecast/exportAuditResultPDF?timePoint="+timePoint+"&para0="+para0+"&time3="+time3+"&fp="+fp+"&time="+time+"&fc="+fc[0]+"&fc="+fc[1]+"&fc="+fc[2],"_blank");
    },
    showgraph:function(event){
        var btn=$(event.target);
        var count=btn.parent().attr("value");
        count++;
        if(count % 2 == 0){
            $("#graphshow").stop().animate({"left":"100%"},{duration:500 });
            btn.parent().attr("value",0);
            $("#searchArrow").attr("class","fa fa-angle-double-left fa-fb");
        }else{
            $("#graphshow").stop().animate({"left":"31%"},{duration:500 });
            btn.parent().attr("value",1);
            $("#searchArrow").attr("class","fa fa-angle-double-right fa-fb");
        }

    },
    showgraph1:function(event){
        var btn=$(event.target);
        var count=btn.parent().attr("value");
        count++;
        if(count % 2 == 0){
            $("#graphshow1").stop().animate({"left":"100%"},{duration:500 });
            btn.parent().attr("value",0);
            $("#searchArrow").attr("class","fa fa-angle-double-left fa-fb");
        }else{
            $("#graphshow1").stop().animate({"left":"31%"},{duration:500 });
            btn.parent().attr("value",1);
            $("#searchArrow").attr("class","fa fa-angle-double-right fa-fb");
        }

    },
    showgraph2:function(event){
        var btn=$(event.target);
        var count=btn.parent().attr("value");
        count++;
        if(count % 2 == 0){
            $("#graphshow2").stop().animate({"left":"100%"},{duration:500 });
            btn.parent().attr("value",0);
            $("#searchArrow").attr("class","fa fa-angle-double-left fa-fb");
        }else{
            $("#graphshow2").stop().animate({"left":"31%"},{duration:500 });
            btn.parent().attr("value",1);
            $("#searchArrow").attr("class","fa fa-angle-double-right fa-fb");
        }

    },
    showgraph3:function(event){
        var btn=$(event.target);
        var count=btn.parent().attr("value");
        count++;
        if(count % 2 == 0){
            $("#graphshow3").stop().animate({"left":"100%"},{duration:500 });
            btn.parent().attr("value",0);
            $("#searchArrow").attr("class","fa fa-angle-double-left fa-fb");
        }else{
            $("#graphshow3").stop().animate({"left":"31%"},{duration:500 });
            btn.parent().attr("value",1);
            $("#searchArrow").attr("class","fa fa-angle-double-right fa-fb");
        }

    },
    getMost1:function(str){
        var most = [], num = 0;
        while( str != '' ){
            var ori = str,
                target = str.substr(0,1), //目标字符
                re = target;
            if(/[\$\(\)\*\+\.\?]/.test(target)) re = '\\' + re;
            str = str.replace(new RegExp(re, 'g'), '');
            diff = ori.length - str.length; //计算目标字符数目
            if(diff > num) {
                num = diff;
                most = [target];
            } else if (diff == num) {
                most.push(target);
            }
        }
        return most;
    },
    getMessagezh:function(){
        var timePoint= $("#datepicker_tab3").datepicker("getDate").getTime();
        var ss=new Date(timePoint);
        ss.setDate(ss.getDate()+1);
        var newdata = $.datepicker.formatDate('mm月dd日',ss);
        ss.setDate(ss.getDate()+1);
        var newdata1 = $.datepicker.formatDate('mm月dd日',ss);
        ss.setDate(ss.getDate()+1);
        var newdata2 = $.datepicker.formatDate('mm月dd日',ss);

        $("#areazh").html("");
        var message="";
        var message1="";
        var t1="";
        var t2="";
        var t3="";
        var cxm="";
        var cnm="";
        var cdbm="";
        var tt="";
        var data1p="";
        var data2p="";
        var data3p="";
        cxm=$("input[name='radio-inline']:checked").parent().next().val();
        cnm=$("input[name='radio-inline1']:checked").parent().next().val();
        cdbm=$("input[name='radio-inline2']:checked").parent().next().val()
        console.log(cxm);
        console.log(cnm);

        var data1 = cxm.split("；");
        var data2 = cnm.split("；");
        var data3 = cdbm.split("；");

        var data1s1=data1[0].substring(((data1[0].indexOf('首')+6)));
        var data1s2=data1[1].substring(((data1[1].indexOf('首')+6)));
        var data1s3=data1[2].substring(((data1[2].indexOf('首')+6)));
        var data2s1=data2[0].substring(((data2[0].indexOf('首')+6)));
        var data2s2=data2[1].substring(((data2[1].indexOf('首')+6)));
        var data2s3=data2[2].substring(((data2[2].indexOf('首')+6)));
        var data3s1=data3[0].substring(((data3[0].indexOf('首')+6)));
        var data3s2=data3[1].substring(((data3[1].indexOf('首')+6)));
        var data3s3=data3[2].substring(((data3[2].indexOf('首')+6)));

        data1p=data1s1+data2s1+data3s1;
        data2p=data1s2+data2s2+data3s2;
        data3p=data1s3+data2s3+data3s3;
        console.log(data1p);
        console.log(data2p);
        console.log(data3p);


        t1=data1[0]+data2[0]+data3[0];
        t2=data1[1]+data2[1]+data3[1];
        t3=data1[2]+data2[2]+data3[2];
        console.log( t1);
        var regy= new RegExp('优');
        var regl= new RegExp('良');
        var regq= new RegExp('轻');
        var regz= new RegExp('中');
        var regzd= new RegExp('重');
        var regyz= new RegExp('严');

        var f1="";
        var sss="";
        sss=forecastPersonalPro.getMost1(data1p);

        if(sss.indexOf('sss')>-1){
            f1='二氧化氮';

        }else if(sss.indexOf('细')>-1){
            f1='PM2.5';

        }else if(sss.indexOf('臭')>-1){
            f1='臭氧8小时';
        }else{
            f1='PM2.5';
        }
//T，盆西
        if(!(data1[0].search(regq)>-1||data2[0].search(regq)>-1||data3[0].search(regq)>-1)){
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
            message1+="盆地其余地区为优或良；"
            message1+="\r\n";
            message1+="攀西地区和川西高原大部城市为优或良。"
            message1+="\r\n";
            message1+="全省首要污染物以"+f1+"为主。";
            message1+="\r\n";
        }

        var f2="";
        var sss2="";
        sss2=forecastPersonalPro.getMost1(data2p);

        if(sss2.indexOf('ssss')>-1){
            f2='二氧化氮';

        }else if(sss2.indexOf('细')>-1){
            f2='PM2.5';

        }else if(sss2.indexOf('臭')>-1){
            f2='臭氧8小时';
        }else{
            f2='PM2.5';
        }


//T+1，盆西
        if(!(data1[1].search(regq)>-1||data2[1].search(regq)>-1||data3[1].search(regq)>-1)){
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
            message1+="盆地其余地区为优或良；"
            message1+="\r\n";
            message1+="攀西地区和川西高原大部城市为优或良。"
            message1+="\r\n";
            message1+="全省首要污染物以"+f2+"为主。";
            message1+="\r\n";
        }


        var f3="";
        var sss3="";
        sss3=forecastPersonalPro.getMost1(data3p);

        if(sss3.indexOf('sss')>-1){
            f3='二氧化氮';

        }else if(sss3.indexOf('细')>-1){
            f3='PM2.5';

        }else if(sss3.indexOf('臭')>-1){
            f3='臭氧8小时';
        }else{
            f3='PM2.5';
        }

//T+2，盆西
        if(!(data1[2].search(regq)>-1||data2[2].search(regq)>-1||data3[2].search(regq)>-1)){
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
            message1+="盆地其余地区为优或良；"
            message1+="\r\n";
            message1+="攀西地区和川西高原大部城市为优或良。"
            message1+="\r\n";
            message1+="全省首要污染物以"+f3+"为主。";
            message1+="\r\n";
        }


        message+=$("input[name='radio-inline']:checked").parent().next().val();
        message+="\r\n";
        message+=$("input[name='radio-inline1']:checked").parent().next().val();
        message+="\r\n";
        message+=$("input[name='radio-inline2']:checked").parent().next().val();
        message+="\r\n";
        message+=$("input[name='radio-inline3']:checked").parent().next().val();

        $("#atuodetermine").html(message1);
    },
    getff:function(){
        var ss=$("#atuodetermine").val();
        $(".tableforecast").find("textarea[name='trendforecast']").val(ss);


    }
}

