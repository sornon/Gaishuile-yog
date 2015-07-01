var browserify   = require('browserify');
var gulp         = require('gulp');
var source       = require('vinyl-source-stream');
var babelify     = require('babelify');
var less = require('gulp-less');
var autoprefixer = require('gulp-autoprefixer');
var minifyCSS = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var buffer = require('vinyl-buffer');
var watchify = require('watchify');

var src = './';
var dest = '../static';
var config = {
    less: {
        src: src + '/less/index.less',
        dest: dest + '/css'
    },
    static: {
        src: src + '/static/**',
        dest: dest
    },
    browserify: {
        debug: true,
        bundleConfigs: [{
            entries: src + '/jsx/pages/index/index.jsx',
            dest: dest + '/js',
            outputName: 'index.js'
        }],
        extensions: ['.jsx']
    }
}


gulp.task('jsx-release', function() {
    var bundleList = config.browserify.bundleConfigs;
    bundleList.forEach(function(bundleConfig) {
        var b = browserify({
            entries: bundleConfig.entries,
            extensions: config.browserify.extensions,
            debug: false
        })
        .transform(babelify,{stage:1})
        .bundle()
        .pipe(source(bundleConfig.outputName))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest(bundleConfig.dest))
        console.log(bundleConfig.outputName + '发布成功!')
    })
});

gulp.task('less-release', function() {
  return gulp.src(config.less.src)
        .pipe(less())
        .pipe(autoprefixer({cascade: false, browsers: ['last 2 versions']}))
        .pipe(minifyCSS())
        .pipe(gulp.dest(config.less.dest));
});

gulp.task('static-release', function() {
    return gulp.src(config.static.src)
    .pipe(gulp.dest(config.static.dest))
});

gulp.task('watch', function() {
  gulp.watch(src + '/less/**', ['less-release']);
  gulp.watch(src + '/static/**', ['static-release']);
  gulp.watch(src + '/jsx/**', ['jsx-release']);
});


gulp.task('release', ['jsx-release','less-release','static-release'])
gulp.task('default', ['release','watch'])