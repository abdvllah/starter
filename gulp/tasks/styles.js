var gulp = require('gulp'),
postcss = require('gulp-postcss'),
autoprefixer = require('autoprefixer'),
cssvars = require('postcss-simple-vars'),
nested = require('postcss-nested'),
cssImport = require('postcss-import'),
cssInherit = require('postcss-inherit'),
hexrgba = require('postcss-hexrgba'),
mixins = require('postcss-mixins'),
colorFunctions = require('postcss-colour-functions');


gulp.task('styles', function() {
	return gulp.src('./app/assets/styles/style.css')
	.pipe(postcss([cssImport, cssInherit, mixins, cssvars, nested, hexrgba, autoprefixer, colorFunctions]))
	.on('error', function(errorInfo) {
		console.log(errorInfo.toString());
		this.emit('end');
	})
	.pipe(gulp.dest('./app/assets/temp'));
});