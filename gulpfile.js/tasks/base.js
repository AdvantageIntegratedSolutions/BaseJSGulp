var app            = require('../../app')
var gulp           = require(process.env.BASE_JS_NODE_PATH + 'gulp')
var XMLHttpRequest = require(process.env.BASE_JS_NODE_PATH + 'xmlhttprequest').XMLHttpRequest
var XML            = require(process.env.BASE_JS_NODE_PATH + 'pixl-xml')
var foreach        = require(process.env.BASE_JS_NODE_PATH + 'gulp-foreach')
var path           = require(process.env.BASE_JS_NODE_PATH + 'path')

gulp.task('quickbase-push', ['git-push'], function() {
  var data = [];
  data.push("<qdbapi>");
  data.push.apply(data, ["<apptoken>", app.token, "</apptoken>"]);
  data.push.apply(data, ["<username>", app.username, "</username>"]);
  data.push.apply(data, ["<password>", app.password, "</password>"]);
  data.push.apply(data, ["<hours>", "1", "</hours>"]);
  data.push("</qdbapi>");

  sendQBRequest("API_Authenticate", data.join(""), true);
  //successful auth call will trigger page upload
});

//push to QuickBase App
gulp.task('quickbase-upload', function() {
  var pageBody = "hello";
  var filename = "filename";

  return gulp.src('qb-pages/*')
    .pipe(foreach(function(stream, file){
      filename = handleXMLChars(path.basename(file.path));
      contents = handleXMLChars(file.contents.toString());

      var data = [];
      data.push("<qdbapi>");
      data.push.apply(data, ["<apptoken>", app.token, "</apptoken>"]);
      data.push.apply(data, ["<ticket>", ticket, "</ticket>"]);
      data.push.apply(data, ["<pagebody>", contents, "</pagebody>"]);
      data.push.apply(data, ["<pagetype>", "1", "</pagetype>"]);
      data.push.apply(data, ["<pagename>", filename, "</pagename>"]);
      data.push("</qdbapi>");

      sendQBRequest("API_AddReplaceDBPage", data.join(""));
    }))
});

function handleXMLChars(string){
  return string
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
};

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