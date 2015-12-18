var app     = require('../../app')
var gulp    = require('gulp')
var git     = require('gulp-git')
var rename  = require('gulp-rename')

var deployTasks = [
  'html',
  'css',
  'js',
  'git-add',
  'git-commit',
  'git-push',
  'quickbase-push'
];

gulp.task('deploy', function() {
  gulp.start.apply(this, deployTasks);
})

//git init repo
gulp.task('init', function(){
  git.init(function (err) {
    if (err) throw err;
    gulp.start('addRemote');
  });
});

//rename app
gulp.task('rename-app', function() {

  return gulp.src("./*")
    .pipe(rename(function (path) {
      console.log(path.basename)
      //path.dirname = "**"
      //path.basename = app.name;
    }))
    .pipe(gulp.dest("."));
});

//add remote origin
gulp.task('addRemote', function(){
  git.removeRemote('origin', function (err) {
    if (err) throw err;
    git.addRemote('origin', app.origin, function (err) {
      if (err) throw err;
    });
  });
});

//push to git
gulp.task('git-add', ['html', 'js', 'css'], function(){
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