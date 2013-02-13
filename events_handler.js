chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
    sendResponse({});
    if (request.action === "capture_tab_info") {
      var destURL = "https://pinboard.in/add?"
      destURL += "next=same";
      destURL += "&url=" + encodeURIComponent(request.location)
      destURL += "&description=" + encodeURIComponent(request.selection)
      destURL += "&title=" + encodeURIComponent(request.title)
      destURL += "&source=quick_pin"
      chrome.tabs.update(sender.tab.id, {url: destURL}, null);
    }
    else if (request.action === "submit_pinboard_form_ajax") {
      chrome.tabs.remove(sender.tab.id);
    }
  }
);

//React when a browser action's icon is clicked.
chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.executeScript(null, {file: "capture_tab_info.js"});
});