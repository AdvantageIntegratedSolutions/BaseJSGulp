var app 	     = require('../../app')
var gulp 			 = require('BaseJSGulpModule/gulp')
var concat 		 = require('BaseJSGulpModule/gulp-concat')
var uglify  	 = require('BaseJSGulpModule/gulp-uglify')
var babel 		 = require('BaseJSGulpModule/gulp-babel')
var react 		 = require('BaseJSGulpModule/gulp-react')
var sourcemaps = require('BaseJSGulpModule/gulp-sourcemaps')
var rename 		 = require('BaseJSGulpModule/gulp-rename')
var insert 		 = require('BaseJSGulpModule/gulp-insert')

//compile JS
gulp.task('js', function() {
  return gulp.src('src/javascript/**/*')
    .pipe(sourcemaps.init())
    .pipe(react())
    .pipe(babel())
    .pipe(uglify())
    .pipe(concat(app.name + '-'+app.jsBundlePrefix+'.js'))
    .pipe(insert.prepend('//'+app.origin+'\n'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('qb-pages/'));
});