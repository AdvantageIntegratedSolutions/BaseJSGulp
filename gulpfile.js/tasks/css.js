var app 	     = require('../../app')
var gulp       = require('BaseJSGulpModule/gulp')
var sass       = require('BaseJSGulpModule/gulp-sass')
var concat     = require('BaseJSGulpModule/gulp-concat')
var insert     = require('BaseJSGulpModule/gulp-insert')

//compile scss
gulp.task('css', function() {
  return gulp.src('src/stylesheets/**/*')
    .pipe(sass())
    .pipe(concat(app.name + '-'+app.cssBundlePrefix+'.css'))
    .pipe(insert.prepend('/*'+app.origin+'*/\n'))
    .pipe(gulp.dest('qb-pages/'));
});