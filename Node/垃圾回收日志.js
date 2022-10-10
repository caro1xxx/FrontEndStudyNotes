// 不创对并分部量a不创对并分部量a
for (var i = 0; i < 1000000; i++) { 
  var a = {}; 
}
// $ node --prof xxx.js
// 可以到V8时的性能分数
// 得到isolate-00000211E0380CC0-13744-v8.log文件