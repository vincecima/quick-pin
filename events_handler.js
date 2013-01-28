chrome.extension.onRequest.addListener(
  function(request, sender, sendResponse) {
    sendResponse({});
    if (request.action === "capture_tab_info") {
      var destURL = "https://pinboard.in/add?"
      destURL += "next=same";
      destURL += "&url=" + encodeURIComponent(request.location)
      destURL += "&description=" + encodeURIComponent(request.selection)
      destURL += "&title=" + encodeURIComponent(request.title)
      destURL += "&source=quick_pin"
      //chrome.tabs.update(null, {url: destURL}, null);
      chrome.windows.create({ url: destURL, type: "detached_panel", width: 700, height: 550, focused: true });
    }
    else if (request.action === "submit_pinboard_form_ajax") {
      var source = getUrlVar("source", sender.tab.url);
      var destURL = getUrlVar("next", sender.tab.url)
      //alert("source=" + source);
      if (source === "quick_pin") {
        chrome.tabs.remove(sender.tab.id);
      } else {
        chrome.tabs.update(null, {url: destURL}, null);
      }
    }
  }
);

//React when a browser action's icon is clicked.
chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.executeScript(null, {file: "capture_tab_info.js"});
});
function getUrlVar(key,url){
  var result = new RegExp(key + "=([^&]*)", "i").exec(url); 
  return result && unescape(result[1]) || ""; 
}
