// alert('script worked!');
console.log('hello');

$('p').on('click', function(event){
  if (event.altKey) {
    console.log('altClicked!');
    wrapTextInSpans();
  }
});

var wrapTextInSpans = function() {
  $('p').each(function(idx, item) {
    $node = $(item);
    var words = $node.text().split(' ');
    $node.text('');
    words.forEach(function(word) {
      $node.append('<span class="sr">' + word + '</span> ');
    });
  });
};


// $('span').on('click', function() {
//   $(this).addClass('sr-selected');
// });

// $(document).keydown(function(e){
//   debugger;
//   if (e.keyCode == 37) {
//     $prev = $('.sr-selected').prev();
//     $('.sr-selected').removeClass('sr-selected');
//     $prev.addClass('sr-selected');
//   }
//   if (e.keyCode == 39) {
//     $next = $('.sr-selected').next();
//     $('.sr-selected').removeClass('sr-selected');
//     $next.addClass('sr-selected');
//   }
// });