chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.action === "capture_tab_info") {
      var destURL = "https://pinboard.in/add?";
      destURL += "next=same";
      destURL += "&url=" + encodeURIComponent(request.location);
      destURL += "&description=" + encodeURIComponent(request.selection);
      destURL += "&title=" + encodeURIComponent(request.title);

      chrome.storage.sync.get({'behavior': 'close'}, function(values){
        var behavior_value = values['behavior'];
        switch(behavior_value){
          case "return":
          case "close":
            chrome.tabs.update(sender.tab.id, {url: destURL}, function(tab) {
              injectAddFormScripts(tab);
            });
            break;
          case "popup":
            chrome.windows.create({url: destURL, type: "popup", width: 700, height: 350}, function(wind){
              injectAddFormScripts(wind.tabs[0]);
            });
            break;
        }
      });
    }
    else if (request.action === "submit_pinboard_form_ajax") {
      chrome.storage.sync.get({'behavior': 'close'}, function(values){
        var behavior_value = values['behavior'];
        switch(behavior_value){
          case "return":
            chrome.tabs.update(sender.tab.id, {url: request.location}, null);
            break;
          case "popup":
          case "close":
            chrome.tabs.remove(sender.tab.id);
            break;
        }
      });
    }
  }
);

//React when a browser action's icon is clicked.
chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.executeScript(null, {file: "capture_tab_info.js"});
});

//Only inject our form modification when extension opened form
function injectAddFormScripts(tab) {
  chrome.tabs.executeScript(tab.id,
    {file: "jquery-1.8.3.min.js"}
  );
  chrome.tabs.executeScript(tab.id,
    {file: "submit_pinboard_form_ajax.js"}
  );
}