// COMPILE TASK
// =============================================================================

(function () {
	'use strict';

	var gulp = require('gulp');
	var config = require('./gulp.config');
	var console = require('gulp-messenger');
	var concat = require('gulp-concat');
	var uglify = require('gulp-uglify');
	var utils = require('./utils/cd-utils');
	var handleErrors = require('./utils/handleErrors');
	var execute = require('run-sequence');
	var less = require('gulp-less');
	var path = require('path');
	var cleanCSS = require('gulp-clean-css');
	var argv = require('yargs-parser')(process.argv.slice(2));

	// initialize build options
	var clean   = false; // -c or --clean
	var options = '';    // -o or --options = <value> (not implemented)
	var debug   = false; // -d or --debug

	// if we have executed build task, process params / options
	clean   = argv.c || argv.clean;
	debug   = argv.d || argv.debug;
	options = argv.o || argv.options;

	// if debug, start by logging argv
	if ( debug ) { console.dump(argv); }

	// build specific resource
	gulp.task('build:vendor:js', function () {
		if (clean) {
			execute('clean:scripts');
		}
		return gulp.src(config.vendor.scripts.src)
			.on('error', handleErrors)
			.pipe(concat(config.vendor.scripts.filename))
			.pipe(uglify())
			.pipe(gulp.dest(config.vendor.scripts.dest))
			.pipe(console.flush.success('=== ' + config.vendor.scripts.dest + '/' + config.vendor.scripts.filename + ' created -- ' + utils.timestamp() + ' ==='));
	});

	gulp.task('build:vendor:css', function () {
		if (clean) {
			execute('clean:styles');
		}
		return gulp.src(config.vendor.styles.src)
			.on('error', handleErrors)
			.pipe(concat(config.vendor.styles.filename))
			.pipe(cleanCSS({compatibility: 'ie8'}))
			.pipe(gulp.dest(config.vendor.styles.dest))
			.pipe(console.flush.success('=== ' + config.vendor.scripts.dest + '/' + config.vendor.styles.filename + ' created -- ' + utils.timestamp() + ' ==='));
	});

	gulp.task('build:app:js', function () {
		if (clean) {
			execute('clean:scripts');
		}
		return gulp.src(config.app.src)
			.on('error', handleErrors)
			.pipe(concat(config.app.filename))
			.pipe(uglify())
			.pipe(gulp.dest(config.app.dest))
			.pipe(console.flush.success('=== ' + config.vendor.scripts.dest + '/' + config.app.filename + ' created -- ' + utils.timestamp() + ' ==='));
	});

	gulp.task('build:app:css', function () {
		if (clean) {
			execute('clean:styles');
		}
		return gulp.src(config.css.src)
			.pipe(less({
				paths: [path.join(__dirname, 'less', 'includes')]
			}))
			.pipe(concat(config.css.filename))
			.pipe(cleanCSS({compatibility: 'ie8'}))
			.pipe(gulp.dest(config.css.dest))
			.pipe(console.flush.success('=== ' + config.vendor.scripts.dest + '/' + config.css.filename + ' created -- ' + utils.timestamp() + ' ==='));
	});

	gulp.task('build:vendor', function () {
		execute('build:vendor:js', 'build:vendor:css');
	});

	gulp.task('build:app', function () {
		execute('build:app:js', 'build:app:css');
	});

	gulp.task('build:scripts', function () {
		execute('build:vendor:js', 'build:app:js');
	});

	gulp.task('build:styles', function () {
		execute('build:vendor:css', 'build:app:css');
	});

	// Build All Resources
	gulp.task('build', function () {
		execute('build:vendor:js', 'build:vendor:css', 'build:app:js', 'build:app:css');
	});

})();

