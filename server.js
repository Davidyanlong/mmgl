var serve = require('der-server');
let gulp = require('gulp');

const { exec } = require('child_process');

gulp.watch('./src/**/*.js',function(){
    exec('tnpm run build-uglify', (err, stdout, stderr) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log(new Date());
        console.log(stdout);
      });
});

serve.start('./',null,1111);