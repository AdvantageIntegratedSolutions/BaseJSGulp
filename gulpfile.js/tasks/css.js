var app 	     = require('../../app')
var gulp       = require('/usr/local/lib/node_modules/BaseJSGulpModule/node_modules/gulp')
var sass       = require('/usr/local/lib/node_modules/BaseJSGulpModule/node_modules/gulp-sass')
var concat     = require('/usr/local/lib/node_modules/BaseJSGulpModule/node_modules/gulp-concat')
var insert     = require('/usr/local/lib/node_modules/BaseJSGulpModule/node_modules/gulp-insert')

//compile scss
gulp.task('css', function() {
  return gulp.src('src/stylesheets/**/*')
    .pipe(sass())
    .pipe(concat(app.name + '-'+app.cssBundlePrefix+'.css'))
    .pipe(insert.prepend('/*'+app.origin+'*/\n'))
    .pipe(gulp.dest('qb-pages/'));
});