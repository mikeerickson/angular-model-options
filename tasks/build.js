

// COMPILE TASK
// =============================================================================

(function(){
	'use strict';

	var gulp         = require('gulp');
	var config       = require('./gulp.config');
	var console      = require('gulp-messenger');
	var concat       = require('gulp-concat');
	var uglify       = require('gulp-uglify');
	var utils        = require('./utils/cd-utils');
	var handleErrors = require('./utils/handleErrors');
	var execute      = require('run-sequence');
	var less         = require('gulp-less');
	var path         = require('path');
	var cleanCSS     = require('gulp-clean-css');

	gulp.task('build:vendor:js', function(){
		return gulp.src(config.vendor.src)
			.on('error', handleErrors)
			.pipe(concat(config.vendor.filename))
			.pipe(uglify())
			.pipe(gulp.dest(config.vendor.dest))
			.pipe(console.flush.success('=== ' + config.vendor.filename + ' created -- ' + utils.timestamp() + ' ==='));
	});

	gulp.task('build:vendor:css', function(){
		console.warning('TODO: Build Vendor CSS');
	});

	gulp.task('build:app:js', function() {
		return gulp.src(config.app.src)
			.on('error', handleErrors)
			.pipe(concat(config.app.filename))
			.pipe(uglify())
			.pipe(gulp.dest(config.app.dest))
			.pipe(console.flush.success('=== ' + config.app.filename + ' created -- ' + utils.timestamp() + ' ==='));
	});

	gulp.task('build:app:less', function () {
		return gulp.src(config.css.src)
			.pipe(less({
				paths: [ path.join(__dirname, 'less', 'includes') ]
			}))
			.pipe(concat(config.css.filename))
			.pipe(cleanCSS({compatibility: 'ie8'}))
			.pipe(gulp.dest(config.css.dest))
			.pipe(console.flush.success('=== ' + config.css.filename + ' created -- ' + utils.timestamp() + ' ==='));
	});

	// Build All Resources
	gulp.task('build', function(){
		execute('build:vendor:js', 'build:vendor:css', 'build:app:js', 'build:app:less');
	});

})();

