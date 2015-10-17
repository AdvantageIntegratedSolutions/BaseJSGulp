var app 	     = require('../../app')
var gulp       = require('gulp')
var sass       = require('gulp-sass')
var concat     = require('gulp-concat')
var insert     = require('gulp-insert')

//compile scss
gulp.task('css', function() {
  return gulp.src('src/stylesheets/**/*')
    .pipe(sass())
    .pipe(concat(app.name + '-'+app.cssBundlePrefix+'.css'))
    .pipe(insert.prepend('/*'+app.origin+'*/\n'))
    .pipe(gulp.dest('qb-pages/'));
});