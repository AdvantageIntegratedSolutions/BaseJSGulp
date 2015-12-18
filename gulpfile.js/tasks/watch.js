var gulp 			 = require('BaseJSGulpModule/gulp')

//configure tasks to run on all file changes
gulp.task('watch', function() {
  gulp.watch('src/**/*', ['deploy']);
});
