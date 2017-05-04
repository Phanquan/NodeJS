const fs = require('fs')
const path = require('path')
const color = require('colors')
const prog = require('caporal')

prog
    .version('1.0.0')
    .command('ListMe','List the input Array')
    .argument('<Source_Path>','The input Array')
    .action(function (args) {
        console.log(args.sourcePath)
        let srcPath = args.sourcePath;
        let tem ='   ';
        function getDirectories(srcpath) {

            let fileList = fs.readdirSync(srcpath);

            fileList.forEach(function (fileItem,i) {
                name = srcpath + '/' + fileItem;
                if (i === fileList.length - 1) {
                    if (fs.statSync(name).isDirectory()) {
                        console.log(tem + '└── ' + fileItem.blue);
                    } else {
                        console.log(tem + '└── ' + fileItem);
                    }

                } else {
                    if (fs.statSync(name).isDirectory()) {
                        console.log(tem + '├── ' + fileItem.blue);
                    } else {
                        console.log(tem + '├── ' + fileItem);
                    }
                }
                if (fs.statSync(name).isDirectory()) {
                    if (i === fileList.length - 1) {
                        tem += '    ';
                    } else {
                        tem += '|   ';
                    }
                    getDirectories(name);
                    tem = tem.substr(0, tem.length - 4);
                }
            });
        };

        getDirectories(srcPath);

    });

prog.parse(process.argv);