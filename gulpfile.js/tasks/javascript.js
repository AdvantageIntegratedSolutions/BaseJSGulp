var app 	     = require('../../app')
var gulp 			 = require(process.env.NODE_PATH + 'BaseJSGulpModule/node_modules/gulp')
var concat 		 = require(process.env.NODE_PATH + 'BaseJSGulpModule/node_modules/gulp-concat')
var uglify  	 = require(process.env.NODE_PATH + 'BaseJSGulpModule/node_modules/gulp-uglify')
var babel 		 = require(process.env.NODE_PATH + 'BaseJSGulpModule/node_modules/gulp-babel')
var react 		 = require(process.env.NODE_PATH + 'BaseJSGulpModule/node_modules/gulp-react')
var sourcemaps = require(process.env.NODE_PATH + 'BaseJSGulpModule/node_modules/gulp-sourcemaps')
var rename 		 = require(process.env.NODE_PATH + 'BaseJSGulpModule/node_modules/gulp-rename')
var insert 		 = require(process.env.NODE_PATH + 'BaseJSGulpModule/node_modules/gulp-insert')

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