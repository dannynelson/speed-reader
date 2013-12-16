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
    enterSpeedReadMode($(this));
  }
});

var play = function(intervalID) {
  intervalID = setInterval(selectNext, 200);
  $(document).keydown(function(e) {
    window.clearInterval(intervalID);
    exitSpeedReadMode();
  });
};

var enterSpeedReadMode = function($clickedWord) {
  // add css classes
  $clickedWord.addClass('selected');
  $('.sr').addClass('faded');
  console.log('altClicked!');

  // add keypress listeners
  $(document).keydown(function(e){
    // enter
    if (e.keyCode === 13) play();
    // left arrow
    if (e.keyCode === 37) selectPrev();
    // right arrow
    if (e.keyCode === 39) selectNext();
  });
};

var exitSpeedReadMode = function() {
  $('.sr.selected').removeClass('selected');
  $('.sr.faded').removeClass('faded');
};

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