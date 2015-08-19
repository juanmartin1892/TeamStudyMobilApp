var gulp = require('gulp'),
    connect = require('gulp-connect'),
    historyApiFallback = require('connect-history-api-fallback')
    stylus = require('gulp-stylus'),
    nib = require('nib'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish'),
    inject = require('gulp-inject'),
    wiredep = require('wiredep').stream;

//Servidor web de desarrollo
gulp.task('server',function(){
  connect.server({
    root : './www',
    hostname: '0.0.0.0',
    port : 8080,
    livereload: true,
    middleware : function(connect, opt){
    return [historyApiFallback]
    }
  });
});

// Recarga el naveador cuando hay cambios en el  html
gulp.task('html',function(){
  gulp.src('./www/**/*.html')
    .pipe(connect.reload());
})

// Pre-procesa archivos Stylus a Css y recarga la pagina
gulp.task('css',function(){
  gulp.src('./www/css/main.styl')
  .pipe(stylus({ use: nib() }))
  .pipe(gulp.dest('./www/css'))
  .pipe(connect.reload());
})

//Busca errores en el JS y nos lo muestra por pantalla
gulp.task('jshint',function(){
  return gulp.src('./www/js/**/*.js')
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'));
})

//Busca en las carpetas de estilos y javascript los archivos que hayamos
// creado para incluirlos en el index.html
gulp.task('inject' , function(){
  var sources = gulp.src(['./www/js/**/*.js'],['./www/css/**/*.css']);
  return gulp.src('index.html',{ cwd: './www'})
    .pipe(inject(sources, {
      read:false,
      relative: true,
      ignorePath:'/www'
    }))
    .pipe(gulp.dest('./www'));
});

//Inyectar las librerias que instalemos via bower
gulp.task('wiredep',function(){
  gulp.src('./www/index.html')
    .pipe(wiredep({
        directory : './www/spec/lib'
    }))
    .pipe(gulp.dest('./www'));
});

//Vigila que que produscan cambios en el codigo
// y lanza las tareas correspondiente
gulp.task('watch', function(){
  gulp.watch(['./www/js/**/*.html' , './www/*.html'],['html']);
  gulp.watch(['./www/css/**/*.styl'],['css','inject']);
  gulp.watch(['./www/css/**/*.css'],['inject']);
  gulp.watch(['./www/js/**/*.js' , './Gulpfile.js'],['jshint','inject']);
  gulp.watch(['./bower.json'],['wiredep']);
});




gulp.task('default',['server' , 'watch']);
