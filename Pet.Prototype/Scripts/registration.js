
//----general func
function nextTab(elem) {
    $(elem).next().find('a[data-toggle="tab"]').click();
}
function prevTab(elem) {
    $(elem).prev().find('a[data-toggle="tab"]').click();
}

$(document).ready(function () {

    var qwe = {};
    init();
    bindEventHandler();

    function init() {
        qwe.role = -1;

        $('.dp-dateopen').datepicker({
            weekStart: 1,
            language: "ru"
        });

        //if ($('#UserIsExist').val() == "1") {
          
        //}
    }

    function bindEventHandler() {
        //----access tab
        $('li.reg-li').click(function (event) {

            if ($(this).hasClass('disabled')) {
                // event.stopPropagation();
                return;
            }
        });

        //-----bank rek add
        $('.btn-bankRek').click(function () {
            console.log("bank add rek...");
            $("#dlgBankRModal").modal('show');
        });

        //======================bank window
        //----отмена
        $('.btn-bank-close').click(function () {
            $("#dlgBankRModal").modal('toggle');
        });

        //----добавить
        $('.btn-bank-add').click(function (event) {

            //----пр бик
            if (CheckBankFields()) {
                addBank();
                $("#dlgBankRModal").modal('toggle');
            } else {
                toastr["error"]("Заполните все обязательные поля");
            }

        });

        //-----
        $('.org-next').click(function () {

            var flag = true;
            var arr = ['.juridical-address', '.fact-address'];
            for (var i = 0; i < arr.length; i++)
                if (IsEmpty(arr[i])) {
                    flag = false;
                    break;
                }

            //----check roles
            if (qwe.role == -1)
                flag = false;

            //----check banks
            var check_bank = $('.reg-bank-table tr');
            if (check_bank.length < 2) {
                flag = false
            }

            //----пр бик
            if (flag) {

                //----
                var $active = $('.wizard .nav-tabs li.active');
                $active.next().removeClass('disabled');
                nextTab($active);

            } else {
                toastr["error"]("Заполните все обязательные поля");
            }

        })

        //----checkbox прод
        $('.seller').change(function () {
            if (this.checked) {
                qwe.role = 2;
                $('.buyer').prop("checked", false);
            } else qwe.role = -1;
        });

        //----checkbox поку
        $('.buyer').change(function () {
            if (this.checked) {
                qwe.role = 3;
                $('.seller').prop("checked", false);
            } else qwe.role = -1;
        });


        //================================Регистрационные данные сотрудника
        $('.user-next').click(function () {
            var flag = true;
            var arr = ['.user-position', '.password', '.password-confirmed', '.mobile-phone'];
            for (var i = 0; i < arr.length; i++)
                if (IsEmpty(arr[i])) {
                    flag = false;
                    break;
                }

            //----пр бик
            if (flag) {

                //----
                var $active = $('.wizard .nav-tabs li.active');
                $active.next().removeClass('disabled');
                nextTab($active);

            } else {
                toastr["error"]("Заполните все обязательные поля");
            }
        })


        //================================Соглашение о пользовании
        $('.btn-reg-finish').click(function () {

            var flag = $('.reg-accept').is(':checked');

            if (flag) {

                //----
                SaveUser();

            } else {
                toastr["error"]("Заполните все обязательные поля");
            }
        })

        //-----
        $('.btn-reg-success-ok').click(function () {
            window.location.href = rootUrl + 'Account/Login';
            $('#dlgFinishModal').modal("toggle");
        });
    }

    //----
    function addBank() {
        var _table = $('.reg-bank-table');
        var _table_trs = $('.reg-bank-table tbody>tr');
        var rowid = _table_trs.length;

        var row = '<tr rowid=' + rowid + '>' +
            '<td><span class="span-bank-name">' + $('.bank-name').find('option:selected').text() + '</span></td>' +
            '<td><span class="span-bank-bik">' + $('.bank-bik').val() + '</span></td>' +
            '<td><span class="span-bank-address">' + $('.bank-address').val() + '</span></td>' +
            '<td><span class="span-bank-iik">' + $('.bank-iik').val() + '</span></td>' +
            '<td><span class="span-bank-kbe">' + $('.bank-kbe').val() + '</span></td>' +
            '<td><span class="span-bank-schet">' + $('.bank-schet').val() + '</span></td>' +
            '<td><span class="span-dateopen">' + $('.dateopen').val() + '</span></td>' +
            '<td><span class="span-bank-currency">' + $('.bank-currency').find('option:selected').text() + '</span></td>' +
            '</tr>';

        _table.append(row);
    }

    //----check bank 
    function CheckBankFields() {
        var flag = true;
        var arr = ['.bank-bik', '.bank-address', '.bank-iik', '.bank-kbe', '.bank-schet', '.dateopen'];
        for (var i = 0; i < arr.length; i++)
            if (IsEmpty(arr[i])) {
                flag = false;
                break;
            }
        return flag;
    }

    //----checker function 
    function IsEmpty(fieldKey) {
        var flag = false;
        if ($(fieldKey).val() == "" || $(fieldKey).val() == null) {
            flag = true;
        }
        return flag;
    }

    function SaveUser() {

        var arrFio = $('#signFIO2').val().split(' ');
        var lastname = arrFio[0];
        var firstname = arrFio[1];
        var secondname = "";
        if (arrFio.length == 3) {
            secondname = arrFio[2];
        }

        if ($('#IsExistCompany').val() == "exist") {

            $.post(rootUrl + 'Account/SaveExistCompanyUser', {
                email: $('#signEmail').val(),
                lastname: lastname,
                firstname: firstname,
                secondname: secondname,
                iin: $('#signIIN').val(),
                password: $('.password').val(),
                mobilephone: $('.mobile-phone').val(),
                extraphone: '',
                workphone: $('.work-phone').val(),
                userposition: $('.user-position').val(),
                role: qwe.role,
                juridicalname: $('#signCompanyName').val(),
                bin: $('#signBIN').val()
            }, function (data) {

                console.log("inserted data=", data);
                if (!data.IsError) {
                    $('#dlgFinishModal').modal("show");
                }
            });
        }
        else {
            $.post(rootUrl + 'Account/SaveRegister', {
                email: $('#signEmail').val(),
                lastname: lastname,
                firstname: firstname,
                secondname: secondname,
                iin: $('#signIIN').val(),
                password: $('.password').val(),
                mobilephone: $('.mobile-phone').val(),
                extraphone: '',
                workphone: $('.work-phone').val(),
                userposition: $('.user-position').val(),
                role: qwe.role,
                juridicalname: $('#signCompanyName').val(),
                bin: $('#signBIN').val(),
                juridicaladdress: $('.juridical-address').val(),
                factaddress: $('.fact-address').val(),
            }, function (data) {

                console.log("inserted data=", data);
                if (!data.IsError) {

                    var trRows = $('.reg-bank-table tr');
                    $.map(trRows, function (row, indx) {

                        if (indx > 0) {
                            $.post(rootUrl + "Account/SaveBank", {
                                userid: data.Id,
                                name: $(row).find('span.span-bank-name').text(),
                                bik: $(row).find('span.span-bank-bik').text(),
                                iik: $(row).find('span.span-bank-iik').text(),
                                kbe: $(row).find('span.span-bank-kbe').text(),
                                accounttype: $(row).find('span.span-bank-schet').text(),
                                opendate: $(row).find('span.span-dateopen').text(),
                                accountcurrency: $(row).find('span.span-bank-currency').text(),
                                address: $(row).find('span.span-bank-address').text()
                            }, function (data) {

                                if ((trRows.length - 1) == indx) {
                                    $('#dlgFinishModal').modal("show");
                                }

                            });
                        }

                    });

                }
            });
        }
    }


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

        //----
        //checkCompany();
     
        $("#dlgPasswordModal").modal('toggle');
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

});
