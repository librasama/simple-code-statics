(function(){
    var express = require('express');
    var fs = require('fs');
    var lineReader = require('./line_reader');
    var cfg = require('./static.cfg.json');
    var logpath = cfg.logPath;
    var scope = cfg.scope;
    var sum = 0;
    day = new Date();
    logFile = logpath + "/" + day.getFullYear() + '-' + (day.getMonth() + 1) + '-' +day.getDay()+'_static.log';
    if(fs.existsSync(logFile)) {
        fs.unlinkSync(logFile);//重新生成
    }
    scope.forEach(function(s){
        s.dir.forEach(function(d){
            s.extentsion.forEach(function(es){
                walk(d, es, s.excludeDir, s.excludeFile);
            });
        });
    });
    function walk(dir, extenstion, excludeDirs, excludeFiles){
        files = fs.readdirSync(dir);
        files.forEach(function(f){
            f = dir + "/" + f;
            if(excludeDirs == null || excludeDirs.indexOf(f) == -1) {
                if(fs.statSync(f).isFile() && (f.indexOf('.'+extenstion) != -1) && ( excludeFiles == null || excludeFiles.indexOf(excludeFiles) == -1)) {
                    var linenum = 0;
                    lineReader.eachLine(f, function(line, last) {
                        linenum++;
                        if(last) {
                            writeLog("File : "+f+ '\n');
                            writeLog("  File Line num is : " + linenum +'\n');
                            sum += linenum;
                            writeLog("     Total Line num is : "+ sum + "\n\n");
                            return false;
                        }
                    });
                } else if(fs.statSync(f).isDirectory()) {
                    walk(f, extenstion, excludeDirs, excludeFiles);
                }
            }
        });
    }
    function writeLog(txt) {
        fs.appendFileSync(logFile, txt);
    }
}());