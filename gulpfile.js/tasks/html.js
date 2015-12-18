var app 	 = require('../../app')
var gulp   = require('/usr/local/lib/node_modules/BaseJSGulpModule/node_modules/gulp')
var insert = require('/usr/local/lib/node_modules/BaseJSGulpModule/node_modules/gulp-insert')
var rename = require('/usr/local/lib/node_modules/BaseJSGulpModule/node_modules/gulp-rename')

//move pages
gulp.task('html', function() {
  return gulp.src('src/html/**/*')
    .pipe(rename(function (path) {
      path.basename = app.name + "-" + path.basename;
    }))
    .pipe(insert.prepend('<!-- '+app.origin+' -->\n'))
    .pipe(gulp.dest('qb-pages/'));
});