var TemplateHelper = new function () {

	 this.SearchSubmit = function () {
	     if ($(".form-search-tmp").length < 1)
	         return false;
	 	 CommonHelper.ShowLoader();
	 	 var formData = $(".form-search-tmp").serialize();
	 	 $.ajax({
	 	     url: '/' + languageUI + '/Template/Index',
	 	     method: 'post',
	 	     data: formData
	 	 }).done(function (output) {
	 	     $(".search-result-container").html(output);
	 	     CommonHelper.HideLoader();
	 	     if ($(".current-page").val() == 1)
	 	     toastr["success"]("Поиск выполнен. Результат поиска: " + $(".total").val() + " записей");

	 	     $('.pagination').bootpag({
	 	         total: $(".total-pages").val(),
	 	         page: $(".current-page").val(),
	 	         maxVisible: 5
	 	     }).on('page', function (event, num) {
	 	         $(".current-page").val(num);
	 	         TemplateHelper.SearchSubmit();
	 	     });
	 	 });

	 	 $.ajax({
	 	     url: '/' + languageUI + '/Template/SearchFilter',
	 	     method: 'post',
	 	     data: formData
	 	 }).done(function (filter) {
	 	     DocumentHelper.FilterInsert(filter.classifiers, 'filter-classifiers', 'classifier');
             //DocumentHelper.FilterInsert(filter.statuses, 'filter-statuses', 'status');

	 	     CommonHelper.HideLoader();
	 	     $('.i-checks').iCheck({
	 	         checkboxClass: 'icheckbox_square-green',
	 	         radioClass: 'iradio_square-green',
	 	     });
	 	     //Click filter checkboxes 
	 	     //CommonHelper.CheckOnSelect('check-status', 'selectedStatus', 'unselectedStatus', true);
	 	     CommonHelper.CheckOnSelect('check-classifier', 'selectedClassifier', 'unselectedClassifier', true);

	 	 });
	 	 return false;
	 }


	 this.DownloadPdf = function () {
	 	 $window = $(".doc-window-1");
	 	 var id = $window.find(".id").val();

	 	 window.location.href = '/' + languageUI + '/Template/DownloadPdf?documentId=' + id;
	 }


	 this.Print = function () {
	 	 $window = $(".doc-window-1");
	 	 var id = $window.find('.id').val();
	 	 $.ajax({
	 	 	 url: "/" + languageUI + "/Template/GetBodyForPrint/",
	 	 	 method: "GET",
	 	 	 async: true,
	 	 	 data: { documentId: id }
	 	 }).done(function (output) {

	 	 	 var mywindow = window.open('', 'PRINT', '');
	 	 	 mywindow.document.write('<html><head><title>Печать</title>');
	 	 	 mywindow.document.write('</head><body >');
	 	 	 mywindow.document.write(output);
	 	 	 mywindow.document.write('</body></html>');

	 	 	 mywindow.document.close();
	 	 	 mywindow.focus();

	 	 	 mywindow.print();
	 	 	 mywindow.close();

	 	 });

	 	 return true;
	 }
	 this.FontSizeInc = function () {
	 	 var $window = $(".doc-window-1" );
	 	 var $p = $window.find(".doc-body p");
	 	 var fontSize = parseInt($p.css("font-size")) + 1;

	 	 $p.css("font-size", fontSize + "px");
	 }

	 this.FontSizeDec = function () {
	 	 var $window = $(".doc-window-1");
	 	 var $p = $window.find(".doc-body p");
	 	 var fontSize = parseInt($p.css("font-size")) - 1;

	 	 $p.css("font-size", fontSize + "px");
	 }

	 this.GetBody = function () {
	 	 CommonHelper.ShowLoader();
	 	 var id = $(".tmp-id").val();
	 	 $.ajax({
	 	 	 url: "/" + languageUI + "/Template/GetBody/",
	 	 	 method: "GET",
	 	 	 async: true,
	 	 	 data: { id: id }
	 	 }).done(function (output) {
	 	 	 var $docBody = $(".doc-window-1").find(".doc-body");
	 	 	 $docBody.html(output);
	 	 	
	 	 });
	 	 CommonHelper.HideLoader();

	 }
}