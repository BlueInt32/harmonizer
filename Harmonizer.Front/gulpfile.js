var gulp = require('gulp');
var mocha = require('gulp-mocha');
 
gulp.task('default', function () {
    return gulp.src('js/test/test.js', {read: false})
        .pipe(mocha({reporter: 'spec'}));
});