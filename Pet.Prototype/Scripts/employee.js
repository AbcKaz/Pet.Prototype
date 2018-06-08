$(function () {

    var qwe = {};
    bindEventHandler();

    function bindEventHandler() {

        //----
        $('.btn-view').click(function () {
          
            var trs = $('.grid-mvc').find('table.grid-table').find('tr.grid-row-selected');
            if (trs.length != 0) {
                console.log("trs=", trs);
                var id = $(trs[0]).find('input[type=checkbox]').attr('obj-id');
                console.log("id=", id);
                qwe.uid = id;

                fillEmployee(id);
                fillAccess(id);
                $('#dlgUserModal').modal('show');
            }
        })

        //----
        $('.btn-edit').click(function () {

            var trs = $('.grid-mvc').find('table.grid-table').find('tr.grid-row-selected');
            if (trs.length!=0) {
                console.log("trs=", trs);
                var id = $(trs[0]).find('input[type=checkbox]').attr('obj-id');
                console.log("id=", id);
                qwe.uid = id;
                    
                fillEmployee(id);
                fillAccess(id);
                $('#dlgUserModal').modal('show');
            }
        })

        //----btn save
        $('.btn-edit-save').click(function () {

            var permissions = "";
            if (checkAccess(".access1"))
                permissions += "1";

            if (checkAccess(".access2"))
                permissions += ",2";

            if (checkAccess(".access3"))
                permissions += ",3";

            if (checkAccess(".access4"))
                permissions += ",4";

            if (checkAccess(".access5"))
                permissions += ",5";

            if (checkAccess(".access6"))
                permissions += ",6";

            var status = $('.user-status').val();
            $.post(rootUrl + 'Home/EditEmployee', {
                id: qwe.uid,
                userposition: $('.user-fio').text(),
                email: $('.user-email').val(),
                mobilephone: $('.user-mobile-phone').val(),
                workphone: $('.user-work-phone').val(),
                isactive: (status == 1) ? true : false,
                permissions: permissions
            }, function (data) {
                window.location = window.location;
            });
        })

        //----
        $('.btn-edit-close').click(function () {
            $('#dlgUserModal').modal('close');
        })
    }

    function checkAccess(classname) {
        var flag = $(classname).is(':checked');
        return flag;
    }

    function fillEmployee(uid) {
        $.post(rootUrl + 'Home/GetEmployeeById', { id: uid }, function (data) {
            if (data) {
                $('.user-iin').text(data.IIN);
                var fio = data.LastName + " " + data.FirstName;
                if (data.SecondName)
                    fio += " " + data.SecondName;

                $('.user-fio').text(fio);
                $('.user-position').val(data.UserPosition);
                $('.user-email').val(data.Email);
                $('.user-mobile-phone').val(data.MobilePhone);
                $('.user-work-phone').val(data.WorkPhone);
            }
        });
    }

    function fillAccess(uid) {
        $.post(rootUrl + 'Home/GetUserPermission', { uid: uid }, function (data) {

            if (data.permissions) {
                var arr = data.permissions.split(',');
                for (var i = 0; i < arr.length; i++) {
                    $('.access' + arr[i]).prop('checked', true);
                }
            }
        });

    }
})