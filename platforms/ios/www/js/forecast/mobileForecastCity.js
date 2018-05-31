
var days=3;
var $table;
var $tableHistory;
var range;
var hasHistory=false;
var dayCH=["一","二","三","四","五"];
var myChart;
var myChartCustom;
var count=0;
var ppNames=['细颗粒物(PM2.5)','臭氧8小时','二氧化硫','二氧化氮','一氧化碳','颗粒物(PM10)','无'];
var qualityNames=['优','良','轻度污染','中度污染','重度污染','严重污染'];
var checkeNoticeInterval;
var option=[];
var isAudit;
var forecastPersonal={
	cityCode:null,
	userName:null,
	codeCity : null,
	cityType:null,
	/*初始化*/
	init:function(){
//			var username = $.cookie('username');
//			if(username==null){
//		    	window.location = "login.html";
//		    }
			var uarr = window.location.href.split("?");
			userName = uarr[1].split("=")[1];
			codeCity = uarr[2].split("=")[1];
			if(codeCity!="(null)"){
				cityType=0;
				$("div[name='cityChoose']").children("input").each(function(){
					
					if($(this).val()==codeCity){
						$(this).attr("name","choosed");
						$("#btnMenu").text($(this).parent("div").text());
						$("#cityPanel").attr("style","display:none");
					}
					else
						$(this).attr("name","");
				})
			}
			else{
				cityType=1;
			}
		    $(".dayCH").text(dayCH[days-1]);
		    clearInterval(checkeNoticeInterval);
		    
		    $("#cityList").children("button").append("&nbsp;&nbsp<img src='image/arrow.png'>");
			$(".forecastCity").text($("input[name='choosed']").attr("tag"));
			$(".cityName").text($("input[name='choosed']").parent("div").text());

//			$table.find(".data").children().hide();
//			$table.find(".data").children("span").remove();
//			$table.find(".content").children().hide();
//			$table.find(".content").children("span").remove();
//			$(".submitBtn").addClass("disabled");
//			$(".submitBtn").unbind( "click" );
			$table=$("#table_personal");
		    $table.find(".data").children("input,div").hide();
		    // $table.find("textarea").hide();
		    
		    	
		    $tableHistory=$("#historyTablePanle table");
		    $(".btn-select").bind("click",function(event){
		    	//forecastPersonal.pollutantShow();
		    	var pollutant = $(event.target).text();
		    	$("#selectedPollutant").text(pollutant);
		    	$("#selectedPollutant").append("&nbsp;&nbsp;<img src='image/arrow-left.png'>");
		    	var number = $(event.target).attr("value");
		    	myChart.clear();
		    	myChart.setOption(option[number]);
		    })
		    $("#panelContainer").click(function(){
		    	if(!$("#chartPanle").hasClass("in")){
		    		forecastPersonal.cityChoose($("input[name='choosed']").parent("div"));
		    	}
		    })
;			
		    $("#panelContainer").click();

		 

//			var label=$("<label class='radio'>成都市</label>");
//			var input=$("<input type='radio' name='cityChoose' value='5101' tag='成都（CD）' checked><i></i>");
//			label.append(input);
//			$("#cityList").append(label);
//
//			label=$("<label class='radio'>德阳市</label>");
//			input=$("<input type='radio' name='cityChoose' value='5106' tag='德阳（DY）'><i></i>");
//			label.append(input);
//			$("#cityList").append(label);
//
//			label=$("<label class='radio'>绵阳市</label>");
//			input=$("<input type='radio' name='cityChoose' value='5107' tag='绵阳（MY）'><i></i>");
//			label.append(input);
//			$("#cityList").append(label);
//
//			label=$("<label class='radio'>南充市</label>");
//			input=$("<input type='radio' name='cityChoose' value='5113' tag='南充（NC）'><i></i>");
//			label.append(input);
//			$("#cityList").append(label);
//
//			label=$("<label class='radio'>攀枝花市</label>");
//			input=$("<input type='radio' name='cityChoose' value='5104' tag='攀枝花（PZH）'><i></i>");
//			label.append(input);
//			$("#cityList").append(label);
//
//			label=$("<label class='radio'>自贡市</label>");
//			input=$("<input type='radio' name='cityChoose' value='5103' tag='自贡（ZG）'><i></i>");
//			label.append(input);
//			$("#cityList").append(label);
//
//			label=$("<label class='radio'>宜宾市</label>");
//			input=$("<input type='radio' name='cityChoose' value='5115' tag='宜宾（YB）'><i></i>");
//			label.append(input);
//			$("#cityList").append(label);
//
//			label=$("<label class='radio'>泸州市</label>");
//			input=$("<input type='radio' name='cityChoose' value='5105' tag='泸州（LZ）'><i></i>");
//			label.append(input);
//			$("#cityList").append(label);
//
//			label=$("<label class='radio'>广元市</label>");
//			input=$("<input type='radio' name='cityChoose' value='5108' tag='广元（GY）'><i></i>");
//			label.append(input);
//			$("#cityList").append(label);
//			
//			label=$("<label class='radio'>遂宁市</label>");
//			input=$("<input type='radio' name='cityChoose' value='5109' tag='遂宁（SN）'><i></i>");
//			label.append(input);
//			$("#cityList").append(label);
//
//			label=$("<label class='radio'>内江市</label>");
//			input=$("<input type='radio' name='cityChoose' value='5110' tag='内江（NJ）'><i></i>");
//			label.append(input);
//			$("#cityList").append(label);
//			
//			label=$("<label class='radio'>乐山市</label>");
//			input=$("<input type='radio' name='cityChoose' value='5111' tag='乐山（LS）'><i></i>");
//			label.append(input);
//			$("#cityList").append(label);
//			
//			label=$("<label class='radio'>眉山市</label>");
//			input=$("<input type='radio' name='cityChoose' value='5114' tag='眉山（MS）'><i></i>");
//			label.append(input);
//			$("#cityList").append(label);
//			
//			label=$("<label class='radio'>广安市</label>");
//			input=$("<input type='radio' name='cityChoose' value='5116' tag='广安（GA）'><i></i>");
//			label.append(input);
//			$("#cityList").append(label);
//			
//			label=$("<label class='radio'>达州市</label>");
//			input=$("<input type='radio' name='cityChoose' value='5117' tag='达州（DZ）'><i></i>");
//			label.append(input);
//			$("#cityList").append(label);
//			
//			label=$("<label class='radio'>雅安市</label>");
//			input=$("<input type='radio' name='cityChoose' value='5118' tag='雅安（YA）'><i></i>");
//			label.append(input);
//			$("#cityList").append(label);
//			
//			label=$("<label class='radio'>巴中市</label>");
//			input=$("<input type='radio' name='cityChoose' value='5119' tag='巴中（BZ）'><i></i>");
//			label.append(input);
//			$("#cityList").append(label);
//			label=$("<label class='radio'>资阳市</label>");
//			input=$("<input type='radio' name='cityChoose' value='5120' tag='资阳（ZY）'><i></i>");
//			label.append(input);
//			$("#cityList").append(label);
//			label=$("<label class='radio'>马尔康市</label>");
//			input=$("<input type='radio' name='cityChoose' value='5132' tag='马尔康（MEK）'><i></i>");
//			label.append(input);
//			$("#cityList").append(label);
//			label=$("<label class='radio'>康定市</label>");
//			input=$("<input type='radio' name='cityChoose' value='5133' tag='康定（KD）'><i></i>");
//			label.append(input);
//			$("#cityList").append(label);
//			label=$("<label class='radio'>西昌市</label>");
//			input=$("<input type='radio' name='cityChoose' value='5134' tag='西昌（XC）' ><i></i>");
//			label.append(input);
//			$("#cityList").append(label);
			


			$('#datepicker').val($.datepicker.formatDate('yy年mm月dd日',new Date()));
				$('#datepicker').datepicker({
					changeMonth: true,
					changeYear: true,
					minDate:"2014年08月26日",
					maxDate: "+0D",
					dateFormat : 'yy年mm月dd日',
					prevText : '<i class="fa fa-chevron-left"></i>',
					nextText : '<i class="fa fa-chevron-right"></i>',
				    onSelect: function(selectDate){
				    	// var btn=$("input[name='cityChooseForecast']:checked");
						// forecastAudit.cityChoose(btn,username);
						forecastPersonal.dateChange();
				    }
				});


						$('#startDatepicker0').datepicker({
							changeMonth: true,
							changeYear: true,
							minDate:"2014年08月26日",
							// maxDate: "+0D",
							dateFormat : 'yy年mm月dd日',
							prevText : '<i class="fa fa-chevron-left"></i>',
							nextText : '<i class="fa fa-chevron-right"></i>',
						    onSelect: function(selectDate){
						    	$('#endDatepicker0').datepicker('option','minDate',selectDate);
						    }
						});
						
						$('#endDatepicker0').datepicker({
							changeMonth: true,
							changeYear: true,
							minDate:"2014年08月26日",
							// maxDate: "+0D",
							dateFormat : 'yy年mm月dd日',
							prevText : '<i class="fa fa-chevron-left"></i>',
							nextText : '<i class="fa fa-chevron-right"></i>',
						    onSelect: function(selectDate){
						    }
						});

						 $('#startDatepicker1').datepicker({
							changeMonth: true,
							changeYear: true,
							minDate:"2014年09月26日",
							// maxDate: "+0D",
							dateFormat : 'yy年mm月dd日',
							prevText : '<i class="fa fa-chevron-left"></i>',
							nextText : '<i class="fa fa-chevron-right"></i>',
						    onSelect: function(selectDate){
						    	$('#endDatepicker1').datepicker('option','minDate',selectDate);
						    }
						});
						
						$('#endDatepicker1').datepicker({
							changeMonth: true,
							changeYear: true,
							minDate:"2014年09月26日",
							// maxDate: "+0D",
							dateFormat : 'yy年mm月dd日',
							prevText : '<i class="fa fa-chevron-left"></i>',
							nextText : '<i class="fa fa-chevron-right"></i>',
						    onSelect: function(selectDate){
						    }
						});



			$table.find("input").keyup(function(){ 
		        $(this).val($(this).val().replace(/[^0-9]/g,''));
		        if($(this).val()=="0"){
		        	$(this).val("");
		        }
//		        $(this).parents("td").removeClass("state-error");
		    }).bind("paste",function(){  //CTR+V事件处理  
		        $(this).val($(this).val().replace(/[^0-9]/g,'')); 
//		        $(this).removeClass("state-error");
		        if($(this).val()=="0"){
		        	$(this).val("");
		        }
		    }).css("ime-mode", "disabled"); //CSS设置输入法不可用

		    $table.find("tr[pollutant]").find("input").keyup(function(){
		    	forecastPersonal.genPollutant(this);
		    }).blur(function(){
		    	forecastPersonal.genPollutant(this);
			    });

		    $table.find("tr[aqi]").find("input").keyup(function(){
		    	forecastPersonal.genAQI(this);
		    });
//		    .blur(function(){
//		    	forecastPersonal.genAQI(this);
//		    });
			 
			$table.find("tr[type='aqi_final']").find("input").keyup(function(){
		    	forecastPersonal.genquality(this);
		    	forecastPersonal.genPM2_5(this);
		    }).blur(function(){
		    	forecastPersonal.genquality(this);
		    	forecastPersonal.genPM2_5(this);
		    });


			var date=new Date();
			$("#date").html($.datepicker.formatDate( "yy/mm/dd", date));

			for (var i = 0; i < 5; i++) {
				date.setDate(date.getDate()+1);
				$table.find("tr[type='date']").children("th[num='"+(i+1)+"']").text($.datepicker.formatDate( "mm月dd日", date));
			}; 
			$(".userName").html(userName);
 
	
			// $table.find("select").multiselect({
		 //        noneSelectedText: "-请选择-", 
		 //        header:false,
		 //        height:140,
		 //        minWidth:122,
		 //        selectedList:10
		 //    });
		$table.find("select").click(function(){
			
			forecastPersonal.selectChange($(this));
		});
		$table.find("select").change();


			$("div[name='cityChoose']").click(function(event){
					$(".btn-group").css("left","100%");
					$(".btn-group").attr("data-value",1);
					$("#selectedPollutant").text("");
					$("#selectedPollutant").append("PM2.5(个人预测)&nbsp;&nbsp;<img src='image/arrow-left.png'>");
					$("input[type='hidden']").attr("name","");
					$(event.target).children("input").attr("name","choosed");
					
					$(".forecastCity").text($(event.target).children("input").attr("tag"));
					$(".cityName").text($(event.target).text());
					$("#chartPanle").removeClass("in");
					//$("#panelContainer").click($(event.target))
					forecastPersonal.cityChoose($(event.target));
					$("#cityList").children("button").text($(event.target).text());
					$("#cityList").children("button").append("&nbsp;&nbsp<img src='image/arrow.png'>");
					//forecastAudit.cityChoose($(event.target));
				});

			forecastPersonal.drawChart.load();
			forecastPersonal.drawCustom.loadPre();
			forecastPersonal.drawCustom.load();
			// $("input[name='choosed']").parent("div").click();

			

	},
	genPM2_5:function(node){
		var num=$(node).parents("td").attr("num");
		var pp=$table.find("tr[type='primaryPollutant']").children("td[num='"+num+"']").find("select").val();
		if (pp!='细颗粒物(PM2.5)') {
			return;
		};

		var val1=$(node).parents("td").find("input").eq(0).val();
		var	val2=$(node).parents("td").find("input").eq(1).val();

		var val=(parseInt(val1)+parseInt(val2))/2;
		val=forecastPersonal.PM2_5Calc(val);

		$table.find("tr[type='aqi_pm2_5']").children("td[num='"+num+"']").text(val);

		// var $td=$table.find("tr[type='quality']").children("td[num='"+num+"']");
		// forecastPersonal.genqualityTD(val1,val2,$td);

	},
	forestTable:function(data){
		$("#forecastTable tbody").empty();

		var date=new Date();
			// $("#date").html($.datepicker.formatDate( "yy/mm/dd", date));
		for (var i = 0; i < 4; i++) {
			var tr=$("<tr ><td rowspan='2'>"+$.datepicker.formatDate( "mm/dd", date)+"</td><td>CMAQ</td><td>"+data.b_m_aqi[i]+"</td><td>"+Math.round(data.b_m_pm2_5[i])+"</td><td>"+forecastPersonal.IAQICal("pm2_5",data.b_m_pm2_5[i]) +"</td><td>"+Math.round(data.b_m_pm10[i])+"</td><td>"+forecastPersonal.IAQICal("pm10",data.b_m_pm10[i]) +"</td><td>"+Math.round(data.b_m_o3[i])+"</td><td>"+forecastPersonal.IAQICal("o3",data.b_m_o3[i]) +"</td><td>"+Math.round(data.b_m_so2[i])+"</td><td>"+forecastPersonal.IAQICal("so2",data.b_m_so2[i]) +"</td><td>"+Math.round(data.b_m_no2[i])+"</td><td>"+forecastPersonal.IAQICal("no2",data.b_m_no2[i]) +"</td><td>"+data.b_m_co[i]+"</td><td>"+forecastPersonal.IAQICal("co",data.b_m_co[i]) +"</td><td>"+data.b_m_primaryPollutant[i]+"</td></tr>"  );
			


			var tr2=$("<tr ><td>统计</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>")

			$("#forecastTable tbody").append(tr);
			$("#forecastTable tbody").append(tr2);

			date.setDate(date.getDate()+1);
		};

	},
	selectChange:function(node){
		var num=$(node).parent("td").attr("num");
		var $td=$table.find("tr[type='aqi_npo']").find("td[num='"+num+"']");

		if(isAudit){
			$table.find("tr[type='aqi_primaryPollutant']").find("td[num='"+num+"']").text(node.val());
		}
		 
		if (node.val()=='细颗粒物(PM2.5)') {
			
			$td.children("input").attr("disabled","");
			$td.children("input").val("");
			$td.next().eq(0).text("");

			var aqi_final=$table.find("tr[type='aqi_final']").find("td[num='"+num+"']");
			var pm2_5_IAQI=$table.find("tr[type='pm2_5_ir']").find("td[class='range']").eq(num-1).text().split("~");
			aqi_final.find("input:eq(0)").val(pm2_5_IAQI[0]);
			aqi_final.find("input:eq(1)").val(pm2_5_IAQI[1]);
			// aqi_final.find("input:eq(0)").keyup();

			forecastPersonal.genquality(aqi_final.find("input:eq(0)"));
		}else{
			if (node.val()=='无') {
				var pm2_5_IAQI=$table.find("tr[type='pm2_5_ir']").find("td[num='"+num+"']").text();
				$td.children("input").val(pm2_5_IAQI);
			}
			$td.children("input").removeAttr("disabled");
			$td.children("input").keyup();
			// var aqi_final=$table.find("tr[type='aqi_final']").find("td[num='"+num+"']");
			// aqi_final.find("input").val();
		}
	},
	dateChange:function(){
		var date = $("#datepicker").datepicker("getDate").getTime();
		$.ajax({
			type: "GET",
			url: "/smartadmin/mobileforecast/getForecastHistory",
			data: {'cityCode':cityCode,'cityType':cityType,'timePoint':date,'userName':userName},
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
					forecastPersonal.updateHistoryTable(data.data.forecast);
					forecastPersonal.updateMessage(data.data.message);
				}else{
					timeoutAlert();
				}
			}});
	},
	loadPage:function(){
		
	},
	cityChoose:function(btn){
//		if (btn.val()==cityCode) {return;};
		cityCode=btn.children("input").val();
		$(".forecastCity").text(btn.children("input").attr("tag"));
		$(".cityName").text(btn.text());

		$table.find(".data").children().hide();
		$table.find(".data").children("span").remove();
		$table.find(".content").children().hide();
		$table.find(".content").children("span").remove();
		$(".submitBtn").addClass("disabled");
		$(".submitBtn").unbind( "click" );
		$.ajax({
			type: "GET",
			url: "/smartadmin/mobileforecast/getForecast",
			data: {'cityCode':cityCode,'cityType':cityType,'userName':userName},
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
					forecastPersonal.clearTable();

					//未来四天模式预报表
					
					forecastPersonal.forestTable(data.data);
					
					range=data.data.range;
					hasHistory=data.data.hasHistory;
					if (data.data.isDone&&data.data.isAudit) {
						forecastPersonal.fillTable($table,data.data.forecast);
					}else{

						isAudit = data.data.isAudit;
						if (!data.data.isAudit) {
							$table.find(".data").each(function(){
								if ($(this).attr("num")<=days) {
									$(this).children().show();
									};
							});
							$table.find("textarea").show();
							$(".submitBtn").removeClass("disabled");
							$(".submitBtn").bind("click",forecastPersonal.comfirm);

							setTimeout(function(){ 
								checkeNoticeInterval=setInterval(function(){
									forecastPersonal.checkeNotice();
								},15000);
							},5000);

							if (data.data.isDone) {
								forecastPersonal.fillTable2(data.data.forecast);
							}else{

								// forecastPersonal.fillTable_auto(data.data);
								// forecastPersonal.clearTable();
							}
						}
						forecastPersonal.updateHistoryTable(data.data.history);
					}
					if (data.data.isDone) {
//						$("#audit_tab").show();
							forecastPersonal.updateHistoryTable(data.data.forecast);
					}else{
//						$("#audit_tab").hide();
					}
					if (data.data.isDone||data.data.isAudit) {
						$("#audit_tab").show();
					}else{
						$("#audit_tab").hide();
					}
					if (data.data.isAudit) {
						$(".tip_audit").html('（今日数据已审核！）');
					}else{
						$(".tip_audit").html('（今日数据暂未审核！）');
					}
					forecastPersonal.drawChart.init(data.data.chart);
					
					forecastPersonal.fillModel(data.data);
					forecastPersonal.updateMessage(data.data.message);
					forecastPersonal.fillRangeTable();
				}else{
					timeoutAlert();
				}
			}});
		
		forecastPersonal.drawCustom.load();
		if (forecastPersonal.drawCustom.first==false) {
				$("#custom_Station div").empty();
				$("input[name='custom_itemCheck']:checked").each(function(key,value){
					$(value).prop("checked",false);
				}); 
				forecastPersonal.queryCustom(); 
			};
	},
	
	clearTable:function(){
		$table.find("input").val(""); 
		$table.find("tr[type='primaryPollutant']").find("select").children("option").removeAttr("selected"); 
						 
							//$table.find("select").multiselect("refresh");

							$table.find("select").each(function(){
								$(this).find("option:eq(6)").attr("selected", true);
							});

							$table.find("tr[type='pm2_5']").each(function(){
								$(this).find(".range").text("");
							})
							$table.find("tr[type='pm2_5_ir']").each(function(){
								$(this).children("td:gt(0)").text("");
							})
							$table.find("tr[type='pm2_5_quality']").each(function(){
								$(this).children("td:gt(0)").text("");
							}) 

							$table.find("tr[type='aqi_pm2_5']").each(function(){
								$(this).children("td:gt(0)").text("");
							})

							$table.find(".aqiContent").each(function(){
								$(this).children("textarea").val("");
							})

							$table.find("tr[type='aqi_npo']").each(function(){
								$(this).find("input").removeAttr("disabled");
							})
							$table.find("tr[type='aqi_npo']").each(function(){
								$(this).find(".range").text("");
							})

							$table.find("tr[type='quality']").each(function(){
								$(this).children("td:gt(0)").text("");
							}) 
							$table.find("tr[type='aqi_primaryPollutant']").each(function(){
								if(isAudit){
									$(this).children("td:gt(0)").text("无");
								}
								
							})
	},
	checkeNotice:function(){
		var url=window.location.href.split("#")[1];
		if( !(url=='ajax/forecastCity.html'||url=='ajax/forecastCity-L.html') ){
			clearInterval(checkeNoticeInterval);
			return;
		}
		var data={};
		data.cityCode=cityCode;
		data.userName=userName;
		$.ajax({
			type: "GET",
			url: "/smartadmin/mobileforecast/getAuditNotice",
			data:data,
			dataType: "json",
			timeout:8000,
			beforeSend:function(){ 
			},
			error:function(XMLHttpRequest, textStatus, errorThrown){  
			},
			success: function(data){ 
				
				if(data.result){
					if (data.data.state) { 
 						// $.smallBox({
							// 			title: data.data.message,
							// 			content: "<i class='fa fa-clock-o'></i> <i>系统提示...</i>",
							// 			color: "#296191",
							// 			iconSmall: "fa  fa-check-circle bounce animated",
							// 			timeout: 5000
							// 		});

					}else{
						$.smallBox({
										title: data.data.message,
										content: "<i class='fa fa-clock-o'></i> <i>系统提示...</i>",
										color: "rgb(158, 36, 41)",
										iconSmall: "fa  fa-times-circle bounce animated" ,
										// timeout:5000
									});
						clearInterval(checkeNoticeInterval);
 
					}
				}else{
					timeoutAlert();
				}
			}});
	},
	toForecastAudit:function(){
		window.location = 'index.htm#ajax/forecastAudit.html';
		return false;
	},
	fillTable_auto:function(data){ 
		if (hasHistory) {
			for (var i = 0; i < data.autoFill; i++) { 
							$table.find("tr[type='pm2_5']").children("td[num='"+(i+1)+"']").children("input").val(data.history.PM2_5[i+3-data.autoFill]);  

							var pm2_5_dr=data.history.PM2_5_DR[i+3-data.autoFill].split("~");var pm2_5_ir=data.history.PM2_5_IR[i+3-data.autoFill].split("~");

							// $table.find("tr[type='pm2_5_dr_ir']").children("td[num='"+(i+1)+"']").append("<span>"+pm2_5_dr[0]+"("+pm2_5_ir[0]+")~"+pm2_5_dr[1]+"("+pm2_5_ir[1]+")"+"</span>");
							var pm2_5_IAQI=forecastPersonal.IAQICal("pm2_5",data.history.PM2_5[i+3-data.autoFill]);
 							$table.find("tr[type='pm2_5']").children("td[class='range']").eq(i).text(pm2_5_dr[0]+"~"+pm2_5_dr[1]);
 							$table.find("tr[type='pm2_5_ir']").children("td[class='data']").eq(i).text(pm2_5_IAQI);
 							$table.find("tr[type='pm2_5_ir']").children("td[class='range']").eq(i).text(pm2_5_ir[0]+"~"+pm2_5_ir[1]);

							var $td=$table.find("tr[type='pm2_5_quality']").children("td[num='"+(i+1)+"']");
							forecastPersonal.genqualityTD(pm2_5_ir[0],pm2_5_ir[1],$td);


							$table.find("tr[type='pm2_5_dr']").children("td[num='"+(i+1)+"']").append("<span>"+data.history.PM2_5_DR[i+3-data.autoFill]+"</span>");
							$table.find("tr[type='pm2_5_ir']").children("td[num='"+(i+1)+"']").append("<span>"+data.history.PM2_5_IR[i+3-data.autoFill]+"</span>");

							$table.find("tr[type='o3']").children("td[num='"+(i+1)+"']").children("input").val(data.history.O3[i+3-data.autoFill]);
							$table.find("tr[type='o3_dr']").children("td[num='"+(i+1)+"']").append("<span>"+data.history.O3_DR[i+3-data.autoFill]+"</span>");
							$table.find("tr[type='o3_ir']").children("td[num='"+(i+1)+"']").append("<span>"+data.history.O3_IR[i+3-data.autoFill]+"</span>");

 
							if (data.history.AQI_PO[i+3-data.autoFill]!="") {
								$table.find("tr[type='aqi_po']").children("td[num='"+(i+1)+"']").addClass("state-success");
								$table.find("tr[type='aqi_po']").children("td[num='"+(i+1)+"']").find("input").eq(0).val(data.history.AQI_PO[i+3-data.autoFill].split("~")[0]);  
								$table.find("tr[type='aqi_po']").children("td[num='"+(i+1)+"']").find("input").eq(1).val(data.history.AQI_PO[i+3-data.autoFill].split("~")[1]);

								$table.find("tr[type='aqi_final']").children("td[num='"+(i+1)+"']").attr("type","aqi_po");
							};
							if (data.history.AQI_NPO[i+3-data.autoFill]!="") {
								$table.find("tr[type='aqi_npo']").children("td[num='"+(i+1)+"']").addClass("state-success");
								$table.find("tr[type='aqi_npo']").children("td[num='"+(i+1)+"']").children("input").val(data.history.AQI_NPO[i+3-data.autoFill]);
								
								$table.find("tr[type='aqi_final']").children("td[num='"+(i+1)+"']").attr("type","aqi_npo");
							};
							$table.find("tr[type='aqi_final']").children("td[num='"+(i+1)+"']").find("input").eq(0).val(data.history.AQI[i+3-data.autoFill].split("~")[0]);
							$table.find("tr[type='aqi_final']").children("td[num='"+(i+1)+"']").find("input").eq(1).val(data.history.AQI[i+3-data.autoFill].split("~")[1]); 
 
							var arr_temp=data.history.PRIMARYPOLLUTANT[i+3-data.autoFill].split(",");
							for (var j = 0; j < arr_temp.length; j++) {
								$table.find("tr[type='primaryPollutant']").children("td[num='"+(i+1)+"']").children("select").children("option[value='"+arr_temp[j]+"']").attr("selected","");
							};
							
							$table.find("tr[type='quality']").children("td[num='"+(i+1)+"']").append("<span>"+data.history.QUALITY[i+3-data.autoFill]+"</span>");
						};
							// $table.find("select").multiselect("refresh");
							$table.find("select").each(function(){
								$(this).find("option:eq(6)").attr("selected", true);
							});
			 
		}
	},
	fillModel:function(data){
		var $m_pm2_5TDs=$("tr[type='m_pm2_5']").children("td");
		var $m_o3TDs=$("tr[type='m_o3']").children("td");
		var $m_ppTDs=$("tr[type='m_pp']").children("td");
		for (var i = 0; i < 9; i++) {
			var m_pm2_5=data.m_pm2_5[Math.floor(i/3)][i%3];
			m_pm2_5=m_pm2_5==''?'':Math.round(m_pm2_5);
			$m_pm2_5TDs.eq(i).text(m_pm2_5);
			$m_o3TDs.eq(i).text(data.m_o3[Math.floor(i/3)][i%3]);
			$m_ppTDs.eq(i).text(data.m_pp[Math.floor(i/3)][i%3]);
		};
	},
	updateHistoryTable:function(data){
		if (hasHistory) {
			if (data==null) {
				$tableHistory.hide();
				$("#historyInfo").html("<br>当日没有预报").show();
			}else{
				$tableHistory.find(".data").children("span").remove();
				$tableHistory.find(".content").children("span").remove();
				var date=new Date(data.TIMEPOINT);
			$('#datepicker').val($.datepicker.formatDate('yy年mm月dd日',date));
			$('#dateH').text($.datepicker.formatDate('yy/mm/dd',date));
				for (var i = 0; i < 5; i++) {
							date.setDate(date.getDate()+1);
							$tableHistory.find("tr[type='date']").children("th[num='"+(i+1)+"']").text($.datepicker.formatDate( "mm月dd日", date));
				};
							forecastPersonal.fillTable($tableHistory,data);
							$("#historyInfo").hide();
							$tableHistory.show();
						}
					}else{
						$tableHistory.hide();
						$("#historyInfo").html("<br>最近没有预报").show();

					}
	},
	updateMessage:function(data){
		if (data==null) {
			$("#historyMessage").css("text-align","center").text("暂无！");
		}else{
			$("#historyMessage").css("text-align","").text(data.replace("臭氧8小时", '臭氧'));
		}
	},
	//已提交
	fillTable:function($table,data){ 
	
			for (var i = 0; i < 3; i++) {
							// $table.find("tr[type='pm2_5']").children("td[num='"+(i+1)+"']").append("<span>"+eval("data.PM2_5_"+(i+1)+"D")+"</span>");
							$table.find("tr[type='pm2_5']").children("td[num='"+(i+1)+"']").append("<span>"+data.PM2_5[i]+"</span>");
							$table.find("tr[type='pm2_5']").children("td[num='"+(i+1)+"']").find("input").val(data.PM2_5[i]);
							$table.find("tr[type='pm2_5']").children("td[num='"+(i+1)+"']").find("input").keyup();


							// $table.find("tr[type='aqi_pm2_5']").children("td[num='"+(i+1)+"']").append("<span>"+data.PM2_5[i]+"</span>");

							// var pm2_5_dr=data.PM2_5_DR[i].split("~");var pm2_5_ir=data.PM2_5_IR[i].split("~");

							// $table.find("tr[type='pm2_5_dr_ir']").children("td[num='"+(i+1)+"']").append("<span>"+pm2_5_dr[0]+"("+pm2_5_ir[0]+")~"+pm2_5_dr[1]+"("+pm2_5_ir[1]+")"+"</span>");


							// var pm2_5_IAQI=forecastPersonal.IAQICal("pm2_5",data.PM2_5[i]);
 							// $table.find("tr[type='pm2_5']").children("td[class='range']").eq(i).text(pm2_5_dr[0]+"~"+pm2_5_dr[1]);
 							// $table.find("tr[type='pm2_5_ir']").children("td[class='data']").eq(i).text(pm2_5_IAQI);
 							// $table.find("tr[type='pm2_5_ir']").children("td[class='range']").eq(i).text(pm2_5_ir[0]+"~"+pm2_5_ir[1]);




							// var $td=$table.find("tr[type='pm2_5_quality']").children("td[num='"+(i+1)+"']");
							// forecastPersonal.genqualityTD(pm2_5_ir[0],pm2_5_ir[1],$td);

							// $table.find("tr[type='pm2_5_dr']").children("td[num='"+(i+1)+"']").append("<span>"+data.PM2_5_DR[i]+"</span>");
							// $table.find("tr[type='pm2_5_ir']").children("td[num='"+(i+1)+"']").append("<span>"+data.PM2_5_IR[i]+"</span>");

							// $table.find("tr[type='o3']").children("td[num='"+(i+1)+"']").append("<span>"+data.O3[i]+"</span>");
							// $table.find("tr[type='o3_dr']").children("td[num='"+(i+1)+"']").append("<span>"+data.O3_DR[i]+"</span>");
							// $table.find("tr[type='o3_ir']").children("td[num='"+(i+1)+"']").append("<span>"+data.O3_IR[i]+"</span>");

							// $table.find("tr[type='aqi_po']").children("td[num='"+(i+1)+"']").append("<span>"+data.AQI_PO[i]+"</span>");
							$table.find("tr[type='aqi_npo']").children("td[num='"+(i+1)+"']").append("<span>"+data.AQI_NPO[i]+"</span>");
							$table.find("tr[type='aqi_npo']").children("td[num='"+(i+1)+"']").find("input").val(data.AQI_NPO[i]);
							$table.find("tr[type='aqi_npo']").children("td[num='"+(i+1)+"']").find("input").keyup();


							if ($table.find("tr[type='aqi_npo']").find(".range").eq(i).text()=="~") {
								$table.find("tr[type='aqi_npo']").find(".range").eq(i).text("");
							};

							$table.find("tr[type='aqi_final']").children("td[num='"+(i+1)+"']").append("<span>"+data.AQI[i]+"</span>");
							$table.find("tr[type='primaryPollutant']").children("td[num='"+(i+1)+"']").append("<span>"+data.PRIMARYPOLLUTANT[i]+"</span>");
							$table.find("tr[type='aqi_primaryPollutant']").children("td[num='"+(i+1)+"']").append("<span>"+data.PRIMARYPOLLUTANT[i]+"</span>");
							$table.find("tr[type='quality']").children("td[num='"+(i+1)+"']").append("<span>"+data.QUALITY[i]+"</span>");
						};

						 // $table.find("td[name='pm2_5Content']").append("<span  >"+data.PM2_5CONTENT+"</span>");               
				 		// 	$table.find("td[name='o3Content']").append("<span  >"+data.O3CONTENT+"</span>");         
							$table.find(".aqiContent").children("textarea").val(data.AQICONTENT);  
							// data.aqiContent=$table.find(".aqiContent").children("textarea").val();
							// $table.find("td[name='primaryPollutantContent']").append("<span  >"+data.PRIMARYPOLLUTANTCONTENT+"</span>"); 
	},
	fillTable2:function(data){
		
			for (var i = 0; i < 3; i++) { 
							$table.find("tr[type='pm2_5']").children("td[num='"+(i+1)+"']").children("input").val(data.PM2_5[i]);  
							$table.find("tr[type='pm2_5']").children("td[num='"+(i+1)+"']").find("input").keyup();
							// $table.find("tr[type='aqi_pm2_5']").children("td[num='"+(i+1)+"']").append("<span>"+data.PM2_5[i]+"</span>");

							// var pm2_5_dr=data.PM2_5_DR[i].split("~");var pm2_5_ir=data.PM2_5_IR[i].split("~");
							// $table.find("tr[type='pm2_5_dr_ir']").children("td[num='"+(i+1)+"']").append("<span>"+pm2_5_dr[0]+"("+pm2_5_ir[0]+")~"+pm2_5_dr[1]+"("+pm2_5_ir[1]+")"+"</span>");

							// var pm2_5_IAQI=forecastPersonal.IAQICal("pm2_5",data.PM2_5[i]);
 						// 	$table.find("tr[type='pm2_5']").children("td[class='range']").eq(i).text(pm2_5_dr[0]+"~"+pm2_5_dr[1]);
 						// 	$table.find("tr[type='pm2_5_ir']").children("td[class='data']").eq(i).text(pm2_5_IAQI);
 						// 	$table.find("tr[type='pm2_5_ir']").children("td[class='range']").eq(i).text(pm2_5_ir[0]+"~"+pm2_5_ir[1]);
 							$table.find("tr[type='aqi_npo']").children("td[num='"+(i+1)+"']").find("input").val(data.AQI_NPO[i]);
							$table.find("tr[type='aqi_npo']").children("td[num='"+(i+1)+"']").find("input").keyup();

							$table.find("tr[type='aqi_final']").children("td[num='"+(i+1)+"']").find("input").eq(0).val(data.AQI[i].split("~")[0]);
							$table.find("tr[type='aqi_final']").children("td[num='"+(i+1)+"']").find("input").eq(1).val(data.AQI[i].split("~")[1]); 
							$table.find("tr[type='aqi_final']").children("td[num='"+(i+1)+"']").find("input").eq(0).keyup();



							$table.find("tr[type='primaryPollutant']").children("td[num='"+(i+1)+"']").children("select").children("option[value='"+data.PRIMARYPOLLUTANT[i]+"']").attr("selected","");
 
									var $td=$table.find("tr[type='aqi_npo']").find("td[num='"+(i+1)+"']");
									if (data.PRIMARYPOLLUTANT[i]=='细颗粒物(PM2.5)') {
										$td.children("input").attr("disabled","");
										$td.children("input").val("");
										$td.next().eq(0).text("");
									}else{
										$td.children("input").removeAttr("disabled");
									}


							$table.find("tr[type='aqi_primaryPollutant']").children("td[num='"+(i+1)+"']").append("<span>"+data.PRIMARYPOLLUTANT[i]+"</span>");
							// var $td=$table.find("tr[type='pm2_5_quality']").children("td[num='"+(i+1)+"']");
							// forecastPersonal.genqualityTD(pm2_5_ir[0],pm2_5_ir[1],$td);

							// $table.find("tr[type='pm2_5_dr']").children("td[num='"+(i+1)+"']").append("<span>"+data.PM2_5_DR[i]+"</span>");
							// $table.find("tr[type='pm2_5_ir']").children("td[num='"+(i+1)+"']").append("<span>"+data.PM2_5_IR[i]+"</span>");

							// $table.find("tr[type='o3']").children("td[num='"+(i+1)+"']").children("input").val(data.O3[i]);
							// $table.find("tr[type='o3_dr']").children("td[num='"+(i+1)+"']").append("<span>"+data.O3_DR[i]+"</span>");
							// $table.find("tr[type='o3_ir']").children("td[num='"+(i+1)+"']").append("<span>"+data.O3_IR[i]+"</span>");

							// if (data.AQI_PO[i]!="") {
							// 	$table.find("tr[type='aqi_po']").children("td[num='"+(i+1)+"']").addClass("state-success");
							// 	$table.find("tr[type='aqi_po']").children("td[num='"+(i+1)+"']").find("input").eq(0).val(data.AQI_PO[i].split("~")[0]);  
							// 	$table.find("tr[type='aqi_po']").children("td[num='"+(i+1)+"']").find("input").eq(1).val(data.AQI_PO[i].split("~")[1]);

							// 	$table.find("tr[type='aqi_final']").children("td[num='"+(i+1)+"']").attr("type","aqi_po");
							// };
							// if (data.AQI_NPO[i]!="") {
							// 	$table.find("tr[type='aqi_npo']").children("td[num='"+(i+1)+"']").addClass("state-success");
							// 	$table.find("tr[type='aqi_npo']").children("td[num='"+(i+1)+"']").children("input").val(data.AQI_NPO[i]);
								
							// 	$table.find("tr[type='aqi_final']").children("td[num='"+(i+1)+"']").attr("type","aqi_npo");
							// };
							// $table.find("tr[type='aqi_final']").children("td[num='"+(i+1)+"']").find("input").eq(0).val(data.AQI[i].split("~")[0]);
							// $table.find("tr[type='aqi_final']").children("td[num='"+(i+1)+"']").find("input").eq(1).val(data.AQI[i].split("~")[1]); 
 
							// var arr_temp=data.PRIMARYPOLLUTANT[i].split(",");
							// for (var j = 0; j < arr_temp.length; j++) {
							// 	$table.find("tr[type='primaryPollutant']").children("td[num='"+(i+1)+"']").children("select").children("option[value='"+arr_temp[j]+"']").attr("selected","");
							// };
							
							// $table.find("tr[type='quality']").children("td[num='"+(i+1)+"']").append("<span>"+data.QUALITY[i]+"</span>");
						};
							// $table.find("select").multiselect("refresh");
							// $table.find("select").each(function(){
							// 	$(this).find("option:eq(6)").attr("selected", true);
							// });

						 // $table.find("td[name='pm2_5Content']").children("textarea").val(data.PM2_5CONTENT);     
				 		// 	$table.find("td[name='o3Content']").children("textarea").val(data.O3CONTENT);       
							$table.find(".aqiContent").children("textarea").val(data.AQICONTENT);   
							// $table.find("td[name='primaryPollutantContent']").children("textarea").val(data.PRIMARYPOLLUTANTCONTENT);   
	},
	genPollutant:function(node){
		var val=$(node).val();
		var num=$(node).parent("td").attr("num");
		var type=$(node).parents("tr").attr("type");
		if (val=="") {
			$(node).parents("tr").next().eq(0).children("td[num='"+num+"']").text("");
			$(node).parents("tr").next().next().eq(0).children("td[num='"+num+"']").text("");
			// $(node).parents("tr").next().next().next().eq(0).children("td[num='"+num+"']").text("");
			// $(node).parents("tr").next().next().next().next().eq(0).children("td[num='"+num+"']").text("");
			return;
		};
		val=parseInt(val);
		// var denRange=forecastPersonal.calDenRange(type,val);
		// if (denRange[0]=="") {
		// 	$(node).parents("tr").next().eq(0).children("td[num='"+num+"']").text("");
		// 	$(node).parents("tr").next().next().eq(0).children("td[num='"+num+"']").text("");
			// $(node).parents("tr").next().next().next().eq(0).children("td[num='"+num+"']").text("");
			// $(node).parents("tr").next().next().next().next().eq(0).children("td[num='"+num+"']").text("");
		// }else{
			


			var pm2_5_IAQI=forecastPersonal.IAQICal("pm2_5",val);

			// var aqiRange=forecastPersonal.calAQIRange(type,denRange);
			var aqiRange=forecastPersonal.calAQIRange_New(pm2_5_IAQI);
			$(node).parents("tr").next().children("td[class='data']").text(pm2_5_IAQI);
			$(node).parents("tr").next().children("td[class='range']").text(aqiRange[0]+"~"+aqiRange[1]);


			$(node).parents("td").next().eq(0).text(forecastPersonal.PM2_5Calc(aqiRange[0])+"~"+forecastPersonal.PM2_5Calc(aqiRange[1]));


			// $(node).parents("tr").next().next().eq(0).children("td[num='"+num+"']").text(denRange[0]+"~"+denRange[1]);
			
			// $(node).parents("tr").next().next().next().eq(0).children("td[num='"+num+"']").text(aqiRange[0]+"~"+aqiRange[1]);

			// $(node).parents("tr").next().eq(0).children("td[num='"+num+"']").text(  denRange[0]+"("+aqiRange[0]+")~"+denRange[1]+"("+aqiRange[1]+")"  );

			var $td=$(node).parents("tr").next().next().next().next().eq(0).children("td[num='"+num+"']");
			//alert($td.prev("td").text());
			forecastPersonal.genqualityTD(aqiRange[0],aqiRange[1],$td);
		// }
		// console.log($table.find("tr[type='aqi_pm2_5']").children("td[num='"+num+"']"));
		// console.log(val);
		$table.find("tr[type='aqi_pm2_5']").children("td[num='"+num+"']").text(val);
		
		$table.find("select").parent("td[num='"+num+"']").children().click();
		
	},
	calAQIRange_New:function(iaqi){
		if (isNaN(iaqi)) {
			return["",""]};
			iaqi=parseInt(iaqi);
		var level=forecastPersonal.getAQILevel(iaqi);
		var factor=parseInt(eval("range.other[level]"));
		
		var aqiLow=iaqi-factor;
		var aqiHigh=iaqi+factor;
		if (aqiLow<=0) {
			aqiLow=1;
		};
		// if (aqiHigh=="-") {
		// 	aqiHigh=type=="pm2_5"?500:300;
		// };
		return [aqiLow,aqiHigh];
	},
	calDenRange:function(type,val){
		var level=forecastPersonal.getAQILevel(forecastPersonal.IAQICal(type,val));

		var factor=eval("range."+type+"[level]");
		// if (factor==""&&type=="o3") {
		// 	factor=range.o3[4];
		// };
		if (factor=="") {
			return ["",""];
		};
		factor=parseInt(factor);
		// var x=val*factor/100;
		var valLow=(val-factor);
		var valHigh=(val+factor);
		if (valLow<=0) {
			return ["",""];
		};
		return [valLow,valHigh];
	},
	calAQIRange:function(type,denRange){
		
		var aqiLow=forecastPersonal.IAQICal(type,denRange[0]);
		var aqiHigh=forecastPersonal.IAQICal(type,denRange[1]);
		if (aqiLow=="-") {
			aqiLow=type=="pm2_5"?500:300;
		};
		if (aqiHigh=="-") {
			aqiHigh=type=="pm2_5"?500:300;
		};
		return [aqiLow,aqiHigh];
	},
	genAQI:function(node){
		var val=$(node).val();
		var num=$(node).parents("td").attr("num");
		var type=$(node).parents("tr").attr("type");

		// $table.find("tr[aqi]").children("td[num='"+num+"']").removeClass("state-success");
		// $(node).parents("td").addClass("state-success");

		var val1="";
		var val2="";

		if (type=="aqi_po") {
			val1=$(node).parents("td").find("input").eq(0).val();
			val2=$(node).parents("td").find("input").eq(1).val();
			$(node).parents("tr").next().next().eq(0).children("td[num='"+num+"']").find("input").eq(0).val(val1);
			$(node).parents("tr").next().next().eq(0).children("td[num='"+num+"']").find("input").eq(1).val(val2);
			$(node).parents("tr").next().next().eq(0).children("td[num='"+num+"']").attr("type","aqi_po");
		}else{
			if (val!="") {
					val=parseInt(val);
					var level=forecastPersonal.getAQILevel(val);
					var factor=range.other[level];
					if (factor!="") {
							factor=parseInt(factor);
						// var x=val*factor/100;
						val1=(val-factor);
						val2=(val+factor);

						if (val1<=0) {
							val1=1;
							// val2="";
						};
					} 
					
			};
			$(node).parents("td").next().eq(0).text(val1+"~"+val2);
			$(node).parents("tr").next().eq(0).children("td[num='"+num+"']").find("input").eq(0).val(val1);
			$(node).parents("tr").next().eq(0).children("td[num='"+num+"']").find("input").eq(1).val(val2);
			$(node).parents("tr").next().eq(0).children("td[num='"+num+"']").attr("type","aqi_npo");
		}

		var $td=$table.find("tr[type='quality']").children("td[num='"+num+"']");
		forecastPersonal.genqualityTD(val1,val2,$td);

	},
	genquality:function(node){
		var num=$(node).parents("td").attr("num");
		var val1=$(node).parents("td").find("input").eq(0).val();
		var	val2=$(node).parents("td").find("input").eq(1).val();
		var $td=$table.find("tr[type='quality']").children("td[num='"+num+"']");
		forecastPersonal.genqualityTD(val1,val2,$td);
	},
	genqualityTD:function(val1,val2,$td){
		if (val1==""||val2=="") {
			$td.text("");
		}else{
			var level1=forecastPersonal.getAQILevel(val1);
			var level2=forecastPersonal.getAQILevel(val2);
			if (level1>level2) {
				$td.text("");
			}else{
				var qua1=forecastPersonal.getquality(level1);
				var qua2=forecastPersonal.getquality(level2);
				if (qua1==qua2) {
					$td.text(qua1);
				}else{
					$td.text(qua1+"至"+qua2);
				}
			}
		}
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
	getquality:function(data){
		if (data==0) {
			return "优";
		}else if (data==1) {
			return "良";
		}else if (data==2) {
			return "轻度污染";
		}else if (data==3) {
			return "中度污染";
		}else if (data==4) {
			return "重度污染";
		}else if (data==5) {
			return "严重污染";
		}else if (data==6) {
			return "严重污染";
		}else if (data==7) {
			return "严重污染";
		}
	},
	comfirm:function(){
		var flag=true;
		var numFlag=true;

		
		$table.find("td[required]").each(function(){
			if ($(this).attr("num")<=days) {
				$(this).find("input").each(function(){
					if($(this).val()==""){
						flag=false;
						$(this).parents("td").addClass("state-error");
						return false;
					}
					$(this).parents("td").removeClass("state-error");
				});
			}
		});
		$table.find("tr[type='aqi_final']").children("td").each(function(){
				var aqiLow=$(this).find("input").eq(0).val();
				var aqiHigh=$(this).find("input").eq(1).val();
				
				if (aqiLow!=""&&aqiHigh!="") {
					if (parseInt(aqiLow)>parseInt(aqiHigh)) {
						numFlag=false;
						$(this).addClass("state-error");
					}else{
						$(this).removeClass("state-error");
					}
				}

				if ($(this).attr("num")<=days) {
				if (aqiLow==""||aqiHigh=="") {
									flag=false;
									$(this).addClass("state-error");
								}
							}
 
 

		});
		var pm2_5Flag=true;
		var not_pm2_5Flag=true;
		var not_pm2_5Flag2=true;

		$table.find("td[requiredSelect]").each(function(k,v){
			if ($(this).attr("num")<=days) {

				var $select=$(this).find("select");
				var aqi_final=$table.find("tr[type='aqi_final']").find("td[num='"+(k+1)+"']");
						var aqi0=parseInt(aqi_final.find("input:eq(0)").val());
						var aqi1=parseInt(aqi_final.find("input:eq(1)").val());
						
						var pm2_5_IAQI=$table.find("tr[type='pm2_5_ir']").find("td[class='range']").eq(k).text().split("~");
				if ($select.val()=='细颗粒物(PM2.5)') {
						if (aqi0<pm2_5_IAQI[0]||aqi1>pm2_5_IAQI[1]) {
							pm2_5Flag=false;
							$(this).addClass("state-error");
						}else{
							$(this).removeClass("state-error");
						}

					// if (node.val()=='细颗粒物(PM2.5)') {
			
					// 	$td.children("input").attr("disabled","");
					// 	$td.children("input").val("");
					// 	$td.next().eq(0).text("");

					// 	var aqi_final=$table.find("tr[type='aqi_final']").find("td[num='"+num+"']");
					// 	var pm2_5_IAQI=$table.find("tr[type='pm2_5_ir']").find("td[class='range']").eq(num-1).text().split("~");
					// 	aqi_final.find("input:eq(0)").val(pm2_5_IAQI[0]);
					// 	aqi_final.find("input:eq(1)").val(pm2_5_IAQI[1]);
					// }else{
					// 	$td.children("input").removeAttr("disabled");
					// 	var aqi_final=$table.find("tr[type='aqi_final']").find("td[num='"+num+"']");
					// 	aqi_final.find("input").val();
					// }


				}else{ 
						
						if (aqi1<pm2_5_IAQI[1]) {
							not_pm2_5Flag=false;
							$(this).addClass("state-error");
						}else{
							$(this).removeClass("state-error");
						}

						var aqi_npo=parseInt($table.find("tr[type='aqi_npo']").find("td[num='"+(k+1)+"']").find("input").val());
						var pm2_5_ir=parseInt($table.find("tr[type='pm2_5_ir']").find("td[num='"+(k+1)+"']").text());
						if (aqi_npo<pm2_5_ir) {
							not_pm2_5Flag2=false;
							$(this).addClass("state-error");
						}else{
							$(this).removeClass("state-error");
						}
				}



			// $(this).find("select").each(function(k,v){


			// 	// if($(this).val()==null){
			// 	// 	flag=false;
			// 	// 	$(this).parents("td").addClass("state-error");
			// 	// 	return false;
			// 	// }
			// 	// $(this).parents("td").removeClass("state-error");
			// 	if ($(this).val()=='细颗粒物(PM2.5)') {

			// 	};


			// });


			}
		});

		var level1Flag=true;
		var level2Flag=true;
		$table.find("tr[type='quality']").each(function(k,v){
			var quality=$(this).children("td:eq(1)").text();
			var pp=$table.find("select:lt(3)").eq(k);
			if (quality=="优") {
				if (pp.val()!="无") {
					level1Flag=false;
					$(this).addClass("state-error");
				}else{
					$(this).removeClass("state-error");
				}
			}else if (quality=="优或良") {
				if (pp.val()=="无") {
					level2Flag=false;
					$(this).addClass("state-error");
				}else{
					$(this).removeClass("state-error");
				}
			};



		});





		
	

		if (flag&&numFlag&&level1Flag&&level2Flag&&pm2_5Flag&&not_pm2_5Flag&&not_pm2_5Flag2) {
				forecastPersonal.bootStrapDialogshow("small-dialog","提交确认",$("<label style='font-size:24px'>提交完成后不可修改，是否确认提交本次预测？</label>"),"forecastPersonal.submit()","forecastPersonal.submitCancel()","取消","确认","");
		}else{
			if (!flag) {
				$.smallBox({
									title : "错误！",
									content : "必填项不可为空！",
									color : "rgb(158, 36, 41)",
									timeout: 5000,
									icon : "fa fa-bell swing animated"
								});
			}
			if (!numFlag) {
				$.smallBox({
									title : "错误！",
									content : "AQI范围最大值不能低于最小值！",
									color : "rgb(158, 36, 41)",
									timeout: 5000,
									icon : "fa fa-bell swing animated"
								});
			}

			if (!level1Flag) {
				$.smallBox({
									title : "错误！",
									content : "空气质量等级为优时，首要污染物应为无!",
									color : "rgb(158, 36, 41)",
									timeout: 5000,
									icon : "fa fa-bell swing animated"
								});
			}
			if (!level2Flag) {
				$.smallBox({
									title : "错误！",
									content : "空气质量等级为优或良时，首要污染物不能为无!",
									color : "rgb(158, 36, 41)",
									timeout: 5000,
									icon : "fa fa-bell swing animated"
								});
			}


			if (!pm2_5Flag) {
				$.smallBox({
									title : "错误！",
									content : "首要污染物为PM2.5时，最终AQI必须在PM2.5的IAQI范围内!",
									color : "rgb(158, 36, 41)",
									timeout: 5000,
									icon : "fa fa-bell swing animated"
								});
			}
			if (!not_pm2_5Flag) {
				$.smallBox({
									title : "错误！",
									content : "首要污染物不是PM2.5时，最终AQI最大值必须大于等于PM2.5的IAQI最大值!",
									color : "rgb(158, 36, 41)",
									timeout: 5000,
									icon : "fa fa-bell swing animated"
								});
			}
			if (!not_pm2_5Flag2) {
				$.smallBox({
									title : "错误！",
									content : "首要污染物不是PM2.5时，中值必须比PM2.5对应的IAQI大!",
									color : "rgb(158, 36, 41)",
									timeout: 5000,
									icon : "fa fa-bell swing animated"
								});
			}

			
		}
		

	},
	submit:function(){
		$(".submitBtn").addClass("disabled");
		$(".submitBtn").unbind( "click" );

		var data={};
		data.cityCode=cityCode;
		data.userName=userName;
		data.cityType=cityType;
		var pm2_5=[];
		var pm2_5_dr=[];
		var pm2_5_ir=[];
		var o3=[];
		var o3_dr=[];
		var o3_ir=[];
		var aqi=[];
		var aqi_po=[];
		var aqi_npo=[];
		var primaryPollutant=[];
		var quality=[];
		for (var i = 0; i < 5; i++) {
				// pm2_5.push($table.find("tr[type='pm2_5']").children("td[num='"+(i+1)+"']").children("input").val());
				pm2_5.push($table.find("tr[type='aqi_pm2_5']").children("td[num='"+(i+1)+"']").text());

				var val=parseInt($table.find("tr[type='aqi_pm2_5']").children("td[num='"+(i+1)+"']").text()); 
				var pm2_5_IAQI=forecastPersonal.IAQICal("pm2_5",val);
				var aqiRange=forecastPersonal.calAQIRange_New(pm2_5_IAQI);
				pm2_5_ir.push(aqiRange[0]+"~"+aqiRange[1]);
  	

  				pm2_5_dr.push(forecastPersonal.PM2_5Calc(aqiRange[0])+"~"+forecastPersonal.PM2_5Calc(aqiRange[1]));


				o3.push($table.find("tr[type='o3']").children("td[num='"+(i+1)+"']").children("input").val());
				o3_dr.push($table.find("tr[type='o3_dr']").children("td[num='"+(i+1)+"']").text());
				o3_ir.push($table.find("tr[type='o3_ir']").children("td[num='"+(i+1)+"']").text());
				var aqiLow=$table.find("tr[type='aqi_final']").children("td[num='"+(i+1)+"']").find("input").eq(0).val();
				var aqiHigh=$table.find("tr[type='aqi_final']").children("td[num='"+(i+1)+"']").find("input").eq(1).val();
				if (aqiLow==""||aqiHigh=="") {
					aqi.push("");
				}else{
					aqi.push(aqiLow+"~"+aqiHigh);
				}
			// aqi.push($table.find("tr[type='aqi_final']").children("td[num='"+(i+1)+"']").find("input").eq(0).val()+"~"+$table.find("tr[type='aqi_final']").children("td[num='"+(i+1)+"']").find("input").eq(1).val());
			var aqiType=$table.find("tr[type='aqi_final']").children("td[num='"+(i+1)+"']").attr("type");
			if (aqiType=="aqi_po") {
				aqi_po.push($table.find("tr[type='aqi_po']").children("td[num='"+(i+1)+"']").find("input").eq(0).val()+"~"+$table.find("tr[type='aqi_po']").children("td[num='"+(i+1)+"']").find("input").eq(1).val());
				aqi_npo.push("");
			}else if (aqiType=="aqi_npo") {
				aqi_npo.push($table.find("tr[type='aqi_npo']").children("td[num='"+(i+1)+"']").children("input").val());
				aqi_po.push("");
			}else{
				aqi_po.push("");
				aqi_npo.push("");
			}

			var pp=$table.find("tr[type='primaryPollutant']").children("td[num='"+(i+1)+"']").children("select").val();
			 

			if (i<3) {
				primaryPollutant.push(pp);
			}else{
				primaryPollutant.push("");
			}
			// if (pp==null) {
			// 	primaryPollutant.push("");
			// }else{
			// 	primaryPollutant.push(pp.join(","));
			// }
			quality.push($table.find("tr[type='quality']").children("td[num='"+(i+1)+"']").text().trim());
		};
		data.pm2_5=pm2_5.join("|");
		data.pm2_5_dr=pm2_5_dr.join("|");
		data.pm2_5_ir=pm2_5_ir.join("|");
		data.o3=o3.join("|");
		data.o3_dr=o3_dr.join("|");
		data.o3_ir=o3_ir.join("|");
		data.aqi=aqi.join("|");
		data.aqi_po=aqi_po.join("|");
		data.aqi_npo=aqi_npo.join("|");
		data.primaryPollutant=primaryPollutant.join("|");
		data.quality=quality.join("|");
		
		data.pm2_5Content=$table.find("td[name='pm2_5Content']").children("textarea").val();
		data.o3Content=$table.find("td[name='o3Content']").children("textarea").val();
		data.aqiContent=$table.find(".aqiContent").children("textarea").val();
		data.primaryPollutantContent=$table.find("td[name='primaryPollutantContent']").children("textarea").val();
		



		// console.log(data);

		// $("#loadingText").text("正在提交数据，请稍候······");
		// 		$("#over").attr("style","display:");
		// 		$("#layout").attr("style","display:");
		// 		$("html").css({overflow:"hidden"});
		// 		return;

		$.ajax({
			type: "post",
			url: "/smartadmin/mobileforecast/saveForecast",
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
						$(".submitBtn").bind("click",forecastPersonal.comfirm);
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
	submitCancel:function(){

	},
	drawChart:{
		date:null,
		foreIndex:0,
		//option:null,

		o3:null,
		pm2_5:null,
		aqi:null,
		pp:null,
		quality:null,

		aqi_m:null,
		pm2_5_m:null,
		o3_m:null,

		r_o3:null,
		r_pm2_5:null,
		r_aqi:null,
		r_pp:null,
		r_quality:null,
		load:function(){
			this.foreIndex=0;
		},
//		drawChart1:function(){
//			if(count>=5){
//				clearInterval(drawInterval);
//				drawIntervalflag=1;
//				count=0;
//			}else{
//				myChart[count].clear();
//				myChart[count].setOption(this.option[count]);
//				count++;
//			}
//		},
		init:function(data){ 
			
			var sDate=$.datepicker.formatDate("yy年mm月dd日",new Date(data.startTimePoint));
			var eDate=$.datepicker.formatDate("yy年mm月dd日",new Date(data.endTimePoint));
			$('#startDatepicker0').val(sDate);
			$('#endDatepicker0').val(eDate);
			$('#endDatepicker0').datepicker('option','minDate',sDate);

			this.date=[];
			this.option=[];

			this.o3=data.o3;
			this.pm2_5=data.pm2_5;
			this.aqi=data.aqi;
			this.pp=[];
			this.quality=[];

			this.o3_m=data.o3_8h;
			
			this.aqi_m=data.m_aqi;
			
			this.pm2_5_m=data.m_pm2_5;
			
			this.r_co=[];
			this.r_no2=[];
			this.r_o3=[];
			this.r_so2=[];
			this.r_pm10=[];
			this.r_pm2_5=[];
			this.r_aqi=[];
			this.r_pp=[[],[],[],[],[],[],[]];
			this.r_quality=[[],[],[],[],[],[],[]];

			for (var k = 0; k < 3; k++) {
				this.pp.push([[],[],[],[],[],[],[]]);
				this.quality.push([[],[],[],[],[],[]]);
			};


			for (var i = 0; i < data.days; i++) {
				this.date[i]=24*3600*1000*i;

				this.r_pm2_5.push({value :[this.date[i],data.r_pm2_5[i]]});
				this.r_o3.push({value :[this.date[i],data.r_o3[i]]});
				this.r_aqi.push({value :[this.date[i],data.r_aqi[i]]});

				//real pp
				for (var j = 0; j < this.r_pp.length; j++) {
					this.r_pp[j].push('-');
				};

				var ppTemp=data.r_pp[i].split(",");
				for (var j = 0; j < ppTemp.length; j++) {
					switch(ppTemp[j]){
						case '细颗粒物(PM2.5)':
							this.r_pp[0][i]=-1;
						break;
						case '臭氧8小时':
							this.r_pp[1][i]=-1;
						break;
						case '二氧化硫':
							this.r_pp[2][i]=-1;
						break;
						case '二氧化氮':
							this.r_pp[3][i]=-1;
						break;
						case '一氧化碳':
							this.r_pp[4][i]=-1;
						break;
						case '颗粒物(PM10)':
							this.r_pp[5][i]=-1;
						break;
						case '无':
							this.r_pp[6][i]=-1;
						break;
					}
				};

				//fore pp
				for (var k = 0; k < 3; k++) {
					this.pp[k].push('-');
					for (var j = 0; j < 7; j++) {
						this.pp[k][j].push('-');
					};
					var ppTemp=data.pp[k][i].split(",");
					for (var j = 0; j < ppTemp.length; j++) {
						switch(ppTemp[j]){
							case '细颗粒物(PM2.5)':
								this.pp[k][0][i]=1;
							break;
							case '臭氧8小时':
								this.pp[k][1][i]=1;
							break;
							case '二氧化硫':
								this.pp[k][2][i]=1;
							break;
							case '二氧化氮':
								this.pp[k][3][i]=1;
							break;
							case '一氧化碳':
								this.pp[k][4][i]=1;
							break;
							case '颗粒物(PM10)':
								this.pp[k][5][i]=1;
							break;
							case '无':
								this.pp[k][6][i]=1;
							break;
						}
					};
				};

				//real quality
				for (var j = 0; j < this.r_quality.length; j++) {
					this.r_quality[j].push('-');
				};

				switch(data.r_quality[i]){
						case '优':
							this.r_quality[0][i]=-1;
						break;
						case '良':
							this.r_quality[1][i]=-1;
						break;
						case '轻度污染':
							this.r_quality[2][i]=-1;
						break;
						case '中度污染':
							this.r_quality[3][i]=-1;
						break;
						case '重度污染':
							this.r_quality[4][i]=-1;
						break;
						case '严重污染':
							this.r_quality[5][i]=-1;
						break;
					}

				//fore quality
				for (var k = 0; k < 3; k++) {
					for (var j = 0; j < 6; j++) {
						this.quality[k][j].push('-');
					};
					 
					 var qualityTemp=data.quality[k][i].split("至");
				 for (var j = 0; j < qualityTemp.length; j++) {

					switch(qualityTemp[j]){
						case '优':
							this.quality[k][0][i]=1;
						break;
						case '良':
							this.quality[k][1][i]=1;
						break;
						case '轻度污染':
							this.quality[k][2][i]=1;
						break;
						case '中度污染':
							this.quality[k][3][i]=1;
						break;
						case '重度污染':
							this.quality[k][4][i]=1;
						break;
						case '严重污染':
							this.quality[k][5][i]=1;
						break;
					}
				}
				};

			}

			
			console.log(this.r_pm2_5);
			
			myChart=(echarts.init(document.getElementById("Gra0")));
			option.splice(0,5);
			option.push({
			    tooltip : {
			    	textStyle : {
			    		fontSize : 24,
			    	},
			        trigger: 'axis',
			        formatter: function (params) {
			            var res = '';
			            // if (forecastModel.drawPoll.timeType==0) {
			            //     res+=''+forecastModel.formateRealTime(params[0][1]+data.startTimePoint+3600000);
			            // }else{
				            res+=''+$.datepicker.formatDate('mm月dd日',new Date(params[0][1]+data.startTimePoint));
			        	// }
			            for (var i = 0; i < params.length; i++) {
			            	if (params[i][0]=='实测') {
			   					res+='<br/>'+params[i][0]+'：'+params[i][2][1];
			   				}else{
			   					res+='<br/>'+params[i][0]+'：'+params[i][2];
			   				}
			            };
			            return res;
			        }
			    },
			    title : {
			    	textStyle:{
			    		fontSize : 24,
			    		fontWeight : 'bolder',
			    	},
			        text: '臭氧（O3）',
			        x:'left',
			        // y:0
			    },
			    toolbox: {
			        show : true,
			        itemSize : 24,
			        feature : {
			            // mark : {show: true},
			            // dataZoom : {show: true},
			            // dataView : {show: true},
			            magicType : {show: true, type: ['line', 'bar']},
			            restore : {show: true},
			            saveAsImage : {show: true}
			        }
			    },
			    // dataZoom : {
			    //     y: 250,
			    //     show : true,
			    //     realtime: true,
			    //     start : 0,
			    //     end : _zoomEnd
			    // },
			    grid: {
			        x: 100,
			        y:150,
			        x2:30,
			        y2:30
			    },
			    legend: {
			    	textStyle : {
			    		fontSize : 24,
			    	},
			    	data:['实测','24小时预测','48小时预测','72小时预测','96小时预测'],
			    	y:80
			    },
			    calculable : true,
			    xAxis : [
			        {
			            type : 'category',
			            // scale:true,
			            data : this.date,
			            axisTick:{
			            	interval:0
			          	},
			            axisLabel : {
			                formatter: function (v){
			                	// if (forecastModel.drawPoll.timeType==0) {
			                	// 	return forecastModel.formateRealTime(v+data.startTimePoint+3600000);
			                	// }else{
					            	return $.datepicker.formatDate('mm月dd日',new Date(v+data.startTimePoint));
			                	// }
					        },
					        textStyle : {
					    		fontSize : 20,
					    	},
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
			                formatter: '{value}μg/m3',
			                textStyle : {
					    		fontSize : 20,
					    	},
			            },
			            splitArea : {
			            	show : true,
			            	areaStyle:{color:'rgba(0,0,0,0)'}
			            }
			        }
			    ],
			    series : [
			    			{
			                  name:'实测',
			                  type:'scatter',
			                  symbol:'diamond',
			                  symbolSize:10,
			                  itemStyle:{
					                normal:{
					                    color:'#000000'
					                }
					            },
			                  data:this.r_o3
			              },{
			                  name:'24小时预测',
			                  type:'line',
			                  symbolSize:5,
			                  itemStyle: {                
				                normal: {
				                    color: '#ff0000'
				                }
				              },
			                  data:this.o3_m[0]
			              },
			              {
			                  name:'48小时预测',
			                  type:'line',
			                  symbolSize:5,
			                  itemStyle: {                
				                normal: {
				                    color: '#00ff00'
				                }
				              },
			                  data:this.o3_m[1]
			              },
			              {
			                  name:'72小时预测',
			                  type:'line',
			                  symbolSize:5,
			                  itemStyle: {                
				                normal: {
				                    color: '#0000ff'
				                }
				              },
			                  data:this.o3_m[2]
			              },
			              {
			                  name:'96小时预测',
			                  type:'line',
			                  symbolSize:5,
			                  itemStyle: {                
				                normal: {
				                    color: '#ffff00'
				                }
				              },
			                  data:this.o3_m[3]
			              }
			          ]
			}); 

				option.push({
				    tooltip : {
				    	textStyle : {
				    		fontSize : 24,
				    	},
				        trigger: 'axis',
				        formatter: function (params) {
				            var res = '';
				            // if (forecastModel.drawPoll.timeType==0) {
				            //     res+=''+forecastModel.formateRealTime(params[0][1]+data.startTimePoint+3600000);
				            // }else{
					            res+=''+$.datepicker.formatDate('mm月dd日',new Date(params[0][1]+data.startTimePoint));
				        	// }
				            for (var i = 0; i < params.length; i++) {
				            	if (params[i][0]=='实测') {
				   					res+='<br/>'+params[i][0]+'：'+params[i][2][1];
				   				}else{
				   					res+='<br/>'+params[i][0]+'：'+params[i][2];
				   				}
				            };
				            return res;
				        }
				    },
				    title : {
				    	textStyle:{
				    		fontSize : 24,
				    		fontWeight : 'bolder',
				    	},
				        text: '空气质量指数（AQI）',
				        x:'left',
				        // y:0
				    },
				    toolbox: {
				        show : true,
				        itemSize : 24,
				        feature : {
				            // mark : {show: true},
				            // dataZoom : {show: true},
				            // dataView : {show: true},
				            magicType : {show: true, type: ['line', 'bar']},
				            restore : {show: true},
				            saveAsImage : {show: true}
				        }
				    },
				    // dataZoom : {
				    //     y: 250,
				    //     show : true,
				    //     realtime: true,
				    //     start : 0,
				    //     end : _zoomEnd
				    // },
				    grid: {
				        x: 100,
				        y:150,
				        x2:30,
				        y2:30
				    },
				    legend: {
				    	textStyle : {
				    		fontSize : 24,
				    	},
				    	data:['实测','24小时预测','48小时预测','72小时预测','96小时预测'],
				    	y:80
				    },
				    calculable : true,
				    xAxis : [
				        {
				            type : 'category',
				            // scale:true,
				            data : this.date,
				            axisTick:{
				            	interval:0
				          	},
				            axisLabel : {
				                formatter: function (v){
				                	// if (forecastModel.drawPoll.timeType==0) {
				                	// 	return forecastModel.formateRealTime(v+data.startTimePoint+3600000);
				                	// }else{
						            	return $.datepicker.formatDate('mm月dd日',new Date(v+data.startTimePoint));
				                	// }
						        },
						        textStyle : {
						    		fontSize : 20,
						    	},
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
				                formatter: '{value}',
				                textStyle : {
						    		fontSize : 20,
						    	},
				            },
				            splitArea : {
				            	show : true,
				            	areaStyle:{color:'rgba(0,0,0,0)'}
				            }
				        }
				    ],
				    series : [
				    			{
				                  name:'实测',
				                  type:'scatter',
				                  symbol:'diamond',
				                  symbolSize:10,
				                  itemStyle:{
						                normal:{
						                    color:'#000000'
						                }
						            },
				                  data:this.r_aqi
				              },{
				                  name:'24小时预测',
				                  type:'line',
				                  symbolSize:5,
				                  itemStyle: {                
					                normal: {
					                    color: '#ff0000'
					                }
					              },
				                  data:this.aqi_m[0]
				              },
				              {
				                  name:'48小时预测',
				                  type:'line',
				                  symbolSize:5,
				                  itemStyle: {                
					                normal: {
					                    color: '#00ff00'
					                }
					              },
				                  data:this.aqi_m[1]
				              },
				              {
				                  name:'72小时预测',
				                  type:'line',
				                  symbolSize:5,
				                  itemStyle: {                
					                normal: {
					                    color: '#0000ff'
					                }
					              },
				                  data:this.aqi_m[2]
				              },
				              {
				                  name:'96小时预测',
				                  type:'line',
				                  symbolSize:5,
				                  itemStyle: {                
					                normal: {
					                    color: '#ffff00'
					                }
					              },
				                  data:this.aqi_m[3]
				              }
				             
				          ]
				}); 


				option.push({
				    tooltip : {
				    	textStyle : {
				    		fontSize : 24,
				    	},
				        trigger: 'axis',
				        formatter: function (params) {
				            var res = '';
				            // if (forecastModel.drawPoll.timeType==0) {
				            //     res+=''+forecastModel.formateRealTime(params[0][1]+data.startTimePoint+3600000);
				            // }else{
					            res+=''+$.datepicker.formatDate('mm月dd日',new Date(params[0][1]+data.startTimePoint));
				        	// }
				            for (var i = 0; i < params.length; i++) {
				            	if (params[i][0]=='实测') {
				   					res+='<br/>'+params[i][0]+'：'+params[i][2][1];
				   				}else{
				   					res+='<br/>'+params[i][0]+'：'+params[i][2];
				   				}
				            };
				            return res;
				        }
				    },
				    title : {
				    	textStyle:{
				    		fontSize : 24,
				    		fontWeight : 'bolder',
				    	},
				        text: 'PM2.5（细颗粒物）',
				        x:'left',
				        // y:0
				    },
				    toolbox: {
				        show : true,
				        itemSize : 24,
				        feature : {
				            // mark : {show: true},
				            // dataZoom : {show: true},
				            // dataView : {show: true},
				            magicType : {show: true, type: ['line', 'bar']},
				            restore : {show: true},
				            saveAsImage : {show: true}
				        }
				    },
				    // dataZoom : {
				    //     y: 250,
				    //     show : true,
				    //     realtime: true,
				    //     start : 0,
				    //     end : _zoomEnd
				    // },
				    grid: {
				        x: 100,
				        y:150,
				        x2:30,
				        y2:30
				    },
				    legend: {
				    	textStyle : {
				    		fontSize : 24,
				    	},
				    	data:['实测','24小时预测','48小时预测','72小时预测','96小时预测'],
				    	y:80
				    },
				    calculable : true,
				    xAxis : [
				        {
				            type : 'category',
				            // scale:true,
				            data : this.date,
				            axisTick:{
				            	interval:0
				          	},
				            axisLabel : {
				                formatter: function (v){
				                	// if (forecastModel.drawPoll.timeType==0) {
				                	// 	return forecastModel.formateRealTime(v+data.startTimePoint+3600000);
				                	// }else{
						            	return $.datepicker.formatDate('mm月dd日',new Date(v+data.startTimePoint));
				                	// }
						        },
						        textStyle : {
						    		fontSize : 20,
						    	},
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
				                formatter: '{value}μg/m3',
				                textStyle : {
						    		fontSize : 20,
						    	},
				            },
				            splitArea : {
				            	show : true,
				            	areaStyle:{color:'rgba(0,0,0,0)'}
				            }
				        }
				    ],
				    series : [
				    			{
				                  name:'实测',
				                  type:'scatter',
				                  symbol:'diamond',
				                  symbolSize:10,
				                  itemStyle:{
						                normal:{
						                    color:'#000000'
						                }
						            },
				                  data:this.r_pm2_5
				              },{
				                  name:'24小时预测',
				                  type:'line',
				                  symbolSize:5,
				                  itemStyle: {                
					                normal: {
					                    color: '#ff0000'
					                }
					              },
				                  data:this.pm2_5_m[0]
				              },
				              {
				                  name:'48小时预测',
				                  type:'line',
				                  symbolSize:5,
				                  itemStyle: {                
					                normal: {
					                    color: '#00ff00'
					                }
					              },
				                  data:this.pm2_5_m[1]
				              },
				              {
				                  name:'72小时预测',
				                  type:'line',
				                  symbolSize:5,
				                  itemStyle: {                
					                normal: {
					                    color: '#0000ff'
					                }
					              },
				                  data:this.pm2_5_m[2]
				              },
				              {
				                  name:'96小时预测',
				                  type:'line',
				                  symbolSize:5,
				                  itemStyle: {                
					                normal: {
					                    color: '#ffff00'
					                }
					              },
				                  data:this.pm2_5_m[3]
				              }
				              
				          ]
				}); 
			option.push({
			    tooltip : {
			    	textStyle : {
			    		fontSize : 24,
			    	},
			        trigger: 'axis',
			        formatter: function (params) {
			            var res = ''; 
				            res+=''+$.datepicker.formatDate('mm月dd日',new Date(params[0][1]+data.startTimePoint)); 
			            for (var i = 0; i < params.length; i++) {
			            	if (params[i][0]=='实测') {
			   					res+='<br/>'+params[i][0]+'：'+params[i][2][1];
			   				}else{
			   					res+='<br/>'+params[i][0]+'：'+params[i][2];
			   				}
			            };
			            return res;
			        }
			    },
			    title : {
			    	textStyle:{
			    		fontSize : 24,
			    		fontWeight : 'bolder',
			    	},
			        text: '细颗粒物（PM2.5）',
			        x:'left',
			        
			    },
			    toolbox: {
			        show : true,
			        itemSize : 24,
			        feature : {
			            // mark : {show: true},
			            // dataZoom : {show: true},
			            // dataView : {show: true},
			            magicType : {show: true, type: ['line', 'bar']},
			            restore : {show: true},
			            saveAsImage : {show: true}
			        }
			    },
			    // dataZoom : {
			    //     y: 250,
			    //     show : true,
			    //     realtime: true,
			    //     start : 0,
			    //     end : _zoomEnd
			    // },
			    grid: {
			        x: 100,
			        y:150,
			        x2:30,
			        y2:30
			    },
			    legend: {
			    	textStyle : {
			    		fontSize : 24,
			    	},
			    	data:['实测','24小时预测','48小时预测','72小时预测'],
			    	y:80
			    },
			    calculable : true,
			    xAxis : [
			        {
			            type : 'category',
			            // scale:true,
			            data : this.date,
			            axisTick:{
			            	interval:0
			          	},
			            axisLabel : {
			                formatter: function (v){ 
					            	return $.datepicker.formatDate('mm月dd日',new Date(v+data.startTimePoint)); 
					        },
			          	textStyle : {
				    		fontSize : 20,
				    	},
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
			                formatter: '{value}μg/m3',
			                textStyle : {
					    		fontSize : 20,
					    	},
			            },
			            splitArea : {
			            	show : true,
			            	areaStyle:{color:'rgba(0,0,0,0)'}
			            }
			        }
			    ],
			    series : [
			    			{
			                  name:'实测',
			                  type:'scatter',
			                  symbol:'diamond',
			                  symbolSize:10,
			                  itemStyle:{
					                normal:{
					                    color:'#000000'
					                }
					            },
			                  data:this.r_pm2_5
			              },{
			                  name:'24小时预测',
			                  type:'line',
			                  symbolSize:1,
			                  itemStyle: {                
				                normal: {
				                    color: '#ff0000'
				                }
				              },
			                  data:this.pm2_5[0]
			              },
			              {
			                  name:'48小时预测',
			                  type:'line',
			                  symbolSize:1,
			                  itemStyle: {                
				                normal: {
				                    color: '#00ff00'
				                }
				              },
			                  data:this.pm2_5[1]
			              },
			              {
			                  name:'72小时预测',
			                  type:'line',
			                  symbolSize:1,
			                  itemStyle: {                
				                normal: {
				                    color: '#0000ff'
				                }
				              },
			                  data:this.pm2_5[2]
			              }
			          ]
			});


//			this.option.push({
//			    tooltip : {
//			        trigger: 'axis',
//			        formatter: function (params) {
//			            var res = '';
//				            res+=''+$.datepicker.formatDate('mm月dd日',new Date(params[0][1]+data.startTimePoint));
//			            for (var i = 0; i < params.length; i++) {
//			            	if (params[i][0]=='实测') {
//			   					res+='<br/>'+params[i][0]+'：'+params[i][2][1];
//			   				}else{
//			   					res+='<br/>'+params[i][0]+'：'+params[i][2];
//			   				}
//			            };
//			            return res;
//			        }
//			    },
//			    title : {
//			        text: '臭氧（O3）',
//			        x:'left',
//			        // y:0
//			    },
//			    toolbox: {
//			        show : true,
//			        feature : {
//			            // mark : {show: true},
//			            // dataZoom : {show: true},
//			            // dataView : {show: true},
//			            magicType : {show: true, type: ['line', 'bar']},
//			            restore : {show: true},
//			            saveAsImage : {show: true}
//			        }
//			    },
//			    // dataZoom : {
//			    //     y: 250,
//			    //     show : true,
//			    //     realtime: true,
//			    //     start : 0,
//			    //     end : _zoomEnd
//			    // },
//			    grid: {
//			        x: 60,
//			        y:40,
//			        x2:30,
//			        y2:30
//			    },
//			    legend: {
//			    	data:['实测','24小时预测','48小时预测','72小时预测'],
//			    	y:20
//			    },
//			    calculable : true,
//			    xAxis : [
//			        {
//			            type : 'category',
//			            // scale:true,
//			            data : this.date,
//			            axisTick:{
//			            	interval:0
//			          	},
//			            axisLabel : {
//			                formatter: function (v){
//					            	return $.datepicker.formatDate('mm月dd日',new Date(v+data.startTimePoint));
//			                	
//					        }
//			            }
//			        }
//			    ],
//			    yAxis : [
//			        {
//			            type : 'value',
//			            min:0,
//			            boundaryGap:[0,0.1],
//			            scale:true,
//			            axisLabel : {
//			                formatter: '{value}μg/m3'
//			            },
//			            splitArea : {
//			            	show : true,
//			            	areaStyle:{color:'rgba(0,0,0,0)'}
//			            }
//			        }
//			    ],
//			    series : [
//			    			{
//			                  name:'实测',
//			                  type:'scatter',
//			                  symbol:'diamond',
//			                  symbolSize:5,
//			                  itemStyle:{
//					                normal:{
//					                    color:'#000000'
//					                }
//					            },
//			                  data:this.r_o3
//			              },{
//			                  name:'24小时预测',
//			                  type:'line',
//			                  symbolSize:1,
//			                  itemStyle: {                
//				                normal: {
//				                    color: '#ff0000'
//				                }
//				              },
//			                  data:this.o3[0]
//			              },
//			              {
//			                  name:'48小时预测',
//			                  type:'line',
//			                  symbolSize:1,
//			                  itemStyle: {                
//				                normal: {
//				                    color: '#00ff00'
//				                }
//				              },
//			                  data:this.o3[1]
//			              },
//			              {
//			                  name:'72小时预测',
//			                  type:'line',
//			                  symbolSize:1,
//			                  itemStyle: {                
//				                normal: {
//				                    color: '#0000ff'
//				                }
//				              },
//			                  data:this.o3[2]
//			              }
//			          ]
//			}); 


			
				option.push({
			    tooltip : {
			    	textStyle : {
			    		fontSize : 24,
			    	},
			        trigger: 'axis',
			        formatter: function (params) {
			            var res = ''; 
				            res+=''+$.datepicker.formatDate('mm月dd日',new Date(params[0][1]+data.startTimePoint)); 
			            for (var i = 0; i < params.length; i++) {
			            	if (params[i][0]=='实测') {
			   					res+='<br/>'+params[i][0]+'：'+params[i][2][1];
			   				}else{
			   					res+='<br/>'+params[i][0]+'：'+params[i][2];
			   				}
			            };
			            return res;
			        }
			    },
			    title : {
			    	textStyle:{
			    		fontSize : 24,
			    		fontWeight : 'bolder',
			    	},
			        text: '空气质量指数（AQI）',
			        x:'left',
			        // y:0
			    },
			    toolbox: {
			        show : true,
			        itemSize : 24,
			        feature : {
			            // mark : {show: true},
			            // dataZoom : {show: true},
			            // dataView : {show: true},
			            magicType : {show: true, type: ['line', 'bar']},
			            restore : {show: true},
			            saveAsImage : {show: true}
			        }
			    },
			    // dataZoom : {
			    //     y: 250,
			    //     show : true,
			    //     realtime: true,
			    //     start : 0,
			    //     end : _zoomEnd
			    // },
			    grid: {
			        x: 80,
			        y:150,
			        x2:30,
			        y2:30
			    },
			    legend: {
			    	textStyle : {
			    		fontSize : 24,
			    	},
			    	data:['实测','24小时预测','48小时预测','72小时预测'],
			    	y:80
			    },
			    calculable : true,
			    xAxis : [
			        {
			            type : 'category',
			            // scale:true,
			            data : this.date,
			            axisTick:{
			            	interval:0
			          	},
			            axisLabel : {
			                formatter: function (v){ 
					            	return $.datepicker.formatDate('mm月dd日',new Date(v+data.startTimePoint)); 
					        },
					        textStyle : {
					    		fontSize : 20,
					    	},
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
			                formatter: '{value}',
			                textStyle : {
					    		fontSize : 20,
					    	},
			            },
			            splitArea : {
			            	show : true,
			            	areaStyle:{color:'rgba(0,0,0,0)'}
			            }
			        }
			    ],
			    series : [
			    			{
			                  name:'实测',
			                  type:'scatter',
			                  symbol:'diamond',
			                  symbolSize:10,
			                  itemStyle:{
					                normal:{
					                    color:'#000000'
					                }
					            },
			                  data:this.r_aqi
			              },{
			                  name:'24小时预测',
			                  type:'line',
			                  symbolSize:5,
			                  itemStyle: {                
				                normal: {
				                    color: '#ff0000'
				                }
				              },
			                  data:this.aqi[0]
			              },
			              {
			                  name:'48小时预测',
			                  type:'line',
			                  symbolSize:5,
			                  itemStyle: {                
				                normal: {
				                    color: '#00ff00'
				                }
				              },
			                  data:this.aqi[1]
			              },
			              {
			                  name:'72小时预测',
			                  type:'line',
			                  symbolSize:5,
			                  itemStyle: {                
				                normal: {
				                    color: '#0000ff'
				                }
				              },
			                  data:this.aqi[2]
			              }
			          ]
			});

			

			//optionpp
//				this.option.push({
//			    tooltip : {
//			        trigger: 'axis',
//			        formatter: function (params) {
//			        	var res = '';
//			        	var index; 
//				            res+=''+$.datepicker.formatDate('mm月dd日',new Date(params[0][1]+data.startTimePoint));
//				            index=params[0][1]/24/3600/1000; 
//			        	res+='<br/>实测：'+data.r_pp[index];
//				        res+='<br/>预测：'+data.pp[forecastPersonal.drawChart.foreIndex][index];
//			            return res;
//			        }
//			    },
//			    title : {
//			        text: '首要污染物',
//			        x:'left',
//			        // y:0
//			    },
//			    toolbox: {
//			        show : true,
//			        feature : {
//			            // mark : {show: true},
//			            // dataZoom : {show: true},
//			            // dataView : {show: true},
//			            magicType : {show: true, type: ['line', 'bar']},
//			            restore : {show: true},
//			            saveAsImage : {show: true}
//			        }
//			    },
//			    // dataZoom : {
//			    //     y: 250,
//			    //     show : true,
//			    //     realtime: true,
//			    //     start : 0,
//			    //     end : _zoomEnd
//			    // },
//			    grid: {
//			        x: 60,
//			        y:40,
//			        x2:30,
//			        y2:30
//			    },
//			    legend: {
//			    	data:['细颗粒物(PM2.5)','臭氧8小时','二氧化硫','二氧化氮','一氧化碳','颗粒物(PM10)','无']
//			    },
//			    calculable : true,
//			    xAxis : [
//			        {
//			            type : 'category',
//			            // scale:true,
//			            data : this.date,
//			            axisTick:{
//			            	interval:0
//			          	},
//			            axisLabel : {
//			                formatter: function (v){ 
//					            	return $.datepicker.formatDate('mm月dd日',new Date(v+data.startTimePoint)); 
//					        }
//			            }
//			        },{
//			            type : 'category',
//			            data : this.date,
//			            axisLine: {show : false},
//			            axisLabel: {show : false},
//			            splitLine: {show : false},
//			            splitArea : {
//			            	show : true,
//			            	areaStyle:{color:'rgba(0,0,0,0)'}
//			            }
//			        }
//			    ],
//			    yAxis : [
//			        {
//			            type : 'value',
//			            // scale:true,
//			            axisLine: {show : false},
//			            axisLabel: {show : false},
//			            splitLine: {show : false},
//			            splitArea : {
//			            	show : true,
//			            	areaStyle:{color:'rgba(0,0,0,0)'}
//			            }
//			        },{
//			            type : 'value',
//			            // scale:true,
//			            axisLine: {show : false},
//			            axisLabel: {show : false},
//			            splitLine: {show : false},
//			            splitArea : {show : false}
//			        }
//			    ],
//			    series : [
//			              {
//			                  name:'细颗粒物(PM2.5)',
//			                  type:'bar',
//			                  stack:'实测',
//			                  xAxisIndex:1,
//			                  yAxisIndex:1,
//			                  data:this.r_pp[0]
//			              },
//			              {
//			                  name:'臭氧8小时',
//			                  type:'bar',
//			                  stack:'实测',
//			                  xAxisIndex:1,
//			                  yAxisIndex:1,
//			                  data:this.r_pp[1]
//			              },
//			              {
//			                  name:'二氧化硫',
//			                  type:'bar',
//			                  stack:'实测',
//			                  xAxisIndex:1,
//			                  yAxisIndex:1,
//			                  itemStyle: {                
//				                normal: {
//				                    color: '#ffea00'
//				                }
//				            },
//			                  data:this.r_pp[2]
//			              },
//			              {
//			                  name:'二氧化氮',
//			                  type:'bar',
//			                  stack:'实测',
//			                  xAxisIndex:1,
//			                  yAxisIndex:1,
//			                   itemStyle: {                
//				                normal: {
//				                    color: '#3549bd'
//				                }
//				            },
//			                  data:this.r_pp[3]
//			              },
//			              {
//			                  name:'一氧化碳',
//			                  type:'bar',
//			                  stack:'实测',
//			                  xAxisIndex:1,
//			                  yAxisIndex:1,
//			                  data:this.r_pp[4]
//			              },
//			              {
//			                  name:'颗粒物(PM10)',
//			                  type:'bar',
//			                  stack:'实测',
//			                  xAxisIndex:1,
//			                  yAxisIndex:1,
//			                  itemStyle: {                
//				                normal: {
//				                    color: '#c63500'
//				                }
//				            },
//			                  data:this.r_pp[5]
//			              },
//			              {
//			                  name:'无',
//			                  type:'bar',
//			                  stack:'实测',
//			                  xAxisIndex:1,
//			                  yAxisIndex:1,
//			                  itemStyle: {                
//				                normal: {
//				                    color: '#aaa'
//				                }
//				            },
//			                  data:this.r_pp[6]
//			              }
//			          ]
//			});
//
//			
//			//optionquality
//				this.option.push({
//			    tooltip : {
//			        trigger: 'axis',
//			        formatter: function (params) {
//			   			 var res = '';
//			        	var index; 
//				            res+=''+$.datepicker.formatDate('mm月dd日',new Date(params[0][1]+data.startTimePoint));
//				            index=params[0][1]/24/3600/1000; 
//			        	res+='<br/>实测：'+data.r_quality[index];
//				        res+='<br/>预测：'+data.quality[forecastPersonal.drawChart.foreIndex][index];
//			            return res;
//			        }
//			    },
//			    title : {
//			        text: '空气质量等级',
//			        x:'left',
//			        // y:0
//			    },
//			    toolbox: {
//			        show : true,
//			        feature : {
//			            // mark : {show: true},
//			            // dataZoom : {show: true},
//			            // dataView : {show: true},
//			            magicType : {show: true, type: ['line', 'bar']},
//			            restore : {show: true},
//			            saveAsImage : {show: true}
//			        }
//			    },
//			    // dataZoom : {
//			    //     y: 195,
//			    //     show : true,
//			    //     realtime: true,
//			    //     start : 0,
//			    //     end : 100,
//			    //     height:25,
//			    //     dataBackgroundColor:'rgba(50,150,200,0.5)',
//			    //     fillerColor:'rgba(150,222,150,0.4)'
//			    // },
//			    grid: {
//			        x: 60,
//			        y:40,
//			        x2:30,
//			        y2:30
//			    },
//			    legend: {
//			    	data:['优','良','轻度污染','中度污染','重度污染','严重污染']
//			    },
//			    calculable : true,
//			    xAxis : [
//			        {
//			            type : 'category',
//			            // scale:true,
//			            data : this.date,
//			            axisTick:{
//			            	interval:0
//			          	},
//			            axisLabel : {
//			                formatter: function (v){ 
//					            	return $.datepicker.formatDate('mm月dd日',new Date(v+data.startTimePoint)); 
//					        }
//			            }
//			        },{
//			            type : 'category',
//			            data : this.date,
//			            axisLine: {show : false},
//			            axisLabel: {show : false},
//			            splitLine: {show : false},
//			            splitArea : {
//			            	show : true,
//			            	areaStyle:{color:'rgba(0,0,0,0)'}
//			            }
//			        }
//			    ],
//			    yAxis : [
//			        {
//			            type : 'value',
//			            // scale:true,
//			            axisLine: {show : false},
//			            axisLabel: {show : false},
//			            splitLine: {show : false},
//			            splitArea : {
//			            	show : true,
//			            	areaStyle:{color:'rgba(0,0,0,0)'}
//			            }
//			        },{
//			            type : 'value',
//			            // scale:true,
//			            axisLine: {show : false},
//			            axisLabel: {show : false},
//			            splitLine: {show : false},
//			            splitArea : {show : false}
//			        }
//			    ],
//			    series : [
//			              {
//			                  name:qualityNames[0],
//			                  type:'bar',
//			                  stack:'实测',
//			                  xAxisIndex:1,
//			                  yAxisIndex:1,
//			                  itemStyle: {                
//				                normal: {
//				                    color: 'rgba(0,228,0,1)'
//				                }
//				            },
//			                  data:this.r_quality[0]
//			              },
//			              {
//			                  name:qualityNames[1],
//			                  type:'bar',
//			                  stack:'实测',
//			                  xAxisIndex:1,
//			                  yAxisIndex:1,
//			                  itemStyle: {               
//				                normal: {
//				                    color: 'rgba(255,255,0,1)'
//				                }
//				            },
//			                  data:this.r_quality[1]
//			              },
//			              {
//			                  name:qualityNames[2],
//			                  type:'bar',
//			                  stack:'实测',
//			                  xAxisIndex:1,
//			                  yAxisIndex:1,
//			                  itemStyle: {                
//				                normal: {
//				                    color: 'rgba(255,126,0,1)'
//				                }
//				            },
//			                  data:this.r_quality[2]
//			              },
//			              {
//			                  name:qualityNames[3],
//			                  type:'bar',
//			                  stack:'实测',
//			                  xAxisIndex:1,
//			                  yAxisIndex:1,
//			                  itemStyle: {                
//				                normal: {
//				                    color: 'rgba(255,0,0,1)'
//				                }
//				            },
//			                  data:this.r_quality[3]
//			              },
//			              {
//			                  name:qualityNames[4],
//			                  type:'bar',
//			                  stack:'实测',
//			                  xAxisIndex:1,
//			                  yAxisIndex:1,
//			                  itemStyle: {                
//				                normal: {
//				                    color: 'rgba(153,0,76,1)'
//				                }
//				            },
//			                  data:this.r_quality[4]
//			              },
//			              {
//			                  name:qualityNames[5],
//			                  type:'bar',
//			                  stack:'实测',
//			                  xAxisIndex:1,
//			                  yAxisIndex:1,
//			                  itemStyle: {                
//				                normal: {
//				                    color: 'rgba(126,0,35,1)'
//				                }
//				            },
//			                  data:this.r_quality[5]
//			              }
//			          ]
//			});



	






				
				//drawInterval=setInterval("forecastPersonal.drawChart.drawChart1()",1000);
				
					myChart.clear();
					myChart.setOption(option[0]);
					
					
					//$("#Gra"+i).append(image[i].outerHTML);
					//myChart[i].dispose();


			$("input[name='foreTime']:checked").click();
		},
//		draw:function(){
//			 for (var j = 0; j <  7; j++) {
//								 this.option[3].series[j+7]={
//								                  name:ppNames[j],
//								                  type:'bar',
//								                  stack:'预测',
//								                  data:this.pp[this.foreIndex][j]
//								};
//							};
//
//							for (var j = 0; j <  6; j++) {
//								 this.option[4].series[j+6]={
//								                  name:qualityNames[j],
//								                  type:'bar',
//								                  stack:'预测',
//								                  data:this.quality[this.foreIndex][j]
//								};
//							};
//
//
//			for (var i = 3; i < 5; i++) {
//								myChart[i].clear();
//								myChart[i].setOption(this.option[i]);
//			};
//		}
		
	},
	
	queryChart:function(){
		var code = $("input[name='choosed']").val();
		var requestData={'cityCode':code,'cityType':cityType,'userName':userName,}; 
			var startDate = $("#startDatepicker"+0).datepicker("getDate");
			var endDate = $("#endDatepicker"+0).datepicker("getDate");
			if (startDate!=null) {
				requestData.startTimePoint=startDate.getTime();
			}
			if (endDate!=null) {
				requestData.endTimePoint=endDate.getTime();
			}

			var url="/smartadmin/mobileforecast/getPersonalChart";

			$.ajax({
			type: "GET",
			url: url,
			data: requestData,
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

				$.smallBox({
										title: "请求超时，请稍后重试！",
										content: "<i class='fa fa-clock-o'></i> <i>系统提示...</i>",
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
					if (!data.data.state) {
						$.smallBox({
										title: data.data.message,
										content: "<i class='fa fa-clock-o'></i> <i>系统提示...</i>",
										color: "#296191",
										iconSmall: "fa  fa-check-circle bounce animated",
										timeout: 5000
									});
					}else{

						forecastPersonal.drawChart.init(data.data.data);

					}
				}else{
					timeoutAlert();
				}
			}});
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
		
		// data=(HighAQI-LowAQI)*(data-Low)/(High-Low)+LowAQI;
		data=(data-LowAQI)*(High-Low)/(HighAQI-LowAQI)+Low;
		return Math.round(data);
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
			}
		}
		data=(HighAQI-LowAQI)*(data-Low)/(High-Low)+LowAQI;
		return Math.ceil(data);
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
	fillRangeTable:function(){
		for (var i = 0; i < 8; i++) {
 
			$("#otherTablePanle2").find("table").children("tbody").children("tr").eq(i).children("td").eq(3).text( range.pm2_5[i]==""?"/":("±"+range.pm2_5[i]));
			$("#otherTablePanle2").find("table").children("tbody").children("tr").eq(i).children("td").eq(5).text( range.o3[i]==""?"/":("±"+range.o3[i]));
			$("#otherTablePanle2").find("table").children("tbody").children("tr").eq(i).children("td").eq(6).text( range.other[i]==""?"/":("±"+range.other[i]));
			 
		};
		
	}
	, 
	formateRealTime:function(timePoint){
		var realTImeDate = new Date(timePoint);
		var day = realTImeDate.getDate() < 10 ? "0" + realTImeDate.getDate()
			: realTImeDate.getDate();
		var hour = realTImeDate.getHours() < 10 ? "0" + realTImeDate.getHours()
			: realTImeDate.getHours();
			return day+'日'+hour+'时';
	}
	,
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
			if (forecastPersonal.drawCustom.first==true) {
				forecastPersonal.timeTypeChoose_custom();
				forecastPersonal.drawCustom.first=false;
			};
	},
		showgraph2:function(event){
		var btn=$(event.target);
			var count=btn.parent().attr("value");
			count++;
			if(count % 2 == 0){
				$("#graphshow2").stop().animate({"left":"100%"},{duration:500 });
				btn.parent().attr("value",0);
				$("#searchArrow2").attr("class","fa fa-angle-double-left fa-fb");
			}else{
				$("#graphshow2").stop().animate({"left":"31%"},{duration:500 });
				btn.parent().attr("value",1);
				$("#searchArrow2").attr("class","fa fa-angle-double-right fa-fb");
			}
			
	},
	pollutantShow:function(){
		var count=$(".btn-group").attr("data-value");
		count++;
		if(count % 2 == 0){
			$(".btn-group").stop().animate({"left":"0%"},{duration:500 });
			$(".btn-group").attr("data-value",0);
		}else{
			$(".btn-group").stop().animate({"left":"100%"},{duration:500 });
			$(".btn-group").attr("data-value",1);
		}
	},
	drawCustom:{
		first:true,
		date:null,
		stations:null,
		station_index:0,
		timeType:1,
		timeType_date:[[],[]],
		foreIndex:0,
		option:null,

		curItem:null,
		curItemValue:null,

		itemNames:null,
		itemNamesValue:null,
		itemData:null,
		itemDataToolTip:null,

		startTimePoint:null,
		loadPre:function(){ 
			this.first=true,
			this.foreIndex=0; 
			this.station_index=0;
			this.timeType=1;
			this.timeType_date=[[],[]];
		},
		load:function(){
			
			// this.station_index=0;
			// this.timeType=1;
			this.timeType_date=[[],[]]; 

			this.curItem=null;this.curItemValue=null;
			this.itemNames=[[],[]];this.itemNamesValue=[[],[]];
			this.itemData=[[],[]];
			this.itemDataToolTip=[[],[]];

			this.option={
			    tooltip : {
			        trigger: 'axis',
			        formatter: function (params) {  
			            var res = '';
			            var index;
			            if (forecastPersonal.drawCustom.timeType==0) {
			                res+=''+forecastPersonal.formateRealTime(params[0][1]+forecastPersonal.drawCustom.startTimePoint+3600000);
			                index=params[0][1]/3600/1000;
			            }else{
				            res+=''+$.datepicker.formatDate('mm月dd日',new Date(params[0][1]+forecastPersonal.drawCustom.startTimePoint));
				            index=params[0][1]/24/3600/1000;
			        	} 
			            for (var i = 0; i < params.length; i++) {  
			   					for (var j = 0; j < forecastPersonal.drawCustom.itemNamesValue[forecastPersonal.drawCustom.timeType].length; j++) {
			   						 if (params[i][0]==forecastPersonal.drawCustom.itemNamesValue[forecastPersonal.drawCustom.timeType][j]) {
			   						 	res+='<br/>'+params[i][0]+'：'+forecastPersonal.drawCustom.itemDataToolTip[forecastPersonal.drawCustom.timeType][j][forecastPersonal.drawCustom.foreIndex][index]; 
			   						 	break;
			   						 };
			   					};
			            };
			            return res;
			        }
			    },
			    title : {
			        // text: '一氧化碳（CO）',
			        // x:'left',
			        // y:0
			    },
			    toolbox: {
			        show : true,
			        itemSize : 24,
			        feature : {
			            // mark : {show: true},
			            // dataZoom : {show: true},
			            // dataView : {show: true},
			            magicType : {show: true, type: ['line', 'bar']},
			            restore : {show: true},
			            saveAsImage : {show: true}
			        }
			    },
			    grid: {
			        x: 30,
			        y:40,
			        x2:30,
			        y2:30
			    },
			    legend: {
			    	data:[],
			    	y:20
			    },
			    calculable : true,
			    xAxis : [
			        {
			            type : 'category',
			            // scale:true,
			            data : [],
			            axisTick:{
			            	interval:0
			          	},
			            axisLabel : {
			                formatter: function (v){
			                	if (forecastPersonal.drawCustom.timeType==0) {
			                		return forecastPersonal.formateRealTime(v+forecastPersonal.drawCustom.startTimePoint+3600000);
			                	}else{
					            	return $.datepicker.formatDate('mm月dd日',new Date(v+forecastPersonal.drawCustom.startTimePoint));
			                	}
					        }
			            }
			        }
			    ],
			    yAxis : [
			        {
			            type : 'value',
			            // scale:true,
			            axisLine: {show : false},
			            axisLabel: {show : false},
			            splitLine: {show : false},
			            splitArea : {show : false}
			        }
			    ],
			    series : [
			          ]
			};
		},
		init:function(data){
			// console.log(data);
			this.startTimePoint=data.startTimePoint;
			var sDate=$.datepicker.formatDate("yy年mm月dd日",new Date(data.startTimePoint));
			var eDate=$.datepicker.formatDate("yy年mm月dd日",new Date(data.endTimePoint));
			$('#startDatepicker1').val(sDate);
			$('#endDatepicker1').val(eDate);
			$('#endDatepicker1').datepicker('option','minDate',sDate);
 
			this.date=[];
			this.stations=data.stations;
			this.timeType_date[this.timeType][0]=sDate;this.timeType_date[this.timeType][1]=eDate; 
 
						$("#custom_Station div").empty();
									$("#custom_Station div").append('<label class="" style="margin-right: 15px;float:left;line-height: 25px;">站&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;点：</label>');

									for (var i = 0; i < data.stations.length; i++) {
										$("#custom_Station div").append('<label class="radio state-success" style="margin-right: 8px;background-color: rgba(255, 255, 255, 0) !important;color: black;"><input type="radio" name="custom_StationOption" value="'+data.stations[i]+'"><i></i>'+data.stations[i]+'</label>');
									};
									$("#custom_Station input:eq("+this.station_index+")").attr("checked","");

									$("input[name='custom_StationOption']").click(function(event){
										forecastPersonal.stationChoose_custom($(event.target));
									});
			
			if (this.timeType==0) {
				for (var i = 0; i < data.days*24; i++) {
					this.date[i]=3600*1000*i;
				}
			}else{
				for (var i = 0; i < data.days; i++) {
					this.date[i]=24*3600*1000*i;
				}
			}
 		

			if (data.item!=null) {
				this.itemNames[this.timeType].push(this.curItem);this.itemNamesValue[this.timeType].push(this.curItemValue); 
				if (!(this.curItem=="Wind")) { 
							var tempArr=[[],[],[],[],[]];
							var tempArrToolTip=[[],[],[],[],[]];
							for (var i = 0; i < data.item[0].length; i++) {
								for (var j = 0; j < 5; j++) { 
										if (this.curItemValue=="压强") {
											if (data.item[j][i]!='-') {
												tempArr[j].push((parseFloat(data.item[j][i])-950)*4);
											}else{
												tempArr[j].push(data.item[j][i]);
											}
											tempArrToolTip[j].push(data.item[j][i]+'hPa');
										}else if (this.curItemValue=="云量") {
											if (data.item[j][i]!='-') {
												tempArr[j].push((parseFloat(data.item[j][i]))*100);
											}else{
												tempArr[j].push(data.item[j][i]);
											}
											tempArrToolTip[j].push(data.item[j][i]+'');
										}else if (this.curItemValue=="边界层高度（最大值）"||this.curItemValue=="边界层高度") {
											if (data.item[j][i]!='-') {
												tempArr[j].push((parseFloat(data.item[j][i]))/18);
											}else{
												tempArr[j].push(data.item[j][i]);
											}
											tempArrToolTip[j].push(data.item[j][i]+'M');
										}else if (this.curItemValue=="最高温度"||this.curItemValue=="最低温度"||this.curItemValue=="温度") {
											if (data.item[j][i]!='-') {
												tempArr[j].push((parseFloat(data.item[j][i]))*3);
											}else{
												tempArr[j].push(data.item[j][i]);
											}
											tempArrToolTip[j].push(data.item[j][i]+'℃');
										}else if (this.curItemValue=="相对湿度") {
											if (data.item[j][i]!='-') {
												tempArr[j].push(data.item[j][i]);
											}else{
												tempArr[j].push(data.item[j][i]);
											}
											tempArrToolTip[j].push(data.item[j][i]+'%');
										}else if (this.curItemValue=="降雨量") {
											if (data.item[j][i]!='-') {
												tempArr[j].push(data.item[j][i]);
											}else{
												tempArr[j].push(data.item[j][i]);
											}
											tempArrToolTip[j].push(data.item[j][i]+'mm');
										}else if (this.curItemValue=="CO(预)"||this.curItemValue=="CO(实)") {
											if (data.item[j][i]!='-') {
												tempArr[j].push((parseFloat(data.item[j][i]))*30);
											}else{
												tempArr[j].push(data.item[j][i]);
											}
											tempArrToolTip[j].push(data.item[j][i]+'㎎/m3');
										}else if (this.curItemValue=="NO2(预)"||this.curItemValue=="NO2(实)") {
											if (data.item[j][i]!='-') {
												tempArr[j].push((parseFloat(data.item[j][i]))/1.7);
											}else{
												tempArr[j].push(data.item[j][i]);
											}
											tempArrToolTip[j].push(data.item[j][i]+'μg/m3');
										}else if (this.curItemValue=="O3(预)"||this.curItemValue=="O3(实)") {
											if (data.item[j][i]!='-') {
												tempArr[j].push(data.item[j][i]);
											}else{
												tempArr[j].push(data.item[j][i]);
											}
											tempArrToolTip[j].push(data.item[j][i]+'μg/m3');
										}else if (this.curItemValue=="SO2(预)"||this.curItemValue=="SO2(实)") {
											if (data.item[j][i]!='-') {
												tempArr[j].push((parseFloat(data.item[j][i]))/1.4);
											}else{
												tempArr[j].push(data.item[j][i]);
											}
											tempArrToolTip[j].push(data.item[j][i]+'μg/m3');
										}else if (this.curItemValue=="PM10(预)"||this.curItemValue=="PM10(实)") {
											if (data.item[j][i]!='-') {
												tempArr[j].push((parseFloat(data.item[j][i]))/1.4);
											}else{
												tempArr[j].push(data.item[j][i]);
											}
											tempArrToolTip[j].push(data.item[j][i]+'μg/m3');
										}else if (this.curItemValue=="PM2.5(预)"||this.curItemValue=="PM2.5(实)") {
											if (data.item[j][i]!='-') {
												tempArr[j].push((parseFloat(data.item[j][i]))/1.8);
											}else{
												tempArr[j].push(data.item[j][i]);
											}
											tempArrToolTip[j].push(data.item[j][i]+'μg/m3');
										}else if (this.curItemValue=="AQI(预)"||this.curItemValue=="AQI(实)") {
											if (data.item[j][i]!='-') {
												tempArr[j].push((parseFloat(data.item[j][i]))/2);
											}else{
												tempArr[j].push(data.item[j][i]);
											}
											tempArrToolTip[j].push(data.item[j][i]+'');
										}else if (this.curItemValue=="HNO3") {
											if (data.item[j][i]!='-') {
												tempArr[j].push((parseFloat(data.item[j][i]))*16);
											}else{
												tempArr[j].push(data.item[j][i]);
											}
											tempArrToolTip[j].push(data.item[j][i]+'μg/m3');
										}else if (this.curItemValue=="NH3") {
											if (data.item[j][i]!='-') {
												tempArr[j].push((parseFloat(data.item[j][i]))*2.5);
											}else{
												tempArr[j].push(data.item[j][i]);
											}
											tempArrToolTip[j].push(data.item[j][i]+'μg/m3');
										}else if (this.curItemValue=="NOX") {
											if (data.item[j][i]!='-') {
												tempArr[j].push((parseFloat(data.item[j][i]))/2.3);
											}else{
												tempArr[j].push(data.item[j][i]);
											}
											tempArrToolTip[j].push(data.item[j][i]+'μg/m3');
										}else if (this.curItemValue=="EC") {
											if (data.item[j][i]!='-') {
												tempArr[j].push((parseFloat(data.item[j][i]))*5);
											}else{
												tempArr[j].push(data.item[j][i]);
											}
											tempArrToolTip[j].push(data.item[j][i]+'μg/m3');
										}else if (this.curItemValue=="OC") {
											if (data.item[j][i]!='-') {
												tempArr[j].push((parseFloat(data.item[j][i]))*4);
											}else{
												tempArr[j].push(data.item[j][i]);
											}
											tempArrToolTip[j].push(data.item[j][i]+'μg/m3');
										}else if (this.curItemValue=="OM") {
											if (data.item[j][i]!='-') {
												tempArr[j].push((parseFloat(data.item[j][i]))*3.5);
											}else{
												tempArr[j].push(data.item[j][i]);
											}
											tempArrToolTip[j].push(data.item[j][i]+'μg/m3');
										}else if (this.curItemValue=="SO4") {
											if (data.item[j][i]!='-') {
												tempArr[j].push((parseFloat(data.item[j][i]))*2.5);
											}else{
												tempArr[j].push(data.item[j][i]);
											}
											tempArrToolTip[j].push(data.item[j][i]+'μg/m3');
										}else if (this.curItemValue=="NO3") {
											if (data.item[j][i]!='-') {
												tempArr[j].push((parseFloat(data.item[j][i]))*3);
											}else{
												tempArr[j].push(data.item[j][i]);
											}
											tempArrToolTip[j].push(data.item[j][i]+'μg/m3');
										}else if (this.curItemValue=="NH4") {
											if (data.item[j][i]!='-') {
												tempArr[j].push((parseFloat(data.item[j][i]))*9);
											}else{
												tempArr[j].push(data.item[j][i]);
											}
											tempArrToolTip[j].push(data.item[j][i]+'μg/m3');
										}else if (this.curItemValue=="Soil") {
											if (data.item[j][i]!='-') {
												tempArr[j].push((parseFloat(data.item[j][i]))*2);
											}else{
												tempArr[j].push(data.item[j][i]);
											}
											tempArrToolTip[j].push(data.item[j][i]+'μg/m3');
										}
									
								};
							}
							this.itemData[this.timeType].push(tempArr);
							this.itemDataToolTip[this.timeType].push(tempArrToolTip); 
				}else{ 
					var WindSpeed=[[],[],[],[],[]];
					var WindSpeedToolTip=[[],[],[],[],[]];
					for (var i = 0; i < data.item[0].length; i++) {
						for (var j = 0; j < 5; j++) {
							var temp=data.item[j][i]=='-'?'-':parseFloat(data.item[j][i])*10;
							if (data.item1[j][i]=="N") {
								WindSpeed[j].push({value:temp,symbolRotate: -0});
							}else if (data.item1[j][i]=="S") {
								WindSpeed[j].push({value:temp,symbolRotate: -180});
							}else if (data.item1[j][i]=="E") {
								WindSpeed[j].push({value:temp,symbolRotate: -90});
							}else if (data.item1[j][i]=="W") {
								WindSpeed[j].push({value:temp,symbolRotate: -270});
							}else if (data.item1[j][i]=="NE") {
								WindSpeed[j].push({value:temp,symbolRotate: -45});
							}else if (data.item1[j][i]=="NNE") {
								WindSpeed[j].push({value:temp,symbolRotate: -22.5});
							}else if (data.item1[j][i]=="ENE") {
								WindSpeed[j].push({value:temp,symbolRotate: -67.5});
							}else if (data.item1[j][i]=="SE") {
								WindSpeed[j].push({value:temp,symbolRotate: -135});
							}else if (data.item1[j][i]=="ESE") {
								WindSpeed[j].push({value:temp,symbolRotate: -112.5});
							}else if (data.item1[j][i]=="SSE") {
								WindSpeed[j].push({value:temp,symbolRotate: -157.5});
							}else if (data.item1[j][i]=="SW") {
								WindSpeed[j].push({value:temp,symbolRotate: -225});
							}else if (data.item1[j][i]=="SSW") {
								WindSpeed[j].push({value:temp,symbolRotate: -202.5});
							}else if (data.item1[j][i]=="WSW") {
								WindSpeed[j].push({value:temp,symbolRotate: -247.5});
							}else if (data.item1[j][i]=="NW") {
								WindSpeed[j].push({value:temp,symbolRotate: -315});
							}else if (data.item1[j][i]=="WNW") {
								WindSpeed[j].push({value:temp,symbolRotate: -292.5});
							}else if (data.item1[j][i]=="NNW") {
								WindSpeed[j].push({value:temp,symbolRotate: -337.5});
							}else{
								WindSpeed[j].push({value:temp,symbol: 'circle'});
							}
							WindSpeedToolTip[j].push(data.item[j][i]+'（'+data.item1[j][i]+'）');
						}
					}
					this.itemData[this.timeType].push(WindSpeed);
					this.itemDataToolTip[this.timeType].push(WindSpeedToolTip);
				}

				forecastPersonal.drawCustom.draw();
			}else{
				myChartCustom.clear();
			}

		},
		draw:function(){
			this.option.legend.data=[];
			this.option.series=[];
			this.option.xAxis[0].data=this.date;
			$("input[name='custom_itemCheck']:checked").each(function(key,value){
				for (var i = 0; i < forecastPersonal.drawCustom.itemNames[forecastPersonal.drawCustom.timeType].length; i++) {
					if (forecastPersonal.drawCustom.itemNames[forecastPersonal.drawCustom.timeType][i]==$(value).val()) {
						forecastPersonal.drawCustom.option.legend.data.push(forecastPersonal.drawCustom.itemNamesValue[forecastPersonal.drawCustom.timeType][i]);
						var series={
			                  name:forecastPersonal.drawCustom.itemNamesValue[forecastPersonal.drawCustom.timeType][i],
			                  type:'line',
			                  symbolSize:1,
			                  data:forecastPersonal.drawCustom.itemData[forecastPersonal.drawCustom.timeType][i][forecastPersonal.drawCustom.foreIndex]
			              };
			              if (forecastPersonal.drawCustom.itemNames[forecastPersonal.drawCustom.timeType][i]=='Wind') {
			              	series.symbolSize=4;
			              	series.symbol='arrow';
			              };
						forecastPersonal.drawCustom.option.series.push(series);

						break;
					};
				};
			}); 
			myChartCustom.clear();
			myChartCustom.setOption(this.option);
		}
	},
	 stationChoose_custom:function(btn){ 
	 	forecastPersonal.drawCustom.load();
		forecastPersonal.drawCustom.station_index=$("input[name='custom_StationOption']").index(btn);
		$("input[name='custom_itemCheck']:checked").each(function(key,value){
			$(value).prop("checked",false);
		}); 
		forecastPersonal.queryCustom();
	},
	timeTypeChoose_custom:function(btn){
		forecastPersonal.drawCustom.curItem=null;forecastPersonal.drawCustom.curItemValue=null;
		var timeType=$("input[name='custom_timeType']:checked").val();
		forecastPersonal.drawCustom.timeType=timeType;

		if (forecastPersonal.drawCustom.timeType_date[timeType][0]!=null) {
			$("#startDatepicker1").val(forecastPersonal.drawCustom.timeType_date[timeType][0]);
			$("#endDatepicker1").val(forecastPersonal.drawCustom.timeType_date[timeType][1]);
		}else{
			$("#startDatepicker1").val("");
			$("#endDatepicker1").val("");
		}
		$("#custom_item").empty();
		if (timeType==1) {
			$("#custom_item").append('<label style="margin-right: 5px;"><input type="checkbox" class="checkbox style-0" name="custom_itemCheck" chartVal="相对湿度" value="avgRH" onclick="forecastPersonal.custom_itemCheck(event)"><span>相对湿度</span></label>');
			$("#custom_item").append('<label style="margin-right: 5px;"><input type="checkbox" class="checkbox style-0" name="custom_itemCheck" chartVal="降雨量" value="accPrecipitation" onclick="forecastPersonal.custom_itemCheck(event)"><span>降雨量</span></label>');
			$("#custom_item").append('<label style="margin-right: 5px;"><input type="checkbox" class="checkbox style-0" name="custom_itemCheck" chartVal="压强" value="avgPressure" onclick="forecastPersonal.custom_itemCheck(event)"><span>压强</span></label>');
			$("#custom_item").append('<label style="margin-right: 5px;"><input type="checkbox" class="checkbox style-0" name="custom_itemCheck" chartVal="云量" value="avgCloudCover" onclick="forecastPersonal.custom_itemCheck(event)"><span>云量</span></label>');
			$("#custom_item").append('<label style="margin-right: 5px;"><input type="checkbox" class="checkbox style-0" name="custom_itemCheck" chartVal="边界层高度（最大值）" value="maxPBL" onclick="forecastPersonal.custom_itemCheck(event)"><span>边界层高度（最大值）</span></label>');
			$("#custom_item").append('<label style="margin-right: 5px;"><input type="checkbox" class="checkbox style-0" name="custom_itemCheck" chartVal="最高温度" value="highTemperature" onclick="forecastPersonal.custom_itemCheck(event)"><span>最高温度</span></label>');
			$("#custom_item").append('<label style="margin-right: 5px;"><input type="checkbox" class="checkbox style-0" name="custom_itemCheck" chartVal="最低温度" value="lowTemperature" onclick="forecastPersonal.custom_itemCheck(event)"><span>最低温度</span></label>');
			$("#custom_item").append('<label style="margin-right: 5px;"><input type="checkbox" class="checkbox style-0" name="custom_itemCheck" chartVal="风力风向" value="Wind" onclick="forecastPersonal.custom_itemCheck(event)"><span>风力风向</span></label>');

			$("#custom_item").append('<br/>');

			$("#custom_item").append('<label style="margin-right: 5px;"><input type="checkbox" class="checkbox style-0" name="custom_itemCheck" chartVal="CO(预)" value="CO" onclick="forecastPersonal.custom_itemCheck(event)"><span>一氧化碳</span></label>');
			$("#custom_item").append('<label style="margin-right: 5px;"><input type="checkbox" class="checkbox style-0" name="custom_itemCheck" chartVal="NO2(预)" value="NO2" onclick="forecastPersonal.custom_itemCheck(event)"><span>二氧化氮</span></label>');
			$("#custom_item").append('<label style="margin-right: 5px;"><input type="checkbox" class="checkbox style-0" name="custom_itemCheck" chartVal="O3(预)" value="O3_8H" onclick="forecastPersonal.custom_itemCheck(event)"><span>臭氧</span></label>');
			$("#custom_item").append('<label style="margin-right: 5px;"><input type="checkbox" class="checkbox style-0" name="custom_itemCheck" chartVal="SO2(预)" value="SO2" onclick="forecastPersonal.custom_itemCheck(event)"><span>二氧化硫</span></label>');
			$("#custom_item").append('<label style="margin-right: 5px;"><input type="checkbox" class="checkbox style-0" name="custom_itemCheck" chartVal="PM10(预)" value="PM10" onclick="forecastPersonal.custom_itemCheck(event)"><span>颗粒物（PM10）</span></label>');
			$("#custom_item").append('<label style="margin-right: 5px;"><input type="checkbox" class="checkbox style-0" name="custom_itemCheck" chartVal="PM2.5(预)" value="PM2_5" onclick="forecastPersonal.custom_itemCheck(event)"><span>细颗粒物（PM2.5）</span></label>');
			$("#custom_item").append('<label style="margin-right: 5px;"><input type="checkbox" class="checkbox style-0" name="custom_itemCheck" chartVal="AQI(预)" value="AQI" onclick="forecastPersonal.custom_itemCheck(event)"><span>AQI</span></label>');
		}else{
			$("#custom_item").append('<label style="margin-right: 5px;"><input type="checkbox" class="checkbox style-0" name="custom_itemCheck" chartVal="相对湿度" value="RH" onclick="forecastPersonal.custom_itemCheck(event)"><span>相对湿度</span></label>');
			$("#custom_item").append('<label style="margin-right: 5px;"><input type="checkbox" class="checkbox style-0" name="custom_itemCheck" chartVal="降雨量" value="Precipitation" onclick="forecastPersonal.custom_itemCheck(event)"><span>降雨量</span></label>');
			$("#custom_item").append('<label style="margin-right: 5px;"><input type="checkbox" class="checkbox style-0" name="custom_itemCheck" chartVal="压强" value="Pressure" onclick="forecastPersonal.custom_itemCheck(event)"><span>压强</span></label>');
			$("#custom_item").append('<label style="margin-right: 5px;"><input type="checkbox" class="checkbox style-0" name="custom_itemCheck" chartVal="云量" value="CloudCover" onclick="forecastPersonal.custom_itemCheck(event)"><span>云量</span></label>');
			$("#custom_item").append('<label style="margin-right: 5px;"><input type="checkbox" class="checkbox style-0" name="custom_itemCheck" chartVal="边界层高度" value="PBL" onclick="forecastPersonal.custom_itemCheck(event)"><span>边界层高度</span></label>');
			$("#custom_item").append('<label style="margin-right: 5px;"><input type="checkbox" class="checkbox style-0" name="custom_itemCheck" chartVal="温度" value="Temperature" onclick="forecastPersonal.custom_itemCheck(event)"><span>温度</span></label>');
			$("#custom_item").append('<label style="margin-right: 5px;"><input type="checkbox" class="checkbox style-0" name="custom_itemCheck" chartVal="风力风向" value="Wind" onclick="forecastPersonal.custom_itemCheck(event)"><span>风力风向</span></label>');

			$("#custom_item").append('<br/>');

			$("#custom_item").append('<label style="margin-right: 5px;"><input type="checkbox" class="checkbox style-0" name="custom_itemCheck" chartVal="CO(预)" value="CO" onclick="forecastPersonal.custom_itemCheck(event)"><span>一氧化碳</span></label>');
			$("#custom_item").append('<label style="margin-right: 5px;"><input type="checkbox" class="checkbox style-0" name="custom_itemCheck" chartVal="NO2(预)" value="NO2" onclick="forecastPersonal.custom_itemCheck(event)"><span>二氧化氮</span></label>');
			$("#custom_item").append('<label style="margin-right: 5px;"><input type="checkbox" class="checkbox style-0" name="custom_itemCheck" chartVal="O3(预)" value="O3_1H" onclick="forecastPersonal.custom_itemCheck(event)"><span>臭氧</span></label>');
			$("#custom_item").append('<label style="margin-right: 5px;"><input type="checkbox" class="checkbox style-0" name="custom_itemCheck" chartVal="SO2(预)" value="SO2" onclick="forecastPersonal.custom_itemCheck(event)"><span>二氧化硫</span></label>');
			$("#custom_item").append('<label style="margin-right: 5px;"><input type="checkbox" class="checkbox style-0" name="custom_itemCheck" chartVal="PM10(预)" value="PM10_1H" onclick="forecastPersonal.custom_itemCheck(event)"><span>颗粒物（PM10）</span></label>');
			$("#custom_item").append('<label style="margin-right: 5px;"><input type="checkbox" class="checkbox style-0" name="custom_itemCheck" chartVal="PM2_5(预)" value="PM2_5_1H" onclick="forecastPersonal.custom_itemCheck(event)"><span>细颗粒物（PM2.5）</span></label>');
			$("#custom_item").append('<label style="margin-right: 5px;"><input type="checkbox" class="checkbox style-0" name="custom_itemCheck" chartVal="AQI(预)" value="AQI" onclick="forecastPersonal.custom_itemCheck(event)"><span>AQI</span></label>');
		} 
			$("#custom_item").append('<br/>');

			$("#custom_item").append('<label style="margin-right: 5px;"><input type="checkbox" class="checkbox style-0" name="custom_itemCheck" chartVal="HNO3" value="HNO3" onclick="forecastPersonal.custom_itemCheck(event)"><span>HNO3</span></label>');
			$("#custom_item").append('<label style="margin-right: 5px;"><input type="checkbox" class="checkbox style-0" name="custom_itemCheck" chartVal="NH3" value="NH3" onclick="forecastPersonal.custom_itemCheck(event)"><span>NH3</span></label>');
			$("#custom_item").append('<label style="margin-right: 5px;"><input type="checkbox" class="checkbox style-0" name="custom_itemCheck" chartVal="NOX" value="NOX" onclick="forecastPersonal.custom_itemCheck(event)"><span>NOX</span></label>');
			$("#custom_item").append('<label style="margin-right: 5px;"><input type="checkbox" class="checkbox style-0" name="custom_itemCheck" chartVal="EC" value="EC" onclick="forecastPersonal.custom_itemCheck(event)"><span>EC</span></label>');
			$("#custom_item").append('<label style="margin-right: 5px;"><input type="checkbox" class="checkbox style-0" name="custom_itemCheck" chartVal="OC" value="OC" onclick="forecastPersonal.custom_itemCheck(event)"><span>OC</span></label>');
			$("#custom_item").append('<label style="margin-right: 5px;"><input type="checkbox" class="checkbox style-0" name="custom_itemCheck" chartVal="OM" value="OM" onclick="forecastPersonal.custom_itemCheck(event)"><span>OM</span></label>');
			$("#custom_item").append('<label style="margin-right: 5px;"><input type="checkbox" class="checkbox style-0" name="custom_itemCheck" chartVal="SO4" value="SO4" onclick="forecastPersonal.custom_itemCheck(event)"><span>SO4</span></label>');
			$("#custom_item").append('<label style="margin-right: 5px;"><input type="checkbox" class="checkbox style-0" name="custom_itemCheck" chartVal="NO3" value="NO3" onclick="forecastPersonal.custom_itemCheck(event)"><span>NO3</span></label>');
			$("#custom_item").append('<label style="margin-right: 5px;"><input type="checkbox" class="checkbox style-0" name="custom_itemCheck" chartVal="NH4" value="NH4" onclick="forecastPersonal.custom_itemCheck(event)"><span>NH4</span></label>');
			$("#custom_item").append('<label style="margin-right: 5px;"><input type="checkbox" class="checkbox style-0" name="custom_itemCheck" chartVal="Soil" value="Soil" onclick="forecastPersonal.custom_itemCheck(event)"><span>Soil</span></label>');
			
			$("input[name='custom_itemCheck']").prop("checked",false);


			forecastPersonal.queryCustom();
	},
	custom_itemCheck:function(event){
		var btn=$(event.target);
		if (btn.prop("checked")==true) {
			
			var flag=false;
			for (var i = 0; i < forecastPersonal.drawCustom.itemNames[forecastPersonal.drawCustom.timeType].length; i++) {
				if (forecastPersonal.drawCustom.itemNames[forecastPersonal.drawCustom.timeType][i]==btn.val()) {
					flag=true;
					break;
				}
			} 
			if (!flag) {
				forecastPersonal.drawCustom.curItem=btn.val();
				// forecastPersonal.drawCustom.curItemValue=btn.siblings("span").text();
				forecastPersonal.drawCustom.curItemValue=btn.attr("chartVal");
				forecastPersonal.queryCustom();
			}else{
				forecastPersonal.drawCustom.draw();
			}
		}else{
			forecastPersonal.drawCustom.draw();
		}

	},
	custom_dateComfirm:function(event){
		forecastPersonal.drawCustom.load();
		$("input[name='custom_itemCheck']:checked").each(function(key,value){
			$(value).prop("checked",false);
		}); 
		forecastPersonal.queryCustom();
	},
	queryCustom:function(){
			var requestData={'cityCode':cityCode,'cityType':cityType,'userName':userName,}; 
			var startDate = $("#startDatepicker"+1).datepicker("getDate");
			var endDate = $("#endDatepicker"+1).datepicker("getDate");
			if (startDate!=null) {
				requestData.startTimePoint=startDate.getTime();
			}
			if (endDate!=null) {
				requestData.endTimePoint=endDate.getTime();
			}

			var  url="/smartadmin/mobileforecast/getModelCustom";
				requestData.timeType=forecastPersonal.drawCustom.timeType;
				if (forecastPersonal.drawCustom.station_index!=0) {
					requestData.stationName=$("input[name='custom_StationOption']:checked").val();
				}

			requestData.item=forecastPersonal.drawCustom.curItem;

		 $.ajax({
			type: "GET",
			url: url,
			data: requestData,
			dataType: "json",
			timeout:15000,
			beforeSend:function(){
				// $("#loadingText").text("正在获取数据，请稍候······");
				$("#custom-over").show();
				$("#custom-layout").show();
				// $("html").css({overflow:"hidden"});
			},
			error:function(){
				$("#custom-over").hide();
				$("#custom-layout").hide();
				// $("html").css({overflow:"scroll"});

				$.smallBox({
										title: "请求超时，请稍后重试！",
										content: "<i class='fa fa-clock-o'></i> <i>系统提示...</i>",
										color: "rgb(158, 36, 41)",
										iconSmall: "fa  fa-times-circle bounce animated" ,
										timeout:5000
									});

			},
			success: function(data){
				$("#custom-over").hide();
				$("#custom-layout").hide();
				// $("html").css({overflow:"scroll"});
				if(data.result){
					if (!data.data.state) {
						$.smallBox({
										title: data.data.message,
										content: "<i class='fa fa-clock-o'></i> <i>系统提示...</i>",
										color: "#296191",
										iconSmall: "fa  fa-check-circle bounce animated",
										timeout: 5000
									});
					}else{
						forecastPersonal.drawCustom.init(data.data.data);


						}
				}else{
					timeoutAlert();
				}
			}});
	}

}
