$(function () {

    var qwe = {};
    init();
    bindEventHandler();
    //fillCompany();
    //fillBank();
    getBuyerCompany();
    fillAnnouncement();
    getBanks();

    function init() {
        qwe.aid = getUrlParameter("aid");
        qwe.uid = $('.user-id').val();

        console.log("aid=" + qwe.aid);
        console.log("uid=" + qwe.uid);
        $('.dp-date-application').datepicker({
            weekStart: 1,
            language: "ru"
        });
    }

    function bindEventHandler() {

        //----
        $('.select-bank').change(function () {
            var id = $(this).val();
            console.log("bank id=" + id);
            var rows = $.grep(qwe.bankData, function (row) {
                return row.Id == id;
            });

            if (rows.length > 0) {
                fillBank(rows[0]);
            }
        });

        $('.inp-file').change(function () {           
            
            var file = $(this)[0].files[0]
            $('.filename').text(file.name);
            $('.row').find('div.apply-div').removeClass('hide');
        });

        //----
        $('.btn-aplly').click(function () {

            $.blockUI({ message: '<h1><img src="../../Content/images/ajax-loader.gif"/> Идет формирование отчета для подписи...</h1>', css: { opacity: 1 } });
            $.ajax({
                type: "POST",
                url: rootUrl + "Home/PerApplyDoc",
                data: { buyername: $('.buyer-juridicalname').text(), buyerbin: $('.buyer-bin').text(), announcementid: qwe.aid, sellerno: $('.announcement-no').text(), sellerstartprice: $('.start-price').text(), sellerdeliverytype: $('.delivery-type').text(), bankaccountid: $('.select-bank').val(), bankwarranty: $('.select-bankwarranty').text() },                
                dataType: 'json',
                cache: false,
                success: function (data) {
                    $.unblockUI();
                    if (data.IsSuccess) {
                        console.log("data", data);
                        console.log("xml=", data.preambleXml);
                        $("#hfXmlToSign").val(data.preambleXml);
                        $("#hfCurrentBin").val(data.Bin);

                        if (!crypt_object_init("chooseStoragePath")) {
                            chooseStoragePath();
                        }
                    }
                },
                error: function (data) {
                    $.unblockUI();
                }
            });
        });
    }

    function getBuyerCompany() {

        if (qwe.uid == "" || qwe.uid == null)
            return;

        $.post(rootUrl + 'Home/GetUserCompany', { uid: qwe.uid }, function (data) {
            $('.buyer-juridicalname').text(data.JuridicalName);
            $('.buyer-bin').text(data.BIN);
        });
    }

    function fillAnnouncement() {
        $.post(rootUrl + 'Home/GetAnnouncement', { id: qwe.aid }, function (data) {

            if (data) {

                $('.announcement-no').text(data.No);
                $('.start-price').text(data.StartPrice);

                if (data.TypeDelivery == 1)
                    $('.delivery-type').text('Авто');

                if (data.TypeDelivery == 2)
                    $('.delivery-type').text('ЖД');
                

            }
        });
    }

    function getBanks() {

        if (qwe.uid == "" || qwe.uid == null)
            return;

        $.post(rootUrl + 'Home/GetBanksByUserId', { uid: qwe.uid }, function (data) {
            qwe.bankData = data;
            $.map(data, function (item,indx) {
                $('.select-bank').append('<option value="' + item.Id + '">' + item.Name + '</option>');
                if (indx == 0) {
                    fillBank(item);
                }
            });

            //$('.bank-name').val(data.Name);
            //$('.bank-iik').val(data.IIK);
            //$('.bank-bik').val(data.BIK);
            //$('.bank-kbe').val(data.Kbe);
            //$('.bank-account-type').val(data.AccountType);

        });
    }

    function fillBank(item) {
        $('.bank-address').val(item.Address);
        $('.bank-iik').val(item.IIK);
        $('.bank-bik').val(item.BIK);
        $('.bank-kbe').val(item.Kbe);
        $('.bank-account-type').val(item.AccountType);
        $('.bank-open-date').val(item.OpenDate);
    }

    function getUrlParameter(sParam) {
        var sPageURL = decodeURIComponent(window.location.search.substring(1)),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;

        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');

            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : sParameterName[1];
            }
        }
    };

    //----esp--------------
    function doSign() {


        $.blockUI({ message: '<h1><img src="../../Content/images/loading.gif"/> Идет подпись отчета...</h1>', css: { opacity: 1 } });
        var isSuceess = signXmlCall(function () {

            var model = { xmlAuditForm: $("#Certificate").val(), signFio: $('#signFIO').text() };
            var json = { buyername: $('.buyer-juridicalname').text(), buyerbin: $('.buyer-bin').text(), announcementid: qwe.aid, sellerno: $('.announcement-no').text(), sellerstartprice: $('.start-price').text(), sellerdeliverytype: $('.delivery-type').text(), bankaccountid: $('.select-bank').val(), bankwarranty: $('.select-bankwarranty').text(), xmlAuditForm: $("#Certificate").val() };
            $.ajax({
                type: "POST",
                url: rootUrl + "Home/SignApplyDoc",
                data: JSON.stringify(json),
                //dataType: 'json',

                contentType: "application/json; charset=utf-8",
                dataType: "text",

                cache: false,
                success: function (data) {
                    data = JSON.parse(data);
                    console.log("resp:", data);
                    if (data.IsSuccess) {
                        window.location = rootUrl + "Home/ApplyToAnnouncementView?oid=" + data.item.Id;
                    }
                    else {
                        toastr["error"](data.ErrorMessage);
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
    }

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
        fillKeySign(doSign);
        $("#dlgPasswordModal").modal('toggle');
    });


    $("#btnCancel").click(function () {
        $(this).closest('div.modal').modal('toggle');
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

});