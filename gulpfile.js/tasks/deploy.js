var app     = require('../../app')
var gulp    = require('gulp')
var git     = require('gulp-git')
var rename  = require('gulp-rename')
var replace = require('gulp-replace')
var insert  = require('gulp-insert')

var deployTasks = [
  'html',
  'css',
  'js',
  'git-add',
  'git-commit',
  'quickbase-push',
  'git-push'
];

gulp.task('deploy', function() {
  gulp.start.apply(this, deployTasks);
})

//git init repo
gulp.task('init', function(){
  git.init(function (err) {
    if (err) throw err;
    gulp.start(['addRemote', 'update-readme']);
  });
});

gulp.task('update-readme', function(){
  gulp.src(['README.md'])
    .pipe(replace(/.*\n?/g, ''))
    .pipe(insert.append("# " + app.name + "\n"))
    .pipe(insert.append("#### Description: " + app.description + "\n"))
    .pipe(insert.append("#### Client: " + app.client + "\n"))
    .pipe(insert.append("#### Authors: " + app.authors))
    .pipe(gulp.dest('.'));
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
    .pipe(git.commit('Auto commited by gulp'))
    .on('error', function(){
      this.emit('end');
    });
});

gulp.task('git-push', ['git-commit'], function() {
  git.push('origin', 'master', function (err) {
    if (err) throw err;
  });
});