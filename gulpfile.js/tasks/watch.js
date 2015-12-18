var gulp 			 = require('BaseJSGulpModule/node_modules/gulp')

//configure tasks to run on all file changes
gulp.task('watch', function() {
  gulp.watch('src/**/*', ['deploy']);
});
