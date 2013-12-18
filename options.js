$(document).ready(function() {
  $('.save').on('click', function() {
    saveChanges();
  });
});

var saveChanges = function() {
  var speed = $('.speed-selection').val();
  speed = parseInt(speed);

  var style = $('.style').val();

  chrome.storage.local.clear(function() {
    console.log('Storage Cleared');
  });
  
  chrome.storage.local.set({
    'speed': speed,
    'style': style
  });

  alert('Changes Saved!');
};

