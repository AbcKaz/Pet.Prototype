var ForumHelper = new function () {

	 this.CreateQuestion = function (paragraph) {
	 	 if (!authorized) {
	 	 	 $("#modalLogin").modal();
	 	 	 return false;
	 	 }

	 	 var documentId = $('.document-id').val();
	 	 window.location.href = '/' + languageUI + '/Forum/AddQuestionForDoc?documentId=' + documentId + '&paragraphNumber=' + paragraph;

	 }

	 this.SearchSubmit = function () {

	 	 CommonHelper.ShowLoader();

	 }

	 this.SelectThemeChange = function () {
	 	 
	 	 var themeId = $('.themes').val();
	 	 $.ajax({
	 	 	 url: '/' + languageUI + '/Forum/GetSubthemes?id=' + themeId
	 	 }).done(function (subthemes) {
	 	 	 $(".subthemes").html('');
	 	 	 $.each(subthemes, function (key, value) {
	 	 		 	 $('.subthemes').append('<option value="' + value.id + '">' + value.title + '</option>')
	 	 	 });
	 	 	 $('.subthemes').select2();
	 	 });
	 }



}
