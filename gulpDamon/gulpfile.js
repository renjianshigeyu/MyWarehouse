var gulp  = require("gulp")
gulp.task("hellow",function(){
	console.log("hellow world")
})
var gulp =require("gulp");
gulp.task("index-copy",function(){
	return gulp.src("index.html").pipe(gulp.dest("dist")).pipe(connect.reload());
});

gulp.task("images",function(){
	return gulp.src("img**/*.jpg").pipe(gulp.dest("dist/images")).pipe(connect.reload());
})
gulp.task("data",function(){
	return gulp.src(["xml/*.xml" ,"json/*.json"]).pipe(gulp.dest("dist/data")).pipe(connect.reload());
})

gulp.task("watch",function(){
	gulp.watch("index.html",["index-copy"]);
	gulp.watch("img/**/*",["images"]);
	gulp.watch(["xml/*.xml , json/*.json"],["data"])
	gulp.watch("stylesheet/*.{scss,sass}",["scss"])
})


var scss = require("gulp-sass");
var minifyCSS =require("gulp-minify-css");
var rename =require("gulp-rename")
gulp.task("scss",function(){
	return gulp.src("stylesheet/index.scss")
	.pipe(scss())
	.pipe(minifyCSS())
	.pipe(gulp.dest("dist/css"))
	.pipe(rename("index.min.css"))
	.pipe(gulp.dest("dist/css"))
	.pipe(connect.reload())
})

var concat = require("gulp-concat");
var uglify =require("gulp-uglify")

gulp.task("scripts",function(){
	return gulp.src(["javascript1/tool.js","javascript2/*.js"])
	.pipe(concat("index.js"))
	.pipe(gulp.dest("dist/js"))
	.pipe(connect.reload())
})

var connect =require("gulp-connect");

gulp.task("server",function(){
	connect.server({
		root: "dist",
		port: 7777,
		livereload:true
	})
})
gulp.task("default",["watch","server"]);
