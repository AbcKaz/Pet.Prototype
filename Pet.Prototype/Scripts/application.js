$(function () {

    var qwe = {};
    init();
    bindEventHandler();
    fillCompany();
    fillBank();

    function init() {

        qwe.typedelivery = 1;  //1 avto 2 train
        $('.dp-date-bidding').datepicker({
            weekStart: 1,
            language: "ru"
        });

        $('.dp-date-deadline').datepicker({
            weekStart: 1,
            language: "ru"
        });

        $('.dp-date-delivery').datepicker({
            weekStart: 1,
            language: "ru"
        });
    }

    function bindEventHandler() {

        //----checkbox прод
        $('.byavto').change(function () {
            if (this.checked) {
                qwe.typedelivery = 1;
                $('.bytrain').prop("checked", false);
            } else qwe.typedelivery = -1;
        });

        //----checkbox поку
        $('.bytrain').change(function () {
            if (this.checked) {
                qwe.typedelivery = 2;
                $('.byavto').prop("checked", false);
            } else qwe.typedelivery = -1;
        });

        //----doc sign
        $('.btn-apply').click(function () {

            $.blockUI({ message: '<h1><img src="../../Content/images/ajax-loader.gif"/> Идет формирование отчета для подписи...</h1>', css: { opacity: 1 } });
            $.ajax({
                type: "POST",
                url: rootUrl + "Home/PreDocSign",
                data: { datebidding: $('.inp-bidding').val(), startprice: $('.start-price').val(), margin: $('.margin').val(), datedeadline: $('.inp-deadline').val(), goodsname: $('.goods-name').val(), composition: $('.composition').val(), lotssize: $('.lots-size').val(), lotscount: $('.lots-count').val(), typedelivery: qwe.typedelivery, datedelivery: $('.inp-delivery').val(), paymenttype: $('.select-payment').text() },
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

        //----after sign ok
        $('.btn-success-sign').click(function () {
            window.location = rootUrl + "Home/Announcements?status=1";
        })
    }

    function fillCompany() {

        $.post(rootUrl + 'Home/GetCurrUserCompany', function (data) {

            if (data) {           

                $('.company-name').val(data.JuridicalName);
                $('.company-bin').val(data.BIN);
            }
        });
    }

    function fillBank() {
        $.post(rootUrl + 'Home/GetCurrUserCompanyBank', function (data) {

            if (data) {

                $('.bank-name').val(data.Name);
                $('.bank-iik').val(data.IIK);
                $('.bank-bik').val(data.BIK);
                $('.bank-kbe').val(data.Kbe); 
                $('.bank-account-type').val(data.AccountType);
            }
        });
    }

    //----esp--------------
    function doSign() {
     

        $.blockUI({ message: '<h1><img src="../../Content/images/loading.gif"/> Идет подпись отчета...</h1>', css: { opacity: 1 } });
        var isSuceess = signXmlCall(function () {

            var model = { xmlAuditForm: $("#Certificate").val(), signFio: $('#signFIO').text() };
            var json = { datebidding: $('.inp-bidding').val(), startprice: $('.start-price').val(), margin: $('.margin').val(), datedeadline: $('.inp-deadline').val(), goodsname: $('.goods-name').val(), composition: $('.composition').val(), lotssize: $('.lots-size').val(), lotscount: $('.lots-count').val(), typedelivery: qwe.typedelivery, datedelivery: $('.inp-delivery').val(), paymenttype: $('.select-payment').text(), xmlAuditForm:$("#Certificate").val() };
            $.ajax({             
                type: "POST",
                url: rootUrl + "Home/SignDoc",
                data: JSON.stringify(json), 
                //dataType: 'json',

                contentType: "application/json; charset=utf-8",
                dataType: "text",

                cache: false,
                success: function (data) {
                    data=JSON.parse(data);
                    console.log("resp:", data);
                    if (data.IsSuccess) {
                        $('.doc-no').text(data.docno);
                        $('#dlgFinishModal').modal("show");
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
    $('#accordion').on('hidden.bs.collapse', function () {
        //do something...
    });

    $('#accordion .accordion-toggle').click(function (e) {
        var chevState = $(e.target).siblings("i.indicator").toggleClass('glyphicon-chevron-down glyphicon-chevron-up');
        $("i.indicator").not(chevState).removeClass("glyphicon-chevron-down").addClass("glyphicon-chevron-up");
    });
})