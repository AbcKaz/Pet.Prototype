document.onkeydown = DocumentHelper.KeyPress;
$(function () {
	 $(window).scroll(function () {
	 	 var top = parseInt($(window).scrollTop());
	 	 if (top > 300) {
	 	 	 $(".search-panel-div .content-main").addClass("search-panel-static");
	 	 	 $(".doc-left-menu").addClass("doc-left-menu-static");
	 	 	 var pos = $(".doc-left-menu-container").position();
	 	 	 var w = parseInt($(".doc-left-menu-container").css('width'));
	 	 	 var mt = parseInt($(".doc-left-menu-container").css('margin-top'));
	 	 	 DocumentHelper.HintBodyEnabled();
	 	 	 DocumentHelper.LeftMenuHintEnabled();
	 	 }
	 	 else {
	 	 	 $(".search-panel-div .content-main").removeClass("search-panel-static");
	 	 	 $(".doc-left-menu").removeClass("doc-left-menu-static");
	 	 	 DocumentHelper.HintBodyEnabled();
	 	 	 DocumentHelper.LeftMenuHintEnabled();
	 	 }
	 });

	 $(".form-search-doc .search-text").autocomplete({
	 	 source: function (request, response) {
	 	 	 if ($(".search-context").val() != "2") {
	 	 	 	 $.ajax({
	 	 	 	 	 url: "/" + languageUI + "/Document/Autocomplete",
	 	 	 	 	 dataType: "json",
	 	 	 	 	 data: {
	 	 	 	 	 	 text: request.term
	 	 	 	 	 },
	 	 	 	 	 success: function (data) {
	 	 	 	 	 	 response(data);
	 	 	 	 	 }
	 	 	 	 });
	 	 	 }
	 	 },
	 	 minLength: 2,
	 	 select: function (event, ui) {
	 	 	 if ($(".search-context").val() != "2") {
	 	 	 	 $(".search-text").val(ui.item.value);
	 	 	 	 $(".search-doc-id").val(ui.item.id);
	 	 	 	 DocumentHelper.SearchSubmit();
	 	 	 }
	 	 }
	 }).keyup(function (e) {
        if(e.which === 13) {
            $(".ui-menu-item").hide();
        }            
    });;
	 
	 DocumentHelper.GetLast('/Document/LastAdded', 'underline-docs-new');
	 DocumentHelper.LeftMenuHintEnabled();
	 $(".doc-left-menu-item").click(function () {
	 	 $(".doc-left-menu-hint").hide();
	 });
	 DocumentHelper.SearchSubmit();
	 DocumentHelper.InitSelectEditions(1);
	 DocumentHelper.ToParagraphScroll(1);
	 
    $(".filter-container").find(".doc-sort").click(function () {
	 	 	 var desc = $(".desc").val();
	 	 	 if (desc == 'true')
	 	 	 	 $(".desc").val(false);
	 	 	 else
	 	 	 	 $(".desc").val(true);

	 	 	 $(".sort").val($(this).attr('type'));
	 	 	 DocumentHelper.SearchSubmit();
	 	 	 return false;
	 	 });

	 $(".doc-body").on("mousemove", ".paragraph", function (event) {
	 	 DocumentHelper.ShowBookmarkButtons($(this), true, true);
	 });

	 //Document add to forum 
	 $(".doc-body").on("click", ".btn-add-to-forum", function (event) {
	 	 var paragraph = $(this).parent('.bookmark-buttons').attr('paragraph');
	 	 ForumHelper.CreateQuestion(paragraph);
	 	 return false;
	 });

	 //Mousemove Left menu in detail document 
	 $(".buttongroup-vertical-container .button-icon").mousemove(function (event) {
	 	 var position = $('.doc-left-menu-container').position();
	 	 var width = parseInt($('.doc-left-menu-container').css('width'));
	 	 var $hint = $(this).find(".button-icon-hint");
	 	 $(".bookmark").hide();
	 	 $hint.css('left', parseInt(position.left) + width + 'px');
	 	 $hint.show();
	 });
	 $(".buttongroup-vertical-container .button-icon").mouseout(function (event) {
	 	 var $hint = $(this).find(".button-icon-hint");
	 	 $hint.hide();

	 });

	 $(".doc-body").on("mousemove", ".bookmark-buttons", function (event) {

	 	 DocumentHelper.ShowBookmarkButtons($(this), true, false);
	 });

	 $(".doc-body").on("click", ".btn-add-bookmark", function (event) {
	     if (!authorized) {
	         $("#modalLogin").modal();
	         return false;
	     }
	 	 var prgNumber = $(this).attr("paragraph-number");
	 	 var isComment = $(this).attr("is-comment");

	 	 $(".paragrah-number").val(prgNumber);
	 	 $(".comment-document-id").val($(".id").val());
	 	 $(".is-comment").val(isComment);
	 	 $('#modalBookMark').modal('toggle');

	 	 return false;
	 });

	 $(".doc-body").on("click", ".btn-add-comment", function (event) {
	     if (!authorized) {
	         $("#modalLogin").modal();
	         return false;
	     }

	     var prgNumber = $(this).attr("paragraph-number");
	     var isComment = $(this).attr("is-comment");

	     $(".paragrah-number").val(prgNumber);
	     $(".comment-document-id").val($(".id").val());
	     $(".is-comment").val(isComment);
	     $('#modalComment').modal('toggle');

	     return false;
	 });

	 $(".doc-body").on("click", "a", function (event) {
	 	 var href = $(this).attr("href");

         if (href.indexOf(".htm") > 0)
             {
                DocumentHelper.OpenAttDocument(href);
                return false; 
             }

         if (href == "#") return;
	 	 if (href.substring(0, 1) == "/") return;
	 	  
	 	 DocumentHelper.ChangeLink(href);
	 	 return false;  
	 });
	 if ($(".doc-body").length > 0) {
	 	 $(".search-context").val("2");
	 }

    /* $(".hint-body").mouseleave(function () {
	 	 $(".hint-body").hide();
	 });
     */

	 if ($(".hint-body").length > 0) {
	 	 var lang = $('.lang').val();
	 	 var ngr = $('.ngr').val();
	 	 var documentId = $('.document-id').val();
	 }

	 //Left menu in detail document
	 var h = parseInt($(".doc-body-container").css('height')) + 'px';
	 $(".doc-body-container").prev().css('height', h);
	 DocumentHelper.HintBodyEnabled();

	 //Advanded search show
	 $("#search-advanced").click(function () {
	 	 $(".advanced-search").toggle("slow");
	 	 DocumentHelper.HintBodyEnabled();
	 	 DocumentHelper.LeftMenuHintEnabled();
	 });

    //Init tree elements 
	 $('.dic-types-tree').aciTree({
	     ajax: {
	         url: "/" + languageUI + '/nsi/DictionaryTypesGetTree'
	     },
	     checkbox: true
	 });
	
    //TODO: расширенный поиск
	$('.npa-types-tree').aciTree({
	    ajax: {
	        url: "/" + languageUI + '/nsi/npaTypesGetTree'
	    },
	    checkbox: true
	});	
	DocumentHelper.CheckTreeNpaTypes(4000);

	$('.language-tree').aciTree({
	    ajax: {
	        url: "/" + languageUI + '/nsi/LanguagesGetTree'
	    },
	    checkbox: true
	});
	DocumentHelper.CheckTreeLanguages(4000);
    
	 $('.regions-tree').aciTree({
	 	 ajax: {
	 	 	 url: "/" + languageUI + '/nsi/regionsGetTree?id='
	 	 },
	 	 checkbox: true
	 });
	 DocumentHelper.CheckTreeActionRegions(6000);

	 $('.classifiers-tree').aciTree({
	 	 ajax: {
	 	 	 url: "/" + languageUI + '/nsi/classifiersGetTree?id='
	 	 },
	 	 checkbox: true
	 });
	 DocumentHelper.CheckTreeClassifiers(6000);

	 $('.tmp-classifiers-tree').aciTree({
	     ajax: {
	         url: "/" + languageUI + '/nsi/classifiersGetTree?id='
	     },
	     checkbox: true
	 });

	 $('.tmp-statuses-tree').aciTree({
	     ajax: {
	         url: "/" + languageUI + '/nsi/tmpStatusesGetTree?id='
	     },
	     checkbox: true
	 });

	 $('.sources-tree').aciTree({
	 	 ajax: {
	 	 	 url: "/" + languageUI + '/nsi/sourcesGetTree?id='
	 	 },
	 	 checkbox: true
	 });
	 DocumentHelper.CheckTreeSources(6000);

	 $('.regagencies-tree').aciTree({
	 	 ajax: {
	 	 	 url: "/" + languageUI + '/nsi/regAgenciesGetTree?id='
	 	 },
	 	 checkbox: true
	 });
	 DocumentHelper.CheckTreeRegAgencies(6000);

	 $('.sections-tree').aciTree({
	 	 ajax: {
	 	 	 url: "/" + languageUI + '/nsi/npaSectionsGetTree?id='
	 	 },
	 	 checkbox: true
	 });
	 DocumentHelper.CheckTreeSections(6000);

	 $('.initregions-tree').aciTree({
	 	 ajax: {
	 	 	 url: "/" + languageUI + '/nsi/initregionsGetTree?id='
	 	 },
	 	 checkbox: true
	 });
	 DocumentHelper.CheckTreeInitRegions(6000);

	 //TODO: Клик на дерево при поиска шаблонов, 2 параметра
	 CommonHelper.AciOnSelect('tmp-statuses-tree', 'selectedStatus', 'selectedStatus');
	 CommonHelper.AciOnSelect('tmp-classifiers-tree', 'selectedClassifier', 'selectedClassifier');

     //TODO: клик на дерево при расширенном поиске. 8 параметров
	 CommonHelper.AciOnSelect('classifiers-tree', 'extselectedClassifiers', 'extunselectedClassifiers');
	 CommonHelper.AciOnSelect('regions-tree', 'extselectedRegionActions', 'extunselectedRegionActions');
	 CommonHelper.AciOnSelect('initregions-tree', 'extselectedRegionInits', 'extunselectedRegionInits');

	 CommonHelper.AciOnSelect('npa-types-tree', 'extselectedNpaTypes', 'extunselectedNpaTypes');
	 CommonHelper.AciOnSelect('language-tree', 'selectedLanguage', 'unselectedLanguage');

	 CommonHelper.AciOnSelect('sections-tree', 'extselectedSections', 'extunselectedSections');
	 CommonHelper.AciOnSelect('sources-tree', 'extselectedSources', 'extunselectedSources');
	 CommonHelper.AciOnSelect('regagencies-tree', 'extselectedRegAgencies', 'extunselectedRegAgencies');

     //TODO: Клик на дерево при поиске словаря, 1 параметр
	 CommonHelper.AciOnSelect('dic-types-tree', 'selectedDicTypes', 'unselectedDicTypes');
})

function parseHTML(html) {
    var t = document.createElement('template');
    t.innerHTML = html;
    return t.content.cloneNode(true);
}

document.addEventListener('DOMContentLoaded', function () {

	 new SelectionMenu({
	 	 container: document.querySelector('#wrapper'),
	 	 content: document.querySelector('#dictionaryMenu'),
	 	 handler: function (event) {
	 	 	 var target = event.target,
				id = target.id || target.parentNode.id  // for the <strong> in the #create-new-recall
	 	 	 ;
	 	 	 console.log('Handling click on', id, 'with text "' + this.selectedText + '"');
	 	 	 //this.hide(true);  // hide the selection after hiding the menu; useful if opening a link in a new tab
	 	 },
	 	 onselect: function (e) {
	 	 	 var fullText = this.selectedText;
             var truncatedText = fullText.length > 30 ? fullText.slice(0, 30) + '...' : fullText;
             document.getElementById("selectedFullText").value = fullText;
	 	 	 document.getElementById("selectText").innerHTML = '"' + truncatedText.replace(/\s+/g, ' ') + '"';
	 	 	 $(".words").html('');
	 	 	 $.ajax({
	 	 	 	 url: '/' + languageUI + '/Dictionary/Search/',
	 	 	 	 data: { searchText: truncatedText, size: 3 }
	 	 	 }).done(function (words) {
	 	 	     var dic = 1;
	 	 	 	 $.each(words.words, function (key, value) {
	 	 	 	 	 //var len = value.descriotion.length;
	 	 	 	     //var showBtn = len > 260 ? '<a href="#" class="btn-show-full">Показать полностью</a>' : '';
	 	 	 	     var desc = $.parseHTML(value.descriotion);
	 	 	 	 	 var html = ' <div class="dictionary-title"><a href="' + '/' + languageUI + '/Dictionary/Detail/?id=' + value.id + '">' + value.title + '</a></div>';
	 	 	 	 	 html += ' <div class="dictionary-descr"> Словарь: ' + value.dictionaryType.name + '</div>';
	 	 	 	 	 html += ' <div class="dictionary-text desc-'+dic+'"></div>';
	 	 	 	 	 
	 	 	 	 	 $(".words").append(html);
	 	 	 	 	 $('.desc-' + dic).append(desc[0].textContent);
	 	 	 	 	 dic = dic + 1;
	 	 	 	 });

	 	 	 });
	 	 },
	 	 debug: false
	 });

});

