var app = require('./app.json'),
    gulp = require('gulp'),
		gutil = require('gulp-util'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    babel = require('gulp-babel'),
    sourcemaps = require('gulp-sourcemaps'),
    git = require('gulp-git'),
    XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

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
    .pipe(concat(app.name + '.html'))
    .pipe(gulp.dest('public/'));
});

//compile scss
gulp.task('build-css', function() {
  return gulp.src('source/scss/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('public/assets/stylesheets'));
});

//compile JS
gulp.task('build-js', function() {
  return gulp.src('source/javascript/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(concat(app.name + '.js'))
    .pipe(babel())
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('public/assets/javascript'));
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

//push to QuickBase App
gulp.task('quickbase-push', function() {
  var req = new XMLHttpRequest();

  var url = "https://" + app.realm + ".quickbase.com/db/" + app.dbid + "?act=API_AddReplaceDBPage";
  req.open("POST", url, true);

  req.onreadystatechange = function() {
    if(req.readyState == 4 && req.status == 200) {
      console.log(req.responseText);
    };
  };

  req.setRequestHeader("Content-Type", "text/xml");

  var data = [];
  data.push("<qdbapi>");
  data.push.apply(data, ["<apptoken>", app.token, "</apptoken>"]);
  data.push.apply(data, ["<ticket>", "8_bkb65j6xd_by5veh_bkh_a_d86rihfd2pbmvqca5pa58d5pb2ivbjhgpnpcp4ug59dticsbhdueyhaw", "</ticket>"]);

  console.log(data.join(""))

  req.send(data.join(""));
});

//manually trigger deployment
gulp.task('deploy', function() {
  gulp.start.apply(this, bundleTasks);
});

//configure tasks to run on all file changes
gulp.task('watch', function() {
  gulp.watch(['app.json', 'gulpfile.js', 'packages.json', 'README', '.gitignore'], adminTasks);
  gulp.watch('source/**/*', bundleTasks);
});