// CONFIG (TASKS)
// =============================================================================

(function () {

	'use strict';

	var fs = require('fs');

	var data = JSON.parse(fs.readFileSync('./.bowerrc'));
	var componentBase = data.directory || './bower_components';
  var baseDir = './public';
	
	module.exports = {

		defaults: {
			show:   false,
			public: baseDir
		},
		todo: {
			openReport: true,
			src: [
				'./src/**/*.{js,es6,jsx}',
				'./tasks/**/*.js',
				'./public/js/**/*.{js,es6,jsx}',
				'!./public/js/build.js'
			],
			exclude: './public/js/build.js'
		},
		css: {
			src: ['./src/less/*.less'],
			dest: './public/css',
			filename: 'app.min.css'
		},
		vendor: {
			scripts: {
				src: [
					'./node_modules/jquery/dist/jquery.min.js',
					'./node_modules/bootstrap/dist/bootstrap.min.js',
					'./node_modules/angular/angular.min.js',
					'./components/angular-bootstrap-multiselect/dist/angular-bootstrap-multiselect.min.js',
					'./components/angular-bootstrap-multiselect/dist/angular-bootstrap-multiselect-template.js'
				],
				dest: './public/js',
				filename: 'vendor.min.js'
			},
			styles: {
				src: [
					'./node_modules/bootstrap/dist/css/bootstrap.min.css',
					'./node_modules/bootstrap/dist/css/bootstrap-theme.min.css'
				],
				dest: './public/css',
				filename: 'vendor.min.css'
			},
			fonts: {
				src: [
					'./node_modules/bootstrap/dist/fonts/*.*'
				]
			}
		},
		test: {
			mocha: ['./specs/**/*.spec.js', './specs/**/*Spec.js', '!./specs/browser/*'],
			karma: ['./src/app/**/*.spec.js', './src/app/**/*Spec.js']
		},
		app: {
			src: [
				'./src/js/app.module.js',
				'./src/js/app.constants.js',
				'./src/js/main/Main.controller.js',
				'./src/js/main/Main.service.js'
			],
			dest: './public/js/',
			filename: 'app.min.js'
		}

	};

})();
