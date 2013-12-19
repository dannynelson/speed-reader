$(document).ready(function() {
  $('.next').on('click', function() {
    
  });
});

chrome.runtime.sendMessage({method:'getText'}, function(response){
  $('.output').text(response);
});

// var setText = function(text) {
//   console.log('text');
// }

// document.write('hello');
