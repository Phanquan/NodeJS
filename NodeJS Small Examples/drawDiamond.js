const prog = require('caporal');

prog
	.version('1.0')
	.command('DrawMe', 'Command to draw Diamonds')
	.argument('<NumberOfDiamond>','The first Argument,to set the Numbers of Diamonds you want to draw')
	.argument('<HeightOfDiamond>','The second Argument,to set the Height of the Diamond you want to draw')
	.action(function (args,options) {
		console.log(args)
        function drawManyDiamon(n,H) {
            if(n < 1 || H < 1 || H % 2 === 0){
                return console.log(('Cannot draw with even input Height'))
            }

            let h = Math.floor(H/2) + 1;
            let width = H - 1;

            for (let i = 0 ; i < H ; i++) {
                if (i < h) {
                    for (let j = 0 ; j <= n * H - n ; j++) {
                        let j2 = j % width;
                        if ((j2 === h - 1 - i) || (j2 === h - 1 +i)) {
                            process.stdout.write('*');
                        } else {
                            process.stdout.write(' ');
                        }
                    }
                } else {
                    for (let j = 0; j <= n * H - n ; j++) {
                        let j2 = j % width;
                        let temp = i-h+1;
                        if ((j2 === temp) || (j2 === width - temp)) {
                            process.stdout.write('*');
                        } else {
                            process.stdout.write(' ');
                        }
                    }
                }
                console.log();
            }
        }

        drawManyDiamon(args.numberOfDiamond,args.heightOfDiamond);
    });

prog.parse(process.argv);