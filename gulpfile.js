const { src, dest, series, watch } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const prefix = require("gulp-autoprefixer");
const purgecss = require("gulp-purgecss");

// const buildStyles = () => {
//   return src(["procss/**/*.sass"])
//     .pipe(sass({outputStyle: "compressed"}))
//     .pipe(prefix("last 2 versions"))
//     .pipe(dest("build/css"))
// };

const buildStyles = () => {
  return src(["sass/index.sass"])
    .pipe(sass({outputStyle: "compressed"}))
    .pipe(prefix("last 2 versions"))
    .pipe(dest("build/css"))
};


const watchTasks = () => {
  return watch(["sass/index.sass"], buildStyles);
}

exports.default = series(buildStyles, watchTasks);