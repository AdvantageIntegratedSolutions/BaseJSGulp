var app = require('./app.json'),
    gulp = require('gulp'),
		gutil = require('gulp-util'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    babel = require('gulp-babel'),
    react = require('gulp-react'),
    sourcemaps = require('gulp-sourcemaps'),
    git = require('gulp-git'),
    rename = require('gulp-rename'),
    insert = require('gulp-insert'),
    XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest,
    XML = require('pixl-xml');

//tasks not related to code
var adminTasks = [
  'git-add', 
  'git-commit', 
  'git-push'
];

//tasks related to code
var bundleTasks = [
  'move-pages',
  'build-js', 
  'build-jsx', 
  'build-css', 
  'git-add', 
  'git-commit', 
  'git-push', 
  'quickbase-push'
];

//add the watch task as default
gulp.task('default', ['watch']);

//move pages
gulp.task('move-pages', function() {
  return gulp.src('source/*.html')
    .pipe(rename(function (path) {
      path.basename = app.name + "-" + path.basename;
    }))
    .pipe(insert.prepend('<!-- '+app.origin+' -->\n'))
    .pipe(gulp.dest('quickbase/'));
});

//compile scss
gulp.task('build-css', function() {
  return gulp.src('source/scss/**/*')
    .pipe(sass())
    .pipe(concat(app.name + '-'+app.cssBundlePrefix+'.css'))
    .pipe(insert.prepend('/*'+app.origin+'*/\n'))
    .pipe(gulp.dest('quickbase/'));
});

//compile JS
gulp.task('build-js', function() {
  return gulp.src('source/javascript/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(uglify())
    .pipe(concat(app.name + '-'+app.jsBundlePrefix+'.js'))
    .pipe(insert.prepend('//'+app.origin+'\n'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('quickbase/'));
});

//compile JSX
gulp.task('build-jsx', function() {
  return gulp.src('source/javascript/**/*.jsx')
    .pipe(sourcemaps.init())
    .pipe(react())
    .pipe(uglify())
    .pipe(concat(app.name + '-'+app.jsBundlePrefix+'.js'))
    .pipe(insert.prepend('//'+app.origin+'\n'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('quickbase/'));
});

gulp.task('deploy', function(){
  gulp.start('git-add', 'git-commit', 'git-push');
});

//git init repo
gulp.task('init', function(){
  git.init(function (err) {
    if (err) throw err;
    gulp.start('addRemote');
  });
});

//add remote origin
gulp.task('addRemote', function(){
  git.addRemote('origin', app.origin, function (err) {
    if (err) throw err;
  });
});

//push to git
gulp.task('git-add', ['move-pages', 'build-js', 'build-css'], function(){
  return gulp.src('.')
    .pipe(git.add())
});

gulp.task('git-commit', ['git-add'], function(){
  return gulp.src('.')
    .pipe(git.commit('Auto commited by gulp'));
});

gulp.task('git-push', ['git-commit'], function() {
  git.push('origin', 'master', function (err) {
    if (err) throw err;
  });
});

gulp.task('quickbase-auth', function() {

});

//push to QuickBase App
gulp.task('quickbase-push', function(filename, contents) {

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

function sendQBRequest(action, data){
  var req = new XMLHttpRequest();

  var url = "https://" + app.realm + ".quickbase.com/db/" + app.dbid + "?act=" + action;
  req.open("POST", url, true);
  req.setRequestHeader("Content-Type", "text/xml");

  req.onreadystatechange = function() {
    if(req.readyState == 4 && req.status == 200) {
      var xml = XML.parse(req.responseText);
    };
  };

  req.send(data);
};

//manually trigger deployment
gulp.task('deploy', function() {
  gulp.start.apply(this, bundleTasks);
});

//configure tasks to run on all file changes
gulp.task('watch', function() {
  gulp.watch(['app.json', 'gulpfile.js', 'packages.json', 'README', '.gitignore'], adminTasks);
  gulp.watch('source/**/*', bundleTasks);
});