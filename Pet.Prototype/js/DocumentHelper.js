   
//TODO: на каждую страницу зачем?
$(function(){
	var statusId=$('.doc-requisites').attr('statusId');
	var currLang=$('#docLang').val();
	if(statusId==2)
	{
		var imgName="expired_ru";
		if(currLang=="kk")
			imgName="expired_kz";
		else if(currLang=="en")
			imgName="expired_en";
			
		var url='/images/'+imgName+'.png';
		$('.doc-expired').css("background-image", "url('"+url+"')");
			
	}else if(statusId==3){
			
		var imgName="isexpired_ru";
		if(currLang=="kk")
			imgName="isexpired_kz";
		else if(currLang=="en")
			imgName="isexpired_en";
			
		var url='/images/'+imgName+'.png';
		$('.doc-expired').css("background-image", "url('"+url+"')");
	}
});
	
var DocumentHelper = new function () {
    
    //TODO: check document status
    this.Status23 = function (statusId) {
		
        if (statusId == 2 || statusId == 3) {
            if ($('.doc-window doc-window-2').find('.doc-body').hasClass('doc-expired') == false)
                $('.doc-window doc-window-2').find('.doc-body').addClass('doc-expired');
        }

		var currLang = $('#docLang').val();
		if (statusId == 2) {
		    var imgName = "expired_ru";
		    if (currLang == "kk")
		        imgName = "expired_kz";
		    else if (currLang == "en")
		        imgName = "expired_en";

		    var url = '/images/' + imgName + '.png';
		    $('.doc-expired').css("background-image", "url('" + url + "')");

		} else if (statusId == 3) {

		    var imgName = "isexpired_ru";
		    if (currLang == "kk")
		        imgName = "isexpired_kz";
		    else if (currLang == "en")
		        imgName = "isexpired_en";

		    var url = '/images/' + imgName + '.png';
		    $('.doc-expired').css("background-image", "url('" + url + "')");
		}
	}	
	
    this.SelectIsNew = function (isNew) {
        $(".is-new").val(isNew);
        $(".lastdoc-form").submit();

        return false;
    }

    this.FastOpen = function (ngr, dateEdition, language) {
	
        var data = { langId: language, ngr: ngr, dateEdition: dateEdition };
        if (dateEdition == '') {
            data = { langId: language, ngr: ngr }
        }
        CommonHelper.ShowLoader();
        $.ajax({
            url: "/" + languageUI + "/Document/GetBody/",
            method: "GET",
            data: data
        }).done(function (result) {
            $(".search-result-container").addClass("search-result-container-half");
            $(".doc-info-right").show();
            $(".doc-info-right").html(result.body);
            CommonHelper.HideLoader();

        });
    }

    //TODO: судебный практикум
    this.SudSearch = function () {
        //$(".ngr-word").val(languageUI === "ru" ? "I" : "Y");
        $(".selectedNpaTypes").val("СУПР");
        $(".form-search-doc").submit();
        DocumentHelper.RefreshFilter();
        return false;
    }

    //TODO: таможенный союз
    this.TSSearch = function () {
        //$(".ngr-word").val("H");
        $(".selectedSections").val("3500");
        $(".form-search-doc").submit();
        DocumentHelper.RefreshFilter();
        return false;
    }

    //TODO: расширенный поиск, выбрать поле
    this.AdvancedSearch = function () {
        $(".isRewriteFilterPanel").val("true");

        //TODO: для фильтров
        DocumentHelper.AddFilterParametrValue();
        DocumentHelper.RefreshFilter();

        $(".form-search-doc").submit();
        return false;
    }

    this.ResetParameters = function () {
        return false;
    }

    this.ErrorMessage = function () {
        $(".selected-error-message").val($("#selectedFullText").val());
        $(".error-document-id").val($("doc-window-1").find(".id").val());
        $("#modalError").modal();
    }

    this.ErrorMessageSubmit = function () {
        $.ajax({
            url: '/' + languageUI + '/Document/Error',
            method: "POST",
            data: { comment: $(".error-comment").val(), documentId: $(".error-document-id").val(), email: $(".error-email").val(), errorMessage: $(".selected-error-message").val() }
        }).done(function (output) {

            $("#modalError").modal('toggle');
            toastr["success"]("Сообщение отправлено");
        });
        return false;
    }

    this.FastCard = function (ngr, dateEdition, language) {
		
        var data = { langId: language, ngr: ngr, dateEdition: dateEdition };
        if (dateEdition == '') {
            data = { langId: language, ngr: ngr }
        }
        CommonHelper.ShowLoader();

        $.ajax({
            url: "/" + languageUI + "/document/card/",
            type: "GET",
            data: { langId: language, ngr: ngr, dateEdition: dateEdition }
        }).done(function (output) {
            $(".search-result-container").addClass("search-result-container-half");
            $(".doc-info-right").show();
            $(".doc-info-right").html(output);
            CommonHelper.HideLoader();

        });
    }

    this.Remove = function () {
        var removeItems = [];
        $(".fav-doc-checkbox").each(function () {
            if ($(this).prop('checked'))
                removeItems.push($(this).val());
        });
        console.info(removeItems);
        $.ajax({
            url: '/' + languageUI + '/Document/RemoveFavorite',
            data: { docs: removeItems },
            method: "POST"
        }).done(function (output) {
            window.location.reload();
        });
    }

    this.ToScrollToStart = function () {
        if ($(".doc-detail").length < 1)
            return false;
        $('body').animate({
            scrollTop: $(".doc-work-space").offset().top - 50
        }, 500);
    }

    this.HideComments = function () {
        $stateHide = $(".hide-comment").attr('state');
        if ($stateHide == 'false') {
            $(".hide-comment").attr('state', 'true');
            $(".body-comment").hide();
            $(".body-bookmark").hide();
            $(".hide-comment").find('i').removeClass('fa-commenting');
            $(".hide-comment").find('i').addClass('fa-commenting-o');
            toastr["success"]("Коментарии и закладки отключены");

        }
        else {
            $(".hide-comment").attr('state', 'false');
            $(".body-comment").show();
            $(".body-bookmark").show();
            $(".hide-comment").find('i').removeClass('fa-commenting-o');
            $(".hide-comment").find('i').addClass('fa-commenting');
            toastr["success"]("Коментарии и закладки включены");
        }
    }

    this.HideCommentsRcpi = function () {
        $stateHide = $(".hide-comment-rcpi").attr('state');
        if ($stateHide == 'false') {
            $(".hide-comment-rcpi").attr('state', 'true');

            $('font[color="#FF0000"]').hide();
            $('font[color="#800000"]').hide();
            $(".hide-comment-rcpi").find('i').removeClass('fa-toggle-on');
            $(".hide-comment-rcpi").find('i').addClass('fa-toggle-off');
            toastr["success"]("Примечания РЦПИ отключены");

        }
        else {
            $(".hide-comment-rcpi").attr('state', 'false');

            $('font[color="#FF0000"]').show();
            $('font[color="#800000"]').show();
            $(".hide-comment-rcpi").find('i').removeClass('fa-toggle-off');
            $(".hide-comment-rcpi").find('i').addClass('fa-toggle-on');
            toastr["success"]("Примечания РЦПИ включены");
        }
    }

    this.CheckTree = function (treeObject, selectedElements) {
        if ($("." + selectedElements).length < 1)
            return false;
        var npaTypes = $("." + selectedElements).val().split(',');
        $.each(npaTypes, function (index, value) {
            var api = $('.' + treeObject).aciTree('api');
            var leaves = $("." + treeObject + " .aciTreeLi");
            var checked = api.checkboxes(leaves, false);
            checked.each(function (index, item) {
                var $item = $(item);
                if (api.getId($item) == value)
                    api.check($item);
            });
        });
    }

    this.ScrollLockClick = function (isToaster) {
        var $scrollBtn = $(".btn-scroll-lock");
        if ($scrollBtn.attr('lock') == 'true') {
            $(".btn-scroll-lock").find("i").removeClass("fa-lock");
            $(".btn-scroll-lock").find("i").addClass("fa-unlock");
            $scrollBtn.attr('lock', false);
            DocumentHelper.SyncScroll(false);
            if (isToaster == undefined)
                toastr["success"]("Режим одновременной прокрутки двух окон отключился");
        }
        else {
            $(".btn-scroll-lock").find("i").addClass("fa-lock");
            $(".btn-scroll-lock").find("i").removeClass("fa-unlock");
            $scrollBtn.attr('lock', true);
            DocumentHelper.SyncScroll(true);
            if (isToaster == undefined)
                toastr["success"]("Режим одновременной прокрутки двух окон включился");
        }
    }

    this.SyncScroll = function (sync) {
        if (sync) $(".btn-scroll-lock").show();
        var isSyncingLeftScroll = sync;
        var isSyncingRightScroll = sync;
        var leftDiv = document.getElementById('doc-body-1');
        var rightDiv = document.getElementById('doc-body-2');
        if (sync) {

            leftDiv.onscroll = function () {
                if (!isSyncingLeftScroll) {
                    isSyncingRightScroll = true;
                    rightDiv.scrollTop = this.scrollTop;
                }
                isSyncingLeftScroll = false;
            }

            rightDiv.onscroll = function () {
                if (!isSyncingRightScroll) {
                    isSyncingLeftScroll = true;
                    leftDiv.scrollTop = this.scrollTop;
                }
                isSyncingRightScroll = false;
            }
        }
        else {
            leftDiv.onscroll = function () {
            }

            rightDiv.onscroll = function () {
            }
        }
    }

    this.CheckTreeLanguages = function (delay) {
        setTimeout(function () {
            DocumentHelper.CheckTree("language-tree", "selectedLanguage")
        }, delay);
    }

    this.CheckTreeNpaTypes = function (delay) {
        setTimeout(function () {
            DocumentHelper.CheckTree("npa-types-tree", "selectedNpaTypes")
        }, delay);
    }

    this.CheckTreeClassifiers = function (delay) {
        setTimeout(function () {
            DocumentHelper.CheckTree("classifiers-tree", "extselectedClassifiers")
        }, delay);
    }

    this.CheckTreeActionRegions = function (delay) {
        setTimeout(function () {
            DocumentHelper.CheckTree("regions-tree", "extselectedRegionActions")
        }, delay);
    }

    //TODO: добавил
    this.CheckTreeInitRegions = function (delay) {
        setTimeout(function () {
            DocumentHelper.CheckTree("initregions-tree", "extselectedRegionInits")
        }, delay);
    }

    this.CheckTreeSources = function (delay) {
        setTimeout(function () {
            DocumentHelper.CheckTree("sources-tree", "extselectedSources")
        }, delay);
    }

    this.CheckTreeSections = function (delay) {
        setTimeout(function () {
            DocumentHelper.CheckTree("sections-tree", "extselectedSections")
        }, delay);
    }

    this.CheckTreeRegAgencies = function (delay) {
        setTimeout(function () {
            DocumentHelper.CheckTree("regagencies-tree", "extselectedRegAgencies")
        }, delay);
    }

    //this.CheckTreeDictionaries = function (delay) {
    //    setTimeout(function () {
    //        DocumentHelper.CheckTree("dictionary-tree", "extselectedRegAgencies")
    //    }, delay);
    //}

    this.SelectRange = function (rangeType) {
        $(".range-type").val(rangeType);
        $(".lastdoc-form").submit();
        return false;
    }

    this.SaveList = function () {
        var total = $(".total").html();
        if (parseInt(total) > 500) {
            alert("Максимальный лимит сохраняемого списка 500 документов. Пожалуйста, сократите список применив дополнительные фильтры.");
        } else {
            if (!authorized) {
                $("#modalLogin").modal();
                return false;
            }
            $(".is-save-list").val('true');
            DocumentHelper.SearchSubmit();

        }
    }

    this.LocationToFavorite = function () {
        if (!authorized) {
            $("#modalLogin").modal();
            return false;
        }
        window.location.href = "/" + languageUI + "/Cabinet/Favorites";
    }

    this.SortClick = function () {

        //Click Sort Icon 
        var desc = $(".desc").val();
        var sortType = $(".sort").val();
        $(".sort-icon").html('');

        if (desc == 'true')
            $('.doc-sort[type="' + sortType + '"]').find(".sort-icon").html(' <i class="fa fa-sort-amount-asc"></i>');
        else $('.doc-sort[type="' + sortType + '"]').find(".sort-icon").html(' <i class="fa fa-sort-amount-desc"></i>');
    }

    this.RemoveTag = function (treeObject, selectedObject, unselectedObject, id) {

        $("." + id).remove();
        if ($("." + unselectedObject).val().indexOf(id) == -1)
            $("." + unselectedObject).val($("." + unselectedObject).val() + id + ',');

        var str = $("." + selectedObject).val();
        $("." + selectedObject).val(str.replace(id + ',', ''));
        var api = $("." + treeObject).aciTree('api');

        api.searchId(true, true, {
            success: function (item, options) {
                api.uncheck(item, null);
            },
            fai: function (item, options) {

            },
            id: id
        });
    }

    this.ShowAllComments = function () {
        $.ajax({
            url: "/" + languageUI + "/Document/CommentsAll?id=" + $(".document-id").val()
        }).done(function (output) {
            $(".comments-container").html(output);
            $(".comments-container").toggle(400);
        });
    }

    //TODO: обновить фильтр
    this.RefreshFilter = function () {
        //$(".selectedRegistered").val($(".extselectedRegistered").val());
        //$(".unselectedRegistered").val($(".extunselectedRegistered").val());

        $(".selectedNpaTypes").val($(".extselectedNpaTypes").val());
        $(".unselectedNpaTypes").val($(".extunselectedNpaTypes").val());

        $(".selectedRegionActions").val($(".extselectedRegionActions").val());
        $(".unselectedRegionActions").val($(".extunselectedRegionActions").val());

        $(".selectedRegionInits").val($(".extselectedRegionInits").val());
        $(".unselectedRegionInits").val($(".extunselectedRegionInits").val());

        $(".selectedRegAgencies").val($(".extselectedRegAgencies").val());
        $(".unselectedRegAgencies").val($(".extunselectedRegAgencies").val());

        $(".selectedClassifiers").val($(".extselectedClassifiers").val());
        $(".unselectedClassifiers").val($(".extunselectedClassifiers").val());

        $(".selectedSources").val($(".extselectedSources").val());
        $(".unselectedSources").val($(".extunselectedSources").val());

        $(".selectedSections").val($(".extselectedSections").val());
        $(".unselectedSections").val($(".extunselectedSections").val());

        return false;
    }

    //TODO:
    this.SearchSubmitClick = function () {
        $(".isRewriteFilterPanel").val("true");

        //TODO: для фильтра
        DocumentHelper.AddFilterParametrValue();

        DocumentHelper.RefreshFilter();
        DocumentHelper.SearchSubmit();
    }

    this.RefreshFilterPanel = function () {
        var formData = $(".form-search-doc").serialize();

        $.ajax({
            url: '/' + languageUI + '/Document/SearchFilter',
            method: 'post',
            data: formData
        }).done(function (filter) {

            //TODO: после результата поиска, первый и второй параметр не трогаем
            DocumentHelper.FilterInsert(filter.languages, 'filter-language', 'language', filter.unselectedLanguage);
            //console.log(filter.languages);
            DocumentHelper.FilterInsert(filter.statuses, 'filter-statuses', 'status-ext', filter.unselectedStatuses);
            //console.log(filter.statuses);

            DocumentHelper.FilterInsert(filter.regionsAction, 'filter-regions', 'region', filter.unselectedRegionActions);
            //console.log(filter.regionsAction);
            DocumentHelper.FilterInsert(filter.classifiers, 'filter-classifiers', 'classifier', filter.unselectedClassifiers);
            //console.log(filter.classifiers);
            
            $(".isRewriteFilterPanel").val("false");
            // $(".filter-container").html(output);

            $('.i-checks').iCheck({
                checkboxClass: 'icheckbox_square-green',
                radioClass: 'iradio_square-green',
            });

            //console.log('start');
            //TODO: сортировка после результата
            CommonHelper.CheckOnSelect('check-language', 'selectedLanguage', 'unselectedLanguage', true, true);
            CommonHelper.CheckOnSelect('check-status-ext', 'selectedStatuses', 'unselectedStatuses', true, true);

            CommonHelper.CheckOnSelect('check-region', 'selectedRegionActions', 'unselectedRegionActions', true, true);
            CommonHelper.CheckOnSelect('check-classifier', 'selectedClassifiers', 'unselectedClassifiers', true, true);
        });

    }

    this.SearchSubmit = function () {
        //$(".search-page").prepend( $(".search-panel").clone());
        if ($('.first-search').length > 0)
            return true;
        $(".find-arrows").hide();

        if ($(".search-context").val() == "2") {
            $(".find-arrows").show();
            $(".find-text").removeClass("find-text");
            var searchString = $(".search-text").val().trim();
            if (searchString == "")
                return false;
            var html = $("#doc-body-1").html();
            $('#findElementPos').val('-1')
            html = html.replaceAll(searchString, '<span class="find-text">' + searchString + '</span>');
            $("#doc-body-1").html(html);
            $("#doc-body-1").scrollTop(0);
            $('#findElementsCoord').val('');
            $("#doc-body-1").find(".find-text").each(function (index, element) {
                $('#findElementsCoord').val($('#findElementsCoord').val() + ($(element).offset().top - 300) + ',');
            });
            DocumentHelper.FindElementRight();
            CommonHelper.HideLoader();
            return false;
        }
        if ($('.second-search').length < 1)
            return false;
        CommonHelper.ShowLoader();

        $('.pagination').html('');
        var formData = $(".form-search-doc").serialize();

        $.ajax({
            url: '/' + languageUI + '/Document/Search',
            method: 'post',
            data: formData
        }).done(function (output) {
            $(".search-result-docs").html(output);
            CommonHelper.HideLoader();
            DocumentHelper.SortClick();
        });

        $.ajax({
            url: '/' + languageUI + '/Document/SearchCount',
            method: 'post',
            data: formData
        }).done(function (output) {
            $(".current-page").val(output.page);
            $(".total-pages").val(output.totalPages);
            $(".total").html(output.total);
            if (output.currentPage == 1)
                toastr["success"]("Поиск выполнен. Результат поиска: " + output.total + " записей");

            $('.pagination').bootpag({
                total: $(".total-pages").val(),
                page: $(".current-page").val(),
                maxVisible: 10,
                leaps: true,
                firstLastUse: true
            }).on('page', function (event, num) {
                $(".current-page").val(num);
                DocumentHelper.SearchSubmit();
            });
        });

        DocumentHelper.RefreshFilterPanel();
        $(".advanced-search").hide("slow");
        return false;
    }

    this.FilterInsert = function (items, containerClassName, itemClassName, unSelectedItems) {
        var unArr = (unSelectedItems != null && unSelectedItems != "") ? unSelectedItems.split(',') : [];

        var isRewrite = $(".isRewriteFilterPanel").val();
        //console.log(isRewrite);
        if (isRewrite == "true") {
            $("." + containerClassName).html("");
        }
        $.each(items, function (index, item) {
            var $countItem = $("." + containerClassName).find(".check-" + itemClassName + "-count-" + item.code);
            //console.log($countItem);
            if ($countItem.length > 0) {
                //console.log($countItem.val);
                $countItem.val(item.count);
                //console.log(item.count);
            }
            else {
                //checked
                var _checked = "checked";
                var ischecked = $.grep(unArr, function (row) { return row == item.code; });
                if (unArr.length > 0 && ischecked.length > 0)
                    _checked = "";
                $("." + containerClassName).append('<label><input type="checkbox" value="' + item.code + '" class="i-checks check-' + itemClassName + '" ' + _checked + ' /> ' + item.nameRu + ' (<span class="check-' + itemClassName + '-count-' + item.code + '">' + item.count + '</span>)</label><br />');
            }
        });
    }

    //TODO: добавил для фильтра
    this.AddFilterParametrValue = function () {
        $.each($(".icheckbox_square-green").find(".check-status-ext"), function (key, value) {
            if (value.parentNode.className.indexOf('checked') >= 0) {
                if ($(".selectedStatuses").val() == '') {
                    $(".selectedStatuses").val(value.value);
                }
                else {
                    if ($(".selectedStatuses").val().equals(value.value) == false)
                    $(".selectedStatuses").val($(".selectedStatuses").val() + ',' + value.value);
                }
            }
        });
        //console.log($(".selectedStatuses").val());

        $.each($(".icheckbox_square-green").find(".check-reg-ext"), function (key, value) {
            if (value.parentNode.className.indexOf('checked') >= 0) {
                if ($(".selectedRegistered").val() == '') {
                    $(".selectedRegistered").val(value.value);
                }
                else {
                    f($(".selectedRegistered").val().equals(value.value) == false)
                    $(".selectedRegistered").val($(".selectedRegistered").val() + ',' + value.value);
                }
            }
        });
        //console.log($(".selectedRegistered").val());

        //TODO: для проверки выбора Региона
        if ($(".search-check-current-region:checked").length > 0) {
            $(".search-check-region").val("true");
            //console.log("true");
        }
        else {
            $(".search-check-region").val("false");
            //console.log("false");
        }

        var search = $(".search-context").val();
        //console.log(search);

        return false;
    }

    this.FindElementRight = function () {
        var arr = $("#findElementsCoord").val().split(',');
        var pos = $("#findElementPos").val();
        pos++;
        $("#findElementPos").val(pos);
        $("#doc-body-1").scrollTop(arr[pos]);

    }

    this.FindElementLeft = function () {
        var arr = $("#findElementsCoord").val().split(',');
        var pos = $("#findElementPos").val();
        pos--;
        $("#findElementPos").val(pos);
        $("#doc-body-1").scrollTop(arr[pos]);

    }
   
    //TODO: Режим 'Чистый лист' для повторное нажатие кнопки возвращает
    this.IsClearPage = false;

    this.ClearPage = function (windowNumber) {

        var $window = $(".doc-window-" + windowNumber);
        //$window.find('.doc-body').css('background-image', 'none');
        var check = $window.find('.body-comment');
        $window.find('.body-comment').remove();
        $window.find('.body-bookmark').remove();
        $window.find('.link-button').remove();
        $window.find('.link-button').remove();
        $window.find('.bookmark-buttons').remove();
        $window.find('.paragraph').removeClass("paragraph");
        $window.find('a').removeAttr("href");
        $window.find('a').find('font').css('color', '#676a6c');
        $window.find('a').find('u').css('text-decoration', 'none');
        $window.find('a').css('cursor', 'text');
        $window.find('.body-links').remove();

    }

    this.ClearPageByMenu = function (windowNumber) {

        if (DocumentHelper.IsClearPage == false) {
            DocumentHelper.IsClearPage = true;
            DocumentHelper.ClearPage(windowNumber);

        } else {
            DocumentHelper.InitSelectEditions(windowNumber);
            DocumentHelper.ToParagraphScroll(windowNumber);
            //DocumentHelper.IsClearPage = false;
            //var $window = $(".doc-window-" + windowNumber);
            //var dateEdition = $window.find('.date-edition').val();
            //var ngr = $window.find('.ngr').val();
            //var lang = $window.find(".lang").val();

            //DocumentHelper.GetBody(windowNumber,ngr,lang,false);
            /*
            DocumentHelper.SetLinkCounts(windowNumber, ngr, lang);
            var $window = $(".doc-window-" + windowNumber);
            var documentId = $window.find('.id').val();
            DocumentHelper.SetCommentsToBody(windowNumber, documentId, true);
            DocumentHelper.SetCommentsToBody(windowNumber, documentId, false);*/
        }
    }

    this.HideLeftMenu = function () {
        $(".show-left-menu").find("i").addClass("fa-reorder");
        $(".show-left-menu").find("i").removeClass("fa-angle-double-right");
        $(".doc-left-menu-hint").animate({
            width: "0px",
            opacity: 0,
        }, 50);
        $(".doc-left-menu-hint").hide();

    }

    this.ShowLeftMenu = function () {

        if ($(".doc-left-menu-hint").css('display') == 'block' || $(".doc-left-menu-hint").css('display') == '') {
            DocumentHelper.HideLeftMenu();
        } else {
            $(".hint-body").hide();
            $(".search-panel").hide();
            $(".doc-info-cont").hide();
            $(".show-left-menu").find("i").removeClass("fa-reorder");
            $(".show-left-menu").find("i").addClass("fa-angle-double-right");
            $(".doc-left-menu-hint").show();
            $(".doc-left-menu-hint").animate({
                width: "300px",
                opacity: 1
            }, 700);
        }

    }

    this.PrintFragment = function () {
        var title = $(".doc-detail-title_").html();
        var mywindow = window.open('', 'PRINT', '');
        mywindow.document.write('<html><head><style type="text/css">@page {    size: A4;    margin: 2cm 2cm 2cm 2cm;   } body {    position: relative;  }  html,  body {    margin: 0cm !important;    width: 190mm;    height: 100%;  }  footer {  border-top: 1px solid black;   display: inline-block; overflow: hidden;  position: fixed;    vertical-align: bottom;   overflow:hidden; margin-top: 20px; padding-top: 10px;  width: 100%;  background: white;  bottom: 0;    }</style><title>' + title + '</title>');
        mywindow.document.write('</head><body><div class="content-block" style="overflow: hidden;"><div style="padding: 10px;border-bottom: 2px solid #000"><div style="padding: 10px;padding-top: 0px;"><h5><i>База Данных "Закон"</i></h5><br/></div></div><h4 align="center">' + title + '</h4>');
        mywindow.document.write($("#selectedFullText").val());
        mywindow.document.write('</div><footer><div>© Республиканский центр правовой информации</div><div> website: http://www.rkao.kz support: support@rkao.kz  тел.: (7172) 57-74-03 , 57-33-63</div></footer>');
        mywindow.document.write('</body></html>');

        mywindow.document.close();
        mywindow.focus();

        mywindow.print();
        mywindow.close();

        return true;
    }

    this.Print = function (windowNumber) {
        $window = $(".doc-window-" + windowNumber);
        var id = $window.find('.id').val();
        $.ajax({
            url: "/" + languageUI + "/Document/GetBodyForPrint/",
            method: "GET",
            async: true,
            data: { documentId: id }
        }).done(function (output) {

            var title = $(".doc-detail-title_").html();
            var mywindow = window.open('', 'PRINT', '');
            mywindow.document.write('<html><head><style type="text/css">@page {    size: A4;    margin: 2cm 2cm 2cm 2cm;   } body {    position: relative;  }  html,  body {    margin: 0cm !important;    width: 190mm;    height: 100%;  }  footer {  border-top: 1px solid black;   display: inline-block; overflow: hidden;  position: fixed;    vertical-align: bottom;   overflow:hidden; margin-top: 20px; padding-top: 10px;  width: 100%;  background: white;  bottom: 0;    }</style><title>' + title + '</title>');
            mywindow.document.write('</head><body><div class="content-block" style="overflow: hidden;">');
            mywindow.document.write(output);
            mywindow.document.write('</div><footer><div>© Республиканский центр правовой информации</div><div> website: http://www.rkao.kz support: support@rkao.kz  тел.: (7172) 57-74-03 , 57-33-63</div></footer>');
            mywindow.document.write('</body></html>');

            mywindow.document.close();
            mywindow.focus();

            mywindow.print();
            mywindow.close();

        });

        return true;
    }

    this.PrintFavorites = function (id) {

        $.ajax({
            url: "/" + languageUI + "/Cabinet/FavoritesForPrint/",
            method: "GET",
            async: true,
            data: { id: id }
        }).done(function (output) {

            var mywindow = window.open('', 'PRINT', '');
            mywindow.document.write('<html><head><style type="text/css">footer {  border-top: 1px solid black;   display: inline-block; overflow: hidden;  position: fixed;    vertical-align: bottom;   overflow:hidden; margin-top: 20px; padding-top: 10px;  width: 100%;  background: white;  bottom: 0;    }</style><title>Избранные документы</title>');
            mywindow.document.write('</head><body><div class="content-block" style="overflow: hidden;"><div style="padding: 10px;border-bottom: 2px solid #000"><div style="padding: 10px;padding-top: 0px;"><h5><i>База Данных "Закон"</i></h5><br/></div></div>');
            mywindow.document.write(output);
            mywindow.document.write('</div><footer><div>© Республиканский центр правовой информации</div><div> website: http://www.rkao.kz support: support@rkao.kz  тел.: (7172) 57-74-03 , 57-33-63</div></footer>');
            mywindow.document.write('</body></html>');

            mywindow.document.close();
            mywindow.focus();

            mywindow.print();
            mywindow.close();

        });

        return false;
    }

    this.ChangeLink = function (string) {
        $window = $(".doc-window-1");

        if (string.indexOf(".htm") > 0)
            return false;
        var link = string.split('#');
        var ngr = link[0];
        var lang = $window.find(".lang").val();

        if (ngr == $window.find('.ngr').val()) {
            DocumentHelper.ToParagraphScroll_(1, link[1]);
            return false;
        }

        $(".modal-link-ngr").val(ngr);
        $(".modal-link-lang").val(lang);
        if (link.length > 1)
            $(".modal-link-paragraph").val(link[1]);
        $.ajax({
            url: "/" + languageUI + "/Document/GetTitle?ngr=" + ngr + "&langId=" + lang
        }).done(function (output) {
            $(".modal-link-title").html(output.title);
        });
        $('#modalLink').modal('toggle');
    }

    this.DownloadPdf = function (windowNumber) {
        $window = $(".doc-window-" + windowNumber);
        var id = $window.find(".id").val();

        window.location.href = '/' + languageUI + '/Document/DownloadPdf?documentId=' + id;
    }

    this.DownloadWord = function (windowNumber) {
        $window = $(".doc-window-" + windowNumber);
        var id = $window.find(".id").val();

        window.location.href = '/' + languageUI + '/Document/DownloadWord?documentId=' + id;
    }

    this.ExportFragmentToPdf = function () {

        var $form = $(".export-fragment-pdf");
        $form.find(".fragmentDocId").val($(".doc-window-1 .id").val());
        $form.find(".text").val($("#selectedFullText").val());
        $form.submit();
    }

    this.ExportFragmentToWord = function () {

        var $form = $(".export-fragment-word");
        $form.find(".fragmentDocId").val($(".doc-window-1 .id").val());
        $form.find(".text").val($("#selectedFullText").val());
        $form.submit();
    }

    this.ToParagraphScroll = function (windowNumber) {

        $window = $(".doc-window-" + windowNumber);
        var paragraph = $window.find(".doc-paragraph-number").val();
        //console.log(paragraph);
        DocumentHelper.ToParagraphScroll_(windowNumber, paragraph);
    }

    this.ToParagraphScroll_ = function (windowNumber, paragraph) {
        setTimeout(
          function () {
              //do something special
              var $window = $(".doc-window-" + windowNumber);
              if (paragraph != '') {
                  $window.find('.doc-body').scrollTop(0);
                  if ($window.find(".bookmark-buttons[paragraph='" + paragraph + "']").length > 0) {
                      $window.find('.doc-body').animate({
                          scrollTop: $window.find(".bookmark-buttons[paragraph='" + paragraph + "']").offset().top - 150
                      }, 2000);
                      var $p = $window.find(".bookmark-buttons[paragraph='" + paragraph + "']").next();

                      if ($p.length > 0) {
                          $p.animate({
                              'background-color': '#E1E5EB',
                              'color': 'black'
                          }, 3000);
                          $p.animate({
                              'background-color': 'white',
                              'color': 'black'
                          }, 1000);
                      }
                  }
              }
          }, 6000);
    }

    this.CloseModal = function () {
    }

    this.OpenLinkOnNewWindow = function () {
        var ngr = $(".modal-link-ngr").val();
        var lang = $(".modal-link-lang").val();
        var paragraph = $(".modal-link-paragraph").val();
        window.open("/" + languageUI + "/Document/Detail?ngr=" + ngr + "&langId=" + lang + "&paragraphNumber=" + paragraph);
    }

    this.OpenLinkOnNearWindow = function () {
        var $window = $(".doc-window-2");
        var ngr = $(".modal-link-ngr").val();
        var lang = $(".modal-link-lang").val();
        var paragraph = $(".modal-link-paragraph").val();

        $window.find(".ngr").val(ngr);
        $window.find(".lang").val(lang);
        $window.find(".doc-paragraph-number").val(paragraph);
        // $window.find(".paragraph").val(paragraph);

        DocumentHelper.InitSelectEditions(2);
        //DocumentHelper.InitSelectLangauges(2, false);

        $(".doc-window").addClass("doc-window-half");
        $window.show();

        $('#modalLink').modal('hide');
        DocumentHelper.ToParagraphScroll(2);
    }

	//TODO: 	
	this.ChangeEditionDate = function (windowNumber) {
		
		CommonHelper.ShowLoader();

        var $window = $(".doc-window-" + windowNumber);
        var date = $window.find(".select-editions").val();      
        $window.find('.date-edition').val(date);
        DocumentHelper.InitSelectLangauges(windowNumber, true);
		
		if ($("#isCompare").val() == 'true') {
			 DocumentHelper.CompareClick();
			/*
			var currIndex=0;
			var date2="";
			$.map($(".doc-window-1").find(".select-editions > option"),function(option,indx){
				 if(date==$(option).val()){
					 currIndex=indx;
					 console.log("option-"+indx+"="+$(option).val());
				 }

				if(currIndex==0){
				  date2=$(option).val();
				}
			});

			if(currIndex>0){
				 console.log("date2-"+currIndex+"="+date2);
				 $(".doc-window-2").find(".select-editions > option").eq(currIndex-1).prop("selected", true);
				 $(".doc-window-2").find('.date-edition').val(date2);
				 DocumentHelper.InitSelectLangauges(2, true);				
			}*/		
        }
		CommonHelper.HideLoader();
    }
	
	//
    this.ChangeLanguage = function (windowNumber, withButtons) {

        var $window = $(".doc-window-" + windowNumber);
        var lang_ = $window.find(".select-languages").val();

        if (windowNumber == 2 && lang_ == null) {
            var lang1 = $(".doc-window-1").find('.lang').val();
            $window.find(".lang").val(lang1);
        } else $window.find(".lang").val(lang_);


        if (windowNumber == 1 && $("#isCompare").val() == 'false' && $('#isTranslate').val()=='false') {
            $(".doc-window-2").find(".lang").val(lang_);
        }

        var dateEdition = $window.find('.date-edition').val();
        var ngr = $window.find('.ngr').val();
        var lang = $window.find(".lang").val();        
        DocumentHelper.GetBody(windowNumber, ngr, lang, dateEdition, withButtons);
		if($("#isCompare").val() == 'true'){
			DocumentHelper.CompareClick();
		}
    }

    this.SpellClick = function (str) {
        $(".search-text").val(str);
        DocumentHelper.SearchSubmit();
        return false;
    }

    this.InitSelectLangauges = function (windowNumber, withButtons) {
        
		var $window = $(".doc-window-" + windowNumber);
		
        if ($window.find('.select-languages').length > 0) {
            var dateEdition = $window.find('.date-edition').val();
            var ngr = $window.find('.ngr').val();
            var lang = $window.find(".lang").val();
            $window.find('.select-languages').html('');

            $.ajax({
                url: "/" + languageUI + "/document/GetByDateEdition",
                method: "GET",
                async: true,
                data: { ngr: ngr, dateEdition: dateEdition, windowNumber: windowNumber }
            }).done(function (languages) {
				
                var languages_ = languages.objects;
                $window_ = $(".doc-window-" + languages.windowNumber);
                $.each(languages_, function (key, value) {
                    var language = value.language;
                    $window_.find('.select-languages').append('<option value="' + language.idInt + '">' + language.nameRu + '</option>')
                });
                $window_.find('.select-languages').val($window_.find(".lang").val());
                DocumentHelper.ChangeLanguage(windowNumber, true)
            });
        }
    }

    this.InitSelectEditions = function (windowNumber) {
		
        var $window = $(".doc-window-" + windowNumber);

        if ($window.find('.select-editions').length > 0) {
            DocumentHelper.ClearPage(windowNumber);
            var lang = $window.find('.lang').val();
            var ngr = $window.find('.ngr').val();
            
			$window.find('.select-editions').html('');
			
            $.ajax({
                url: "/" + languageUI + "/document/GetByLanguage",
                method: "GET",
                async: true,
                data: { ngr: ngr, langId: lang, windowNumber: windowNumber }
            }).done(function (editions) {
				
                var editions_ = editions.objects;
                $.each(editions_, function (key, value) {                  

                    $(".doc-window-" + editions.windowNumber).find('.select-editions').append('<option value="' + value.dateEditionStr + '">Редакция от ' + value.dateEditionStr + '</option>')
                });
				
                if ($("#isCompare").val() == "true") {
					
                    if ($(".doc-window-2").find(".select-editions > option").length > 1) {
                        $(".doc-window-2").find(".select-editions > option").eq($(".doc-window-2").find(".select-editions > option").length - 2).prop("selected", true);
                    }
					
                } else {
					
                    $(".doc-window-" + editions.windowNumber).find(".select-editions").val($(".doc-window-" + editions.windowNumber).find(".date-edition").val())
                }

                DocumentHelper.ChangeEditionDate(editions.windowNumber);
            });
			
        }
    }

	this.InitSelectEditionsOld = function (windowNumber) {
		
        var $window = $(".doc-window-" + windowNumber);

        if ($window.find('.select-editions').length > 0) {

            var lang = $window.find('.lang').val();
            var ngr = $window.find('.ngr').val();
            
			$window.find('.select-editions').html('');
			
            $.ajax({
                url: "/" + languageUI + "/document/GetByLanguage",
                method: "GET",
                async: true,
                data: { ngr: ngr, langId: lang, windowNumber: windowNumber }
            }).done(function (editions) {
				
                var editions_ = editions.objects;
                $.each(editions_, function (key, value) {
                    /*  var d = new Date(value.dateEdition);
                      var curr_date = d.getDate();
                      var curr_month = d.getMonth() + 1;
                      var curr_year = d.getFullYear();*/

                    $(".doc-window-" + editions.windowNumber).find('.select-editions').append('<option value="' + value.dateEditionStr + '">Редакция от ' + value.dateEditionStr + '</option>')
                });
				
                if ($("#isCompare").val() == "true") {
                    if ($(".doc-window-2").find(".select-editions > option").length > 1) {
                        $(".doc-window-2").find(".select-editions > option").eq($(".doc-window-2").find(".select-editions > option").length - 2).prop("selected", true);

                    }
                } else {
                    //$(".doc-window-"+editions.windowNumber).find(".select-editions > option").eq($(".doc-window-"+editions.windowNumber).find(".select-editions > option").length-1).prop("selected",true)
                    //$(".doc-window-"+editions.windowNumber).find(".date-edition").val($(".doc-window-"+editions.windowNumber).find('.select-editions').val());
                    $(".doc-window-" + editions.windowNumber).find(".select-editions").val($(".doc-window-" + editions.windowNumber).find(".date-edition").val())
                }
                DocumentHelper.ChangeEditionDate(editions.windowNumber);
            });

            //$window.find('.select-editions').val($window.find(".date-edition").val());
        }
    }
	
	//TODO: закрыть вторую вкладку
	this.CloseWindow2=function() {
		$docWindow1 = $(".doc-window-1");
		$docWindow2 = $(".doc-window-2");
		$('.compare-div').addClass("hide");

		if($("#isCompare").val() == "true"){
			$(".doc-window").removeClass("doc-window-half");
            $docWindow2.hide();
            $("#isCompare").val(false);
			
			var dateEdition = $docWindow1.find('.date-edition').val();
			var ngr = $docWindow1.find('.ngr').val();
			var lang = $docWindow1.find(".lang").val();        
			DocumentHelper.GetBody(1, ngr, lang, dateEdition, true);
            return false;
		}
		
		$(".doc-window").removeClass("doc-window-half");
        $docWindow2.hide();
        $("#isTranslate").val(false);
		
		$docWindow2.find(".id").val($docWindow1.find(".id").val());
        $docWindow2.find(".ngr").val($docWindow1.find(".ngr").val());
        $docWindow2.find(".lang").val($docWindow1.find(".lang").val());
        return false;	
	}
	
    String.prototype.replaceAll = function (str1, str2, ignore) {
        return this.replace(new RegExp(str1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g, "\\$&"), (ignore ? "gi" : "g")), (typeof (str2) == "string") ? str2.replace(/\$/g, "$$$$") : str2);
    }

    this.SetLinkCounts = function (windowNumber, ngr, lang) {
	
        $.ajax({
            url: "/" + languageUI + "/Document/InputLinksGroup/",
            method: "GET",
            async: true,
            data: { langId: lang, ngr: ngr }
        }).done(function (output) {
			
			if(output==null || output==""){
				//debugger;
				//console.log("SetLinkCounts kate=langId="+lang+"   ngr="+ngr);
				return ;
			}
			
            $.each(output, function (key, value) {
                var $window = $(".doc-window-" + windowNumber);

                var $p = $window.find("a[name='" + value.paragraph + "']").closest('.paragraph');

                var html = $(".link-counts-sample").html();
                $(html).insertAfter($p);
                $p.next().attr('onclick', "DocumentHelper.ShowLinksByParagraph(" + windowNumber + ",'" + ngr + "', '" + lang + "','" + value.paragraph + "')");
                $p.next().find('.link-count').html(value.count);
            });
			
        });
    }

    this.SetCommentsToBody = function (windowNumber, documentId, isBookmark) {
        $.ajax({
            url: "/" + languageUI + "/Document/CommentsJson",
            data: { documentId: documentId, isBookmark: isBookmark }
        }).done(function (comments) {
            $.each(comments, function (key, value) {
                var $window = $(".doc-window-" + windowNumber);
                var commentClass = isBookmark === false ? 'bookmark' : 'comment';
                var $p = $window.find("a[name='" + value.paragraphNumber + "']").parent();
                $p.append('<div class="body-' + commentClass + ' comment-' + value.id + '"><div class="remove-comment" onclick="DocumentHelper.RemoveComment(\'' + windowNumber + '\', \'' + value.id + '\')"><i class="fa fa-remove"></i></div>' + value.comment + '</div>');
            });
        });
    }

    this.RemoveComment = function (windowNumber, commentId) {
        $.ajax({
            url: "/" + languageUI + "/Document/RemoveCommentJson",
            data: { commentId: commentId }
        }).done(function (success) {
            if (success) {
                var $window = $(".doc-window-" + windowаNumber);
                var commentClass = '.comment-' + commentId;
                $window.find(commentClass).remove();
                toastr["success"]("Комментарий успешно удален. ");
            }
            else {
                toastr["error"]("Не получилось удалить коментарий. Попробуйте позднее.");
            }


        });
    }

    this.ShowLinksByParagraph = function (windowNumber, ngr, lang, paragraph) {
        var $window = $(".doc-window-" + windowNumber);
        var $p = $window.find("a[name='" + paragraph + "']").parent();
        if ($p.find('.body-links').length > 0) {
            $p.find('.body-links').remove();
            return false;
        }
        $.ajax({
            url: "/" + languageUI + "/Document/GetLinksByParagraph",
            data: { ngr: ngr, langId: lang, paragraph: paragraph }
        }).done(function (links) {
            var $window = $(".doc-window-" + windowNumber);
            var html = '<div class="body-links"><div class="body-links-title" onclick="return DocumentHelper.HideLinksParagraph(' + windowNumber + ',' + paragraph + ')">Сссылки на абзац</div>';
            var $p = $window.find("a[name='" + paragraph + "']").parent();
            $.each(links, function (key, value) {
                html += '<a onclick="return DocumentHelper.ChangeLink(\'' + value.document.ngr + '#' + value.paragraph + '\')" href="/' + languageUI + '/Document/Detail/?ngr=' + value.document.ngr + '&langId=' + value.document.language.idInt + '&paragraphNumber=' + value.paragraph + '">' + (key + 1) + '. ' + value.document.title + ' (абзац ' + value.paragraph + ')</a><br/>';
            });
            $p.append(html + '</div>');
        });
    }

    this.HideLinksParagraph = function (windowNumber, paragraph) {

        var $window = $(".doc-window-" + windowNumber);
        var $p = $window.find("a[name='" + paragraph + "']").parent();
        if ($p.find('.body-links').length > 0) {
            $p.find('.body-links').remove();
            return false;
        }
    }

    this.AutoHeight = function () {

        var windowH = $(window).height();
        $(".doc-body").css('height', (windowH - 190) + 'px');
        $(".doc-body").css('min-height', (windowH - 190) + 'px');
        $("#page-wrapper").css('min-height', '200px');
    }

    this.GetBody = function (windowNumber, ngr, lang, dateEdition, withButtons) {
        var data = { langId: lang, ngr: ngr, dateEdition: dateEdition };
        if (dateEdition == '') {
            data = { langId: lang, ngr: ngr }
        }
        CommonHelper.ShowLoader();
        $.ajax({
            url: "/" + languageUI + "/Document/GetBody/",
            method: "GET",
            async: true,
            data: data
        }).done(function (result) {

            //TODO:->check status 2 3 
            if (windowNumber == 2) {
                DocumentHelper.Status23(result.status.idInt);
            }

            var output = result.body.replaceAll('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;', '');;
            var $window = $(".doc-window-" + windowNumber);
            var $docBody = $window.find(".doc-body");
            $docBody.html(output);
            if(windowNumber==1) 
			{
				//TODO: prettyTextDiff -кезінде сhanged- данныйлардың кейбіреулерінде стилдері кетіп калады сол себепті косымша буфер колд.
				$(".changedBuffer").html(output);
			}
            $window.find(".id").val(result.id);
            $window.find(".ngr").val(result.ngr);
            $window.find(".lang").val(result.language.idInt);
            $window.find(".dateEdition").val(result.dateEdition);
            CommonHelper.HideLoader();
            DocumentHelper.SyncScroll(true);
            DocumentHelper.AutoHeight();
       
            //$("<div class='comment-buttons'></div><div>").insertBefore($docBody.find("p"));
            //$("</div>").insertAfter($docBody.find("p"));
        });
		
        setTimeout(function () {
            var $window = $(".doc-window-" + windowNumber);
            var $docBody = $window.find(".doc-body");

            if (withButtons) {
               
                $docBody.find("p").each(function (index) {
                    $(this).find("a").each(function (indexA) {

                        if ($(this).attr('name') != null) {
                            var bookmark = $(".bookmark-sample").html();
                            var attr = $(this).attr('name');
                            bookmark = bookmark.replaceAll('paragraph-number=""', 'paragraph-number="' + attr + '"');
                       

                            var nofirst = (indexA > 0 ? 'notfirst' : '');
                            var div = "<div class='bookmark-buttons' " + nofirst + " paragraph='" + attr + "'>" + bookmark + "</div><div class='paragraph'>";
                            div = (indexA > 0 ? '</div>' : '') + div;
                            $(div).insertBefore($(this));
                        }
                    });
                    var html = $(this).html();
                    html = html.replaceAll('<div class="paragraph"></div>', '<div class="paragraph">').replaceAll('<div class="bookmark-buttons" notfirst=""', '</div><div class="bookmark-buttons" ') + '</div>';

                    $(this).html(html);
                });
                $(".paragraph").parent().css('margin-left', '0px');
                $(".paragraph").parent().css('margin-right', '0px');
                $("font").css('margin-left', "20px;").css('overflow', 'hidden   ');
                DocumentHelper.SetLinkCounts(windowNumber, ngr, lang);
                var $window = $(".doc-window-" + windowNumber);
                var documentId = $window.find('.id').val();
                DocumentHelper.SetCommentsToBody(windowNumber, documentId, true);
                DocumentHelper.SetCommentsToBody(windowNumber, documentId, false);

                //TODO: зачем здесь? Думаю при выборе другой редакции документа!
                /*if ($("#isCompare").val() == "true") {
                    DocumentHelper.CompareClick();
                }*/
            }

        },4000);

    }

    this.TelegramAdd = function () {
        $(".telegram-form").show();
        $(".phone-number").inputmask({ "mask": "9(999)999 9999" })
        return false;
    }

    this.DocInfoToggle = function () {
        $(".doc-info-cont").slideToggle();
        DocumentHelper.LeftMenuHintEnabled();
    }

    this.KeyPress = function (e) {
        var keycode;
        if (window.event)
            keycode = window.event.keyCode;
        else if (e)
            keycode = e.which;

        // Mozilla firefox
        //ctrl+F
        if (e.ctrlKey && keycode == 70) {
            DocumentHelper.SearchToggle();
            if (e.preventDefault) {
                e.preventDefault();
                e.stopPropagation();
            }


        }
        //ctrl+M
        if (e.ctrlKey && keycode == 77) {
            DocumentHelper.ShowLeftMenu();
            if (e.preventDefault) {
                e.preventDefault();
                e.stopPropagation();
            }
        }
        //ctrl+K
        if (e.ctrlKey && keycode == 75) {
            DocumentHelper.Card();
            if (e.preventDefault) {
                e.preventDefault();
                e.stopPropagation();
            }
        }
        //ctrl+I
        if (e.ctrlKey && keycode == 73) {
            DocumentHelper.Map();
            if (e.preventDefault) {
                e.preventDefault();
                e.stopPropagation();
            }
        }
        //ctrl+L
        if (e.ctrlKey && keycode == 76) {
            DocumentHelper.Links();
            if (e.preventDefault) {
                e.preventDefault();
                e.stopPropagation();
            }
        }
        //ctrl+Y
        if (e.ctrlKey && keycode == 89) {
            DocumentHelper.MyComments();
            if (e.preventDefault) {
                e.preventDefault();
                e.stopPropagation();
            }
        }
        //ctrl+T
        if (e.ctrlKey && keycode == 84) {
            DocumentHelper.HideComments();
            if (e.preventDefault) {
                e.preventDefault();
                e.stopPropagation();
            }
        }

        //ctrl+R
        if (e.ctrlKey && keycode == 82) {
            DocumentHelper.HideCommentsRcpi();
            if (e.preventDefault) {
                e.preventDefault();
                e.stopPropagation();
            }
        }
        //ctrl+U
        if (e.ctrlKey && keycode == 85) {
            DocumentHelper.MyBookmarks();
            if (e.preventDefault) {
                e.preventDefault();
                e.stopPropagation();
            }
        }
        //ctrl+B
        if (e.ctrlKey && keycode == 66) {
            DocumentHelper.Favotire();
            if (e.preventDefault) {
                e.preventDefault();
                e.stopPropagation();
            }
        }

        //Ctrl+H
        if (e.ctrlKey && keycode == 72) {
            DocumentHelper.History();
            if (e.preventDefault) {
                e.preventDefault();
                e.stopPropagation();
            }
        }

        //Ctrl+G
        if (e.ctrlKey && keycode == 71) {
            DocumentHelper.Audio();
            if (e.preventDefault) {
                e.preventDefault();
                e.stopPropagation();
            }
        }

        //Ctrl+J
        if (e.ctrlKey && keycode == 74) {
            DocumentHelper.Compare();
            if (e.preventDefault) {
                e.preventDefault();
                e.stopPropagation();
            }
        }

        //Ctrl+Shift+K
        if (e.ctrlKey && e.shiftKey && keycode == 75) {
            DocumentHelper.Translate();
            if (e.preventDefault) {
                e.preventDefault();
                e.stopPropagation();
            }
        }
        //Ctrl+Shift+H
        if (e.ctrlKey && e.shiftKey && keycode == 72) {
            DocumentHelper.GoogleTranslate();
            if (e.preventDefault) {
                e.preventDefault();
                e.stopPropagation();
            }
        }
    }

    this.OpenAttDocument = function (href) {

        var id = $(".document-id").val();

        $.ajax({
            url: "/" + languageUI + "/Document/GetAttBody",
            data: { id: id, href: href }
        }).done(function (output) {
            DocumentHelper.ScrollLockClick();
            var $window = $(".doc-window-2");
            $window.find(".doc-body").html(output);
            $window.show();
            $(".doc-window ").addClass("doc-window-half")
        });
    }

    this.SearchToggle = function () {
        $(".search-panel").slideToggle();

    }

    this.ShowBookmarkButtons = function ($object, isShow, isParagraph) {
        if (isShow) {
            $(".bookmark").hide();
            if (isParagraph)
                $object.prev().find(".bookmark").show();
            else
                $object.find(".bookmark").show();
        }
        else {
            if (isParagraph)
                $object.prev().find(".bookmark").hide();
            else
                $object.find(".bookmark").hide();

        }

    }

    this.Init2Windows = function (isShow) {

    }

    this.TextWidth = function () {
	
        var $div = $(".doc-detail");
        if ($("#textWidth").val() == "100") {
            $div.css('width', '80%');
            $("#textWidth").val('80');

        }
        else {
            $div.css('width', '100%');
            $("#textWidth").val('100');
        }

        DocumentHelper.LeftMenuHintEnabled()
    }

    this.FullScreen = function (windowNumber) {
        var isFullScreen = ($("#isFullScreen").val() == 'true');

        if (!isFullScreen) {
            $(".doc-body-container").addClass("full-screen");
            $(".search-panel").hide();
            $(".navbar").hide();
            $(".doc-left-menu-hint").hide();
            toastr["success"]("Режим полного экрана включился");
        }
        else {
            $(".doc-body-container").removeClass("full-screen");
            $(".search-panel").show();
            $(".navbar").show();
            toastr["success"]("Режим полного экрана отключился");
        }

        $("#isFullScreen").val(!isFullScreen);

    }

    this.ShowHintBody = function (newFlag) {
        DocumentHelper.HideLeftMenu();
        var currentFlag = $("#flag").val();
        var displayState = $(".hint-body").css('display');
        $("#flag").val(newFlag);
        if (currentFlag != newFlag) {
            $(".search-panel").hide()
            $(".doc-info-cont").hide()

            $(".hint-body").show();
        }
        if (currentFlag == newFlag) {
            $(".hint-body").hide();

            $("#flag").val('');
        }




    }

    this.Map = function () {
        var $window = $(".doc-window-1");
        $hint = $(".hint-body");
        var id = $(".document-id").val();
        $.ajax({
            url: "/" + languageUI + "/document/map/?id=" + id,
            type: "GET"
        }).done(function (output) {
            $(".hint-body").html(output);
            $(".hint-body").find("a").each(function () {
                var href = $(this).attr('href');
                $(this).removeAttr('href');
                var paragraph = href.split("#");
                $(this).attr('onclick', 'DocumentHelper.ToParagraphScroll_(1,' + paragraph[1] + ')');
            });
            DocumentHelper.ShowHintBody('map');
        });

    }

    this.History = function () {
        var $window = $(".doc-window-1");
        var lang = $window.find('.lang').val();
        var ngr = $window.find('.ngr').val();
        $hint = $(".hint-body");

        $.ajax({
            url: "/" + languageUI + "/document/history/" + lang + "/" + ngr,
            type: "GET"
        }).done(function (output) {
            $(".hint-body").html(output);

            DocumentHelper.ShowHintBody('history');
        });

    }

    this.Card = function () {
        var $window = $(".doc-window-1");
        var lang = $window.find('.lang').val();
        var ngr = $window.find('.ngr').val();
        var dateEdition = $window.find('.date-edition').val();
        $hint = $(".hint-body");
                
        $.post("/" + languageUI + "/document/card/", {
            langId: lang, ngr: ngr, dateEdition: dateEdition
        }, function (output) {

            $(".hint-body").html(output);
            DocumentHelper.ShowHintBody('card');
        });

        //TODO:Кейін караймыз
        //$(".hint-body").load("/" + languageUI + "/document/card/", { langId: lang, ngr: ngr, dateEdition: dateEdition }, function (responseText, textStatus, jqXhr) {
        //    DocumentHelper.ShowHintBody('card');
        //});

        //$.ajax({
        //    url: "/" + languageUI + "/document/card/",
        //    type: "GET",
        //    data: { langId: lang, ngr: ngr, dateEdition: dateEdition }
        //}).done(function (output) {
        //   // $(".hint-body").load('/kk/Document/_Card', {});
        //    $(".hint-body").html(output);
        //    DocumentHelper.ShowHintBody('card');
        //});


    }

    this.MyComments = function (ngr, lang, dateEdition) {
        if (!authorized) {
            $("#modalLogin").modal();
            return false;
        }
        var $window = $(".doc-window-1");

        var documentId = $window.find('.id').val();
        var isBookmark = true;
        var isAll = false;

        $hint = $(".hint-body");

        $.ajax({
            url: "/" + languageUI + "/document/comments/",
            type: "GET",
            data: { documentId: documentId, isBookmark: isBookmark, isAll: isAll }
        }).done(function (output) {
            $(".hint-body").html(output);
            DocumentHelper.ShowHintBody('mycomments');
        });
    }

    this.MyBookmarks = function (ngr, lang, dateEdition) {
        if (!authorized) {
            $("#modalLogin").modal();
            return false;
        }
        var $window = $(".doc-window-1");

        var documentId = $window.find('.id').val();
        var isBookmark = false;
        var isAll = false;

        $hint = $(".hint-body");


        $.ajax({
            url: "/" + languageUI + "/document/bookmarks/",
            type: "GET",
            data: { documentId: documentId, isBookmark: isBookmark, isAll: isAll }
        }).done(function (output) {
            $(".hint-body").html(output);
            DocumentHelper.ShowHintBody('mybookarks');
        });
    }

    //TODO: проверить
    /*this.CompareBtn = function () {
        var dmp = new diff_match_patch();
        var text2 = $(".doc-window-1").find(".doc-body").text();
        var text1 = $(".doc-window-2").find(".doc-body").text();
        dmp.Diff_Timeout = 20;

        var ms_start = (new Date()).getTime();
        var d = dmp.diff_main(text1, text2);
        var ms_end = (new Date()).getTime();
        //dmp.diff_cleanupSemantic(d);

        var ds = dmp.diff_prettyHtml(d);
        $(".doc-window-1").find(".doc-body").html($(ds).html());
        console.info('diff');
        return false;
    }*/

    this.ComparePretty = function (original, change) {

    }

    this.CompareClick = function () {
      
        //TODO: Временно       
        CommonHelper.ShowLoader();
        setTimeout(function () {
            DocumentHelper.ClearPage(1);
            DocumentHelper.ClearPage(2);

            //TODO: пока не нужно
            //var htmlbody1 = $(".doc-window-1").find(".doc-body").html().replaceAll('</p>', 'break').replaceAll('<br>', 'break').replaceAll('<br/>', 'break').replaceAll('<br />', 'break').replaceAll('<p>', '');
            //$(".doc-window-1").find(".doc-body").html($('<p>' + htmlbody1 + '</p>').text().replaceAll('break', '<br/>'));
            //var htmlbody2 = $(".doc-window-2").find(".doc-body").html().replaceAll('</p>', 'break').replaceAll('<br>', 'break').replaceAll('<br/>', 'break').replaceAll('<br />', 'break').replaceAll('<p>', '');
            //$(".doc-window-2").find(".doc-body").html($('<p>' + htmlbody2 + '</p>').text().replaceAll('break', '<br/>'));

            //TODO: сохранить стили
            //var html = $(".doc-window-2").find(".doc-body").html();
			var html=$(".changedBuffer").html();
            $(".changed").html(html);
			
            $("#wrapper").prettyTextDiff({
                cleanup: true,
             });

           
            //var html = $(".diff").html();

            //TODO: пока не нужно
            //var replaceEmpty = $(".diff").html().replaceAll("<br><br>", "<br>").replaceAll("<p></p>", "").replaceAll("<del></del>", "").replaceAll("<ins></ins>","").replaceAll("<p style=\"margin-bottom: 0px;\"></p>", "");
            //$(".diff").html(replaceEmpty);

            //$(".original").html(html);
            //$("#diffElementsCoord").val('');
						
			//TODO: стилiн қалпына келтіру            
            var changedBufferHtml=$(".changedBuffer").html();
            var c1 = $(".changedBuffer").find("p,div,font,a,br");
            var c2 = $(".diff").find("p");
                
            var delinsHtml = $.grep(c2, function (p) {
                return (($(p).html().indexOf("del") != -1) || ($(p).html().indexOf("ins") != -1));
            });
         
            $.map(delinsHtml, function (p) {
				var orgHtml=$(p).html();
				var buff=$(p).html();
				var buff11= $(p).html();

				if(buff!=""){				    

				    //================del
				    var flag = false;
					var del = $(p).find("del");		
					$.map(del,function(d,index){
						
                        if($(d).text().trim()!="")
                           flag=true;							
						buff=buff.replace("<del>"+$(d).text()+"</del>","");						
					});
                   	
					if(flag==true){
						
						$(p).html(buff);
						var	defText=$(p).text();
						
						//console.log("buff="+orgHtml);		
						//console.log("term="+buff);
						//console.log("text="+defText);
						//console.log("=============");
						
						$(p).html(orgHtml);
						
						$.map(c1,function(p2){
							var buff2=$(p2).text().trim();
							if(buff2!=""){
									
								if(buff2.toLowerCase()==defText.toLowerCase().trim()){									
									$(p2).html(orgHtml);																		
								}
							}
						})
						
					}
					
                    //================ins
					var flag2 = false;
					var ins = $(p).find("ins");
					$.map(ins, function (i, index) {

					    if ($(i).text().trim() != "")
					        flag2 = true;
					    buff11 = buff11.replaceAll("<ins> ", "");
					    buff11 = buff11.replaceAll("</ins>", "");
					});

					if (flag2 == true) {

					    $(p).html(buff11);
					    var defText2 = $(p).text();

					    $(p).html(orgHtml);
					    $.map(c1, function (p2) {
					        var buff3 = $(p2).text().trim();
					        if (buff3!="") {

					            if (buff3.toLowerCase() == defText2.toLowerCase()) {
					                $(p2).html(orgHtml);
					            }
					        }
					    })

					}
				}
            });
			
            $(".diff").html($('.changedBuffer').html());
            $('.changedBuffer').html(changedBufferHtml);
          
			DocumentHelper.ClearPage(1);
            DocumentHelper.ClearPage(2);
		    CommonHelper.HideLoader();
		   
            //TODO: пока уберем
            /*$(".diff").find("ins,del").each(function (index, element) {
                var el = $(element).html().trim().replaceAll('\r', '').replaceAll('\t', '').replaceAll('\n', '').replaceAll('&nbsp;', '').replaceAll('<br>', '').replaceAll('<br/>', '').replaceAll('<br />', '');
                if (el != '' && el != '<br>' && el != '<br><br>' && el != '<br>"&nbsp;"<br>' && el != '&nbsp;' && el != '&nbsp;&nbsp;') {
                    var coord = $("#diffElementsCoord").val();
                    if ($(element).offset().top > 0) {
                        coord += ($(element).offset().top - 50) + ',';
                        console.info(element);
                        $("#diffElementsCoord").val(coord);
                    }

                }
            });*/

            /*$(".original").find('del').remove();
            $(".diff").find("ins").remove();*/

            //$(".original").find("del").remove()
        },
            3000);

    }

	//TODO: trim helper 
	this.trimHelper=function(term){
		while(term.indexOf("  ")!=-1){
		  term=term.replace("  "," ");
		}
		term=term.trim();
		return term;
	} 
	 
    //TODO: увеличить весь текст
    this.FontSizeInc = function (windowNumber) {
        var $window = $(".doc-window-" + windowNumber);
        //var $p = $window.find(".doc-body .paragraph");
        var $p = $window.find("#doc-body-" + windowNumber);
        var fontSize = parseInt($p.css("font-size")) + 1;

        $p.css("font-size", fontSize + "px");
        toastr["success"]("Размер шрифта текста увеличен");
    }

    this.FontSizeDec = function (windowNumber) {
        var $window = $(".doc-window-" + windowNumber);
        //var $p=$window.find(".doc-body .paragraph");
        var $p = $window.find("#doc-body-" + windowNumber);
        var fontSize = parseInt($p.css("font-size")) - 1;

        $p.css("font-size", fontSize + "px");
        toastr["success"]("Размер шрифта текста уменьшен");
    }

    this.RightCompare = function () {
        var diffElement = $("#differentElement").val();
        var arr = $("#diffElementsCoord").val().split(',');
        if (diffElement < arr.length)
            diffElement++;
        $("#differentElement").val(diffElement);
        var $window = $(".doc-window-2");
        $window.find('#doc-body-2').animate({
            scrollTop: arr[diffElement] - 150
        }, 500);

    }

    this.LeftCompare = function () {
        var diffElement = $("#differentElement").val();
        if (diffElement > -1)
            diffElement--;
        $("#differentElement").val(diffElement);
        var arr = $("#diffElementsCoord").val().split(',');
        var $window = $(".doc-window-2");
        $window.find('#doc-body-2').animate({
            scrollTop: arr[diffElement] - 150
        }, 500);

    }

    //TODO: Основная функция сравнения
    this.Compare = function () {

        $docWindow2 = $(".doc-window-2");
        $docWindow1 = $(".doc-window-1");

        ///TODO: уже не нужна
        /*if($docWindow1.find(".select-editions > option").length<2) {
            $("#modalMessage").find("h3").html("Уведомление");
            $("#modalMessage").find(".modal-message").html('У данного документа нет других редакции. (База тестовая, не все документы имеются в базе). Для тестирования данного функционала можете перейти на другой документ -> <a href="/ru/Document/Detail?ngr=Z1500000434&langId=1">Тестовый документ</a>');
            $("#modalMessage").modal('toggle');
            return false;
        }*/


        if ($docWindow1.find(".select-editions > option").length < 2) {
            $("#modalMessage").find("h3").html("Уведомление");
            $("#modalMessage").find(".modal-message").html('У данного документа нет других редакции.');
            $("#modalMessage").modal('toggle');
            return false;
        }

        if ($("#isCompare").val() == "true") {
            $('.compare-div').addClass("hide");
            $(".doc-window").removeClass("doc-window-half");
            $docWindow2.hide();
            $("#isCompare").val(false);
            location.reload();
            return false;
        }

        $("#isCompare").val(true);
        DocumentHelper.InitSelectEditions(2);
        //DocumentHelper.InitSelectLangauges(1, false);
        //DocumentHelper.InitSelectLangauges(2, false);

        $(".doc-window").addClass("doc-window-half");
        $docWindow2.show();
        
        //$docWindow2.find(".select-editions").change();
        $("#isCompare").val(true);

        //TODO:
        $('.compare-div').removeClass("hide");

        //TODO: Зачем в других местах вызывать?
        setTimeout(function () {
           DocumentHelper.CompareClick();
        }, 8000);
        toastr["success"]("Режим сравнения документов включен");
    }

    //TODO: Для показа документа на двух языках!
    this.Translate = function () {
		
        $docWindow2 = $(".doc-window-2");
        $docWindow1 = $(".doc-window-1");

        /*if($docWindow1.find(".select-languages > option").length<2) {
            $("#modalMessage").find("h3").html("Уведомление");
            $("#modalMessage").find(".modal-message").html('У данного документа не имеется перевода. (База тестовая, не все документы имеются в базе). Для тестирования данного функционала можете перейти на другой документ -> <a href="/ru/Document/Detail?ngr=V1600014554&langId=1">Тестовый документ</a>');
            $("#modalMessage").modal('toggle');
            return false;
        }*/

        if ($docWindow1.find(".select-languages > option").length < 2) {
            $("#modalMessage").find("h3").html("Уведомление");
            $("#modalMessage").find(".modal-message").html('У данного документа не имеется перевода.');
            $("#modalMessage").modal('toggle');
            return false;
        }

        //TODO: для чего?
        if ($("#isTranslate").val() == "true") {
            $(".doc-window").removeClass("doc-window-half");
            $docWindow2.hide();
            $("#isTranslate").val(false);
            return false;
        }
		
        $("#isTranslate").val(true);     
        $(".doc-window").addClass("doc-window-half");

        var dateEdition1 = $docWindow1.find(".date-edition").val();
        $docWindow2.find(".date-edition").val(dateEdition1);
        $docWindow2.find(".select-editions").val(dateEdition1);
        $docWindow2.find(".select-languages").html($docWindow1.find(".select-languages").html());

        // $docWindow2.find(".select-editions").change();

        $docWindow2.show();

        var lang = $docWindow1.find(".select-languages").val();
        if (lang == "1") {
            $docWindow2.find(".select-languages").val("3");
            $docWindow2.find(".lang").val("3");
        }
        else if (lang == 3) {
            $docWindow2.find(".select-languages").val("1");
            $docWindow2.find(".lang").val("1");
        }
        
		DocumentHelper.InitSelectEditions(2);
        //$docWindow2.find(".select-languages").change();

        //TODO: зачем для двух языков
        //DocumentHelper.ClearPage(1);
        //DocumentHelper.ClearPage(2);
        toastr["success"]("Двухоконный режим включен");

    }

    //TODO: проверка языка документа, только наз делать транскрипцию
    this.Transcription = function (windowNumber) {
        
        var $window = $(".doc-window-" + windowNumber);
        var lang = $window.find(".select-languages").val();
        if (lang == 3) {
            var isLat = $window.find(".isLat").val();
            if (isLat === 'false') {
                var trans = StringHelper.Translit($window.find(".doc-body").html());
                $window.find(".doc-body").html(trans);
                toastr["success"]("Транскрипция на латиницу успешно выполнена");
                $window.find(".isLat").val('true');
            }
            else {
                var ngr = $window.find(".ngr").val();
                var dateEdition = $window.find(".dateEdition").val();
                var lang = $window.find(".lang").val();
                DocumentHelper.GetBody(windowNumber, ngr, lang, dateEdition, false);
                $window.find(".isLat").val('false');
            }
        }
    }

    this.GetAllComments = function (ngr, lang, dateEdition) {

    }

    this.Bookmarks = function (ngr, lang, dateEdition) {

    }

    this.Audio = function () {

        $("#modalAudio").modal('toggle');

        return false;
    }

    this.Favotire = function () {
        if (!authorized) {
            $("#modalLogin").modal();
            return false;
        }
        var $window = $(".doc-window-1");
        var documentId = $window.find(".id").val();
        $.ajax({
            url: "/" + languageUI + "/Document/ToFavorite",
            data: { documentId: documentId }
        }).done(function (output) {
            /*  $("#modalMessage").find("h3").html("Уведомление");
              $("#modalMessage").find(".modal-message").html(output.message);
              $("#modalMessage").modal('toggle');
              */
            if (output.success) {
                $(".button-fav").find("i").removeClass("fa-star-o");
                $(".button-fav").find("i").addClass("fa-star");
            }
            else {
                $(".button-fav").find("i").addClass("fa-star-o");
                $(".button-fav").find("i").removeClass("fa-star");
            }
            toastr["success"](output.message);


        });
    }

    this.GoogleTranslate = function () {
        $("#modalTranslate").modal('toggle');
    }

    this.Links = function () {
        var lang = $('.lang').val();
        var ngr = $('.ngr').val();

        $hint = $(".hint-body");

        $.ajax({
            url: "/" + languageUI + "/document/links/" + lang + "/" + ngr,
            type: "GET"
        }).done(function (links) {
            $(".hint-body").html(links);
            DocumentHelper.ShowHintBody('links');
        });

    }

    this.HintBodyEnabled = function () {
        var pos = $(".doc-left-menu-container").position();
        var w = parseInt($(".doc-left-menu-container").css('width'));
        var mt = parseInt($(".doc-left-menu-container").css('margin-top'));

        if ($(".hint-body").length > 0) {
            $(".hint-body").css('top', parseInt(pos.top) + mt + 'px');
            $(".hint-body").css('left', parseInt(pos.left) + w + 'px');
        }

    }

    this.LeftMenuHintEnabled = function () {
        var pos = $(".doc-left-menu-container").position();
        var w = parseInt($(".doc-left-menu-container").css('width'));
        var mt = parseInt($(".doc-left-menu-container").css('margin-top'));

        if ($(".doc-left-menu-hint").length > 0) {
            $(".doc-left-menu-hint").css('top', parseInt(pos.top) + mt + 'px');
            $(".doc-left-menu-hint").css('left', parseInt(pos.left) + w + 'px');
            $(".hint-body").css('top', parseInt(pos.top) + mt + 'px');
            $(".hint-body").css('left', parseInt(pos.left) + w + 'px');
        }

    }

    this.GetLast = function (href, hrefClassName) {
        if ($(".last-docs").length < 1)
            return false;
        $.ajax({
            url: '/' + languageUI + href
        }).done(function (output) {
            $(".last-docs").html(output);
            $(".last-docs-links").find(".underline").removeClass("underline-active-blue");
            $("." + hrefClassName).addClass("underline-active-blue");
        })
        ;
    }
    
    //TODO:
    this.myIns = -1;
    this.myDel = -1;
    this.EditedData = [];
    this.outerHeight = 0;
    this.type = "";

    this.gotoDiffByType = function (type) {

        var $window = $(".doc-window-1");
        var $window2 = $(".doc-window-2");

        DocumentHelper.ScrollLockClick(false);

        if (DocumentHelper.EditedData.length == 0 || DocumentHelper.type!=type) {
            
            DocumentHelper.type = type;

            var insList = $('.diff').find(type);
            if (insList == "ins") {
                DocumentHelper.EditedData = $.grep(insList, function (el) {
                    return $(el).text().trim() != "";
                });
            } else {

                DocumentHelper.EditedData = $.grep($(".diff").find("p"), function (p) {
                    return ($(p).html().indexOf("del") != -1);
                });

            }
        }
                
        $window.find('.doc-body').scrollTop(0);        
        $window2.find('.doc-body').scrollTop(0);

        if (type == "ins") {

            var insList = DocumentHelper.EditedData;
            DocumentHelper.myDel = -1;
            if (DocumentHelper.myIns <= insList.length) {

                DocumentHelper.myIns++;

                $.map(insList, function (item, indx) {

                    if ($(item).text().trim() != "") {
                        
                        if (DocumentHelper.myIns == indx) {
                            var _height = $(item).outerHeight();
                            DocumentHelper.outerHeight += _height;
                            var _top=($window.find($(item)).offset().top - 200);

                            //----
                            $window.find('.diff').animate({
                                scrollTop: $window.find($(item)).offset().top - 200
                            }, 2000);


                            $window2.find('.doc-body').animate({
                                scrollTop: (_top - DocumentHelper.outerHeight)
                            }, 2000);

                            //----
                            setTimeout(function () {
                                DocumentHelper.ScrollLockClick(false);
                            }, 5000);                         
                            
                        }
                    }
                });


            } else {
                toastr["success"]("Поиск добавленных в документе завершен");
            }

        } else if (type == "del") {
            
            var delList = DocumentHelper.EditedData;
            DocumentHelper.myIns = -1;

            if (DocumentHelper.myDel <= delList.length) {

                DocumentHelper.myDel++;
                $.map(delList, function (item, indx) {

                    if ($(item).text().trim() != "") {

                        if (DocumentHelper.myDel == indx) {

                            var _top = ($window.find($(item)).offset().top - 200);

                            $window.find('.diff').animate({
                                scrollTop: $window.find($(item)).offset().top - 200
                            }, 2000);
                            
                            //----
                            if (indx == 5) {
                                var d = item;
                            }

                            //----
                            var _p = $(item);

                            var searchText = "";

                            if (_p != null && _p.length > 0) {
                                var _inss = $(_p).find('ins').remove();
                                searchText = $(_p).text();

                                if (_inss != null && _inss.length != 0) {
                                    $.map(_inss, function (_ins) {

                                        if ($(_ins).text().trim() != "") {
                                            searchText = searchText.replaceAll("<ins>" + $(_ins).text() + "</ins>", "");
                                        } else {
                                            searchText = searchText.replaceAll("<ins>", "");
                                            searchText = searchText.replaceAll("</ins>", "");
                                        }
                                    });
                                }
                            }
                          

                            if (searchText != null && searchText != "" && searchText.trim() != "") {
                                                              
                                searchText = searchText.trim();
                                var _check = $window2.find('.doc-body').find("p:contains('" + searchText + "')");

                                if (_check != null && _check.length != 0) {
                                    try {
                                        $window2.find('.doc-body').animate({
                                            scrollTop: $window2.find('.doc-body').find("p:contains('" + searchText + "')").offset().top - 200
                                        }, 2000);
                                    } catch (e) {
                                        $window2.find('.doc-body').animate({
                                            scrollTop: _top
                                        }, 2000);
                                    }
                                } else {

                                    $window2.find('.doc-body').animate({
                                        scrollTop: _top
                                    }, 2000);
                                }

                            } else {
                                $window2.find('.doc-body').animate({
                                    scrollTop: _top
                                }, 2000);
                            }

                            //----
                            setTimeout(function () {
                                DocumentHelper.ScrollLockClick(false);
                            }, 5000);

                        }
                    }
                });

            } else {
                toastr["success"]("Поиск удаленных в документе завершен");
            }

        }

    }
}
