var fs = require('fs');
var path = require('path');//解析需要遍历的文件夹
var ignoreFiles = ['README.md', '.gitignore', '.git'];

//调用文件遍历方法
// fileDisplay(filePath);
function parseDoc(doc) {
  console.log(doc)
}

//文件遍历方法
function fileDisplay(filePath) {
  var template = '# 前端点滴\n> 记录学习中遇到的问题，记录成长\n\n';
  //根据文件路径读取文件，返回文件列表
  fs.readdir(filePath, function (err, files) {
    if (err) {
      console.warn(err)
    } else {
      
      //遍历读取到的文件列表
      files.forEach(function (filename) {
        //获取当前文件的绝对路径
        var filedir = path.join(filePath, filename);
        //根据文件路径获取文件信息，返回一个fs.Stats对象
        var stats = fs.statSync(filedir);
        var isFile = stats.isFile();//是文件
        // var isDir = stats.isDirectory();//是文件夹
        if (isFile) {
          if (ignoreFiles.indexOf(filename) === -1) {
            // const res = parseDoc(fs.readFileSync(filedir).toString());
            // console.log(res);
            var fileArr = filename.split('.');
            template += `### ${fileArr[0]} - [${fileArr[1]}](./${encodeURIComponent(filename)})\n`;
            template += `#### 作者：hazer、时间：2018-6-26\n***\n`;
            // template += `#### [${fileArr[1]}](./${encodeURIComponent(filename)})\n***\n`;
          }
        }
      });
      var date = new Date();
      var year = date.getFullYear();
      template += '\n\n#### 个人订阅号（前端趣闻）\n![前端趣闻](https://github.com/mynane/web-problem/blob/master/assets/qrcode.jpg)\n';
      fs.writeFileSync('../README.md', template);
      console.log(template);
    }
  });
}


module.exports = {
  fileDisplay
}

