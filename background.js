 // chrome.runtime.onMessage.addListener(
 //  debugger;
 //  function(request, sender, sendResponse) {
 //    var view = chrome.extension.getViews({type: 'popup'});
 //    console.log(view);
 //    // console.log(sender.tab ?
 //    //             "from a content script:" + sender.tab.url :
 //    //             "from the extension");
 //    if (request.greeting == "hello")
 //      sendResponse({farewell: request.greeting});
 //  });

var text = "hello3";
chrome.runtime.onMessage.addListener(function(message,sender,sendResponse){
  if(message.method == 'setText') {
    text = message.text;
    console.log(message.text);
  } else if(message.method == 'getText') {
    sendResponse(text);
    console.log("text sent");
  }
});