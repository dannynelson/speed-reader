// alert('script worked!');
console.log('hello');

$('p').each(function(idx, item) {
  $node = $(item);
  var words = $node.text().split(' ');
  $node.text('');
  words.forEach(function(word) {
    $node.append('<span>' + word + '</span> ');
  });
});

$('span').on('click', function() {
  $(this).addClass('sr-selected');
});

$(document).keydown(function(e){
  if (e.keyCode == 37) {}
  if (e.keyCode == 39) {
    $next = $('.sr-selected').next();
    $('.sr-selected').removeClass('sr-selected');
    $next.addClass('sr-selected');
  }
});