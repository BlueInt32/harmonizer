/// <reference path="D:\Prog\Git\Harmonizer\Harmonizer.Front\js/vendor/angular.js" />
module.exports = function (grunt)
{

	require('load-grunt-tasks')(grunt);
	// Project configuration.
	grunt.initConfig({
		jshint: {
			all: [
				'js/**/*.js',
				'!js/vendor/*.js',
				'!js/min/*.js',
				'!js/min.js'
			]
		},
		uglify: {
			dist: {
				files: {
					'js/min.js': [
						'js/**/*.js',
						'!js/vendor/*.js',
						'!js/min/*.js',
						'!js/min.js',
						'!js/**/*.test.js'
					]
				}
			}
		}
	});

	grunt.registerTask('default', ['jshint', 'uglify', 'less', 'cssmin']);
};