// ESLINT TASK
// =============================================================================

/*global require*/

var gulp   = require('gulp');
var eslint = require('gulp-eslint');
var msg    = require('gulp-messenger');
var config = require('./gulp.config');

var files = [].concat(config.app.src);

msg.init({timpestamp: true, showPipeFile: false});

gulp.task('eslint', function () {
	return gulp.src(files)
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint.failAfterError())
		.pipe(msg.flush.success('=== ESLinting Source Files ==='));
});
