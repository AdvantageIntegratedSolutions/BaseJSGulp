var gulp           = require('gulp')
var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest
var XML            = require('pixl-xml')
var app            = require('../../app')
var ticket         = ""

//cache QuickBase ticket(expires in 1 year)
gulp.task('quickbase-push', function() {
  if(!app.ticket){
    var data = [];
    data.push("<qdbapi>");
    data.push.apply(data, ["<apptoken>", app.token, "</apptoken>"]);
    data.push.apply(data, ["<username>", app.username, "</username>"]);
    data.push.apply(data, ["<password>", app.password, "</password>"]);
    data.push.apply(data, ["<hours>", "8760", "</hours>"]);
    data.push("</qdbapi>");

    sendQBRequest("API_Authenticate", data.join(""), true);
  };
});

//push to QuickBase App
gulp.task('quickbase-upload', function() {
  var pageBody = "hello";
  var filename = "filename";

  var data = [];
  data.push("<qdbapi>");
  data.push.apply(data, ["<apptoken>", app.token, "</apptoken>"]);
  data.push.apply(data, ["<ticket>", ticket, "</ticket>"]);
  data.push.apply(data, ["<pagebody>", pageBody, "</pagebody>"]);
  data.push.apply(data, ["<pagetype>", "1", "</pagetype>"]);
  data.push.apply(data, ["<pagename>", filename, "</pagename>"]);
  data.push("</qdbapi>");

  sendQBRequest("API_AddReplaceDBPage", data.join(""));
});

function sendQBRequest(action, data, mainAPICall){
  var req = new XMLHttpRequest();
  var dbid = mainAPICall ? "main" : app.dbid;

  var url = "https://" + app.realm + ".quickbase.com/db/" + dbid + "?act=" + action;
  req.open("POST", url, true);
  req.setRequestHeader("Content-Type", "text/xml");

  req.onreadystatechange = function() {
    if(req.readyState == 4 && req.status == 200) {
      var xml = XML.parse(req.responseText);

      if(xml.ticket){
        ticket = xml.ticket;
        gulp.start('quickbase-upload');
      };
    };
  };

  req.send(data);
};