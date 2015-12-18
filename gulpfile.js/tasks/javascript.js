var app 	     = require('../../app')
var gulp 			 = require(process.env.BASE_JS_NODE_PATH + 'gulp')
var concat 		 = require(process.env.BASE_JS_NODE_PATH + 'gulp-concat')
var uglify  	 = require(process.env.BASE_JS_NODE_PATH + 'gulp-uglify')
var babel 		 = require(process.env.BASE_JS_NODE_PATH + 'gulp-babel')
var react 		 = require(process.env.BASE_JS_NODE_PATH + 'gulp-react')
var sourcemaps = require(process.env.BASE_JS_NODE_PATH + 'gulp-sourcemaps')
var rename 		 = require(process.env.BASE_JS_NODE_PATH + 'gulp-rename')
var insert 		 = require(process.env.BASE_JS_NODE_PATH + 'gulp-insert')

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