var gulp 			 = require(process.env.BASE_JS_NODE_PATH + '/gulp')

//configure tasks to run on all file changes
gulp.task('watch', function() {
  gulp.watch('src/**/*', ['deploy']);
});
