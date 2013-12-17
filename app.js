var listenForAltS = function() {
  $(document).on('keydown', function(e){
    // alt-s to enter speed read mode
    if (e.altKey && e.keyCode === 83) enterSpeedReadMode();
  });
};

listenForAltS();

$('body').on('click', '.sr', function(event){
  $('.selected').removeClass('selected');
  $(this).addClass('selected');
});

var play = function(intervalID) {
  intervalID = setInterval(selectNext, 400);
  $(document).keydown(function(e) {
    window.clearInterval(intervalID);
  });
};

var enterSpeedReadMode = function() {
  // add css classes
  wrapChunksInSpans();
  $('.sr').first().addClass('selected');
  $('.sr').addClass('faded');

  // add keypress listeners
  $(document).keydown(createSpeedReadEvents = function(e){
    // enter
    if (e.keyCode === 13) play();
    // escape
    if (e.keyCode === 27) exitSpeedReadMode();
    // left arrow
    if (e.keyCode === 37) selectPrev();
    // right arrow
    if (e.keyCode === 39) selectNext();
  });
};

var exitSpeedReadMode = function() {
  unwrapTextFromSpans();
  // TODO: check if it causes problems
  $(document).off('keydown');
  $(document).on('keydown', function(e){
    if (e.altKey && e.keyCode === 83) enterSpeedReadMode();
  });
};

var selectNext = function() {
  if ($('.sr.selected').next().length === 0) {
    var nextAvailable = $('.sr.selected').parent().next().find('.sr')[0];
    debugger;
    $('.sr.selected').removeClass('selected');
    $(nextAvailable).addClass('selected');
  } else {
    $next = $('.sr.selected').next();
    $('.sr.selected').removeClass('selected');
    $next.addClass('selected');
  }
};

var selectPrev = function() {
  if ($('.sr.selected').prev().length === 0) {
    var previousNodes = $('.sr.selected').parent().prev().find('.sr');
    var previousAvailabe = previousNodes[previousNodes.length-1];
    $('.sr.selected').removeClass('selected');
    $(previousAvailabe).addClass('selected');
  } else {
    $prev = $('.sr.selected').prev();
    $('.sr.selected').removeClass('selected');
    $prev.addClass('selected');
  }
};

// var wrapSingleWordsInSpans = function() {
//   debugger;
//   $('p').each(function(i, item) {
//     $(item.childNodes).each(function(j, node) {
//       // for text
//       if (node.nodeName === "#text") {
//         $node = $(node);
//         var words = $node.text().split(' ');
//         html = ' ';
//         words.forEach(function(word) {
//           debugger;
//           if (word !== '') html += '<span class="sr">' + word + ' </span>';
//         });
//         html += ' ';
//         $node.replaceWith(html);
//       } else {
//         $node = $(node).wrap('<span class="sr"></span>');
//       }
//     });
//   });
// };

var wrapChunksInSpans = function() {
  $('p').each(function(i, p) {
    var $childNodes = $(p.childNodes).clone(); //make a duplicate
    $(p).html('');
    var phrase = '';
    var phraseLength = 0;
    $childNodes.each(function(j, node) {
      if (node.nodeName === "#text") {
        var words = $(node).text().split(' ');
        words.forEach(function(word) {
          if (phraseLength > 1 && (prepositions[word] || verbs[word] || conjunctions[word]) || word[0] === '(' || word[0] === '"') {
            phrase = '<span class="sr">' + phrase +'</span>';
            $(p).append(phrase);
            phrase = '';
            phraseLength = 0;
          }
          if (word === '') {
            phrase += ' ';
          } else {
            phrase += word + ' ';
            phraseLength++;
            if (word[word.length-1] === '.' || word[word.length-1] === ',') {
              phrase = '<span class="sr">' + phrase +'</span>';
              $(p).append(phrase);
              phrase = '';
              phraseLength = 0;
            }
          }
        });
      } else {
        phraseLength += $(node).text().split(' ').length || 0; //calculate number of contained words
        var html = $('<div>').append($(node).clone()).html(); //convert $node to html string
        phrase += html; //append to phrase
      }
    });
  });
};

var unwrapTextFromSpans = function() {
  $('.sr').contents().unwrap();
};