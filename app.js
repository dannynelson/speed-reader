// alert('script worked!');
console.log('hello');

$('p').each(function(idx, item) {
  $node = $(item);
  var words = $node.text().split(' ');
  $node.text('');
  words.forEach(function(word) {
    debugger;
    $node.append('<span>' + word + '</span> ');
  });
});