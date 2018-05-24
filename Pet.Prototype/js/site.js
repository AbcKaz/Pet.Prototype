$(document).mouseup(function (e) {
    var container = $(".doc-left-menu-hint");
    // if the target of the click isn't the container nor a descendant of the container
    if (!container.is(e.target) && container.has(e.target).length === 0) {
       
        if ($(e.target).parents(".hint-body").length>0) 
            { 
                return null;    
            }
        else {
        container.hide();
        $(".hint-body").hide();
            }       
    }
});


$(function () {  
    var owl = $('.dictionary-carousel');
    owl.owlCarousel({
        items: 1,
        loop: true,
        margin: 10,
        autoplay: true,
        autoplayTimeout: 3000,
        autoplayHoverPause: true
    });
    $('.play').on('click', function () {
        owl.trigger('play.owl.autoplay', [1000])
    })
    $('.stop').on('click', function () {
        owl.trigger('stop.owl.autoplay')
    })
    $(".authorized").click(function () {
        if (!authorized) {
            $("#modalLogin").modal();
            return false;
        }
    });
    
    $('#words-container').perfectScrollbar();
    //$('.doc-body').perfectScrollbar();
    
    $('.scroll').perfectScrollbar();

    //TODO: слишком долго грузятся на главном
    //AnalyticsHelper.InitDailyAcceptedChart();
    //AnalyticsHelper.InitByDocType();
    AnalyticsHelper.InitPartial('/Analytics/_ByRegion', 'underline-region');
    //AnalyticsHelper.InitByRegion();
    AnalyticsHelper.InitByStatus();

    //DocumentHelper.ToScrollToStart();
    var w = parseInt($(".search-panel-logo").width())+45;
    $(".menu-space").animate({
        width: w+"px"
    }, 1000);
  
    $(".select2").select2();

    if ($(".words-container-my").length > 0)
    {
        var id = $(".first-id").val();
        DictionaryHelper.ShowDescription(id);
    }

    $(".to-modal").click(function () {
        var div = $(this).attr("cls");
        if ($("." + div).css('display') == 'none') {
            $("." + div).show();
        }
        else {
            $("."+div).hide();
        }
    });
   
    CalendarHelper.InitProductionCalendar();

	 //TODO: need remove this code 
    $(".fa-expand").parent().click(function () {
    	 $(".menu").css('display', 'none');
    	 $(".side-menu").css('display', 'none');
    	 $(".search-panel").css('display', 'none');
    });

	 //TODO: need release search func
    $(".search-situation-tree").keyup(function () {
        sitTreeApi.filter(null, {
            search: $(this).val()
        });
    });
   
    /*release*/
    $(".datepicker-").datepicker({ format: 'yyyy-mm-dd' });
    $(".main-datepicker").datepicker({
        format: 'yyyy-mm-dd',
        weekStart: 1,
        language: languageUI,
        todayHighlight: true
    });

    $(".summernote").summernote({ height: 200 });
    $(".summernote-large").summernote({ height: 500 });

 
    if ($("#statuses-charts").length > 0) {
    	 Morris.Bar({
    	 	 element: 'statuses-charts',
    	 	 data: [
				{ y: 'В силе', a: 3059 },
				{ y: 'С истекшим сроком', a: 7 },
				{ y: 'Утратил силу', a: 235 }
    	 	 ],
    	 	 xkey: 'y',
    	 	 ykeys: ['a'],
    	 	 labels: ['Количество']
    	 });
    }

    $('[data-toggle="tooltip"]').tooltip();

	 //Init Toast Message If not null 
    CommonHelper.InitMessage();

	 //Init Calendars law and tax types 
    if ($("#fullcalendar-law").length > 0)
    {
		  CalendarHelper.InitLawCalendar()
    }
    if ($("#fullcalendar-tax").length > 0) {
    	 CalendarHelper.InitTaxCalendar();
    }

	 //On click spell element 
    $(".spell").click(function () {
        $(".search-text").val($(".spell").html());
        $(".form-search-doc").submit();
        return false;
    });

	 //Init I-Check elements 
    $('.i-checks').iCheck({
        checkboxClass: 'icheckbox_square-green',
        radioClass: 'iradio_square-green',
    });

    TemplateHelper.SearchSubmit();
    DictionaryHelper.SearchSubmit();

    //TODO: для чего нужен?
    //CommonHelper.ToChecked('check-reg-ext', 'selectedRegistered');
    //CommonHelper.ToChecked('check-status-ext', 'selectedStatuses');
    
    //TODO: когда набираешь текст
	 //Search text input keypress
    $(".search-text").keypress(function () {
        $(".selected-hidden").val('');
        $(".current-page").val('1');
    });
    
	 //PaginationInit 
    $('.pagination').bootpag({
        total: $(".total-pages").val(),
        page: $(".current-page").val(),
        maxVisible: 5
    }).on('page', function (event, num) {
        $(".current-page").val(num);
        if ($(".form-search-dic").length > 0) {
        	 $(".form-search-dic").submit();
        }
        if ($(".form-search-tmp").length > 0) {
        	 $(".form-search-tmp").submit();
        }
        if ($(".lastdoc-form").length > 0) {
            $(".lastdoc-form").submit();
        }
    });

	 //TODO: remove this code 
	 /*
    $(document).on('click', '.dropdown-menu.dropdown-menu-classificator', function (e) {
        e.stopPropagation();
    });
    $(document).on('click', '.dropdown-menu.dropdown-menu-dictionary', function (e) {
        e.stopPropagation();
    });
    $(document).on('click', '.dropdown-menu.dropdown-menu-region', function (e) {
        e.stopPropagation();
    });
    $(document).on('click', '.dropdown-menu.dropdown-menu-situation', function (e) {
        e.stopPropagation();
    });
	 */
	 //Init notification count in cabinet 
    NotificationHelper.NotificationsCount();

	 //Init select in forum add page
    ForumHelper.SelectThemeChange();
	 
	 /*detail template*/
    if ($(".tmp-detail").length>0)	 
    {
		  TemplateHelper.GetBody()
    };
    
    $(".owl-carousel").owlCarousel({ autoplayTimeout: 3000, items: 7, autoplay: true });

    //TODO: для пользователя показывать сумму
    $('#select-tariff').change(function () {
        if ($('.tariff-online').length > 0 && $('.tariff-currency').length > 0 && $('.tariff-price-month').length > 0) {
            //var tariffsum = $(this).val() * $('.tariff-price-month').eq(0).html();
            //TODO: не по формуле, пришлось руками забить цену
            var tariffsum = 0;
            var month = $(this).val();
            switch (month) {
                case "1":
                    tariffsum = 7700;
                    break;
                case "3":
                    tariffsum = 20000;
                    break;
                case "6":
                    tariffsum = 35000;
                    break;
                case "12":
                    tariffsum = 60000;
                    break;
            }
            $('.tariff-online').eq(0).html(tariffsum + ' ' + $('.tariff-currency').eq(0).html());
        }
    });

    /*$('#RulesAgreed').click(function () {
        console.log(1);
        if ($(this).is(':checked')) {
            // Do stuff
            $(".btn-user-register").removeAttr('disabled');
        }
        else {
            $(".btn-user-register").attr('disabled', 'disabled');
        }
    });*/

});
