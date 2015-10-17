var app = require('./app.json'),
    base = require('https://github.com/KitHensel/BaseJS.git'),
    gulp = require('gulp'),
		gutil = require('gulp-util'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    babel = require('gulp-babel'),
    sourcemaps = require('gulp-sourcemaps'),
    git = require('gulp-git');

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