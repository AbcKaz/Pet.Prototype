var CommonHelper=new function() {

    this.VersionForVisImpaired = function () {
       
        if ($('body').hasClass("vvi"))
            $('body').removeClass("vvi");
        else {
            $('body').addClass("vvi");
        }
    }

    this.HandleChange=function(checkbox) {
        $(checkbox).val(checkbox.checked);
    }

    //TODO: поиск дерево
    this.SearchTree=function(searchInputClass,treeObject) {
        var searchText=$('.'+searchInputClass).val();
        var api=$('.'+treeObject).aciTree('api');
        var isOpened=$("."+treeObject+"-is-opened").val();

        if(isOpened=='false') {
            $("."+treeObject+"-is-opened").val('true');
            var leaves=$("."+treeObject+" .aciTreeLi");

            var checkboxes=api.inodes(leaves,false);
            checkboxes.each(function(index,item) {
                var $item=$(item);
                if(api.isInode($item)==true) {
                    api.open($item,{ expand: true });
                    // branch
                }
            });
        }

        api.filter(null,{
            search: searchText
        });
    }

    this.SearchTreeByThemetic = function (searchInputClass, treeObject, e) {
        var type = "";
        if ($(e).attr('obj-tree') == 2)
        {
            treeObject = treeObject + "2";
        }

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

    this.ChooseRegion=function() {
        if($(".region-container").css("display")=="none") {
            $(".region-container").show();
        } else {
            $(".region-container").hide();
        }
        return false;
    }

    this.ShowLoader=function() {
        $(".loader-container").show();
    }

    this.HideLoader=function() {
        $(".loader-container").hide();
    }

    this.MessageShow=function(status,title,message) {
        toastr[status](message,title);
    }

    this.InitMessage=function() {
        var $messages=$("div.message");
        $.each($messages,function(index,element) {
            var status=$(this).attr("status");
            var title=$(this).find(".title").val();
            var body=$(this).find(".body").val();
            CommonHelper.MessageShow(status,title,body);
        });
    }

    this.CheckOnSelect = function (checkObject, selectedObject, unselectedObject, isSubmitForm, markedWhenUnselected) {

        //console.log(checkObject);
        //console.log(selectedObject);
        //console.log(isSubmitForm);
        //console.log(markedWhenUnselected);

        $("."+checkObject).on('ifChecked',function(event) {

            $('.'+selectedObject).val($('.'+selectedObject).val()+event.target.value+',');

            var str=$("."+unselectedObject).val();
            $("."+unselectedObject).val(str.replace(event.target.value+',',''));

            if(isSubmitForm)
                //DocumentHelper.SearchSubmit();
                $(".form-search").submit();
        });

        $("."+checkObject).on('ifUnchecked',function(event) {
            if(markedWhenUnselected) {
                $("."+unselectedObject).val($("."+unselectedObject).val()+event.target.value+',');
            }
            var str=$("."+selectedObject).val();
            $("."+selectedObject).val(str.replace(event.target.value+',',''));

            if(isSubmitForm)
                //DocumentHelper.SearchSubmit();
                $(".form-search").submit();
        });
    }

    this.ToChecked = function (checkObject, selectedObject) {
        //console.log(checkObject);
        //console.log(selectedObject);
        if($("."+selectedObject).val()!="") {
            $("."+checkObject).each(function() {
                if ($("." + selectedObject).val().indexOf($(this).val()) >= 0) {
                    $(this).attr("checked",true);
                    $(this).iCheck({
                        checkboxClass: 'icheckbox_square-green',
                        radioClass: 'iradio_square-green',
                    });

                }
            });
        }
    }

    this.AciOnSelect=function(treeObject,selectedObject,unselectedObject) {
        $('.'+treeObject).on('acitree',function(event,api,item,eventName,options) {
            if (eventName == 'checked') {
                //console.log(treeObject);
                //console.log(selectedObject);
                //console.log(unselectedObject);
                var itemData=api.itemData(item);
                if($("."+selectedObject).val().indexOf(api.getId(item)+',')==-1)
                    $('.'+selectedObject).val($('.'+selectedObject).val()+api.getId(item)+',');

                var str=$("."+unselectedObject).val();
                $(".selected-div").append("<div class='selected-div-item "+api.getId(item)+"' onclick=\"DocumentHelper.RemoveTag('"+treeObject+"','"+selectedObject+"','"+unselectedObject+"', '"+api.getId(item)+"')\">"+item[0].innerText+"<i class='fa fa-remove'></i></div>")
                $("."+unselectedObject).val(str.replace(api.getId(item)+',',''));

            }
            if(eventName=='unchecked') {
                var itemData=api.itemData(item);
                DocumentHelper.RemoveTag(treeObject,selectedObject,unselectedObject,api.getId(item));
                //console.info(api.getId(item));
                //console.info($("."+unselectedObject).val().indexOf(api.getId(item)));
                if($("."+unselectedObject).val().indexOf(api.getId(item))==-1)
                    $("."+unselectedObject).val($("."+unselectedObject).val()+api.getId(item)+',');

                var str=$("."+selectedObject).val();
                $("."+selectedObject).val(str.replace(api.getId(item)+',',''));

                $items=$("."+api.getId(item));
                $items.remove();
            }
        });
    }  
}