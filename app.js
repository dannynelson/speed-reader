$(document).on('keydown', function(e){
  if (e.altKey && e.keyCode === 83) enterSpeedReadMode();
});


$('body').on('click', '.sr', function(event){
  $('.selected').removeClass('selected');
  $(this).addClass('selected');
});

var play = function(intervalID) {
  intervalID = setInterval(selectNext, 200);
  $(document).keydown(function(e) {
    window.clearInterval(intervalID);
  });
};

var enterSpeedReadMode = function() {
  // add css classes
  console.log('enter speed read');
  wrapTextInSpans();
  $('.sr').first().addClass('selected');
  $('.sr').addClass('faded');

  // add keypress listeners
  $(document).keydown(function(e){
    // enter
    if (e.keyCode === 13) play();
    // left arrow
    if (e.keyCode === 27) exitSpeedReadMode();
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