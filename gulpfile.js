// GULPFILE
// Created by: Mike Erickson, 2015-10-28
// =============================================================================

(function(){

	var gulp       = require('gulp');
	var requireDir = require('require-dir');
	var console    = require('gulp-messenger');

// PRELOAD ALL TASKS
// =============================================================================
// you can execute individual tasks as `gulp <taskName>`
// WARNING: don't load recursively (omit `_disabled` tasks)

	requireDir('./tasks', { recurse: false });

	console.init({timestamp: false});
	console.chalkline.cyan();
	gulp.task('default', ['tasklist'] );

})();
