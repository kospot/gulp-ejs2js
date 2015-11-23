'use strict';
var through = require('through2');
var path = require('path');
/**
 * 把ejs转成js
 * 目的是为了可以和js一起打包，避免额外的请求
 * 会把文件名作为ejs的名字
 * @param  {[type]} opt [description]
 * @return {[type]}     [description]
 */
module.exports = function(opt) {
    opt = opt || {minify: false};
    function doSomething(file, encoding, callback) {
 
        if (file.isNull()) {
            return callback(null, file);
        }
 
        if (file.isStream()) {
            return callback(createError(file, 'Streaming not supported'));
        }

　　　　//do something
        var fileName = path.basename(file.path);
        fileName = fileName.replace(".", "");
        var newContents = 'var ' + fileName + ' = new EJS({text:';

        var contents = file.contents.toString();
        contents = contents.replace(/"+/g, '\\"');
        contents = contents.replace(/'+/g, "\\'");
        //是否压缩文件
        if(opt.minify === true){
            newContents += '"' + contents.replace(/\s+/g, " ") + '"';

        }else{

            var texts = [];
            contents = contents.split(/\r?\n/ig);
            contents.forEach(function(line, index){
                texts[index] = '"' + line + '"\n';
            });
            newContents += texts.join('+');
        }

        newContents += '});'
        
        file.contents = new Buffer(newContents);
        file.path = file.path.replace(".ejs", ".js");
 
        callback(null, file);
    }
 
    return through.obj(doSomething);
};