var AnnounceHelper = new function () {
    var tbl; 
    this.Init = function () {
        $("#tblAnnounce").DataTable({
            "ordering": false,
            "info": false,
            "bFilter": false,
            "bInfo": false,
            "language": {
                "url": "/lib/dataTables/russian.json"
            }
        });
        tbl = $('#tblAnnounces').DataTable({
            //"ajax": '/Announce/Search',
            "ordering": false,
            "bFilter": false,
            "bInfo": false,
            "paging": false,
            "columns": [
               {
                   "data": "number", "width": "40px",
                   "render": function (data, type, row, meta) {
                       return '<a href="/Announce/Detail?id=' + row.id + '" target="_blank">' + data + '</a>';
                   }
               },
               {
                   "data": "name", "render": function (data, type, row, meta) {
                       return '<a href="/Announce/Detail?id=' + row.id + '" target="_blank">' + data + '</a>' +
                   (authorized ? "" : '<br/>Для просмотра необходимо <a href="/Account/Register">зарегистрироваться</a> или <a href="/Account/Login">авторизоваться</a>');
                   }
               },
              // { "data": "pwsType" },
               { "data": "companyName" },
               { "data": "purchaseMethodName" },
               { "data": "dateStart" },
               { "data": "dateFinish" },
              // { "data": "sum" },
               { "data": "countLots" },
               { "data": "status" }
            ],
            "language": {
                "url": "/lib/dataTables/russian.json"
            }
        });
    }
    this.Search = function ()
    {
        var $form = $(".form-search-announce");
        var request = $form.serialize();
        $.get($form.attr('action'), request, function (response) {

            tbl.rows().remove().draw();
            tbl.rows.add(response.result).draw();


            $('.pagination').bootpag({
                total: response.totalPages,
                page: response.currentPage,
                maxVisible: 5

            }).on('page', function (event, num) {
                $(".current-page").val(num);
                AnnounceHelper.Search();
            });

        });
    }
}

var AnRequestHelper = new function () {
    var tbl;
    this.Init = function () {

       tbl = $('#tblAnRequests').DataTable({
            "bFilter": false,
            "ordering": false,
            "bInfo": false,
            "paging": false,
            "iDisplayLength": 10,
            "columns": [
               {
                   "data": "requestId", "width": "40px",
                   "render": function (data, type, row, meta) {
                       return '<a href="/AnRequest/Detail?id=' + data + '">' + data + '</a>';
                   }
               },
               {
                   "data": "name", "render": function (data, type, row, meta) {
                       return '<a href="/Announce/Detail?id=' + row.id + '">' + data + '</a>';
                   }
               },
               { "data": "pwsType" },
               { "data": "companyName" },
               { "data": "purchaseMethodName" },
               { "data": "dateStart" },
               { "data": "dateFinish" },
               { "data": "sum" },
               { "data": "countLots" },
               { "data": "status" }
            ],
            "language": {
                "url": "/lib/dataTables/russian.json"
            }
        });
    }
    this.Search = function () {
        var $form = $(".form-search-request");
        var request = $form.serialize();
        $.get($form.attr('action'), request, function (response) {
            tbl.rows().remove().draw();
            tbl.rows.add(response.result).draw();

            $('.pagination').bootpag({
                total: response.totalPages,
                page: response.currentPage,
                maxVisible: 5
            }).on('page', function (event, num) {
                $(".current-page").val(num);
                AnRequestHelper.Search();
            });

        });
    }
}

var AdvertHelper = new function () {
    var tbl;

    this.Init = function () {
        var advertType = $(".advertType").val();
        var columns = [];

        if (advertType == 3) {
            columns = [
                 {
                     "data": "idIn1c", "render": function (data, type, row, meta) {
                         return '<a href="/Advert/Detail?id=' + row.id + '" target="_blank">' + data + '</a>';
                     }
                 },
             {
                 "data": "descr", "render": function (data, type, row, meta) {
                     return '<a href="/Advert/Detail?id=' + row.id + '" target="_blank">' + data + '</a>';
                 }
             },
             {
                 "data": "specifications", "render": function (data, type, row, meta) {
                     return '<a href="/Advert/Detail?id=' + row.id + '" target="_blank">' + data + '</a>';
                 }
             },

             { "data": "companyName" },
             { "data": "dateStart" },
             { "data": "dateEnd" },
              {
                  "data": "id", "render": function (data, type, row, meta) {
                      return '<a target="_blank" href="/AdvRequest/Add?id=' + row.id + '">Отклик</a>';
                  }
              }
            ]
        } else 
            if (advertType == 2) {
                columns = [
                     {
                         "data": "idIn1c", "render": function (data, type, row, meta) {
                             return '<a href="/Advert/Detail?id=' + row.id + '" target="_blank">' + data + '</a>';
                         }
                     },
                 {
                     "data": "descr", "render": function (data, type, row, meta) {
                         return '<a href="/Advert/Detail?id=' + row.id + '" target="_blank">' + data + '</a>';
                     }
                 },
                 {
                     "data": "specifications", "render": function (data, type, row, meta) {
                         return '<a href="/Advert/Detail?id=' + row.id + '" target="_blank">' + data + '</a>';
                     }
                 },

                 { "data": "companyName" },
                 { "data": "location" },
                 { "data": "status" },
                  {
                      "data": "id", "render": function (data, type, row, meta) {
                          return '<a target="_blank" href="/AdvRequest/Add?id=' + row.id + '">Отклик</a>';
                      }
                  }
                ]
            }
        else {
            columns = [
                  {
                      "data": "idIn1c", "render": function (data, type, row, meta) {
                          return '<a href="/Advert/Detail?id=' + row.id + '" target="_blank">' + data + '</a>';
                      }
                  },
              {
                  "data": "descr", "render": function (data, type, row, meta) {
                      return '<a href="/Advert/Detail?id=' + row.id + '" target="_blank">' + data + '</a>';
                  }
              },
              {
                  "data": "markAndModel", "render": function (data, type, row, meta) {
                      return '<a href="/Advert/Detail?id=' + row.id + '" target="_blank">' + data + '</a>';
                  }
              },

              { "data": "companyName" },
              { "data": "dateStart" },
              { "data": "dateEnd" },
              {
                  "data": "id", "render": function (data, type, row, meta) {
                      return '<a target="_blank" href="/AdvRequest/Add?id=' + row.id + '">Отклик</a>';
                  }
              }
            ]
        }



        tbl = $('#tblAdverts').DataTable({
            "ordering": false,
            "bFilter": false,
            "bInfo": false,
            "paging": false,
            "iDisplayLength": 10,
            "columns": columns,
            "language": {
                "url": "/lib/dataTables/russian.json"
            }
        });
    }

    this.Search = function () {
        var $form = $(".form-search-advert");
        var request = $form.serialize();
        $.post($form.attr('action'), request, function (response) {

            tbl.rows().remove().draw();
            tbl.rows.add(response.result).draw();

            $('.pagination-adv').bootpag({
                total: response.totalPages,
                page: response.currentPage,
                maxVisible: 5
            }).on('page', function (event, num) {
                $(".current-page").val(num);
                AdvertHelper.Search();
            });
        });
    }

}

var AdvRequestHelper = new function () {
    var tbl;

    this.Init = function () {
        tbl = $('#tblAdvRequests').DataTable({
            "ordering": false,
            "bFilter": false,
            "bInfo": false,
            "paging": false,
            "iDisplayLength": 10,
            "columns": [

               {
                   "data": "descr", "render": function (data, type, row, meta) {
                       return '<a href="/Advert/Detail?id=' + row.id + '" target="_blank">' + data + '</a>';
                   }
               },
               {
                   "data": "markAndModel", "render": function (data, type, row, meta) {
                       return '<a href="/Advert/Detail?id=' + row.id + '" target="_blank">' + data + '</a>';
                   }
               },
               { "data": "specifications" },
               { "data": "companyName" },
               { "data": "dateStart" },
               { "data": "dateEnd" },
                 {
                     "data": "requests", "render": function (data, type, row, meta) {
                         var req = row.requests.split(",");
                         var reqs = '';
                         jQuery.each(req, function (i, val) {
                             reqs += '<a href="/AdvRequest/Detail?id=' + val + '">Мой отклик ' + (i + 1) + '</a><br/>'
                         });

                         return reqs; //'<a href="/AdvRequest/Detail?id=' + row.requestId + '">Мой отклик</a>';
                     }
                 },
            ],
            "language": {
                "url": "/lib/dataTables/russian.json"
            }
        });
    }

    this.Search = function () {
         var $form = $(".form-search-advrequests");
            var request = $form.serialize();
            $.post($form.attr('action'), request, function (response) {
                tbl.rows().remove().draw();
                tbl.rows.add(response).draw();

                $('.pagination-adv').bootpag({
                    total: response.totalPages,
                    page: response.currentPage,
                    maxVisible: 5
                }).on('page', function (event, num) {
                    $(".current-page").val(num);
                    AdvRequestHelper.Search();
                });
            });
    }
}

var DocHelper = new function ()
{
    var tbl;

    this.Init = function () {
        tbl = $('#tblDoc').DataTable({
            "bFilter": false,
            "bInfo": false,
            "paging": false,
            "iDisplayLength": 10,
            "columns": [

               {
                   "data": "id", "render": function (data, type, row, meta) {
                       return '<a href="Detail/' + row.id + '">' + data + '</a>';
                   }
               },
               {
                   "data": "dateUpdated", "render": function (data, type, row, meta) {
                       return '<a href="Detail/' + row.id + '">' + data + '</a>';
                   }
               },
               { "data": "senderCompanyBin" },
               { "data": "senderCompanyName" },
               { "data": "receiverCompanyBin" },
               { "data": "receiverCompanyName" },
               { "data": "title" },
               { "data": "comment" },
               { "data": "statusName" },
            ],
            "language": {
                "url": "/lib/dataTables/russian.json"
            }
        });
    }

    this.Search = function () {
        var $form = $(".form-search-docs");
        var request = $form.serialize();
        $.post($form.attr('action'), request, function (response) {
            tbl.rows().remove().draw();
            tbl.rows.add(response.result).draw();

            $('.pagination-adv').bootpag({
                total: response.totalPages,
                page: response.currentPage,
                maxVisible: 5
            }).on('page', function (event, num) {
                $(".current-page").val(num);
                DocHelper.Search();
            });
        });
    }

    this.AdvancedSearchSwitch = function()
    {
        var display = $(".adv-search-form").css('display');
        if (display === 'none') {
            $(".adv-search-form").css('display', '');
            $(".adv-search-show").html('Скрыть расширенный поиск');

        }
        else {
            $(".adv-search-form").css('display', 'none');
            $(".adv-search-show").html('Расширенный поиск');
        }
    }
}

var NsiHelper = new function () {
  


    
}
