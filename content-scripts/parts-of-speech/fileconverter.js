var obj = {};
var fs = require('fs');

readFile = function(filePath, callback){
  fs.readFile(filePath, 'utf8', function(err, data) {
    if (err) throw err;
    var words = data.split('\n');
    callback(words);
  });
};

var addToObject = function(words) {
  words.forEach(function(word) {
    obj[word] = true;
  });
  console.log(obj);
  writeFile();
};

var writeFile = function() {
  fs.writeFile("conjunctions.js", JSON.stringify(obj), function(err) {
    if(err) {
      console.log(err);
    } else {
      console.log("The file was saved!");
    }
  });
};

readFile(__dirname + '/conjunctions.txt', addToObject);