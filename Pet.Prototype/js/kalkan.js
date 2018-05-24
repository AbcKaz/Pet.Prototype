$(document).ready(function () {
    // Show hide popover
    $(".dropdown").click(function () {
        $(this).find(".dropdown-menu").slideToggle("fast");
    });
});
$(document).on("click", function (event) {
    var $trigger = $(".dropdown");
    if ($trigger !== event.target && !$trigger.has(event.target).length) {
        $(".dropdown-menu").slideUp("fast");
    }
});

$(function () {
    autosize($('textarea'));
    skinChanger();
    activateNotificationAndTasksScroll();

    setSkinListHeightAndScroll();
    setSettingListHeightAndScroll();
    $(window).resize(function () {
        setSkinListHeightAndScroll();
        setSettingListHeightAndScroll();
    });
    $('.js-basic-example').DataTable({
        language: {
            "processing": "Подождите...",
            "search": "Поиск:",
            "lengthMenu": "Показать _MENU_ записей",
            "info": "Записи с _START_ до _END_ из _TOTAL_ записей",
            "infoEmpty": "Записи с 0 до 0 из 0 записей",
            "infoFiltered": "(отфильтровано из _MAX_ записей)",
            "infoPostFix": "",
            "loadingRecords": "Загрузка записей...",
            "zeroRecords": "Записи отсутствуют.",
            "emptyTable": "В таблице отсутствуют данные",
            "paginate": {
                "first": "Первая",
                "previous": "Предыдущая",
                "next": "Следующая",
                "last": "Последняя"
            },
            "aria": {
                "sortAscending": ": активировать для сортировки столбца по возрастанию",
                "sortDescending": ": активировать для сортировки столбца по убыванию"
            }
        }
    });
    $('.js-basic-example2').DataTable({
        language: {
            "processing": "Подождите...",
            "search": "Поиск:",
            "lengthMenu": "Показать _MENU_ записей",
            "info": "Записи с _START_ до _END_ из _TOTAL_ записей",
            "infoEmpty": "Записи с 0 до 0 из 0 записей",
            "infoFiltered": "(отфильтровано из _MAX_ записей)",
            "infoPostFix": "",
            "loadingRecords": "Загрузка записей...",
            "zeroRecords": "Записи отсутствуют.",
            "emptyTable": "В таблице отсутствуют данные",
            "paginate": {
                "first": "Первая",
                "previous": "Предыдущая",
                "next": "Следующая",
                "last": "Последняя"
            },
            "aria": {
                "sortAscending": ": активировать для сортировки столбца по возрастанию",
                "sortDescending": ": активировать для сортировки столбца по убыванию"
            }
        }
    });
    $('.js-basic-example').on('click', 'tr', function (e) {

        var id = $(this).closest('tr').data('id');
        var orgname = $(this).closest('tr').data('orgname');
        $('#senderid').val(id);
        $('#sendername').val(orgname);
        $('#defaultSender').modal('hide');

    });
    $('.js-basic-example2').on('click', 'tr', function (e) {

        var id = $(this).closest('tr').data('id');
        var orgname = $(this).closest('tr').data('orgname');
        $('#getterid').val(id);
        $('#gettername').val(orgname);
        $('#defaultGetter').modal('hide');

    });
});
var saveDataArray = {
    paths: [],
    messengers: []
};
function showDiv() {
    $(".dropdown-menu").fadeIn();
}
//Skin changer
function skinChanger() {
    $('.right-sidebar .demo-choose-skin li').on('click', function () {
        var $body = $('body');
        var $this = $(this);

        var existTheme = $('.right-sidebar .demo-choose-skin li.active').data('theme');
        $('.right-sidebar .demo-choose-skin li').removeClass('active');
        $body.removeClass('theme-' + existTheme);
        $this.addClass('active');

        $body.addClass('theme-' + $this.data('theme'));
    });
}

//Skin tab content set height and show scroll
function setSkinListHeightAndScroll() {
    var height = $(window).height() - ($('.navbar').innerHeight() + $('.right-sidebar .nav-tabs').outerHeight());
    var $el = $('.demo-choose-skin');

    $el.slimScroll({ destroy: true }).height('auto');
    $el.parent().find('.slimScrollBar, .slimScrollRail').remove();

    $el.slimscroll({
        height: height + 'px',
        color: 'rgba(0,0,0,0.5)',
        size: '4px',
        alwaysVisible: false,
        borderRadius: '0',
        railBorderRadius: '0'
    });
}

//Setting tab content set height and show scroll
function setSettingListHeightAndScroll() {
    var height = $(window).height() - ($('.navbar').innerHeight() + $('.right-sidebar .nav-tabs').outerHeight());
    var $el = $('.right-sidebar .demo-settings');

    $el.slimScroll({ destroy: true }).height('auto');
    $el.parent().find('.slimScrollBar, .slimScrollRail').remove();

    $el.slimscroll({
        height: height + 'px',
        color: 'rgba(0,0,0,0.5)',
        size: '4px',
        alwaysVisible: false,
        borderRadius: '0',
        railBorderRadius: '0'
    });
}

//Activate notification and task dropdown on top right menu
function activateNotificationAndTasksScroll() {
    $('.navbar-right .dropdown-menu .body .menu').slimscroll({
        height: '254px',
        color: 'rgba(0,0,0,0.5)',
        size: '4px',
        alwaysVisible: false,
        borderRadius: '0',
        railBorderRadius: '0'
    });
}

//Google Analiytics ======================================================================================
addLoadEvent(loadTracking);
var trackingId = 'UA-30038099-6';

function addLoadEvent(func) {
    var oldonload = window.onload;
    if (typeof window.onload != 'function') {
        window.onload = func;
    } else {
        window.onload = function () {
            oldonload();
            func();
        }
    }
}

function loadTracking() {
    (function (i, s, o, g, r, a, m) {
        i['GoogleAnalyticsObject'] = r; i[r] = i[r] || function () {
            (i[r].q = i[r].q || []).push(arguments)
        }, i[r].l = 1 * new Date(); a = s.createElement(o),
        m = s.getElementsByTagName(o)[0]; a.async = 1; a.src = g; m.parentNode.insertBefore(a, m)
    })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');

    ga('create', trackingId, 'auto');
    ga('send', 'pageview');
}

//Sign Document NCALayer ======================================================================================

function chooseStoragePath() {
    var storageAlias = $("#storageAlias").val();
    var storagePath = $("#storagePath").val();
    if (storageAlias !== "NONE") {
        browseKeyStore(storageAlias, "P12", storagePath, "chooseStoragePathBack");
    }
}

function chooseStoragePathBack(rw) {
    var storagePath = $("#storagePath").val();
    if (rw.getErrorCode() === "NONE") {
        storagePath = rw.getResult();
        if (storagePath !== null && storagePath !== "") {
            $("#storagePath").val(storagePath);
            swal({
                title: "Введите ваш пароль",
                type: "input",
                showCancelButton: true,
                closeOnConfirm: false,
                animation: "slide-from-top",
                inputType: "password",
                inputPlaceholder: "Ваш пароль"
            },
                function (inputValue) {
                    if (inputValue === false) {
                        $("#storageAlias").val("NONE");
                        $("#storagePath").val("");
                        return false;
                    }
                    if (inputValue === "") {
                        swal.showInputError("Ошибка!");
                        return false;
                    }
                    fillKeys(inputValue);
                });
        }
        else {
            $("#storageAlias").val("NONE");
            $("#storagePath").val("");
        }
    } else {
        $("#storageAlias").val("NONE");
        $("#storagePath").val("");
    }
}

function fillKeys(ivalue) {
    var storageAlias = $("#storageAlias").val();
    var storagePath = $("#storagePath").val();
    $("#password").val(ivalue);
    var password = ivalue;
    var keyType = "SIGN";
    if (storagePath !== null && storagePath !== "" && storageAlias !== null && storageAlias !== "") {
        if (password !== null && password !== "") {
            getKeys(storageAlias, storagePath, password, keyType, "fillKeysBack");
        } else {
            alert("Введите пароль к хранилищу");
        }
    } else {
        alert("Не выбран хранилище!");
    }
}

function fillKeysBack(result) {
    if (result['errorCode'] === "NONE") {
        swal("Отлично!", "Пароль правильный");
        var keyListEl = document.getElementById('keys');
        keyListEl.options.length = 0;
        var list = result['result'];
        var slotListArr = list.split("\n");
        for (var i = 0; i < slotListArr.length; i++) {
            if (slotListArr[i] === null || slotListArr[i] === "") {
                continue;
            }
            keyListEl.options[keyListEl.length] = new Option(slotListArr[i], i);
        }
        keysOptionChanged();
    }
    else {
        if (result['errorCode'] === "WRONG_PASSWORD" && result['result'] > -1) {
            $("#storageAlias").val("NONE");
            $("#storagePath").val("");
            swal("Неправильный пароль! Количество оставшихся попыток: " + result['result']);
        } else if (result['errorCode'] === "WRONG_PASSWORD") {
            $("#storageAlias").val("NONE");
            $("#storagePath").val("");
            swal("Неправильный пароль!");
        } else {
            $("#storageAlias").val("NONE");
            $("#storagePath").val("");
            swal(result['errorCode']);
        }
        var keyListEl = document.getElementById('keys');
        keyListEl.options.length = 0;
    }
}

function keysOptionChanged() {
    var str = $("#keys :selected").text();
    var alias = str.split("|")[3];
    $("#keyAlias").val(alias);
    getNotBeforeCall();
}

function getNotBeforeCall() {
    var storageAlias = $("#storageAlias").val();
    var storagePath = $("#storagePath").val();
    var password = $("#password").val();
    var alias = $("#keyAlias").val();
    if (storagePath !== null && storagePath !== "" && storageAlias !== null && storageAlias !== "") {
        if (password !== null && password !== "") {
            if (alias !== null && alias !== "") {
                getNotBefore(storageAlias, storagePath, alias, password, "getNotBeforeBack");
            }
            else {
                alert("Вы не выбрали ключ!");
            }
        } else {
            alert("Введите пароль к хранилищу");
        }
    } else {
        alert("Не выбран хранилище!");
    }
}

function getNotBeforeBack(result) {
    if (result['errorCode'] === "NONE") {
        $("#notbefore").text(result['result']);
        getNotAfterCall();
    }
    else {
        if (result['errorCode'] === "WRONG_PASSWORD" && result['result'] > -1) {
            alert("Неправильный пароль! Количество оставшихся попыток: " + result['result']);
        } else if (result['errorCode'] === "WRONG_PASSWORD") {
            alert("Неправильный пароль!");
        } else {
            alert(result['errorCode']);
        }
    }
}

function getNotAfterCall() {
    var storageAlias = $("#storageAlias").val();
    var storagePath = $("#storagePath").val();
    var password = $("#password").val();
    var alias = $("#keyAlias").val();
    if (storagePath !== null && storagePath !== "" && storageAlias !== null && storageAlias !== "") {
        if (password !== null && password !== "") {
            if (alias !== null && alias !== "") {
                getNotAfter(storageAlias, storagePath, alias, password, "getNotAfterBack");
            } else {
                alert("Вы не выбрали ключ!");
            }
        } else {
            alert("Введите пароль к хранилищу");
        }
    } else {
        alert("Не выбран хранилище!");
    }
}

function getNotAfterBack(result) {
    if (result['errorCode'] === "NONE") {
        $("#notafter").text(result['result']);
        getRdnByOidCallIin();
    } else {
        if (result['errorCode'] === "WRONG_PASSWORD" && result['result'] > -1) {
            alert("Неправильный пароль! Количество оставшихся попыток: " + result['result']);
        } else if (result['errorCode'] === "WRONG_PASSWORD") {
            alert("Неправильный пароль!");
        } else {
            alert(result['errorCode']);
        }
    }
}

function getRdnByOidCallIin() {
    var storageAlias = $("#storageAlias").val();
    var storagePath = $("#storagePath").val();
    var password = $("#password").val();
    var alias = $("#keyAlias").val();
    if (storagePath !== null && storagePath !== "" && storageAlias !== null && storageAlias !== "") {
        if (password !== null && password !== "") {
            if (alias !== null && alias !== "") {
                var oid = "";
                oid = "2.5.4.5";
                getRdnByOid(storageAlias, storagePath, alias, password, oid, 0, "getRdnByOidBackIin");
            } else {
                alert("Вы не выбрали ключ!");
            }
        } else {
            alert("Введите пароль к хранилищу");
        }
    } else {
        alert("Не выбран хранилище!");
    }
}

function getRdnByOidBackIin(result) {
    if (result['errorCode'] === "NONE") {
        var res = result['result'].substring(3, 15);
        $("#rdnvalueiin").text(res);
        getRdnByOidCallName();
    }
    else {
        if (result['errorCode'] === "WRONG_PASSWORD" && result['result'] > -1) {
            alert("Неправильный пароль! Количество оставшихся попыток: " + result['result']);
        } else if (result['errorCode'] === "WRONG_PASSWORD") {
            alert("Неправильный пароль!");
        } else {
            $("#rdnvalueiin").text("Не найден!");
            alert(result['errorCode']);
        }
    }
}

function getRdnByOidCallName() {
    var storageAlias = $("#storageAlias").val();
    var storagePath = $("#storagePath").val();
    var password = $("#password").val();
    var alias = $("#keyAlias").val();
    if (storagePath !== null && storagePath !== "" && storageAlias !== null && storageAlias !== "") {
        if (password !== null && password !== "") {
            if (alias !== null && alias !== "") {
                var oid = "";
                oid = "2.5.4.3";
                getRdnByOid(storageAlias, storagePath, alias, password, oid, 0, "getRdnByOidBackName");
            } else {
                alert("Вы не выбрали ключ!");
            }
        } else {
            alert("Введите пароль к хранилищу");
        }
    } else {
        alert("Не выбран хранилище!");
    }
}

function getRdnByOidBackName(result) {
    if (result['errorCode'] === "NONE") {
        $("#rdnvalue").text(result['result']);
        getRdnByOidCallBin();
    }
    else {
        if (result['errorCode'] === "WRONG_PASSWORD" && result['result'] > -1) {
            alert("Неправильный пароль! Количество оставшихся попыток: " + result['result']);
        } else if (result['errorCode'] === "WRONG_PASSWORD") {
            alert("Неправильный пароль!");
        } else {
            $("#rdnvalue").text("Не найден!");
            alert(result['errorCode']);
        }
    }
}

function getRdnByOidCallBin() {
    var storageAlias = $("#storageAlias").val();
    var storagePath = $("#storagePath").val();
    var password = $("#password").val();
    var alias = $("#keyAlias").val();
    if (storagePath !== null && storagePath !== "" && storageAlias !== null && storageAlias !== "") {
        if (password !== null && password !== "") {
            if (alias !== null && alias !== "") {
                var oid = "";
                oid = "2.5.4.11";
                getRdnByOid(storageAlias, storagePath, alias, password, oid, 0, "getRdnByOidBackBin");
            } else {
                alert("Вы не выбрали ключ!");
            }
        } else {
            alert("Введите пароль к хранилищу");
        }
    } else {
        alert("Не выбран хранилище!");
    }
}

function getRdnByOidBackBin(result) {
    if (result['errorCode'] === "NONE") {
        var res = result['result'].substring(3, 15);
        $("#rdnvaluebin").text(res);
        getRdnByOidCallOrgName();

    }
    else {
        getRdnByOidCallOrgName();
        if (result['errorCode'] === "WRONG_PASSWORD" && result['result'] > -1) {
            alert("Неправильный пароль! Количество оставшихся попыток: " + result['result']);
        } else if (result['errorCode'] === "WRONG_PASSWORD") {
            alert("Неправильный пароль!");
        } else {
            $("#rdnvaluebin").text("Не найден!");
        }
    }
}

function getRdnByOidCallOrgName() {
    var storageAlias = $("#storageAlias").val();
    var storagePath = $("#storagePath").val();
    var password = $("#password").val();
    var alias = $("#keyAlias").val();
    if (storagePath !== null && storagePath !== "" && storageAlias !== null && storageAlias !== "") {
        if (password !== null && password !== "") {
            if (alias !== null && alias !== "") {
                var oid = "";
                oid = "2.5.4.10";
                getRdnByOid(storageAlias, storagePath, alias, password, oid, 0, "getRdnByOidBackOrgName");
            } else {
                alert("Вы не выбрали ключ!");
            }
        } else {
            alert("Введите пароль к хранилищу");
        }
    } else {
        alert("Не выбран хранилище!");
    }
}

function getRdnByOidBackOrgName(result) {
    $("#sertdata").css('display', 'block');
    if (result['errorCode'] === "NONE") {
        $("#rdnvalueorgname").text(result['result']);
        $('#storageAlias').prop('disabled', 'disabled');
    }
    else {
        if (result['errorCode'] === "WRONG_PASSWORD" && result['result'] > -1) {
            alert("Неправильный пароль! Количество оставшихся попыток: " + result['result']);
        } else if (result['errorCode'] === "WRONG_PASSWORD") {
            alert("Неправильный пароль!");
        } else {
            $("#rdnvalueorgname").text("Не найден!");
        }
    }
}

function createCMSSignatureCall() {
    var storageAlias = $("#storageAlias").val();
    var storagePath = $("#storagePath").val();
    var password = $("#password").val();
    var alias = $("#keyAlias").val();
    $("#identifierCMS").text("Не проверено");
    if (storagePath !== null && storagePath !== "" && storageAlias !== null && storageAlias !== "") {
        if (password !== null && password !== "") {
            if (alias !== null && alias !== "") {
                var data = $("#dateCMS1").val();
                if (data !== null && data !== "") {
                    createCMSSignature(storageAlias, storagePath, alias, password, data, true, "createCMSSignatureBack");
                }
                else {
                    alert("Вы не ввели данные!");
                }
            } else {
                alert("Вы не выбрали ключ!");
            }
        } else {
            alert("Введите пароль к хранилищу");
        }
    } else {
        alert("Не выбран хранилище!");
    }
    $(".signed-form").submit();
}

var i = 1;

function createCMSSignatureBack(result) {
    if (result['errorCode'] === "NONE") {
        var storageAlias = $("#storageAlias").val();
        var storagePath = $("#storagePath").val();
        var password = $("#password").val();
        var alias = $("#keyAlias").val();
        var up = $("#count").val();
        if (result['result'] !== null && result['result'] !== "") {
            var divEntry = $('#signCMSFiles');
            divEntry.append(
               "<textarea readonly name='uploadedFiles' id='signatureCMS" + i + "'>" + result['result'] + "</textarea>");
            if (i < up) {
                var data = $("#dateCMS" + i).val();
                if (data !== null && data !== "") {
                    createCMSSignature(storageAlias, storagePath, alias, password, data, true, "createCMSSignatureBack");
                } else {
                    alert("Добавьте файл на загрузку!");
                }
                i = i + 1;
            } else {
                verifyCMSSignatureCall();
            }
        } else {
            alert("Вы не ввели данные, или подписанные данные не найдены!");
        }
    }
    else {
        if (result['errorCode'] === "WRONG_PASSWORD" && result['result'] > -1) {
            alert("Неправильный пароль! Количество оставшихся попыток: " + result['result']);
        } else if (result['errorCode'] === "WRONG_PASSWORD") {
            alert("Неправильный пароль!");
        } else {
            $("#signatureCMS").text("");
            alert(result['errorCode']);
        }
    }
}

function verifyCMSSignatureCall() {
    var dataCMS = $("#dateCMS1").val();
    var signatureCMS = $("#signatureCMS1").val();
    if (signatureCMS !== null && signatureCMS !== "") {
        verifyCMSSignature(signatureCMS, dataCMS, "verifyCMSSignatureBack");
    }
    else {
        alert("Вы не ввели данные, или подписанные данные не найдены!");
    }
}
var j = 1;
function verifyCMSSignatureBack(result) {
    var up = $("#count").val();
    if (result['errorCode'] === "NONE") {
        if (result['result']) {
            if (j < up) {
                var dataCMS = $("#dateCMS" + j).val();
                var signatureCMS = $("#signatureCMS" + j).val();
                if (signatureCMS !== null && signatureCMS !== "") {
                    verifyCMSSignature(signatureCMS, dataCMS, "verifyCMSSignatureBack");
                }
                else {
                    var divEntry = $('#serticatwrong');
                    divEntry.append(
					"<div class='alert bg-red'>Ваш сертификат просрочен или отозван ! Подпись не возможна !</div>");
                    $("#identifierCMS").text("Неправильная подпись");
                }
                j = j + 1;
            } else {
                $("form#sign_from_partner").submit();
                $("#identifierCMS").text("Валидная подпись");

            }
        }
        else {
            var divEntry = $('#serticatwrong');
            divEntry.append(
                "<div class='alert bg-red'>Ваш сертификат просрочен или отозван ! Подпись не возможна !</div>");
            $("#identifierCMS").text("Неправильная подпись");
        }
    } else {
        var divEntry = $('#serticatwrong');
        divEntry.append(
            "<div class='alert bg-red'>Ваш сертификат просрочен или отозван ! Подпись не возможна !</div>");
        $("#identifierCMS").text("Неправильная подпись");
    }
}
//Sign Document NCALayer========================================================================================================

//Change Password
$(function () {
    $('#org_changepassword').validate({
        rules: {
            'terms': {
                required: true
            },
            'orgconfirm': {
                equalTo: '[name="Employees[password1]"]'
            }
        },
        highlight: function (input) {
            console.log(input);
            $(input).parents('.form-group').addClass('error');
        },
        unhighlight: function (input) {
            $(input).parents('.form-group').removeClass('error');
        },
        errorPlacement: function (error, element) {
            $(element).parents('.input-group').append(error);
            $(element).parents('.form-group').append(error);
        }
    });
    $("#org-password1").attr('minlength', '6');
});
//Send choose organizations to master employee
function sendChooseOrganizations() {
    var storageAlias = $("#message-text").val();
    var storagePath = $("#recipient-name").val();
    if (storagePath !== null && storagePath !== "" && storageAlias !== null && storageAlias !== "") {
        $.ajax(
            {
                url: '/organizations/choosepost',
                type: 'POST',
                dataType: 'json',
                data: {
                    comment: storageAlias, bin: storagePath,
                },
                success: function (result) {
                    console.log(result);
                }
            });
    } else {
        alert("Заполните комментарий!");
    }
}

