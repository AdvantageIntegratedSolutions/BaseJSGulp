var app 	     = require('../../app')
var gulp       = require(app.path + 'gulp')
var sass       = require(app.path + 'gulp-sass')
var concat     = require(app.path + 'gulp-concat')
var insert     = require(app.path + 'gulp-insert')

//compile scss
gulp.task('css', function() {
  return gulp.src('src/stylesheets/**/*')
    .pipe(sass())
    .pipe(concat(app.name + '-'+app.cssBundlePrefix+'.css'))
    .pipe(insert.prepend('/*'+app.origin+'*/\n'))
    .pipe(gulp.dest('qb-pages/'));
});