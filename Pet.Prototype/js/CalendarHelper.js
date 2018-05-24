var CalendarHelper = new function () {

    var lang = $('.pr-language').val();

    this.InitLawCalendar = function () {

	     $(".search-result-container").html("<div id='fullcalendar-law'></div>");
	 	 $("#fullcalendar-law").fullCalendar({
	 	     theme: true,
	 	     firstDay:1,
	 	 	 header: {
	 	 	 	 left: 'prev,next today',
	 	 	 	 center: 'title',
	 	 	 	 right: 'month'
	 	 	 },
	 	 	 viewRender: function(view, element) {
	 	 	     element.find('.fc-day-header').html('');
	 	 	 },
	 	 	 editable: false,
	 	 	 eventColor: '#1B6377',
	 	 	 columnFormat: {
	 	 	 	 month: 'MM',    // Mon
	 	 	 	 day: 'dd MM yyyy'
	 	 	 },
	 	 	 
	 	 	 events: {
	 	 	 	 url: "/" + languageUI + "/Calendar/GetLawEvents",
	 	 	 	 data: {dateType: $(".date-type").val()}
	 	 	 },
	 	 	 monthNames: CalendarHelper.LawTaxCalendarLangData("months"),
	 	 	 monthNamesShort:CalendarHelper.LawTaxCalendarLangData("monthsShort"),
	 	 	 dayNames: CalendarHelper.LawTaxCalendarLangData("days"),
	 	 	 dayNamesShort:CalendarHelper.LawTaxCalendarLangData("daysShort") ,
	 	 	 buttonText: {
	 	 	 	 prev: "<",
	 	 	 	 next: ">",
	 	 	 	 today: CalendarHelper.LawTaxCalendarLang("today"),//"Сегодня",
	 	 	 	 month: CalendarHelper.LawTaxCalendarLang("month"),//"Месяц",
	 	 	 	 week: CalendarHelper.LawTaxCalendarLang("week"), //"Неделя",
	 	 	 	 day: CalendarHelper.LawTaxCalendarLang("day")   //"День"
	 	 	 }
	 	 });
	 	 $("#fullcalendar-law").fullCalendar('gotoDate', '2018-01-01');
	 	 $("#fullcalendar-law").find('th.fc-day-header').addClass("hide");
	 
         //----
	 	 $('.month-calendar').datepicker({
	 	     viewMode: "months",
	 	     minViewMode: "months",
	 	     maxViewMode: "months",
	 	     format: 'MM-YYYY',
	 	     language: lang
	 	 });

	 	 $('#fullcalendar-law').on('click', 'button.fc-month-button', function () {

	 	     $("#myCalendarLawModal").modal('show');

	 	     $('.btn-choose').click(function () {

	 	         var active_month = $(".month-calendar").datepicker("getDate");
	 	         if (!$(".month-calendar").find('td').hasClass('active')) {
	 	             return;
	 	         }

	 	         var d = new Date(active_month);
	 	         var year = $('.month-calendar').find('.datepicker-switch').val();
	 	         if (year == "")
	 	             year = d.getFullYear();
	 	         var month = d.getMonth() + 1;

	 	         if (d.getMonth().toString().length < 2)
	 	             month = '0' + (d.getMonth() + 1);

	 	         $("#fullcalendar-law").fullCalendar('gotoDate', year + '-' + month + '-01');
	 	         $('#myCalendarLawModal').modal('hide');

	 	     });
	 	 });
	 }

	 this.InitTaxCalendar = function () {
	 	
	     $(".search-result-container").html("<div id='fullcalendar-tax'></div>");
	 	 
	 	 $("#fullcalendar-tax").fullCalendar({
	 	     theme: true,
	 	     firstDay: 1,
	 	 	 header: {
	 	 	 	 left: 'prev,next today',
	 	 	 	 center: 'title',
	 	 	 	 right: 'month'
	 	 	 },
	 	 	 viewRender: function (view, element) {
	 	 	     element.find('.fc-day-header').html('');
	 	 	 },
	 	 	 editable: false,
	 	 	 eventColor: '#1B6377',
	 	 	 columnFormat: {
	 	 	 	 month: 'MM',    // Mon
	 	 	 	 day: 'dd MM yyyy'
	 	 	 },

	 	 	 events: {
	 	 	 	 url: "/" + languageUI + "/Calendar/GetTaxEvents",
	 	 	 	 data: { dateType: $(".date-type").val() }
	 	 	 },
	 	 	 monthNames: CalendarHelper.LawTaxCalendarLangData("months"),
	 	 	 monthNamesShort:CalendarHelper.LawTaxCalendarLangData("monthsShort"),
	 	 	 dayNames: CalendarHelper.LawTaxCalendarLangData("days"),
	 	 	 dayNamesShort:CalendarHelper.LawTaxCalendarLangData("daysShort") ,
	 	 	 buttonText: {
	 	 	 	 prev: "<",
	 	 	 	 next: ">",
	 	 	 	 today: CalendarHelper.LawTaxCalendarLang("today"),//"Сегодня",
	 	 	 	 month: CalendarHelper.LawTaxCalendarLang("month"),//"Месяц",
	 	 	 	 week: CalendarHelper.LawTaxCalendarLang("week"), //"Неделя",
	 	 	 	 day: CalendarHelper.LawTaxCalendarLang("day")   //"День"
	 	 	 }
	 	 });
	 	 
	 	 $("#fullcalendar-tax").fullCalendar('gotoDate', '2018-01-01');
	 	 $("#fullcalendar-tax").find('th.fc-day-header').addClass("hide");

	     //----
	 	 $('.month-calendar').datepicker({
	 	     viewMode: "months",
	 	     minViewMode: "months",
	 	     maxViewMode: "months",
	 	     format: 'MM-YYYY',
	 	     language: lang
	 	 });

	 	 $('#fullcalendar-tax').on('click', 'button.fc-month-button', function () {

	 	     $("#myCalendarTaxModal").modal('show');

	 	     $('.btn-choose').click(function () {

	 	         var active_month = $(".month-calendar").datepicker("getDate");
	 	         if (!$(".month-calendar").find('td').hasClass('active')) {
	 	             return;
	 	         }

	 	         var d = new Date(active_month);
	 	         var year = $('.month-calendar').find('.datepicker-switch').val();
	 	         if (year == "")
	 	             year = d.getFullYear();
	 	         var month = d.getMonth() + 1;

	 	         if (d.getMonth().toString().length < 2)
	 	             month = '0' + (d.getMonth() + 1);

	 	         $("#fullcalendar-tax").fullCalendar('gotoDate', year + '-' + month + '-01');
	 	         $('#myCalendarTaxModal').modal('hide');

	 	     });
	 	 });
	 }
      
     //TODO: по другому надо писать!!!!
	 $('.link-to-document-tax').on("click", "a", function (event) {

	     if ($(this).attr('href') == null || $(this).attr('href').length<2)
	         return;

	     if ($(this).attr('href').toString().indexOf("TaxDetail") == -1) {
	         event.preventDefault();
	         var hrefArr = $(this).attr('href').split("#");
	         var url = location.protocol + "//" + location.host;
	         url = url + "/ru/Document/Detail?ngr=" + hrefArr[0] + "&langId=1&paragraphNumber=" + hrefArr[1];
	         window.open(url, '_blank');
	         return;
	     }
	 });
      
	 this.InitProductionCalendar = function ()
	 {
	     if ($(".pr-calendar").length < 1)
	         return false;

	     var months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
	     var year = $(".date-type").val();
	     var vacations = ($(".pr-vacations").val() != "") ? $(".pr-vacations").val().replace(/.$/, "").split(',') : [];
	     var vacations_names = ($(".pr-vacations-names").val() != "") ? $(".pr-vacations-names").val().replace(/.$/, "").split('*') : [];
	     var vacations_datemoved = ($(".pr-vacations-date-moved").val() != "") ? $(".pr-vacations-date-moved").val().replace(/.$/, "").split(',') : [];

	     for (i = 0; i < months.length; ++i) {	    
	         //console.info(name);
	         CalendarHelper.GenerateCalendar(year, months[i], vacations, vacations_names, vacations_datemoved);
	     }
	 }

	 this.GenerateCalendar = function (year, month, vacations, vacations_names, vacations_datemoved)
	 {
	    
	     var IsCurrDate = false;
	     var currMonth = new Date().getMonth();
	     var currYear = new Date().getFullYear();
	     var currDay = new Date().getDate();
	     if (currMonth.toString().length == 1) {
	         currMonth = currMonth + 1;
	         currMonth = "0" + currMonth;
	     }

	     if (currDay.toString().length == 1)
	         currDay = "0" + currDay;

	     if (currYear == year && month == currMonth) {
	         IsCurrDate = true;
	         //$picker.datepicker('setDate', currMonth + '-' + currDay + '-' + currYear);
	     }

	     var vacations2 = [];
	     if (month == '01') {
	         vacations2.push('2018-01-20');
	     }

	     IsCurrDate = false;
	     var $picker= $(".pr-calendar-" + month).datepicker({
	         weekStart: 1,
	         language: lang,
	         //useCurrent: false,
	         todayHighlight:(IsCurrDate==true)?true:false,
	         defaultViewDate: {enabled:false, year: year, month: parseInt(month), day: 1 },
	         beforeShowDay: function (date) {
                 	    
	             var _month = date.getMonth()+1;
	             if (_month.toString().length == 1)
	                 _month = "0" + _month;

	             if (_month == month) {
	                 if ($.inArray($.datepicker.formatDate('yy-mm-dd', date), vacations) > -1) {
	                     var holidy_name = "праздник";

	                     if (vacations_names != null && vacations_names.length != 0) {
	                         var indx = vacations.indexOf($.datepicker.formatDate('yy-mm-dd', date));
	                         holidy_name = vacations_names[indx];
	                     }

	                     if ($.inArray($.datepicker.formatDate('yy-mm-dd', date), vacations_datemoved) > -1) {
	                         if (date.getDay() != 0 || date.getDay() != 6)
	                             return { classes: "date-moved", tooltip: " " };
	                     } else return { enabled: true, classes: "day-off", tooltip: holidy_name };
	                 }

	                 if ((date.getDay() == 0 || date.getDay() == 6)) {  //&& _month==month
	                     if ($.inArray($.datepicker.formatDate('yy-mm-dd', date), vacations_datemoved) == -1)
	                         return { enabled: true, classes: "event", tooltip: " " };
	                     else return { enabled: true,classes: "date-moved-on", tooltip: " ",title:'*',buttonText:'*' };
	                 } else {
	                     return { tooltip: " " };
	                 }
	             }
	             //console.log($.datepicker.formatDate('yy-mm-dd', date)+"   =",date.getDay());
	         }
	     });
         	     
         //---
	     $($picker).find('td').removeClass('active');
         	   
         //----old date
	     //var $picker = $(".pr-calendar-" + month).datepicker({
	     //    weekStart: 1,
	     //    //useCurrent: false,
	     //    todayHighlight: (IsCurrDate == true) ? true : false,
	     //    defaultViewDate: { enabled: false, year: year, month: parseInt(month), day: 1 },
	     //    beforeShowDay: function (date) {
	     //        if ($.inArray($.datepicker.formatDate('yy-mm-dd', date), vacations) > -1) {
	     //            console.info("yes" + date.toString());
	     //            return { enabled: true, classes: "event", tooltip: "holiday" };
	     //        }
	     //    }
	     //});
	 }
	 
	 this.LawTaxCalendarLangData=function(type){
		var data=[];
		 if(type=='months'){
			 
			data=['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
			
			if(languageUI=="kk"){		
				data=["Қаңтар", "Ақпан", "Наурыз", "Сәуір", "Мамыр", "Маусым", "Шілде", "Тамыз", "Қыркүйек", "Қазан", "Қараша", "Желтоқсан"];
			}else if(languageUI=='en'){
			    data=["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];  
			}
			 
		 }else if(type=='monthsShort'){
			 
		    data=['Янв.', 'Фев.', 'Март', 'Апр.', 'Май', 'οюнь', 'οюль', 'Авг.', 'Сент.', 'Окт.', 'Ноя.', 'Дек.'];
			
			if(languageUI=="kk"){		
			    data=["Қаң", "Ақп", "Нау", "Сәу", "Мам", "Мау", "Шіл", "Там", "Қыр", "Қаз", "Қар", "Жел"];
			}else if(languageUI=='en'){
			    data=["Jan", "Feb", "Mar", "Apr", "May", "June", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];  
			}
		 }else if(type=='days'){
			 
		    data=["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];
			
			if(languageUI=="kk"){		
			    data=["Жексенбі", "Дүйсенбі", "Сейсенбі", "Сәрсенбі", "Бейсенбі", "Жұма", "Сенбі"];
			}else if(languageUI=='en'){
			    data=["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];  
			}
		 }else if(type=='daysShort'){
			 
		    data=["ВС", "ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ"];
			
			if(languageUI=="kk"){		
			    data=["Жек", "Дүй", "Сей", "Сәр", "Бей", "Жұм", "Сен"];
			}else if(languageUI=='en'){
			    data=["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];  
			}
		 }
		 
		return data;
	 }

	 this.LawTaxCalendarLang=function(type){
		 var result="";
		 if(type=="today"){
			 
			result="Сегодня";
			if(languageUI=="kk")
				result="Бүгін";
			else if(languageUI=="en")
				result="Today";
			
		 }else if(type=="month"){
			 
			 result="Месяц";
			if(languageUI=="kk")
				result="Ай";
			else if(languageUI=="en")
				result="Month";
			
		 }else if(type=="week"){
			 
			 result="Неделя";
			if(languageUI=="kk")
				result="Апта";
			else if(languageUI=="en")
				result="Week";
			
		 }else if(type=="day"){
			 
			 result="День";
			if(languageUI=="kk")
				result="Күн";
			else if(languageUI=="en")
				result="Day";
		 }
		return result;
	 }
}