var gulp = require('gulp');

const sass = require('gulp-sass')(require('sass'));
const minify = require('gulp-minify');
const imagemin = require('gulp-imagemin');
const cache = require('gulp-cache');

const browserSync = require('browser-sync');
const reload = browserSync.reload;

// ------------------------------------------------- configs
var paths = {
  html: {
    src: 'src/index.html',
    dest: 'dist/'
  },
  sass: {
    src: 'src/sass/**/*.{scss,sass}',
    dest: 'dist/css/',
    opts: {}
  },
  js: {
    src: 'src/js/*.js',
    dest: 'dist/js/',
  }
};

const rootFiles = [
  './src/404.html',
  './src/robots.txt',
  './src/site.webmanifest',
  './src/favicon.ico',
  './src/favicon.svg',
  './src/favicon-96x96.png',
  './src/web-app-manifest-192x192.png',
  './src/web-app-manifest-512x512.png',
  './src/apple-touch-icon.png',
];

gulp.task('distribute', function() {
  return gulp.src(rootFiles , { base: './src' })
    .pipe(gulp.dest('dist'));
});


// ---------------------------------------------- Gulp Tasks

gulp.task('images', async function(){
  return gulp.src('src/img/**/*.+(png|jpg|jpeg|gif|svg)')
    // Caching images that ran through imagemin
    .pipe(cache(imagemin({
      interlaced: true
    })))
    .pipe(gulp.dest('dist/img'))
});

gulp.task('clean:dist', async function() {
  return del.sync('dist');
})

gulp.task('sass', function () {
  console.log('Building CSS...');
  return gulp.src(paths.sass.src)

    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    //.pipe(sass().on('error', sass.logError))

    // .pipe(autoprefixer({
    //   browsers: ['last 2 versions', '> 5%', 'iOS 7'],
    //   cascade: false
    // }))

    .pipe(gulp.dest(paths.sass.dest))

    .pipe(reload({stream:true}));
});

gulp.task('min-js', function () {
  console.log('Building JS...');
  return gulp.src('src/js/*.js')
    .pipe(minify({
      ext: {
        min: '.min.js',
      },
      noSource: true,
      ignoreFiles: ['*.min.js', '*-min.js']
    }))
    .pipe(gulp.dest('dist/js/'))
    .pipe(reload({stream:true}));
});

gulp.task('html', function(){
  console.log('Building HTML...');
  return gulp.src('src/index.html')
    .pipe(gulp.dest('dist/'))
    .pipe(reload({stream:true}));
});

// ------------------------------------ Gulp Testing Message
gulp.task('message', function () {
  console.log('');
});

// ---------------------------------------------- Gulp Watch
gulp.task('watch:styles', function () {
  gulp.watch(paths.sass.src, gulp.series('sass'));
});

gulp.task('watch:js', function () {
  gulp.watch(paths.js.src, gulp.series('min-js'));
});

gulp.task('watch:html', function () {
  gulp.watch(paths.html.src, gulp.series('html'));
});

gulp.task('watch',
  gulp.parallel('watch:styles', 'watch:js', 'watch:html')
);

gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: "./dist/"
    },
    port: 8080,
    open: true,
    notify: false
  });
});


// -------------------------------------------- Default task
gulp.task('default', gulp.series('distribute', 'sass', 'min-js', 'html', 'images',
  gulp.parallel('message', 'watch', 'browserSync')
));

gulp.task('build', gulp.series('distribute', 'sass', 'min-js', 'html', 'images')
);
