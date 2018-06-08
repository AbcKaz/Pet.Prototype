$(function () {

    var qwe = {};
    init();
    bindEventHandler();
    //fillCompany();
    //fillBank();
    GetOrder();
    getBanks();

    function init() {
        qwe.id = getUrlParameter("oid");
        qwe.uid = $('.user-id').val();
        
    }

    function bindEventHandler() {

        
        
        
    }

    function GetOrder() {
        $.post(rootUrl + 'Home/GetOrderById', { id: qwe.id }, function (data) {

            if (data) {

                $('.order-no').text("№ "+data.No);
                $('.buyer-juridicalname').text(data.BuyerName);
                $('.buyer-bin').text(data.BuyerBIN);

                $('.status-application').text(data.StatusName);
                $('.inp-application').val(data.CreateDate);                

                $('.announcement-no').text("№ "+data.SellerNo);
                $('.start-price').text(data.SellerStartPrice);
                $('.delivery-type').text(data.SellerDeliveryType);

            }
        });
    }

    function getBanks() {

        if (qwe.uid == "" || qwe.uid == null)
            return;

        $.post(rootUrl + 'Home/GetBanksByUserId', { uid: qwe.uid }, function (data) {
            qwe.bankData = data;
            $.map(data, function (item, indx) {
                $('.select-bank').append('<option value="' + item.Id + '">' + item.Name + '</option>');
                if (indx == 0) {
                    fillBank(item);
                }
            });            

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

   

});