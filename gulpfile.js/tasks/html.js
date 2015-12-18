var app 	 = require('../../app')
var gulp   = require(process.env.BASE_JS_NODE_PATH + 'gulp')
var insert = require(process.env.BASE_JS_NODE_PATH + 'gulp-insert')
var rename = require(process.env.BASE_JS_NODE_PATH + 'gulp-rename')

//move pages
gulp.task('html', function() {
  return gulp.src('src/html/**/*')
    .pipe(rename(function (path) {
      path.basename = app.name + "-" + path.basename;
    }))
    .pipe(insert.prepend('<!-- '+app.origin+' -->\n'))
    .pipe(gulp.dest('qb-pages/'));
});