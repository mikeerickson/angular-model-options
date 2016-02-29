// CONFIG (TASKS)
// =============================================================================

(function(){

	'use strict';

	var fs = require('fs');

	var data = JSON.parse(fs.readFileSync('./.bowerrc'));
	var componentBase = data.directory  || './bower_components';

	module.exports = {
		defaults: {
			show: false,
			public: './public'
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
			src: [
				'./node_modules/jquery/dist/jquery.min.js',
				'./node_modules/bootstrap/dist/bootstrap.min.js',
				'./node_modules/angular/angular.min.js',
				'./components/angular-bootstrap-multiselect/dist/angular-bootstrap-multiselect.min.js',
				'./components/angular-bootstrap-multiselect/dist/angular-bootstrap-multiselect-template.js'
			],
			dest: './public/js',
			filename: 'vendor.min.js',
			build: {
				scripts: {
					// the loading order is important here as some libraries have dependencies of other libraries
					// the items in `componentBase` are installed via bower (and are not available on npm as full library
					src: [
						'./node_modules/jquery/dist/jquery.min.js',
						'./node_modules/bootstrap/dist/js/bootstrap.min.js',
						componentBase + 'lodash/lodash.min.js',
						'./node_modules/angular/angular.min.js',
						'./node_modules/angular-animate/angular-animate.min.js',
						'./node_modules/moment/min/moment.min.js',
						'./node_modules/angular-ui-bootstrap/ui-bootstrap.min.js',
						'./node_modules/angular-ui-bootstrap/ui-bootstrap/tpls.js'
					],
					bundle: 'vendor.js'
				},
				styles: {
					src: [
						'./node_modules/bootstrap/dist/css/bootstrap.min.css',
						'./node_modules/bootstrap/dist/css/bootstrap-theme.min.css',
						'./node_modules/angular-ui-bootstrap/ui-bootstrap-csp.css'
					],
					bundle: 'vendor.css'
				},
				fonts: {
					src: [
						'./node_modules/bootstrap/dist/fonts/*.*'
					]
				}
			}
		},
		test: {
			mocha: ['./specs/**/*.spec.js', './specs/**/*Spec.js','!./specs/browser/*'],
			karma: ['./src/app/**/*.spec.js', './src/app/**/*Spec.js']
		},
		app: {
			src: [
				'./src/js/app.module.js',
				'./src/js/app.constants.js',
				'./src/js/main/Main.controller.js',
				'./src/js/main/Main.service.js'
			],
			dest:     './public/js/',
			filename: 'app.min.js'
		}

	};

})();
