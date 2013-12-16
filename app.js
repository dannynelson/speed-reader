// alert('script worked!');
console.log('hello');


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

wrapTextInSpans();

$('.sr').on('click', function(event){
  if (event.altKey) {
    $(this).addClass('selected');
    $('.sr').addClass('faded');
    console.log('altClicked!');
  }
});

$(document).keydown(function(e){
  if (e.keyCode == 37) selectPrev();
  if (e.keyCode == 39) selectNext();
});

var selectNext = function() {
  $next = $('.sr.selected').next();
  $('.sr.selected').removeClass('selected');
  $next.addClass('selected');
};

var selectPrev = function() {
  $prev = $('.sr.selected').prev();
  $('.sr.selected').removeClass('selected');
  $prev.addClass('selected');
};