$(document).ready(function () {
    $('input.mask-phone').inputmask('+7(999)999-99-99');

    $(".select2").select2();
    $(".change-user-role").change(function () {
        var role = $(this).val();
        
        if (role == "PARTNER") {
            $(".div-company-info").show();
        }
        else {
            $(".div-company-info").hide();
        }
    });
    
    $(".tree-act-kinds").aciTree({
        ajax: {
            url: '/Nsi/ActKindsGetTree/?withChildrens=false&id='
        },
        checkbox: true
    });

    $('.tree-act-kinds').on('acitree', function (event, api, item, eventName, options) {
        //console.info(eventName);
        if (eventName == 'beforecheck') {
            if ($(".act-kind-item").length > 4) {
                alert("Необходимо выбрать не более 5 пунктов.");
                return false;

            }

        }
        if (eventName == 'checked') {
            var itemData = api.itemData(item);
            if ($(".act-kind-item").length < 5)
                $(".act-kinds").append('<input type="hidden" name="ActKinds[]" class="act-kind-item" value="' + api.getId(item) + '" />');


        }

        if (eventName == 'unchecked') {
            var itemData = api.itemData(item);
            $(".act-kind-item").each(function (elemenet) {
                if ($(this).val() == api.getId(item)) {
                    $(this).remove();
                }
            })

        }
    });
});