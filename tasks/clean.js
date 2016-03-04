// CLEAN TASKS
// =============================================================================

(function () {

	'use strict';

	var gulp = require('gulp');
	var del = require('del');
	var config = require('./gulp.config');
	var console = require('gulp-messenger');
	var stripDebug = require('gulp-strip-debug');
	var handleErrors = require('./utils/handleErrors');

	console.init({
		timestamp: true,
		logToFile: false,
		showPipeFile: false
	});

	gulp.task('clean:scripts', function (cb) {
		del(config.app.dest);
		console.success(config.css.dest + ' Cleaned...');
	});

	gulp.task('clean:styles', function (cb) {
		del(config.css.dest);
		console.success(config.css.dest + ' Cleaned...');
	});

	gulp.task('clean:logs', function (cb) {
		del('./logs');
		console.success('./logs Cleaned...');
	});

	gulp.task('clean:all', ['clean:scripts', 'clean.styles', 'clean:logs']);

	gulp.task('clean:console', function () {
		return gulp.src(['./test/test2.js'])
			.on('error', handleErrors)
			.pipe(stripDebug())
			.pipe(gulp.dest('test'));
	});


})();
