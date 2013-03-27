$("form[action='/add']").on("submit", function(event){
  event.preventDefault();

  var $this = $(this);
  var additionalInfo = {
  	"action": "submit_pinboard_form_ajax",
  	"location": $this.find('input[name="url"]').val()
  };

  $.ajax({
    type: 'POST',
    url: '/add',
    data: $this.serialize(),
    success: function(data, textStatus, jqXHR) {
      chrome.extension.sendMessage(additionalInfo);
    }
  });
});
