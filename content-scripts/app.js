// =================
// EVENT LISTENERS
// =================

var listeners = {
  altS: function() {
    $(document).on('keydown', function(e){
      if (e.altKey && e.keyCode === 83) enterSpeedReadMode();
      listeners.wordClicks();
    });
  },

  wordClicks: function() {
    $('body').on('click', '.sr', function(event){
      $('.selected').removeClass('selected');
      $(this).addClass('selected');
    });
  },

  srNavigartionKeys: function() {
    $(document).keydown(function(e){
      // enter
      if (e.keyCode === 13) play();
      // escape
      if (e.keyCode === 27) exitSpeedReadMode();
      // left arrow
      if (e.keyCode === 37) selectPrev();
      // right arrow
      if (e.keyCode === 39) selectNext();
    });
  }
};

listeners.altS();

// ==============
// HELPER METHODS
// ==============

var enterSpeedReadMode = function() {
  // add css classes
  wrapChunksInSpans();
  $('.sr').first().addClass('selected');
  $('.sr').addClass('faded');
  listeners.srNavigartionKeys();
};

var exitSpeedReadMode = function() {
  unwrapTextFromSpans();
  // TODO: check if it causes problems
  $(document).off('keydown');
  listeners.altS();
};

var play = function(intervalID) {
  intervalID = setInterval(selectNext, 300);
  $(document).keydown(function(e) {
    window.clearInterval(intervalID);
  });
};

var selectNext = function() {
  if ($('.sr.selected').next().length === 0) {
    var nextAvailable = $('.sr.selected').parent().next().find('.sr')[0];
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

// ============
// PAGE PARSERS
// ============

var wrapSingleWordsInSpans = function() {
  $('p').each(function(i, item) {
    $(item.childNodes).each(function(j, node) {
      // for text
      if (node.nodeName === "#text") {
        $node = $(node);
        var words = $node.text().split(' ');
        html = ' ';
        words.forEach(function(word) {
          debugger;
          if (word !== '') html += '<span class="sr">' + word + ' </span>';
        });
        html += ' ';
        $node.replaceWith(html);
      } else {
        $node = $(node).wrap('<span class="sr"></span>');
      }
    });
  });
};

//

// var wrapChunksInSpans = function() {
//   $('p').each(function(i, p) {
//     var $childNodes = $(p.childNodes).clone(); //make a duplicate
//     $(p).html('');
//     var phrase = [];
//     var phraseLength = 0;

//     var checkPhraseLength = function() {
//       if (phraseLength >= 5) {
//         var median = Math.ceil(phrase.length / 2);
//         var newPhrase = phrase.splice(median);
//         appendPhraseToNode(phrase);
//         appendPhraseToNode(newPhrase);
//       } else {
//         appendPhraseToNode(phrase);
//       }
//       phrase = [];
//       phraseLength = 0;
//     };

//     var appendPhraseToNode = function(phrase) {
//       phrase = '<span class="sr"> ' + phrase.join(' ') +' </span>';
//       $(p).append(phrase);
//     };

//     $childNodes.each(function(j, node) {
//       if (node.nodeName === "#text") {
//         var words = $(node).text().split(' ');

//         words.forEach(function(word) {
//           if (checkForPhraseEnd(word, phraseLength)) checkPhraseLength();
//           if (word === '') phrase.push('');
//           if (word !== '') {
//             phrase.push(word);
//             phraseLength++;
//             if (word[word.length-1] === '.' || word[word.length-1] === ';' || word[word.length-1] === ',') checkPhraseLength();
//           }
//         });
//       } else {
//         phraseLength += $(node).text().split(' ').length || 0; //calculate number of contained words
//         var html = $('<div>').append($(node).clone()).html(); //convert $node to html string
//         phrase.push(html); //append to phrase
//       }
//     });
//   });
// };

var wrapChunksInSpans = function() {
  // helper functions
  var wrapWithSpan = function(text, spanClassName) {
    return '<span class="'+ spanClassName +'">' + text + '</span>';
  };

  var textToPhrases = function(string) {
    var phrases = splitTextByPunctuation(string);
    for (var i = 0; i < phrases.length; i++) {
      if (findPhraseWordCount(phrases[i]) >= 6) {
        phrases[i] = splitTextByPartsOfSpeech(phrases[i]);
      }
    }
    phrases = _.flatten(phrases);
    var finalPhrases = [];
    for (i = 0; i < phrases.length; i++) {
      var wordCount = findPhraseWordCount(phrases[i]);
      if (wordCount >= 6) {
        finalPhrases.push(splitTextInHalf(phrases[i]));
      } else {
        finalPhrases.push(phrases[i]);
      }
    }
    return _.flatten(finalPhrases);
  };

  var wrapPhrasesWithSpans = function(phrasesArr) {
    return _(phrasesArr).map(function(phrase) {
      return wrapWithSpan(phrase, 'sr faded');
    });
  };

  var flattenArray = function(array) {
    return array.reduce(function longest(a, b) {
        b = Array.isArray(b)? b.reduce(longest, '') : b;
        return b.length > a.length? b : a;
    }, '');
  };

  var findPhraseWordCount = function(phrase) {
    var phraseLength = 0;
    phrase.split(' ').forEach(function(word) {
      if (word !== '') phraseLength++;
    });
    return phraseLength;
  };

  var splitTextByPartsOfSpeech = function(phrase) {
    phrases = [];
    phraseWords = [];

    phrase.split(' ').forEach(function(word) {
      if (phraseWords.length > 2 && (prepositions[word] || conjunctions[word])) {
        phrases.push(phraseWords.join(' '));
        phraseWords = [];
      }
      phraseWords.push(word);
    });

    phrases.push(phraseWords.join(' '));
    return phrases;
  };

  var splitTextInHalf = function(phrase) {
    phrases = [];
    phraseWords = [];
    var words = phrase.split(' ');
    var median = Math.floor(words.length / 2);
    words.forEach(function(word, i) {
      if (i === median) {
        phrases.push(phraseWords.join(' '));
        phraseWords = [];
      }
      phraseWords.push(word);
    });

    phrases.push(phraseWords.join(' '));
    return phrases;
  };

  var splitTextByVerbs = function(phrase) {
    phrases = [];
    phraseWords = [];

    phrase.split(' ').forEach(function(word) {
      if (phraseWords.length > 2 && (verbs[word] || verbs[word.slice(0, word.length-1)]) || verbs[word.slice(0, word.length-2)]) {
        phrases.push(phraseWords.join(' '));
        phraseWords = [];
      }
      phraseWords.push(word);
    });

    phrases.push(phraseWords.join(' '));
    return phrases;
  };

  var splitTextByPunctuation = function(string) {
    var phrases = [];
    phraseWords = [];

    var addPhrase = function() {
      phrases.push(phraseWords.join(' '));
      phraseWords = [];
    };

    string.split(' ').forEach(function(word) {
      if ( (/[\("]/).test(word[0]) ) addPhrase();
      phraseWords.push(word);
      if ( (/[.,;"”!-\)]/).test(word[word.length-1]) ) addPhrase();
    });

    return phrases;
  };

  // main logic
  $('p').each(function(i, p) {
    var $childNodes = $(p.childNodes).clone();// make a duplicate
    $(p).html('');// clear original

    $childNodes.each(function(j, node) {
      if (node.nodeName === "#text") {
        node = wrapWithSpan($(node).text(), 'sr-text');
      }
      var phrases = textToPhrases($(node).text());
      phrases = wrapPhrasesWithSpans(phrases);
      newNode = phrases.join(' ');
      var $newNode = $(node).html(newNode);
      $(p).append($newNode);
    });
  });
};

// ===================
// PAGE PARSER HELPERS
// ===================

var checkForPhraseEnd = function(word, phraseLength) {
  return phraseLength > 2 &&
  (prepositions[word] || verbs[word] || verbs[word.slice(0, word.length-1)] || conjunctions[word] || word[word.length-2]+word[word.length-1] === 'ed') ||
  (word[0] === '(' || word[0] === '"');
};

var unwrapTextFromSpans = function() {
  $('.sr').contents().unwrap();
};