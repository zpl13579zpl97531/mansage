const gulp = require('gulp')
const server = require('gulp-webserver')
const gulpSequence = require('gulp-sequence')
const webpack = require('webpack-stream')
const proxy = require('http-proxy-middleware')
const sass = require('gulp-sass')
const path = require('path')

gulp.task('packjs', () => {
  return gulp.src('./src/scripts/*.js')
    .pipe(webpack({
      mode: 'development',
      entry: {
        app: './src/scripts/app.js'
      },
      output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].js'
      },
      module: {
        rules: [
          {
            test: /\.html$/,
            loader: 'string-loader'
          }
        ]
      }
    }))
    .pipe(gulp.dest('./dist/scripts'))
})

gulp.task('packscss', () => {
  return gulp.src('./src/styles/**/*')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist/styles'))
})

gulp.task('webserver', () => {
  return gulp.src('./dist')
    .pipe(server({
      host: 'localhost',
      port: 8080,
      livereload: true,
      middleware: [
        proxy('/api', {
          target: 'http://localhost:3000',
          changeOrigin: true
        })
      ]
    }))
})

gulp.task('copyhtml', () => {
  return gulp.src('./src/*.html')
    .pipe(gulp.dest('./dist'))
})

gulp.task('copylibs', () => {
  return gulp.src('./src/libs/**/*')
    .pipe(gulp.dest('./dist/libs'))
})

gulp.task('copystatic', () => {
  return gulp.src('./src/static/**/*')
    .pipe(gulp.dest('./dist/static'))
})

// gulp.task('copymock', () => {
//   return gulp.src('./src/mock/**/*')
//     .pipe(gulp.dest('./dist/mock'))
// })

gulp.task('watch', () => {
  gulp.watch('./src/scripts/**/*', ['packjs'])
  gulp.watch('./src/styles/**/*', ['packscss'])
  gulp.watch('./src/*.html', ['copyhtml'])
  gulp.watch('./src/libs/*.*', ['copylibs'])
  gulp.watch('./src/static/**/*', ['copystatic'])
  gulp.watch('./src/views/**/*', ['packjs'])
})

gulp.task('sequence', function (cb) {
  gulpSequence(['copyhtml', 'copylibs', 'copystatic', 'packjs', 'packscss'], 'webserver', 'watch', cb)
})

gulp.task('default', ['sequence'], () => {
  console.log('all task run done.')
})