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
  debugger;
  $(this).addClass('selected');
});