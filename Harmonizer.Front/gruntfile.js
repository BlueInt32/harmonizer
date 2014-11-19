/// <reference path="D:\Prog\Git\Harmonizer\Harmonizer.Front\js/vendor/angular.js" />
module.exports = function (grunt)
{

	require('load-grunt-tasks')(grunt);
	// Project configuration.
	grunt.initConfig({
		jshint: {
			all: [
				'js/**/*.js',
				'!**/vendor/**',
				'!min.js'
			]
		},
		uglify: {
			dist: {
				files: {
					'js/min.js': [
						'js/vendor/angular.js',
						'js/**/*.js',
						'!js/min.js'
					]
				}
			}
		},
		//less: {
		//	development: {
		//		options: {
		//			compress: true
		//		},
		//		files: {
		//			"css/compiled.css": ["css/*.less", "!css/_utils.less"]
		//		}
		//	}
		//},
		less: {
			// Compile all targeted LESS files individually
			components: {
				options: {
					imports: {
						// Use the new "reference" directive, e.g.
						// @import (reference) "variables.less";
						reference: [
							"_utils.less"
						]
					},
					compress: true
				},
				files: [
				  {
				  	expand: true,
				  	cwd: 'bootstrap/less',
				  	// Compile each LESS component excluding "bootstrap.less", 
				  	// "mixins.less" and "variables.less" 
				  	src: ['css/*.less', '_*.less'],
				  	dest: 'css/',
				  	ext: '.css'
				  }
				]
			}
		}

		//karma: {
		//	unit: {
		//		configFile: 'karma.conf.js'
		//	}
		//}

	});

	grunt.registerTask('default', ['jshint', 'uglify', 'less', 'cssmin']);
};