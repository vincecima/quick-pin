var additionalInfo = {
  "action": "capture_tab_info",
  "title": document.title,
  "selection": window.getSelection().toString(),
  "location": location.href
};

chrome.extension.sendMessage(additionalInfo);