$(document).ready(function() {
  $('.save').on('click', function() {
    saveChanges();
  });
});

var saveChanges = function() {
  var speed = $('.speed-selection').val();
  speed = parseInt(speed);
  chrome.storage.local.set({'speed': speed});
  alert('Changes Saved!');
};

