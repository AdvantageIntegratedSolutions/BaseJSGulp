var app 	     = require('../../app')
var gulp       = require(process.env.NODE_PATH + 'BaseJSGulpModule/node_modules/gulp')
var sass       = require(process.env.NODE_PATH + 'BaseJSGulpModule/node_modules/gulp-sass')
var concat     = require(process.env.NODE_PATH + 'BaseJSGulpModule/node_modules/gulp-concat')
var insert     = require(process.env.NODE_PATH + 'BaseJSGulpModule/node_modules/gulp-insert')

//compile scss
gulp.task('css', function() {
  return gulp.src('src/stylesheets/**/*')
    .pipe(sass())
    .pipe(concat(app.name + '-'+app.cssBundlePrefix+'.css'))
    .pipe(insert.prepend('/*'+app.origin+'*/\n'))
    .pipe(gulp.dest('qb-pages/'));
});