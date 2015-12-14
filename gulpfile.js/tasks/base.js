var gulp           = require('gulp')
var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest
var XML            = require('pixl-xml')
var app            = require('../../app')

//Cache QuickBase ticket
gulp.task('quickbase-auth', function() {
  if(!app.ticket){
    var data = [];
    data.push("<qdbapi>");
    data.push.apply(data, ["<apptoken>", app.token, "</apptoken>"]);
    data.push.apply(data, ["<username>", app.username, "</username>"]);
    data.push.apply(data, ["<password>", app.password, "</password>"]);
    data.push.apply(data, ["<hours>", "24", "</hours>"]);
    data.push("</qdbapi>");

    sendQBRequest("API_Authenticate", data.join(""), true);
  };
});

//push to QuickBase App
gulp.task('quickbase-push', ['git-push'], function(filename, contents) {
  var ticket = "8_bkb65j6xd_by5veh_bkh_a_d86rihfd2pbmvqca5pa58d5pb2ivbjhgpnpcp4ug59dticsbhdueyhaw";
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
        app.ticket = xml.ticket);
      };

      console.log(xml)
    };
  };

  req.send(data);
};