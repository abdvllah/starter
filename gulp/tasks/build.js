var gulp = require('gulp'),
imagemin = require('gulp-imagemin'),
usemin = require('gulp-usemin'),
rev = require('gulp-rev'),
cssnano = require('gulp-cssnano'),
uglify = require('gulp-uglify'),
browserSync = require('browser-sync').create();
// del = require('del');

gulp.task('previewDist', ['usemin'], function() {
	browserSync.init ({
		server: {
			notify: false,
			baseDir: "./dist"
		}
	});
});

gulp.task('deletDistFolder', function() {
	// return del("./dist");
});

gulp.task('copyGeneralFiles', ['deletDistFolder'], function() {
	var pathsToCopy = [
	'./app/**/*',
	'!./app/*.html',
	'!./app/assets',
	'!./app/assets/**',
	'!./app/assets/scripts',
	'!./app/assets/scripts/**',
	'!./app/assets/styles',
	'!./app/assets/styles/**',
	'!./app/assets/temp',
	'!./app/assets/temp/**',
	'!./app/assets/icons',
	'!./app/assets/icons/**'
	];

	return gulp.src(pathsToCopy)
	.pipe(gulp.dest("./dist"));
});

gulp.task('optimizeImages', ['deletDistFolder'], function() {
	return gulp.src(['./app/assets/images/**/*'])
	// .pipe(imagemin({
	// 	progressive: true,
	// 	interlaced: true,
	// 	multipass: true
	// }))
	.pipe(gulp.dest("./dist/assets/images"));
});

// this will move php, css, javascript file to dist folder + compremise and versionize them!! happy ending ;)
gulp.task('usemin', ['styles', 'scripts'], function() {
	return gulp.src("./app/*.html")
	.pipe(usemin({
		css: [ function() {return rev()}, function() {return cssnano()} ],
		js: [function() {return rev()}, function() {return uglify()}]
	}))
	.pipe(gulp.dest("./dist"));
});


gulp.task('build', ['copyGeneralFiles', 'usemin', 'optimizeImages', 'previewDist']);