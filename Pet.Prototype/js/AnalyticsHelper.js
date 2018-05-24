var AnalyticsHelper = new function () {
	 this.InitDailyAcceptedChart = function () {
	 	 if ($("#analysticWidgetBody").length < 1)
	 	 	 return false;
	 	 $.ajax({
	 	 	 method: "POST",
	 	 	 url: "/" + languageUI + "/Analytics/Daily"
	 	 }).done(function (chartData) {
	 	 	 var chart = AmCharts.makeChart("analysticWidgetBody", {
	 	 	 	 "type": "stock",
	 	 	 	 "theme": "light",
                 "language": "ru",
	 	 	 	 "dataSets": [{
	 	 	 	 	 "color": "#5C6F7C",
	 	 	 	 	 "fieldMappings": [{
	 	 	 	 	 	 "fromField": "value",
	 	 	 	 	 	 "toField": "value"
	 	 	 	 	 }, {
	 	 	 	 	 	 "fromField": "volume",
	 	 	 	 	 	 "toField": "volume"
	 	 	 	 	 }],
	 	 	 	 	 "dataProvider": chartData,
	 	 	 	 	 "categoryField": "date",
	 	 	 	 
	 	 	 	 }],


	 	 	 	 "panels": [{
	 	 	 	 	 "title": "Группировка по дате принятия (кол-во)",
	 	 	 	 	 "stockGraphs": [{
	 	 	 	 	 	 "id": "g1",
	 	 	 	 	 	 "valueField": "value"
	 	 	 	 	 }],
	 	 	 	 	 "stockLegend": {
	 	 	 	 	 	 "valueTextRegular": " ",
	 	 	 	 	 	 "markerType": "none"
	 	 	 	 	 }
	 	 	 	 }],

	 	 	 	 "chartScrollbarSettings": {
	 	 	 	 	 "graph": "g1"
	 	 	 	 },

	 	 	 	 "chartCursorSettings": {
	 	 	 	 	 "valueBalloonsEnabled": true,
	 	 	 	 	 "graphBulletSize": 1,
	 	 	 	 	 "valueLineBalloonEnabled": true,
	 	 	 	 	 "valueLineEnabled": true,
	 	 	 	 	 "valueLineAlpha": 0.5
	 	 	 	 },

	 	 	 	 "periodSelector": {
	 	 	 	 	 "periods": [{
	 	 	 	 	 	 "period": "DD",
	 	 	 	 	 	 "count": 10,
	 	 	 	 	 	 "label": "10 дней"
	 	 	 	 	 }, {
	 	 	 	 	 	 "period": "MM",
	 	 	 	 	 	 "count": 1,
	 	 	 	 	 	 "label": "1 месяц"
	 	 	 	 	 }, {
	 	 	 	 	 	 "period": "YYYY",
	 	 	 	 	 	 "count": 1,
	 	 	 	 	 	 "label": "1 год"
	 	 	 	 	 }, {
	 	 	 	 	 	 "period": "YTD",
	 	 	 	 	 	 "label": "YTD"
	 	 	 	 	 }, {
	 	 	 	 	 	 "period": "MAX",
	 	 	 	 	 	 "label": "МАКС"
	 	 	 	 	 }]
	 	 	 	 },

	 	 	 	 "panelsSettings": {
	 	 	 	 	 "usePrefixes": true
	 	 	 	 },
	 	 	 	 "export": {
	 	 	 	 	 "enabled": true
	 	 	 	 }
	 	 	 });

	 	 	 $('.analytics-href').find('.underline').removeClass('underline-active-blue');
	 	 	 $('.underline-daily').addClass('underline-active-blue');
	 	 });
	 	
	 }

	 this.InitPartial = function (href, hrefClassName) {
	     $.ajax({
             url: '/'+languageUI+href
	     }).done(function (output) {
	         $("#analysticWidgetBody").html(output);
             //TODO: временно отключили
	         AnalyticsHelper.InitByRegion();
	         //AnalyticsHelper.InitByDocType();
	         AnalyticsHelper.InitByStatus();
	     });
	    
	     $('.analytics-href').find('.underline').removeClass('underline-active-blue');
	     $('.' + hrefClassName).addClass('underline-active-blue');

	     return false;
	 }

	 this.InitByDocType = function () {
	     if ($("#doc-types-chart").length < 1)
	         return false;
	     var data = $(".form-analyticsByFormType").serialize();
	     //console.info(data);
	     $.ajax({
	         method: "POST",
	         url: "/" + languageUI + "/Analytics/ByFormType",
             data: data
	     }).done(function (chartData) {
	         var chart = AmCharts.makeChart("doc-types-chart", {
	             "type": "pie",
	             "startDuration": 0,
                 "labelText": "",
	             "theme": "light",
	             "addClassNames": true,
	             "legend": {
	                 "position": "right"
	             },
	             "innerRadius": "30%",
	             "balloonText": "[[value]]",
	             "balloon": {
	                 "drop": true,
	                 "adjustBorderColor": false,
	                 "color": "#FFFFFF",
	                 "fontSize": 16
	             },
	             "defs": {
	                 "filter": [{
	                     "id": "shadow",
	                     "width": "200%",
	                     "height": "200%",
	                     "feOffset": {
	                         "result": "offOut",
	                         "in": "SourceAlpha",
	                         "dx": 0,
	                         "dy": 0
	                     },
	                     "feGaussianBlur": {
	                         "result": "blurOut",
	                         "in": "offOut",
	                         "stdDeviation": 5
	                     },
	                     "feBlend": {
	                         "in": "SourceGraphic",
	                         "in2": "blurOut",
	                         "mode": "normal"
	                     }
	                 }]
	             },
	             "dataProvider": chartData,
	             "valueField": "count",
	             "titleField": "title",
	             "export": {
	                 "enabled": true
	             }
	         });

	       
	     });
	 }

	 this.InitByRegion = function () {
	     if ($("#region-chart").length < 1)
	         return false;
	     var data = $(".form-analyticsByRegion").serialize();
	     //console.info(data);
	     $.ajax({
	         method: "POST",
	         url: "/" + languageUI + "/Analytics/ByRegion",
	         data: data
	     }).done(function (chartData) {
	         var chart = AmCharts.makeChart("region-chart", {
	             "type": "pie",
                 "labelText": "",
	             "startDuration": 0,
	             "theme": "light",
	             "addClassNames": true,
	             "legend": {
	                 "position": "right"
	             },
	             "innerRadius": "30%",
	             //"balloonText": "[[value]]",
	             //"balloonText": "[[title]]<br><span style='font-size:14px'><b>[[value]]</b> ([[percents]]%)</span>",
	             /*"balloon": {
	                 "drop": true,
	                 "adjustBorderColor": false,
	                 "color": "#FFFFFF",
	                 "fontSize": 16
	             },*/
	             "thousandsSeparator": "",
	             "defs": {
	                 "filter": [{
	                     "id": "shadow",
	                     "width": "200%",
	                     "height": "200%",
	                     "feOffset": {
	                         "result": "offOut",
	                         "in": "SourceAlpha",
	                         "dx": 0,
	                         "dy": 0
	                     },
	                     "feGaussianBlur": {
	                         "result": "blurOut",
	                         "in": "offOut",
	                         "stdDeviation": 5
	                     },
	                     "feBlend": {
	                         "in": "SourceGraphic",
	                         "in2": "blurOut",
	                         "mode": "normal"
	                     }
	                 }]
	             },
	             "dataProvider": chartData,
	             "valueField": "count",
	             "titleField": "title",
	             "export": {
	                 "enabled": true
	             }
	         });


	     });
	 }

	 this.InitByStatus = function () {
	     if ($("#status-chart").length < 1)
	         return false;
	     var data = $(".form-analyticsByStatus").serialize();
	    //console.info(data);
	     $.ajax({
	         method: "POST",
	         url: "/" + languageUI + "/Analytics/ByStatus",
	         data: data
	     }).done(function (chartData) {
	         var chart = AmCharts.makeChart("status-chart", {
	             "type": "serial",
	             "theme": "light",
	             "dataProvider": chartData,
	             "thousandsSeparator": "",
	            "valueAxes": [ {
                    "gridColor": "#FFFFFF",
                    "gridAlpha": 0.2,
                    "dashLength": 0
                  } ],
                  "gridAboveGraphs": true,
                  "startDuration": 1,
                  "graphs": [ {
                    "balloonText": "[[title]]: <b>[[value]]</b>",
                    "fillAlphas": 0.8,
                    "lineAlpha": 0.2,
                    "type": "column",
                    "valueField": "count"
                  } ],
                  "chartCursor": {
                    "categoryBalloonEnabled": false,
                    "cursorAlpha": 0,
                    "zoomable": false
                  },
                  "categoryField": "title",
                  "export": {
                    "enabled": true
                  }
	           });
	     });
	 }
}