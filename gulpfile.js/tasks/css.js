var app 	     = require('../../app')
var gulp       = require('gulp')
var sass       = require('gulp-sass')
var concat     = require('gulp-concat')
var uglify     = require('gulp-uglify')
var babel      = require('gulp-babel')
var react      = require('gulp-react')
var sourcemaps = require('gulp-sourcemaps')
var rename     = require('gulp-rename')
var insert     = require('gulp-insert')

//compile scss
gulp.task('css', function() {
  return gulp.src('src/stylesheets/**/*')
    .pipe(sass())
    .pipe(concat(app.name + '-'+app.cssBundlePrefix+'.css'))
    .pipe(insert.prepend('/*'+app.origin+'*/\n'))
    .pipe(gulp.dest('qb-pages/'));
});