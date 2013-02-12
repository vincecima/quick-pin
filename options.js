function save_options() {
  var select = document.getElementById("behavior");
  var behavior_value = select.children[select.selectedIndex].value;
  chrome.storage.sync.set({'behavior': behavior_value}, function() {
    var status = document.getElementById("status");
    status.innerHTML = "Options Saved.";
    setTimeout(function() {
      status.innerHTML = "";
    }, 750);
  });
}

function restore_options() {
  chrome.storage.sync.get({'behavior': 'close'}, function(values){
    var behavior_value = values['behavior'];
    var select = document.getElementById("behavior");
    for (var i = 0; i < select.children.length; i++) {
      var child = select.children[i];
      if (child.value == behavior_value) {
        child.selected = "true";
        break;
      }
    }
  });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.querySelector('#save').addEventListener('click', save_options);