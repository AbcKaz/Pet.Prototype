$(function () {

    console.log("login!!!");
    //----esp--------------
    $("#formCertValidation").hide();
    var serializeLogonFormFn = function (formP) {
        //debugger;
        var form = {};
        formP.find("input").each(function () {
            var name = $(this).attr("name");
            if (name) {

                form[name] = $(this).val();
            }
        });
        return form;
    };

    $("#passwordCert").on('keyup', function (e) {
        if (e.keyCode == 13) {
            $("#formLogin").find("#Password").val($('#passwordCert').val());
            fillKeys();

            if ($('.row').hasClass('after-cert-info')) {
                $('.row').removeClass('after-cert-info');
            }

            $("#dlgPasswordModal").modal('toggle');
        }
    });
    $("#btnMenu").click(function () {
        if ($(this).val() == "true") {
            $("#contentMenu").show();
            $(this).val("false");
        } else {
            $("#contentMenu").hide();
            $(this).val("true");

        }
    });

    $('.btn-enter').click(function () {
     
        $('.sign-password').removeClass('input-error');



        if ($('.sign-password').val() == "" || $('.sign-password').val() == null) {
            toastr["error"]('Введите пароль!!!');
            return;
        }

        var model = new FormData();
       
        model.append('Certificate', $('#Certificate').val());
        model.append('Password', '123');
        model.append("UserName", '123456789012');
        model.append("hfKeyAlias", $('#hfKeyAlias').val());
        model.append("hfStoragePath", $('#hfStoragePath').val());
        model.append("hfXmlToSign", $('#hfXmlToSign').val());
        
        $.blockUI({
            message: '<h1 style="margin-top:20px; margin-bottom:10px; font-weight:initial;"><img src="../../Content/images/loading.gif" /> Идет аутентификация...</h1> ', css: { opacity: 1 }
        });

        var isSuceess = signXmlCall(function () {
     
            var myjson = { UserName: $('#signIIN').text(), Password: $('.sign-password').val(), Certificate: $('#Certificate').val() };
            $.ajax({
                url: rootUrl+'Account/LoginCertificate', //'@Url.Action("LoginCertificate", "Account")',
                type: "POST",
                dataType: 'json',
                contentType: "application/json",
                async: false,
                data: JSON.stringify(myjson),
                success: function (data) {
                    if (data.IsError == false) {
                        window.location = rootUrl + "Home/Index";
                        $('.sign-password').removeClass('input-error');
                    }
                    else {

                        toastr["error"](data.ErrorMessage);
                        $('.sign-password').val('');
                        $('.sign-password').addClass('input-error');
                    }
                    $.unblockUI();
                },
                error: function (data) {
                    $.unblockUI();
                }
            });


        }, $("#hfXmlToSign").val());

        if (!isSuceess)
            $.unblockUI();
    })



    //----old
    $("#btnEnterEds").click(function () {

        $("#formCertValidation").hide();
        $.blockUI({
            message: '< h1 > <img src="../../Content/images/loading.gif" /> Идет аутентификация...</h1> ', css: { opacity: 1 }
        });

        var isSuceess = signXmlCall(function () {
            var formData = serializeLogonFormFn($("#formLogin"));
            var model = formData;
            if (model.UserName == "") {
                model.UserName = $('#signIIN').val();
            }

            console.log("my model=", model);

            $.ajax({
                url: '@Url.Action("LogOnCertificate", "Account")',
                type: "POST",
                dataType: 'json',
                contentType: "application/json",
                async: false,
                data: JSON.stringify(model),
                success: function (data) {
                    if (data.success)
                        window.location = data.url;
                    else {
                        $("#formCertValidation").show();
                    }
                    $.unblockUI();
                },
                error: function (data) {
                    $.unblockUI();
                }
            });


        }, $("#hfXmlToSign").val());

        if (!isSuceess)
            $.unblockUI();
    });


    $('#btnbtnChooseEds').on("click", function () {
        if (!crypt_object_init("chooseStoragePath")) {
            chooseStoragePath();
        }
    });

    if (window.location.protocol == "https:") {
        $("#btnEcp").hide();
        $("#registerTag").hide();
    }

    $('.modal').on('shown.bs.modal', function () {
        $(this).find('input:password:visible:first').focus();
    });

    $("#btnAccept").click(function () {
        $("#formLogin").find("#Password").val($('#passwordCert').val());
        fillKeys();           
    });
    $("#btnCancel").click(function () {
        $("#dlgPasswordModal").modal('toggle');
    });
    $('.openDialog').on('click', function (e) {
        e.preventDefault();
        $("< div style = " + '" = ' + "text-align: center;" + ' = "' + " ></br > " + "....</div > ")
            .addClass("dialog")
            .attr("id", $(this)
                .attr("data-dialog-id"))
            .appendTo("body")
            .dialog({
                title: $(this).attr("data-dialog-title"),
                closeText: "",
                close: function () { $(this).remove(); },
                width: 800,
                modal: true
            })
            .load(this.href);
    });
    $(".close").on('click', function (e) {
        e.preventDefault();
        $(this).closest(".dialog").dialog("close");
    });
    $('#accordion').on('hidden.bs.collapse', function () {
        //do something...
    });

    $('#accordion .accordion-toggle').click(function (e) {
        var chevState = $(e.target).siblings("i.indicator").toggleClass('glyphicon-chevron-down glyphicon-chevron-up');
        $("i.indicator").not(chevState).removeClass("glyphicon-chevron-down").addClass("glyphicon-chevron-up");
    });

})