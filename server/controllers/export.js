const { mysql } = require('../qcloud')
module.exports = async function (ctx, next) {
  // 查
  ctx.state.data = await mysql("Book").select('*')
  ctx.state.code = 1
  var fs = require("fs");
  var data = ctx.state.data;
  fs.writeFile('D:/wfile.xls', data, { flag: 'w', encoding: 'utf-8', mode: '0666' }, function (err) {
    if (err) {
      console.log("文件写入失败")
    } else {
      console.log("文件写入成功");

    }

  }) 
}