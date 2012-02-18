$("form[action='/add']").on("submit", function(event){
  event.preventDefault();
  $.ajax({
    type: 'POST',
    url: '/add',
    data: $(this).serialize(),
    success: function(data, textStatus, jqXHR) {
      chrome.extension.sendRequest({"action": "submit_pinboard_form_ajax",});
    }
  });
});
