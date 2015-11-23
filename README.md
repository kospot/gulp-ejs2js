ejs to js for gulp

# Installation
npm install gulp-ejs2js

# Usage
```
gulp.task('ejs', function(){
    return gulp.src('./ques.ejs')
        .pipe(ejs2js())
        .pipe(gulp.dest('./ejs/'));
})
```

# Options
minify: 是否去除多余的空格， 默认： false