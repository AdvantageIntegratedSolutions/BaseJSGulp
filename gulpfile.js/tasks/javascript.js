var app 	     = require('../../app')
var gulp 			 = require('/usr/local/lib/node_modules/BaseJSGulpModule/node_modules/gulp')
var concat 		 = require('/usr/local/lib/node_modules/BaseJSGulpModule/node_modules/gulp-concat')
var uglify  	 = require('/usr/local/lib/node_modules/BaseJSGulpModule/node_modules/gulp-uglify')
var babel 		 = require('/usr/local/lib/node_modules/BaseJSGulpModule/node_modules/gulp-babel')
var react 		 = require('/usr/local/lib/node_modules/BaseJSGulpModule/node_modules/gulp-react')
var sourcemaps = require('/usr/local/lib/node_modules/BaseJSGulpModule/node_modules/gulp-sourcemaps')
var rename 		 = require('/usr/local/lib/node_modules/BaseJSGulpModule/node_modules/gulp-rename')
var insert 		 = require('/usr/local/lib/node_modules/BaseJSGulpModule/node_modules/gulp-insert')

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