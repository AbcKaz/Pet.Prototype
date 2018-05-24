var DictionaryHelper = new function () {

    this.Add = function (id) {
      
        if (!authorized) {
            $("#modalLogin").modal();
            return false;
        }

        $.ajax({
            method: "get",
            url: "/" + languageUI + '/Dictionary/AddToMyDictionary?id=' + id
        }).done(function (output) {
            if (output) {
                $("#btn-" + id).html("<i class='fa fa-remove'></i> Удалить из словаря");
                $("#btn-" + id).attr("onclick", "DictionaryHelper.Remove('"+id+"')");
                toastr["success"]("Слово (термин) добавлен в Ваш личный словарь. Можете просмотреть в личном кабинете ");
            } else {
                $("#btn-" + id).html("Не удалось сохранить.");
            }
        });
    }

    this.Remove = function(id)
    {
          if (!authorized) {
            $("#modalLogin").modal();
            return false;
        }

        $.ajax({
            method: "get",
            url: "/" + languageUI + '/Dictionary/RemoveFromMyDictionary?id=' + id
        }).done(function (output) {
            if (output) {
                $("#btn-" + id).html("<i class='fa fa-plus'></i> Добавить");
                $("#btn-" + id).attr("onclick", "DictionaryHelper.Add('"+id+"')");
                toastr["success"]("Слово (термин) удален из Вашего личного словаря. ");
            } else {
              toastr["error"]("Слово (термин) не удалось удалить из Вашего личного словаря. Попробуйте позднее. ");
            }
        });
    }

    this.ShowDescription = function (id) {
        //$(".dic-item").removeClass("dic-item-active");
        //$("#" + id).addClass("dic-item-active");

        $(".dic-item").find('.dic-title').removeClass("dic-item-active");

        $("#" + id).find('.dic-title').addClass("dic-item-active");

        $(".description-container").html("");
        $.ajax({
            url: "/" + languageUI + "/Dictionary/GetDescription?id=" + id,
            method: "post"
        }).done(function (output) {
            $(".description-container").html(output);
        });
        this.AutoHeight();
    }

    this.AutoHeight = function () {

        var windowH = $(window).height();
        $(".words-container").css('height', (windowH - 150) + 'px');
        $(".words-container-my").css('height', (windowH - 150) + 'px');
        $(".filter-container").css('height', (windowH - 130) + 'px');
        $("#page-wrapper").css('min-height', '200px');
    }
	this.SearchSubmit = function () {
	     if ($(".form-search-dic").length < 1)
	         return false;
	     CommonHelper.ShowLoader();
	     var formData = $(".form-search-dic").serialize();
	     $.ajax({
	         url: '/' + languageUI + '/Dictionary/Index',
	         method: 'post',
	         data: formData
	     }).done(function (output) {
	        
	         $(".words-container").html(output);
	         CommonHelper.HideLoader();

	         $('.pagination').bootpag({
	             total: $(".total-pages").val(),
	             page: $(".current-page").val(),
	             maxVisible: 5
	         }).on('page', function (event, num) {
	             $(".current-page").val(num);
	             DictionaryHelper.SearchSubmit();
	         });

	         //$('.dic-item').first().addClass("dic-item-active");
	         //var id = $('.dic-item-active').attr('id');
	         
	         $('.dic-item').first().find('.dic-title').addClass("dic-item-active");
	         var id = $('.dic-item').first().attr('id');
	     

	         DictionaryHelper.ShowDescription(id);
             //TODO: пока керек емес 
	         //if ($(".current-page").val() == 1)
	         //    toastr["success"]("Поиск выполнен. Результат поиска: " + $(".total").val() + " записей");
	     });

	     $.ajax({
	         url: '/' + languageUI + '/Dictionary/SearchFilter',
	         method: 'post',
	         data: formData
	     }).done(function (filter) {

	         //console.log("filter",filter);
	         DictionaryHelper.FilterInsert(filter.dicTypes, 'filter-dic-types', 'dic-types', filter.unSelectedDicTypes,filter.isByTheme);

	         CommonHelper.HideLoader();

	         if (filter.isByTheme != 7 && filter.isByTheme != 8) {
	           
	             $('.i-checks').iCheck({
	                 checkboxClass: 'icheckbox_square-green',
	                 radioClass: 'iradio_square-green',
	             });
	             //Click filter checkboxes 	       
	             DictionaryHelper.CheckOnSelect('check-dic-types', 'selectedDicTypes', 'unselectedDicTypes', true, true);
	         }
	      });
	     return false;
      
	}

	this.FilterInsert = function (items, containerClassName, itemClassName, unSelectedItems, IsByTheme) {

	    var unArr = (unSelectedItems != null && unSelectedItems != "") ? unSelectedItems.split(',') : [];

	    var isRewrite = $(".isRewriteFilterPanel").val();
	    if (isRewrite == "true") {
	        $("." + containerClassName).html("");
	    }
	    $.each(items, function (index, item) {
	        var $countItem = $("." + containerClassName).find(".check-" + itemClassName + "-count-" + item.code);
	        if ($countItem.length > 0) {
	            $countItem.val(item.count);
	        }
	        else {   //checked
	            var _checked = "checked";
	            var ischecked = $.grep(unArr, function (row) { return row == item.code; });
	            if (unArr.length > 0 && ischecked.length > 0)
	                _checked = "";

	            //TODO: если Тематический словарь или Вопросы-ответы checkbox не надо
	            if (IsByTheme == 7 || IsByTheme==8)
	                $("." + containerClassName).append('<label> ' + item.nameRu + ' (<span class="check-' + itemClassName + '-count-' + item.code + '">' + item.count + '</span>)</label><br />');
	            else if (IsByTheme == 3 || IsByTheme == 4 || IsByTheme == 5)
	                $("." + containerClassName).append('<label> ' + item.nameRu + ' (<span class="check-' + itemClassName + '-count-' + item.code + '">' + item.count + '</span>)</label><br />');
                else
	                $("." + containerClassName).append('<label><input type="checkbox" value="' + item.code + '" class="i-checks check-' + itemClassName + '" ' + _checked + ' /> ' + item.nameRu + ' (<span class="check-' + itemClassName + '-count-' + item.code + '">' + item.count + '</span>)</label><br />');
	        }
	    });
	}

	this.CheckOnSelect = function (checkObject, selectedObject, unselectedObject, isSubmitForm, markedWhenUnselected) {
	    $("." + checkObject).on('ifChecked', function (event) {

	        var unselectedVal = "";
	        var dic_types = $('.filter-dic-types').find("input.check-dic-types:not(:checked)");//.is(":not(:checked)");
	        $.map(dic_types, function (row, indx) {
	            unselectedVal += $(row).val();
	            if (indx != dic_types.length - 1)
	                unselectedVal += ",";
	        });

	        $('.' + selectedObject).val($('.' + selectedObject).val() + event.target.value + ',');

	        $("." + unselectedObject).val(unselectedVal);
	        //var str = $("." + unselectedObject).val();
	        //$("." + unselectedObject).val(str.replace(event.target.value + ',', ''));

	        if (isSubmitForm)
	            //DocumentHelper.SearchSubmit();
	            $(".form-search").submit();
	    });

	    $("." + checkObject).on('ifUnchecked', function (event) {
	        var unselectedVal = "";
	        var dic_types = $('.filter-dic-types').find("input.check-dic-types:not(:checked)");//.is(":not(:checked)");
	        $.map(dic_types, function (row, indx) {
	            unselectedVal += $(row).val();
	            if (indx != dic_types.length - 1)
	                unselectedVal += ",";
	        });

	        $("." + unselectedObject).val(unselectedVal);
	        //if (markedWhenUnselected) {
	        //    $("." + unselectedObject).val($("." + unselectedObject).val() + event.target.value + ',');
	        //}

	        var str = $("." + selectedObject).val();
	        $("." + selectedObject).val(str.replace(event.target.value + ',', ''));

	        if (isSubmitForm)
	            //DocumentHelper.SearchSubmit();
	            $(".form-search").submit();
	    });

	}

    //----
	this.ChangeAlpha = function (alpha) {

    	 $(".search-dic-char").val(alpha);
    	 $(".current-page").val(1);
    	 $(".form-search-dic").submit();

    
    	 //DictionaryHelper.createTree(alpha);
    	 DictionaryHelper.createTreeByAlphabet(alpha);

    }

    var lang = $('.dictionary-lang').val();
    var isbytheme = $('.dictionary-isbytheme').val();

    //TODO: call tree    
    this.createTree = function (isFirst) {
        
        if (isFirst == false) {
            $('.dictionary-tree-search').attr('obj-tree', 1);
            $('.dic-tree-helper2').addClass("hide");
            $('.dic-tree-helper').removeClass("hide");

        } else {

            //----
            $('.dic-tree-helper').empty();
            $('.dic-tree-helper').append('<div class="dictionary-tree aciTree aciTree0" style="opacity:1;"></div>');

            var _height = $(window).height();
            _height = _height - 140;
            $('.dictionary-tree').css({ height: _height });

            var alphabet = "";
            $('.dictionary-tree').aciTree({
                ajax: {
                    async: true,
                    url: '/' + lang + '/dictionary/DictionariesGetTree?isbytheme=' + isbytheme + '&alphabet=' + alphabet + '&id='
                },
                checkbox: false,
                selectable: true,
                itemHook: function (parent, item, itemData, level) {

                }
            });
            
            $('.dictionary-tree').css({ opacity: 1 });
            //DocumentHelper.CheckTreeDictionaries(100);
            //----tree select
            $('.dictionary-tree').on('acitree', function (event, api, item, eventName, options) {
                if (eventName == 'selected') {

                    var itemData = api.itemData(item);
                    //console.log(itemData);
                    DictionaryHelper.DictionaryText(itemData.id, itemData.isbytheme);
                }
            });

        

        }
    }
    this.createTree(true);

    this.createTreeByAlphabet = function (alphabet) {
        
        //----
        $('.dictionary-tree-search').attr('obj-tree', 2);
        $('.dic-tree-helper').addClass("hide");
        $('.dic-tree-helper2').removeClass("hide");
        $('.dic-tree-helper2').empty();
        $('.dic-tree-helper2').append('<div class="dictionary-tree2 aciTree aciTree0"></div>');

        var _height = $(window).height();
        _height = _height - 140;
        $('.dictionary-tree2').css({ height: _height });

        $('.dictionary-tree2').aciTree({
            ajax: {
                async: true,
                url: '/' + lang + '/dictionary/DictionariesGetTree?isbytheme=' + isbytheme + '&alphabet=' + alphabet + '&id='
            },
            checkbox: false,
            selectable: true,
            itemHook: function (parent, item, itemData, level) {

            }
        });
    }
    /*
    //---
    var openAll = function () {
        var api = $('.dictionary-tree').aciTree('api');
        var rootChildren = api.children(null);
        var inodes = api.inodes(rootChildren);
        inodes.each(function () {
            // open this node
            api.open($(this), {
                expand: true // to open his childrens too
            });
        });
    };

    var closeAll = function () {
        var api = $('.dictionary-tree').aciTree('api');
        var rootChildren = api.children(null);
        var inodes = api.inodes(rootChildren);
        inodes.each(function () {
            // open this node
            api.close($(this), {
                collapse: true // to close his childrens too
            });
        });
    };*/

    //----
    this.DictionaryText = function (code, isbytheme) {

        $.post('/' + lang + '/dictionary/DictionaryDescripton', { code: code, isbytheme:isbytheme}, function (data) {
            $('.description-container').html(data);
        });

    }

    //TODO: по другому надо писать!!!! 
    $('.link-to-document').on("click", "a", function (event) {

        event.preventDefault();
        var hrefArr = $(this).attr('href').split("#");
        var url = location.protocol + "//" + location.host;
        var langIdDoc = 1;
        if (lang == "kk")
            langIdDoc = 3;
        url = url + "/" + languageUI + "/Document/Detail?ngr=" + hrefArr[0] + "&langId="+langIdDoc+"&paragraphNumber=" + hrefArr[1];
        //url = url + "/ru/Document/Detail?ngr=" + hrefArr[0] + "&langId=1&paragraphNumber=" + hrefArr[1];
        window.open(url, '_blank');
        return;
    });


    //TODO: почему язык ru?
    this.searchText = function (term) {

        CommonHelper.ShowLoader();
        $.post("/ru/dictionary/DictionariesGetTreeSearch", { isbytheme: 7, id: null, search: term }, function (data) {

            CommonHelper.HideLoader();

            $('.dic-tree-helper').empty();
            $('.dic-tree-helper').append('<div class="dictionary-tree aciTree aciTree0" ></div>');   //style="opacity:0;"

            setTimeout(function () {

                var _height = $(window).height();
                _height = _height - 140;
                $('.dictionary-tree').css({ height: _height });

                $('.dictionary-tree').aciTree({
                    ajax: {
                        url: '/' + lang + '/dictionary/DictionariesGetTreeSearch?isbytheme=' + isbytheme + '&id='
                    },
                    // dataSource: rootData, // a list of data sources to be used (each entry in `aciTree.options.ajax` format)
                    rootData: data,
                    checkbox: false,
                    selectable: true,
                    itemHook: function (parent, item, itemData, level) {

                    }
                });

            }, 1000);

        });

    }

    //TODO: поиск дерево
    this.SearchTree2 = function (searchInputClass, treeObject) {

        var searchText = $('.' + searchInputClass).val();
        var api = $('.' + treeObject).aciTree('api');
        var isOpened = $("." + treeObject + "-is-opened").val();

        if (isOpened == 'false') {
            $("." + treeObject + "-is-opened").val('true');
            var leaves = $("." + treeObject + " .aciTreeLi");

            var checkboxes = api.inodes(leaves, false);
            checkboxes.each(function (index, item) {
                var $item = $(item);
                if (api.isInode($item) == true) {
                    api.open($item, { expand: true });
                    // branch
                }
            });
        }

        api.filter(null, {
            search: searchText
        });
    }

}

