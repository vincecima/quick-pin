$(function(){
	$("form[action='/add']").on("submit", function(event){
  	event.preventDefault();

  	var originalURL = $("[name='url']").val();

  	$.ajax({
    	type: 'POST',
    	url: '/add',
    	data: $(this).serialize(),
    	success: function(data, textStatus, jqXHR) {
    		var returnToPage = $("#returnToPage").is(':checked');
      	chrome.extension.sendRequest({
      		"action": "submit_pinboard_form_ajax",
      		"returnToPage": returnToPage,
      		"originalURL": originalURL
      	});
    	}
  	});
	});

	$("[type='submit']").after("<input id='returnToPage' type='checkbox'> Return to page");
});